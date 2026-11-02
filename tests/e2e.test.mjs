import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import { server } from '../src/server.mjs';

const TEST_PORT = 3499;
const BASE_URL = `http://localhost:${TEST_PORT}`;

describe('Lumina E2E Test Suite (Flows F01-F06 & Core Loop)', () => {
  before((_, done) => {
    server.listen(TEST_PORT, () => done());
  });

  after((_, done) => {
    server.close(() => done());
  });

  test('F01: Bootstrap API returns full application state and daily lesson', async () => {
    const res = await fetch(`${BASE_URL}/api/bootstrap?userId=usr-me`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();

    assert.ok(data.user, 'User must exist');
    assert.strictEqual(data.user.id, 'usr-me');
    assert.ok(Array.isArray(data.categories), 'Categories array must exist');
    assert.ok(data.categories.length >= 8, 'At least 8 categories available');
    assert.ok(data.dailyLesson, 'Daily lesson must be present');
    assert.strictEqual(data.dailyLesson.is_daily_featured, 1);
    assert.ok(Array.isArray(data.courses), 'Courses array must exist');
    assert.ok(Array.isArray(data.friendsLeaderboard), 'Friends leaderboard must exist');
    assert.ok(data.friendsLeaderboard.length >= 2, 'Leaderboard has friends profiles');
  });

  test('F01: Onboarding saves user preferences, daily goal, and interests', async () => {
    const payload = {
      userId: 'usr-me',
      displayName: 'Matteo Test',
      avatarEmoji: '⚡',
      dailyGoalMinutes: 10,
      categoryIds: ['cat-storia', 'cat-scienza'],
      focusLockEnabled: 1,
      notificationTime: '08:45'
    };

    const res = await fetch(`${BASE_URL}/api/onboarding`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.user.display_name, 'Matteo Test');
    assert.strictEqual(data.user.daily_goal_minutes, 10);
    assert.strictEqual(data.user.focus_lock_enabled, 1);
  });

  test('F02: Course detail endpoint returns ordered lesson modules', async () => {
    const res = await fetch(`${BASE_URL}/api/courses/crs-napoleone`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();

    assert.ok(data.course);
    assert.strictEqual(data.course.id, 'crs-napoleone');
    assert.ok(Array.isArray(data.lessons));
    assert.ok(data.lessons.length >= 2, 'Course has multiple modules');
    assert.ok(data.lessons[0].title.includes('Elba'));
  });

  test('F02 & F03: Lesson detail returns structured slides and quiz questions', async () => {
    const res = await fetch(`${BASE_URL}/api/lessons/lsn-napoleone-1?userId=usr-me`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();

    assert.ok(data.lesson);
    assert.ok(Array.isArray(data.lesson.content_blocks));
    assert.ok(data.lesson.content_blocks.length >= 3, 'Lesson has 3 narrative slides');
    assert.ok(Array.isArray(data.questions));
    assert.strictEqual(data.questions.length, 3, 'Quiz has 3 questions');
    assert.ok(Array.isArray(data.questions[0].options));
  });

  test('F02: Progress update saves personal notes and reading position', async () => {
    const noteText = 'Nota di studio per il test E2E: Napoleone e Laffrey.';
    const res = await fetch(`${BASE_URL}/api/lessons/lsn-napoleone-1/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-User-Id': 'usr-me' },
      body: JSON.stringify({ readingProgressPct: 75, personalNote: noteText })
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.progress.personal_note, noteText);
    assert.strictEqual(data.progress.reading_progress_pct, 75);
  });

  test('F02 & F05: Completing a lesson quiz awards score and unlocks Focus Lock', async () => {
    // Correct answers for Napoleone 1 are index: 1, 2, 1
    const res = await fetch(`${BASE_URL}/api/lessons/lsn-napoleone-1/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-User-Id': 'usr-me' },
      body: JSON.stringify({ answers: [1, 2, 1], minutesStudied: 7 })
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.score, 3);
    assert.strictEqual(data.total, 3);
    assert.strictEqual(data.focusUnlocked, true);
    assert.ok(data.currentStreak >= 1, 'Current streak is positive');
  });

  test('F04: Favorite bookmark toggling persists properly', async () => {
    const resToggle = await fetch(`${BASE_URL}/api/favorites/toggle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-User-Id': 'usr-me' },
      body: JSON.stringify({ lessonId: 'lsn-socrate-1' })
    });
    assert.strictEqual(resToggle.status, 200);
    const dataToggle = await resToggle.json();
    assert.strictEqual(typeof dataToggle.favorited, 'boolean');
  });

  test('F06: Spaced repetition review endpoint returns past questions', async () => {
    const res = await fetch(`${BASE_URL}/api/review?userId=usr-me`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(Array.isArray(data.questions));
    assert.ok(data.questions.length > 0, 'Review questions exist');
  });

  test('Friends & Multi-profile: New friend profile creation and leaderboard inclusion', async () => {
    const resCreate = await fetch(`${BASE_URL}/api/users/switch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ displayName: 'Sofia Amica', avatarEmoji: '🦊' })
    });

    assert.strictEqual(resCreate.status, 200);
    const dataCreate = await resCreate.json();
    assert.strictEqual(dataCreate.user.display_name, 'Sofia Amica');
    assert.strictEqual(dataCreate.user.avatar_emoji, '🦊');

    // Check leaderboard contains new user
    const resBoot = await fetch(`${BASE_URL}/api/bootstrap?userId=${dataCreate.user.id}`);
    const dataBoot = await resBoot.json();
    const found = dataBoot.friendsLeaderboard.find(f => f.id === dataCreate.user.id);
    assert.ok(found, 'New friend is listed in leaderboard');
  });
});
