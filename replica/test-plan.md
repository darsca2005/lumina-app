# Test Plan (`replica-test`)

Piano di test automatizzato e manuale per **Lumina : Cultura Quotidiana** basato sui flussi `F01`–`F06`.

## Flussi Testati

### F01 Onboarding personalizzato & Avvio Immediato
- **F01-H1 (Happy Path):** Avvio dell'app -> Bootstrap restituisce utente e categorie -> Selezione 3 materie -> Selezione obiettivo 10 min -> Salvataggio e caricamento della Home.
- **F01-E1 (Edge Case):** Apertura da browser mobile o con sessione vuota (fallback trasparente all'utente predefinito).
- **F01-E2 (Edge Case):** Creazione profilo per un amico con emoji personalizzata e inclusione automatica nella classifica amici.

### F02 Core Loop: Lettura Lezione + Quiz + Streak
- **F02-H1 (Happy Path):** Tap su "Inizia la lettura" dalla Home -> Scorrimento schede narrative -> Lettura citazioni e punti chiave -> Apertura quiz -> Risposta alle domande con spiegazione didattica immediata -> Celebrazione e incremento della streak.
- **F02-E1 (Edge Case):** Uscita anticipata a metà lettura (salvataggio percentuale di avanzamento).
- **F02-E2 (Edge Case):** Invio quiz con risposte errate (visualizzazione spiegazione didattica correttiva prima del passaggio alla schermata successiva).
- **F02-E3 (Edge Case):** Completamento ripetuto della stessa lezione nello stesso giorno (idempotente: non gonfia artificialmente la streak).

### F03 Modalità Audio (Podcast Mode)
- **F03-H1 (Happy Path):** Tap su "Ascolta la narrazione" nel lettore -> Avvio sintesi vocale italiana -> Cambio velocità (1x, 1.25x, 1.5x) -> Avanzamento sincronizzato delle schede.

### F04 Esplorazione Catalogo e Preferiti
- **F04-H1 (Happy Path):** Navigazione nel tab "Esplora" -> Filtro per materia (Storia, Filosofia, ecc.) -> Apertura dettaglio corso -> Tap sull'icona cuore per salvare la lezione nei preferiti.

### F05 Patto di Concentrazione (Focus Lock)
- **F05-H1 (Happy Path):** Attivazione Focus Lock dalle impostazioni -> Visualizzazione banner impegno attivo nella Home -> Completamento della lezione del giorno e del quiz -> Sblocco immediato con messaggio di celebrazione.

### F06 Ripasso Attivo (Spaced Repetition) e Mappa Conoscenza
- **F06-H1 (Happy Path):** Navigazione nel tab "Ripasso" -> Estrazione automatica delle domande pregresse -> Risposta e verifica feedback -> Aggiornamento contatori nella Mappa della Conoscenza.

## Risultati Esecuzione Test
- Esecutore: `node --test tests/e2e.test.mjs`
- Test totali: **9 eseguiti**
- Test superati: **9 (100%)**
- Test falliti: **0**
