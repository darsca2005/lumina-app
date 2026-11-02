# Component Specifications (`replica-design`)

Tutti i componenti utilizzano esclusivamente i token definiti in [`tokens.json`](file:///Users/darsca/Documents/clona%20app/replica/design/tokens.json) e [`tokens.css`](file:///Users/darsca/Documents/clona%20app/replica/design/tokens.css).

```
Button
  variants  primary, secondary, outline, ghost, danger
  sizes     sm 34px, md 42px, lg 50px
  states    default, hover, active, focus-visible (2px ring, accent), disabled, loading
  tokens    bg accent / surface, text on-accent / text, radius md, font sm/600
  a11y      elemento nativo <button>, focus visibile ad alto contrasto, aria-busy in loading
  used on   all (S01..S15)

TopicPill / CategoryChip
  variants  Storia, Filosofia, Scienza, Geopolitica, Letteratura, Economia, Arte, Psicologia
  sizes     compact (28px), standard (38px), card-grid (72px)
  states    unselected, selected (bg accent, text on-accent), hover, focus-visible
  tokens    bg surface / accent, border border, radius pill, font sm/500
  a11y      role="checkbox" o <button aria-pressed="true|false">
  used on   S02, S05, S06, S07, S08, S13

StreakBanner
  variants  compact (header pill), expanded (striscia settimanale Lun-Dom + badge Streak Freeze)
  states    streak active, streak completed today, streak freeze active, day missed
  tokens    bg surface, border border, accent warning/success, radius lg
  a11y      aria-label descrittivo ("Serie attuale: N giorni consecutivi")
  used on   S05, S11, S13

LessonCard
  variants  hero (Lezione del Giorno), row (lista corso/esplora), compact (preferiti)
  states    todo, in-progress (barra % visibile), completed (badge verde check)
  tokens    bg surface / bg, border border, shadow card, radius lg, font lg/600 (serif title)
  a11y      articolo cliccabile con titolo semantico <h3> e stato progresso letto da screen reader
  used on   S05, S06, S07, S14

CourseCard
  variants  grid card, horizontal progress card
  states    not-started, in-progress (es. "1/2 lezioni"), completed ("Completato 100%")
  tokens    bg bg, border border, shadow card, radius lg
  a11y      link/button con conteggio lezioni e tempo stimato
  used on   S05, S06, S07, S14

ReadingProgressBar
  variants  continuous top bar, segmented slide steps
  states    0%..100%
  tokens    bg border, fill accent, height 6px, radius pill
  a11y      role="progressbar" con aria-valuenow, aria-valuemin="0", aria-valuemax="100"
  used on   S02, S03, S08, S10

LessonSlide / ReaderBlock
  variants  narrative slide, historical quote callout, key-takeaway card, personal note editor
  states    theme paper, theme sepia, theme night; font sm (15px), md (17px), lg (20px)
  tokens    font serif per il corpo editoriale, bg var(--reader-bg), text var(--reader-text)
  a11y      navigazione da tastiera (Frecce Sinistra/Destra), contrasto AAA
  used on   S08

AudioMiniPlayer & AudioSheet
  variants  mini-bar in basso sul reader, full modal sheet (S09)
  states    idle, playing, paused, speed 1x / 1.25x / 1.5x, slide sync highlight
  tokens    bg surface, accent accent, radius lg, shadow pop
  a11y      pulsanti Play/Pausa, -15s, +15s e velocità con aria-label espliciti
  used on   S08, S09

QuizOptionCard
  variants  4 opzioni con badge lettera (A, B, C, D)
  states    default, selected, correct (border/bg success), wrong (border/bg danger), locked
  tokens    bg bg, border border-input, radius md, font base/500
  a11y      selezione da tastiera (tasti 1-4 o Tab+Invio), stato annunciato via aria-live
  used on   S10, S12

ExplanationCallout
  variants  correct feedback, wrong feedback con spiegazione didattica
  states    hidden, visible
  tokens    bg success-soft / danger-soft, text text, border success / danger, radius md
  a11y      role="region" aria-live="polite"
  used on   S10, S12

MasteryRadar / SubjectBar
  variants  subject mastery progress bar con livello e percentuale
  states    empty (0%), active (1..100%)
  tokens    bg surface, fill accent, radius md
  a11y      etichetta testuale con lezioni completate per materia
  used on   S13

FocusLockToggleCard
  variants  onboarding setup card, settings control card, active lock banner
  states    disabled, enabled (locked until daily lesson done), unlocked for today
  tokens    bg warning-soft / success-soft, border warning / success, radius lg
  a11y      switch accessibile con stato chiaro e pulsante sblocco di emergenza
  used on   S04, S05, S11, S15

FriendsLeaderboardCard
  variants  cerchia amici settimanale + selettore/creazione profilo amico
  states    active user highlighted, friend row, add friend modal
  tokens    bg surface, border border, radius lg
  a11y      tabella/lista ordinata per streak e lezioni completate
  used on   S05, S13, S15

BottomTabBar
  variants  5 voci (Oggi, Esplora, Ripasso, Progressi, Profilo & Amici)
  states    active, inactive
  tokens    bg bg, border border, active text accent
  a11y      <nav aria-label="Navigazione principale"> con aria-current="page"
  used on   S05, S06, S12, S13, S14, S15
```
