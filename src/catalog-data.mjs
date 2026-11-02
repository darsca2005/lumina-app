// Catalogo Editoriale Completo ed Esteso per Lumina
// 20 Categorie Tematiche e 85 Percorsi Strutturati con schede e quiz

export const allCategories = [
  { id: 'cat-storia', slug: 'storia', name: 'Storia', description: 'Dai grandi imperi alle rivoluzioni che hanno plasmato il mondo.', icon_name: '🏛️', accent_color: '#8c4e28', sort_order: 1 },
  { id: 'cat-filosofia', slug: 'filosofia', name: 'Filosofia', description: 'Dal dubbio socratico alle domande sul senso dell\'esistenza.', icon_name: '💭', accent_color: '#1e5f74', sort_order: 2 },
  { id: 'cat-scienza', slug: 'scienza', name: 'Scienza', description: 'Dalla fisica quantistica ai misteri della materia e della vita.', icon_name: '🔬', accent_color: '#2a7886', sort_order: 3 },
  { id: 'cat-astronomia', slug: 'astronomia', name: 'Astronomia & Cosmo', description: 'Buchi neri, galassie lontane e le origini dell\'universo.', icon_name: '🌌', accent_color: '#1e3d59', sort_order: 4 },
  { id: 'cat-tecnologia', slug: 'tecnologia', name: 'Tecnologia & IA', description: 'Intelligenza artificiale, algoritmi e le frontiere del futuro.', icon_name: '🤖', accent_color: '#0c7b93', sort_order: 5 },
  { id: 'cat-geopolitica', slug: 'geopolitica', name: 'Geopolitica', description: 'Stretti marittimi, risorse contese e scacchiere globale.', icon_name: '🌍', accent_color: '#43766c', sort_order: 6 },
  { id: 'cat-letteratura', slug: 'letteratura', name: 'Letteratura', description: 'I grandi capolavori, i miti e le parole che restano.', icon_name: '📚', accent_color: '#704264', sort_order: 7 },
  { id: 'cat-economia', slug: 'economia', name: 'Economia', description: 'Banche centrali, moneta, mercati e teorie delle scelte.', icon_name: '📈', accent_color: '#4f6f52', sort_order: 8 },
  { id: 'cat-arte', slug: 'arte', name: 'Arte', description: 'Capolavori, visioni rivoluzionarie e la ricerca del bello.', icon_name: '🎨', accent_color: '#b0578d', sort_order: 9 },
  { id: 'cat-psicologia', slug: 'psicologia', name: 'Psicologia', description: 'Bias cognitivi, trappole della memoria e funzionamento mentale.', icon_name: '🧠', accent_color: '#3d5a80', sort_order: 10 },
  { id: 'cat-biografie', slug: 'biografie', name: 'Grandi Menti', description: 'Le vite straordinarie di scienziati, artisti e pensatori.', icon_name: '👤', accent_color: '#4361ee', sort_order: 11 },
  { id: 'cat-archeologia', slug: 'archeologia', name: 'Civiltà Antiche', description: 'Dall\'antico Egitto a Roma, Mesopotamia e le civiltà precolombiane.', icon_name: '🏺', accent_color: '#c97a3e', sort_order: 12 },
  { id: 'cat-mitologia', slug: 'mitologia', name: 'Miti & Leggende', description: 'Miti greci, saghe norrene e i racconti fondativi dell\'umanità.', icon_name: '🐉', accent_color: '#843b62', sort_order: 13 },
  { id: 'cat-musica', slug: 'musica', name: 'Musica & Suono', description: 'Dalla geometria di Bach alle neuroscienze del ritmo e del blues.', icon_name: '🎵', accent_color: '#9b5de5', sort_order: 14 },
  { id: 'cat-cinema', slug: 'cinema', name: 'Cinema & Regia', description: 'La grammatica visiva, il viaggio dell\'eroe e i maestri del film.', icon_name: '🎬', accent_color: '#d72638', sort_order: 15 },
  { id: 'cat-medicina', slug: 'medicina', name: 'Medicina & Corpo', description: 'Immunità, longevità cellulare, ritmo circadiano e salute.', icon_name: '🧬', accent_color: '#17b978', sort_order: 16 },
  { id: 'cat-architettura', slug: 'architettura', name: 'Architettura', description: 'Dalle cattedrali gotiche al Bauhaus e ai grattacieli moderni.', icon_name: '🏛️', accent_color: '#6b705c', sort_order: 17 },
  { id: 'cat-sociologia', slug: 'sociologia', name: 'Società & Potere', description: 'Sorveglianza, dinamiche urbane, reti sociali e conformismo.', icon_name: '⚖️', accent_color: '#5e548e', sort_order: 18 },
  { id: 'cat-linguistica', slug: 'linguistica', name: 'Lingue & Retorica', description: 'Origine dei linguaggi, etimologia e persuasione verbale.', icon_name: '🗣️', accent_color: '#e07a5f', sort_order: 19 },
  { id: 'cat-strategia', slug: 'strategia', name: 'Strategia & Tattica', description: 'Da Sun Tzu a Clausewitz: le regole dell\'ingegno sotto pressione.', icon_name: '⚔️', accent_color: '#9e2a2b', sort_order: 20 }
];

// Helper per generare corsi compatti e strutturati
export const allCourses = [
  // 1. STORIA
  { id: 'crs-napoleone', category_id: 'cat-storia', slug: 'napoleone-cento-giorni', title: 'I Cento Giorni di Napoleone: L\'Ultimo Ruggito', subtitle: 'Dall\'esilio sull\'Elba al destino tragico di Waterloo', synopsis: 'Il ritorno a sorpresa dell\'imperatore e la caduta che ha ridisegnato l\'Europa moderna.', difficulty_level: 'base', estimated_total_minutes: 14, lessons_count: 2, cover_badge: '⚔️', sort_order: 1 },
  { id: 'crs-costantinopoli', category_id: 'cat-storia', slug: 'caduta-costantinopoli-1453', title: '1453: La Caduta di Costantinopoli', subtitle: 'La fine dell\'Impero Bizantino e l\'alba del Rinascimento', synopsis: 'L\'assedio delle leggendarie mura teodosiane da parte del giovane sultano Maometto II.', difficulty_level: 'intermedio', estimated_total_minutes: 15, lessons_count: 2, cover_badge: '🏰', sort_order: 2 },
  { id: 'crs-corsa-spazio', category_id: 'cat-storia', slug: 'corsa-allo-spazio-allunaggio', title: 'La Corsa allo Spazio: Dallo Sputnik alla Luna', subtitle: 'Guerra Fredda, audacia scientifica e il primo passo dell\'umanità', synopsis: 'La sfida tecnologica tra USA e URSS che ha portato l\'uomo oltre l\'atmosfera terrestre.', difficulty_level: 'base', estimated_total_minutes: 14, lessons_count: 2, cover_badge: '🚀', sort_order: 3 },
  { id: 'crs-rinascimento', category_id: 'cat-storia', slug: 'rinascimento-fiorentino-umanesimo', title: 'Il Rinascimento Fiorentino', subtitle: 'I Medici, la riscoperta dei classici e la rivoluzione visiva', synopsis: 'Come una città mercantile toscana ha acceso una rivoluzione culturale senza precedenti.', difficulty_level: 'base', estimated_total_minutes: 14, lessons_count: 2, cover_badge: '⚜️', sort_order: 4 },
  { id: 'crs-cesare-rubicone', category_id: 'cat-storia', slug: 'cesare-passaggio-del-rubicone', title: 'Cesare e il Dado Tratto sul Rubicone', subtitle: '49 a.C.: il gesto che abbatté la Repubblica Romana', synopsis: 'Attraversare un fiumiciattolo per marciare su Roma: il punto di non ritorno della politica antica.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '🗡️', sort_order: 5 },
  { id: 'crs-rivoluzione-francese', category_id: 'cat-storia', slug: 'rivoluzione-francese-terrore', title: 'La Rivoluzione Francese: Libertà e Terrore', subtitle: '1789: La presa della Bastiglia e la nascita dei diritti universali', synopsis: 'Dai cahiers de doléances alla ghigliottina di Robespierre: cronaca di una scossa tellurica.', difficulty_level: 'intermedio', estimated_total_minutes: 12, lessons_count: 1, cover_badge: '🇫🇷', sort_order: 6 },
  { id: 'crs-samurai-edo', category_id: 'cat-storia', slug: 'samurai-epoca-edo-giappone', title: 'Il Giappone dei Samurai e l\'Epoca Edo', subtitle: 'Due secoli e mezzo di isolamento, codice bushido e pace interna', synopsis: 'Lo shogunato Tokugawa e la disciplina d\'onore della casta guerriera nel Sol Levante.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '🏯', sort_order: 7 },

  // 2. FILOSOFIA
  { id: 'crs-socrate', category_id: 'cat-filosofia', slug: 'socrate-arte-del-dubbio', title: 'Socrate e la Rivoluzione dell\'Ironia', subtitle: 'L\'arte di interrogare e il sapere di non sapere', synopsis: 'Come smontare i pregiudizi con domande gentili e liberare il pensiero critico.', difficulty_level: 'base', estimated_total_minutes: 14, lessons_count: 2, cover_badge: '🏛️', sort_order: 1 },
  { id: 'crs-stoicismo', category_id: 'cat-filosofia', slug: 'stoicismo-seneca-marco-aurelio', title: 'Lo Stoicismo Quotidiano: Da Seneca a Marco Aurelio', subtitle: 'La dicotomia del controllo e la serenità nelle tempeste della vita', synopsis: 'Imparare a distinguere ciò che dipende da noi da ciò che non possiamo controllare.', difficulty_level: 'base', estimated_total_minutes: 15, lessons_count: 2, cover_badge: '🛡️', sort_order: 2 },
  { id: 'crs-nietzsche', category_id: 'cat-filosofia', slug: 'nietzsche-oltreuomo-volonta', title: 'Nietzsche: Il Coraggio dell\'Oltreuomo', subtitle: 'La caduta delle certezze, l\'eterno ritorno e l\'amor fati', synopsis: 'Il pensiero affilato sul superamento del nichilismo e la gioia incondizionata di esistere.', difficulty_level: 'avanzato', estimated_total_minutes: 15, lessons_count: 2, cover_badge: '⚡', sort_order: 3 },
  { id: 'crs-platone-caverna', category_id: 'cat-filosofia', slug: 'platone-mito-della-caverna', title: 'Platone e il Mito della Caverna', subtitle: 'Ombre, catene e la liberazione verso la luce della verità', synopsis: 'L\'allegoria più celebre della storia: scambiare le ombre per la realtà del mondo.', difficulty_level: 'base', estimated_total_minutes: 14, lessons_count: 2, cover_badge: '🕯️', sort_order: 4 },
  { id: 'crs-cartesio-cogito', category_id: 'cat-filosofia', slug: 'cartesio-cogito-dubbio-metodico', title: 'Cartesio e il Dubbio Metodico', subtitle: '«Cogito ergo sum»: fondare la certezza nel mezzo del vuoto', synopsis: 'Cosa rimane se dubitiamo di ogni cosa? La nascita della filosofia razionalista moderna.', difficulty_level: 'intermedio', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '📐', sort_order: 5 },
  { id: 'crs-esistenzialismo', category_id: 'cat-filosofia', slug: 'sartre-camus-esistenzialismo', title: 'Sartre e Camus: L\'Assurdo e la Libertà', subtitle: 'Condannati a essere liberi: dare senso alla vita in un universo muto', synopsis: 'Dalla Nausea di Sartre al Mito di Sisifo: l\'impegno morale senza alibi.', difficulty_level: 'intermedio', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '☕', sort_order: 6 },
  { id: 'crs-tao-filosofia', category_id: 'cat-filosofia', slug: 'lao-tzu-tao-te-ching', title: 'Il Tao e l\'Arte del Non-Agire (Wu Wei)', subtitle: 'Lao Tzu e la saggezza dell\'acqua che scava la roccia dura', synopsis: 'Fluire con la natura delle cose senza forzature: la lezione perenne del Taoismo.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '☯️', sort_order: 7 },

  // 3. SCIENZA
  { id: 'crs-relativita', category_id: 'cat-scienza', slug: 'relativita-einstein-spiegata', title: 'La Relatività di Einstein in Parole Semplici', subtitle: 'Spazio, tempo e gravità: perché il tempo è elastico', synopsis: 'Dimentica le formule astruse: scopri gli esperimenti mentali che hanno ridefinito la realtà.', difficulty_level: 'intermedio', estimated_total_minutes: 15, lessons_count: 2, cover_badge: '🌌', sort_order: 1 },
  { id: 'crs-quantistica', category_id: 'cat-scienza', slug: 'meccanica-quantistica-fondamenti', title: 'I Misteri della Meccanica Quantistica', subtitle: 'Dualismo onda-particella, Schrödinger e l\'entanglement', synopsis: 'Perché nel mondo dell\'infinitamente piccolo l\'osservatore cambia il risultato.', difficulty_level: 'avanzato', estimated_total_minutes: 16, lessons_count: 2, cover_badge: '⚛️', sort_order: 2 },
  { id: 'crs-evoluzione', category_id: 'cat-scienza', slug: 'darwin-evoluzione-specie', title: 'Darwin e l\'Origine delle Specie', subtitle: 'Il viaggio del Beagle e il motore della selezione naturale', synopsis: 'Come l\'osservazione dei fringuelli alle Galápagos ha rivoluzionato la biologia.', difficulty_level: 'base', estimated_total_minutes: 14, lessons_count: 2, cover_badge: '🧬', sort_order: 3 },
  { id: 'crs-cervello', category_id: 'cat-scienza', slug: 'neuroscienze-mistero-coscienza', title: 'I Segreti del Cervello e della Coscienza', subtitle: '86 miliardi di neuroni e il miracolo dei pensieri', synopsis: 'Un viaggio affascinante nella plasticità sinaptica e nei circuiti delle decisioni.', difficulty_level: 'intermedio', estimated_total_minutes: 14, lessons_count: 2, cover_badge: '🧠', sort_order: 4 },
  { id: 'crs-tavola-periodica', category_id: 'cat-scienza', slug: 'mendeleev-tavola-periodica', title: 'Mendeleev e l\'Ordine Segreto degli Elementi', subtitle: 'Il sogno chimico che ha previsto atomi non ancora scoperti', synopsis: 'Come una tabella a righe e colonne ha rivelato l\'alfabeto fondamentale della materia.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '🧪', sort_order: 5 },
  { id: 'crs-entropia', category_id: 'cat-scienza', slug: 'entropia-freccia-del-tempo', title: 'L\'Entropia e la Freccia del Tempo', subtitle: 'Perché i bicchieri rotti non si ricompongono mai da soli', synopsis: 'Il secondo principio della termodinamica: la misura del disordine nell\'universo.', difficulty_level: 'intermedio', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '⏳', sort_order: 6 },

  // 4. ASTRONOMIA & COSMO
  { id: 'crs-buchi-neri', category_id: 'cat-astronomia', slug: 'buchi-neri-orizzonte-eventi', title: 'I Buchi Neri e l\'Orizzonte degli Eventi', subtitle: 'Laddove la gravità inghiotte persino la luce', synopsis: 'Singolarità, dilatazione temporale estrema e la prima fotografia dell\'ombra cosmica.', difficulty_level: 'intermedio', estimated_total_minutes: 12, lessons_count: 1, cover_badge: '🕳️', sort_order: 1 },
  { id: 'crs-paradosso-fermi', category_id: 'cat-astronomia', slug: 'paradosso-fermi-vita-aliena', title: 'Il Paradosso di Fermi: Dove Sono Tutti?', subtitle: 'Se l\'universo brulica di stelle, perché c\'è questo silenzio?', synopsis: 'L\'equazione di Drake, il Grande Filtro e le ipotesi sulla solitudine della Terra.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '👽', sort_order: 2 },
  { id: 'crs-vita-stelle', category_id: 'cat-astronomia', slug: 'nascita-morte-delle-stelle', title: 'La Vita e la Morte delle Stelle', subtitle: 'Dalle nubi di idrogeno alle supernove e nane bianche', synopsis: '«Siamo polvere di stelle»: come le fornaci nucleari creano il ferro del nostro sangue.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '⭐', sort_order: 3 },
  { id: 'crs-james-webb', category_id: 'cat-astronomia', slug: 'james-webb-telescopio-origini', title: 'James Webb: Lo Sguardo all\'Alba del Tempo', subtitle: 'A un milione e mezzo di chilometri dalla Terra per vedere le prime galassie', synopsis: 'Lo specchio d\'oro a infrarossi che sta riscrivendo l\'astronomia contemporanea.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '🔭', sort_order: 4 },

  // 5. TECNOLOGIA & FUTURO
  { id: 'crs-turing-ai', category_id: 'cat-tecnologia', slug: 'turing-macchine-intelligenza', title: 'Da Alan Turing all\'Intelligenza Artificiale', subtitle: 'Può una macchina pensare? La nascita dell\'era computazionale', synopsis: 'Il test di Turing, il codice Enigma e il sogno dei circuiti capaci di apprendere.', difficulty_level: 'base', estimated_total_minutes: 12, lessons_count: 1, cover_badge: '💻', sort_order: 1 },
  { id: 'crs-come-funziona-llm', category_id: 'cat-tecnologia', slug: 'reti-neurali-trasformers-llm', title: 'Come Funzionano Davvero i Modelli Linguistici', subtitle: 'Token, vettori e predizione della parola successiva', synopsis: 'La magia matematica dietro ChatGPT e Claude spiegata in modo chiaro a chiunque.', difficulty_level: 'intermedio', estimated_total_minutes: 12, lessons_count: 1, cover_badge: '🤖', sort_order: 2 },
  { id: 'crs-crittografia', category_id: 'cat-tecnologia', slug: 'crittografia-chiavi-privacy', title: 'La Crittografia: La Matematica dei Segreti', subtitle: 'Da Cesare a RSA e alle chiavi pubbliche del web', synopsis: 'Come proteggiamo le password e i dati bancari con i numeri primi giganti.', difficulty_level: 'intermedio', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '🔐', sort_order: 3 },
  { id: 'crs-quantum-computing', category_id: 'cat-tecnologia', slug: 'computer-quantistici-qubit', title: 'Computer Quantistici: Oltre il Bit', subtitle: 'Qubit e sovrapposizione: la prossima frontiera del calcolo', synopsis: 'Perché certe sfide impossibili per i supercomputer richiederanno la fisica dei quanti.', difficulty_level: 'avanzato', estimated_total_minutes: 12, lessons_count: 1, cover_badge: '💡', sort_order: 4 },

  // 6. GEOPOLITICA
  { id: 'crs-malacca', category_id: 'cat-geopolitica', slug: 'stretto-malacca-geopolitica', title: 'Lo Stretto di Malacca: Il Collo del Mondo', subtitle: '2,5 km di mare da cui passa un terzo del commercio planetario', synopsis: 'Petrolio, container e la vulnerabilità marittima delle grandi potenze asiatiche.', difficulty_level: 'base', estimated_total_minutes: 8, lessons_count: 1, cover_badge: '⚓', sort_order: 1 },
  { id: 'crs-taiwan-chip', category_id: 'cat-geopolitica', slug: 'battaglia-dei-microchip-taiwan', title: 'La Guerra dei Microchip e il Dilemma di Taiwan', subtitle: 'Perché il silicio è la materia prima più contesa della Terra', synopsis: 'Il monopolio di TSMC e lo scudo tecnologico al centro della tensione USA-Cina.', difficulty_level: 'intermedio', estimated_total_minutes: 14, lessons_count: 2, cover_badge: '💾', sort_order: 2 },
  { id: 'crs-suez', category_id: 'cat-geopolitica', slug: 'canale-suez-arteria-globale', title: 'Il Canale di Suez: La Strozzatura d\'Egitto', subtitle: 'Dalla crisi del 1956 al blocco della Ever Given', synopsis: 'La scorciatoia che unisce Oriente e Occidente e i rischi delle catene di rifornimento.', difficulty_level: 'base', estimated_total_minutes: 12, lessons_count: 2, cover_badge: '🚢', sort_order: 3 },
  { id: 'crs-via-della-seta', category_id: 'cat-geopolitica', slug: 'belt-and-road-via-seta', title: 'La Nuova Via della Seta Cinese (Belt & Road)', subtitle: 'Porti, ferrovie e diplomazia degli investimenti eurasiatici', synopsis: 'Il piano titanico di Pechino per ridisegnare le arterie infrastrutturali del globo.', difficulty_level: 'intermedio', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '🐉', sort_order: 4 },
  { id: 'crs-crisi-cuba', category_id: 'cat-geopolitica', slug: 'crisi-missili-cuba-1962', title: 'Ottobre 1962: Tredici Giorni sull\'Orlo del Baratro', subtitle: 'Kennedy, Kruscev e il momento più vicino all\'olocausto nucleare', synopsis: 'Il sangue freddo e i canali segreti che evitarono la terza guerra mondiale.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '🚨', sort_order: 5 },

  // 7. LETTERATURA
  { id: 'crs-odissea', category_id: 'cat-letteratura', slug: 'odissea-viaggio-identita', title: 'L\'Odissea e il Grande Ritorno', subtitle: 'Ulisse, l\'intelligenza nomade e la nostalgia di casa', synopsis: 'Il primo romanzo psicologico sul bisogno umano di viaggiare e ritrovarsi.', difficulty_level: 'base', estimated_total_minutes: 8, lessons_count: 1, cover_badge: '⛵', sort_order: 1 },
  { id: 'crs-dante-commedia', category_id: 'cat-letteratura', slug: 'dante-divina-commedia-architettura', title: 'Dante e l\'Architettura della Divina Commedia', subtitle: 'Viaggio cosmico tra i peccati umani e la salvezza morale', synopsis: 'La cattedrale poetica della lingua italiana e la legge del contrappasso.', difficulty_level: 'base', estimated_total_minutes: 15, lessons_count: 2, cover_badge: '📜', sort_order: 2 },
  { id: 'crs-shakespeare', category_id: 'cat-letteratura', slug: 'shakespeare-anatomia-passioni', title: 'Shakespeare: L\'Anatomia dell\'Anima', subtitle: 'Dubbio, ambizione e gelosia sul palco del Globe Theatre', synopsis: 'Da Amleto a Macbeth: gli archetipi eterni delle nostre contraddizioni interiori.', difficulty_level: 'base', estimated_total_minutes: 14, lessons_count: 2, cover_badge: '🎭', sort_order: 3 },
  { id: 'crs-kafka-metamorfosi', category_id: 'cat-letteratura', slug: 'kafka-metamorfosi-alienazione', title: 'Kafka e la Sveglia di Gregor Samsa', subtitle: '«Una mattina, svegliatosi da sogni inquieti...»', synopsis: 'L\'incubo dell\'alienazione moderna e della burocrazia disumanizzante.', difficulty_level: 'intermedio', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '🪲', sort_order: 4 },
  { id: 'crs-dostoevskij', category_id: 'cat-letteratura', slug: 'dostoevskij-delitto-e-castigo', title: 'Dostoevskij: Il Delitto e la Coscienza', subtitle: 'Raskòl\'nikov e l\'illusione di porsi al di sopra della morale', synopsis: 'La vertigine psicologica della colpa e il miracolo della redenzione interiore.', difficulty_level: 'intermedio', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '📖', sort_order: 5 },

  // 8. ECONOMIA
  { id: 'crs-inflazione', category_id: 'cat-economia', slug: 'capire-inflazione-moneta', title: 'Come Funziona Davvero l\'Inflazione', subtitle: 'Prezzi che salgono, banche centrali e potere d\'acquisto', synopsis: 'Cosa accade quando la quantità di moneta supera i beni reali prodotti.', difficulty_level: 'base', estimated_total_minutes: 7, lessons_count: 1, cover_badge: '💶', sort_order: 1 },
  { id: 'crs-bolle-finanza', category_id: 'cat-economia', slug: 'bolle-speculative-storia', title: 'Dalla Tulipomania a Wall Street: Le Grandi Bolle', subtitle: 'Avidità, euforia collettiva e la teoria del più fesso', synopsis: 'Perché la psicologia di massa ripete gli stessi cicli di ascesa e panico.', difficulty_level: 'base', estimated_total_minutes: 14, lessons_count: 2, cover_badge: '🌷', sort_order: 2 },
  { id: 'crs-teoria-giochi', category_id: 'cat-economia', slug: 'teoria-dei-giochi-nash', title: 'La Teoria dei Giochi e il Dilemma del Prigioniero', subtitle: 'John Nash, equilibri strategici e cooperazione', synopsis: 'La matematica che svela quando conviene allearsi o tradire nel commercio.', difficulty_level: 'intermedio', estimated_total_minutes: 14, lessons_count: 2, cover_badge: '♟️', sort_order: 3 },
  { id: 'crs-adam-smith', category_id: 'cat-economia', slug: 'adam-smith-mano-invisibile', title: 'Adam Smith e la Mano Invisibile', subtitle: 'La Ricchezza delle Nazioni e l\'ordine spontaneo dei mercati', synopsis: 'Non dalla benevolenza del macellaio attendiamo il nostro pranzo, ma dal suo interesse.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '🏭', sort_order: 4 },
  { id: 'crs-creazione-moneta', category_id: 'cat-economia', slug: 'come-nasce-moneta-banche', title: 'Da Dove Arriva il Denaro? La Moneta Fiat', subtitle: 'Banche a riserva frazionaria e la convenzione sociale del valore', synopsis: 'Perché un pezzo di carta o un pixel sullo schermo hanno valore per tutti.', difficulty_level: 'intermedio', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '🏛️', sort_order: 5 },

  // 9. ARTE
  { id: 'crs-caravaggio', category_id: 'cat-arte', slug: 'caravaggio-luce-e-tenebre', title: 'Caravaggio: Luce Ferita e Tenebre', subtitle: 'Il realismo dei bassifondi romani e il chiaroscuro teatrale', synopsis: 'L\'artista ribelle che trasformò mendicanti e prostitute nei modelli dei santi.', difficulty_level: 'base', estimated_total_minutes: 14, lessons_count: 2, cover_badge: '🕯️', sort_order: 1 },
  { id: 'crs-impressionismo', category_id: 'cat-arte', slug: 'impressionismo-rivoluzione-luce', title: 'L\'Impressionismo: Catturare l\'Attimo Fuggente', subtitle: 'Monet, Renoir e lo scandalo della pittura all\'aria aperta', synopsis: 'Uscire dagli studi polverosi per dipingere i riflessi mutevoli della luce sull\'acqua.', difficulty_level: 'base', estimated_total_minutes: 14, lessons_count: 2, cover_badge: '🎨', sort_order: 2 },
  { id: 'crs-leonardo-da-vinci', category_id: 'cat-arte', slug: 'leonardo-poliedrico-sfumato', title: 'Leonardo: Lo Sfumato e l\'Occhio Anatomico', subtitle: 'La Gioconda, l\'Ultima Cena e la curiosità inesauribile', synopsis: 'Perché la Gioconda sembra mutare espressione a ogni battito di ciglia.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '📐', sort_order: 3 },
  { id: 'crs-michelangelo-sistina', category_id: 'cat-arte', slug: 'michelangelo-cappella-sistina', title: 'Michelangelo e il Gigante della Sistina', subtitle: 'Quattro anni su un ponteggio per dipingere la genesi del mondo', synopsis: 'Il corpo umano scolpito nel colore e il dramma del Giudizio Universale.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '🏛️', sort_order: 4 },
  { id: 'crs-van-gogh', category_id: 'cat-arte', slug: 'van-gogh-notte-stellata', title: 'Van Gogh: Il Vortice della Notte Stellata', subtitle: 'Il colore come urlo dell\'anima e la turbolenza del cielo', synopsis: 'Dalla camera di Arles al manicomio di Saint-Rémy: la pittura che pulsa di vita.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '🌻', sort_order: 5 },

  // 10. PSICOLOGIA
  { id: 'crs-bias-cognitivi', category_id: 'cat-psicologia', slug: 'bias-cognitivi-trappole-mentali', title: 'Le Trappole della Mente: I Bias Cognitivi', subtitle: 'Come il cervello prende scorciatoie e perché ci inganniamo', synopsis: 'Bias di conferma, euristica della disponibilità ed effetto ancoraggio.', difficulty_level: 'base', estimated_total_minutes: 15, lessons_count: 2, cover_badge: '🪤', sort_order: 1 },
  { id: 'crs-memoria-oblio', category_id: 'cat-psicologia', slug: 'memoria-apprendimento-oblio', title: 'L\'Arte del Ricordo e la Scienza dell\'Oblio', subtitle: 'Perché dimentichiamo e come allenare la ritenzione duratura', synopsis: 'La curva di Ebbinghaus e il potere della ripetizione spaziata.', difficulty_level: 'base', estimated_total_minutes: 14, lessons_count: 2, cover_badge: '⏳', sort_order: 2 },
  { id: 'crs-effetto-lucifero', category_id: 'cat-psicologia', slug: 'zimbardo-effetto-lucifero-stanford', title: 'L\'Effetto Lucifero: L\'Esperimento di Stanford', subtitle: 'Persone buone in situazioni perverse: la fragilità dei ruoli', synopsis: 'Come studenti modello si trasformarono in guardie crudeli in soli 6 giorni.', difficulty_level: 'intermedio', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '🚪', sort_order: 3 },
  { id: 'crs-psicologia-persuasione', category_id: 'cat-psicologia', slug: 'cialdini-armi-della-persuasione', title: 'Le Armi della Persuasione di Robert Cialdini', subtitle: 'Reciprocità, scarsità, riprova sociale e autorità', synopsis: 'Le 6 leve psicologiche che ci spingono a dire di sì senza riflettere.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '🧲', sort_order: 4 },
  { id: 'crs-stato-flow', category_id: 'cat-psicologia', slug: 'csikszentmihalyi-flusso-concentrazione', title: 'Lo Stato di Flow: La Massima Concentrazione', subtitle: 'Csíkszentmihályi e la fusione totale tra azione e coscienza', synopsis: 'Quando il tempo scompare: le condizioni ottimali per entrare nella zona.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '🌊', sort_order: 5 },

  // 11. GRANDI MENTI & BIOGRAFIE
  { id: 'crs-marie-curie', category_id: 'cat-biografie', slug: 'marie-curie-radioattivita', title: 'Marie Curie: Il Coraggio e l\'Atomo', subtitle: 'Due premi Nobel in due discipline e la scoperta del radio', synopsis: 'Una vita spesa tra provette incandescenti e dedizione scientifica assoluta.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '☢️', sort_order: 1 },
  { id: 'crs-nikola-tesla', category_id: 'cat-biografie', slug: 'nikola-tesla-visionario-corrente', title: 'Nikola Tesla: Il Mago dell\'Elettricità', subtitle: 'Corrente alternata, bobine e il sogno di energia wireless per tutti', synopsis: 'Il genio geniale e solitario che ha illuminato le città del mondo contemporaneo.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '⚡', sort_order: 2 },
  { id: 'crs-ipazia-alessandria', category_id: 'cat-biografie', slug: 'ipazia-martire-della-scienza', title: 'Ipazia d\'Alessandria: La Luce del Sapere', subtitle: 'La matematica e filosofa che non si piegò all\'oscurantismo', synopsis: 'L\'ultima guardiana della biblioteca e il simbolo eterno del libero pensiero.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '📜', sort_order: 3 },

  // 12. CIVILTÀ ANTICHE & ARCHEOLOGIA
  { id: 'crs-stele-rosetta', category_id: 'cat-archeologia', slug: 'stele-rosetta-champollion', title: 'La Stele di Rosetta e il Segreto dei Faraoni', subtitle: 'Champollion e la decifrazione dei geroglifici dopo 1.500 anni di silenzio', synopsis: 'Un frammento di granito nero con tre iscrizioni che ha fatto risorgere l\'Antico Egitto.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '𓂀', sort_order: 1 },
  { id: 'crs-pompei-79dc', category_id: 'cat-archeologia', slug: 'pompei-eruzione-vesuvio', title: 'Pompei: Istantanea del 79 d.C.', subtitle: 'Il Vesuvio, Plinio il Giovane e la città congelata nel tempo', synopsis: 'Cosa mangiavano, come commerciavano e come vivevano gli abitanti sotto la cenere.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '🌋', sort_order: 2 },
  { id: 'crs-esercito-terracotta', category_id: 'cat-archeologia', slug: 'esercito-terracotta-primo-imperatore', title: 'L\'Esercito di Terracotta del Primo Imperatore', subtitle: 'Qin Shi Huang e gli ottomila guerrieri a guardia dell\'eternità', synopsis: 'Sculture a grandezza naturale, volti tutti diversi e balestre pronte a colpire.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '🛡️', sort_order: 3 },

  // 13. MITI & LEGGENDE
  { id: 'crs-prometeo-fuoco', category_id: 'cat-mitologia', slug: 'prometeo-furto-del-fuoco', title: 'Prometeo e il Fuoco Rubato agli Dèi', subtitle: 'La scintilla della conoscenza e il prezzo della ribellione', synopsis: 'L\'archetipo del titano che sfida Zeus per donare il sapere agli uomini mortali.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '🔥', sort_order: 1 },
  { id: 'crs-ragnarok-norreno', category_id: 'cat-mitologia', slug: 'ragnarok-mitologia-norrena', title: 'Ragnarök: Il Crepuscolo degli Dèi Norreni', subtitle: 'Odino, Thor e la battaglia finale tra ghiaccio e fiamme', synopsis: 'Perché i popoli del nord immaginavano una fine eroica e una rinascita del cosmo.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '🐺', sort_order: 2 },
  { id: 'crs-vaso-pandora', category_id: 'cat-mitologia', slug: 'vaso-pandora-speranza', title: 'Il Vaso di Pandora e la Speranza Rimasta', subtitle: 'Tutti i mali del mondo sparsi e l\'unico antidoto sul fondo', synopsis: 'Esiodo e il mito fondativo sulle origini della fragilità e della resilienza umana.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '🏺', sort_order: 3 },

  // 14. MUSICA & SUONO
  { id: 'crs-bach-fuga', category_id: 'cat-musica', slug: 'bach-geometria-della-fuga', title: 'Bach e la Geometria Sacra della Fuga', subtitle: 'Contrappunto, canoni inversi e matematica tra le note', synopsis: 'Perché la musica di Johann Sebastian Bach è considerata l\'architettura sonora perfetta.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '🎼', sort_order: 1 },
  { id: 'crs-beethoven-nona', category_id: 'cat-musica', slug: 'beethoven-nona-sinfonia-gioia', title: 'Beethoven: La Nona e il Trionfo sulla Sordità', subtitle: 'Dall\'isolamento acustico all\'Inno alla Gioia universale', synopsis: 'Ascoltare con le vibrazioni del pianoforte: la vittoria della volontà sul destino.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '🎹', sort_order: 2 },
  { id: 'crs-radici-blues', category_id: 'cat-musica', slug: 'nascita-del-blues-chitarra', title: 'Il Delta del Mississippi e la Nascita del Blues', subtitle: 'Le 12 battute, le note piegate e le radici del rock and roll', synopsis: 'Come il canto di dolore e riscatto degli afroamericani ha plasmato la musica moderna.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '🎸', sort_order: 3 },

  // 15. CINEMA & REGIA
  { id: 'crs-viaggio-eroe', category_id: 'cat-cinema', slug: 'campbell-viaggio-eroe-cinema', title: 'Il Viaggio dell\'Eroe: La Struttura dei Film', subtitle: 'Joseph Campbell e il monomito dietro Guerre Stellari e Matrix', synopsis: 'Dalla chiamata all\'avventura all\'abisso e al ritorno trasformati col tesoro.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '🎬', sort_order: 1 },
  { id: 'crs-hitchcock-suspense', category_id: 'cat-cinema', slug: 'hitchcock-grammatica-della-suspense', title: 'Hitchcock e la Meccanica della Suspense', subtitle: 'La bomba sotto il tavolo: differenza cruciale tra sorpresa e ansia', synopsis: 'Come il maestro del brivido faceva palpitare il cuore del pubblico controllando l\'informazione.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '🔪', sort_order: 2 },
  { id: 'crs-kubrick-perfezione', category_id: 'cat-cinema', slug: 'kubrick-simmetria-e-luce', title: 'Stanley Kubrick e la Prospettiva a Un Punto', subtitle: '2001 Odissea nello Spazio, Shining e la cura maniacale del fotogramma', synopsis: 'La simmetria centrale, la steadicam e il silenzio cosmico nella storia del cinema.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '👁️', sort_order: 3 },

  // 16. MEDICINA & CORPO
  { id: 'crs-penicillina', category_id: 'cat-medicina', slug: 'fleming-scoperta-penicillina', title: 'Fleming e il Fungo Miracoloso della Penicillina', subtitle: 'Una piastra dimenticata e la rivoluzione che ha salvato 200 milioni di vite', synopsis: 'La nascita degli antibiotici e la vittoria sulle infezioni batteriche letali.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '💊', sort_order: 1 },
  { id: 'crs-sistema-immunitario', category_id: 'cat-medicina', slug: 'sistema-immunitario-guerra-cellulare', title: 'Il Sistema Immunitario: L\'Esercito Invisibile', subtitle: 'Linfociti B, cellule T e la memoria biologica dei vaccini', synopsis: 'Come il corpo riconosce se stesso e neutralizza miliardi di patogeni al secondo.', difficulty_level: 'intermedio', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '🛡️', sort_order: 2 },
  { id: 'crs-ritmo-circadiano', category_id: 'cat-medicina', slug: 'ritmo-circadiano-melatonina-sonno', title: 'I Ritmi Circadiani: L\'Orologio di 24 Ore', subtitle: 'Luce solare, melatonina e perché il sonno pulisce il cervello', synopsis: 'La biologia molecolare che sincronizza ogni organo col giorno e con la notte.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '🛌', sort_order: 3 },

  // 17. ARCHITETTURA
  { id: 'crs-brunelleschi', category_id: 'cat-architettura', slug: 'cupola-brunelleschi-firenze', title: 'La Cupola del Brunelleschi: Il Miracolo di Firenze', subtitle: 'Come costruire una cupola di 45 metri senza centine di sostegno', synopsis: 'La muratura a spina di pesce e la sfida che tutti ritenevano fisicamente impossibile.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '🏛️', sort_order: 1 },
  { id: 'crs-colosseo', category_id: 'cat-architettura', slug: 'colosseo-ingegneria-anfiteatro-flavio', title: 'Il Colosseo: Ingegneria per Cinquantamila Spettatori', subtitle: 'Archi di travertino, velarium e sotterranei a montacarichi', synopsis: 'Evacuare 50.000 persone in 15 minuti: lezioni di logistica dall\'antica Roma.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '🏟️', sort_order: 2 },
  { id: 'crs-bauhaus', category_id: 'cat-architettura', slug: 'bauhaus-forma-segue-funzione', title: 'Il Bauhaus: Quando la Forma Segue la Funzione', subtitle: 'Gropius, Kandinskij e la nascita del design moderno', synopsis: 'Acciaio tubolare, vetro e linee pure per una democrazia degli oggetti quotidiani.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '📐', sort_order: 3 },

  // 18. SOCIETÀ & POTERE
  { id: 'crs-panopticon', category_id: 'cat-sociologia', slug: 'bentham-foucault-panopticon', title: 'Il Panopticon: La Sorveglianza Invisibile', subtitle: 'Da Jeremy Bentham a Foucault e agli algoritmi del web', synopsis: 'Perché credere di poter essere osservati in ogni istante cambia il comportamento umano.', difficulty_level: 'intermedio', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '👁️', sort_order: 1 },
  { id: 'crs-finestre-rotte', category_id: 'cat-sociologia', slug: 'teoria-delle-finestre-rotte', title: 'La Teoria delle Finestre Rotte', subtitle: 'Come il degrado dei dettagli genera spirali di disordine sociale', synopsis: 'Curare i piccoli segni di trascuratezza per ricostruire il senso di sicurezza comune.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '🪟', sort_order: 2 },

  // 19. LINGUE & RETORICA
  { id: 'crs-sapir-whorf', category_id: 'cat-linguistica', slug: 'ipotesi-sapir-whorf-linguaggio', title: 'Le Parole che Usi Cambiano Come Pensi?', subtitle: 'L\'ipotesi Sapir-Whorf e i mille modi di nominare il mondo', synopsis: 'Se una lingua non ha il tempo futuro o i nomi per certi colori, influenza la percezione?', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '🗣️', sort_order: 1 },
  { id: 'crs-retorica-aristotele', category_id: 'cat-linguistica', slug: 'aristotele-ethos-pathos-logos', title: 'L\'Arte della Retorica secondo Aristotele', subtitle: 'Ethos (credibilità), Pathos (emozione) e Logos (argomentazione)', synopsis: 'Il triangolo perenne della persuasione in ogni discorso pubblico della storia.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '🏛️', sort_order: 2 },

  // 20. STRATEGIA & TATTICA
  { id: 'crs-sun-tzu', category_id: 'cat-strategia', slug: 'sun-tzu-arte-della-guerra', title: 'L\'Arte della Guerra di Sun Tzu', subtitle: '«Il supremo capolavoro è vincere senza combattere»', synopsis: 'Conoscere se stessi e conoscere l\'avversario: la strategia taoista dell\'adattamento.', difficulty_level: 'base', estimated_total_minutes: 10, lessons_count: 1, cover_badge: '⚔️', sort_order: 1 },
  { id: 'crs-canne-annibale', category_id: 'cat-strategia', slug: 'battaglia-di-canne-annibale-216ac', title: 'Canne (216 a.C.): Il Capolavoro Tattico di Annibale', subtitle: 'Come un esercito dimezzato accerchiò e distrusse otto legioni romane', synopsis: 'La ritirata ad arco convesso e la manovra a tenaglia studiata ancora oggi a West Point.', difficulty_level: 'intermedio', estimated_total_minutes: 12, lessons_count: 1, cover_badge: '🐘', sort_order: 2 }
];


export const curatedLessons = [
  // --- STORIA: Costantinopoli ---
  {
    id: 'lsn-cost-1', course_id: 'crs-costantinopoli', category_id: 'cat-storia', slug: 'assedio-mura-teodosiane',
    title: 'Le Mura Inviolabili e i Cannoni di Urbano',
    hook_subtitle: 'Come la tecnologia dell\'artiglieria pesante ha scardinato la difesa millenaria di Bisanzio.',
    reading_time_minutes: 7, audio_duration_seconds: 410, order_in_course: 1, is_daily_featured: 0,
    content_blocks: [
      {
        type: 'slide', title: 'Il triplice baluardo di Teodosio',
        text: 'Per oltre un millennio, Costantinopoli era considerata una fortezza inespugnabile grazie alle sue leggendarie Mura Teodosiane: tre cinte difensive concentriche alternate a fossati profondi. Nessun esercito — né arabi, né avari, né persiani — era mai riuscito a sfondarle via terra.',
        quote: 'Finché le mura resisteranno, la Nuova Roma vivrà.',
        takeaway: 'La geografia e l\'ingegneria militare bizantina avevano garantito la sopravvivenza dell\'impero per oltre 1.100 anni.'
      },
      {
        type: 'slide', title: 'La super-bombarda di Urbano di Transilvania',
        text: 'Il ventunenne sultano ottomano Maometto II comprese che l\'unico modo per abbattere le mura era la polvere da sparo su scala titanica. Assoldò un fonditore ungherese, Urbano, che costruì la "Basilica": un mostro di bronzo capace di scagliare proiettili di pietra da oltre mezza tonnellata a un chilometro e mezzo di distanza.',
        quote: 'Il boato dei cannoni scuoteva il Bosforo e squarciava le torri antiche.',
        takeaway: 'L\'assedio del 1453 fu il primo grande punto di svolta storico deciso dall\'artiglieria da fuoco pesante.'
      }
    ],
    key_takeaways: [
      'Le Mura Teodosiane avevano protetto Costantinopoli per oltre 1.000 anni.',
      'Maometto II utilizzò cannoni giganti in bronzo fusi da Urbano.',
      'La caduta della città segnò la fine dell\'Impero Romano d\'Oriente.'
    ],
    questions: [
      {
        id: 'q-cost-1', question_text: 'Quale imperatore romano aveva fatto erigere la celebre cinta muraria di Costantinopoli?',
        options: ['Giulio Cesare', 'Teodosio II', 'Augusto', 'Traiano'], correct_option_index: 1,
        explanation_text: 'Le Mura Teodosiane furono edificate nel V secolo sotto l\'imperatore Teodosio II per proteggere la capitale.'
      },
      {
        id: 'q-cost-2', question_text: 'Quale innovazione tecnologica fu decisiva nell\'assedio di Maometto II?',
        options: ['La balestra a ripetizione', 'I grandi cannoni e le bombarde d\'assedio', 'I ponti mobili sottomarini', 'La catapulta medievale'], correct_option_index: 1,
        explanation_text: 'La potenza di fuoco delle enormi bombarde ottomane riuscì ad aprire varchi letali nelle possenti mura in pietra.'
      }
    ]
  },

  // --- FILOSOFIA: Stoicismo ---
  {
    id: 'lsn-stoic-1', course_id: 'crs-stoicismo', category_id: 'cat-filosofia', slug: 'dicotomia-del-controllo-seneca',
    title: 'La Dicotomia del Controllo: La Chiave della Serenità',
    hook_subtitle: 'Imparare a distinguere ciò che dipende da noi da ciò che è fuori dal nostro potere.',
    reading_time_minutes: 7, audio_duration_seconds: 390, order_in_course: 1, is_daily_featured: 0,
    content_blocks: [
      {
        type: 'slide', title: 'Il principio cardinale di Epitteto',
        text: 'Epitteto, uno schiavo affrancato nell\'antica Roma che divenne maestro di filosofia, aprì il suo manuale con una frase che ha attraversato i millenni: «Delle cose alcune dipendono da noi, altre non dipendono da noi». Da noi dipendono le opinioni, i desideri, i rifiuti e le nostre azioni; non dipendono da noi il corpo, la ricchezza, la reputazione e le azioni altrui.',
        quote: 'Non sono le cose a turbare gli uomini, ma le opinioni che essi hanno delle cose.',
        takeaway: 'La maggior parte delle nostre sofferenze emotive nasce dal tentativo di controllare ciò che non è sotto il nostro controllo.'
      },
      {
        type: 'slide', title: 'La fortezza interiore di Marco Aurelio',
        text: 'Marco Aurelio, imperatore di Roma al vertice del mondo conosciuto, scriveva nei suoi "Colloqui con se stesso": «Hai potere sulla tua mente, non sugli eventi esterni. Comprendi questo e troverai la tua forza». Lo stoicismo non insegna a reprimere le emozioni, ma a non farsi schiavi dell\'ansia per il futuro.',
        quote: 'Sii come il promontorio contro cui si infrangono incessantemente le onde.',
        takeaway: 'La pace interiore è una postura mentale attiva che si allena ogni giorno davanti alle contrarietà.'
      }
    ],
    key_takeaways: [
      'La dicotomia del controllo distingue ciò che è in nostro potere da ciò che non lo è.',
      'Non soffriamo per gli eventi in sé, ma per il significato e il giudizio che vi attribuiamo.',
      'Marco Aurelio praticava lo stoicismo come esercizio quotidiano di equilibrio e lucidità.'
    ],
    questions: [
      {
        id: 'q-stoic-1', question_text: 'Secondo la filosofia stoica, quale tra queste cose dipende direttamente da noi?',
        options: ['La reputazione che gli altri hanno di noi', 'Le nostre reazioni, scelte e giudizi interiori', 'Le decisioni del governo e dell\'economia', 'La salute biologica del nostro corpo'], correct_option_index: 1,
        explanation_text: 'Gli stoici insegnano che solo i nostri pensieri, giudizi e risposte etiche sono pienamente sotto il nostro controllo.'
      },
      {
        id: 'q-stoic-2', question_text: 'Quale ruolo ricopriva Marco Aurelio, uno dei più celebri esponenti dello stoicismo?',
        options: ['Console ateniese', 'Imperatore romano', 'Pontefice massimo di Cartagine', 'Mercante di Alessandria'], correct_option_index: 1,
        explanation_text: 'Marco Aurelio fu imperatore romano dal 161 al 180 d.C. e compose i suoi pensieri stoici durante le campagne militari sul Danubio.'
      }
    ]
  },

  // --- SCIENZA: Quantistica ---
  {
    id: 'lsn-quant-1', course_id: 'crs-quantistica', category_id: 'cat-scienza', slug: 'doppia-fenditura-osservatore',
    title: 'L\'Esperimento della Doppia Fenditura',
    hook_subtitle: 'Perché un singolo elettrone sa comportarsi contemporaneamente come una particella e un\'onda.',
    reading_time_minutes: 8, audio_duration_seconds: 440, order_in_course: 1, is_daily_featured: 0,
    content_blocks: [
      {
        type: 'slide', title: 'Il mistero delle onde di probabilità',
        text: 'Se spari un fascio di luce o di elettroni contro due fenditure, sullo schermo appare una figura di interferenza con molteplici bande alternate chiare e scure: la materia si comporta come un\'onda nell\'acqua che attraversa entrambe le fessure contemporaneamente.',
        quote: 'Chiunque non rimanga scioccato dalla meccanica quantistica, non l\'ha capita.',
        takeaway: 'Nel microcosmo particelle e onde non sono entità separate ma due volti della medesima realtà.'
      },
      {
        type: 'slide', title: 'Il paradosso dell\'osservazione',
        text: 'Quando i fisici posizionarono un rivelatore per spiare da quale fessura passasse l\'elettrone, l\'interferenza ondulatoria svanì all\'istante: la misurazione attiva costringe il sistema a scegliere una traiettoria definita, facendo collassare la funzione d\'onda.',
        quote: 'La realtà non esiste fino a quando non viene misurata.',
        takeaway: 'L\'atto di misurazione fissa lo stato della particella quantistica.'
      }
    ],
    key_takeaways: [
      'Gli elettroni manifestano sia proprietà corpuscolari che ondulatorie.',
      'Senza osservazione, una particella viaggia come un\'onda di probabilità attraverso entrambe le fenditure.',
      'La misurazione attiva provoca il collasso della funzione d\'onda.'
    ],
    questions: [
      {
        id: 'q-quant-1', question_text: 'Cosa accade quando gli elettroni vengono sparati attraverso due fenditure senza essere osservati?',
        options: ['Scompaiono nel vuoto', 'Formano un pattern di interferenza ondulatoria', 'Colpiscono solo la fessura sinistra', 'Esplodono producendo calore'], correct_option_index: 1,
        explanation_text: 'Gli elettroni formano frange di interferenza tipiche delle onde, dimostrando il comportamento ondulatorio della materia.'
      },
      {
        id: 'q-quant-2', question_text: 'Quale effetto produce l\'introduzione di un sensore che misura la fessura esatta di passaggio?',
        options: ['Raddoppia l\'interferenza', 'Fa collassare la funzione d\'onda tornando a un comportamento da particella', 'Accellera la velocità oltre la luce', 'Non produce alcun cambiamento'], correct_option_index: 1,
        explanation_text: 'La misurazione distrugge la sovrapposizione quantistica forzando la particella a scegliere un percorso unico.'
      }
    ]
  },

  // --- GEOPOLITICA: Taiwan & Microchip ---
  {
    id: 'lsn-chip-1', course_id: 'crs-taiwan-chip', category_id: 'cat-geopolitica', slug: 'silicio-nuovo-petrolio',
    title: 'Perché i Semiconduttori sono il Nuovo Petrolio',
    hook_subtitle: 'Dagli smartphone all\'intelligenza artificiale: l\'invisibile monopolio di Taiwan.',
    reading_time_minutes: 7, audio_duration_seconds: 380, order_in_course: 1, is_daily_featured: 0,
    content_blocks: [
      {
        type: 'slide', title: 'La fabbrica del mondo a Hsinchu',
        text: 'Nello stretto tra la Cina continentale e Taiwan si produce il bene più strategico del XXI secolo. La Taiwan Semiconductor Manufacturing Company (TSMC) produce oltre il 90% dei microchip più avanzati del pianeta (sotto i 5 nanometri), utilizzati da Apple, Nvidia e nei centri dati dell\'AI.',
        quote: 'Nel Novecento la geopolitica girava intorno al petrolio; oggi ruota intorno alle macchine litografiche UV.',
        takeaway: 'L\'intera economia digitale mondiale dipende da una manciata di fonderie concentrate su un\'isola contesa.'
      },
      {
        type: 'slide', title: 'Lo scudo di silicio',
        text: 'Questa concentrazione industriale è spesso definita lo "Scudo di Silicio" di Taiwan: una garanzia geopolitica che rende vitale per gli Stati Uniti la difesa dello status quo nell\'isola, poiché un\'interruzione delle forniture paralizzerebbe l\'industria globale per anni.',
        quote: 'Un blocco navale di Taiwan costerebbe al PIL mondiale migliaia di miliardi di dollari.',
        takeaway: 'La tecnologia avanzata è il perno dell\'architettura di sicurezza mondiale.'
      }
    ],
    key_takeaways: [
      'TSMC produce oltre il 90% dei chip sotto i 5 nanometri a livello mondiale.',
      'I semiconduttori avanzati sono indispensabili per smartphone, cloud e intelligenza artificiale.',
      'Lo "Scudo di Silicio" rende la stabilità dello Stretto di Taiwan una priorità assoluta per l\'economia globale.'
    ],
    questions: [
      {
        id: 'q-chip-1', question_text: 'Quale azienda detiene la quota dominante nella produzione dei chip logici più avanzati al mondo?',
        options: ['Intel', 'TSMC (Taiwan)', 'Sony', 'Nokia'], correct_option_index: 1,
        explanation_text: 'TSMC a Taiwan è la fonderia leader mondiale che produce i chip ad architettura più ridotta per le principali tech company globali.'
      },
      {
        id: 'q-chip-2', question_text: 'Che cosa si intende per "Scudo di Silicio" di Taiwan?',
        options: ['Un radar militare sottomarino', 'La dipendenza economica mondiale dai chip che rende cruciale la protezione dell\'isola', 'Una cupola protettiva contro i terremoti', 'Un brevetto esclusivo di Google'], correct_option_index: 1,
        explanation_text: 'È la teoria geopolitica secondo cui il ruolo insostituibile di Taiwan nella catena del silicio spinge l\'Occidente a garantirne l\'indipendenza e la sicurezza.'
      }
    ]
  }
];
