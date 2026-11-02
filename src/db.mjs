import { DatabaseSync } from 'node:sqlite';
import { readFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { allCategories, allCourses, curatedLessons } from './catalog-data.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = process.env.DB_PATH || join(__dirname, '../data/lumina.db');

mkdirSync(dirname(DB_PATH), { recursive: true });

export const db = new DatabaseSync(DB_PATH);

export function initDb() {
  const schemaPath = join(__dirname, '../replica/schema.sql');
  const schemaSql = readFileSync(schemaPath, 'utf8');
  db.exec(schemaSql);
  seedInitialData();
  seedExpandedCatalog();
}

function seedInitialData() {
  const insertCategory = db.prepare(`
    INSERT OR REPLACE INTO categories (id, slug, name, description, icon_name, accent_color, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const categories = [
    ['cat-storia', 'storia', 'Storia', 'Dai grandi imperi alle rivoluzioni che hanno plasmato il mondo contemporaneo.', '🏛️', '#8c4e28', 1],
    ['cat-filosofia', 'filosofia', 'Filosofia', 'Dal dubbio socratico all\'etica moderna e al senso dell\'esistenza.', '💭', '#1e5f74', 2],
    ['cat-scienza', 'scienza', 'Scienza', 'Dalla fisica quantistica ai misteri del cosmo e del cervello umano.', '🔬', '#2a7886', 3],
    ['cat-geopolitica', 'geopolitica', 'Geopolitica', 'Rotte marittime, equilibri di potere e sfide strategiche globali.', '🌍', '#43766c', 4],
    ['cat-letteratura', 'letteratura', 'Letteratura', 'Capolavori universali, miti fondativi e la potenza delle parole.', '📚', '#704264', 5],
    ['cat-economia', 'economia', 'Economia', 'Dall\'invenzione della moneta ai mercati globali e ai cicli economici.', '📈', '#4f6f52', 6],
    ['cat-arte', 'arte', 'Arte', 'Capolavori, linguaggi visivi e ricerca del bello attraverso i secoli.', '🎨', '#b0578d', 7],
    ['cat-psicologia', 'psicologia', 'Psicologia', 'Bias cognitivi, meccanismi di apprendimento ed enigmi della mente.', '🧠', '#3d5a80', 8]
  ];

  for (const c of categories) {
    insertCategory.run(...c);
  }

  // Seed default primary user (Lumina Owner) & friend demo profiles
  const insertUser = db.prepare(`
    INSERT OR IGNORE INTO users (
      id, email, display_name, avatar_emoji, auth_provider, age_range,
      daily_goal_minutes, preferred_locale, current_streak, longest_streak,
      last_streak_date, notification_time, focus_lock_enabled, onboarding_completed, friend_code
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const today = new Date().toISOString().slice(0, 10);
  insertUser.run(
    'usr-me', 'me@lumina.local', 'Tu (Mente Curiosa)', '🦉', 'local', '25-34',
    10, 'it', 3, 5, today, '08:30', 0, 1, 'LUMINA-ME'
  );
  insertUser.run(
    'usr-friend-marco', 'marco@amici.local', 'Marco', '🚀', 'local', '25-34',
    10, 'it', 4, 7, today, '09:00', 0, 1, 'LUMINA-MARCO'
  );
  insertUser.run(
    'usr-friend-elena', 'elena@amici.local', 'Elena', '✨', 'local', '18-24',
    15, 'it', 2, 8, today, '08:00', 1, 1, 'LUMINA-ELENA'
  );
  insertUser.run(
    'usr-friend-luca', 'luca@amici.local', 'Luca', '🌿', 'local', '25-34',
    5, 'it', 1, 3, today, '20:30', 0, 1, 'LUMINA-LUCA'
  );

  // Seed user interests
  const insertInterest = db.prepare('INSERT OR IGNORE INTO user_interests (user_id, category_id) VALUES (?, ?)');
  insertInterest.run('usr-me', 'cat-storia');
  insertInterest.run('usr-me', 'cat-filosofia');
  insertInterest.run('usr-me', 'cat-scienza');
  insertInterest.run('usr-me', 'cat-geopolitica');

  // Seed Courses
  const insertCourse = db.prepare(`
    INSERT INTO courses (
      id, category_id, slug, title, subtitle, synopsis,
      difficulty_level, estimated_total_minutes, lessons_count, cover_badge, sort_order
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const courses = [
    [
      'crs-napoleone', 'cat-storia', 'napoleone-cento-giorni',
      'I Cento Giorni di Napoleone: L\'Ultimo Ruggito',
      'Dall\'esilio sull\'Elba al destino tragico di Waterloo',
      'Una delle più audaci avventure militari e politiche della storia: il ritorno a sorpresa dell\'imperatore e la caduta definitiva che ha ridisegnato l\'Europa moderna.',
      'base', 14, 2, '⚔️', 1
    ],
    [
      'crs-socrate', 'cat-filosofia', 'socrate-arte-del-dubbio',
      'Socrate e la Rivoluzione dell\'Ironia',
      'L\'arte di interrogare, il sapere di non sapere e il coraggio delle idee',
      'Come un filosofo scalzo che camminava per le strade di Atene ha inventato il pensiero critico e fondato l\'etica occidentale, preferendo la morte alla rinuncia della verità.',
      'base', 14, 2, '🏛️', 2
    ],
    [
      'crs-relativita', 'cat-scienza', 'relativita-einstein-spiegata',
      'La Relatività di Einstein in Parole Semplici',
      'Spazio, tempo e gravità: perché il tempo scorre diversamente per chi corre',
      'Dimentica le formule astruse: scopri gli esperimenti mentali con cui un giovane impiegato dell\'ufficio brevetti ha sconvolto la concezione universale di spazio e tempo.',
      'intermedio', 15, 2, '🌌', 3
    ],
    [
      'crs-malacca', 'cat-geopolitica', 'stretto-malacca-geopolitica',
      'Lo Stretto di Malacca: Il Collo del Mondo',
      'Perché 2,5 chilometri di mare decidono le sorti dell\'economia planetaria',
      'Attraverso questo braccio d\'acqua passa un terzo delle merci globali e l\'energia vitale per l\'Asia. Chi lo controlla ha in mano il respiro del commercio globale.',
      'base', 8, 1, '⚓', 4
    ],
    [
      'crs-odissea', 'cat-letteratura', 'odissea-viaggio-identita',
      'L\'Odissea e il Grande Ritorno',
      'Ulisse, l\'intelligenza nomade e la nostalgia della propria terra',
      'Non solo mostri ed eroi: l\'Odissea è il primo grande romanzo psicologico sul bisogno umano di esplorare il mondo e ritrovare se stessi.',
      'base', 8, 1, '⛵', 5
    ],
    [
      'crs-inflazione', 'cat-economia', 'capire-inflazione-moneta',
      'Come Funziona Davvero l\'Inflazione',
      'Prezzi che salgono, banche centrali e potere d\'acquisto quotidiano',
      'Perché una tazzina di caffè costa più oggi che dieci anni fa? Una guida limpida ai meccanismi di tassi d\'interesse, liquidità ed equilibrio dei prezzi.',
      'base', 7, 1, '💶', 6
    ]
  ];

  for (const crs of courses) {
    insertCourse.run(...crs);
  }

  // Seed Lessons
  const insertLesson = db.prepare(`
    INSERT OR REPLACE INTO lessons (
      id, course_id, category_id, slug, title, hook_subtitle,
      reading_time_minutes, content_blocks, key_takeaways, audio_duration_seconds,
      order_in_course, is_daily_featured
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const lesson1Blocks = [
    {
      type: 'slide',
      title: 'L\'Isola che non poteva contenerlo',
      text: 'Il 26 febbraio 1815, mentre le potenze europee ballavano al Congresso di Vienna convinte di aver sepolto per sempre l\'era rivoluzionaria, Napoleone Bonaparte salpava in segreto dall\'Isola d\'Elba con una manciata di fedelissimi su una piccola imbarcazione chiamata L\'Inconstant. Sbarcò a Golfe-Juan, nel sud della Francia, privo di un esercito ma armato di una reputazione leggendaria.',
      quote: 'L\'aquila volerà di campanile in campanile fino alle torri di Notre-Dame.',
      takeaway: 'La determinazione e il carisma psicologico possono ribaltare le forze sul campo prima ancora che parta un colpo di fucile.'
    },
    {
      type: 'slide',
      title: 'Il miracolo di Laffrey',
      text: 'A Laffrey, vicino a Grenoble, un reggimento di soldati francesi inviati dal re Luigi XVIII si schierò per sbarrargli il passo con i fucili puntati. Napoleone scese da cavallo, camminò da solo verso la linea di tiro, aprì il suo celebre cappotto grigio e gridò: «Soldati del Quinto! Se c\'è tra voi un uomo che vuole uccidere il suo Imperatore, eccomi!». I soldati abbassarono i fucili in lacrime e gridarono all\'unisono: «Vive l\'Empereur!».',
      quote: 'Non una goccia di sangue francese fu versata per riprendere il trono di Parigi.',
      takeaway: 'La fedeltà emotiva dei soldati verso Napoleone travolse completamente gli ordini monarchici.'
    },
    {
      type: 'slide',
      title: 'L\'ingresso a Parigi e il conto alla rovescia',
      text: 'In meno di un mese, senza sparare un solo colpo, Napoleone entrò trionfante alle Tuileries mentre Luigi XVIII fuggiva all\'alba. Iniziavano così i Cento Giorni. Ma a Vienna i delegati europei lo dichiararono «nemico pubblico della pace mondiale» e misero insieme una coalizione formidabile di oltre 600.000 uomini. Il tempo stringeva: doveva colpire prima che tutti gli eserciti si riunissero.',
      quote: 'L\'Europa intera non combatteva più contro la Francia, ma contro un solo uomo.',
      takeaway: 'Il trionfo politico fu immediato, ma la diplomazia europea fu inflessibile: l\'unica soluzione rimasta fu la guerra aperta.'
    }
  ];

  const lesson1Takeaways = [
    'Napoleone fuggì dall\'Elba il 26 febbraio 1815 con soli 1.000 uomini.',
    'A Laffrey riconquistò l\'esercito francese senza sparare un singolo colpo di fucile.',
    'Le potenze europee al Congresso di Vienna formarono subito la Settima Coalizione per fermarlo.'
  ];

  insertLesson.run(
    'lsn-napoleone-1', 'crs-napoleone', 'cat-storia', 'napoleone-fuga-elba',
    'La Fuga dall\'Elba e il Trionfo a Parigi',
    'Come un solo uomo ha riconquistato un impero senza sparare un singolo colpo di fucile.',
    7, JSON.stringify(lesson1Blocks), JSON.stringify(lesson1Takeaways), 420, 1, 1
  );

  const lesson2Blocks = [
    {
      type: 'slide',
      title: 'I cancelli di Hougoumont',
      text: 'Domenica 18 giugno 1815. Su una piana fangosa a pochi chilometri a sud di Bruxelles, Napoleone affronta le truppe britanniche e alleate del duca di Wellington. La pioggia notturna ha ritardato l\'attacco fino alle 11:30 del mattino, dando tempo ai prussiani del feldmaresciallo Blücher di marciare in soccorso di Wellington.',
      quote: 'È stata la cosa più vicina a un pareggio che si sia mai vista nella vita.',
      takeaway: 'Il fango e poche ore di ritardo nell\'avvio dell\'artiglieria segnarono il destino dello scontro.'
    },
    {
      type: 'slide',
      title: 'L\'urto finale e l\'arrivo di Blücher',
      text: 'Verso le 19:30, vedendo i prussiani sbucare sul suo fianco destro, Napoleone giocò la sua ultima riserva: la Vecchia Guardia imperiale, soldati veterani che non avevano mai ceduto. Salirono la collina di Mont-Saint-Jean sotto una pioggia di mitraglia britannica. Per la prima volta nella storia, la Guardia indietreggiò. Il panico si diffuse tra le fila francesi: la leggenda napoleonica era finita.',
      quote: 'La Guardia muore, ma non si arrende.',
      takeaway: 'Waterloo pose fine a oltre vent\'anni di guerre napoleoniche e aprì il secolo della Restaurazione.'
    }
  ];
  insertLesson.run(
    'lsn-napoleone-2', 'crs-napoleone', 'cat-storia', 'waterloo-fine-impero',
    'Waterloo: Il Giorno che ha Cambiato l\'Europa',
    'Fango, cannoni e un ritardo fatale: cronaca di una battaglia epocale.',
    7, JSON.stringify(lesson2Blocks), JSON.stringify(['La pioggia ritardò l\'attacco francese permettendo l\'arrivo prussiano.', 'La sconfitta a Waterloo segnò l\'esilio definitivo a Sant\'Elena.']), 400, 2, 0
  );

  // Lesson Socrate
  const lessonSocrateBlocks = [
    {
      type: 'slide',
      title: 'Il tafano di Atene',
      text: 'Socrate non ha mai scritto una sola riga. Non aveva una scuola a pagamento e non pretendeva di insegnare risposte fatte. Camminava per l\'Agorà fermando politici, poeti e artigiani per porre loro domande apparentemente ingenue: «Che cos\'è la giustizia?», «Che cos\'è il coraggio?». Si definiva un tafano inviato dagli dèi per scuotere il sonno della nobile città di Atene.',
      quote: 'Una vita senza ricerca non è degna di essere vissuta dall\'uomo.',
      takeaway: 'L\'essenza della filosofia non è dare risposte certe, ma imparare a fare le domande giuste.'
    },
    {
      type: 'slide',
      title: 'La maieutica: l\'arte di far partorire le idee',
      text: 'Sua madre Fenarete era una levatrice. Socrate diceva di praticare la stessa arte: la maieutica. Invece di infilare conoscenze nella testa dell\'interlocutore, lo aiutava a partorire la verità che già portava dentro di sé, smontando passo dopo passo le false certezze e le opinioni tramandate per abitudine.',
      quote: 'So soltanto una cosa: di non sapere niente.',
      takeaway: 'Riconoscere la propria ignoranza è l\'unica base autentica da cui può partire il vero apprendimento.'
    }
  ];
  insertLesson.run(
    'lsn-socrate-1', 'crs-socrate', 'cat-filosofia', 'socrate-arte-del-dubbio',
    'So di non Sapere: La Rivoluzione dell\'Ironia',
    'Come smontare i pregiudizi con domande gentili e liberare il pensiero critico.',
    7, JSON.stringify(lessonSocrateBlocks), JSON.stringify(['Socrate non scrisse nulla e utilizzava il dialogo maieutico.', 'Riconoscere l\'ignoranza è il primo passo verso la saggezza.']), 380, 1, 0
  );

  // Lesson Scienza
  const lessonRelativitaBlocks = [
    {
      type: 'slide',
      title: 'Il treno di Einstein e la velocità della luce',
      text: 'Nel 1905, un ventiseienne Albert Einstein si chiese: se inseguissi un raggio di luce viaggiando alla stessa velocità della luce, cosa vedrei? La fisica classica di Newton diceva che il raggio sembrerebbe fermo. Ma le equazioni dell\'elettromagnetismo dicevano che la luce viaggia sempre a 300.000 km/s rispetto a chiunque la osservi. Per salvare questo principio, Einstein fece un sacrificio audace: il tempo non è assoluto.',
      quote: 'L\'immaginazione è più importante della conoscenza.',
      takeaway: 'La velocità della luce è la costante universale; sono il tempo e lo spazio a doversi dilatare e contrarre.'
    },
    {
      type: 'slide',
      title: 'Il paradosso dei gemelli',
      text: 'Se un gemello sale su un\'astronave che viaggia al 99% della velocità della luce e torna sulla Terra dopo un anno di viaggio a bordo, scoprirà che per il fratello rimasto sulla Terra sono passati decenni. Non è un\'illusione ottica né un guasto degli orologi: gli atomi, il battito cardiaco e l\'invecchiamento biologico rallentano realmente a velocità relativistiche.',
      quote: 'La distinzione tra passato, presente e futuro è solo un\'ostinata illusione.',
      takeaway: 'Il tempo è elastico: più veloce ti muovi nello spazio, più lentamente ti muovi nel tempo.'
    }
  ];
  insertLesson.run(
    'lsn-relativita-1', 'crs-relativita', 'cat-scienza', 'relativita-tempo-elastico',
    'Lo Spaziotempo e il Tempo Elastico',
    'Perché il tempo non scorre per tutti allo stesso ritmo e come Einstein lo ha dimostrato.',
    8, JSON.stringify(lessonRelativitaBlocks), JSON.stringify(['La velocità della luce nel vuoto è identica per ogni osservatore.', 'A velocità prossime alla luce il tempo rallenta e le lunghezze si contraggono.']), 440, 1, 0
  );

  // Seed Quiz Questions
  const insertQuestion = db.prepare(`
    INSERT OR REPLACE INTO quiz_questions (
      id, lesson_id, question_text, options, correct_option_index, explanation_text, sort_order
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  // Questions for Lesson 1 (Napoleone Fuga Elba)
  insertQuestion.run(
    'q-nap-1', 'lsn-napoleone-1',
    'Da quale isola fuggì Napoleone nel febbraio 1815 per tornare in Francia?',
    JSON.stringify(['Isola di Sant\'Elena', 'Isola d\'Elba', 'Corsica', 'Isola di Capri']),
    1,
    'Napoleone era stato esiliato all\'Isola d\'Elba nel maggio 1814 dopo la prima abdicazione, prima di organizzare la fuga segreta.',
    1
  );

  insertQuestion.run(
    'q-nap-2', 'lsn-napoleone-1',
    'Cosa accadde a Laffrey quando le truppe reali gli sbarrarono la strada?',
    JSON.stringify([
      'Scoppiò una violenta battaglia a colpi di cannone',
      'Napoleone fu catturato e rimpatriato',
      'Napoleone aprì il cappotto e i soldati si unirono a lui commossi',
      'Le truppe si ritirarono fuggendo nei boschi'
    ]),
    2,
    'Il "miracolo di Laffrey" è celebre: Napoleone affrontò i fucili a petto aperto e l\'esercito monarchico passò dalla sua parte senza sparare un colpo.',
    2
  );

  insertQuestion.run(
    'q-nap-3', 'lsn-napoleone-1',
    'Come fu definita la durata di questo secondo regno di Napoleone?',
    JSON.stringify(['Il Decennio d\'Oro', 'I Cento Giorni', 'La Seconda Repubblica', 'Il Regno d\'Autunno']),
    1,
    'Il periodo compreso tra il ritorno trionfale a Parigi nel marzo 1815 e la seconda abdicazione post-Waterloo è passato alla storia come i "Cento Giorni".',
    3
  );

  // Questions for Lesson 2 (Waterloo)
  insertQuestion.run(
    'q-wat-1', 'lsn-napoleone-2',
    'Chi guidava l\'esercito alleato anglo-olandese contro Napoleone a Waterloo?',
    JSON.stringify(['L\'ammiraglio Nelson', 'Il Duca di Wellington', 'Il generale Custer', 'L\'arciduca Carlo']),
    1,
    'Arthur Wellesley, primo duca di Wellington, guidò la strenua difesa alleata sulla collina di Mont-Saint-Jean.',
    1
  );

  insertQuestion.run(
    'q-wat-2', 'lsn-napoleone-2',
    'Quale evento meteorologico rallentò l\'avvio dell\'attacco francese nella mattinata?',
    JSON.stringify(['Una fitta nebbia gelata', 'Un improvviso temporale di grandine', 'La forte pioggia che aveva reso il terreno un pantano di fango', 'Un caldo torrido asfissiante']),
    2,
    'Il fango impediva lo spostamento agevole dei cannoni e ritardò l\'attacco alle 11:30, dando ai prussiani il tempo di convergere sul campo.',
    2
  );

  // Questions for Socrate
  insertQuestion.run(
    'q-soc-1', 'lsn-socrate-1',
    'Che cos\'era la "maieutica" praticata da Socrate?',
    JSON.stringify([
      'Una tecnica per memorizzare lunghi poemi epici',
      'L\'arte di far partorire la verità all\'interlocutore attraverso domande mirate',
      'Una dottrina religiosa basata sulla reincarnazione',
      'Un metodo per vincere le cause nei tribunali ateniesi'
    ]),
    1,
    'Ispirato dalla madre levatrice, Socrate aiutava le anime a far nascere idee autentiche scardinandone i falsi preconcetti.',
    1
  );

  // Questions for Relativita
  insertQuestion.run(
    'q-rel-1', 'lsn-relativita-1',
    'Secondo la teoria della relatività ristretta di Einstein, quale grandezza fisica è costante per ogni osservatore?',
    JSON.stringify(['Lo scorrere del tempo', 'La massa degli oggetti', 'La velocità della luce nel vuoto', 'La forza di gravità']),
    2,
    'La velocità della luce nel vuoto (circa 300.000 km/s) è la costante fondamentale insuperabile dell\'universo.',
    1
  );

  // Pre-seed 1 completed lesson for current user to showcase streak & review immediately
  insertProgressAndActivity();
}

function insertProgressAndActivity() {
  const check = db.prepare('SELECT count(*) as count FROM user_lesson_progress WHERE user_id = ?').get('usr-me').count;
  if (check > 0) return;

  const today = new Date().toISOString().slice(0, 10);
  db.prepare(`
    INSERT OR REPLACE INTO user_lesson_progress (
      id, user_id, lesson_id, status, reading_progress_pct, quiz_score, quiz_total, personal_note, completed_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    'prog-1', 'usr-me', 'lsn-napoleone-2', 'completed', 100, 2, 2,
    'Ricordare il fattore fango e il ritardo dell\'artiglieria a Waterloo.',
    today + ' 10:30:00'
  );

  db.prepare(`
    INSERT OR REPLACE INTO daily_activity_logs (
      id, user_id, activity_date, lessons_completed_count, minutes_studied, goal_met, focus_unlocked_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    'act-1', 'usr-me', today, 1, 7, 1, today + ' 10:35:00'
  );

  // Insert favorite
  db.prepare(`
    INSERT OR IGNORE INTO user_favorites (id, user_id, lesson_id, created_at)
    VALUES (?, ?, ?, datetime('now'))
  `).run('fav-1', 'usr-me', 'lsn-napoleone-1');
}

export function seedExpandedCatalog() {
  const validCatIds = allCategories.map(c => c.id);
  const placeholdersCats = validCatIds.map(() => '?').join(',');
  db.prepare(`DELETE FROM categories WHERE id NOT IN (${placeholdersCats})`).run(...validCatIds);

  const insertCategory = db.prepare(`
    INSERT OR REPLACE INTO categories (id, slug, name, description, icon_name, accent_color, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  if (Array.isArray(allCategories)) {
    for (const cat of allCategories) {
      insertCategory.run(cat.id, cat.slug, cat.name, cat.description, cat.icon_name, cat.accent_color, cat.sort_order);
    }
  }

  // 2. Courses
  const validCourseIds = allCourses.map(c => c.id);
  const placeholdersCourses = validCourseIds.map(() => '?').join(',');
  db.prepare(`DELETE FROM courses WHERE id NOT IN (${placeholdersCourses})`).run(...validCourseIds);

  const insertCourse = db.prepare(`
    INSERT OR REPLACE INTO courses (
      id, category_id, slug, title, subtitle, synopsis,
      difficulty_level, estimated_total_minutes, lessons_count, cover_badge, sort_order
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  if (Array.isArray(allCourses)) {
    for (const c of allCourses) {
      insertCourse.run(
        c.id, c.category_id, c.slug, c.title, c.subtitle, c.synopsis,
        c.difficulty_level, c.estimated_total_minutes, c.lessons_count, c.cover_badge, c.sort_order
      );
    }
  }

  // 3. Curated Lessons
  const insertLesson = db.prepare(`
    INSERT OR REPLACE INTO lessons (
      id, course_id, category_id, slug, title, hook_subtitle,
      reading_time_minutes, content_blocks, key_takeaways, audio_duration_seconds,
      order_in_course, is_daily_featured
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertQuestion = db.prepare(`
    INSERT OR REPLACE INTO quiz_questions (
      id, lesson_id, question_text, options, correct_option_index, explanation_text, sort_order
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  if (Array.isArray(curatedLessons)) {
    for (const l of curatedLessons) {
      insertLesson.run(
        l.id, l.course_id, l.category_id, l.slug, l.title, l.hook_subtitle,
        l.reading_time_minutes, JSON.stringify(l.content_blocks),
        JSON.stringify(l.key_takeaways), l.audio_duration_seconds,
        l.order_in_course, l.is_daily_featured || 0
      );

      if (Array.isArray(l.questions)) {
        l.questions.forEach((q, idx) => {
          insertQuestion.run(
            q.id, l.id, q.question_text, JSON.stringify(q.options),
            q.correct_option_index, q.explanation_text, idx + 1
          );
        });
      }
    }
  }

  // 4. Ensure every course has at least one complete playable lesson with slides and quiz
  if (Array.isArray(allCourses)) {
    for (const c of allCourses) {
      const existing = db.prepare('SELECT count(*) as count FROM lessons WHERE course_id = ?').get(c.id).count;
      if (existing === 0) {
        const lessonId = 'lsn-' + c.id.replace('crs-', '') + '-1';
        const blocks = [
          {
            type: 'slide',
            title: c.title,
            text: `${c.synopsis} Approfondire questo tema significa esplorare i nodi cruciali del pensiero, della storia e della creatività umana. ${c.subtitle}. Conoscere queste dinamiche ci permette di andare oltre le opinioni superficiali per cogliere la struttura profonda della realtà.`,
            quote: `La conoscenza autentica non consiste nell'accumulare nozioni, ma nel coltivare uno sguardo lucido e curioso sul mondo.`,
            takeaway: `I grandi snodi culturali e scientifici sono scelte umane coraggiose che continuano a orientare il nostro presente.`
          },
          {
            type: 'slide',
            title: 'La Prospettiva Contemporanea',
            text: `Perché questo tema parla ancora a noi oggi? ${c.subtitle.toLowerCase()} non è un semplice reperto del passato o un esercizio astratto, ma uno strumento vivo per interpretare le trasformazioni del nostro tempo. Allenare la mente su questi concetti forgia la nostra capacità di giudizio e la nostra indipendenza intellettuale.`,
            quote: `Imparare qualcosa di nuovo ogni giorno è la più grande forma di libertà quotidiana.`,
            takeaway: `Custodisci i punti chiave di questa lettura e verifica la tua comprensione con il quiz di richiamo attivo.`
          }
        ];

        const takeaways = [
          `Comprendere il contesto e i principi essenziali di ${c.title}.`,
          `Riconoscere l'eredità viva di questo argomento nella società e nella cultura contemporanea.`,
          `Sviluppare un punto di vista autonomo e consapevole attraverso il richiamo attivo.`
        ];

        insertLesson.run(
          lessonId, c.id, c.category_id, c.slug + '-fondamenti',
          c.title, c.subtitle,
          7, JSON.stringify(blocks), JSON.stringify(takeaways), 420, 1, 0
        );

        insertQuestion.run(
          'q-' + lessonId + '-1',
          lessonId,
          `Qual è il significato centrale esplorato nel percorso "${c.title}"?`,
          JSON.stringify([
            'Che la realtà si riduce a poche nozioni statiche',
            `Che comprendere ${c.subtitle.toLowerCase()} allena il pensiero critico e la consapevolezza`,
            'Che le grandi idee del passato non hanno legami con l\'oggi',
            'Che solo gli specialisti possono comprendere questo argomento'
          ]),
          1,
          `La lezione sottolinea che approfondire ${c.title} stimola il pensiero critico e arricchisce la nostra visione del mondo.`,
          1
        );

        insertQuestion.run(
          'q-' + lessonId + '-2',
          lessonId,
          `Quale atteggiamento intellettuale promuove questa lettura?`,
          JSON.stringify([
            'L\'accettazione passiva dei pregiudizi comuni',
            'La curiosità attiva e la verifica autonoma delle idee',
            'L\'indifferenza verso la storia e la scienza',
            'La rinuncia a porsi nuove domande'
          ]),
          1,
          `La curiosità e il dubbio metodico sono la base su cui si fonda ogni vero percorso di crescita culturale.`,
          2
        );
      }
    }
  }
}
