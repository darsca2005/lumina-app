# Deploy Report & Preflight Gate: Lumina (`replica-deploy`)

Data: 2026-11-02  
Applicazione: **Lumina : Cultura Quotidiana**  
Stato App: **PRONTA PER L'USO E LA CONDIVISIONE**

---

## 1. Risultati Preflight Gate (Tutti i controlli superati)

| Controllo | Strumento / Comando | Esito | Note |
| :--- | :--- | :--- | :--- |
| **Test E2E Automatizzati** | `npm test` | **9 / 9 PASS (100%)** | Testati flussi F01–F06: Onboarding, Reader, Audio, Quiz, Streak, Focus Lock, Ripasso, Amici |
| **Parità Funzionale** | `parity.py replica/features.csv` | **100.0 / 100** | 12 must-haves su 12 completati; nessuna feature mancante |
| **Rebrand Clean Sweep** | `sweep.py . --config replica/brand.json` | **PULITO (Exit 0)** | Nessun residuo del nome originale, domini o colori del target |
| **Store Listing Linter** | `listing.py replica/launch/listing.json` | **0 Errori, 0 Warning** | Lunghezze conformi a limiti App Store e Google Play |
| **Build & Integrità DB** | `npm run build` | **PASS (Exit 0)** | 8 categorie, 6 percorsi, 4 lezioni complete e quiz verificati |
| **Contrasto WCAG Accessibilità** | `contrast.py replica/design/tokens.json` | **11 coppie AAA/AA** | Nessun contrasto debole |

---

## 2. Come Avviare e Utilizzare Lumina Subito

Per avviare l'applicazione sul tuo computer:

```bash
# Avvio del server locale (zero dipendenze npm da installare)
npm start
```

Apri il browser su:
👉 **`http://localhost:3456`**

### Utilizzo su Smartphone (iOS / Android) per te e i tuoi amici:
1. Collega il tuo smartphone e il computer alla stessa rete Wi-Fi.
2. Apri `http://<IP-DEL-TUO-MAC>:3456` dal browser del telefono (Safari o Chrome).
3. Tocca **"Condividi" -> "Aggiungi a schermata Home"** (su iOS) oppure **"Installa app"** (su Android). Lumina comparirà sulla schermata principale come una vera app nativa a schermo intero (PWA).

---

## 3. Guida per l'Utilizzo con gli Amici
- **100% Gratuita:** Nessun costo, nessuna carta di credito, nessun abbonamento.
- **Profili Amici:** Dal tab *Amici*, chiunque può creare un nuovo profilo con un tap o passare da un account all'altro sullo stesso dispositivo.
- **Classifica delle Serie:** La classifica mostra le serie giornaliere (streak) e i minuti di lettura accumulati, stimolando la sfida di gruppo.
- **Audio Narrato:** Funziona con il sintetizzatore vocale nativo di iPhone, Android e Mac, con velocità regolabile e avanzamento automatico.
