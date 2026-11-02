# Replica Skills Pack per Antigravity

La suite di 11 skill per il reverse-engineering, la ricostruzione pulita, il test, il rebranding e il lancio di applicazioni, convertita ed ottimizzata per **Antigravity**.

Tutte le skill sono installate nella directory del progetto: [`.agents/skills/`](file:///Users/darsca/Documents/clona%20app/.agents/skills) e vengono scoperte e attivate automaticamente dall'agente.

---

## 🔄 Il Flusso di Lavoro (Workflow Pipeline)

Le skill sono progettate per essere eseguite in sequenza. Ciascuna scrive i propri output nella cartella `replica/` del progetto:

```text
recon -> architect -> design -> build -> backend -> test -> diff -> entrepreneur -> brand -> launch -> deploy
```

---

## 🛠️ Le 11 Skill Disponibili

| Skill | Descrizione & Scopo | Esempi di Attivazione |
| :--- | :--- | :--- |
| [`replica-recon`](file:///Users/darsca/Documents/clona%20app/.agents/skills/replica-recon/SKILL.md) | Reverse-engineering: mappa schermate, flussi utente, componenti UI e schema dati da pagine pubbliche, screenshot o help docs. | *"mappa questa app", "voglio clonare X", "studia i flussi di X"* |
| [`replica-architect`](file:///Users/darsca/Documents/clona%20app/.agents/skills/replica-architect/SKILL.md) | Pianifica lo stack tecnologico, lo schema DB (SQL reale con indici/RLS) e le API partendo dalla mappa recon. | *"pianifica l'architettura", "quale stack usiamo", "disegna il database"* |
| [`replica-design`](file:///Users/darsca/Documents/clona%20app/.agents/skills/replica-design/SKILL.md) | Ricostruisce il design system (token di colore, tipografia, spacing, componenti) verificando il contrasto WCAG. | *"estrai i design token", "ricostruisci lo stile", "analizza i colori"* |
| [`replica-build`](file:///Users/darsca/Documents/clona%20app/.agents/skills/replica-build/SKILL.md) | Costruzione dell'app schermo per schermo: app shell, vertical slices e matrice delle feature. Codice 100% originale. | *"inizia a costruire lo scheletro", "costruisci lo schermo S01"* |
| [`replica-backend`](file:///Users/darsca/Documents/clona%20app/.agents/skills/replica-backend/SKILL.md) | Implementa autenticazione, migrazioni DB, pagamenti (Stripe), email e logiche di backend con API ufficiali. | *"configura il backend", "aggiungi auth", "collega Stripe"* |
| [`replica-test`](file:///Users/darsca/Documents/clona%20app/.agents/skills/replica-test/SKILL.md) | Piano di test E2E (es. Playwright) per i flussi critici e tracciamento strutturato dei bug. | *"testa l'applicazione", "scrivi i test E2E", "fai QA"* |
| [`replica-diff`](file:///Users/darsca/Documents/clona%20app/.agents/skills/replica-diff/SKILL.md) | Calcola il punteggio di parità funzionale (`features.csv`) e diff visivo ignorando i colori di rebranding. | *"a che punto siamo rispetto all'originale", "calcola la parità funzionale"* |
| [`replica-entrepreneur`](file:///Users/darsca/Documents/clona%20app/.agents/skills/replica-entrepreneur/SKILL.md) | Analizza recensioni reali degli utenti dell'app originale per identificare difetti, richieste e angolo di posizionamento. | *"cosa odiano gli utenti di X", "leggi le recensioni", "trova il vantaggio competitivo"* |
| [`replica-brand`](file:///Users/darsca/Documents/clona%20app/.agents/skills/replica-brand/SKILL.md) | Trova nome originale, palette colori, brief per il logo ed esegue lo sweep per rimuovere ogni traccia dell'originale. | *"trova un nome per l'app", "crea la palette originale", "fai lo sweep del brand"* |
| [`replica-launch`](file:///Users/darsca/Documents/clona%20app/.agents/skills/replica-launch/SKILL.md) | Crea la landing page, definisce i piani di pricing e prepara i testi per gli App Store (verificando i vincoli di copia). | *"crea la landing page", "definisci il pricing", "prepara il listing per lo store"* |
| [`replica-deploy`](file:///Users/darsca/Documents/clona%20app/.agents/skills/replica-deploy/SKILL.md) | Gate preflight (test passati, parità minima, sweep pulito) e istruzioni di deploy, DNS e hosting. | *"metti online", "fai il deploy in produzione", "controlla il preflight"* |

---

## 🧰 Strumenti CLI Python Inclusi

Gli strumenti inclusi utilizzano esclusivamente la libreria standard di Python (nessuna dipendenza `pip` necessaria):

```bash
# Controllo contrasto WCAG sui token di design
python3 .agents/skills/replica-design/contrast.py replica/design/tokens.json

# Calcolo del punteggio di parità delle feature
python3 .agents/skills/replica-diff/parity.py replica/features.csv

# Confronto visivo di layout tra screenshot
python3 .agents/skills/replica-diff/imgdiff.py original.png clone.png --out diff.png

# Analisi e ranking dei reclami/recensioni utenti
python3 .agents/skills/replica-entrepreneur/reviews.py replica/reviews.csv --out replica/feedback.md

# Sweep per verificare che nessun riferimento o colore dell'app originale sia rimasto
python3 .agents/skills/replica-brand/sweep.py . --config replica/brand.json

# Linter per le schede App Store / Google Play
python3 .agents/skills/replica-launch/listing.py replica/launch/listing.json
```
