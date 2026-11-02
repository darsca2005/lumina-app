# Recon map: Sophia : Cultura Generale (iOS / Android / Web App)

Scope: Tutte le funzionalità di Sophia (core loop di micro-apprendimento quotidiano da 5-10 min, modalità audio, quiz di verifica a fine lezione con spiegazioni, tracciamento streak/statistiche, ripasso attivo, catalogo completo per discipline, preferiti e Focus Lock anti-distrazione), **100% gratuita e senza paywall**.
For: Uso personale dell'utente e della sua cerchia di amici (nessuna monetizzazione, nessun limite giornaliero, tutti i contenuti e funzionalità sbloccati).
Date: 2026-11-02

## Sources

| # | source | URL | notes |
| --- | --- | --- | --- |
| 1 | App Store listing (IT) | https://apps.apple.com/it/app/sophia-cultura-generale/id6760919622 | Scheda ufficiale italiana (`id6760919622`), pitch, screenshot delle schermate chiave, categorie |
| 2 | App Store listing (US/FR/ES) | https://apps.apple.com/us/app/sophia-general-knowledge/id6760919622 | Varianti localizzate (*Sophia : General Knowledge*, *Sophia : Culture Générale*), claim sul blocco app ("Less scrolling, more knowledge") |
| 3 | Google Play Store | https://play.google.com/store/apps/details?id=com.vikstudios.sophia | Descrizione estesa del formato 10 min/giorno, categorie trattate e richiamo attivo con quiz |
| 4 | Marketing site | https://sophia-culture.com | Posizionamento del prodotto, presentazione del metodo di studio quotidiano e materie |
| 5 | Developer site & Privacy Policy | https://vikstudios.com | Informativa tecnica e privacy di Vik Studios SAS: rivela il data model (progressi, quiz, interessi, età, streak, preferiti), backend su **Supabase** e login semplificato Apple/Google |
| 6 | AppBrain developer profile | https://www.appbrain.com/dev/Vik+Studios+SAS/ | Storico versioni, posizionamento nella categoria Istruzione, portfolio app correlate dello studio |

## Core loop

Ogni giorno l'utente (o un suo amico) apre l'app, legge o ascolta una micro-lezione di 5–10 minuti su una disciplina di cultura generale senza alcun blocco o paywall, risponde al quiz interattivo di fine lezione per fissare i concetti nella memoria a lungo termine, prolunga la propria serie consecutiva (*streak*) e sblocca il Focus Lock giornaliero.

## Screens

| ID | screen | route / how to reach | purpose | key components | states seen |
| --- | --- | --- | --- | --- | --- |
| S01 | Welcome & Value Pitch | `/onboarding/welcome` (primo avvio) | Presentare l'app ("Meno scrolling, più cultura in 10 minuti al giorno") e avviare la configurazione rapida | Hero illustration, Value bullets, Primary CTA Button, Link "Hai già un profilo? Accedi" | default, mobile |
| S02 | Onboarding: Scelta Materie | `/onboarding/interests` (da S01) | Scegliere le discipline preferite per personalizzare il feed quotidiano | Progress header, Grid di `TopicPill` (Storia, Filosofia, Scienza, Geopolitica, Letteratura, Economia, Arte, Psicologia), Continue Button | empty (0 selezionate -> CTA disabilitata), filled (≥1 selezionate) |
| S03 | Onboarding: Obiettivo & Profilo | `/onboarding/goals` (da S02) | Impostare il ritmo giornaliero (5, 10, 15 min/giorno), nome/nickname per gli amici, fascia d'età e orario promemoria | Goal Option Cards, Input nome/nickname, Time Picker promemoria, Richiesta permesso notifiche | default, selected, permission denied |
| S04 | Onboarding: Focus Blocker Setup | `/onboarding/focus-lock` (da S03) | Configurare l'impegno anti-distrazione (Focus Lock) finché la lezione giornaliera non è completata | Focus Lock Explainer Card, App/Category Picker, Attiva / Salta configurazione | default, enabled, skipped |
| S05 | Home / Oggi (Daily Feed) | `/home` (Tab 1 principale) | Mostrare la "Lezione del Giorno", lo stato della Streak settimanale e i corsi in corso | `StreakBanner` con calendario Lun-Dom, Hero Card "Lezione del Giorno", Carosello "Continua a studiare", Card "Ripasso rapido", `BottomTabBar` | loading, daily goal todo, daily goal completed |
| S06 | Esplora Catalogo & Categorie | `/explore` (Tab 2) | Sfogliare liberamente tutti i corsi e le lezioni per disciplina o cercare un argomento specifico | Search Input, Filtro orizzontale `CategoryChip`, Griglia/Lista `CourseCard` e `LessonCard` con badge durata e stato completamento | loading, filled, empty search results, filtered |
| S07 | Dettaglio Corso / Percorso | `/courses/:courseId` (tap su un corso da S05/S06) | Presentare la struttura di un percorso tematico (es. "I Cento Giorni di Napoleone", "Macroeconomia Base") e tutti i suoi moduli | Course Header (titolo, categoria, durata totale, % completamento), Favorite Toggle Button, Lista ordinata moduli/lezioni con stato (completata, in corso, da fare), CTA "Inizia / Riprendi" | not started, in progress, completed |
| S08 | Lettore Lezione (Micro-Reader) | `/lessons/:lessonId` (da S05/S07) | Permettere la lettura concentrata e priva di distrazioni della lezione suddivisa in sezioni/schede | Top `ReadingProgressBar`, Pulsante Chiudi, Controllo dimensione testo e tema, Pulsante "Ascolta" (apre S09), `LessonSlide` / blocchi tipografici con citazioni e punti chiave, CTA finale "Passa al Quiz" | loading, reading (progress 0-100%), audio playing mini-bar, completed |
| S09 | Player Audio (Podcast Mode) | `/lessons/:lessonId/audio` (sheet/modal da S08 o S05) | Ascoltare la lezione narrata in stile mini-podcast mentre si è in movimento | Copertina/Categoria, Titolo lezione, Scrubber barra temporale, Controlli Play/Pausa, Skip -15s/+15s, Selettore velocità (`1x`, `1.25x`, `1.5x`), Toggle vista testo | buffering, playing, paused, ended (auto-prompt quiz) |
| S10 | Quiz di Fine Lezione | `/lessons/:lessonId/quiz` (da S08/S09) | Consolidare i concetti appena studiati tramite 3–5 domande a scelta multipla | Step indicator (`Domanda 2 di 4`), Testo domanda, Lista `QuizOptionCard`, `ExplanationCallout` (box spiegazione post-risposta), CTA "Continua" | unanswered, answered-correct (verde), answered-wrong (rosso + spiegazione) |
| S11 | Riepilogo & Celebrazione Streak | `/lessons/:lessonId/complete` (fine S10) | Premiare il completamento, aggiornare la serie giornaliera e sbloccare il Focus Lock se attivo | Animazione fiamma Streak, Riepilogo punteggio quiz (es. `4/4`), Badge "Obiettivo giornaliero raggiunto / Focus sbloccato", Statistica minuti studiati, CTA "Torna alla Home" | first completion of day (streak +1), repeat completion, perfect score vs partial |
| S12 | Ripasso Attivo (Daily Review) | `/review` (da S05 o S13) | Rinfrescare la memoria sulle lezioni passate con domande pescate dallo storico dell'utente | Deck di domande miste, Contatore risposte esatte, Box "Dal corso: [Titolo]", Link "Rileggi la lezione" | empty (nessuna lezione completata), active session, summary |
| S13 | Progressi, Streak & Mappa Cultura | `/progress` (Tab 3) | Mostrare la crescita culturale nel tempo, il calendario di costanza e la distribuzione per materia | Contatori KPI (Streak attuale, Record streak, Lezioni finite, Minuti totali), Calendario mensile di attività, `MasteryRadar` / barre di avanzamento per materia (Storia, Scienza, Filosofia, ecc.) | empty (nuovo utente), filled, milestone unlocked |
| S14 | Preferiti / Libreria Salvata | `/favorites` (sezione in Esplora/Profilo o Tab dedicato) | Raccogliere le lezioni e i corsi salvati col segnalibro per rileggerli rapidamente | Filtro "Lezioni / Corsi", Lista `LessonCard` e `CourseCard` salvate, Swipe/tap per rimuovere | empty ("Non hai ancora salvato lezioni"), filled |
| S15 | Profilo, Impostazioni & Focus Lock | `/settings` (Tab 4 / icona profilo) | Gestire profilo e sync cloud (per non perdere i progressi o usarla tra amici), Focus Lock, notifiche e preferenze | Card Account (Ospite locale vs Connesso con Email/Google/Apple), `FocusLockToggleCard`, Impostazioni obiettivo e notifiche, Selettore lingua, Reset/Esporta dati | anonymous local, signed-in synced |

## Flows

```
F01 Onboarding personalizzato (senza paywall)
    S01 welcome -> S02 scelta materie -> S03 obiettivo & notifiche -> S04 configurazione focus lock -> S05 home
    happy path clicks: 5
    edge: l'utente salta il Focus Lock o nega i permessi notifiche; l'utente ha già un profilo salvato e fa "Accedi" da S01.

F02 Core Loop: Completamento della Lezione del Giorno + Quiz + Streak
    S05 home -> S08 lettore lezione -> S10 quiz di verifica (4 domande) -> S11 celebrazione & streak -> S05 home aggiornata
    happy path clicks: 8
    edge: l'utente esce a metà lettura (salvataggio automatico dello stato di avanzamento); l'utente sbaglia una domanda del quiz (mostra spiegazione didattica prima di procedere); l'utente può continuare a leggere quante lezioni vuole senza limiti giornalieri.

F03 Studio in Modalità Audio (Podcast Mode)
    S05 home (o S07 corso) -> S08 lettore lezione -> S09 player audio -> S10 quiz di verifica -> S11 completamento
    happy path clicks: 6
    edge: cambio velocità di riproduzione (1x, 1.25x, 1.5x); passaggio fluido da ascolto a lettura nello stesso punto.

F04 Esplorazione Catalogo per Materia e Salvataggio Preferiti
    S05 home -> S06 esplora catalogo -> S07 dettaglio corso -> tap icona segnalibro -> S14 preferiti (o S08 avvio lezione)
    happy path clicks: 4
    edge: ricerca testuale senza risultati in S06; filtro combinato per materia e stato (da fare / completate).

F05 Blocco Distrazioni (Focus Lock) e Sblocco tramite Studio
    S15 impostazioni (o S04) attiva Focus Lock -> [Focus Lock attivo prima dello studio giornaliero] -> S05 home -> S08 lezione -> S10 quiz -> S11 sblocco automatico
    happy path clicks: 7
    edge: l'utente usa uno "Sblocco di emergenza" temporaneo; su Web/PWA funziona come Focus Commitment Mode all'apertura, su iOS nativo può agganciarsi a Screen Time.

F06 Ripasso Attivo (Spaced Repetition) e Consultazione Statistiche
    S05 home -> S13 progressi & mappa cultura -> S12 sessione di ripasso -> S11 riepilogo -> S13 statistiche aggiornate
    happy path clicks: 6
    edge: l'utente non ha ancora completato alcuna lezione (stato empty in S12 con invito a fare la prima lezione in S05).
```

## Components

| component | variants | states | used on |
| --- | --- | --- | --- |
| `Button` | primary, secondary, outline, ghost, icon-only | default, hover, active, disabled, loading | all |
| `TopicPill` / `CategoryChip` | Storia, Filosofia, Scienza, Geopolitica, Letteratura, Economia, Arte, Psicologia | unselected, selected, compact badge | S02, S05, S06, S07, S08, S13 |
| `StreakBanner` | compact (top bar), expanded (weekly Lun-Dom strip) | streak active (fiamma accesa), streak at risk, day completed (check), day missed | S05, S11, S13 |
| `LessonCard` | hero (Lezione del Giorno), standard row, compact grid | todo, in-progress (con barra %), completed (check) | S05, S06, S07, S14 |
| `CourseCard` | vertical card, horizontal progress card | not started, in-progress (`3/7 lezioni`), completed | S05, S06, S07, S14 |
| `ReadingProgressBar` | continuous bar, segmented steps | 0%..100% | S02, S03, S08, S10 |
| `LessonSlide` / `ReaderBlock` | heading, body paragraph, key-takeaway box, quote block, historical timeline item | default, dark/sepia/light reading mode, font size S/M/L | S08 |
| `AudioMiniPlayer` & `AudioSheet` | bottom mini-bar, full-screen sheet | loading, playing, paused, speed `1x`/`1.25x`/`1.5x` | S08, S09 |
| `QuizOptionCard` | single-choice card with letter badge (`A`, `B`, `C`, `D`) | default, selected, correct (verde + icona check), wrong (rosso + icona X), disabled | S10, S12 |
| `ExplanationCallout` | feedback banner post-risposta | correct reinforcement, error correction + spiegazione | S10, S12 |
| `MasteryRadar` / `SubjectBar` | barra di livello per materia, grafico distribuzione | level 1..10, 0%..100% | S13 |
| `FocusLockToggleCard` | card configurazione blocco distrazioni | disabled, enabled (waiting daily lesson), unlocked for today | S04, S05, S11, S15 |
| `BottomTabBar` | 4 tab: Oggi, Esplora, Progressi, Profilo | active tab, inactive tab | S05, S06, S13, S14, S15 |

## Inferred data model

```
UserProfile         id (uuid), email, display_name, auth_provider (anonymous | email | google | apple),
                    age_range, daily_goal_minutes (5 | 10 | 15), preferred_locale,
                    current_streak (int), longest_streak (int), last_streak_date (date),
                    notification_time (time), focus_lock_enabled (bool), created_at
                    evidence: Vik Studios privacy policy ("preferences: interests, age, streaks",
                              "Supabase", "Google or Apple login"), S02, S03, S15
                    confidence: high

Category            id (uuid), slug, name, description, icon_name, accent_color, sort_order
                    evidence: S02, S06, App Store description (Storia, Scienza, Filosofia,
                              Geopolitica, Letteratura, Economia, Arte, Psicologia)
                    confidence: high

UserInterest        user_id (uuid), category_id (uuid), created_at
                    evidence: S02 onboarding selection, Vik Studios privacy policy ("interests")
                    confidence: high

Course              id (uuid), category_id (uuid), slug, title, subtitle, synopsis,
                    difficulty_level (base | intermedio | avanzato), estimated_total_minutes (int),
                    lessons_count (int), cover_illustration, sort_order
                    evidence: S06, S07, App Store description ("Napoleon's Hundred Days", "Macroeconomics")
                    confidence: high

Lesson              id (uuid), course_id (uuid nullable), category_id (uuid), slug, title,
                    hook_subtitle, reading_time_minutes (int), content_blocks (jsonb: slides/sezioni,
                    key takeaways, citazioni), audio_url (text), audio_duration_seconds (int),
                    order_in_course (int), is_daily_featured (bool), published_at
                    evidence: S05, S07, S08, S09 ("10 minutes a day", "audio mode")
                    confidence: high

QuizQuestion        id (uuid), lesson_id (uuid), question_text, options (jsonb array of 4 strings),
                    correct_option_index (int 0..3), explanation_text, sort_order (int)
                    evidence: S10, S12 ("end-of-lesson quizzes", "daily questions")
                    confidence: high

UserLessonProgress  id (uuid), user_id (uuid), lesson_id (uuid),
                    status (in_progress | completed), reading_progress_pct (int 0..100),
                    last_audio_position_sec (int), quiz_score (int), quiz_total (int),
                    completed_at (timestamptz), updated_at (timestamptz)
                    evidence: Vik Studios privacy policy ("course/quiz progression"), S05, S07, S08, S11
                    confidence: high

UserQuizAttempt     id (uuid), user_id (uuid), question_id (uuid), lesson_id (uuid),
                    selected_option_index (int), is_correct (bool), next_review_at (timestamptz),
                    answered_at (timestamptz)
                    evidence: S10, S12 active recall / ripasso
                    confidence: medium

UserFavorite        user_id (uuid), lesson_id (uuid nullable), course_id (uuid nullable), created_at
                    evidence: Vik Studios privacy policy ("favorites"), S07, S08, S14
                    confidence: high

DailyActivityLog    id (uuid), user_id (uuid), activity_date (date),
                    lessons_completed_count (int), minutes_studied (int), goal_met (bool),
                    focus_unlocked_at (timestamptz)
                    evidence: S05 weekly strip, S11 unlock, S13 activity calendar
                    confidence: high
```

Relationships:
- `Category 1-n Course`, `Category 1-n Lesson`, `Course 1-n Lesson`
- `Lesson 1-n QuizQuestion`
- `UserProfile n-m Category` (attraverso `UserInterest`)
- `UserProfile 1-n UserLessonProgress`, `UserProfile 1-n UserQuizAttempt`, `UserProfile 1-n UserFavorite`, `UserProfile 1-n DailyActivityLog`

## Feature matrix

See [`replica/features.csv`](file:///Users/darsca/Documents/clona%20app/replica/features.csv). Must: 12, should: 7, could: 5, skip: 4 (totale: 28 voci, di cui 24 conteggiate per la parità).

## Out of scope (cannot or should not be cloned)

- **Paywall, abbonamenti e limiti giornalieri (RevenueCat / IAP)**: esclusi per scelta esplicita — l'app sarà **100% gratuita** e completamente sbloccata per te e i tuoi amici.
- **Testi editoriali e tracce audio proprietarie di Sophia / Vik Studios SAS**: i testi delle lezioni, i quiz e l'audio originale sono protetti da diritto d'autore. Il clone utilizzerà lezioni e quiz di cultura generale interamente scritti ex-novo (originali) e narrazione audio/TTS generata sul nostro catalogo originale.
- **Marchio "Sophia", logo e asset grafici dello store**: nella fase `/replica-brand` opzionale potremo scegliere il nome e l'icona per la tua versione.
- **Blocco nativo di app di terze parti a livello OS quando eseguito su Web/Browser**: in versione Web/PWA la funzione viene implementata come **Focus Commitment Mode** (impegno anti-distrazione e blocco finché non completi la lezione del giorno), mentre l'API Apple `FamilyControls` resta un'opzione solo per build nativa iOS con account Apple Developer a pagamento.

## Size

Screens 15, flows 6, entities 10. Hard parts: (1) creazione di un catalogo iniziale ricco e curato di lezioni multi-scheda e relativi quiz per tutte le materie, (2) player audio sincronizzato con il testo della lezione (con Web Speech API / audio TTS di alta qualità), (3) calcolo affidabile delle serie (*streak*) giornaliere con salvataggio immediato e sincronizzazione tra dispositivi per te e i tuoi amici. Size: **M** (1–2 settimane completa senza tutta la complessità di billing/paywall; **S** per la vertical slice del core loop).
