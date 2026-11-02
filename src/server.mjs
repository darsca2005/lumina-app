import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { db, initDb } from './db.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3456;
const PUBLIC_DIR = join(__dirname, '../public');

initDb();

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-User-Id'
  });
  res.end(JSON.stringify(data));
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 2 * 1024 * 1024) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function getUserId(req, parsedUrl) {
  const queryUser = parsedUrl.searchParams.get('userId');
  const headerUser = req.headers['x-user-id'];
  return queryUser || headerUser || 'usr-me';
}

export const server = createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-User-Id'
    });
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;
  const userId = getUserId(req, parsedUrl);

  try {
    // API ROUTES
    if (pathname === '/api/bootstrap' && req.method === 'GET') {
      let user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
      if (!user) {
        user = db.prepare('SELECT * FROM users WHERE id = ?').get('usr-me');
      }

      const categories = db.prepare('SELECT * FROM categories ORDER BY sort_order ASC').all();
      const userInterests = db.prepare('SELECT category_id FROM user_interests WHERE user_id = ?').all(user.id);
      user.interests = userInterests.map(i => i.category_id);

      const dailyLesson = db.prepare(`
        SELECT l.*, c.title as course_title, cat.name as category_name, cat.icon_name as category_icon, cat.accent_color as category_color
        FROM lessons l
        JOIN courses c ON l.course_id = c.id
        JOIN categories cat ON l.category_id = cat.id
        WHERE l.is_daily_featured = 1
        LIMIT 1
      `).get();

      if (dailyLesson) {
        dailyLesson.content_blocks = JSON.parse(dailyLesson.content_blocks || '[]');
        dailyLesson.key_takeaways = JSON.parse(dailyLesson.key_takeaways || '[]');
        const progress = db.prepare('SELECT * FROM user_lesson_progress WHERE user_id = ? AND lesson_id = ?').get(user.id, dailyLesson.id);
        dailyLesson.progress = progress || null;
      }

      const courses = db.prepare(`
        SELECT c.*, cat.name as category_name, cat.icon_name as category_icon
        FROM courses c
        JOIN categories cat ON c.category_id = cat.id
        ORDER BY c.sort_order ASC
      `).all();

      for (const crs of courses) {
        const lessons = db.prepare('SELECT id, title, reading_time_minutes, order_in_course FROM lessons WHERE course_id = ? ORDER BY order_in_course ASC').all(crs.id);
        const completedCount = db.prepare(`
          SELECT count(*) as count FROM user_lesson_progress
          WHERE user_id = ? AND lesson_id IN (SELECT id FROM lessons WHERE course_id = ?) AND status = 'completed'
        `).get(user.id, crs.id).count;

        crs.lessons = lessons;
        crs.completedLessonsCount = completedCount;
        crs.progressPct = lessons.length ? Math.round((completedCount / lessons.length) * 100) : 0;
      }

      const progressRows = db.prepare(`
        SELECT ulp.*, l.title as lesson_title, l.slug as lesson_slug, c.title as course_title
        FROM user_lesson_progress ulp
        JOIN lessons l ON ulp.lesson_id = l.id
        JOIN courses c ON l.course_id = c.id
        WHERE ulp.user_id = ?
      `).all(user.id);

      const favorites = db.prepare(`
        SELECT uf.*, l.title as lesson_title, l.hook_subtitle, l.reading_time_minutes, cat.name as category_name, cat.icon_name as category_icon
        FROM user_favorites uf
        LEFT JOIN lessons l ON uf.lesson_id = l.id
        LEFT JOIN categories cat ON l.category_id = cat.id
        WHERE uf.user_id = ?
      `).all(user.id);

      const friendsLeaderboard = db.prepare(`
        SELECT id, display_name, avatar_emoji, current_streak, longest_streak,
          (SELECT count(*) FROM user_lesson_progress WHERE user_id = users.id AND status = 'completed') as completed_lessons,
          (SELECT sum(minutes_studied) FROM daily_activity_logs WHERE user_id = users.id) as total_minutes
        FROM users
        ORDER BY current_streak DESC, completed_lessons DESC
        LIMIT 10
      `).all();

      const today = new Date().toISOString().slice(0, 10);
      const todayActivity = db.prepare('SELECT * FROM daily_activity_logs WHERE user_id = ? AND activity_date = ?').get(user.id, today);

      return sendJson(res, 200, {
        user,
        categories,
        dailyLesson,
        courses,
        progress: progressRows,
        favorites,
        friendsLeaderboard,
        todayActivity: todayActivity || { lessons_completed_count: 0, minutes_studied: 0, goal_met: 0, focus_unlocked_at: null }
      });
    }

    if (pathname === '/api/onboarding' && req.method === 'POST') {
      const data = await parseJsonBody(req);
      const targetUserId = data.userId || userId;

      db.prepare(`
        UPDATE users SET
          display_name = COALESCE(?, display_name),
          avatar_emoji = COALESCE(?, avatar_emoji),
          daily_goal_minutes = COALESCE(?, daily_goal_minutes),
          focus_lock_enabled = COALESCE(?, focus_lock_enabled),
          notification_time = COALESCE(?, notification_time),
          onboarding_completed = 1,
          updated_at = datetime('now')
        WHERE id = ?
      `).run(
        data.displayName, data.avatarEmoji, data.dailyGoalMinutes,
        data.focusLockEnabled ? 1 : 0, data.notificationTime, targetUserId
      );

      if (Array.isArray(data.categoryIds) && data.categoryIds.length > 0) {
        db.prepare('DELETE FROM user_interests WHERE user_id = ?').run(targetUserId);
        const insertInt = db.prepare('INSERT INTO user_interests (user_id, category_id) VALUES (?, ?)');
        for (const catId of data.categoryIds) {
          insertInt.run(targetUserId, catId);
        }
      }

      const updated = db.prepare('SELECT * FROM users WHERE id = ?').get(targetUserId);
      return sendJson(res, 200, { success: true, user: updated });
    }

    if (pathname === '/api/users/switch' && req.method === 'POST') {
      const data = await parseJsonBody(req);
      let targetUser = null;

      if (data.userId) {
        targetUser = db.prepare('SELECT * FROM users WHERE id = ?').get(data.userId);
      } else if (data.displayName) {
        const newId = 'usr-friend-' + Date.now();
        const code = 'LUMINA-' + Math.random().toString(36).substring(2, 7).toUpperCase();
        db.prepare(`
          INSERT INTO users (id, email, display_name, avatar_emoji, friend_code, onboarding_completed)
          VALUES (?, ?, ?, ?, ?, 1)
        `).run(newId, data.email || `${newId}@amici.local`, data.displayName, data.avatarEmoji || '🌟', code);

        targetUser = db.prepare('SELECT * FROM users WHERE id = ?').get(newId);
      }

      if (!targetUser) {
        return sendJson(res, 404, { error: 'Profilo non trovato' });
      }

      return sendJson(res, 200, { success: true, user: targetUser });
    }

    if (pathname.startsWith('/api/courses/') && req.method === 'GET') {
      const courseId = pathname.replace('/api/courses/', '');
      const course = db.prepare(`
        SELECT c.*, cat.name as category_name, cat.icon_name as category_icon, cat.accent_color as category_color
        FROM courses c
        JOIN categories cat ON c.category_id = cat.id
        WHERE c.id = ?
      `).get(courseId);

      if (!course) {
        return sendJson(res, 404, { error: 'Corso non trovato' });
      }

      const lessons = db.prepare(`
        SELECT l.*, ulp.status as user_status, ulp.reading_progress_pct, ulp.quiz_score, ulp.quiz_total
        FROM lessons l
        LEFT JOIN user_lesson_progress ulp ON ulp.lesson_id = l.id AND ulp.user_id = ?
        WHERE l.course_id = ?
        ORDER BY l.order_in_course ASC
      `).all(userId, courseId);

      for (const l of lessons) {
        l.content_blocks = JSON.parse(l.content_blocks || '[]');
        l.key_takeaways = JSON.parse(l.key_takeaways || '[]');
      }

      return sendJson(res, 200, { course, lessons });
    }

    if (pathname.startsWith('/api/lessons/') && pathname.endsWith('/progress') && req.method === 'POST') {
      const lessonId = pathname.replace('/api/lessons/', '').replace('/progress', '');
      const data = await parseJsonBody(req);

      const existing = db.prepare('SELECT * FROM user_lesson_progress WHERE user_id = ? AND lesson_id = ?').get(userId, lessonId);
      if (existing) {
        db.prepare(`
          UPDATE user_lesson_progress SET
            reading_progress_pct = COALESCE(?, reading_progress_pct),
            last_audio_position_sec = COALESCE(?, last_audio_position_sec),
            personal_note = COALESCE(?, personal_note),
            updated_at = datetime('now')
          WHERE user_id = ? AND lesson_id = ?
        `).run(data.readingProgressPct, data.lastAudioPositionSec, data.personalNote, userId, lessonId);
      } else {
        const id = 'prog-' + Date.now();
        db.prepare(`
          INSERT INTO user_lesson_progress (
            id, user_id, lesson_id, status, reading_progress_pct, last_audio_position_sec, personal_note
          ) VALUES (?, ?, ?, 'in_progress', ?, ?, ?)
        `).run(id, userId, lessonId, data.readingProgressPct || 10, data.lastAudioPositionSec || 0, data.personalNote || '');
      }

      const updated = db.prepare('SELECT * FROM user_lesson_progress WHERE user_id = ? AND lesson_id = ?').get(userId, lessonId);
      return sendJson(res, 200, { success: true, progress: updated });
    }

    if (pathname.startsWith('/api/lessons/') && pathname.endsWith('/complete') && req.method === 'POST') {
      const lessonId = pathname.replace('/api/lessons/', '').replace('/complete', '');
      const data = await parseJsonBody(req);
      const answers = Array.isArray(data.answers) ? data.answers : [];

      const questions = db.prepare('SELECT * FROM quiz_questions WHERE lesson_id = ? ORDER BY sort_order ASC').all(lessonId);
      let score = 0;
      const today = new Date().toISOString().slice(0, 10);

      questions.forEach((q, idx) => {
        const selected = answers[idx];
        const isCorrect = selected === q.correct_option_index;
        if (isCorrect) score++;

        const attemptId = 'att-' + Date.now() + '-' + idx;
        const nextReviewDate = new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10);
        db.prepare(`
          INSERT INTO user_quiz_attempts (id, user_id, question_id, lesson_id, selected_option_index, is_correct, next_review_date)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `).run(attemptId, userId, q.id, lessonId, selected !== undefined ? selected : -1, isCorrect ? 1 : 0, nextReviewDate);
      });

      // Update lesson progress
      const existing = db.prepare('SELECT * FROM user_lesson_progress WHERE user_id = ? AND lesson_id = ?').get(userId, lessonId);
      if (existing) {
        db.prepare(`
          UPDATE user_lesson_progress SET
            status = 'completed',
            reading_progress_pct = 100,
            quiz_score = ?,
            quiz_total = ?,
            completed_at = datetime('now'),
            updated_at = datetime('now')
          WHERE user_id = ? AND lesson_id = ?
        `).run(score, questions.length, userId, lessonId);
      } else {
        db.prepare(`
          INSERT INTO user_lesson_progress (
            id, user_id, lesson_id, status, reading_progress_pct, quiz_score, quiz_total, completed_at
          ) VALUES (?, ?, ?, 'completed', 100, ?, ?, datetime('now'))
        `).run('prog-' + Date.now(), userId, lessonId, score, questions.length);
      }

      // Update streak & activity log
      const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
      let streakUpdated = false;
      let newStreak = user.current_streak;

      if (user.last_streak_date !== today) {
        newStreak = (user.current_streak || 0) + 1;
        const longest = Math.max(user.longest_streak || 0, newStreak);
        db.prepare(`
          UPDATE users SET
            current_streak = ?,
            longest_streak = ?,
            last_streak_date = ?,
            updated_at = datetime('now')
          WHERE id = ?
        `).run(newStreak, longest, today, userId);
        streakUpdated = true;
      }

      // Daily activity log
      const log = db.prepare('SELECT * FROM daily_activity_logs WHERE user_id = ? AND activity_date = ?').get(userId, today);
      const minutesStudied = data.minutesStudied || 7;
      if (log) {
        db.prepare(`
          UPDATE daily_activity_logs SET
            lessons_completed_count = lessons_completed_count + 1,
            minutes_studied = minutes_studied + ?,
            goal_met = 1,
            focus_unlocked_at = COALESCE(focus_unlocked_at, datetime('now')),
            updated_at = datetime('now')
          WHERE user_id = ? AND activity_date = ?
        `).run(minutesStudied, userId, today);
      } else {
        db.prepare(`
          INSERT INTO daily_activity_logs (
            id, user_id, activity_date, lessons_completed_count, minutes_studied, goal_met, focus_unlocked_at
          ) VALUES (?, ?, ?, 1, ?, 1, datetime('now'))
        `).run('act-' + Date.now(), userId, today, minutesStudied);
      }

      return sendJson(res, 200, {
        success: true,
        score,
        total: questions.length,
        currentStreak: newStreak,
        streakUpdated,
        focusUnlocked: true
      });
    }

    if (pathname.startsWith('/api/lessons/') && req.method === 'GET') {
      const lessonId = pathname.replace('/api/lessons/', '');
      const lesson = db.prepare(`
        SELECT l.*, c.title as course_title, c.id as course_id, cat.name as category_name, cat.icon_name as category_icon, cat.accent_color as category_color
        FROM lessons l
        JOIN courses c ON l.course_id = c.id
        JOIN categories cat ON l.category_id = cat.id
        WHERE l.id = ?
      `).get(lessonId);

      if (!lesson) {
        return sendJson(res, 404, { error: 'Lezione non trovata' });
      }

      lesson.content_blocks = JSON.parse(lesson.content_blocks || '[]');
      lesson.key_takeaways = JSON.parse(lesson.key_takeaways || '[]');

      const questions = db.prepare('SELECT * FROM quiz_questions WHERE lesson_id = ? ORDER BY sort_order ASC').all(lessonId);
      for (const q of questions) {
        q.options = JSON.parse(q.options || '[]');
      }

      const userProgress = db.prepare('SELECT * FROM user_lesson_progress WHERE user_id = ? AND lesson_id = ?').get(userId, lessonId);
      const isFavorited = db.prepare('SELECT count(*) as count FROM user_favorites WHERE user_id = ? AND lesson_id = ?').get(userId, lessonId).count > 0;

      return sendJson(res, 200, {
        lesson,
        questions,
        userProgress: userProgress || null,
        isFavorited
      });
    }

    if (pathname === '/api/review' && req.method === 'GET') {
      const questions = db.prepare(`
        SELECT qq.*, l.title as lesson_title, c.title as course_title, cat.name as category_name
        FROM quiz_questions qq
        JOIN lessons l ON qq.lesson_id = l.id
        JOIN courses c ON l.course_id = c.id
        JOIN categories cat ON l.category_id = cat.id
        ORDER BY RANDOM()
        LIMIT 5
      `).all();

      for (const q of questions) {
        q.options = JSON.parse(q.options || '[]');
      }

      return sendJson(res, 200, { questions });
    }

    if (pathname === '/api/review/submit' && req.method === 'POST') {
      const data = await parseJsonBody(req);
      const results = Array.isArray(data.results) ? data.results : [];
      let correct = 0;

      for (const r of results) {
        if (r.isCorrect) correct++;
      }

      return sendJson(res, 200, {
        success: true,
        reviewedCount: results.length,
        correctCount: correct
      });
    }

    if (pathname === '/api/favorites/toggle' && req.method === 'POST') {
      const data = await parseJsonBody(req);
      const lessonId = data.lessonId;
      if (!lessonId) {
        return sendJson(res, 400, { error: 'lessonId richiesto' });
      }

      const existing = db.prepare('SELECT id FROM user_favorites WHERE user_id = ? AND lesson_id = ?').get(userId, lessonId);
      let favorited = false;
      if (existing) {
        db.prepare('DELETE FROM user_favorites WHERE id = ?').run(existing.id);
      } else {
        const id = 'fav-' + Date.now();
        db.prepare('INSERT INTO user_favorites (id, user_id, lesson_id) VALUES (?, ?, ?)').run(id, userId, lessonId);
        favorited = true;
      }

      return sendJson(res, 200, { success: true, favorited });
    }

    if (pathname === '/api/settings' && req.method === 'POST') {
      const data = await parseJsonBody(req);
      db.prepare(`
        UPDATE users SET
          reader_theme = COALESCE(?, reader_theme),
          reader_font_size = COALESCE(?, reader_font_size),
          focus_lock_enabled = COALESCE(?, focus_lock_enabled),
          daily_goal_minutes = COALESCE(?, daily_goal_minutes),
          notification_time = COALESCE(?, notification_time),
          updated_at = datetime('now')
        WHERE id = ?
      `).run(
        data.readerTheme, data.readerFontSize,
        data.focusLockEnabled !== undefined ? (data.focusLockEnabled ? 1 : 0) : null,
        data.dailyGoalMinutes, data.notificationTime, userId
      );

      const updated = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
      return sendJson(res, 200, { success: true, user: updated });
    }

    if (pathname.startsWith('/api/users/') && req.method === 'DELETE') {
      const targetUserId = pathname.replace('/api/users/', '');
      db.prepare('DELETE FROM user_lesson_progress WHERE user_id = ?').run(targetUserId);
      db.prepare('DELETE FROM user_quiz_attempts WHERE user_id = ?').run(targetUserId);
      db.prepare('DELETE FROM user_favorites WHERE user_id = ?').run(targetUserId);
      db.prepare('DELETE FROM daily_activity_logs WHERE user_id = ?').run(targetUserId);
      db.prepare('UPDATE users SET current_streak = 0, last_streak_date = NULL WHERE id = ?').run(targetUserId);
      return sendJson(res, 200, { success: true, reset: true });
    }

    // STATIC FILE SERVING
    let filePath = join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);

    if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
      filePath = join(PUBLIC_DIR, 'index.html');
    }

    const ext = extname(filePath).toLowerCase();
    const mime = MIME_TYPES[ext] || 'application/octet-stream';
    const content = readFileSync(filePath);

    res.writeHead(200, {
      'Content-Type': mime,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600'
    });
    res.end(content);
  } catch (err) {
    console.error('Server error:', err);
    sendJson(res, 500, { error: 'Internal server error', message: err.message });
  }
});

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`✨ Lumina attiva su:`);
    console.log(`   - Dal computer: http://localhost:${PORT}`);
    console.log(`   - Dal telefono: http://192.168.1.216:${PORT}`);
  });
}
