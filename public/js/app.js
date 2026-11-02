// Lumina : Client SPA Application
// Architettura 100% autonoma senza dipendenze esterne

const state = {
  userId: localStorage.getItem('lumina_user_id') || 'usr-me',
  activeTab: 'home',
  bootstrap: null,
  currentCourse: null,
  currentLesson: null,
  currentSlideIdx: 0,
  readerTheme: localStorage.getItem('lumina_theme') || 'paper',
  readerFontSize: localStorage.getItem('lumina_font_size') || 'md',
  activeCategoryFilter: 'all',
  searchQuery: '',
  quiz: {
    lessonId: null,
    questions: [],
    currentIdx: 0,
    answers: [],
    isAnswered: false,
    selectedOption: null
  },
  audio: {
    isPlaying: false,
    rate: 1,
    synth: window.speechSynthesis || null,
    utterance: null
  }
};

// DOM Elements
const viewContainer = document.getElementById('view-container');
const bottomNav = document.getElementById('bottom-nav');
const modalContainer = document.getElementById('modal-container');
const headerStreak = document.getElementById('header-streak-count');
const headerUserName = document.getElementById('header-user-name');
const headerUserAvatar = document.getElementById('header-user-avatar');

// API CLIENT
async function api(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    'X-User-Id': state.userId,
    ...(options.headers || {})
  };
  const res = await fetch(path, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Errore di rete' }));
    throw new Error(err.error || 'Errore del server');
  }
  return res.json();
}

async function loadBootstrap() {
  try {
    state.bootstrap = await api(`/api/bootstrap?userId=${state.userId}`);
    updateHeaderUI();
    if (state.bootstrap.user && !state.bootstrap.user.onboarding_completed) {
      showOnboardingModal();
    }
    return true;
  } catch (err) {
    console.error('Errore nel bootstrap:', err);
    viewContainer.innerHTML = `
      <div style="text-align: center; padding: 48px 16px;">
        <span style="font-size: 32px;">⚡</span>
        <h3 style="margin-top: 12px; font-size: 18px;">Connessione a Lumina</h3>
        <p style="font-size: 13px; color: var(--color-text-muted); margin: 8px 0 16px;">
          ${err.message || 'Caricamento dei percorsi in corso...'}
        </p>
        <button class="btn btn-primary btn-sm" onclick="location.reload()">Ricarica Pagina</button>
      </div>
    `;
    return false;
  }
}

function updateHeaderUI() {
  if (!state.bootstrap || !state.bootstrap.user) return;
  const u = state.bootstrap.user;
  headerStreak.textContent = u.current_streak || 0;
  headerUserName.textContent = u.display_name.split(' ')[0] || 'Tu';
  headerUserAvatar.textContent = u.avatar_emoji || '🦉';
  document.documentElement.setAttribute('data-reader-theme', state.readerTheme);
}

// ROUTER & NAVIGATION
function navigate(tab, param = null) {
  state.activeTab = tab;
  stopAudio();

  // Aggiorna bottom nav
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });

  if (tab === 'home') renderHome();
  else if (tab === 'explore') renderExplore();
  else if (tab === 'course') renderCourse(param);
  else if (tab === 'reader') renderReader(param);
  else if (tab === 'quiz') renderQuiz(param);
  else if (tab === 'review') renderReview();
  else if (tab === 'progress') renderProgress();
  else if (tab === 'profile') renderProfile();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ----------------------------------------------------
// VISTA: HOME (S05)
// ----------------------------------------------------
function renderHome() {
  if (!state.bootstrap) return;
  const { user, dailyLesson, courses, todayActivity, friendsLeaderboard } = state.bootstrap;

  const weekDays = ['L', 'M', 'M', 'G', 'V', 'S', 'D'];
  const todayIndex = (new Date().getDay() + 6) % 7; // Lun = 0 .. Dom = 6

  let html = '';

  // Focus Lock Banner
  if (user.focus_lock_enabled) {
    const isUnlocked = todayActivity && todayActivity.goal_met;
    html += `
      <div class="focus-lock-banner ${isUnlocked ? 'unlocked' : ''}">
        <div>
          <strong>${isUnlocked ? '🔓 Focus Quotidiano Sbloccato' : '🔒 Patto di Concentrazione Attivo'}</strong>
          <p style="font-size: 11px; margin-top: 2px;">
            ${isUnlocked 
              ? 'Hai completato la lettura di oggi! Goditi il resto della giornata.' 
              : 'Completa la lezione del giorno per disattivare la modalità focus.'}
          </p>
        </div>
        ${!isUnlocked ? `<button class="btn btn-sm btn-secondary" id="btn-quick-lesson">Inizia</button>` : ''}
      </div>
    `;
  }

  // Striscia Settimanale Streak
  html += `
    <div class="streak-strip-card">
      <div>
        <div style="font-size: 11px; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase;">Serie Giornaliera</div>
        <div style="font-size: 15px; font-weight: 700; color: var(--color-warning); display: flex; align-items: center; gap: 4px;">
          <span>🔥</span> ${user.current_streak} giorni di costanza
          <span style="font-size: 11px; font-weight: 500; color: var(--color-text-muted); margin-left: 6px;">(Record: ${user.longest_streak}gg)</span>
        </div>
      </div>
      <div class="week-days">
        ${weekDays.map((d, i) => {
          const isPastOrToday = i <= todayIndex;
          const isDone = isPastOrToday && todayActivity && todayActivity.goal_met && i === todayIndex;
          const isToday = i === todayIndex;
          return `<div class="day-circle ${isDone ? 'completed' : ''} ${isToday ? 'today' : ''}" title="${d}">${d}</div>`;
        }).join('')}
      </div>
    </div>
  `;

  // Hero: Lezione del Giorno (Core Loop)
  if (dailyLesson) {
    const isCompleted = dailyLesson.progress && dailyLesson.progress.status === 'completed';
    html += `
      <div class="hero-daily-card">
        <div class="card-tag">
          <span>${dailyLesson.category_icon}</span>
          <span>${dailyLesson.category_name} · ${dailyLesson.reading_time_minutes} min</span>
        </div>
        <h2 class="hero-title">${dailyLesson.title}</h2>
        <p class="hero-desc">${dailyLesson.hook_subtitle}</p>
        <div class="flex-between">
          <button class="btn btn-primary btn-sm" id="btn-start-daily-hero" data-lesson-id="${dailyLesson.id}">
            ${isCompleted ? '✓ Rileggi la Lezione' : 'Inizia la lettura · ' + dailyLesson.reading_time_minutes + ' min'}
          </button>
          <span style="font-size: 12px; color: var(--color-text-muted); font-weight: 600;">
            ${isCompleted ? '⭐ Completata oggi' : '🎧 Audio incluso'}
          </span>
        </div>
      </div>
    `;
  }

  // Esplora per Argomento (10 Materie Fondamentali)
  const categories = state.bootstrap.categories || [];
  html += `
    <div style="margin-bottom: var(--space-4);">
      <div class="flex-between" style="margin-bottom: var(--space-2);">
        <h3 style="font-size: 16px; font-weight: 700;">Le 10 Grandi Discipline</h3>
        <button class="btn-ghost" style="font-size: 12px; font-weight: 600;" id="btn-open-all-categories">Tutti i temi →</button>
      </div>
      <div class="category-filter-scroll" style="margin-bottom: 0;">
        ${categories.map(c => `
          <button class="cat-pill" data-home-cat="${c.id}" style="border-color: ${c.accent_color};">
            ${c.icon_name} ${c.name}
          </button>
        `).join('')}
      </div>
    </div>
  `;

  // Corsi e Percorsi Consigliati (Grande catalogo)
  html += `
    <div style="margin-bottom: var(--space-4);">
      <div class="flex-between" style="margin-bottom: var(--space-2);">
        <h3 style="font-size: 16px; font-weight: 700;">Biblioteca Completa (250 Percorsi · 25 per tema)</h3>
        <button class="btn-ghost" style="font-size: 12px; font-weight: 600;" id="btn-see-all-courses">Vedi tutti (${courses.length}) →</button>
      </div>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${courses.slice(0, 5).map(c => `
          <div class="card" style="padding: 12px 16px; margin-bottom: 0; cursor: pointer;" data-course-id="${c.id}">
            <div class="flex-between">
              <div>
                <span style="font-size: 11px; font-weight: 700; color: var(--color-accent);">${c.cover_badge || '📚'} ${c.category_name}</span>
                <div style="font-family: var(--font-serif); font-size: 15px; font-weight: 700;">${c.title}</div>
                <div style="font-size: 12px; color: var(--color-text-muted);">${c.subtitle || c.synopsis}</div>
              </div>
              <div style="text-align: right; min-width: 60px;">
                <span class="badge ${c.progressPct === 100 ? 'badge-success' : 'badge-warning'}">${c.estimated_total_minutes || 10}m</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Classifica Cerchia Amici
  html += `
    <div class="card">
      <div class="flex-between" style="margin-bottom: var(--space-3);">
        <h3 style="font-size: 15px; font-weight: 700; display: flex; align-items: center; gap: 6px;">
          <span>👥</span> La tua Cerchia di Amici
        </h3>
        <button class="btn btn-sm btn-secondary" id="btn-manage-friends">Gestisci</button>
      </div>
      <div style="font-size: 12px; color: var(--color-text-muted); margin-bottom: 8px;">
        100% gratuita per te e i tuoi amici. Chi mantiene la serie più lunga?
      </div>
      ${friendsLeaderboard.map((f, i) => `
        <div class="friend-row">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 12px; font-weight: 700; width: 16px; color: var(--color-text-muted);">${i + 1}</span>
            <span style="font-size: 20px;">${f.avatar_emoji}</span>
            <div>
              <div style="font-size: 13px; font-weight: 600; ${f.id === user.id ? 'color: var(--color-accent);' : ''}">
                ${f.display_name} ${f.id === user.id ? '(Tu)' : ''}
              </div>
              <div style="font-size: 11px; color: var(--color-text-muted);">${f.completed_lessons || 0} lezioni · ${f.total_minutes || 0} min</div>
            </div>
          </div>
          <div style="font-size: 13px; font-weight: 700; color: var(--color-warning);">
            🔥 ${f.current_streak} gg
          </div>
        </div>
      `).join('')}
    </div>
  `;

  viewContainer.innerHTML = html;

  // Bind Events
  const btnStartHero = document.getElementById('btn-start-daily-hero');
  if (btnStartHero) {
    btnStartHero.onclick = () => navigate('reader', btnStartHero.dataset.lessonId);
  }
  const btnQuick = document.getElementById('btn-quick-lesson');
  if (btnQuick && dailyLesson) {
    btnQuick.onclick = () => navigate('reader', dailyLesson.id);
  }
  document.getElementById('btn-see-all-courses').onclick = () => navigate('explore');
  document.getElementById('btn-manage-friends').onclick = () => navigate('profile');

  const btnOpenCats = document.getElementById('btn-open-all-categories');
  if (btnOpenCats) {
    btnOpenCats.onclick = () => navigate('explore');
  }

  document.querySelectorAll('[data-home-cat]').forEach(el => {
    el.onclick = () => {
      state.activeCategoryFilter = el.dataset.homeCat;
      navigate('explore');
    };
  });

  document.querySelectorAll('[data-course-id]').forEach(el => {
    el.onclick = () => navigate('course', el.dataset.courseId);
  });
}

// ----------------------------------------------------
// VISTA: ESPLORA CATALOGO (S06)
// ----------------------------------------------------
function renderExplore() {
  if (!state.bootstrap) return;
  const { categories, courses } = state.bootstrap;

  let filteredCourses = courses;

  if (state.activeCategoryFilter !== 'all') {
    filteredCourses = filteredCourses.filter(c => c.category_id === state.activeCategoryFilter);
  }

  if (state.searchQuery && state.searchQuery.trim()) {
    const q = state.searchQuery.trim().toLowerCase();
    filteredCourses = filteredCourses.filter(c => {
      return (
        (c.title && c.title.toLowerCase().includes(q)) ||
        (c.subtitle && c.subtitle.toLowerCase().includes(q)) ||
        (c.synopsis && c.synopsis.toLowerCase().includes(q)) ||
        (c.category_name && c.category_name.toLowerCase().includes(q))
      );
    });
  }

  let html = `
    <div style="margin-bottom: var(--space-4);">
      <h2 style="font-family: var(--font-serif); font-size: 24px; font-weight: 700; margin-bottom: 6px;">Biblioteca Infinita</h2>
      
      <!-- Stats Banner -->
      <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px;">
        <span class="badge badge-success">📚 ${courses.length} Percorsi</span>
        <span class="badge badge-warning">🌐 10 Discipline (25 per tema)</span>
        <span class="badge" style="background:#e0e7ff; color:#3730a3;">💡 500+ Domande Quiz</span>
        <span class="badge" style="background:#fce7f3; color:#9d174d;">🎧 Audio Incluso</span>
      </div>

      <!-- Live Search Bar -->
      <div style="position: relative; margin-bottom: 12px;">
        <input type="text" id="explore-search-input" placeholder="🔍 Cerca tra ${courses.length} percorsi (es. Socrate, Microchip, Buchi Neri, Monet, AI...)" value="${state.searchQuery}" style="width: 100%; padding: 10px 14px; border: 1.5px solid var(--color-border); border-radius: var(--radius-md); font-size: 13px; font-family: var(--font-sans); background: var(--color-surface); color: var(--color-text);">
      </div>

      <!-- Category Filter Pills (Tutte le 20 materie) -->
      <div class="category-filter-scroll">
        <button class="cat-pill ${state.activeCategoryFilter === 'all' ? 'active' : ''}" data-cat-id="all">Tutte le materie (${courses.length})</button>
        ${categories.map(c => {
          const count = courses.filter(crs => crs.category_id === c.id).length;
          return `
            <button class="cat-pill ${state.activeCategoryFilter === c.id ? 'active' : ''}" data-cat-id="${c.id}">
              ${c.icon_name} ${c.name} (${count})
            </button>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Active Filter Summary -->
    <div class="flex-between" style="font-size: 12px; color: var(--color-text-muted); margin-bottom: 12px;">
      <span>Trovati <strong>${filteredCourses.length}</strong> percorsi</span>
      ${state.activeCategoryFilter !== 'all' || state.searchQuery ? `
        <button class="btn-ghost" style="font-size: 11px; text-decoration: underline;" id="btn-clear-filters">Azzera filtri</button>
      ` : ''}
    </div>

    <!-- Courses List -->
    <div style="display: flex; flex-direction: column; gap: var(--space-3);">
      ${filteredCourses.length === 0 ? `
        <div style="text-align: center; padding: 40px 16px;">
          <div style="font-size: 36px; margin-bottom: 8px;">🔍</div>
          <div style="font-weight: 700; margin-bottom: 4px;">Nessun percorso trovato per "${state.searchQuery}"</div>
          <div style="font-size: 13px; color: var(--color-text-muted);">Prova con un'altra parola chiave o esplora per materia.</div>
        </div>
      ` : filteredCourses.map(c => `
        <div class="card" style="cursor: pointer;" data-course-id="${c.id}">
          <div class="card-tag">
            <span>${c.cover_badge || '📚'}</span>
            <span>${c.category_name} · ${c.estimated_total_minutes || 10} min</span>
            <span style="margin-left: auto; text-transform: capitalize; font-size: 10px; opacity: 0.8;">${c.difficulty_level || 'base'}</span>
          </div>
          <h3 style="font-family: var(--font-serif); font-size: 17px; font-weight: 700; margin-bottom: 4px;">${c.title}</h3>
          <p style="font-size: 13px; color: var(--color-text-muted); margin-bottom: 10px; line-height: 1.45;">${c.subtitle || c.synopsis}</p>
          <div class="flex-between">
            <span style="font-size: 12px; font-weight: 600; color: var(--color-accent);">
              📚 ${c.lessons_count || 1} capitolo · 🎯 Quiz
            </span>
            <button class="btn btn-sm btn-outline">Inizia →</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  viewContainer.innerHTML = html;

  const searchInput = document.getElementById('explore-search-input');
  if (searchInput) {
    searchInput.oninput = (e) => {
      state.searchQuery = e.target.value;
      renderExplore();
      const nextInput = document.getElementById('explore-search-input');
      if (nextInput) {
        nextInput.focus();
        nextInput.setSelectionRange(nextInput.value.length, nextInput.value.length);
      }
    };
  }

  const clearBtn = document.getElementById('btn-clear-filters');
  if (clearBtn) {
    clearBtn.onclick = () => {
      state.searchQuery = '';
      state.activeCategoryFilter = 'all';
      renderExplore();
    };
  }

  document.querySelectorAll('.cat-pill').forEach(btn => {
    btn.onclick = () => {
      state.activeCategoryFilter = btn.dataset.catId;
      renderExplore();
    };
  });

  document.querySelectorAll('[data-course-id]').forEach(el => {
    el.onclick = () => navigate('course', el.dataset.courseId);
  });
}

// ----------------------------------------------------
// VISTA: DETTAGLIO CORSO (S07)
// ----------------------------------------------------
async function renderCourse(courseId) {
  viewContainer.innerHTML = `<p style="text-align: center; padding: 40px;">Caricamento percorso...</p>`;
  try {
    const data = await api(`/api/courses/${courseId}`);
    const { course, lessons } = data;
    state.currentCourse = course;

    let html = `
      <div style="margin-bottom: var(--space-4);">
        <button class="btn-ghost" id="btn-back-explore" style="margin-bottom: 8px; font-size: 13px;">← Torna al Catalogo</button>
        <div class="card-tag">
          <span>${course.category_icon}</span>
          <span>${course.category_name}</span>
        </div>
        <h2 style="font-family: var(--font-serif); font-size: 24px; font-weight: 700; margin-bottom: 6px;">${course.title}</h2>
        <p style="font-size: 14px; color: var(--color-text-muted); margin-bottom: 16px;">${course.synopsis}</p>
      </div>

      <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 12px;">Moduli del Percorso</h3>
      <div style="display: flex; flex-direction: column; gap: var(--space-3);">
        ${lessons.map((l, idx) => {
          const isDone = l.user_status === 'completed';
          return `
            <div class="card" style="padding: 14px; margin-bottom: 0; display: flex; justify-content: space-between; align-items: center;">
              <div style="display: flex; gap: 12px; align-items: center;">
                <div style="width: 28px; height: 28px; border-radius: 50%; background: ${isDone ? 'var(--color-success)' : 'var(--color-surface)'}; color: ${isDone ? '#fff' : 'var(--color-text)'}; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; border: 1px solid var(--color-border);">
                  ${isDone ? '✓' : idx + 1}
                </div>
                <div>
                  <div style="font-family: var(--font-serif); font-size: 15px; font-weight: 700;">${l.title}</div>
                  <div style="font-size: 12px; color: var(--color-text-muted);">${l.reading_time_minutes} min lettura · 🎧 Audio</div>
                </div>
              </div>
              <button class="btn btn-sm ${isDone ? 'btn-secondary' : 'btn-primary'}" data-read-lesson="${l.id}">
                ${isDone ? 'Rileggi' : 'Inizia'}
              </button>
            </div>
          `;
        }).join('')}
      </div>
    `;

    viewContainer.innerHTML = html;
    document.getElementById('btn-back-explore').onclick = () => navigate('explore');
    document.querySelectorAll('[data-read-lesson]').forEach(b => {
      b.onclick = () => navigate('reader', b.dataset.readLesson);
    });
  } catch (err) {
    viewContainer.innerHTML = `<p style="color: var(--color-danger);">Errore nel caricamento del corso: ${err.message}</p>`;
  }
}

// ----------------------------------------------------
// VISTA: LETTORE LEZIONE (S08 & S09)
// ----------------------------------------------------
async function renderReader(lessonId) {
  viewContainer.innerHTML = `<p style="text-align: center; padding: 40px;">Apertura lettura concentrata...</p>`;
  try {
    const data = await api(`/api/lessons/${lessonId}`);
    const { lesson, questions, userProgress, isFavorited } = data;
    state.currentLesson = lesson;
    state.currentSlideIdx = 0;

    const slides = lesson.content_blocks || [];
    const totalSlides = slides.length;

    function renderSlideContent() {
      const currentSlide = slides[state.currentSlideIdx];
      const progressPct = Math.round(((state.currentSlideIdx + 1) / (totalSlides + 1)) * 100);

      let fontSizeStyle = '17px';
      if (state.readerFontSize === 'sm') fontSizeStyle = '15px';
      if (state.readerFontSize === 'lg') fontSizeStyle = '20px';

      let html = `
        <div class="reader-container" data-reader-theme="${state.readerTheme}">
          <!-- Toolbar -->
          <div class="reader-toolbar">
            <button class="btn-ghost" id="btn-close-reader">✕ Chiudi</button>
            <div style="display: flex; align-items: center; gap: 8px;">
              <button class="btn-ghost" id="btn-toggle-favorite" title="Salva nei preferiti">
                ${isFavorited ? '❤️' : '🤍'}
              </button>
              <button class="btn-ghost" id="btn-theme-toggle" title="Cambia tema">🎨</button>
              <button class="btn-ghost" id="btn-font-toggle" title="Dimensione font">Aa</button>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="progress-bar-wrap" role="progressbar" aria-valuenow="${progressPct}">
            <div class="progress-bar-fill" style="width: ${progressPct}%;"></div>
          </div>

          <!-- Audio Bar (Podcast Mode S09) -->
          <div class="audio-bar">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span>🎧</span>
              <span style="font-size: 12px; font-weight: 600;">Voce Narrante Italiana</span>
            </div>
            <div class="audio-controls">
              <button class="btn btn-sm btn-secondary" id="btn-audio-seek-back">-15s</button>
              <button class="btn btn-sm btn-primary" id="btn-audio-play">
                ${state.audio.isPlaying ? '⏸ Pausa' : '▶ Ascolta'}
              </button>
              <button class="btn btn-sm btn-secondary" id="btn-audio-speed">${state.audio.rate}x</button>
            </div>
          </div>

          <!-- Slide Content -->
          <div class="reader-slide">
            <div>
              <div style="font-size: 11px; font-weight: 700; color: var(--color-accent); text-transform: uppercase;">
                ${lesson.category_icon} ${lesson.category_name} · Sezione ${state.currentSlideIdx + 1} di ${totalSlides}
              </div>
              <h2 class="slide-title">${currentSlide.title}</h2>
              <div class="slide-body" style="font-size: ${fontSizeStyle};">
                ${currentSlide.text}
              </div>

              ${currentSlide.quote ? `
                <div class="quote-callout">
                  «${currentSlide.quote}»
                </div>
              ` : ''}

              ${currentSlide.takeaway ? `
                <div class="takeaway-box">
                  <strong>Punto Chiave:</strong> ${currentSlide.takeaway}
                </div>
              ` : ''}
            </div>

            <!-- Slide Navigation -->
            <div class="flex-between" style="margin-top: var(--space-4);">
              <button class="btn btn-secondary btn-sm" id="btn-slide-prev" ${state.currentSlideIdx === 0 ? 'disabled' : ''}>
                ← Precedente
              </button>
              <span style="font-size: 12px; color: var(--color-text-muted);">
                ${state.currentSlideIdx + 1} / ${totalSlides}
              </span>
              ${state.currentSlideIdx < totalSlides - 1 ? `
                <button class="btn btn-primary btn-sm" id="btn-slide-next">
                  Continua →
                </button>
              ` : `
                <button class="btn btn-primary btn-sm" id="btn-go-quiz" style="background: var(--color-warning);">
                  Passa al Quiz 🎯
                </button>
              `}
            </div>
          </div>

          <!-- Quaderno Appunti Personali -->
          <div class="card" style="margin-top: var(--space-2);">
            <div style="font-size: 12px; font-weight: 700; margin-bottom: 6px;">📝 I tuoi Appunti su questa lezione</div>
            <textarea id="lesson-personal-note" placeholder="Scrivi una riflessione da ricordare..." style="width: 100%; height: 60px; padding: 8px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-family: var(--font-sans); font-size: 13px; resize: vertical;">${userProgress && userProgress.personal_note ? userProgress.personal_note : ''}</textarea>
            <div id="note-saved-hint" style="font-size: 11px; color: var(--color-success); margin-top: 4px; display: none;">Salvataggio automatico completato.</div>
          </div>
        </div>
      `;

      viewContainer.innerHTML = html;

      // Event Bindings
      document.getElementById('btn-close-reader').onclick = () => {
        stopAudio();
        navigate('home');
      };

      document.getElementById('btn-toggle-favorite').onclick = async () => {
        const res = await api('/api/favorites/toggle', { method: 'POST', body: JSON.stringify({ lessonId }) });
        await loadBootstrap();
        renderReader(lessonId);
      };

      document.getElementById('btn-theme-toggle').onclick = () => {
        const themes = ['paper', 'sepia', 'night'];
        const nextTheme = themes[(themes.indexOf(state.readerTheme) + 1) % themes.length];
        state.readerTheme = nextTheme;
        localStorage.setItem('lumina_theme', nextTheme);
        renderSlideContent();
      };

      document.getElementById('btn-font-toggle').onclick = () => {
        const sizes = ['sm', 'md', 'lg'];
        const nextSize = sizes[(sizes.indexOf(state.readerFontSize) + 1) % sizes.length];
        state.readerFontSize = nextSize;
        localStorage.setItem('lumina_font_size', nextSize);
        renderSlideContent();
      };

      // Slide Navigation
      const btnPrev = document.getElementById('btn-slide-prev');
      if (btnPrev) {
        btnPrev.onclick = () => {
          if (state.currentSlideIdx > 0) {
            state.currentSlideIdx--;
            renderSlideContent();
            if (state.audio.isPlaying) playSlideAudio();
          }
        };
      }

      const btnNext = document.getElementById('btn-slide-next');
      if (btnNext) {
        btnNext.onclick = () => {
          if (state.currentSlideIdx < totalSlides - 1) {
            state.currentSlideIdx++;
            renderSlideContent();
            if (state.audio.isPlaying) playSlideAudio();
          }
        };
      }

      const btnQuiz = document.getElementById('btn-go-quiz');
      if (btnQuiz) {
        btnQuiz.onclick = () => {
          stopAudio();
          navigate('quiz', lessonId);
        };
      }

      // Audio Player Controls (Web Speech API)
      const btnPlay = document.getElementById('btn-audio-play');
      btnPlay.onclick = () => {
        if (state.audio.isPlaying) {
          stopAudio();
          renderSlideContent();
        } else {
          state.audio.isPlaying = true;
          playSlideAudio();
          renderSlideContent();
        }
      };

      const btnSpeed = document.getElementById('btn-audio-speed');
      btnSpeed.onclick = () => {
        const speeds = [1, 1.25, 1.5];
        state.audio.rate = speeds[(speeds.indexOf(state.audio.rate) + 1) % speeds.length];
        if (state.audio.isPlaying) playSlideAudio();
        renderSlideContent();
      };

      // Auto-save note debounced
      const noteInput = document.getElementById('lesson-personal-note');
      let noteTimeout;
      noteInput.oninput = () => {
        clearTimeout(noteTimeout);
        noteTimeout = setTimeout(async () => {
          await api(`/api/lessons/${lessonId}/progress`, {
            method: 'POST',
            body: JSON.stringify({ personalNote: noteInput.value })
          });
          const hint = document.getElementById('note-saved-hint');
          if (hint) {
            hint.style.display = 'block';
            setTimeout(() => { if (hint) hint.style.display = 'none'; }, 2000);
          }
        }, 600);
      };
    }

    renderSlideContent();
  } catch (err) {
    viewContainer.innerHTML = `<p style="color: var(--color-danger);">Errore: ${err.message}</p>`;
  }
}

// AUDIO NARRATOR ENGINE (S09)
function playSlideAudio() {
  if (!state.currentLesson) return;
  const slide = state.currentLesson.content_blocks[state.currentSlideIdx];
  if (!slide) return;

  if (state.audio.synth) {
    state.audio.synth.cancel();
    const textToSpeak = `${slide.title}. ${slide.text} ${slide.quote ? 'Citazione: ' + slide.quote : ''}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'it-IT';
    utterance.rate = state.audio.rate;
    utterance.onend = () => {
      // Avanza automaticamente alla scheda successiva
      if (state.currentSlideIdx < state.currentLesson.content_blocks.length - 1) {
        state.currentSlideIdx++;
        renderReader(state.currentLesson.id);
        playSlideAudio();
      } else {
        stopAudio();
      }
    };
    state.audio.synth.speak(utterance);
    state.audio.isPlaying = true;
  }
}

function stopAudio() {
  if (state.audio.synth) {
    state.audio.synth.cancel();
  }
  state.audio.isPlaying = false;
}

// ----------------------------------------------------
// VISTA: QUIZ DI FINE LEZIONE (S10)
// ----------------------------------------------------
async function renderQuiz(lessonId) {
  viewContainer.innerHTML = `<p style="text-align: center; padding: 40px;">Preparazione del quiz...</p>`;
  try {
    const data = await api(`/api/lessons/${lessonId}`);
    const { lesson, questions } = data;

    state.quiz = {
      lessonId,
      questions,
      currentIdx: 0,
      answers: new Array(questions.length).fill(null),
      isAnswered: false,
      selectedOption: null
    };

    renderQuestion();
  } catch (err) {
    viewContainer.innerHTML = `<p style="color: var(--color-danger);">Errore nel quiz: ${err.message}</p>`;
  }
}

function renderQuestion() {
  const { questions, currentIdx, answers, isAnswered, selectedOption, lessonId } = state.quiz;
  const q = questions[currentIdx];
  const total = questions.length;
  const optionLetters = ['A', 'B', 'C', 'D'];

  let html = `
    <div style="padding: var(--space-2) 0;">
      <div class="flex-between" style="margin-bottom: var(--space-3);">
        <span class="quiz-step-tag">Verifica Attiva · Domanda ${currentIdx + 1} di ${total}</span>
        <button class="btn-ghost" id="btn-abort-quiz" style="font-size: 12px;">Esci</button>
      </div>

      <div class="progress-bar-wrap" style="margin-bottom: var(--space-4);">
        <div class="progress-bar-fill" style="width: ${((currentIdx + 1) / total) * 100}%;"></div>
      </div>

      <div class="card" style="padding: var(--space-5);">
        <h3 class="quiz-question-text">${q.question_text}</h3>

        <div style="margin-top: var(--space-4);">
          ${q.options.map((opt, optIdx) => {
            let stateClass = '';
            if (isAnswered) {
              if (optIdx === q.correct_option_index) stateClass = 'correct';
              else if (optIdx === selectedOption) stateClass = 'wrong';
            }
            return `
              <div class="quiz-option-card ${stateClass}" data-opt-idx="${optIdx}">
                <div class="option-badge">${optionLetters[optIdx]}</div>
                <div>${opt}</div>
              </div>
            `;
          }).join('')}
        </div>

        ${isAnswered ? `
          <div class="explanation-callout">
            <strong>${selectedOption === q.correct_option_index ? '✓ Risposta Corretta!' : '💡 Spiegazione:'}</strong>
            <p style="margin-top: 4px;">${q.explanation_text}</p>
          </div>

          <div style="margin-top: var(--space-4);">
            <button class="btn btn-primary btn-lg" id="btn-next-question">
              ${currentIdx < total - 1 ? 'Prossima Domanda →' : 'Guarda il Risultato Finale 🎉'}
            </button>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  viewContainer.innerHTML = html;

  document.getElementById('btn-abort-quiz').onclick = () => navigate('reader', lessonId);

  if (!isAnswered) {
    document.querySelectorAll('.quiz-option-card').forEach(card => {
      card.onclick = () => {
        const idx = parseInt(card.dataset.optIdx, 10);
        state.quiz.selectedOption = idx;
        state.quiz.answers[currentIdx] = idx;
        state.quiz.isAnswered = true;
        renderQuestion();
      };
    });
  } else {
    document.getElementById('btn-next-question').onclick = async () => {
      if (currentIdx < total - 1) {
        state.quiz.currentIdx++;
        state.quiz.isAnswered = false;
        state.quiz.selectedOption = null;
        renderQuestion();
      } else {
        // Invia risultato al server
        const completeRes = await api(`/api/lessons/${lessonId}/complete`, {
          method: 'POST',
          body: JSON.stringify({ answers: state.quiz.answers, minutesStudied: 7 })
        });
        await loadBootstrap();
        renderCelebration(completeRes);
      }
    };
  }
}

// ----------------------------------------------------
// VISTA: CELEBRAZIONE & STREAK (S11)
// ----------------------------------------------------
function renderCelebration(res) {
  const { score, total, currentStreak, streakUpdated } = res;
  const isPerfect = score === total;

  viewContainer.innerHTML = `
    <div class="celebration-view">
      <div class="streak-flame-icon">🔥</div>
      <h2 style="font-family: var(--font-serif); font-size: 28px; font-weight: 700; margin: 12px 0 6px;">
        ${streakUpdated ? 'Luce accesa per oggi!' : 'Lezione Consolidata!'}
      </h2>
      <p style="font-size: 15px; color: var(--color-text-muted); margin-bottom: 24px;">
        Serie attuale: <strong>${currentStreak} giorni consecutivi</strong>.
      </p>

      <div class="card" style="max-width: 400px; margin: 0 auto 24px; text-align: left;">
        <div class="flex-between" style="margin-bottom: 8px;">
          <span style="font-weight: 600;">Punteggio Quiz:</span>
          <span class="badge ${isPerfect ? 'badge-success' : 'badge-warning'}">${score} su ${total} esatte</span>
        </div>
        <div class="flex-between" style="margin-bottom: 8px;">
          <span style="font-weight: 600;">Tempo di studio:</span>
          <span>+7 minuti</span>
        </div>
        <div class="flex-between">
          <span style="font-weight: 600;">Stato Focus:</span>
          <span style="color: var(--color-success); font-weight: 700;">✓ Sbloccato</span>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 10px; max-width: 400px; margin: 0 auto;">
        <button class="btn btn-primary btn-lg" id="btn-back-home">
          Torna alla Home
        </button>
        <button class="btn btn-secondary btn-lg" id="btn-share-streak">
          Condividi con i tuoi Amici 📲
        </button>
      </div>
    </div>
  `;

  document.getElementById('btn-back-home').onclick = () => navigate('home');
  document.getElementById('btn-share-streak').onclick = () => {
    const text = `🔥 Ho completato 10 minuti di cultura generale su Lumina! La mia serie è di ${currentStreak} giorni consecutivi.`;
    if (navigator.share) {
      navigator.share({ title: 'Lumina', text, url: window.location.origin });
    } else {
      navigator.clipboard.writeText(text);
      alert('Testo copiato! Puoi incollarlo su WhatsApp o Telegram ai tuoi amici.');
    }
  };
}

// ----------------------------------------------------
// VISTA: RIPASSO ATTIVO (S12)
// ----------------------------------------------------
async function renderReview() {
  viewContainer.innerHTML = `<p style="text-align: center; padding: 40px;">Caricamento sessione di ripasso...</p>`;
  try {
    const data = await api('/api/review');
    const { questions } = data;

    if (!questions || questions.length === 0) {
      viewContainer.innerHTML = `
        <div style="text-align: center; padding: 48px 16px;">
          <div style="font-size: 48px;">🧠</div>
          <h2 style="font-family: var(--font-serif); font-size: 22px; font-weight: 700; margin: 12px 0;">Nessun ripasso in sospeso</h2>
          <p style="font-size: 14px; color: var(--color-text-muted); margin-bottom: 24px;">
            Completa qualche lezione della biblioteca per attivare il ripasso spaziato automatico.
          </p>
          <button class="btn btn-primary" onclick="navigate('explore')">Vai alla Biblioteca</button>
        </div>
      `;
      return;
    }

    let currentIdx = 0;
    let correctCount = 0;

    function showReviewQuestion() {
      const q = questions[currentIdx];
      let answered = false;

      let html = `
        <div style="padding: var(--space-2) 0;">
          <div class="flex-between" style="margin-bottom: var(--space-3);">
            <span class="quiz-step-tag">Ripasso Spaziato · ${currentIdx + 1} di ${questions.length}</span>
            <span style="font-size: 12px; color: var(--color-accent); font-weight: 600;">${q.category_name}</span>
          </div>

          <div class="card" style="padding: var(--space-5);">
            <div style="font-size: 11px; color: var(--color-text-muted); margin-bottom: 6px;">Dal corso: ${q.course_title}</div>
            <h3 class="quiz-question-text">${q.question_text}</h3>

            <div id="review-options">
              ${q.options.map((opt, i) => `
                <div class="quiz-option-card" data-rev-idx="${i}">
                  <div class="option-badge">${['A','B','C','D'][i]}</div>
                  <div>${opt}</div>
                </div>
              `).join('')}
            </div>

            <div id="review-feedback" style="display: none; margin-top: var(--space-4);">
              <div class="explanation-callout" id="review-explanation-text"></div>
              <button class="btn btn-primary btn-lg" style="margin-top: 12px;" id="btn-next-review">Continua →</button>
            </div>
          </div>
        </div>
      `;

      viewContainer.innerHTML = html;

      document.querySelectorAll('[data-rev-idx]').forEach(card => {
        card.onclick = () => {
          if (answered) return;
          answered = true;
          const selected = parseInt(card.dataset.revIdx, 10);
          const isRight = selected === q.correct_option_index;
          if (isRight) correctCount++;

          document.querySelectorAll('[data-rev-idx]').forEach((c, idx) => {
            if (idx === q.correct_option_index) c.classList.add('correct');
            else if (idx === selected) c.classList.add('wrong');
          });

          const fb = document.getElementById('review-feedback');
          const exp = document.getElementById('review-explanation-text');
          exp.innerHTML = `<strong>${isRight ? '✓ Esatto!' : '💡 Ricorda:'}</strong> ${q.explanation_text}`;
          fb.style.display = 'block';

          document.getElementById('btn-next-review').onclick = () => {
            currentIdx++;
            if (currentIdx < questions.length) {
              showReviewQuestion();
            } else {
              viewContainer.innerHTML = `
                <div style="text-align: center; padding: 48px 16px;">
                  <div style="font-size: 48px;">🎯</div>
                  <h2 style="font-family: var(--font-serif); font-size: 24px; font-weight: 700; margin: 12px 0;">Ripasso Completato!</h2>
                  <p style="font-size: 14px; color: var(--color-text-muted); margin-bottom: 24px;">
                    Hai risposto correttamente a ${correctCount} su ${questions.length} domande.
                  </p>
                  <button class="btn btn-primary" onclick="navigate('home')">Torna alla Home</button>
                </div>
              `;
            }
          };
        };
      });
    }

    showReviewQuestion();
  } catch (err) {
    viewContainer.innerHTML = `<p style="color: var(--color-danger);">Errore: ${err.message}</p>`;
  }
}

// ----------------------------------------------------
// VISTA: PROGRESSI & MAPPA CULTURA (S13)
// ----------------------------------------------------
function renderProgress() {
  if (!state.bootstrap) return;
  const { user, categories, progress } = state.bootstrap;

  const totalCompleted = progress.filter(p => p.status === 'completed').length;
  const totalMinutes = totalCompleted * 7;

  let html = `
    <div style="margin-bottom: var(--space-4);">
      <h2 style="font-family: var(--font-serif); font-size: 24px; font-weight: 700; margin-bottom: 6px;">Mappa della Conoscenza</h2>
      <p style="font-size: 13px; color: var(--color-text-muted);">Traccia la tua crescita intellettuale giorno dopo giorno.</p>
    </div>

    <!-- KPI Grid -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); margin-bottom: var(--space-4);">
      <div class="card" style="margin: 0; text-align: center;">
        <div style="font-size: 24px; font-weight: 700; color: var(--color-warning);">🔥 ${user.current_streak}</div>
        <div style="font-size: 11px; font-weight: 600; color: var(--color-text-muted);">SERIE ATTUALE</div>
      </div>
      <div class="card" style="margin: 0; text-align: center;">
        <div style="font-size: 24px; font-weight: 700; color: var(--color-accent);">🏆 ${user.longest_streak}</div>
        <div style="font-size: 11px; font-weight: 600; color: var(--color-text-muted);">RECORD STORICO</div>
      </div>
      <div class="card" style="margin: 0; text-align: center;">
        <div style="font-size: 24px; font-weight: 700; color: var(--color-success);">📚 ${totalCompleted}</div>
        <div style="font-size: 11px; font-weight: 600; color: var(--color-text-muted);">LEZIONI CONCLUSE</div>
      </div>
      <div class="card" style="margin: 0; text-align: center;">
        <div style="font-size: 24px; font-weight: 700; color: #704264;">⏳ ${totalMinutes}</div>
        <div style="font-size: 11px; font-weight: 600; color: var(--color-text-muted);">MINUTI DI CULTURA</div>
      </div>
    </div>

    <!-- Avanzamento per Materia -->
    <div class="card">
      <h3 style="font-size: 15px; font-weight: 700; margin-bottom: 14px;">Padronanza per Materia</h3>
      <div style="display: flex; flex-direction: column; gap: 14px;">
        ${categories.map(cat => {
          return `
            <div>
              <div class="flex-between" style="font-size: 12px; margin-bottom: 4px;">
                <span style="font-weight: 600;">${cat.icon_name} ${cat.name}</span>
                <span style="color: var(--color-text-muted);">Livello 1</span>
              </div>
              <div class="progress-bar-wrap" style="margin: 0;">
                <div class="progress-bar-fill" style="width: 35%; background-color: ${cat.accent_color};"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  viewContainer.innerHTML = html;
}

// ----------------------------------------------------
// VISTA: PROFILO, IMPOSTAZIONI & AMICI (S15)
// ----------------------------------------------------
function renderProfile() {
  if (!state.bootstrap) return;
  const { user, friendsLeaderboard } = state.bootstrap;

  let html = `
    <div style="margin-bottom: var(--space-4);">
      <h2 style="font-family: var(--font-serif); font-size: 24px; font-weight: 700; margin-bottom: 6px;">Profilo & Amici</h2>
      <p style="font-size: 13px; color: var(--color-text-muted);">Gestisci il tuo profilo e condividi Lumina con chi vuoi.</p>
    </div>

    <!-- Scheda Utente Attivo -->
    <div class="card" style="display: flex; align-items: center; gap: 16px;">
      <div style="font-size: 40px;">${user.avatar_emoji}</div>
      <div style="flex: 1;">
        <div style="font-size: 17px; font-weight: 700;">${user.display_name}</div>
        <div style="font-size: 12px; color: var(--color-text-muted);">Codice Amico: <code>${user.friend_code}</code></div>
        <span class="badge badge-success" style="margin-top: 4px; display: inline-block;">100% Gratuita e Sbloccata</span>
      </div>
    </div>

    <!-- Gestione Amici / Switch Profilo -->
    <div class="card">
      <div class="flex-between" style="margin-bottom: 12px;">
        <h3 style="font-size: 15px; font-weight: 700;">Cambia o Aggiungi un Amico</h3>
        <button class="btn btn-sm btn-primary" id="btn-add-friend-profile">+ Nuovo Amico</button>
      </div>
      <p style="font-size: 12px; color: var(--color-text-muted); margin-bottom: 10px;">
        Puoi passare all'account di un amico sullo stesso dispositivo o tenere traccia della cerchia.
      </p>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${friendsLeaderboard.map(f => `
          <div class="flex-between" style="padding: 8px; border-radius: var(--radius-sm); background: ${f.id === user.id ? 'var(--color-bg)' : 'transparent'}; border: 1px solid ${f.id === user.id ? 'var(--color-accent)' : 'var(--color-border)'};">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 20px;">${f.avatar_emoji}</span>
              <span style="font-size: 13px; font-weight: 600;">${f.display_name} ${f.id === user.id ? '(Attivo)' : ''}</span>
            </div>
            ${f.id !== user.id ? `
              <button class="btn btn-sm btn-secondary" data-switch-id="${f.id}">Usa questo</button>
            ` : `<span style="font-size: 11px; color: var(--color-accent); font-weight: 700;">IN USO</span>`}
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Impostazioni Focus Lock & Studio -->
    <div class="card">
      <h3 style="font-size: 15px; font-weight: 700; margin-bottom: 12px;">Patto di Concentrazione (Focus Lock)</h3>
      <div class="flex-between" style="margin-bottom: 12px;">
        <span style="font-size: 13px;">Attiva promemoria anti-distrazione</span>
        <input type="checkbox" id="chk-focus-lock" ${user.focus_lock_enabled ? 'checked' : ''} style="width: 20px; height: 20px;">
      </div>
      <div class="flex-between" style="margin-bottom: 12px;">
        <span style="font-size: 13px;">Obiettivo giornaliero</span>
        <select id="sel-daily-goal" style="padding: 4px 8px; border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
          <option value="5" ${user.daily_goal_minutes === 5 ? 'selected' : ''}>5 min / giorno</option>
          <option value="10" ${user.daily_goal_minutes === 10 ? 'selected' : ''}>10 min / giorno</option>
          <option value="15" ${user.daily_goal_minutes === 15 ? 'selected' : ''}>15 min / giorno</option>
        </select>
      </div>
      <button class="btn btn-primary btn-sm" id="btn-save-settings">Salva Impostazioni</button>
    </div>

    <!-- Reset / Privacy -->
    <div class="card" style="border-color: #fca5a5;">
      <h3 style="font-size: 14px; font-weight: 700; color: var(--color-danger); margin-bottom: 6px;">Gestione Dati</h3>
      <p style="font-size: 12px; color: var(--color-text-muted); margin-bottom: 10px;">
        I tuoi dati sono conservati in locale. Puoi azzerare i progressi o ripartire da capo in qualsiasi momento.
      </p>
      <button class="btn btn-sm" style="background: var(--color-danger); color: #fff;" id="btn-reset-data">
        Azzera i Miei Progressi
      </button>
    </div>
  `;

  viewContainer.innerHTML = html;

  // Bind Events
  document.getElementById('btn-add-friend-profile').onclick = () => showAddFriendModal();

  document.querySelectorAll('[data-switch-id]').forEach(b => {
    b.onclick = async () => {
      const targetId = b.dataset.switchId;
      state.userId = targetId;
      localStorage.setItem('lumina_user_id', targetId);
      await loadBootstrap();
      renderProfile();
    };
  });

  document.getElementById('btn-save-settings').onclick = async () => {
    const focusEnabled = document.getElementById('chk-focus-lock').checked;
    const goal = parseInt(document.getElementById('sel-daily-goal').value, 10);
    await api('/api/settings', {
      method: 'POST',
      body: JSON.stringify({ focusLockEnabled: focusEnabled, dailyGoalMinutes: goal })
    });
    await loadBootstrap();
    alert('Impostazioni salvate con successo!');
  };

  document.getElementById('btn-reset-data').onclick = async () => {
    if (confirm('Vuoi davvero cancellare la cronologia delle lezioni e le serie per questo profilo?')) {
      await api(`/api/users/${state.userId}`, { method: 'DELETE' });
      await loadBootstrap();
      renderProfile();
    }
  };
}

// ----------------------------------------------------
// MODAL: ONBOARDING (S01 - S04)
// ----------------------------------------------------
function showOnboardingModal() {
  modalContainer.style.display = 'flex';
  modalContainer.className = 'modal-overlay';

  let step = 1;
  const selectedInterests = ['cat-storia', 'cat-filosofia', 'cat-scienza'];
  let chosenGoal = 10;
  let chosenName = 'Tu';

  function renderModalStep() {
    const categories = state.bootstrap ? state.bootstrap.categories : [];

    if (step === 1) {
      modalContainer.innerHTML = `
        <div class="modal-content" style="text-align: center;">
          <div style="font-size: 48px; margin-bottom: 12px;">🕯️</div>
          <h2 style="font-family: var(--font-serif); font-size: 24px; font-weight: 700; margin-bottom: 12px;">Benvenuto su Lumina</h2>
          <p style="font-size: 14px; color: var(--color-text-muted); margin-bottom: 24px; line-height: 1.5;">
            Trasforma dieci minuti di pausa in una scoperta che resta.<br>
            <strong>100% gratuita</strong>, senza abbonamenti né blocchi, pensata per te e i tuoi amici.
          </p>
          <button class="btn btn-primary btn-lg" id="modal-btn-step1">Inizia il Viaggio →</button>
        </div>
      `;
      document.getElementById('modal-btn-step1').onclick = () => { step = 2; renderModalStep(); };
    } else if (step === 2) {
      modalContainer.innerHTML = `
        <div class="modal-content">
          <h3 style="font-family: var(--font-serif); font-size: 20px; font-weight: 700; margin-bottom: 8px;">Cosa ti incuriosisce di più?</h3>
          <p style="font-size: 13px; color: var(--color-text-muted); margin-bottom: 16px;">Scegli le materie che vorresti trovare nella tua scoperta quotidiana:</p>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px;">
            ${categories.map(c => {
              const sel = selectedInterests.includes(c.id);
              return `<button class="cat-pill ${sel ? 'active' : ''}" data-modal-cat="${c.id}">${c.icon_name} ${c.name}</button>`;
            }).join('')}
          </div>
          <button class="btn btn-primary btn-lg" id="modal-btn-step2">Continua →</button>
        </div>
      `;
      document.querySelectorAll('[data-modal-cat]').forEach(b => {
        b.onclick = () => {
          const id = b.dataset.modalCat;
          if (selectedInterests.includes(id)) {
            selectedInterests.splice(selectedInterests.indexOf(id), 1);
          } else {
            selectedInterests.push(id);
          }
          renderModalStep();
        };
      });
      document.getElementById('modal-btn-step2').onclick = () => { step = 3; renderModalStep(); };
    } else if (step === 3) {
      modalContainer.innerHTML = `
        <div class="modal-content">
          <h3 style="font-family: var(--font-serif); font-size: 20px; font-weight: 700; margin-bottom: 8px;">Il tuo Ritmo di Studio</h3>
          <p style="font-size: 13px; color: var(--color-text-muted); margin-bottom: 16px;">Quanto tempo vuoi dedicare ogni giorno alla lettura?</p>
          
          <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
            <div class="card" style="margin: 0; padding: 12px; cursor: pointer; border: 1.5px solid ${chosenGoal === 5 ? 'var(--color-accent)' : 'var(--color-border)'};" data-goal="5">
              <strong>⚡ 5 Minuti al Giorno</strong>
              <div style="font-size: 12px; color: var(--color-text-muted);">Una pillola concentrata per iniziare la mattina.</div>
            </div>
            <div class="card" style="margin: 0; padding: 12px; cursor: pointer; border: 1.5px solid ${chosenGoal === 10 ? 'var(--color-accent)' : 'var(--color-border)'};" data-goal="10">
              <strong>☀️ 10 Minuti al Giorno (Consigliato)</strong>
              <div style="font-size: 12px; color: var(--color-text-muted);">Il formato perfetto: lettura completa e quiz.</div>
            </div>
            <div class="card" style="margin: 0; padding: 12px; cursor: pointer; border: 1.5px solid ${chosenGoal === 15 ? 'var(--color-accent)' : 'var(--color-border)'};" data-goal="15">
              <strong>📚 15 Minuti al Giorno</strong>
              <div style="font-size: 12px; color: var(--color-text-muted);">Immersione approfondita nei dettagli e nei percorsi.</div>
            </div>
          </div>

          <label style="font-size: 12px; font-weight: 700; display: block; margin-bottom: 4px;">Il tuo nome o nickname per gli amici:</label>
          <input type="text" id="modal-user-name" value="${chosenName}" style="width: 100%; padding: 8px 12px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-size: 14px; margin-bottom: 20px;">

          <button class="btn btn-primary btn-lg" id="modal-btn-finish">Entra in Lumina</button>
        </div>
      `;
      document.querySelectorAll('[data-goal]').forEach(g => {
        g.onclick = () => {
          chosenGoal = parseInt(g.dataset.goal, 10);
          renderModalStep();
        };
      });
      document.getElementById('modal-btn-finish').onclick = async () => {
        const nameVal = document.getElementById('modal-user-name').value.trim() || 'Tu';
        await api('/api/onboarding', {
          method: 'POST',
          body: JSON.stringify({
            userId: state.userId,
            displayName: nameVal,
            dailyGoalMinutes: chosenGoal,
            categoryIds: selectedInterests
          })
        });
        modalContainer.style.display = 'none';
        await loadBootstrap();
        navigate('home');
      };
    }
  }

  renderModalStep();
}

function showAddFriendModal() {
  modalContainer.style.display = 'flex';
  modalContainer.className = 'modal-overlay';
  modalContainer.innerHTML = `
    <div class="modal-content">
      <div class="flex-between" style="margin-bottom: 14px;">
        <h3 style="font-family: var(--font-serif); font-size: 20px; font-weight: 700;">Aggiungi un Amico</h3>
        <button class="btn-ghost" id="btn-close-friend-modal">✕</button>
      </div>
      <p style="font-size: 13px; color: var(--color-text-muted); margin-bottom: 14px;">
        Crea un profilo dedicato per un amico per permettergli di iniziare la sua serie e confrontarvi sulla classifica!
      </p>
      <label style="font-size: 12px; font-weight: 600; display: block; margin-bottom: 4px;">Nome dell'amico:</label>
      <input type="text" id="input-friend-name" placeholder="es. Matteo, Chiara..." style="width: 100%; padding: 8px 12px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-size: 14px; margin-bottom: 14px;">
      
      <label style="font-size: 12px; font-weight: 600; display: block; margin-bottom: 4px;">Scegli un'icona avatar:</label>
      <div style="display: flex; gap: 8px; margin-bottom: 20px; font-size: 24px;" id="friend-avatar-picker">
        <span style="cursor: pointer; padding: 4px; border: 2px solid var(--color-accent); border-radius: 8px;" data-emoji="🌟">🌟</span>
        <span style="cursor: pointer; padding: 4px; border: 2px solid transparent; border-radius: 8px;" data-emoji="🦊">🦊</span>
        <span style="cursor: pointer; padding: 4px; border: 2px solid transparent; border-radius: 8px;" data-emoji="⚡">⚡</span>
        <span style="cursor: pointer; padding: 4px; border: 2px solid transparent; border-radius: 8px;" data-emoji="🌿">🌿</span>
        <span style="cursor: pointer; padding: 4px; border: 2px solid transparent; border-radius: 8px;" data-emoji="🎨">🎨</span>
      </div>

      <button class="btn btn-primary btn-lg" id="btn-submit-new-friend">Crea Profilo Amico</button>
    </div>
  `;

  let selectedEmoji = '🌟';
  document.querySelectorAll('#friend-avatar-picker span').forEach(s => {
    s.onclick = () => {
      document.querySelectorAll('#friend-avatar-picker span').forEach(el => el.style.borderColor = 'transparent');
      s.style.borderColor = 'var(--color-accent)';
      selectedEmoji = s.dataset.emoji;
    };
  });

  document.getElementById('btn-close-friend-modal').onclick = () => modalContainer.style.display = 'none';

  document.getElementById('btn-submit-new-friend').onclick = async () => {
    const name = document.getElementById('input-friend-name').value.trim();
    if (!name) {
      alert('Inserisci il nome del tuo amico!');
      return;
    }
    const res = await api('/api/users/switch', {
      method: 'POST',
      body: JSON.stringify({ displayName: name, avatarEmoji: selectedEmoji })
    });
    modalContainer.style.display = 'none';
    state.userId = res.user.id;
    localStorage.setItem('lumina_user_id', res.user.id);
    await loadBootstrap();
    navigate('home');
  };
}

// ATTACH GLOBAL EVENTS
document.getElementById('btn-brand-home').onclick = () => navigate('home');
document.getElementById('streak-header-pill').onclick = () => navigate('progress');
document.getElementById('btn-user-switch').onclick = () => navigate('profile');

document.querySelectorAll('.nav-item').forEach(btn => {
  btn.onclick = () => navigate(btn.dataset.tab);
});

// SERVICE WORKER REGISTRATION (PWA)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(err => {
      console.log('ServiceWorker error:', err);
    });
  });
}

// BOOTSTRAP INITIALIZATION
loadBootstrap().then(ok => {
  if (ok) navigate('home');
});
