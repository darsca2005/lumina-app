// Catalogo Editoriale Completo per Lumina
// 24 Percorsi Tematici e oltre 45 Lezioni con schede, citazioni e quiz didattici

export const extraCourses = [
  // --- STORIA ---
  {
    id: 'crs-costantinopoli', category_id: 'cat-storia', slug: 'caduta-costantinopoli-1453',
    title: '1453: La Caduta di Costantinopoli',
    subtitle: 'La fine dell\'Impero Bizantino e l\'alba del Rinascimento',
    synopsis: 'Dopo oltre millecento anni di storia, la capitale dell\'Impero Romano d\'Oriente cede all\'assedio del giovane sultano Maometto II. Un evento che ha scosso le fondamenta dell\'Europa e aperto l\'era moderna.',
    difficulty_level: 'intermedio', estimated_total_minutes: 15, lessons_count: 2, cover_badge: '🏰', sort_order: 2
  },
  {
    id: 'crs-corsa-spazio', category_id: 'cat-storia', slug: 'corsa-allo-spazio-allunaggio',
    title: 'La Corsa allo Spazio: Dallo Sputnik alla Luna',
    subtitle: 'Guerra Fredda, audacia scientifica e il primo passo dell\'umanità',
    synopsis: 'La sfida tecnologica tra USA e URSS che ha portato l\'uomo oltre i confini dell\'atmosfera. Dalla voce metallica dello Sputnik al discorso di Kennedy e all\'atterraggio nel Mare della Tranquillità.',
    difficulty_level: 'base', estimated_total_minutes: 14, lessons_count: 2, cover_badge: '🚀', sort_order: 3
  },
  {
    id: 'crs-rinascimento', category_id: 'cat-storia', slug: 'rinascimento-fiorentino-umanesimo',
    title: 'Il Rinascimento Fiorentino',
    subtitle: 'I Medici, la riscoperta dei classici e la rivoluzione visiva',
    synopsis: 'Come una città mercantile della Toscana ha acceso una rivoluzione culturale senza precedenti, ponendo l\'essere umano al centro dell\'universo e reinventando l\'arte e il pensiero.',
    difficulty_level: 'base', estimated_total_minutes: 14, lessons_count: 2, cover_badge: '⚜️', sort_order: 4
  },

  // --- FILOSOFIA ---
  {
    id: 'crs-stoicismo', category_id: 'cat-filosofia', slug: 'stoicismo-seneca-marco-aurelio',
    title: 'Lo Stoicismo Quotidiano: Da Seneca a Marco Aurelio',
    subtitle: 'La dicotomia del controllo e la serenità nelle tempeste della vita',
    synopsis: 'La filosofia pratica più amata e resiliente della storia: come distinguere ciò che dipende da noi da ciò che non possiamo controllare, per vivere liberi dall\'ansia e dal risentimento.',
    difficulty_level: 'base', estimated_total_minutes: 15, lessons_count: 2, cover_badge: '🛡️', sort_order: 3
  },
  {
    id: 'crs-nietzsche', category_id: 'cat-filosofia', slug: 'nietzsche-oltreuomo-volonta',
    title: 'Nietzsche: Il Coraggio dell\'Oltreuomo',
    subtitle: 'La caduta delle certezze, l\'eterno ritorno e l\'amor fati',
    synopsis: 'Oltre i cliché e i fraintendimenti: il pensiero affilato di Friedrich Nietzsche sul superamento del nichilismo, la fedeltà alla terra e la capacità di abbracciare la vita con gioia incondizionata.',
    difficulty_level: 'avanzato', estimated_total_minutes: 15, lessons_count: 2, cover_badge: '⚡', sort_order: 4
  },
  {
    id: 'crs-platone-caverna', category_id: 'cat-filosofia', slug: 'platone-mito-della-caverna',
    title: 'Platone e il Mito della Caverna',
    subtitle: 'Ombre, catene e la liberazione verso la luce della verità',
    synopsis: 'La più celebre allegoria della storia del pensiero: prigionieri che scambiano le ombre per la realtà e il prezzo da pagare per chi osa uscire alla luce e tornare a liberare gli altri.',
    difficulty_level: 'base', estimated_total_minutes: 14, lessons_count: 2, cover_badge: '🕯️', sort_order: 5
  },

  // --- SCIENZA ---
  {
    id: 'crs-quantistica', category_id: 'cat-scienza', slug: 'meccanica-quantistica-fondamenti',
    title: 'I Misteri della Meccanica Quantistica',
    subtitle: 'Dualismo onda-particella, il gatto di Schrödinger e l\'entanglement',
    synopsis: 'Nel mondo dell\'infinitamente piccolo la realtà si comporta in modo controintuitivo. Una guida accessibile che svela perché l\'osservatore influenza la materia e cosa significa l\'azione a distanza.',
    difficulty_level: 'avanzato', estimated_total_minutes: 16, lessons_count: 2, cover_badge: '⚛️', sort_order: 2
  },
  {
    id: 'crs-evoluzione', category_id: 'cat-scienza', slug: 'darwin-evoluzione-specie',
    title: 'Darwin e l\'Origine delle Specie',
    subtitle: 'Il viaggio del Beagle e il motore silenzioso della selezione naturale',
    synopsis: 'Come l\'osservazione dei fringuelli alle isole Galápagos ha demolito il fissismo biologico e mostrato che tutta la vita sulla Terra discende da un unico maestoso albero evolutivo.',
    difficulty_level: 'base', estimated_total_minutes: 14, lessons_count: 2, cover_badge: '🧬', sort_order: 3
  },
  {
    id: 'crs-cervello', category_id: 'cat-scienza', slug: 'neuroscienze-mistero-coscienza',
    title: 'I Segreti del Cervello e della Coscienza',
    subtitle: '86 miliardi di neuroni e il miracolo dei pensieri',
    synopsis: 'Cosa accade nella materia cerebrale quando proviamo un\'emozione, prendiamo una decisione o ricordiamo un profumo dell\'infanzia? Un viaggio tra sinapsi e plasticità neuronale.',
    difficulty_level: 'intermedio', estimated_total_minutes: 14, lessons_count: 2, cover_badge: '🧠', sort_order: 4
  },

  // --- GEOPOLITICA ---
  {
    id: 'crs-taiwan-chip', category_id: 'cat-geopolitica', slug: 'battaglia-dei-microchip-taiwan',
    title: 'La Guerra dei Microchip e il Dilemma di Taiwan',
    subtitle: 'Perché pochi millimetri di silicio decidono le sorti del pianeta',
    synopsis: 'TSMC produce oltre il 90% dei semiconduttori più avanzati del mondo. Chi controlla la catena del silicio domina l\'intelligenza artificiale, la difesa e l\'economia del ventunesimo secolo.',
    difficulty_level: 'intermedio', estimated_total_minutes: 14, lessons_count: 2, cover_badge: '💾', sort_order: 2
  },
  {
    id: 'crs-suez', category_id: 'cat-geopolitica', slug: 'canale-suez-arteria-globale',
    title: 'Il Canale di Suez: La Strozzatura d\'Egitto',
    subtitle: 'Dalla crisi del 1956 al blocco commerciale mondiale',
    synopsis: 'Tagliando 7.000 chilometri di circumnavigazione dell\'Africa, Suez collega Europa e Asia. Scopri la sua storia travagliata e la fragilità delle catene logistiche planetarie.',
    difficulty_level: 'base', estimated_total_minutes: 12, lessons_count: 2, cover_badge: '🚢', sort_order: 3
  },

  // --- LETTERATURA ---
  {
    id: 'crs-dante-commedia', category_id: 'cat-letteratura', slug: 'dante-divina-commedia-architettura',
    title: 'Dante e l\'Architettura dell\'Oltretomba',
    subtitle: 'Viaggio cosmico tra i peccati umani e la redenzione morale',
    synopsis: 'La cattedrale letteraria della lingua italiana. Perché la discesa negli abissi dell\'Inferno e la scalata verso il Paradiso continuano a parlarci con una forza moderna e universale.',
    difficulty_level: 'base', estimated_total_minutes: 15, lessons_count: 2, cover_badge: '📜', sort_order: 2
  },
  {
    id: 'crs-shakespeare', category_id: 'cat-letteratura', slug: 'shakespeare-anatomia-passioni',
    title: 'Shakespeare: L\'Anatomia dell\'Anima',
    subtitle: 'Dubbio, gelosia, ambizione e potere nel teatro universale',
    synopsis: 'Da Amleto a Macbeth, da Otello a Re Lear: come un drammaturgo del Globe Theatre di Londra ha creato gli archetipi immortali della psicologia e delle contraddizioni umane.',
    difficulty_level: 'base', estimated_total_minutes: 14, lessons_count: 2, cover_badge: '🎭', sort_order: 3
  },

  // --- ECONOMIA ---
  {
    id: 'crs-bolle-finanza', category_id: 'cat-economia', slug: 'bolle-speculative-storia',
    title: 'Dalla Tulipomania a Wall Street: Breve Storia delle Bolle',
    subtitle: 'Avidità, euforia collettiva e il risveglio improvviso dei mercati',
    synopsis: 'Come nell\'Olanda del Seicento un bulbo di tulipano arrivò a costare quanto una villa sul canale e perché la psicologia umana continua a ripetere gli stessi errori finanziari.',
    difficulty_level: 'base', estimated_total_minutes: 14, lessons_count: 2, cover_badge: '🌷', sort_order: 2
  },
  {
    id: 'crs-teoria-giochi', category_id: 'cat-economia', slug: 'teoria-dei-giochi-nash',
    title: 'La Teoria dei Giochi e il Dilemma del Prigioniero',
    subtitle: 'Strategie razionali, fiducia e cooperazione nel mondo reale',
    synopsis: 'La geniale intuizione di John Nash: quando conviene cooperare e quando tradire? Come la matematica applicata spiega le trattative geopolitiche, gli accordi commerciali e le scelte quotidiane.',
    difficulty_level: 'intermedio', estimated_total_minutes: 14, lessons_count: 2, cover_badge: '♟️', sort_order: 3
  },

  // --- ARTE ---
  {
    id: 'crs-caravaggio', category_id: 'cat-arte', slug: 'caravaggio-luce-e-tenebre',
    title: 'Caravaggio: Luce Ferita e Tenebre',
    subtitle: 'Il realismo dei bassifondi romani e la rivoluzione del chiaroscuro',
    synopsis: 'Michelangelo Merisi detto il Caravaggio: un artista ribelle che scelse prostitute e mendicanti come modelli per i santi e illuminò il Seicento con una luce violenta, teatrale e struggente.',
    difficulty_level: 'base', estimated_total_minutes: 14, lessons_count: 2, cover_badge: '🕯️', sort_order: 1
  },
  {
    id: 'crs-impressionismo', category_id: 'cat-arte', slug: 'impressionismo-rivoluzione-luce',
    title: 'L\'Impressionismo: Catturare l\'Attimo Fugcente',
    subtitle: 'Monet, Renoir e lo scandalo che ha cambiato per sempre l\'arte',
    synopsis: 'Uscire dagli atelier accademici per dipingere all\'aria aperta (en plein air), cogliendo i riflessi del sole sull\'acqua e il battito vitale dei boulevard parigini.',
    difficulty_level: 'base', estimated_total_minutes: 14, lessons_count: 2, cover_badge: '🎨', sort_order: 2
  },

  // --- PSICOLOGIA ---
  {
    id: 'crs-bias-cognitivi', category_id: 'cat-psicologia', slug: 'bias-cognitivi-trappole-mentali',
    title: 'Le Trappole della Mente: I Bias Cognitivi',
    subtitle: 'Come il cervello prende scorciatoie e perché ci inganniamo',
    synopsis: 'Dagli studi pionieristici dei premi Nobel Kahneman e Tversky: bias di conferma, euristica della disponibilità ed effetto ancoraggio spiegati attraverso esempi di vita quotidiana.',
    difficulty_level: 'base', estimated_total_minutes: 15, lessons_count: 2, cover_badge: '🪤', sort_order: 1
  },
  {
    id: 'crs-memoria-oblio', category_id: 'cat-psicologia', slug: 'memoria-apprendimento-oblio',
    title: 'L\'Arte del Ricordo e la Scienza dell\'Oblio',
    subtitle: 'Perché dimentichiamo e come allenare la ritenzione a lungo termine',
    synopsis: 'La memoria non è un hard disk statico ma un processo dinamico e ricostruttivo. Scopri la curva dell\'oblio di Ebbinghaus e i segreti della ripetizione spaziata (spaced repetition).',
    difficulty_level: 'base', estimated_total_minutes: 14, lessons_count: 2, cover_badge: '⏳', sort_order: 2
  }
];

export const extraLessons = [
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
        text: 'Marco Aurelio, imperatore di Roma al vertice del mondo conosciuto, scriveva nei suoi "Colloqui con se stesso" tra un accampamento militare e l\'altro: «Hai potere sulla tua mente, non sugli eventi esterni. Comprendi questo e troverai la tua forza». Lo stoicismo non insegna a reprimere le emozioni, ma a non farsi schiavi dell\'ansia per il futuro o della rabbia per il passato.',
        quote: 'Sii come il promontorio contro cui si infrangono incessantemente le onde: esso resta immobile e intorno si placa il ribollire delle acque.',
        takeaway: 'La pace interiore è una postura mentale attiva che si allena ogni giorno davanti alle piccole e grandi contrarietà.'
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
        text: 'Se spari palline da tennis contro una parete con due fessure, sullo schermo retrostante vedrai formarsi due bande verticali. Ma se spari un fascio di luce o di elettroni, sullo schermo appare una figura di interferenza con molteplici bande alternate chiare e scure: la materia si comporta come un\'onda nell\'acqua che attraversa entrambe le fessure contemporaneamente.',
        quote: 'Chiunque non rimanga scioccato dalla meccanica quantistica, non l\'ha capita.',
        takeaway: 'Nel microcosmo particelle e onde non sono entità separate ma due volti della medesima realtà.'
      },
      {
        type: 'slide', title: 'Il paradosso dell\'osservazione',
        text: 'I fisici decisero di posizionare un rivelatore accanto a una delle fessure per spiare da quale delle due passasse realmente l\'elettrone. Accadde l\'incredibile: nel momento stesso in cui l\'esperimento osservava la traiettoria, l\'interferenza ondulatoria svaniva all\'istante e gli elettroni tornavano a comportarsi come granelli di sabbia ordinari. L\'atto dell\'osservazione perturba e collassa la funzione d\'onda.',
        quote: 'La realtà non esiste fino a quando non viene misurata.',
        takeaway: 'L\'interazione con lo strumento di misura determina il comportamento finale del sistema quantistico.'
      }
    ],
    key_takeaways: [
      'Gli elettroni manifestano sia proprietà corpuscolari che ondulatorie.',
      'Senza osservazione, una particella viaggia come un\'onda di probabilità attraverso entrambe le fenditure.',
      'La misurazione attiva provoca il collasso della funzione d\'onda in una posizione determinata.'
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
        text: 'Nello stretto tra la Cina continentale e Taiwan si produce il bene più strategico del XXI secolo. La Taiwan Semiconductor Manufacturing Company (TSMC) produce oltre il 90% dei microchip più avanzati del pianeta (sotto i 5 nanometri), utilizzati da Apple, Nvidia, Qualcomm e nei centri dati dell\'intelligenza artificiale.',
        quote: 'Nel Novecento la geopolitica girava intorno alle riserve di petrolio; oggi ruota intorno alle macchine litografiche UV.',
        takeaway: 'L\'intera economia digitale mondiale dipende da una manciata di fonderie concentrate su un\'isola sismica e contesa.'
      },
      {
        type: 'slide', title: 'Lo scudo di silicio',
        text: 'Questa concentrazione industriale è spesso definita lo "Scudo di Silicio" di Taiwan: una garanzia geopolitica che rende vitale per gli Stati Uniti e l\'Occidente la difesa dello status quo nell\'isola, poiché un\'interruzione delle forniture paralizzerebbe l\'industria globale di auto, computer e difesa per anni.',
        quote: 'Un blocco navale di Taiwan costerebbe al PIL mondiale migliaia di miliardi di dollari nel giro di pochi mesi.',
        takeaway: 'La tecnologia avanzata non è solo un mercato commerciale, ma il perno dell\'architettura di sicurezza mondiale.'
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
  },

  // --- LETTERATURA: Divina Commedia ---
  {
    id: 'lsn-dante-1', course_id: 'crs-dante-commedia', category_id: 'cat-letteratura', slug: 'selva-oscura-inferno',
    title: 'Nel Mezzo del Cammin: La Selva e la Discesa',
    hook_subtitle: 'Il viaggio allegorico attraverso le tre fiere e l\'incontro con Virgilio.',
    reading_time_minutes: 7, audio_duration_seconds: 400, order_in_course: 1, is_daily_featured: 0,
    content_blocks: [
      {
        type: 'slide', title: 'Lo smarrimento a metà della vita',
        text: 'All\'età di trentacinque anni, esule dalla sua amata Firenze, Dante Alighieri immagina di perdersi in una selva oscura dove «la diritta via era smarrita». È il dramma universale dell\'uomo che tocca il fondo della disperazione morale e politica. Tre fiere gli sbarrano il cammino verso il colle luminoso: la lonza (la lussuria), il leone (la superbia violenta) e la lupa (l\'insaziabile avidità).',
        quote: 'Nel mezzo del cammin di nostra vita / mi ritrovai per una selva oscura / ché la diritta via era smarrita.',
        takeaway: 'La Commedia è la parabola di ogni essere umano che deve guardare in faccia il male per poter risalire verso la libertà.'
      },
      {
        type: 'slide', title: 'Il maestro Virgilio e il contrappasso',
        text: 'Per salvarsi, Dante non può fuggire ma deve attraversare il regno dei dannati guidato dalla ragione umana incarnata dal poeta Virgilio. L\'Inferno dantesco è regolato dalla ferrea legge del contrappasso: la punizione eterna non è arbitraria, ma rispecchia fedelmente per analogia o per contrasto il peccato commesso in vita.',
        quote: 'Lasciate ogne speranza, voi ch\'intrate.',
        takeaway: 'Il contrappasso non è vendetta divina ma la conseguenza logica delle scelte terrene dell\'individuo.'
      }
    ],
    key_takeaways: [
      'Dante ambienta il viaggio all\'età di 35 anni (a metà del cammino della vita).',
      'Le tre fiere rappresentano lussuria, superbia e avidità.',
      'La legge del contrappasso stabilisce una corrispondenza perfetta tra colpa e pena.'
    ],
    questions: [
      {
        id: 'q-dante-1', question_text: 'Quale poeta guida Dante attraverso i cerchi dell\'Inferno e del Purgatorio?',
        options: ['Omero', 'Virgilio', 'Petrarca', 'Cicerone'], correct_option_index: 1,
        explanation_text: 'Publio Virgilio Marone, autore dell\'Eneide, è scelto da Dante come guida e simbolo della ragione umana e della poesia classica.'
      },
      {
        id: 'q-dante-2', question_text: 'Cosa stabilisce la legge del contrappasso nell\'Inferno dantesco?',
        options: ['I peccatori vengono perdonati dopo mille anni', 'La pena eterna riflette per somiglianza o contrasto la colpa commessa in vita', 'Le anime scelgono autonomamente la propria punizione', 'Tutti i peccatori subiscono la medesima condanna nel fuoco'], correct_option_index: 1,
        explanation_text: 'Il contrappasso stabilisce che la punizione nell\'oltretomba sia il riflesso esatto o l\'inverso del comportamento tenuto sulla terra.'
      }
    ]
  },

  // --- ECONOMIA: Bolle Speculative ---
  {
    id: 'lsn-bolle-1', course_id: 'crs-bolle-finanza', category_id: 'cat-economia', slug: 'tulipomania-olanda-1637',
    title: 'La Tulipomania: Quando i Fiori valevano come Palazzi',
    hook_subtitle: 'La prima bolla speculativa documentata e la trappola dell\'avidità collettiva.',
    reading_time_minutes: 7, audio_duration_seconds: 390, order_in_course: 1, is_daily_featured: 0,
    content_blocks: [
      {
        type: 'slide', title: 'Il Semper Augustus e l\'isteria del mercato',
        text: 'Nell\'Olanda del Secolo d\'Oro (1636-1637), i tulipani importati dall\'Impero Ottomano divennero il supremo status symbol della borghesia. In particolare, i rari bulbi striati dal virus del mosaico — come il celebre Semper Augustus — raggiunsero quotazioni folli: un singolo bulbo arrivò a essere scambiato per 5.000 fiorini, l\'equivalente di una sontuosa residenza affacciata sul canale di Amsterdam, insieme a carichi di grano, birra e bestiame.',
        quote: 'Un nobile scambiò dodici acri di terreno per un solo bulbo di tulipano.',
        takeaway: 'I prezzi di mercato possono distaccarsi completamente dal valore intrinseco di un bene quando subentra l\'euforia speculativa.'
      },
      {
        type: 'slide', title: 'Il crollo improvviso a Haarlem',
        text: 'Nessuno voleva più coltivare i fiori: tutti compravano contratti a termine sperando di rivenderli il giorno dopo a un prezzo maggiorato (la cosiddetta "teoria del più fesso"). Nel febbraio 1637, durante un\'asta ad Haarlem, per la prima volta nessun compratore si presentò disposto a pagare il prezzo d\'apertura. Il panico fu istantaneo: in poche ore i prezzi crollarono del 90%, lasciando migliaia di cittadini sul lastrico con in mano semplici bulbi di cipolla colorata.',
        quote: 'La fiducia sale a piccoli passi con le scale, ma scende in picchiata con l\'ascensore.',
        takeaway: 'Tutte le bolle speculative, dalla tulipomania alle dot-com e ai mutui subprime, seguono la stessa psicologia di massa: euforia cieca seguita da panico contagioso.'
      }
    ],
    key_takeaways: [
      'La tulipomania olandese del 1637 è considerata la prima bolla finanziaria moderna.',
      'I bulbi venivano scambiati con contratti a termine a prezzi centinaia di volte superiori al loro valore reale.',
      'Il collasso avvenne repentinamente quando svanì la fiducia che qualcun altro comprasse a prezzo più alto.'
    ],
    questions: [
      {
        id: 'q-bolle-1', question_text: 'In quale nazione europea e in quale secolo si verificò la celebre "Tulipomania"?',
        options: ['Francia nel Settecento', 'Olanda nel Seicento', 'Inghilterra nell\'Ottocento', 'Spagna nel Cinquecento'], correct_option_index: 1,
        explanation_text: 'La tulipomania scoppiò nella Repubblica delle Province Unite (odierna Olanda) nel 1636-1637 durante il secolo d\'oro olandese.'
      },
      {
        id: 'q-bolle-2', question_text: 'Che cos\'è in economia la "teoria del più fesso" (greater fool theory)?',
        options: ['Una formula per evitare il pagamento delle tasse', 'L\'idea di comprare a prezzo gonfio confidando di trovare qualcuno disposto a pagare ancora di più', 'Una regola per il baratto tra banche centrali', 'La decisione di non investire mai nei mercati azionari'], correct_option_index: 1,
        explanation_text: 'Descrive il comportamento di chi acquista beni sopravvalutati contando unicamente sulla possibilità di rivenderli a un prezzo superiore a un altro speculatore.'
      }
    ]
  },

  // --- ARTE: Caravaggio ---
  {
    id: 'lsn-carav-1', course_id: 'crs-caravaggio', category_id: 'cat-arte', slug: 'vocazione-san-matteo-chiaroscuro',
    title: 'La Vocazione di San Matteo: La Luce che Salva',
    hook_subtitle: 'Nella penombra di una taverna romana, un raggio di luce divina chiama un gabelliere.',
    reading_time_minutes: 7, audio_duration_seconds: 400, order_in_course: 1, is_daily_featured: 0,
    content_blocks: [
      {
        type: 'slide', title: 'Una taverna al posto del tempio',
        text: 'Nel 1600, nella cappella Contarelli della chiesa di San Luigi dei Francesi a Roma, Caravaggio svela un capolavoro che spezza ogni convenzione rinascimentale. La chiamata dell\'apostolo Matteo non è ambientata in uno spazio sacro celeste, ma in una buia bettola del Seicento, con uomini vestiti alla moda dell\'epoca che contano avidamente monete su un tavolo di legno grezzo.',
        quote: 'Caravaggio non dipingeva santi ideali, ma i volti segnati della gente del popolo.',
        takeaway: 'La grazia divina non scende sui perfetti, ma irrompe nell\'oscurità della vita quotidiana e marginale.'
      },
      {
        type: 'slide', title: 'Il raggio radente di luce divina',
        text: 'A destra, quasi nascosto nell\'ombra, Gesù entra indicando Matteo. Il suo dito teso cita esplicitamente il braccio di Adamo nella Cappella Sistina di Michelangelo. Ma il vero protagonista del dipinto è la luce: una lama dorata taglia la penombra dall\'alto verso il basso, illuminando lo sguardo attonito di Matteo che indica se stesso con la mano, come a chiedere: «Chi, proprio io?».',
        quote: 'La luce di Caravaggio non rischiara semplicemente: sceglie, rivela e riscatta.',
        takeaway: 'Il chiaroscuro drammatico caravaggesco trasforma la luce in un attore teatrale che definisce il senso dell\'opera.'
      }
    ],
    key_takeaways: [
      'Caravaggio ambienta l\'episodio sacro in una taverna coeva della Roma del 1600.',
      'La mano di Cristo richiama l\'Adamo della Creazione di Michelangelo.',
      'Il raggio di luce radente simboleggia visivamente la chiamata divina che irrompe nell\'oscurità.'
    ],
    questions: [
      {
        id: 'q-carav-1', question_text: 'In quale città è custodita la "Vocazione di San Matteo" di Caravaggio?',
        options: ['Firenze', 'Roma', 'Parigi', 'Napoli'], correct_option_index: 1,
        explanation_text: 'Il capolavoro si trova nella Cappella Contarelli della Chiesa di San Luigi dei Francesi a Roma.'
      },
      {
        id: 'q-carav-2', question_text: 'Quale elemento visivo caratterizza in modo rivoluzionario la pittura di Caravaggio?',
        options: ['La prospettiva aerea sfocata azzurra', 'Il chiaroscuro drammatico con forti contrasti tra luci radenti e ombre profonde', 'L\'uso esclusivo di colori pastello', 'L\'assenza totale di figure umane'], correct_option_index: 1,
        explanation_text: 'Il celebre chiaroscuro caravaggesco fa emergere le figure dai fondi bui con fasci di luce teatrali di straordinaria potenza realistica.'
      }
    ]
  },

  // --- PSICOLOGIA: Bias Cognitivi ---
  {
    id: 'lsn-bias-1', course_id: 'crs-bias-cognitivi', category_id: 'cat-psicologia', slug: 'bias-di-conferma-euristica',
    title: 'Il Bias di Conferma: Lo Specchio delle Nostre Certezze',
    hook_subtitle: 'Perché tendiamo a cercare solo ciò che conferma quello in cui già crediamo.',
    reading_time_minutes: 7, audio_duration_seconds: 390, order_in_course: 1, is_daily_featured: 0,
    content_blocks: [
      {
        type: 'slide', title: 'Cercare prove o cercare rassicurazioni?',
        text: 'Il bias di conferma è la tendenza sistematica del nostro cervello a cercare, interpretare, favorire e ricordare le informazioni che confermano le nostre convinzioni preesistenti, ignorando o sminuendo con scetticismo qualsiasi dato contrario. Quando navighiamo su internet o leggiamo le notizie, il nostro cervello non agisce come un giudice imparziale, ma come un avvocato difensore delle nostre idee.',
        quote: 'Ciò che l\'uomo desidera che sia vero, a quello con maggiore facilità crede.',
        takeaway: 'Il cervello consuma meno energia cognitiva confermando un\'idea vecchia piuttosto che ristrutturare la propria visione del mondo.'
      },
      {
        type: 'slide', title: 'L\'algoritmo amplificatore e l\'effetto camera d\'eco',
        text: 'Nelle piattaforme social questo meccanismo biologico viene amplificato dagli algoritmi di raccomandazione: se interagiamo con contenuti allineati alle nostre simpatie, il feed ce ne mostrerà sempre di più, creando una bolla di filtro (filter bubble) in cui sembra che "tutti la pensino come noi". Per difendersi, l\'unico antidoto efficace è il dubbio socratico: chiedersi attivamente «Quali prove mi farebbero cambiare idea?».',
        quote: 'Il vero segno di una mente educata è la capacità di intrattenere un pensiero senza accettarlo a priori.',
        takeaway: 'La consapevolezza dei propri bias è il primo passo verso una reale autonomia di pensiero.'
      }
    ],
    key_takeaways: [
      'Il bias di conferma spinge a selezionare solo i fatti compatibili con le opinioni già possedute.',
      'Gli algoritmi online amplificano questo fenomeno creando camere d\'eco informative.',
      'Cercare deliberatamente contro-esempi è la migliore palestra per il pensiero critico.'
    ],
    questions: [
      {
        id: 'q-bias-1', question_text: 'Che cos\'è il "bias di conferma" in psicologia cognitiva?',
        options: [
          'La capacità di memorizzare elenchi di parole al primo tentativo',
          'La tendenza a privilegiare informazioni che confermano le proprie credenze trascurando le prove contrarie',
          'Un disturbo dell\'udito legato all\'eco',
          'La propensione ad accettare qualsiasi consiglio offerto da figure autoritarie'
        ], correct_option_index: 1,
        explanation_text: 'Il bias di conferma ci porta a raccogliere e ricordare solo ciò che corrobora le nostre opinioni pregresse.'
      },
      {
        id: 'q-bias-2', question_text: 'Quale strategia aiuta a contrastare gli effetti del bias di conferma?',
        options: [
          'Leggere esclusivamente fonti che confermano la propria tesi',
          'Cercare attivamente argomenti contrari e chiedersi cosa potrebbe smentire la propria opinione',
          'Smettere di informarsi sui temi complessi',
          'Cancellare tutte le proprie convinzioni ogni mattina'
        ], correct_option_index: 1,
        explanation_text: 'Sottoporre a verifica critica le proprie ipotesi attraverso la ricerca attiva di prove contrarie mitiga l\'errore cognitivo.'
      }
    ]
  }
];
