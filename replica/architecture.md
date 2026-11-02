# Architecture: Lumina (a 100% free rebuild of Sophia's core features for personal & friends use)

## Stack

| layer | choice | why |
| --- | --- | --- |
| web & mobile PWA | Node.js HTTP Server + Vanilla ES2024 SPA + PWA (`manifest.json` + Service Worker) | Avvio istantaneo a zero dipendenze esterne, installabile come app nativa su iOS/Android per te e i tuoi amici, zero costi |
| styling | CSS Custom Properties (`tokens.css`) generati da `replica-design/tokens.json` | 100% basato su design token semantici verificati WCAG AA con `contrast.py` |
| database | SQLite nativo (`node:sqlite` `DatabaseSync`) + schema compatibile Supabase Postgres | Persistenza reale su file (`data/lumina.db`), zero configurazione richiesta, pronto per migrazione cloud su Supabase |
| auth & friends | Sessione multi-profilo con codice amico / email + isolamento `user_id` | Permette a te e ai tuoi amici di avere ciascuno il proprio profilo, la propria streak e confrontarvi nella classifica amici senza paywall |
| audio / TTS | Web Speech API (`speechSynthesis` `it-IT`) + Audio Engine sincronizzato a schede | Narrazione vocale reale in italiano con controllo velocità (`1x`, `1.25x`, `1.5x`), seek ±15s e barra progresso senza costi API |
| payments | Nessuno (`skip`) | L'app è 100% gratuita per scelta dell'utente; tutti i corsi e le funzionalità sono sbloccati |
| hosting | Locale / Self-hosted / Render / Fly / Railway / Supabase | Eseguibile in locale con `npm start` o condivisibile in rete locale/cloud con gli amici |

## Schema

Tables: **10** (`categories`, `users`, `user_interests`, `courses`, `lessons`, `quiz_questions`, `user_lesson_progress`, `user_quiz_attempts`, `user_favorites`, `daily_activity_logs`).
Access rules: Controlli di autorizzazione nel data-layer su ogni query filtrata per `user_id` (più policy RLS pronte per Supabase).

Vedi [`replica/schema.sql`](file:///Users/darsca/Documents/clona%20app/replica/schema.sql).

## API

| method path | does | who | input | output | flow |
| --- | --- | --- | --- | --- | --- |
| `GET /api/bootstrap` | Carica profilo corrente, categorie, stato giornaliero, lezione del giorno, corsi, preferiti e classifica amici | user / guest | `?userId=` (header o query) | `{ user, categories, dailyLesson, courses, progress, favorites, friendsLeaderboard, stats }` | F01, F02, F04, F06 |
| `POST /api/onboarding` | Salva materie scelte, obiettivo giornaliero (5/10/15m), nome profilo, orario notifiche e stato Focus Lock | user | `{ userId, displayName, avatarEmoji, dailyGoalMinutes, categoryIds, focusLockEnabled, notificationTime }` | `{ user, interests }` | F01 |
| `POST /api/users/switch` | Crea un nuovo profilo per un amico o passa a un profilo esistente | user | `{ displayName, email, avatarEmoji }` oppure `{ userId }` | `{ user }` | F01, Friends |
| `GET /api/courses/:id` | Restituisce i dettagli di un corso con le lezioni ordinate e lo stato di avanzamento dell'utente | user | `courseId` | `{ course, lessons }` | F04 |
| `GET /api/lessons/:id` | Restituisce il contenuto completo a schede di una lezione, i dati audio e le domande del quiz | user | `lessonId` | `{ lesson, questions, userProgress }` | F02, F03 |
| `POST /api/lessons/:id/progress` | Salva la percentuale di lettura, la posizione audio o una nota personale sulla lezione | user | `{ readingProgressPct, lastAudioPositionSec, personalNote }` | `{ progress }` | F02, F03 |
| `POST /api/lessons/:id/complete` | Valida le risposte del quiz, calcola il punteggio, incrementa la streak giornaliera, aggiorna il log attività e sblocca il Focus Lock | user | `{ answers: number[], minutesStudied }` | `{ score, total, streakUpdated, currentStreak, focusUnlocked, dailyLog }` | F02, F03, F05 |
| `GET /api/review` | Estrae fino a 5 domande di ripasso attivo (spaced repetition) dalle lezioni già completate dall'utente | user | `userId` | `{ questions }` | F06 |
| `POST /api/review/submit` | Registra l'esito di una sessione di ripasso attivo e aggiorna le date di prossima revisione | user | `{ results: [{questionId, lessonId, selectedOptionIndex}] }` | `{ reviewedCount, correctCount }` | F06 |
| `POST /api/favorites/toggle` | Aggiunge o rimuove una lezione o un corso dai preferiti dell'utente | user | `{ lessonId?, courseId? }` | `{ favorited, favorites }` | F04 |
| `POST /api/settings` | Aggiorna preferenze di lettura (tema, font), Focus Lock, obiettivo giornaliero o usa uno Streak Freeze | user | `{ readerTheme, readerFontSize, focusLockEnabled, dailyGoalMinutes, notificationTime }` | `{ user }` | F05, S15 |
| `DELETE /api/users/:id` | Cancella o ripristina tutti i dati del profilo corrente (GDPR / Reset) | owner (`userId`) | `userId` | `{ deleted: true }` | S15 |

Webhooks in: Nessuno (nessun gateway di pagamento richiesto).
Webhooks out: Nessuno.
Jobs: Calcolo automatico dello stato della streak e controllo *Streak Freeze* al caricamento giornaliero (`/api/bootstrap`).

## The parts that bite

- **Time zones & Streak giornaliera**: Il calcolo della *streak* usa la data locale `YYYY-MM-DD`. Completare più lezioni nello stesso giorno incrementa i minuti studiati e le lezioni completate ma incrementa il contatore `current_streak` una sola volta al giorno; se l'utente salta un giorno ed è disponibile uno *Streak Freeze*, la serie viene preservata automaticamente.
- **Idempotency**: Inviare due volte il completamento dello stesso quiz nello stesso giorno (`POST /api/lessons/:id/complete`) usa `ON CONFLICT(user_id, lesson_id) DO UPDATE` e non gonfia artificialmente la streak.
- **Isolamento multi-utente (Amici)**: Ogni amico ha il proprio `user_id`; i preferiti, le note personali e le percentuali di avanzamento sono strettamente isolati per `user_id`, mentre la *Classifica Amici* espone solo nome, emoji, streak e lezioni completate.
- **Audio senza dipendenze esterne**: Il player usa la sintesi vocale nativa del browser (`window.speechSynthesis`) sincronizzata con i blocchi della lezione + un timer di riproduzione fluido di fallback così che il player funzioni sempre, anche su browser headless o con audio disattivato.
- **GDPR / Reset**: Cancellazione immediata in cascata (`ON DELETE CASCADE`) di progressi, tentativi quiz, preferiti e log giornalieri.

## Build order

1. **Vertical slice**: `S05` (Home Oggi) -> `S08` (Lettore Lezione) -> `S10` (Quiz di Fine Lezione) -> `S11` (Celebrazione & Streak), con database SQLite e catalogo reale.
2. **Must-haves**: `S01`–`S04` (Onboarding completo), `S06`–`S07` (Catalogo & Dettaglio Corso), `S13` (Statistiche & Mappa Cultura), `S14` (Preferiti).
3. **Should-haves & Could-haves**: `S09` (Modalità Audio Podcast), `S12` (Ripasso Attivo Spaced Repetition), `S15` (Profilo, Temi di lettura, Focus Lock, Gestione Amici).
4. **Fixes da `replica-entrepreneur`**: Accesso 100% gratuito illimitato, Cerchia & Classifica Amici integrata, Note personali per lezione, Streak Freeze gratuito incluso.
