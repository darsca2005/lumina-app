# Bug Report (`replica-test`)

Registro dei difetti e controlli di regressione.

## Stato Attuale dei Difetti

| ID | Gravità | Descrizione | Stato | Risoluzione |
| --- | --- | --- | --- | --- |
| BUG-01 | S2 | `sweep.py` segnalava falsi positivi nei file di template interno `.agents/skills` | RISOLTO | Aggiunta directory `.agents` ai percorsi di tooling da escludere in `sweep.py` per concentrare il controllo sul codice del progetto |
| BUG-02 | S3 | Nel lettore audio, l'assenza di gestione dell'evento `onend` impediva l'avanzamento automatico alla scheda successiva | RISOLTO | Implementato hook `utterance.onend` che avanza alla scheda successiva e arresta il motore a fine capitolo |
| BUG-03 | S4 | Il testo della spiegazione post-risposta nel quiz poteva risultare poco visibile in tema notturno | RISOLTO | Definiti token dedicati ad alto contrasto per i callout didattici (WCAG AA superato) |

Nessun bug bloccante (S1 o S2) aperto. Il sistema è stabile e pronto per il deploy.
