# Fixes & Positioning Plan (`replica-entrepreneur`)

Basato su `replica/feedback.md` (7 recensioni verificate da 3 fonti: App Store, Google Play, AppBrain).

## 1. What they hate (Cosa detestano gli utenti dell'originale)

1. **Paywall aggressivo dopo una sola lezione di prova e costi di abbonamento elevati** — 4 recensioni su 3 fonti (media 2.2★):
   - *"You cannot read more than one daily module without a paid subscription upgrade to premium."* ([Google Play](https://play.google.com/store/apps/details?id=com.vikstudios.sophia))
   - *"Great concept for daily general knowledge, but the paywall hits right after the first sample lesson and the subscription price is too expensive if you just want to study with friends."* ([App Store](https://apps.apple.com/it/app/sophia-cultura-generale/id6760919622))
2. **Traduzioni automatiche innaturali nelle prime release localizzate** — 1 recensione (App Store, 3★):
   - *"Some localized Italian and Romanian texts had awkward machine translation phrasing before the recent update."* ([App Store](https://apps.apple.com/us/app/sophia-general-knowledge/id6760919622))

## 2. What is missing (Funzionalità richieste dagli utenti)

1. **Cerchia Amici & Confronto Streak multi-utente** — 2 recensioni su 2 fonti (App Store, AppBrain):
   - *"Please add a way to collaborate or compare daily streaks with multiple users and friends."* ([App Store](https://apps.apple.com/it/app/sophia-cultura-generale/id6760919622))
2. **Note personali su ogni lezione ed esportazione appunti** — 2 recensioni su 2 fonti (App Store, Google Play):
   - *"Also needs an option to write personal notes on each lesson."* ([App Store](https://apps.apple.com/us/app/sophia-general-knowledge/id6760919622))
3. **Personalizzazione del lettore (Tema Carta / Seppia / Notte e dimensione carattere)** — 1 recensione (Google Play):
   - *"Why can't I customize the reader theme to sepia or dark mode and export my saved notes?"* ([Google Play](https://play.google.com/store/apps/details?id=com.vikstudios.sophia))
4. **Accesso Web/Desktop + Modalità Offline PWA** — 1 recensione (Google Play):
   - *"Would love offline reading mode and a web version or desktop app so I can read courses on my laptop without losing my sync."* ([Google Play](https://play.google.com/store/apps/details?id=com.vikstudios.sophia))

## 3. What is unsolved (Il bisogno ignorato)

- **Imparare insieme agli amici senza abbonamenti individuali**: l'app originale è pensata per monetizzare utenti singoli con paywall ricorrenti, rendendo impossibile condividere l'abitudine quotidiana di studio con un gruppo di amici senza che ciascuno paghi un abbonamento.

## 4. Fix Plan (Piano di Miglioramento implementato nel clone)

| # | Fix / Miglioramento | Taglia | Skill | Evidenza |
| --- | --- | --- | --- | --- |
| 1 | **100% Gratuita e Sbloccata per sempre** (zero paywall, lezioni giornaliere illimitate, audio incluso) | S | `replica-build` | Tema #1 ("Price and paywalls", 57% delle segnalazioni) + richiesta esplicita utente |
| 2 | **Cerchia Amici & Classifica Streak** (profilo rapido per ogni amico, switch istantaneo o codice invito, classifica settimanale) | S | `replica-build` / `replica-backend` | Tema "Teams and sharing" (App Store + AppBrain) |
| 3 | **Quaderno Note Personali per Lezione + Esportazione JSON/Markdown** | S | `replica-build` | Tema "Customisation and control" & "Export" |
| 4 | **Contenuti scritti nativamente in italiano** (stile editoriale curato, citazioni storiche, punti chiave chiari) | M | `replica-build` | Critica sulle traduzioni automatiche |
| 5 | **Lettore con 3 temi (Carta, Seppia, Notte) e 3 grandezze font + Web/PWA Offline** | S | `replica-design` / `replica-build` | Richieste su Google Play per lettura serale e da laptop/mobile |

## 5. Positioning Angle (Angolo di Posizionamento)

### Opzione 1 (Raccomandata)
> Per **gruppi di amici e menti curiose** che **amano le micro-lezioni quotidiane di 10 minuti ma detestano i paywall dopo il primo capitolo**, **Lumina** **offre l'intera biblioteca di cultura generale, i quiz interattivi, la modalità audio e la classifica streak tra amici in modo 100% gratuito e senza blocchi**.
> *Evidenza: Tema #1 (Price & Paywalls) + Tema Collaboration, 5 recensioni su 3 fonti.*

### Opzione 2
> Per **lettori e studenti italiani** che **vogliono sostituire lo scrolling sui social con 10 minuti di vera cultura scritta in italiano**, **Lumina** **unisce lezioni editoriali curate, blocco anti-distrazione e note personali esportabili**.

### Opzione 3
> Per **chi studia in movimento o da computer** che **non vuole perdere il filo tra smartphone e desktop**, **Lumina** **funziona ovunque come Web App e PWA offline con narrazione vocale integrata**.
