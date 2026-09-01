(function(global){
  'use strict';

  var LOCALES=['it','en','fr','es','de','pt','nl','pl','ro','sv','no','da','el','tr','ar','zh','ja','ko','ru'];
  var messages={};
  LOCALES.forEach(function(locale){messages[locale]={};});
  var common={
    it:{
      page_home:'Bluèlle — Luxury Second Hand',page_about:'Chi siamo — Bluèlle',page_collection:'Collezione — Bluèlle',page_faq:'FAQ — Bluèlle',page_tracking:'Tracking — Bluèlle',page_contact:'Contatti — Bluèlle',page_account:'Account — Bluèlle',page_terms:'Termini di Servizio e Privacy — Bluèlle',
      nav_main:'Navigazione principale',nav_home:'Home',nav_about:'Chi siamo',nav_coll:'Collezione',nav_faq:'FAQ',nav_tracking:'Tracking',nav_contact:'Contatti',nav_account:'Account',nav_menu:'Menu',nav_open_menu:'Apri menu',nav_close_menu:'Chiudi menu',picker_search:'Cerca…',picker_currency_aria:'Scegli valuta',picker_language_aria:'Scegli lingua',picker_currency_search:'Cerca valuta…',picker_language_search:'Cerca lingua…',picker_empty:'Nessun risultato',
      footer_tag:'Luxury second hand, selezionato,<br>autenticato e curato a mano.',footer_shop:'Shop',footer_help:'Assistenza',footer_track:'Tracking ordine',footer_terms:'Termini &amp; Condizioni',footer_follow:'Seguici',footer_secure:'Pagamenti sicuri',footer_bottom:'© 2026 Bluèlle — Curated Luxury Resale · Pagamento sicuro via Stripe',
      video_play:'Riproduci video',video_pause:'Pausa video',video_mute:'Disattiva audio video',video_unmute:'Attiva audio video',
      shop_all_sizes:'Tutte le taglie',shop_product_one:'Prodotto',shop_products_many:'Prodotti',cat_all:'Visualizza tutto',cat_knit:'Maglieria',cat_tshirt:'T-Shirt',cat_sweatshirts:'Felpe',cat_trousers:'Pantaloni',cat_polo:'Polo',cat_jackets:'Giacche',cat_bags:'Borse',cat_shoes:'Scarpe',cat_accessories:'Accessori',
      product_desc:'{name}. Colore: {color}. Vestibilità: {fit}. Condizione: {condition}. Selezionato e autenticato da Bluèlle.',product_whatsapp:'Ciao, vi scrivo per il pezzo: {name}',product_video:'Video prodotto',product_photo:'Foto prodotto',product_gallery:'Foto prodotto',product_choose_image:'Scegli immagine',product_show_photo:'Mostra foto {number}',product_main_photo:'foto principale',product_back:'retro',product_closeup:'Il pezzo da vicino',product_zoom_photo:'Ingrandisci foto',product_zoom_detail:'Ingrandisci dettaglio',product_detail:'Dettaglio',product_original_box:'scatola originale'
    },
    en:{
      page_home:'Bluèlle — Luxury Second Hand',page_about:'About us — Bluèlle',page_collection:'Collection — Bluèlle',page_faq:'FAQ — Bluèlle',page_tracking:'Order tracking — Bluèlle',page_contact:'Contact — Bluèlle',page_account:'Account — Bluèlle',page_terms:'Terms of Service and Privacy — Bluèlle',
      nav_main:'Main navigation',nav_home:'Home',nav_about:'About us',nav_coll:'Collection',nav_faq:'FAQ',nav_tracking:'Tracking',nav_contact:'Contact',nav_account:'Account',nav_menu:'Menu',nav_open_menu:'Open menu',nav_close_menu:'Close menu',picker_search:'Search…',picker_currency_aria:'Choose currency',picker_language_aria:'Choose language',picker_currency_search:'Search currencies…',picker_language_search:'Search languages…',picker_empty:'No results',
      footer_tag:'Luxury second hand, selected,<br>authenticated and cared for by hand.',footer_shop:'Shop',footer_help:'Help',footer_track:'Order tracking',footer_terms:'Terms &amp; Conditions',footer_follow:'Follow us',footer_secure:'Secure payments',footer_bottom:'© 2026 Bluèlle — Curated Luxury Resale · Secure payment via Stripe',
      video_play:'Play video',video_pause:'Pause video',video_mute:'Mute video',video_unmute:'Unmute video',
      shop_all_sizes:'All sizes',shop_product_one:'Product',shop_products_many:'Products',cat_all:'View all',cat_knit:'Knitwear',cat_tshirt:'T-Shirts',cat_sweatshirts:'Sweatshirts',cat_trousers:'Trousers',cat_polo:'Polo shirts',cat_jackets:'Jackets',cat_bags:'Bags',cat_shoes:'Shoes',cat_accessories:'Accessories',
      product_desc:'{name}. Colour: {color}. Fit: {fit}. Condition: {condition}. Selected and authenticated by Bluèlle.',product_whatsapp:'Hello, I am writing about this piece: {name}',product_video:'Product video',product_photo:'Product photo',product_gallery:'Product photos',product_choose_image:'Choose an image',product_show_photo:'Show photo {number}',product_main_photo:'main photo',product_back:'back',product_closeup:'A closer look',product_zoom_photo:'Enlarge photo',product_zoom_detail:'Enlarge detail',product_detail:'Detail',product_original_box:'original box'
    },
    fr:{
      page_home:'Bluèlle — Luxe de seconde main',page_about:'À propos — Bluèlle',page_collection:'Collection — Bluèlle',page_faq:'FAQ — Bluèlle',page_tracking:'Suivi de commande — Bluèlle',page_contact:'Contact — Bluèlle',page_account:'Compte — Bluèlle',page_terms:'Conditions de service et confidentialité — Bluèlle',
      nav_main:'Navigation principale',nav_home:'Accueil',nav_about:'À propos',nav_coll:'Collection',nav_faq:'FAQ',nav_tracking:'Suivi',nav_contact:'Contact',nav_account:'Compte',nav_menu:'Menu',nav_open_menu:'Ouvrir le menu',nav_close_menu:'Fermer le menu',picker_search:'Rechercher…',picker_currency_aria:'Choisir la devise',picker_language_aria:'Choisir la langue',picker_currency_search:'Rechercher une devise…',picker_language_search:'Rechercher une langue…',picker_empty:'Aucun résultat',
      footer_tag:'Luxe de seconde main, sélectionné,<br>authentifié et soigné à la main.',footer_shop:'Boutique',footer_help:'Assistance',footer_track:'Suivi de commande',footer_terms:'Conditions générales',footer_follow:'Suivez-nous',footer_secure:'Paiements sécurisés',footer_bottom:'© 2026 Bluèlle — Curated Luxury Resale · Paiement sécurisé via Stripe',
      video_play:'Lire la vidéo',video_pause:'Mettre la vidéo en pause',video_mute:'Couper le son',video_unmute:'Activer le son',
      shop_all_sizes:'Toutes les tailles',shop_product_one:'Article',shop_products_many:'Articles',cat_all:'Tout afficher',cat_knit:'Maille',cat_tshirt:'T-shirts',cat_sweatshirts:'Sweats',cat_trousers:'Pantalons',cat_polo:'Polos',cat_jackets:'Vestes',cat_bags:'Sacs',cat_shoes:'Chaussures',cat_accessories:'Accessoires',
      product_desc:'{name}. Couleur : {color}. Coupe : {fit}. État : {condition}. Sélectionné et authentifié par Bluèlle.',product_whatsapp:'Bonjour, je vous écris au sujet de cette pièce : {name}',product_video:'Vidéo du produit',product_photo:'Photo du produit',product_gallery:'Photos du produit',product_choose_image:'Choisir une image',product_show_photo:'Afficher la photo {number}',product_main_photo:'photo principale',product_back:'dos',product_closeup:'La pièce de près',product_zoom_photo:'Agrandir la photo',product_zoom_detail:'Agrandir le détail',product_detail:'Détail',product_original_box:'boîte d’origine'
    },
    es:{
      page_home:'Bluèlle — Lujo de segunda mano',page_about:'Quiénes somos — Bluèlle',page_collection:'Colección — Bluèlle',page_faq:'Preguntas frecuentes — Bluèlle',page_tracking:'Seguimiento de pedido — Bluèlle',page_contact:'Contacto — Bluèlle',page_account:'Cuenta — Bluèlle',page_terms:'Términos del servicio y privacidad — Bluèlle',
      nav_main:'Navegación principal',nav_home:'Inicio',nav_about:'Quiénes somos',nav_coll:'Colección',nav_faq:'Preguntas',nav_tracking:'Seguimiento',nav_contact:'Contacto',nav_account:'Cuenta',nav_menu:'Menú',nav_open_menu:'Abrir menú',nav_close_menu:'Cerrar menú',picker_search:'Buscar…',picker_currency_aria:'Elegir moneda',picker_language_aria:'Elegir idioma',picker_currency_search:'Buscar monedas…',picker_language_search:'Buscar idiomas…',picker_empty:'Sin resultados',
      footer_tag:'Lujo de segunda mano, seleccionado,<br>autenticado y cuidado a mano.',footer_shop:'Tienda',footer_help:'Ayuda',footer_track:'Seguimiento del pedido',footer_terms:'Términos y condiciones',footer_follow:'Síguenos',footer_secure:'Pagos seguros',footer_bottom:'© 2026 Bluèlle — Curated Luxury Resale · Pago seguro mediante Stripe',
      video_play:'Reproducir vídeo',video_pause:'Pausar vídeo',video_mute:'Silenciar vídeo',video_unmute:'Activar sonido',
      shop_all_sizes:'Todas las tallas',shop_product_one:'Producto',shop_products_many:'Productos',cat_all:'Ver todo',cat_knit:'Punto',cat_tshirt:'Camisetas',cat_sweatshirts:'Sudaderas',cat_trousers:'Pantalones',cat_polo:'Polos',cat_jackets:'Chaquetas',cat_bags:'Bolsos',cat_shoes:'Calzado',cat_accessories:'Accesorios',
      product_desc:'{name}. Color: {color}. Corte: {fit}. Estado: {condition}. Seleccionado y autenticado por Bluèlle.',product_whatsapp:'Hola, escribo por esta prenda: {name}',product_video:'Vídeo del producto',product_photo:'Foto del producto',product_gallery:'Fotos del producto',product_choose_image:'Elegir una imagen',product_show_photo:'Mostrar foto {number}',product_main_photo:'foto principal',product_back:'parte trasera',product_closeup:'La prenda de cerca',product_zoom_photo:'Ampliar foto',product_zoom_detail:'Ampliar detalle',product_detail:'Detalle',product_original_box:'caja original'
    },
    de:{
      page_home:'Bluèlle — Luxury Second Hand',page_about:'Über uns — Bluèlle',page_collection:'Kollektion — Bluèlle',page_faq:'FAQ — Bluèlle',page_tracking:'Sendungsverfolgung — Bluèlle',page_contact:'Kontakt — Bluèlle',page_account:'Konto — Bluèlle',page_terms:'Nutzungsbedingungen und Datenschutz — Bluèlle',
      nav_main:'Hauptnavigation',nav_home:'Startseite',nav_about:'Über uns',nav_coll:'Kollektion',nav_faq:'FAQ',nav_tracking:'Tracking',nav_contact:'Kontakt',nav_account:'Konto',nav_menu:'Menü',nav_open_menu:'Menü öffnen',nav_close_menu:'Menü schließen',picker_search:'Suchen…',picker_currency_aria:'Währung auswählen',picker_language_aria:'Sprache auswählen',picker_currency_search:'Währungen durchsuchen…',picker_language_search:'Sprachen durchsuchen…',picker_empty:'Keine Ergebnisse',
      footer_tag:'Luxury Second Hand, ausgewählt,<br>authentifiziert und von Hand gepflegt.',footer_shop:'Shop',footer_help:'Service',footer_track:'Bestellung verfolgen',footer_terms:'AGB &amp; Datenschutz',footer_follow:'Folge uns',footer_secure:'Sichere Zahlungen',footer_bottom:'© 2026 Bluèlle — Curated Luxury Resale · Sichere Zahlung über Stripe',
      video_play:'Video abspielen',video_pause:'Video pausieren',video_mute:'Video stummschalten',video_unmute:'Videoton einschalten',
      shop_all_sizes:'Alle Größen',shop_product_one:'Produkt',shop_products_many:'Produkte',cat_all:'Alle anzeigen',cat_knit:'Strick',cat_tshirt:'T-Shirts',cat_sweatshirts:'Sweatshirts',cat_trousers:'Hosen',cat_polo:'Poloshirts',cat_jackets:'Jacken',cat_bags:'Taschen',cat_shoes:'Schuhe',cat_accessories:'Accessoires',
      product_desc:'{name}. Farbe: {color}. Passform: {fit}. Zustand: {condition}. Von Bluèlle ausgewählt und authentifiziert.',product_whatsapp:'Hallo, ich interessiere mich für dieses Stück: {name}',product_video:'Produktvideo',product_photo:'Produktfoto',product_gallery:'Produktfotos',product_choose_image:'Bild auswählen',product_show_photo:'Foto {number} anzeigen',product_main_photo:'Hauptfoto',product_back:'Rückseite',product_closeup:'Das Stück aus der Nähe',product_zoom_photo:'Foto vergrößern',product_zoom_detail:'Detail vergrößern',product_detail:'Detail',product_original_box:'Originalverpackung'
    }
  };

  function merge(bundle,overwrite){
    LOCALES.forEach(function(locale){
      var source=bundle&&bundle[locale];
      if(!source)return;
      Object.keys(source).forEach(function(key){
        if(overwrite||messages[locale][key]===undefined)messages[locale][key]=String(source[key]);
      });
    });
  }

  function normalizeLocale(locale){
    var code=String(locale||'it').toLowerCase().split('-')[0];
    return LOCALES.indexOf(code)>-1?code:'it';
  }

  function interpolate(value,vars){
    if(!vars)return value;
    return String(value).replace(/\{([a-zA-Z0-9_]+)\}/g,function(_,key){
      return Object.prototype.hasOwnProperty.call(vars,key)?String(vars[key]):'';
    });
  }

  function t(key,vars,locale){
    var lang=normalizeLocale(locale||(typeof document!=='undefined'&&document.documentElement.lang)||'it');
    var value=messages[lang][key];
    if(value===undefined)value=messages.it[key];
    return value===undefined?key:interpolate(value,vars);
  }

  function apply(locale,root){
    if(typeof document==='undefined')return;
    var lang=normalizeLocale(locale);
    var scope=root&&root.querySelectorAll?root:document;
    document.documentElement.lang=lang;
    document.documentElement.dir=lang==='ar'?'rtl':'ltr';
    scope.querySelectorAll('[data-i]').forEach(function(el){
      var key=el.getAttribute('data-i');
      if(messages[lang][key]!==undefined||messages.it[key]!==undefined)el.innerHTML=t(key,null,lang);
    });
    [
      ['data-i-placeholder','placeholder'],
      ['data-i-aria','aria-label'],
      ['data-i-alt','alt'],
      ['data-i-title','title'],
      ['data-i-content','content']
    ].forEach(function(pair){
      scope.querySelectorAll('['+pair[0]+']').forEach(function(el){
        var key=el.getAttribute(pair[0]);
        if(messages[lang][key]!==undefined||messages.it[key]!==undefined)el.setAttribute(pair[1],t(key,null,lang));
      });
    });
    try{document.dispatchEvent(new CustomEvent('bl:languagechange',{detail:{language:lang}}));}catch(_e){}
  }

  function register(bundle){
    merge(bundle,false);
    if(typeof document!=='undefined'&&document.readyState!=='loading')apply(document.documentElement.lang||'it');
  }

  merge(common,true);
  global.BL_I18N={locales:LOCALES.slice(),messages:messages,register:register,apply:apply,t:t,normalizeLocale:normalizeLocale};

  if(typeof document!=='undefined'){
    var boot=function(){
      var lang='it';
      try{lang=localStorage.getItem('bl_lang')||document.documentElement.lang||'it';}catch(_e){lang=document.documentElement.lang||'it';}
      apply(lang);
    };
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
    else boot();
  }
})(window);
