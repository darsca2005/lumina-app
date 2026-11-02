# Backend & Infrastructure Report (`replica-backend`)

Implementazione del backend per **Lumina : Cultura Quotidiana**.

## Database & Architettura
- **Database Engine:** SQLite nativo tramite modulo standard `node:sqlite` (`DatabaseSync`), persistito su `data/lumina.db`.
- **Compatibilità Cloud:** Lo schema in `replica/schema.sql` è 100% conforme a PostgreSQL e pronto per migrazione trasparente su Supabase.
- **Relazioni & Vincoli:** 10 tabelle relazionali con chiavi esterne attive (`PRAGMA foreign_keys = ON`), indici su tutte le chiavi esterne e colonne di ordinamento/filtro, vincoli `CHECK` per stati e valori enumerati.

## Checklist Sicurezza e Conformità
- [x] **Segreti solo in env vars:** file `.env.example` creato; nessun token o credenziale hardcodata nel codice.
- [x] **Validazione input:** parsing controllato dei payload JSON con limite di dimensione del corpo (2MB) e sanitizzazione dei parametri nelle prepared statements.
- [x] **Isolamento multi-utente (Amici):** ogni query sul progresso, sui quiz, sui preferiti e sulle note personali è filtrata rigorosamente per `user_id`.
- [x] **Nessun gateway a pagamento:** rimozione sicura di Stripe/RevenueCat; l'applicazione è 100% gratuita per scelta dell'utente.
- [x] **Audio & TTS a costo zero:** utilizzo della Web Speech Synthesis API (`it-IT`) lato client + metadati di riproduzione nel server; nessuna dipendenza da API esterne a pagamento o con quote limitate.
- [x] **Cancellazione dati (GDPR / Reset):** endpoint `DELETE /api/users/:id` con cancellazione a cascata (`ON DELETE CASCADE`) dei progressi, delle risposte ai quiz e dei preferiti.
- [x] **Cache PWA Offline:** Service Worker (`sw.js`) per il caching dei file statici (`index.html`, `tokens.css`, `style.css`, `app.js`, `manifest.json`).

## API Endpoints Implementati
- `GET /api/bootstrap?userId=` (Profilo, catalogo, stato giornaliero, preferiti, classifica amici)
- `POST /api/onboarding` (Salvataggio interessi, ritmo di studio, Focus Lock)
- `POST /api/users/switch` (Cambio profilo utente o creazione nuovo profilo per un amico)
- `GET /api/courses/:id` (Dettaglio corso con lezioni ordinate e progresso utente)
- `GET /api/lessons/:id` (Testo a schede della lezione, audio e domande del quiz)
- `POST /api/lessons/:id/progress` (Avanzamento lettura, posizione audio e note personali)
- `POST /api/lessons/:id/complete` (Calcolo punteggio quiz, aggiornamento streak, sblocco Focus)
- `GET /api/review` (Domande casuali per spaced repetition da lezioni passate)
- `POST /api/review/submit` (Salvataggio esito sessione di ripasso)
- `POST /api/favorites/toggle` (Aggiunta/rimozione lezione dai preferiti)
- `POST /api/settings` (Aggiornamento tema, dimensione caratteri, obiettivo giornaliero, Focus Lock)
- `DELETE /api/users/:id` (Reset completo dei dati dell'utente)
