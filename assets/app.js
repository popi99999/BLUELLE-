try {

// TRANSLATIONS
const T={
  it:{tagline:'Luxury Second Hand',hero_cta:'Esplora la collezione',scroll:'Scorri',about_eye:'Chi siamo',about_title:'Second hand.<br><em>First class.</em>',coll_eye:'Disponibile ora',coll_title:'La <em>collezione</em>',all:'Tutti',how_eye:'Vuoi vendere o affidarci un capo?',how_title:'Come <em>funziona</em>',s01t:'Scrivici',s01p:'Mandaci foto e dettagli del capo su Instagram. Ti rispondiamo subito.',s02t:'Valutiamo',s02p:'Autentichiamo il capo con IRIS e definiamo insieme il prezzo giusto.',s03t:'Vendiamo',s03p:'Pubblichiamo il capo e lo presentiamo alla nostra community.',s04t:'Ti paghiamo',s04p:'A vendita conclusa ricevi il pagamento. Semplice e sicuro.',sell_cta:'Affida il tuo capo',faq_eye:'Hai domande?',faq_title:'Domande <em>frequenti</em>',fq1:'I capi sono originali?',fa1:'Sì, al 100%. Verifico personalmente ogni pezzo prima di metterlo in vendita — etichette, cuciture, materiali, accessori.',fq2:'Quanto tempo richiede la spedizione?',fa2:'Standard: 3–5 giorni lavorativi. Express: 1–2 giorni. Ricevi un codice di tracciamento via email appena il pacco parte.',fq3:'I prezzi sono trattabili?',fa3:'No. I prezzi sono fissi e già scontati rispetto al retail. Se arriveranno promozioni, le annuncerò su Instagram.',fq4:'Come traccio il mio ordine?',fa4:'Usa il codice di tracciamento ricevuto via email. Puoi inserirlo anche nella sezione Tracking di questo sito.',fq5:'Il pagamento è sicuro?',fa5:'Sì. I pagamenti sono gestiti da Stripe, uno dei sistemi più affidabili al mondo. Accetto carte, Apple Pay e Google Pay.',track_eye:'Hai già ordinato?',track_title:'Traccia il tuo <em>ordine</em>',track_btn:'Cerca',contact_eye:'Scrivici',contact_title:'Scrivimi su <em>Instagram</em>',ig_follow:'seguici su',ig_cap:'Nuovi arrivi in anteprima, selezioni esclusive e DM sempre aperti.',nav_about:'Chi siamo',nav_coll:'Collezione',nav_contact:'Contatti',modal_why:'Perché acquistare da Bluèlle',mw1:'Capo autenticato personalmente',mw2:'Risparmio fino al 65%',mw3:'Imballaggio curato, spedizione tracciata',mw4:'Spedizione tracciabile, pagamento sicuro',secure_pay:'Pagamento sicuro via Stripe',buy:'Acquista',sold:'Venduto',avail:'Disponibile',see:'Vedi',size:'Taglia',gw_him:'Per lui',gw_her:'Per lei',gw_enter:'Entra',gw_soon:'In arrivo',gw_pick:'Scegli un mondo',gw_note:'La collezione donna sta arrivando — seguici su Instagram.',auth_eye:'Autenticità garantita',auth_h2:'IRIS<sup class="iris-reg">®</sup>',auth_l1:'Ogni capo verificato personalmente prima della messa in vendita',auth_l2:'Pezzi nuovi o come nuovi, molti con cartellino originale',auth_l3:'Etichette, cuciture, materiali — niente viene trascurato',iris_tag:'Il nostro sistema di autenticazione proprietario. Ogni capo è verificato dai nostri esperti e dal software IRIS.',iris_s1t:'Ispezione fisica',iris_s1p:'I nostri esperti esaminano cuciture, etichette, materiali e accessori.',iris_s2t:'Analisi IRIS',iris_s2p:'Il software confronta i dettagli del capo con il nostro archivio di riferimento.',iris_s3t:'Certificato',iris_s3p:'Solo i capi che superano entrambi i controlli vengono messi in vendita.',save_eye:'Il lusso che conviene',save_h2:'Risparmia.',save_h2e:'Senza compromessi.',save_p:"Ogni capo che compri da Bluèlle ti fa risparmiare fino al 65% rispetto al prezzo in boutique. Lo stesso lusso, la stessa qualità — a un prezzo che ha senso.",save_stat1_lbl:'rispetto al prezzo retail',save_stat2_lbl:'autenticità verificata',hero_t1:'Selezionati con cura.',hero_t2:'Al prezzo giusto.',about_story_quote:'"Ho sempre cercato il bello con cura. Il mare mi ha insegnato a riconoscerlo."',about_story:'Bluèlle nasce da un occhio allenato alla selezione — dalla capacità di distinguere ciò che dura da ciò che passa. Ogni capo che trovi qui è stato cercato, toccato e valutato da me. Solo autenticità. Solo prezzi che hanno senso.',about_mission:'"Il lusso non dovrebbe essere un privilegio. Dovrebbe essere una scelta consapevole."',auth_sub:'Non vendo ciò che non indosserei io stesso.',cond_mint:'Eccellente',cond_vgood:'Molto buono',cond_good:'Buono',cond_great:'Ottima',cond_new:'Nuovo',price_req:'Su richiesta',box_note:' Box originale inclusa.'},
  en:{tagline:'Luxury Second Hand',hero_cta:'Explore the collection',scroll:'Scroll',about_eye:'About us',about_title:'Second hand.<br><em>First class.</em>',coll_eye:'Available now',coll_title:'The <em>collection</em>',all:'All',how_eye:'Want to sell or consign a piece?',how_title:'How it <em>works</em>',s01t:'Message us',s01p:'Send us photos and details of the piece on Instagram. We reply quickly.',s02t:'We evaluate',s02p:'We authenticate the piece with IRIS and set the right price together.',s03t:'We sell',s03p:'We list the piece and present it to our community.',s04t:'We pay you',s04p:'Once sold, you receive your payment. Simple and secure.',sell_cta:'Consign your piece',faq_eye:'Got questions?',faq_title:'Frequently asked <em>questions</em>',fq1:'Are the pieces authentic?',fa1:'Yes, 100%. I personally verify every piece before listing — labels, stitching, materials, hardware.',fq2:'How long does shipping take?',fa2:'Standard: 3–5 business days. Express: 1–2 days. You receive a tracking code by email as soon as the parcel ships.',fq3:'Are prices negotiable?',fa3:'No. Prices are fixed and already reduced from retail. If I run promotions, I will announce them on Instagram.',fq4:'How do I track my order?',fa4:'Use the tracking code sent by email. You can also enter it in the Tracking section of this site.',fq5:'Is payment secure?',fa5:'Yes. Payments are handled by Stripe, one of the most trusted payment systems worldwide. I accept cards, Apple Pay and Google Pay.',track_eye:'Already ordered?',track_title:'Track your <em>order</em>',track_btn:'Search',contact_eye:'Contact',contact_title:'Find me on <em>Instagram</em>',ig_follow:'follow us on',ig_cap:'First look at new arrivals, exclusive selections and DMs always open.',nav_about:'About',nav_coll:'Collection',nav_contact:'Contact',modal_why:'Why buy from Bluèlle',mw1:'Personally authenticated',mw2:'Save up to 65%',mw3:'Careful packaging, tracked shipping',mw4:'Tracked shipping, secure payment',secure_pay:'Secure payment via Stripe',buy:'Buy now',sold:'Sold',avail:'Available',see:'View',size:'Size',gw_him:'For him',gw_her:'For her',gw_enter:'Enter',gw_soon:'Coming soon',gw_pick:'Choose a world',gw_note:'The women\'s collection is coming — follow us on Instagram.',auth_eye:'Guaranteed authenticity',auth_h2:'IRIS<sup class="iris-reg">®</sup>',auth_l1:'Every piece personally verified before listing',auth_l2:'New or like-new condition, many with original tags',auth_l3:'Labels, stitching, materials — nothing overlooked',iris_tag:'Our proprietary authentication system. Every piece is verified by our experts and by the IRIS software.',iris_s1t:'Physical inspection',iris_s1p:'Our experts examine stitching, labels, materials and hardware.',iris_s2t:'IRIS analysis',iris_s2p:'The software compares the item details against our reference archive.',iris_s3t:'Certified',iris_s3p:'Only pieces that pass both checks are listed for sale.',save_eye:'Luxury that makes sense',save_h2:'Save.',save_h2e:'No compromises.',save_p:"Every piece you buy from Bluèlle saves you up to 65% compared to boutique price. The same luxury, the same quality — at a price that makes sense.",save_stat1_lbl:'off retail price',save_stat2_lbl:'authenticity verified',hero_t1:'Selected with care.',hero_t2:'At the right price.',about_story_quote:'"I have always searched for beauty with care. The sea taught me how to recognise it."',about_story:'Bluèlle is built on a trained eye for selection — the ability to tell what endures from what fades. Every piece you find here has been sought, handled and evaluated by me personally. Only authenticity. Only prices that make sense.',about_mission:'"Luxury shouldn\'t be a privilege. It should be a conscious choice."',auth_sub:'I only sell what I would wear myself.',cond_mint:'Excellent',cond_vgood:'Very good',cond_good:'Good',cond_great:'Great',cond_new:'New',price_req:'On request',box_note:' Original box included.'},
  fr:{tagline:'Luxe de Seconde Main',hero_cta:'Explorer la collection',scroll:'Défiler',about_eye:'À propos',about_title:'Seconde main.<br><em>Première classe.</em>',coll_eye:'Disponible maintenant',coll_title:'La <em>collection</em>',all:'Tous',how_eye:'Vous voulez vendre ou nous confier une pièce?',how_title:'Comment ça <em>fonctionne</em>',s01t:'Écrivez-nous',s01p:'Envoyez-nous photos et détails de la pièce sur Instagram. Réponse rapide.',s02t:'Nous évaluons',s02p:'Nous authentifions la pièce avec IRIS et fixons ensemble le juste prix.',s03t:'Nous vendons',s03p:'Nous publions la pièce et la présentons à notre communauté.',s04t:'Nous vous payons',s04p:'Une fois vendue, vous recevez votre paiement. Simple et sécurisé.',sell_cta:'Confiez votre pièce',faq_eye:'Des questions?',faq_title:'Questions <em>fréquentes</em>',fq1:'Les pièces sont-elles authentiques?',fa1:'Oui, à 100%. Je vérifie personnellement chaque pièce avant la mise en vente — étiquettes, coutures, matériaux, accessoires.',fq2:'Combien de temps prend la livraison?',fa2:'Standard: 3–5 jours ouvrables. Express: 1–2 jours. Vous recevez un code de suivi par email dès l\'envoi du colis.',fq3:'Les prix sont-ils négociables?',fa3:'Non. Les prix sont fixes et déjà réduits par rapport au retail. S\'il y a des promotions, elles seront annoncées sur Instagram.',fq4:'Comment suivre ma commande?',fa4:'Utilisez le code de suivi reçu par email. Vous pouvez également le saisir dans la section Suivi de ce site.',fq5:'Le paiement est-il sécurisé?',fa5:'Oui. Les paiements sont gérés par Stripe, l\'un des systèmes de paiement les plus fiables au monde. J\'accepte les cartes, Apple Pay et Google Pay.',track_eye:'Déjà commandé?',track_title:'Suivre votre <em>commande</em>',track_btn:'Rechercher',contact_eye:'Contact',contact_title:'Retrouvez-moi sur <em>Instagram</em>',ig_follow:'suivez-nous sur',ig_cap:'Première vue sur les nouveautés, sélections exclusives et DMs toujours ouverts.',nav_about:'À propos',nav_coll:'Collection',nav_contact:'Contact',modal_why:'Pourquoi acheter chez Bluèlle',mw1:'Authentifié personnellement',mw2:'Économie jusqu\'à 50%',mw3:'Emballage soigné, expédition suivie',mw4:'Livraison suivie, paiement sécurisé',secure_pay:'Paiement sécurisé via Stripe',buy:'Acheter',sold:'Vendu',avail:'Disponible',see:'Voir',size:'Taille',gw_him:'Pour lui',gw_her:'Pour elle',gw_enter:'Entrer',gw_soon:'Bientôt',gw_pick:'Choisissez un univers',gw_note:'La collection femme arrive — suivez-nous sur Instagram.',auth_eye:'Authenticité garantie',auth_h2:'IRIS<sup class="iris-reg">®</sup>',auth_l1:'Chaque pièce vérifiée personnellement avant la mise en vente',auth_l2:'État neuf ou comme neuf, beaucoup avec étiquette d\'origine',auth_l3:'Étiquettes, coutures, matériaux — rien n\'est négligé',iris_tag:'Notre système d\'authentification propriétaire. Chaque pièce est vérifiée par nos experts et par le logiciel IRIS.',iris_s1t:'Inspection physique',iris_s1p:'Nos experts examinent coutures, étiquettes, matériaux et accessoires.',iris_s2t:'Analyse IRIS',iris_s2p:'Le logiciel compare les détails de la pièce à notre archive de référence.',iris_s3t:'Certifié',iris_s3p:'Seules les pièces qui passent les deux contrôles sont mises en vente.',save_eye:'Le luxe qui a du sens',save_h2:'Économisez.',save_h2e:'Sans compromis.',save_p:"Chaque pièce achetée chez Bluèlle vous fait économiser jusqu'à 50% par rapport au prix en boutique. Le même luxe, la même qualité — à un prix qui a du sens.",save_stat1_lbl:'sur le prix retail',save_stat2_lbl:'authenticité vérifiée',hero_t1:'Sélectionnés avec soin.',hero_t2:'Au juste prix.',about_story_quote:'"J\'ai toujours cherché le beau avec soin. La mer m\'a appris à le reconnaître."',about_story:'Bluèlle est née d\'un œil exercé à la sélection — la capacité de distinguer ce qui dure de ce qui passe. Chaque pièce que vous trouvez ici a été recherchée, touchée et évaluée personnellement. Uniquement de l\'authenticité. Des prix qui ont du sens.',about_mission:'"Le luxe ne devrait pas être un privilège. Il devrait être un choix conscient."',auth_sub:'Je ne vends que ce que je porterais moi-même.',cond_mint:'Excellent',cond_vgood:'Très bon',cond_good:'Bon',cond_great:'Excellent',cond_new:'Neuf',price_req:'Sur demande',box_note:' Boîte originale incluse.'},
  es:{tagline:'Lujo de Segunda Mano',hero_cta:'Explorar la colección',scroll:'Desplazar',about_eye:'Quiénes somos',about_title:'Segunda mano.<br><em>Primera clase.</em>',coll_eye:'Disponible ahora',coll_title:'La <em>colección</em>',all:'Todos',how_eye:'¿Quieres vender o confiarnos una prenda?',how_title:'Cómo <em>funciona</em>',s01t:'Escríbenos',s01p:'Envíanos fotos y detalles de la prenda por Instagram. Respondemos enseguida.',s02t:'Valoramos',s02p:'Autenticamos la prenda con IRIS y fijamos juntos el precio justo.',s03t:'Vendemos',s03p:'Publicamos la prenda y la presentamos a nuestra comunidad.',s04t:'Te pagamos',s04p:'Una vez vendida, recibes tu pago. Simple y seguro.',sell_cta:'Confía tu prenda',faq_eye:'¿Tienes preguntas?',faq_title:'Preguntas <em>frecuentes</em>',fq1:'¿Las prendas son originales?',fa1:'Sí, al 100%. Verifico personalmente cada prenda antes de publicarla — etiquetas, costuras, materiales, accesorios.',fq2:'¿Cuánto tarda el envío?',fa2:'Estándar: 3–5 días laborables. Express: 1–2 días. Recibes un código de seguimiento por email en cuanto se envía el paquete.',fq3:'¿Los precios son negociables?',fa3:'No. Los precios son fijos y ya están reducidos respecto al retail. Si hay promociones, las anunciaré en Instagram.',fq4:'¿Cómo hago el seguimiento de mi pedido?',fa4:'Usa el código de seguimiento recibido por email. También puedes introducirlo en la sección de Seguimiento de este sitio.',fq5:'¿Es seguro el pago?',fa5:'Sí. Los pagos son gestionados por Stripe, uno de los sistemas de pago más fiables del mundo. Acepto tarjetas, Apple Pay y Google Pay.',track_eye:'¿Ya has pedido?',track_title:'Rastrear tu <em>pedido</em>',track_btn:'Buscar',contact_eye:'Contacto',contact_title:'Encuéntrame en <em>Instagram</em>',ig_follow:'síguenos en',ig_cap:'Primeras vistas de nuevas llegadas, selecciones exclusivas y DMs siempre abiertos.',nav_about:'Quiénes somos',nav_coll:'Colección',nav_contact:'Contacto',modal_why:'Por qué comprar en Bluèlle',mw1:'Autenticado personalmente',mw2:'Ahorra hasta un 50%',mw3:'Embalaje cuidadoso, envío con seguimiento',mw4:'Envío con seguimiento, pago seguro',secure_pay:'Pago seguro vía Stripe',buy:'Comprar',sold:'Vendido',avail:'Disponible',see:'Ver',size:'Talla',gw_him:'Para él',gw_her:'Para ella',gw_enter:'Entrar',gw_soon:'Próximamente',gw_pick:'Elige un mundo',gw_note:'La colección de mujer está llegando — síguenos en Instagram.',auth_eye:'Autenticidad garantizada',auth_h2:'IRIS<sup class="iris-reg">®</sup>',auth_l1:'Cada prenda verificada personalmente antes de publicarse',auth_l2:'Estado nuevo o como nuevo, muchas con etiqueta original',auth_l3:'Etiquetas, costuras, materiales — nada se pasa por alto',iris_tag:'Nuestro sistema de autenticación propietario. Cada prenda es verificada por nuestros expertos y por el software IRIS.',iris_s1t:'Inspección física',iris_s1p:'Nuestros expertos examinan costuras, etiquetas, materiales y accesorios.',iris_s2t:'Análisis IRIS',iris_s2p:'El software compara los detalles de la prenda con nuestro archivo de referencia.',iris_s3t:'Certificado',iris_s3p:'Solo las prendas que superan ambos controles se ponen a la venta.',save_eye:'El lujo que merece la pena',save_h2:'Ahorra.',save_h2e:'Sin renuncias.',save_p:"Cada prenda que compras en Bluèlle te hace ahorrar hasta un 50% respecto al precio en boutique. El mismo lujo, la misma calidad — a un precio con sentido.",save_stat1_lbl:'sobre el precio retail',save_stat2_lbl:'autenticidad verificada',hero_t1:'Seleccionados con cuidado.',hero_t2:'Al precio justo.',about_story_quote:'"Siempre he buscado la belleza con cuidado. El mar me enseñó a reconocerla."',about_story:'Bluèlle nace de un ojo entrenado en la selección — la capacidad de distinguir lo que dura de lo que pasa. Cada prenda que encuentras aquí ha sido buscada, tocada y evaluada por mí. Solo autenticidad. Solo precios con sentido.',about_mission:'"El lujo no debería ser un privilegio. Debería ser una elección consciente."',auth_sub:'Solo vendo lo que yo mismo llevaría.',cond_mint:'Excelente',cond_vgood:'Muy bueno',cond_good:'Bueno',cond_great:'Excelente',cond_new:'Nuevo',price_req:'A consultar',box_note:' Caja original incluida.'},
  de:{tagline:'Luxury Second Hand',hero_cta:'Die Kollektion entdecken',scroll:'Scrollen',about_eye:'Über uns',about_title:'Second hand.<br><em>First class.</em>',coll_eye:'Jetzt verfügbar',coll_title:'Die <em>Kollektion</em>',all:'Alle',how_eye:'Möchtest du ein Stück verkaufen oder uns anvertrauen?',how_title:'So <em>funktioniert es</em>',s01t:'Schreib uns',s01p:'Schick uns Fotos und Details des Stücks auf Instagram. Wir antworten schnell.',s02t:'Wir bewerten',s02p:'Wir authentifizieren das Stück mit IRIS und legen gemeinsam den Preis fest.',s03t:'Wir verkaufen',s03p:'Wir präsentieren das Stück unserer Community.',s04t:'Wir zahlen dich aus',s04p:'Nach dem Verkauf erhältst du deine Zahlung. Einfach und sicher.',sell_cta:'Vertrau uns dein Stück an',faq_eye:'Noch Fragen?',faq_title:'Häufige <em>Fragen</em>',fq1:'Sind die Stücke original?',fa1:'Ja, zu 100%. Ich prüfe jedes Stück persönlich vor dem Verkauf — Etiketten, Nähte, Materialien, Beschläge.',fq2:'Wie lange dauert der Versand?',fa2:'Standard: 3–5 Werktage. Express: 1–2 Tage. Die Sendungsnummer kommt per E-Mail, sobald das Paket unterwegs ist.',fq3:'Sind die Preise verhandelbar?',fa3:'Nein. Die Preise sind fix und bereits unter dem Listenpreis. Aktionen kündige ich auf Instagram an.',fq4:'Wie verfolge ich meine Bestellung?',fa4:'Nutze die per E-Mail erhaltene Sendungsnummer. Du kannst sie auch im Tracking-Bereich dieser Seite eingeben.',fq5:'Ist die Zahlung sicher?',fa5:'Ja. Die Zahlungen laufen über Stripe, eines der zuverlässigsten Zahlungssysteme weltweit. Ich akzeptiere Karten, Apple Pay und Google Pay.',track_eye:'Schon bestellt?',track_title:'Verfolge deine <em>Bestellung</em>',track_btn:'Suchen',contact_eye:'Schreib uns',contact_title:'Schreib mir auf <em>Instagram</em>',ig_follow:'folge uns auf',ig_cap:'Neuheiten in der Vorschau, exklusive Auswahl und DMs immer offen.',nav_about:'Über uns',nav_coll:'Kollektion',nav_contact:'Kontakt',modal_why:'Warum bei Bluèlle kaufen',mw1:'Persönlich authentifiziert',mw2:'Bis zu 50% sparen',mw3:'Sorgfältige Verpackung, verfolgter Versand',mw4:'Verfolgter Versand, sichere Zahlung',secure_pay:'Sichere Zahlung über Stripe',buy:'Kaufen',sold:'Verkauft',avail:'Verfügbar',see:'Ansehen',size:'Größe',gw_him:'Für ihn',gw_her:'Für sie',gw_enter:'Eintreten',gw_soon:'Demnächst',gw_pick:'Wähle eine Welt',gw_note:'Die Damenkollektion kommt bald — folge uns auf Instagram.',auth_eye:'Echtheit garantiert',auth_h2:'IRIS<sup class="iris-reg">®</sup>',auth_l1:'Jedes Stück vor dem Verkauf persönlich geprüft',auth_l2:'Neu oder neuwertig, viele mit Originaletikett',auth_l3:'Etiketten, Nähte, Materialien — nichts wird übersehen',iris_tag:'Unser proprietäres Authentifizierungssystem. Jedes Stück wird von unseren Experten und der IRIS-Software geprüft.',iris_s1t:'Physische Prüfung',iris_s1p:'Unsere Experten prüfen Nähte, Etiketten, Materialien und Beschläge.',iris_s2t:'IRIS-Analyse',iris_s2p:'Die Software vergleicht die Details des Stücks mit unserem Referenzarchiv.',iris_s3t:'Zertifiziert',iris_s3p:'Nur Stücke, die beide Prüfungen bestehen, werden zum Verkauf angeboten.',save_eye:'Luxus, der sich lohnt',save_h2:'Sparen.',save_h2e:'Ohne Kompromisse.',save_p:'Jedes Stück bei Bluèlle spart dir bis zu 50% gegenüber dem Boutiquepreis. Derselbe Luxus, dieselbe Qualität — zu einem Preis, der Sinn ergibt.',save_stat1_lbl:'gegenüber dem Verkaufspreis',save_stat2_lbl:'Echtheit geprüft',hero_t1:'Mit Sorgfalt ausgewählt.',hero_t2:'Zum richtigen Preis.',about_story_quote:'"Ich habe Schönheit immer mit Sorgfalt gesucht. Das Meer hat mich gelehrt, sie zu erkennen."',about_story:'Bluèlle entsteht aus einem geschulten Auge für Auswahl — der Fähigkeit zu erkennen, was bleibt und was vergeht. Jedes Stück hier wurde von mir persönlich gesucht, geprüft und bewertet. Nur Echtheit. Nur Preise, die Sinn ergeben.',about_mission:'"Luxus sollte kein Privileg sein. Er sollte eine bewusste Entscheidung sein."',auth_sub:'Ich verkaufe nur, was ich selbst tragen würde.',cond_mint:'Ausgezeichnet',cond_vgood:'Sehr gut',cond_good:'Gut',cond_great:'Top',cond_new:'Neu',price_req:'Auf Anfrage',box_note:' Originalkarton inklusive.'}
};
// CHECKOUT TRANSLATIONS
const CK={
  it:{ck_eye:'Completa l\'acquisto',ck_title:'I tuoi <em style="color:var(--brass)">dati</em>',ck_name:'Nome',ck_surname:'Cognome',ck_phone:'Telefono',ck_address:'Indirizzo',ck_city:'Città',ck_province:'Provincia',ck_country:'Paese',ck_ship_zone:'Zona spedizione',ck_zone_it:'Italia — €10',ck_zone_eu:'Europa — €15',ck_zone_world:'Estero — €25',ck_ship:'Spedizione',ck_total:'Totale',ck_pay:'Procedi al pagamento',ck_secure:'Pagamento sicuro via Stripe',ck_err:'Compila tutti i campi obbligatori',ck_err_email:'Inserisci un\'email valida',ck_addr_ph:'Via, numero civico'},
  en:{ck_eye:'Complete your purchase',ck_title:'Your <em style="color:var(--brass)">details</em>',ck_name:'First name',ck_surname:'Last name',ck_phone:'Phone',ck_address:'Address',ck_city:'City',ck_province:'State / Province',ck_country:'Country',ck_ship_zone:'Shipping zone',ck_zone_it:'Italy — €10',ck_zone_eu:'Europe — €15',ck_zone_world:'International — €25',ck_ship:'Shipping',ck_total:'Total',ck_pay:'Proceed to payment',ck_secure:'Secure payment via Stripe',ck_err:'Please fill in all required fields',ck_err_email:'Please enter a valid email',ck_addr_ph:'Street, house number'},
  fr:{ck_eye:'Finalisez votre achat',ck_title:'Vos <em style="color:var(--brass)">coordonnées</em>',ck_name:'Prénom',ck_surname:'Nom',ck_phone:'Téléphone',ck_address:'Adresse',ck_city:'Ville',ck_province:'Région',ck_country:'Pays',ck_ship_zone:'Zone de livraison',ck_zone_it:'Italie — €10',ck_zone_eu:'Europe — €15',ck_zone_world:'International — €25',ck_ship:'Livraison',ck_total:'Total',ck_pay:'Procéder au paiement',ck_secure:'Paiement sécurisé via Stripe',ck_err:'Veuillez remplir tous les champs obligatoires',ck_err_email:'Veuillez entrer un email valide',ck_addr_ph:'Rue, numéro'},
  es:{ck_eye:'Completa tu compra',ck_title:'Tus <em style="color:var(--brass)">datos</em>',ck_name:'Nombre',ck_surname:'Apellido',ck_phone:'Teléfono',ck_address:'Dirección',ck_city:'Ciudad',ck_province:'Provincia',ck_country:'País',ck_ship_zone:'Zona de envío',ck_zone_it:'Italia — €10',ck_zone_eu:'Europa — €15',ck_zone_world:'Internacional — €25',ck_ship:'Envío',ck_total:'Total',ck_pay:'Proceder al pago',ck_secure:'Pago seguro vía Stripe',ck_err:'Por favor completa todos los campos obligatorios',ck_err_email:'Por favor introduce un email válido',ck_addr_ph:'Calle, número'},
  de:{ck_eye:'Kauf abschließen',ck_title:'Deine <em style="color:var(--brass)">Daten</em>',ck_name:'Vorname',ck_surname:'Nachname',ck_phone:'Telefon',ck_address:'Adresse',ck_city:'Stadt',ck_province:'Region',ck_country:'Land',ck_ship_zone:'Versandzone',ck_zone_it:'Italien — €10',ck_zone_eu:'Europa — €15',ck_zone_world:'International — €25',ck_ship:'Versand',ck_total:'Gesamt',ck_pay:'Zur Zahlung',ck_secure:'Sichere Zahlung über Stripe',ck_err:'Bitte alle Pflichtfelder ausfüllen',ck_err_email:'Bitte eine gültige E-Mail eingeben',ck_addr_ph:'Straße, Hausnummer'}
};
// PRODUCTS
const prods = [
  {id:1,brand:'gucci',name:'Gucci Maglioncino GG V-Neck',sz:'S',fit:'Veste normale',color:'blu',cond:'Eccellente',price:385.0,orig:1100.0,sold:false,images:["img/p1-f1.jpg","img/p1-f2.jpg","img/p1-f3.jpg"],desc:'Maglioncino Gucci blu con scollo a V e monogramma GG intarsiato in filato oro. Una delle silhouette più eleganti della maison.',stripe:'https://buy.stripe.com/14AaEXcnE97ecaR4M13ks2l'},
  {id:2,brand:'balenciaga',name:'Balenciaga Unity Logo Tee',sz:'M',fit:'Oversize',color:'panna',cond:'Eccellente',price:240.0,orig:670.0,sold:false,images:["img/p2-f1.jpg","img/p2-f2.jpg","img/p2-f3.jpg"],desc:'T-shirt Balenciaga color panna in cotone pesante con logo Unity stampato sul fronte. Fit oversize, presenza immediata.',stripe:'https://buy.stripe.com/bJe14n0EW3MU1wd7Yd3ks2m'},
  {id:3,brand:'balenciaga',name:'Balenciaga Upside-Down T-Shirt',sz:'M',fit:'Oversize',color:'nera',cond:'Nuovo',price:270.0,orig:700.0,sold:false,images:["img/p3-f1.jpg","img/p3-f2.jpg","img/p3-f3.jpg","img/p3-f4.jpg"],desc:'T-shirt Balenciaga nera Speed Hunter con logo Upside Down. Vestibilità oversize con effetto distressed — trattamento autentico della collezione.',stripe:'https://buy.stripe.com/fZu28revM83aa2J7Yd3ks2n'},
  {id:4,brand:'balenciaga',name:'Balenciaga Crypto Bb',sz:'S',fit:'Oversize',color:'nera',cond:'Eccellente',price:300.0,orig:0,sold:false,images:["img/p4-f1.jpg","img/p4-f2.jpg","img/p4-f3.jpg"],desc:'T-shirt Balenciaga Crypto BB nera in vestibilità oversize. Effetto distressed e dettagli volutamente invecchiati, tipici della capsule.',stripe:'https://buy.stripe.com/6oUaEX4Vc2IQ6Qxdix3ks2o'},
  {id:5,brand:'balenciaga',name:'Balenciaga Ebay',sz:'M',fit:'Oversize',color:'nera',cond:'Eccellente',price:260.0,orig:0,sold:false,images:["img/p5-f1.jpg","img/p5-f2.jpg","img/p5-f3.jpg","img/p5-f4.jpg"],desc:'T-shirt della collaborazione ufficiale Balenciaga x eBay, nera in vestibilità extra oversize. Pezzo da collezione.',stripe:'https://buy.stripe.com/9B6aEXfzQ1EM2Ah4M13ks2p'},
  {id:6,brand:'gucci',name:'Gucci Maglione Lungo GG V Neck',sz:'M',fit:'Veste normale',color:'rosso',cond:'Eccellente',price:325.0,orig:1200.0,sold:false,images:["img/p6-f1.jpg","img/p6-f2.jpg","img/p6-f3.jpg"],desc:'Maglione Gucci con scollo a V rosso lungo, con motivo GG su tutta la superficie. Lunghezza sotto vita, impatto visivo forte.',stripe:'https://buy.stripe.com/cNi7sL5Zg6Z6eiZ7Yd3ks2q'},
  {id:7,brand:'gucci',name:'Gucci Cardigan Purple',sz:'S',fit:'Veste normale',color:'viola',cond:'Nuovo',price:675.0,orig:1800.0,sold:false,images:["img/p7-f1.jpg","img/p7-f2.jpg","img/p7-f3.jpg","img/p7-f4.jpg","img/p7-f5.jpg"],desc:'Cardigan Gucci in lana viola, morbidissimo al tatto. Nuovo con cartellino originale — mai indossato.',stripe:'https://buy.stripe.com/28EeVdbjAabia2Ja6l3ks2r'},
  {id:8,brand:'gucci',name:'Gucci Felpa Senza Cappuccio',sz:'XL',fit:'Veste normale',color:'arancione',cond:'Eccellente',price:250.0,orig:0,sold:true,images:["img/p8-f1.jpg","img/p8-f2.jpg","img/p8-f3.jpg"],desc:'Felpa Gucci girocollo arancione con stampa palme. Colore vivace, vestibilità regolare. Condizioni eccellenti.',stripe:'https://buy.stripe.com/eVqfZh87obfm5Mtbap3ks2s'},
  {id:9,brand:'gucci',name:'Gucci Cardigan',sz:'S',fit:'Veste normale',color:'blu',cond:'Eccellente',price:495.0,orig:1200.0,sold:false,images:["img/p9-f1.jpg","img/p9-f2.jpg","img/p9-f3.jpg"],desc:'Cardigan Gucci con motivo GG in blu notte e filato oro intarsiato. Un classico raffinato. Condizioni eccellenti.',stripe:'https://buy.stripe.com/bJefZh4Vc4QYdeVfqF3ks2t'},
  {id:10,brand:'gucci',name:'Gucci T-Shirt',sz:'L',fit:'piccola vestibilita',color:'bianco',cond:'Eccellente',price:220.0,orig:0,sold:true,images:["img/p10-f1.jpg"],desc:'T-shirt della rarissima collaborazione Gucci x Palace. Pezzo molto ricercato dai collezionisti.',stripe:'https://buy.stripe.com/fZu7sLafw3MU0s90vL3ks2u'},
  {id:11,brand:'balenciaga',name:'Balenciaga Felpa Upside Down',sz:'M',fit:'Oversize',color:'bianco',cond:'Eccellente',price:315.0,orig:1100.0,sold:false,images:["img/p11-f1.jpg","img/p11-f2.jpg","img/p11-f3.jpg","img/p11-f4.jpg"],desc:'Felpa Balenciaga Upside Down con logo capovolto ed effetto distressed autentico. Vestibilità oversize.',stripe:'https://buy.stripe.com/6oU8wP2N4erydeV1zP3ks2v'},
  {id:12,brand:'gucci',name:'Gucci California T-Shirt',sz:'S',fit:'Veste normale',color:'bianco',cond:'Eccellente',price:140.0,orig:500.0,sold:false,images:["img/p12-f1.jpg","img/p12-f2.jpg","img/p12-f3.jpg"],desc:'T-shirt Gucci bianca con scritta Welcome to California. Fresca e immediata, perfetta per la stagione calda.',stripe:'https://buy.stripe.com/7sY14nevMgzG3Elbap3ks2w'},
  {id:13,brand:'balenciaga',name:'Balenciaga Cropped Felpa Sample Mai Rilasciata',sz:'M',fit:'Oversize',color:'nera',cond:'Eccellente',price:1000.0,orig:0,sold:false,images:["img/p13-f1.jpg","img/p13-f2.jpg","img/p13-f3.jpg"],desc:'Hoodie crop Balenciaga da campionario interno, mai messa in commercio. Pezzo non acquistabile in nessuna boutique al mondo.',stripe:'https://buy.stripe.com/3cIaEX0EW6Z6gr7fqF3ks2x'},
  {id:14,brand:'gucci',name:'Gucci T-Shirt',sz:'S',fit:'Veste normale',color:'giallo',cond:'Eccellente',price:295.0,orig:800.0,sold:false,images:["img/p14-f1.jpg","img/p14-f2.jpg","img/p14-f3.jpg"],desc:'T-shirt Gucci gialla da donna in cotone strutturato. Vestibilità regolare. Condizioni eccellenti.',stripe:'https://buy.stripe.com/bJecN5drI6Z66QxfqF3ks2y'},
  {id:15,brand:'balenciaga',name:'Balenciaga Cropped Unity Logo',sz:'XL',fit:'Cropped',color:'nera',cond:'Eccellente',price:330.0,orig:700.0,sold:false,images:["img/p15-f1.jpg","img/p15-f2.jpg","img/p15-f3.jpg","img/p15-f4.jpg"],desc:'T-shirt crop Balenciaga nera con logo Unity. Taglia XL in taglio corto — ideale abbinata a vita alta.',stripe:'https://buy.stripe.com/4gM6oHevMcjqdeVcet3ks2z'},
  {id:16,brand:'gucci',name:'Gucci Cardigan Cotone',sz:'L',fit:'Veste normale',color:'bianco',cond:'Eccellente',price:390.0,orig:1100.0,sold:false,images:["img/p16-f1.jpg","img/p16-f2.jpg","img/p16-f3.jpg"],desc:'Cardigan Gucci in cotone bianco con motivo monogramma GG su tutta la superficie. Vestibilità regolare. Condizioni eccellenti.',stripe:'https://buy.stripe.com/dRm00jbjA83a5Mt1zP3ks2A'},
  {id:17,brand:'balenciaga',name:'Balenciaga Tape T-Shirt',sz:'XXL',fit:'Oversize',color:'bianco',cond:'Eccellente',price:340.0,orig:800.0,sold:false,images:["img/p17-f1.jpg","img/p17-f2.jpg","img/p17-f3.jpg"],desc:'T-shirt Balenciaga con nastro tape applicato in diagonale ed effetto distressed. Vestibilità oversize. Condizioni eccellenti.',stripe:'https://buy.stripe.com/00wcN55Zgbfmb6NfqF3ks2B'},
  {id:18,brand:'gucci',name:'Gucci Maglione Lana',sz:'XL',fit:'Veste normale',color:'nera',cond:'Eccellente',price:310.0,orig:0,sold:true,images:["img/p18-f1.jpg"],desc:'Maglione Gucci in lana nera con scollo tondo. Condizioni eccellenti.',stripe:'https://buy.stripe.com/cNi14n87ofvC8YF2DT3ks2C'},
  {id:19,brand:'enfants',name:'Enfants Riches Déprimés Godless T-Shirt',sz:'L',fit:'Veste normale',color:'bianco',cond:'Eccellente',price:1700.0,orig:0,sold:false,images:["img/p19-f1.jpg","img/p19-f2.jpg","img/p19-f3.jpg","img/p19-f4.jpg","img/p19-f5.jpg","img/p19-f6.jpg","img/p19-f7.jpg"],desc:'T-shirt rarissima di Enfants Riches Déprimés con effetto distressed. Edizione limitatissima — pezzo da collezione per intenditori.',stripe:'https://buy.stripe.com/14A00jbjA0AIfn34M13ks2D'},
  {id:20,brand:'enfants',name:'Enfants Riches Déprimés Devil In Disguise',sz:'L',fit:'Veste normale',color:'bianco',cond:'Eccellente',price:500.0,orig:900.0,sold:false,images:["img/p20-f1.jpg","img/p20-f2.jpg","img/p20-f3.jpg"],desc:'T-shirt Devil In Disguise di Enfants Riches Déprimés. Grafica provocatoria sul fronte, brand underground del lusso.',stripe:'https://buy.stripe.com/7sYcN573k5V21wd7Yd3ks2E'},
  {id:21,brand:'balenciaga',name:'Balenciaga Metal Logo T-Shirt',sz:'XXS',fit:'Oversize',color:'nera',cond:'Eccellente',price:200.0,orig:700.0,sold:false,images:["img/p21-f1.jpg","img/p21-f2.jpg","img/p21-f3.jpg"],desc:'T-shirt Balenciaga nera con logo metallizzato fronte e retro. Vestibilità super oversize. Condizioni eccellenti.',stripe:'https://buy.stripe.com/28EdR90EWeryb6N4M13ks2F'},
  {id:22,brand:'gucci',name:'Gucci Floral T-Shirt',sz:'L',fit:'Veste normale',color:'nera',cond:'Eccellente',price:275.0,orig:800.0,sold:false,images:["img/p22-f1.jpg","img/p22-f2.jpg"],desc:'T-shirt Gucci con ricamo floreale cucito a mano. Pezzo raro, difficile da trovare. Condizioni eccellenti.',stripe:'https://buy.stripe.com/6oU5kDafwcjq7UBfqF3ks2G'},
  {id:23,brand:'gucci',name:'Gucci Polo Monogram',sz:'M',fit:'Veste normale',color:'blu',cond:'Eccellente',price:340.0,orig:0,sold:true,images:["img/p23-f1.jpg"],desc:'Polo Gucci in cotone blu con motivo monogramma GG. Condizioni eccellenti.',stripe:'https://buy.stripe.com/aFa00jcnEcjqgr71zP3ks2H'},
  {id:24,brand:'gucci',name:'Gucci Football T-Shirt Oversize',sz:'XS',fit:'Oversize',color:'bianco',cond:'Eccellente',price:160.0,orig:450.0,sold:false,images:["img/p24-f1.jpg","img/p24-f2.jpg","img/p24-f3.jpg"],desc:'T-shirt Gucci Football oversize con grafica sportiva sul fronte. Vestibilità ampia. Condizioni eccellenti.',stripe:'https://buy.stripe.com/cNifZh4Vcabia2J3HX3ks2I'},
  {id:25,brand:'balenciaga',name:'Balenciaga Sporty B Logo',sz:'XS',fit:'Oversize',color:'blu',cond:'Eccellente',price:140.0,orig:450.0,sold:false,images:["img/p25-f1.jpg","img/p25-f2.jpg","img/p25-f3.jpg","img/p25-f4.jpg"],desc:'T-shirt Balenciaga Sporty B blu oversize. Veste come una M/L — comoda anche per chi taglia una M.',stripe:'https://buy.stripe.com/28EeVd2N497egr77Yd3ks2J'},
  {id:26,brand:'gucci',name:'Gucci Maglione Con Monogram',sz:'M',fit:'Veste normale',color:'nera',cond:'Eccellente',price:380.0,orig:1100.0,sold:false,images:["img/p26-f1.jpg","img/p26-f2.jpg","img/p26-f3.jpg"],desc:'Maglione Gucci nero con monogramma GG, un iconico classico della maison. Condizioni eccellenti.',stripe:'https://buy.stripe.com/aFaeVd4Vc6Z60s9bap3ks2K'},
  {id:27,brand:'balenciaga',name:'Balenciaga See Now Buy Now T-Shirt',sz:'M',fit:'piccola vestibilita',color:'blu',cond:'Eccellente',price:165.0,orig:600.0,sold:false,images:["img/p27-f1.jpg","img/p27-f2.jpg","img/p27-f3.jpg"],desc:'T-shirt Balenciaga See Now Buy Now slim fit con effetto distressed. Pezzo storico della campagna SS17.',stripe:'https://buy.stripe.com/bJe8wP4Vcdnu7UB3HX3ks2L'},
  {id:28,brand:'gucci',name:'Gucci Marilyn Monroe',sz:'XS',fit:'Oversize',color:'azzurro',cond:'Eccellente',price:170.0,orig:450.0,sold:false,images:["img/p28-f1.jpg","img/p28-f2.jpg","img/p28-f3.jpg"],desc:'T-shirt Gucci Marilyn Monroe oversize — veste come una M/L. Grafica iconica della stagione.',stripe:'https://buy.stripe.com/3cI6oH2N46Z6a2Jbap3ks2M'},
  {id:29,brand:'gucci',name:'Gucci Maglione Lana',sz:'M',fit:'Oversize',color:'blu',cond:'Eccellente',price:395.0,orig:1200.0,sold:false,images:["img/p29-f1.jpg","img/p29-f2.jpg","img/p29-f3.jpg"],desc:'Maglione Gucci in lana blu con monogramma GG classico. Caldo e raffinato per la stagione fredda.',stripe:'https://buy.stripe.com/aFa28r9bsbfm7UBbap3ks2N'},
  {id:30,brand:'gucci',name:'Gucci Football T-Shirt Oversize',sz:'M',fit:'Oversize',color:'verde',cond:'Eccellente',price:230.0,orig:0,sold:true,images:["img/p30-f1.jpg"],desc:'T-shirt Gucci Football oversize verde. Grafica sportiva sul fronte. Condizioni eccellenti.',stripe:'https://buy.stripe.com/7sYcN52N4gzG0s92DT3ks2O'},
  {id:31,brand:'balenciaga',name:'Balenciaga Diy College T-Shirt',sz:'S',fit:'Oversize',color:'bianco',cond:'Nuovo',price:240.0,orig:595.0,sold:false,images:["img/p31-f1.jpg","img/p31-f2.jpg","img/p31-f3.jpg"],desc:'T-shirt Balenciaga DIY College oversize — veste come una L/XL. Nuova con cartellino originale.',stripe:'https://buy.stripe.com/dRm00jbjA1EM0s9bap3ks2P'},
  {id:32,brand:'balenciaga',name:'Balenciaga Destroyed Hoodie',sz:'S',fit:'Oversize',color:'viola',cond:'Eccellente',price:340.0,orig:990.0,sold:false,images:["img/p32-f1.jpg","img/p32-f2.jpg","img/p32-f3.jpg"],desc:'Hoodie Balenciaga Destroyed con effetto destroyed autentico applicato in fabbrica. Veste come una XL/XXL.',stripe:'https://buy.stripe.com/7sYeVd0EW6Z62Ahcet3ks2Q'},
  {id:33,brand:'gucci',name:'Gucci Football T-Shirt Oversize',sz:'M',fit:'Oversize',color:'bianco',cond:'Eccellente',price:150.0,orig:450.0,sold:false,images:["img/p33-f1.jpg","img/p33-f2.jpg","img/p33-f3.jpg"],desc:'T-shirt Gucci Football oversize bianca. Vestibilità generosa. Condizioni eccellenti.',stripe:'https://buy.stripe.com/7sY3cvgDU1EMb6NfqF3ks2R'},
  {id:34,brand:'gucci',name:'Gucci T-Shirt Paiette',sz:'S',fit:'Veste normale',color:'nera',cond:'Eccellente',price:180.0,orig:700.0,sold:false,images:["img/p34-f1.jpg","img/p34-f2.jpg","img/p34-f3.jpg"],desc:'T-shirt Gucci nera con paillettes cucite fronte e retro e scritta Gucci in paillettes sul retro. Per un look serale di carattere.',stripe:'https://buy.stripe.com/7sY00j9bsery1wdguJ3ks2S'},
  {id:35,brand:'balenciaga',name:'Balenciaga Sporty B Logo Windbreaker',sz:'S',fit:'Oversize',color:'panna',cond:'Eccellente',price:450.0,orig:1400.0,sold:false,images:["img/p35-f1.jpg","img/p35-f2.jpg","img/p35-f3.jpg"],desc:'Windbreaker Balenciaga Sporty B color panna con logo ricamato. Veste come una L/XL.',stripe:'https://buy.stripe.com/9B6aEXbjA3MU1wdfqF3ks2T'},
  {id:36,brand:'gucci',name:'Gucci Monogram Gucci',sz:'S',fit:'Veste normale',color:'blu',cond:'Eccellente',price:270.0,orig:0,sold:true,images:["img/p36-f1.jpg"],desc:'T-shirt Gucci monogramma blu. Condizioni eccellenti.',stripe:'https://buy.stripe.com/cNibJ187ogzGa2Jbap3ks2U'},
  {id:38,brand:'balenciaga',name:'Balenciaga Diy College Hoodie',sz:'M',fit:'Oversize',color:'bianco',cond:'Eccellente',price:230.0,orig:700.0,sold:false,images:["img/p37-f1.jpg","img/p37-f2.jpg","img/p37-f3.jpg"],desc:'Felpa Balenciaga DIY College con cappuccio ed effetto distressed autentico. Veste come una L.',stripe:'https://buy.stripe.com/eVqbJ13R8ery1wd5Q53ks2V'},
  {id:39,brand:'balenciaga',name:'Balenciaga Worldwide Retail Therapy',sz:'S',fit:'Veste normale',color:'beige',cond:'Nuovo',price:120.0,orig:500.0,sold:false,images:["img/p38-f1.jpg","img/p38-f2.jpg"],desc:'T-shirt Balenciaga Worldwide Retail Therapy unisex, versatile e pulita. Nuova con cartellino originale.',stripe:'https://buy.stripe.com/aFa7sLbjA6Z6gr7a6l3ks2W'},
  {id:40,brand:'balenciaga',name:'Balenciaga Logo T-Shirt',sz:'S',fit:'Oversize',color:'marrone',cond:'Eccellente',price:180.0,orig:700.0,sold:false,images:["img/p39-f1.jpg","img/p39-f2.jpg","img/p39-f3.jpg"],desc:'T-shirt Balenciaga Logo marrone oversize — veste come una L. Condizioni eccellenti.',stripe:'https://buy.stripe.com/eVq5kDafw1EMfn32DT3ks2X'},
  {id:41,brand:'balenciaga',name:'Balenciaga x Adidas Felpa',sz:'M',fit:'Oversize',color:'blu',cond:'Nuovo',price:320.0,orig:900.0,sold:false,images:["img/p40-f1.jpg","img/p40-f2.jpg","img/p40-f3.jpg","img/p40-f4.jpg"],desc:'Felpa Balenciaga x Adidas oversize — veste come una L. Collaborazione ufficiale con logo co-branded. Nuova con cartellino.',stripe:'https://buy.stripe.com/fZu28r87o6Z65Mtbap3ks2Y'},
  {id:42,brand:'gucci',name:'Gucci Polo Blu Monogram',sz:'S',fit:'Veste normale',color:'blu',cond:'Eccellente',price:260.0,orig:800.0,sold:false,images:["img/p41-f1.jpg","img/p41-f2.jpg","img/p41-f3.jpg","img/p41-f4.jpg"],desc:'Polo Gucci Monogram iconica in blu navy. Un classico riconoscibile della maison. Condizioni eccellenti.',stripe:'https://buy.stripe.com/eVq28rfzQfvC0s90vL3ks2Z'},
  {id:43,brand:'balenciaga',name:'Balenciaga Jeans Balenciaga Con Scritta',sz:'S',fit:'Oversize',color:'blu',cond:'Nuovo',price:650.0,orig:1300.0,sold:false,images:["img/p42-f1.jpg","img/p42-f2.jpg","img/p42-f3.jpg","img/p42-f4.jpg"],desc:'Jeans Balenciaga oversize con lavaggio e scritta Balenciaga stampata sulla gamba. Nuovi con cartellino originale.',stripe:'https://buy.stripe.com/3cI6oH1J02IQeiZbap3ks30'},
  {id:44,brand:'balenciaga',name:'Balenciaga Pantaloni Tuta Xl Xl Xl….',sz:'L',fit:'Oversize',color:'nera',cond:'Buono',price:270.0,orig:800.0,sold:false,images:["img/p43-f1.jpg","img/p43-f2.jpg","img/p43-f3.jpg","img/p43-f4.jpg"],desc:'Pantaloni tuta Balenciaga maxi oversize — vestono come una XL. Condizioni buone: etichetta lavaggio leggermente staccata.',stripe:'https://buy.stripe.com/00wbJ1drIbfma2J3HX3ks31'},
  {id:47,brand:'balenciaga',name:'Balenciaga Pantaloni Tuta Mai Rilasciati 1 Di 1',sz:'L',fit:'Oversize',color:'',cond:'Eccellente',price:600.0,orig:0,sold:false,images:["img/p44-f1.jpg","img/p44-f2.jpg","img/p44-f3.jpg"],desc:'Pantaloni tuta Balenciaga da campionario, mai rilasciati al pubblico. Vestibilità super oversize. Pezzo unico — 1 di 1.',stripe:'https://buy.stripe.com/8x2aEX9bsbfm1wd1zP3ks32'}
];

// STATE
let curLang='it', curCurr='EUR', curFilter='all', curWorld=null;
const rates={EUR:1,USD:1.08,GBP:0.86,CHF:0.96,JPY:161,CNY:7.8};
const syms={EUR:'€',USD:'$',GBP:'£',CHF:'₣',JPY:'¥',CNY:'¥'};

function fmt(p){
  const v=p*rates[curCurr];
  return syms[curCurr]+(v>=1000?Math.round(v).toLocaleString():Math.round(v));
}

function translateName(name, lang){
  if(!lang||lang==='it') return name;
  const maps={
    en:{
      'Maglioncino':'Knit Sweater','Maglione Lungo':'Long Sweater','Maglione Lana':'Wool Sweater',
      'Maglione':'Sweater','Felpa Senza Cappuccio':'Crewneck Sweatshirt','Cropped Felpa':'Cropped Sweatshirt',
      'Felpa con Cappuccio':'Hoodie','Felpa':'Sweatshirt','Cardigan Cotone':'Cotton Cardigan',
      'Cardigan':'Cardigan','Giacca a Vento':'Windbreaker','Pantaloni Tuta':'Trackpants',
      'Jeans':'Jeans','Polo':'Polo Shirt','T-Shirt':'T-Shirt','Tee':'Tee',
      'Cropped':'Cropped','Destroyed':'Destroyed','Oversize':'Oversized',
      'Con Monogram':'Monogram','Con Scritta':'With Print','Paiette':'Sequin',
      'Cotone':'Cotton','Lana':'Wool','Logo':'Logo','Sample':'Sample',
      'Mai Rilasciata':'Unreleased','Mai Rilasciati':'Unreleased',
    },
    fr:{
      'Maglioncino':'Pull','Maglione Lungo':'Pull Long','Maglione Lana':'Pull en Laine',
      'Maglione':'Pull','Felpa Senza Cappuccio':'Sweat Col Rond','Cropped Felpa':'Sweat Court',
      'Felpa con Cappuccio':'Sweat à Capuche','Felpa':'Sweat','Cardigan Cotone':'Cardigan Coton',
      'Cardigan':'Cardigan','Giacca a Vento':'Coupe-Vent','Pantaloni Tuta':'Jogging',
      'Jeans':'Jean','Polo':'Polo','T-Shirt':'T-Shirt','Tee':'Tee',
      'Cropped':'Court','Destroyed':'Destroyed','Oversize':'Oversize',
      'Con Monogram':'Monogramme','Con Scritta':'Imprimé','Paiette':'Sequins',
      'Cotone':'Coton','Lana':'Laine','Logo':'Logo','Sample':'Prototype',
      'Mai Rilasciata':'Non Commercialisée','Mai Rilasciati':'Non Commercialisés',
    },
    es:{
      'Maglioncino':'Jersey','Maglione Lungo':'Suéter Largo','Maglione Lana':'Suéter de Lana',
      'Maglione':'Suéter','Felpa Senza Cappuccio':'Sudadera','Cropped Felpa':'Sudadera Corta',
      'Felpa con Cappuccio':'Sudadera con Capucha','Felpa':'Sudadera','Cardigan Cotone':'Cardigan Algodón',
      'Cardigan':'Cardigan','Giacca a Vento':'Cortavientos','Pantaloni Tuta':'Pantalón de Chándal',
      'Jeans':'Vaqueros','Polo':'Polo','T-Shirt':'Camiseta','Tee':'Camiseta',
      'Cropped':'Corto','Destroyed':'Destroyed','Oversize':'Oversize',
      'Con Monogram':'Monograma','Con Scritta':'Con Estampado','Paiette':'Lentejuelas',
      'Cotone':'Algodón','Lana':'Lana','Logo':'Logo','Sample':'Prototipo',
      'Mai Rilasciata':'No Comercializada','Mai Rilasciati':'No Comercializados',
    },
    de:{
      'Maglioncino':'Strickpullover','Maglione Lungo':'Langer Pullover','Maglione Lana':'Wollpullover',
      'Maglione':'Pullover','Felpa Senza Cappuccio':'Sweatshirt','Cropped Felpa':'Kurzes Sweatshirt',
      'Felpa con Cappuccio':'Hoodie','Felpa':'Sweatshirt','Cardigan Cotone':'Baumwoll-Cardigan',
      'Cardigan':'Cardigan','Giacca a Vento':'Windjacke','Pantaloni Tuta':'Jogginghose',
      'Jeans':'Jeans','Polo':'Poloshirt','T-Shirt':'T-Shirt','Tee':'Tee',
      'Cropped':'Cropped','Destroyed':'Destroyed','Oversize':'Oversized',
      'Con Monogram':'Monogramm','Con Scritta':'mit Schriftzug','Paiette':'Pailletten',
      'Cotone':'Baumwolle','Lana':'Wolle','Logo':'Logo','Sample':'Sample',
      'Mai Rilasciata':'Unveröffentlicht','Mai Rilasciati':'Unveröffentlicht',
    }
  };
  const dict=maps[lang];
  if(!dict) return name;
  let r=name;
  const keys=Object.keys(dict).sort((a,b)=>b.length-a.length);
  for(const k of keys) r=r.replace(new RegExp(k,'gi'), dict[k]);
  return r;
}

function setLang(l){
  curLang=l;
  try{localStorage.setItem('bl_lang',l);}catch(e){}
  document.querySelectorAll('[data-i]').forEach(el=>{
    const k=el.getAttribute('data-i');
    if(T[l]&&T[l][k]!==undefined) el.innerHTML=T[l][k];
  });
  render();
}

function setCurr(c){
  curCurr=c;
  try{localStorage.setItem('bl_curr',c);}catch(e){}
  renderPrices();
}

function toggleMenu(){
  const b=document.getElementById('burger');
  const m=document.getElementById('mnav');
  b.classList.toggle('open');
  m.classList.toggle('open');
  document.body.style.overflow=m.classList.contains('open')?'hidden':'';
}
function closeMNav(){
  const b=document.getElementById('burger');
  const m=document.getElementById('mnav');
  b.classList.remove('open');
  m.classList.remove('open');
  document.body.style.overflow='';
}

function renderPrices(){
  document.querySelectorAll('.pcard-price').forEach(el=>{
    const p=prods.find(x=>x.id==el.dataset.id);
    if(p) el.innerHTML=p.price===0?`<span class="price-req">${T[curLang].price_req||'—'}</span>`:fmt(p.price);
  });
  document.querySelectorAll('.pcard-orig').forEach(el=>{
    const p=prods.find(x=>x.id==el.dataset.id);
    if(p) el.textContent=p.orig>0?fmt(p.orig):'';
  });
}

let curSize='all',curSort='feat',curQ='',availOnly=false,shopWired=false;
function uniqueSizes(){const order=['XXS','XS','S','M','L','XL','XXL'];const set=new Set(prods.map(p=>p.sz).filter(Boolean));return order.filter(s=>set.has(s)).concat([...set].filter(s=>!order.includes(s)));}
function wireShop(){
  if(shopWired)return;shopWired=true;
  const q=document.getElementById('q');if(q)q.addEventListener('input',e=>{curQ=e.target.value.trim();render();});
  const ss=document.getElementById('sortSel');if(ss)ss.addEventListener('change',e=>{curSort=e.target.value;render();});
  const av=document.getElementById('availOnly');if(av)av.addEventListener('change',e=>{availOnly=e.target.checked;render();});
}
function render(){
  const l=T[curLang];
  const g=document.getElementById('grid');
  if(!g)return;
  wireShop();
  const brands=['all',...new Set(prods.map(p=>p.brand))];
  const bp=document.getElementById('brandPills');
  if(bp)bp.innerHTML=brands.map(b=>`<button class="pill${b===curFilter?' on':''}" onclick="setFilter('${b}')">${b==='all'?(l.all||'Tutti'):b.charAt(0).toUpperCase()+b.slice(1)}</button>`).join('');
  const sp=document.getElementById('sizePills');
  if(sp){const sizes=['all',...uniqueSizes()];sp.innerHTML=sizes.map(s=>`<button class="pill spill${s===curSize?' on':''}" onclick="setSize('${s}')">${s==='all'?'Tutte le taglie':s}</button>`).join('');}

  let list=prods.filter(p=>{
    if(curFilter!=='all' && !(p.brand===curFilter||p.brand.startsWith(curFilter)))return false;
    if(curSize!=='all' && p.sz!==curSize)return false;
    if(availOnly && p.sold)return false;
    if(curQ){const q=curQ.toLowerCase();if(!((p.name||'').toLowerCase().includes(q)||(p.brand||'').toLowerCase().includes(q)||(p.color||'').toLowerCase().includes(q)))return false;}
    return true;
  });
  if(curSort==='pasc')list=list.slice().sort((a,b)=>(a.price||1e9)-(b.price||1e9));
  else if(curSort==='pdesc')list=list.slice().sort((a,b)=>(b.price||0)-(a.price||0));
  else if(curSort==='new')list=list.slice().sort((a,b)=>b.id-a.id);

  const rc=document.getElementById('resCount');if(rc)rc.textContent=list.length+(list.length===1?' capo':' capi');
  const nr=document.getElementById('noRes');if(nr)nr.style.display=list.length?'none':'block';

  g.innerHTML='';
  list.forEach(p=>{
    const condMap={'Ottima':'cond_great','Molto buono':'cond_vgood','Molto Buona':'cond_vgood','Buona':'cond_good','Buono':'cond_good','Eccellente':'cond_mint','Nuovo':'cond_new'};
    const condTxt=l[condMap[p.cond]]||p.cond;
    const d=document.createElement('div');
    d.className='pc'+(p.sold?' sold':'');
    const imgs=p.images||[];
    const imgErr = `onerror="this.onerror=null;this.style.opacity='.15'"`;
    const front=imgs[0]?`src="${imgs[0]}"`:'';
    const back=(imgs[1]||imgs[0])?`src="${imgs[1]||imgs[0]}"`:'';
    const disc=(p.orig>p.price&&p.price>0)?`<span class="pdisc">-${Math.round((1-p.price/p.orig)*100)}%</span>`:'';
    d.innerHTML=`<div class="pi"><div class="flip-wrap"><div class="flip-inner"><div class="flip-front"><img ${front} alt="${p.name}" loading="lazy" decoding="async" ${imgErr}></div><div class="flip-back"><img ${back} alt="${p.name} retro" loading="lazy" decoding="async" ${imgErr}></div></div></div>${disc}<div class="ptag${p.sold?' sold':''}">${p.sold?l.sold:l.avail}</div></div><div class="pinfo"><div class="pname">${translateName(p.name,curLang)}</div><div class="psize">${l.size} ${p.sz} · ${condTxt}</div><div class="pfooter"><div><span class="pprice pcard-price" data-id="${p.id}">${p.price===0?'<span class="price-req">'+(l.price_req||'—')+'</span>':fmt(p.price)}</span>${p.orig>0?`<span class="porig pcard-orig" data-id="${p.id}">${fmt(p.orig)}</span>`:''}</div></div></div>`;
    if(!p.sold){d.addEventListener('click',function(){openM(p.id);});}
    g.appendChild(d);
  });
}

function setFilter(b){curFilter=b;render();}
function setSize(s){curSize=s;render();}
function toggleFilters(){
  var a=document.getElementById('shopadv'),b=document.getElementById('filToggle');
  if(!a||!b)return;
  var willOpen=a.hasAttribute('hidden');
  if(willOpen){a.removeAttribute('hidden');b.classList.add('open');b.setAttribute('aria-expanded','true');var q=document.getElementById('q');if(q)q.focus();}
  else{a.setAttribute('hidden','');b.classList.remove('open');b.setAttribute('aria-expanded','false');}
}

function enterWorld(w){
  const note=document.getElementById('gw-note');
  if(w==='lei'){
    if(note)note.classList.add('show');
    return;
  }
  if(note)note.classList.remove('show');
  curWorld='lui';
  const sec=document.getElementById('prodotti');
  sec.classList.remove('locked');
  document.querySelectorAll('#grid img[data-src]').forEach(im=>{im.src=im.dataset.src;im.removeAttribute('data-src');});
  document.querySelectorAll('#prodotti .reveal').forEach(el=>el.classList.add('visible'));
  requestAnimationFrame(()=>{sec.scrollIntoView({behavior:'smooth',block:'start'});window.dispatchEvent(new Event('resize'));});
}

const SPEC_LBL={
  it:{brand:'Marca',size:'Taglia',cond:'Condizione',color:'Colore',fit:'Vestibilità'},
  en:{brand:'Brand',size:'Size',cond:'Condition',color:'Colour',fit:'Fit'},
  fr:{brand:'Marque',size:'Taille',cond:'État',color:'Couleur',fit:'Coupe'},
  es:{brand:'Marca',size:'Talla',cond:'Condición',color:'Color',fit:'Corte'},
  de:{brand:'Marke',size:'Größe',cond:'Zustand',color:'Farbe',fit:'Passform'}
};
const BRAND_NAME={gucci:'Gucci',balenciaga:'Balenciaga',enfants:'Enfants Riches Déprimés',erd:'Enfants Riches Déprimés'};
const TRUST_LBL={
  it:['Autenticato','Reso facile','Spedizione tracciata'],
  en:['Authenticated','Easy returns','Tracked shipping'],
  fr:['Authentifié','Retour facile','Livraison suivie'],
  es:['Autenticado','Devolución fácil','Envío con seguimiento'],
  de:['Authentifiziert','Einfache Rückgabe','Verfolgter Versand']
};
function openM(id){
  const p=prods.find(x=>x.id===id);
  const l=T[curLang];
  const mimg=document.getElementById('mimg');
  const imgs=p.images||[];
  mimg.innerHTML=imgs.map(s=>`<img src="${s}" alt="${translateName(p.name,curLang)}" loading="lazy" decoding="async" onerror="this.onerror=null;this.style.opacity='.15'">`).join('');
  const _mb=document.getElementById('mbrand');if(_mb)_mb.textContent=BRAND_NAME[p.brand]||p.brand||'';
  document.getElementById('mname').textContent=translateName(p.name,curLang);
  if(p.price===0){
    document.getElementById('mprice').textContent=l.price_req||'Su richiesta';
    document.getElementById('morig').textContent=p.orig>0?fmt(p.orig):'';
    document.getElementById('msave').textContent='';
  }else{
    document.getElementById('mprice').textContent=fmt(p.price);
    document.getElementById('morig').textContent=p.orig>0?fmt(p.orig):'';
    const pct=p.orig>0?Math.round((1-p.price/p.orig)*100):0;
    document.getElementById('msave').textContent=p.orig>0?`-${pct}%`:'';
  }
  const condMap={'Ottima':'cond_great','Molto buono':'cond_vgood','Molto Buona':'cond_vgood','Buona':'cond_good','Buono':'cond_good','Eccellente':'cond_mint','Nuovo':'cond_new'};
  const condTxt=l[condMap[p.cond]]||p.cond;
  const SL=SPEC_LBL[curLang]||SPEC_LBL.it;
  const colorTxt=p.color?p.color.charAt(0).toUpperCase()+p.color.slice(1):'';
  const rows=[[SL.brand,BRAND_NAME[p.brand]||p.brand||''],[SL.size,p.sz],[SL.cond,condTxt],[SL.color,colorTxt],[SL.fit,p.fit]];
  document.getElementById('mspecs').innerHTML=rows.filter(r=>r[1]).map(r=>`<div class="mspec"><dt>${r[0]}</dt><dd>${r[1]}</dd></div>`).join('');
  const desc=typeof p.desc==='object'?(p.desc[curLang]||p.desc.it):p.desc;
  const boxNote=p.hasBox?(l.box_note||' Original box included.'):'';
  document.getElementById('mdesc').textContent=desc+(p.hasBox?boxNote:'');
  const TR=TRUST_LBL[curLang]||TRUST_LBL.it;
  document.getElementById('mtrust').innerHTML=TR.map(t=>`<span>${t}</span>`).join('');
  const btn=document.getElementById('mbuy');
  btn.textContent=p.sold?l.sold:l.buy;
  btn.onclick=p.sold?null:()=>window.open(p.stripe,'_blank');
  btn.style.opacity=p.sold?'.5':'1';
  btn.style.cursor=p.sold?'not-allowed':'pointer';
  buildRelated(p);
  const mov=document.getElementById('mov');
  mov.classList.add('open');
  document.body.style.overflow='hidden';
  mov.scrollTop=0;
  if(location.hash!=='#p'+id){history.pushState(null,'','#p'+id);}
}
function relatedCard(p){
  const l=T[curLang];const imgs=p.images||[];
  const d=document.createElement('div');d.className='pc'+(p.sold?' sold':'');
  const front=imgs[0]?`src="${imgs[0]}"`:'';
  d.innerHTML=`<div class="pi"><img ${front} alt="${translateName(p.name,curLang)}" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover" onerror="this.onerror=null;this.style.opacity='.15'">${p.sold?`<div class="ptag sold">${l.sold}</div>`:''}</div><div class="pinfo"><div class="pname">${translateName(p.name,curLang)}</div><div class="pfooter"><span class="pprice">${p.price===0?(l.price_req||'—'):fmt(p.price)}</span>${p.orig>0?` <span class="porig">${fmt(p.orig)}</span>`:''}</div></div>`;
  d.addEventListener('click',()=>openM(p.id));
  return d;
}
function buildRelated(p){
  const grid=document.getElementById('mrelated');const box=document.getElementById('mrelblock');if(!grid)return;
  let rel=prods.filter(x=>x.id!==p.id&&(x.brand===p.brand||(x.brand&&p.brand&&(x.brand.startsWith(p.brand)||p.brand.startsWith(x.brand)))));
  rel.sort((a,b)=>(a.sold?1:0)-(b.sold?1:0));
  if(rel.length<4){rel=rel.concat(prods.filter(x=>x.id!==p.id&&rel.indexOf(x)<0));}
  rel=rel.slice(0,4);
  grid.innerHTML='';rel.forEach(x=>grid.appendChild(relatedCard(x)));
  if(box)box.style.display=rel.length?'':'none';
}
function closeM(){
  document.getElementById('mov').classList.remove('open');
  document.body.style.overflow='';
  if(/^#p\d+$/.test(location.hash||'')){history.replaceState(null,'',location.pathname+location.search);}
}
window.addEventListener('popstate',function(){
  var mv=document.getElementById('mov');if(!mv)return;
  const m=(location.hash||'').match(/^#p(\d+)$/);
  if(m&&prods.find(x=>x.id===+m[1])){openM(+m[1]);}
  else{mv.classList.remove('open');document.body.style.overflow='';}
});
function openTrack(){document.getElementById('tov').classList.add('open');document.body.style.overflow='hidden';}
function closeTrack(){disposeGlobe();document.getElementById('tov').classList.remove('open');document.body.style.overflow='';}

// CHECKOUT FORM
let ckCurrentProduct=null;
function openCheckout(p){
  ckCurrentProduct=p;
  const ck=CK[curLang]||CK.it;
  document.querySelectorAll('[data-ck]').forEach(el=>{
    const k=el.getAttribute('data-ck');
    if(ck[k]){
      if(el.tagName==='LABEL'||el.classList.contains('sl')||el.classList.contains('ck-secure'))el.textContent=ck[k];
      else el.innerHTML=ck[k];
    }
  });
  document.getElementById('ckAddr').placeholder=ck.ck_addr_ph||'Via, numero civico';
  const l=T[curLang]||T.it;
  const pName=translateName(p.name,curLang);
  const pPrice=p.price===0?(l.price_req||'Su richiesta'):fmt(p.price);
  document.getElementById('ckProduct').textContent=pName+' — '+pPrice;
  try{
    const saved=JSON.parse(localStorage.getItem('bluelle_customer')||'{}');
    if(saved.nome)document.getElementById('ckNome').value=saved.nome;
    if(saved.cognome)document.getElementById('ckCognome').value=saved.cognome;
    if(saved.email)document.getElementById('ckEmail').value=saved.email;
    if(saved.tel)document.getElementById('ckTel').value=saved.tel;
    if(saved.addr)document.getElementById('ckAddr').value=saved.addr;
    if(saved.city)document.getElementById('ckCity').value=saved.city;
    if(saved.cap)document.getElementById('ckCap').value=saved.cap;
    if(saved.prov)document.getElementById('ckProv').value=saved.prov;
    if(saved.country)document.getElementById('ckCountry').value=saved.country;
  }catch(e){}
  document.getElementById('ckErr').textContent='';
  document.querySelectorAll('.ck-in').forEach(el=>el.classList.remove('ck-invalid'));
  try{const saved=JSON.parse(localStorage.getItem('bluelle_customer')||'{}');if(saved.zone)document.getElementById('ckShipZone').value=saved.zone;}catch(e){}
  updateShipping();
  document.getElementById('ckov').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeCheckout(){document.getElementById('ckov').classList.remove('open');document.body.style.overflow='hidden';}
const SHIP_COST={it:10,eu:15,world:25};
function updateShipping(){
  const zone=document.getElementById('ckShipZone')?.value||'it';
  const ck=CK[curLang]||CK.it;
  const ship=SHIP_COST[zone];
  const price=ckCurrentProduct?.price||0;
  const summary=document.getElementById('ckSummary');
  if(!summary)return;
  if(price===0){summary.classList.remove('show');return;}
  const total=price+ship;
  summary.classList.add('show');
  summary.innerHTML=
    `<div class="ck-sum-row"><span>${translateName(ckCurrentProduct.name,curLang)}</span><span>${fmt(price)}</span></div>`+
    `<div class="ck-sum-row"><span>${ck.ck_ship||'Spedizione'}</span><span>+€${ship}</span></div>`+
    `<div class="ck-sum-row total"><span>${ck.ck_total||'Totale'}</span><span>${fmt(total)}</span></div>`;
}

var _ckf=document.getElementById('ckForm');if(_ckf)_ckf.addEventListener('submit',function(e){
  e.preventDefault();
  const ck=CK[curLang]||CK.it;
  const fields={
    nome:document.getElementById('ckNome').value.trim(),
    cognome:document.getElementById('ckCognome').value.trim(),
    email:document.getElementById('ckEmail').value.trim(),
    tel:document.getElementById('ckTel').value.trim(),
    addr:document.getElementById('ckAddr').value.trim(),
    city:document.getElementById('ckCity').value.trim(),
    cap:document.getElementById('ckCap').value.trim(),
    prov:document.getElementById('ckProv').value.trim(),
    country:document.getElementById('ckCountry').value.trim(),
    zone:document.getElementById('ckShipZone').value
  };
  document.querySelectorAll('.ck-in').forEach(el=>el.classList.remove('ck-invalid'));
  const required=['ckNome','ckCognome','ckEmail','ckTel','ckAddr','ckCity','ckCap'];
  let valid=true;
  required.forEach(id=>{
    const el=document.getElementById(id);
    if(!el.value.trim()){el.classList.add('ck-invalid');valid=false;}
  });
  if(!valid){document.getElementById('ckErr').textContent=ck.ck_err;return;}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)){
    document.getElementById('ckEmail').classList.add('ck-invalid');
    document.getElementById('ckErr').textContent=ck.ck_err_email;return;
  }
  try{localStorage.setItem('bluelle_customer',JSON.stringify(fields));}catch(e){}
  let url=ckCurrentProduct.stripe;
  const sep=url.includes('?')?'&':'?';
  url+=sep+'prefilled_email='+encodeURIComponent(fields.email);
  window.open(url,'_blank');
  closeCheckout();
});

const TT={
  it:{searching:'Ricerca spedizione in corso...',err1:'Inserisci almeno il codice tracking.',err2:'Inserisci il codice tracking del corriere.',lbl_order:'Numero ordine',lbl_code:'Codice tracking',info:'Apri il tracking per vedere tutti i passaggi — funziona con DHL, BRT, GLS, Poste Italiane, FedEx e altri.',open_btn:'Vedi tutti i passaggi →',locale:'it'},
  en:{searching:'Searching shipment...',err1:'Please enter at least the tracking code.',err2:'Please enter the courier tracking code.',lbl_order:'Order number',lbl_code:'Tracking code',info:'Open tracking to see all delivery updates — works with DHL, GLS, FedEx, UPS and more.',open_btn:'View all updates →',locale:'en'},
  fr:{searching:'Recherche en cours...',err1:'Veuillez entrer au moins le code de suivi.',err2:'Veuillez entrer le code de suivi du transporteur.',lbl_order:'Numéro de commande',lbl_code:'Code de suivi',info:'Ouvrez le suivi pour voir toutes les étapes — compatible avec tous les transporteurs.',open_btn:'Voir toutes les étapes →',locale:'fr'},
  es:{searching:'Buscando envío...',err1:'Por favor introduce al menos el código de seguimiento.',err2:'Por favor introduce el código de seguimiento del mensajero.',lbl_order:'Número de pedido',lbl_code:'Código de seguimiento',info:'Abre el seguimiento para ver todos los pasos — funciona con cualquier transportista.',open_btn:'Ver todos los pasos →',locale:'en'},
  de:{searching:'Sendung wird gesucht...',err1:'Bitte mindestens den Sendungscode eingeben.',err2:'Bitte den Sendungscode des Versanddienstes eingeben.',lbl_order:'Bestellnummer',lbl_code:'Sendungscode',info:'Öffne das Tracking für alle Updates — funktioniert mit DHL, GLS, FedEx, UPS u.a.',open_btn:'Alle Updates ansehen →',locale:'de'}
};
/* ═══════════════ REGISTRO ORDINI ═══════════════
   Aggiungi UNA riga ogni volta che spedisci un ordine.
   Formato:
     'NUMERO-ORDINE': { tracking:'CODICE DEL CORRIERE', carrier:'DHL', status:3, eta:'18 giugno 2026' }
   status:  1 = Ordine confermato
            2 = Spedito
            3 = In transito
            4 = In consegna
            5 = Consegnato
   Il tracking si apre SOLO se numero ordine e codice corrispondono.
   (Riga di esempio qui sotto: cancellala o sostituiscila.)            */
// ── GLOBO 3D (tracking) — degrada alla sola timeline se WebGL non c'è ──
let _globe=null;
function disposeGlobe(){
  if(_globe){
    try{ if(_globe.raf) cancelAnimationFrame(_globe.raf); if(_globe.controls&&_globe.controls.dispose) _globe.controls.dispose(); if(_globe.renderer){ _globe.renderer.dispose(); var c=_globe.renderer.domElement; if(c&&c.parentNode) c.parentNode.removeChild(c); } }catch(e){}
    _globe=null;
  }
}
function mountGlobe(containerId, origin, dest, progress){
  if(typeof THREE==='undefined' || typeof ThreeGlobe==='undefined') return null;
  var el=document.getElementById(containerId); if(!el) return null;
  var W=el.clientWidth||320, H=el.clientHeight||300;
  var renderer;
  try{ renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'}); }catch(e){ return null; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  renderer.setSize(W,H);
  el.appendChild(renderer.domElement);
  var scene=new THREE.Scene();
  scene.add(new THREE.AmbientLight(0xffffff,1.05));
  var dl=new THREE.DirectionalLight(0xffffff,0.45); dl.position.set(1,1,1); scene.add(dl);
  function uvec(la,lo){ var d2r=Math.PI/180; la*=d2r; lo*=d2r; return [Math.cos(la)*Math.cos(lo),Math.cos(la)*Math.sin(lo),Math.sin(la)]; }
  function interp(p){
    var r2d=180/Math.PI;
    var A=uvec(origin.lat,origin.lon), B=uvec(dest.lat,dest.lon);
    var dot=Math.max(-1,Math.min(1,A[0]*B[0]+A[1]*B[1]+A[2]*B[2]));
    var om=Math.acos(dot), so=Math.sin(om)||1e-6;
    var s1=Math.sin((1-p)*om)/so, s2=Math.sin(p*om)/so;
    var x=A[0]*s1+B[0]*s2, y=A[1]*s1+B[1]*s2, z=A[2]*s1+B[2]*s2;
    return { lat:Math.asin(z/Math.sqrt(x*x+y*y+z*z))*r2d, lng:Math.atan2(y,x)*r2d };
  }
  var prog=Math.max(0,Math.min(1,progress)), now=interp(prog);
  var Ao=uvec(origin.lat,origin.lon), Bo=uvec(dest.lat,dest.lon);
  var sep=Math.acos(Math.max(-1,Math.min(1,Ao[0]*Bo[0]+Ao[1]*Bo[1]+Ao[2]*Bo[2])));
  var Globe;
  try{
    Globe=new ThreeGlobe()
      .showGlobe(true)
      .showAtmosphere(true).atmosphereColor('#7fd9d1').atmosphereAltitude(0.14)
      .arcsData([{startLat:origin.lat,startLng:origin.lon,endLat:dest.lat,endLng:dest.lon}])
      .arcColor(function(){return ['#7fd9d1','#5fcfc6'];})
      .arcAltitudeAutoScale(0.3).arcStroke(0.55)
      .arcDashLength(1).arcDashGap(0).arcDashInitialGap(0).arcDashAnimateTime(0)
      .pointsData([
        {lat:origin.lat,lng:origin.lon,color:'#7fd9d1',rad:0.55,alt:0.012},
        {lat:dest.lat,lng:dest.lon,color:'#5fcfc6',rad:0.62,alt:0.012},
        {lat:now.lat,lng:now.lng,color:'#ffffff',rad:0.55,alt:0.05}
      ])
      .pointColor('color').pointAltitude('alt').pointRadius('rad');
  }catch(e){ try{ renderer.dispose(); }catch(_){ } return null; }
  // flat ocean base — no relief, no satellite (elegant marine sea)
  try{ var gm=Globe.globeMaterial(); if(gm){ gm.color=new THREE.Color('#12302b'); gm.map=null; gm.bumpMap=null; if('shininess' in gm) gm.shininess=6; gm.transparent=false; gm.needsUpdate=true; } }catch(e){}
  scene.add(Globe);
  // country regions / borders — cream land on marine sea
  try{
    if(typeof fetch==='function'){
      fetch('https://unpkg.com/world-atlas@2/countries-110m.json')
        .then(function(r){ return r.json(); })
        .then(function(topo){
          if(typeof topojson==='undefined' || !topo || !topo.objects || !topo.objects.countries) return;
          var feats=topojson.feature(topo, topo.objects.countries).features;
          Globe.polygonsData(feats)
            .polygonCapColor(function(){ return 'rgba(240,234,223,0.94)'; })
            .polygonSideColor(function(){ return 'rgba(18,48,43,0.55)'; })
            .polygonStrokeColor(function(){ return 'rgba(18,48,43,0.6)'; })
            .polygonAltitude(0.008);
        })['catch'](function(){});
    }
  }catch(e){}
  var camera=new THREE.PerspectiveCamera(36, W/H, 0.1, 3000);
  var dirVec;
  try{ var mc=Globe.getCoords((origin.lat+dest.lat)/2,(origin.lon+dest.lon)/2,0); dirVec=new THREE.Vector3(mc.x,mc.y,mc.z).normalize(); }
  catch(e){ dirVec=new THREE.Vector3(0,0.3,1).normalize(); }
  function setCam(d){ camera.position.copy(dirVec.clone().multiplyScalar(d)); camera.up.set(0,1,0); camera.lookAt(0,0,0); }
  var NEAR=Math.max(178, Math.min(520, 100*(1.82 + sep*0.95)));
  var FAR=NEAR+300; setCam(FAR);
  var t0=performance.now(), ZD=2.3, controls=null, settled=false;
  function easeOut(x){ return 1-Math.pow(1-x,3); }
  var inst={renderer:renderer,raf:0,controls:null};
  function loop(now2){
    var e=(now2-t0)/1000;
    if(e<ZD){
      setCam(FAR-(FAR-NEAR)*easeOut(e/ZD));
    }else{
      if(!settled){
        settled=true;
        if(THREE.OrbitControls){
          controls=new THREE.OrbitControls(camera, renderer.domElement);
          controls.target.set(0,0,0); controls.enablePan=false;
          controls.minDistance=Math.max(150,NEAR-80); controls.maxDistance=NEAR+260;
          controls.enableDamping=true; controls.dampingFactor=0.09;
          controls.autoRotate=false; controls.rotateSpeed=0.5; controls.zoomSpeed=0.7;
          controls.update(); inst.controls=controls;
        }
      }
      if(controls){ controls.update(); }
    }
    renderer.render(scene,camera);
    inst.raf=requestAnimationFrame(loop);
  }
  inst.raf=requestAnimationFrame(loop);
  return inst;
}

const ORDERS = {
  '1': { tracking:'2', carrier:'BRT', status:3, eta:'2–3 giorni lavorativi', dest:{ lat:52.52, lon:13.405, city:'Berlin' } }
};

// Etichette degli step della spedizione, per lingua
const STEPS = {
  it:['Ordine confermato','Spedito','In transito','In consegna','Consegnato'],
  en:['Order confirmed','Shipped','In transit','Out for delivery','Delivered'],
  fr:['Commande confirmée','Expédié','En transit','En livraison','Livré'],
  es:['Pedido confirmado','Enviado','En tránsito','En reparto','Entregado'],
  de:['Bestellung bestätigt','Versandt','Unterwegs','In Zustellung','Zugestellt']
};
// Messaggi del tracking, per lingua
const TMSG = {
  it:{both:'Inserisci numero ordine e codice tracking.',order:'Ordine non trovato. Controlla il numero ordine.',match:'Il codice tracking non corrisponde a questo numero ordine.',carrier:'Corriere',eta:'Consegna stimata'},
  en:{both:'Enter both order number and tracking code.',order:'Order not found. Check the order number.',match:'The tracking code does not match this order number.',carrier:'Carrier',eta:'Estimated delivery'},
  fr:{both:'Entrez le numéro de commande et le code de suivi.',order:'Commande introuvable. Vérifiez le numéro.',match:'Le code de suivi ne correspond pas à cette commande.',carrier:'Transporteur',eta:'Livraison estimée'},
  es:{both:'Introduce el número de pedido y el código de seguimiento.',order:'Pedido no encontrado. Revisa el número.',match:'El código de seguimiento no coincide con este pedido.',carrier:'Transportista',eta:'Entrega estimada'},
  de:{both:'Bestellnummer und Sendungscode eingeben.',order:'Bestellung nicht gefunden. Nummer prüfen.',match:'Der Sendungscode passt nicht zu dieser Bestellung.',carrier:'Versanddienst',eta:'Voraussichtliche Lieferung'}
};

// ── RILEVATORE POSIZIONE / MODALE BENVENUTO ──
const GEO_T = {
  it:{eye:'Benvenuto',title:'Confermi <em>area</em> e valuta?',lang:'Lingua',curr:'Valuta',btn:'Conferma',from:n=>`Sembra che tu stia navigando da ${n}. Puoi modificare lingua e valuta.`,nofrom:'Imposta lingua e valuta per la tua area.'},
  en:{eye:'Welcome',title:'Confirm your <em>region</em> & currency?',lang:'Language',curr:'Currency',btn:'Confirm',from:n=>`Looks like you're browsing from ${n}. You can change language and currency.`,nofrom:'Set your language and currency.'},
  fr:{eye:'Bienvenue',title:'Confirmez <em>région</em> et devise ?',lang:'Langue',curr:'Devise',btn:'Confirmer',from:n=>`Vous semblez naviguer depuis ${n}. Vous pouvez changer la langue et la devise.`,nofrom:'Choisissez langue et devise.'},
  es:{eye:'Bienvenido',title:'¿Confirmas <em>región</em> y moneda?',lang:'Idioma',curr:'Moneda',btn:'Confirmar',from:n=>`Parece que navegas desde ${n}. Puedes cambiar idioma y moneda.`,nofrom:'Elige idioma y moneda.'},
  de:{eye:'Willkommen',title:'<em>Region</em> und Währung bestätigen?',lang:'Sprache',curr:'Währung',btn:'Bestätigen',from:n=>`Du scheinst aus ${n} zu surfen. Sprache und Währung sind änderbar.`,nofrom:'Sprache und Währung festlegen.'}
};
function geoSuggest(){
  const curMap={GB:'GBP',US:'USD',CH:'CHF',JP:'JPY',CN:'CNY'};
  const langMap={IT:'it',FR:'fr',BE:'fr',LU:'fr',MC:'fr',ES:'es',MX:'es',AR:'es',CL:'es',CO:'es',PE:'es',DE:'de',AT:'de',CH:'de',GB:'en',IE:'en',US:'en'};
  function navLang(){const n=(navigator.language||'').slice(0,2).toLowerCase();return ['it','en','fr','es','de'].includes(n)?n:null;}
  function apply(cc,name){
    cc=(cc||'').toUpperCase();
    const sLang=langMap[cc]||navLang()||'it';
    const sCurr=curMap[cc]||'EUR';
    const g=GEO_T[sLang]||GEO_T.it;
    document.getElementById('geoEye').textContent=g.eye;
    document.getElementById('geoTitle').innerHTML=g.title;
    document.getElementById('geoSub').textContent=name?g.from(name):g.nofrom;
    document.getElementById('geoLangLbl').textContent=g.lang;
    document.getElementById('geoCurrLbl').textContent=g.curr;
    document.getElementById('geoConfirm').textContent=g.btn;
    document.getElementById('geoLang').value=sLang;
    document.getElementById('geoCurr').value=sCurr;
    setLang(sLang);setCurr(sCurr);
    const ls=document.getElementById('langSel');if(ls)ls.value=sLang;
    const cs=document.getElementById('currSel');if(cs)cs.value=sCurr;
    document.getElementById('geov').classList.add('open');
  }
  fetch('https://ipwho.is/',{cache:'no-store'}).then(r=>r.json()).then(d=>{
    if(d&&d.success&&d.country_code){apply(d.country_code,d.country);}else{throw 0;}
  }).catch(()=>{
    fetch('https://get.geojs.io/v1/ip/geo.json',{cache:'no-store'}).then(r=>r.json()).then(d=>{
      apply((d&&d.country_code)||'',(d&&d.name)||null);
    }).catch(()=>apply('',null));
  });
}
function confirmRegion(){
  const l=document.getElementById('geoLang').value;
  const c=document.getElementById('geoCurr').value;
  setLang(l);setCurr(c);
  const ls=document.getElementById('langSel');if(ls)ls.value=l;
  const cs=document.getElementById('currSel');if(cs)cs.value=c;
  try{localStorage.setItem('bl_region_set','1');}catch(e){}
  document.getElementById('geov').classList.remove('open');
}

function doTrack(){
  const orderRaw=document.getElementById('trin-order').value.trim();
  const codeRaw=document.getElementById('trin').value.trim();
  const r=document.getElementById('trres');
  const tt=TT[curLang]||TT.it;
  const m=TMSG[curLang]||TMSG.it;
  const steps=STEPS[curLang]||STEPS.it;
  const esc=s=>String(s).replace(/</g,'&lt;');
  if(!orderRaw||!codeRaw){r.innerHTML=`<span style="color:#b5564e">${m.both}</span>`;return;}
  r.innerHTML=`<div class="track-spinner">${tt.searching}</div>`;
  setTimeout(()=>{
    const key=orderRaw.toUpperCase().replace(/\s+/g,'');
    const order=ORDERS[key];
    if(!order){r.innerHTML=`<span style="color:#b5564e">${m.order}</span>`;return;}
    if(String(order.tracking).trim().toLowerCase()!==codeRaw.toLowerCase()){
      r.innerHTML=`<span style="color:#b5564e">${m.match}</span>`;return;
    }
    const st=Math.max(1,Math.min(5,order.status||1));
    const url=order.url||(`https://t.17track.net/${tt.locale}#nums=`+encodeURIComponent(order.tracking));
    const timeline=steps.map((label,i)=>{
      const n=i+1;const cls=n<st?'done':(n===st?'current':'');
      return `<div class="tl-step ${cls}"><span class="tl-dot"></span><span class="tl-label">${label}</span></div>`;
    }).join('');
    var ORIGIN={lat:45.22,lon:12.28,city:'Chioggia'};
    var hasGlobe = order.dest && typeof order.dest.lat==='number';
    r.innerHTML=
      `<div class="track-card">`+
        (hasGlobe?`<div class="globe-wrap" id="globeWrap"><div id="globe3d"></div><div class="globe-cap">${esc(ORIGIN.city)} <b>→</b> ${esc(order.dest.city||'')}</div></div>`:'')+
        `<div class="track-card-row">`+
          `<div><div class="track-label">${tt.lbl_order}</div><div class="track-val">${esc(key)}</div></div>`+
          (order.carrier?`<div style="text-align:right"><div class="track-label">${m.carrier}</div><div class="track-val">${esc(order.carrier)}</div></div>`:'')+
        `</div>`+
        `<div class="tl">${timeline}</div>`+
        (order.eta?`<div class="track-eta">${m.eta}: <strong>${esc(order.eta)}</strong></div>`:'')+
        `<a class="track-open-btn" href="${url}" target="_blank" rel="noopener">${tt.open_btn}</a>`+
      `</div>`;
    disposeGlobe();
    if(hasGlobe){
      try{ _globe=mountGlobe('globe3d',ORIGIN,order.dest,(st-1)/4); if(!_globe){ var gw=document.getElementById('globeWrap'); if(gw) gw.style.display='none'; } }
      catch(err){ var gw2=document.getElementById('globeWrap'); if(gw2) gw2.style.display='none'; }
    }
  },1100);
}

// FAQ
function buildFaq(){
  const l=T[curLang];
  const faqs=[[l.fq1,l.fa1],[l.fq2,l.fa2],[l.fq3,l.fa3],[l.fq4,l.fa4],[l.fq5,l.fa5]];
  document.getElementById('faqList').innerHTML=faqs.map((f,i)=>`<div class="faq-item" id="fi${i}"><div class="faq-q" onclick="toggleFaq(${i})">${f[0]}<span class="faq-arrow">▾</span></div><div class="faq-a"><div class="faq-a-inner">${f[1]}</div></div></div>`).join('');
}
function toggleFaq(i){document.getElementById('fi'+i).classList.toggle('open');}

// NAV + NARRATIVE PROGRESS LINE (single rAF-throttled scroll handler, no per-scroll layout reads)
(function(){
  const nav=document.getElementById('nav');
  const line=document.getElementById('pgline');
  const fill=document.getElementById('pgfill');
  let sTop=0,eBottom=0,ticking=false;
  function measure(){
    const start=document.getElementById('about');
    const end=document.getElementById('contatti');
    if(!start||!end)return;
    sTop=start.offsetTop;
    eBottom=end.offsetTop+end.offsetHeight;
  }
  function update(){
    ticking=false;
    const y=window.scrollY;
    if(nav)nav.classList.toggle('s',y>80);
    if(line&&fill&&eBottom>sTop){
      const scrollMid=y+window.innerHeight*.5;
      const pct=Math.min(Math.max((scrollMid-sTop)/(eBottom-sTop)*100,0),100);
      fill.style.height=pct+'%';
      line.classList.toggle('vis',y>window.innerHeight*.4);
    }
  }
  window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(update);ticking=true;}},{passive:true});
  window.addEventListener('resize',()=>{measure();update();},{passive:true});
  measure();update();
  setTimeout(()=>{measure();update();},800);
})();

// INTRO
(function(){
  const intro=document.getElementById('intro');
  const vid=document.getElementById('ivideo');
  const txt=document.querySelector('.itext');
  if(!intro)return;
  let done=false;

  document.documentElement.style.overflow='hidden';
  document.body.style.overflow='hidden';

  function exit(){
    if(done)return; done=true;
    window.scrollTo({top:0,behavior:'instant'});
    document.documentElement.style.overflow='';
    document.body.style.overflow='';
    txt?.classList.add('out');
    setTimeout(()=>{
      intro.style.transition='opacity 1.1s ease';
      intro.style.opacity='0';
      setTimeout(()=>{ intro.style.display='none'; },1100);
    },1050);
  }

  setTimeout(()=>txt?.classList.add('visible'),300);

  if(vid){
    vid.addEventListener('canplay',()=>vid.classList.add('show'),{once:true});
  }

  setTimeout(exit,5000);
  intro.addEventListener('click',exit);
})();

// INIT — restore saved preferences
(function(){
  try{
    const sl=localStorage.getItem('bl_lang');
    const sc=localStorage.getItem('bl_curr');
    if(sl&&T[sl]){curLang=sl;const sel=document.getElementById('langSel');if(sel)sel.value=sl;}
    if(sc&&rates[sc]){curCurr=sc;const sel=document.getElementById('currSel');if(sel)sel.value=sc;}
  }catch(e){}
})();
render();
if(document.getElementById("faqList"))buildFaq();
setLang(curLang);

// REGION SUGGESTION — solo alla prima visita (poi resta la scelta salvata)
(function(){
  try{
    if(!localStorage.getItem('bl_region_set') && !localStorage.getItem('bl_lang') && !localStorage.getItem('bl_curr')){
      geoSuggest();
    }
  }catch(e){}
})();

// SCROLL REVEAL
(function(){
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -9% 0px' });

  function observe() {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
      obs.observe(el);
    });
  }

  observe();
  setTimeout(observe, 500);
  setTimeout(observe, 1200);

  const gridObs = new MutationObserver(() => setTimeout(observe, 100));
  const grid = document.getElementById('grid');
  if(grid) gridObs.observe(grid, {childList: true});
})();

// HERO PARALLAX
(function(){
  const hero=document.getElementById('hero');
  const hcont=document.querySelector('.hcont');
  let ticking=false;
  function drive(){
    ticking=false;
    if(!hero||!hcont)return;
    const p=Math.min(window.scrollY/hero.offsetHeight,1);
    hcont.style.opacity=1-p*0.75;
    hcont.style.transform='translateY('+(p*-55)+'px)';
  }
  window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(drive);ticking=true;}},{passive:true});
})();

} catch(e) { console.warn('Init error:', e); }

(function(){
  var f=document.getElementById('contactForm');
  if(!f)return;
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var btn=document.getElementById('cfSubmit');
    var old=btn.textContent; btn.disabled=true; btn.textContent='Invio…';
    fetch('https://formsubmit.co/ajax/brando.caregnato@gmail.com',{method:'POST',headers:{'Accept':'application/json'},body:new FormData(f)})
      .then(function(r){return r.json();})
      .then(function(){f.hidden=true;var d=document.getElementById('cfDone');if(d)d.hidden=false;})
      .catch(function(){btn.disabled=false;btn.textContent=old;alert('Qualcosa è andato storto. Riprova o scrivici su Instagram @bluelle._');});
  });
})();
