/* Bluèlle — motion layer (cursor, split-text, veil transitions, parallax, nav) */
(function(){
'use strict';
var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var gsap=window.gsap;
var ScrollTrigger=window.ScrollTrigger;
var Lenis=window.Lenis;
var hasGsap=!!(gsap&&ScrollTrigger);
var lenis=null;
if(hasGsap){
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('gsap-ready');
}

/* ── LENIS SMOOTH SCROLL ──────────────────────────── */
function initLenis(){
  if(reduced||!Lenis)return;
  lenis=new Lenis({
    duration:.82,
    smoothWheel:true,
    wheelMultiplier:1,
    touchMultiplier:1.06,
    anchors:{
      offset:-86,
      duration:1.04,
      easing:function(t){return Math.min(1,1-Math.pow(1-t,4));}
    }
  });
  window.BLUELLE_LENIS=lenis;
  if(hasGsap){
    lenis.on('scroll',ScrollTrigger.update);
    gsap.ticker.add(function(time){lenis.raf(time*1000);});
    gsap.ticker.lagSmoothing(0);
  }else{
    var raf=function(time){lenis.raf(time);requestAnimationFrame(raf);};
    requestAnimationFrame(raf);
  }
}
initLenis();

/* ── HOME VIDEO PLACEHOLDERS ─────────────────────── */
function initHomeVideos(){
  var videos=Array.prototype.slice.call(document.querySelectorAll('#home-showcase video'));
  if(!videos.length)return;
  function safePlay(video){
    video.muted=true;
    video.playsInline=true;
    var p=video.play();
    if(p&&p.catch)p.catch(function(){});
  }
  function isVisible(video){
    var r=video.getBoundingClientRect();
    var vh=window.innerHeight||document.documentElement.clientHeight;
    return r.top<vh*.92&&r.bottom>0;
  }
  function syncVideos(){
    videos.forEach(function(video){
      if(isVisible(video))safePlay(video);
      else video.pause();
    });
  }
  if('IntersectionObserver' in window){
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        var video=entry.target;
        if(entry.isIntersecting){
          safePlay(video);
        }else if(!isVisible(video)){
          video.pause();
        }
      });
    },{threshold:.18,rootMargin:'20% 0px'});
    videos.forEach(function(video){obs.observe(video);});
  }else{
    videos.forEach(safePlay);
  }
  window.addEventListener('scroll',syncVideos,{passive:true});
  window.addEventListener('resize',syncVideos,{passive:true});
  if(window.BLUELLE_LENIS&&window.BLUELLE_LENIS.on){window.BLUELLE_LENIS.on('scroll',syncVideos);}
  document.addEventListener('visibilitychange',function(){
    if(!document.hidden)syncVideos();
  });
  window.addEventListener('pageshow',syncVideos);
  syncVideos();
  setTimeout(syncVideos,400);
  setTimeout(syncVideos,1200);
  setInterval(syncVideos,1400);
}
initHomeVideos();

/* ── PAGE TRANSITION VEIL ─────────────────────────── */
var veil=document.createElement('div');
veil.className='ptv';
veil.innerHTML='<span class="ptv-mark brand-word" aria-label="Bluèlle"><span>Blu</span><em>è</em><span>lle</span></span>';
document.body.appendChild(veil);
var cameFromInternal=false;
try{cameFromInternal=sessionStorage.getItem('bl_nav')==='1';sessionStorage.removeItem('bl_nav');}catch(e){}
if(cameFromInternal && !document.getElementById('intro') && !reduced){
  veil.classList.add('out');
  veil.addEventListener('animationend',function(){veil.classList.remove('out');});
}
document.addEventListener('click',function(e){
  if(reduced)return;
  var a=e.target.closest&&e.target.closest('a[href]');
  if(!a)return;
  var href=a.getAttribute('href')||'';
  if(a.target==='_blank'||href.indexOf('#')===0||/^https?:\/\//.test(href)&&a.host!==location.host)return;
  if(!/\.html(\?|#|$)/.test(href)&&href!=='/'&&href!=='')return;
  if(/^https?:\/\//.test(href)&&a.host!==location.host)return;
  // same-page anchor with hash to same file
  var clean=href.split('#')[0];
  var cur=location.pathname.split('/').pop()||'index.html';
  if(clean===''||clean===cur){return;}
  e.preventDefault();
  try{sessionStorage.setItem('bl_nav','1');}catch(err){}
  veil.classList.add('in');
  setTimeout(function(){location.href=href;},560);
},true);

/* ── SPLIT-TEXT REVEAL ────────────────────────────── */
function splitEl(el){
  if(el.dataset.split==='done')return;
  el.dataset.split='done';
  el.classList.add('sr');
  var walk=function(node){
    var kids=Array.prototype.slice.call(node.childNodes);
    kids.forEach(function(ch){
      if(ch.nodeType===3){
        var frag=document.createDocumentFragment();
        ch.textContent.split(/(\s+)/).forEach(function(tok){
          if(!tok)return;
          if(/^\s+$/.test(tok)){frag.appendChild(document.createTextNode(' '));return;}
          var w=document.createElement('span');w.className='w';
          var wi=document.createElement('span');wi.className='wi';wi.textContent=tok;
          w.appendChild(wi);frag.appendChild(w);
        });
        node.replaceChild(frag,ch);
      }else if(ch.nodeType===1&&!/^(BR)$/.test(ch.tagName)){
        walk(ch);
      }
    });
  };
  walk(el);
  var wis=el.querySelectorAll('.wi');
  wis.forEach(function(wi,i){wi.style.transitionDelay=(i*55)+'ms';});
}
function splitAll(){
  if(reduced)return;
  document.querySelectorAll('[data-split], .htitle, .sec-title, .man-title, .cf-big, .auth-word, .value-lead').forEach(function(el){
    splitEl(el);
    srObs.observe(el);
  });
}
var srObs=new IntersectionObserver(function(entries){
  entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');srObs.unobserve(e.target);}});
},{threshold:.2,rootMargin:'0px 0px -6% 0px'});
splitAll();
/* re-split after language switch (app.js redefines innerHTML) */
if(typeof window.setLang==='function'){
  var _setLang=window.setLang;
  window.setLang=function(l){
    _setLang(l);
    document.querySelectorAll('[data-split="done"]').forEach(function(el){
      /* text was replaced only inside [data-i] children; re-run walk */
      el.dataset.split='';
    });
    splitAll();
    document.querySelectorAll('.sr').forEach(function(el){
      var r=el.getBoundingClientRect();
      if(r.top<window.innerHeight)el.classList.add('visible');
    });
  };
}

/* ── IMAGE CURTAIN REVEAL ─────────────────────────── */
var imObs=new IntersectionObserver(function(entries){
  entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');imObs.unobserve(e.target);}});
},{threshold:.18});
document.querySelectorAll('.imr').forEach(function(el){imObs.observe(el);});

/* ── REVEAL FALLBACK (robusto: non dipende da IntersectionObserver,
      che non fira su tab nascoste o con alcuni setup di smooth-scroll).
      Garantisce che i contenuti compaiano sempre, mai bloccati invisibili. */
(function(){
  function revealInView(){
    var vh=window.innerHeight||document.documentElement.clientHeight;
    var els=document.querySelectorAll('.reveal:not(.visible),.sr:not(.visible),.imr:not(.visible),.reveal-left:not(.visible),.reveal-right:not(.visible),.reveal-scale:not(.visible)');
    for(var i=0;i<els.length;i++){
      var r=els[i].getBoundingClientRect();
      if(r.top<vh*0.94 && r.bottom>-40){els[i].classList.add('visible');}
    }
  }
  window.addEventListener('scroll',revealInView,{passive:true});
  window.addEventListener('resize',revealInView,{passive:true});
  window.addEventListener('load',revealInView);
  document.addEventListener('visibilitychange',function(){if(!document.hidden)revealInView();});
  if(window.BLUELLE_LENIS&&window.BLUELLE_LENIS.on){window.BLUELLE_LENIS.on('scroll',revealInView);}
  revealInView();
  setTimeout(revealInView,250);
  setTimeout(revealInView,900);
  setTimeout(revealInView,1800);
})();

/* ── PARALLAX ─────────────────────────────────────── */
var plx=Array.prototype.slice.call(document.querySelectorAll('[data-plx]'));
if(plx.length&&!reduced){
  var pTick=false;
  var drive=function(){
    pTick=false;
    var vh=window.innerHeight;
    plx.forEach(function(el){
      var r=el.getBoundingClientRect();
      if(r.bottom<0||r.top>vh)return;
      var sp=parseFloat(el.dataset.plx)||.12;
      var c=(r.top+r.height/2-vh/2);
      el.style.transform='translateY('+(-c*sp).toFixed(1)+'px)';
    });
  };
  window.addEventListener('scroll',function(){if(!pTick){requestAnimationFrame(drive);pTick=true;}},{passive:true});
  drive();
}

/* ── NAV hide on scroll down / topbar retreat ─────── */
(function(){
  var nav=document.getElementById('nav');
  var tb=document.getElementById('topbar');
  if(!nav)return;
  var lastY=0,tick=false;
  var run=function(){
    tick=false;
    var y=window.scrollY;
    var picker=document.getElementById('pickerPanel');
    var pickerOpen=picker&&!picker.hasAttribute('hidden');
    if(tb)tb.classList.toggle('gone',y>60&&!pickerOpen);
    if(y>lastY&&y>150)nav.classList.add('hide');
    else nav.classList.remove('hide');
    lastY=y;
  };
  window.addEventListener('scroll',function(){if(!tick){requestAnimationFrame(run);tick=true;}},{passive:true});
})();

/* ── open product from hash (deep-link) ───────────── */
(function(){
  var m=(location.hash||'').match(/^#p(\d+)$/);
  if(m&&typeof window.openM==='function'){
    setTimeout(function(){
      try{window.openM(+m[1]);}catch(e){}
    },350);
  }
})();

/* ── GSAP POLISH ──────────────────────────────────── */
function initGsapPolish(){
  if(!hasGsap||reduced)return;

  initLogoJourney();
  initHomeShowcase();
  initPaymentsStory();

  /* NB: i reveal in opacity dei contenuti sono gestiti dal sistema CSS + IntersectionObserver
     (classe .reveal in app.js). NON usare GSAP autoAlpha sui contenuti: sotto la piega o con
     Lenis il ScrollTrigger può non completare e lasciare i blocchi invisibili. */

  gsap.utils.toArray('.imr img,.pgallery img').forEach(function(img){
    gsap.fromTo(img,{scale:1.045},{scale:1,duration:1.4,ease:'power3.out',scrollTrigger:{trigger:img,start:'top 92%',once:true}});
  });

  /* Reveal stile Patek sull'immagine autenticità: scale legato allo scroll (scrub).
     L'immagine resta SEMPRE visibile (scala tra 1.12 e 1); non usa opacity/clip e
     non ha uno stato "nascosto", quindi non può restare invisibile se il pin dei
     video ricalcola le posizioni. */
  gsap.utils.toArray('.pk-reveal').forEach(function(fig){
    var img=fig.querySelector('img');
    if(!img)return;
    gsap.fromTo(img,{scale:1.12},{scale:1,ease:'none',
      scrollTrigger:{trigger:fig,start:'top bottom',end:'top 38%',scrub:.6,invalidateOnRefresh:true}});
  });

  bindHoverMotion();
  observeDynamicMotion();
}

function initHomeShowcase(){
  var section=document.getElementById('home-showcase');
  if(!section)return;
  var panels=gsap.utils.toArray(section.querySelectorAll('.rx-panel'));
  if(!panels.length)return;
  var syncQueued=false;

  function clamp(value,min,max){
    return Math.max(min,Math.min(max,value));
  }

  function syncPatekHome(){
    syncQueued=false;
    panels.forEach(function(panel){
      var rect=panel.getBoundingClientRect();
      var h=rect.height||((window.innerHeight||document.documentElement.clientHeight)*1.1);
      var top=rect.top;
      var media=panel.querySelector('.rx-panel-media');
      var copy=panel.querySelector('.rx-title,.rx-scene');

      if(media){
        var mediaY=clamp((-top*.733333)-(h/30),-(h*.7),h*.7);
        gsap.set(media,{y:mediaY,force3D:true});
      }
      if(copy){
        var copyRange=(copy.offsetHeight||220)/2;
        var copyY=clamp((-top/h)*copyRange,-copyRange,copyRange);
        gsap.set(copy,{y:copyY,autoAlpha:1,force3D:true});
      }
    });
  }

  function requestSync(){
    if(syncQueued)return;
    syncQueued=true;
    requestAnimationFrame(syncPatekHome);
  }

  ScrollTrigger.create({
    trigger:section,
    start:'top top',
    end:'bottom top',
    invalidateOnRefresh:true,
    onEnter:function(){document.body.classList.add('home-dark-nav');},
    onEnterBack:function(){document.body.classList.add('home-dark-nav');},
    onLeave:function(){document.body.classList.remove('home-dark-nav');},
    onLeaveBack:function(){document.body.classList.remove('home-dark-nav');},
    onUpdate:function(self){
      document.body.classList.toggle('home-dark-nav',self.progress<.985);
      syncPatekHome();
    }
  });

  ScrollTrigger.create({
    trigger:section,
    start:'top bottom',
    end:'bottom top',
    invalidateOnRefresh:true,
    onRefresh:syncPatekHome,
    onUpdate:syncPatekHome
  });

  gsap.set(panels.map(function(panel){return panel.querySelector('.rx-title,.rx-scene');}).filter(Boolean),{autoAlpha:1});
  window.addEventListener('scroll',requestSync,{passive:true});
  window.addEventListener('resize',requestSync,{passive:true});
  if(window.BLUELLE_LENIS&&window.BLUELLE_LENIS.on){window.BLUELLE_LENIS.on('scroll',syncPatekHome);}
  syncPatekHome();
  setTimeout(syncPatekHome,180);
  setTimeout(syncPatekHome,750);
}

function initPaymentsStory(){
  var section=document.getElementById('payments-story');
  if(!section)return;
  var wipe=section.querySelector('.pay-wipe');
  var img=section.querySelector('.pay-visual img');
  var copy=section.querySelector('.pay-copy');
  var photoCopy=section.querySelector('.pay-photo-copy');
  var terminal=section.querySelector('.pay-terminal');
  var rows=gsap.utils.toArray(section.querySelectorAll('.pay-options article'));
  var logos=gsap.utils.toArray(section.querySelectorAll('.pay-logo'));
  if(!wipe||!img||!copy)return;

  gsap.set(rows,{autoAlpha:0,y:18});
  gsap.set(logos,{autoAlpha:1,y:0});
  if(photoCopy)gsap.set(photoCopy,{autoAlpha:.94,y:22});
  var tl=gsap.timeline({
    defaults:{ease:'power3.out'},
    scrollTrigger:{
      trigger:section,
      start:'top 74%',
      end:'center 36%',
      scrub:.68,
      invalidateOnRefresh:true
    }
  });
  tl.to(wipe,{scaleX:0,duration:.62,ease:'power3.inOut'},0)
    .fromTo(img,{scale:1.04,y:18},{scale:1,y:0,duration:.9,ease:'power2.out'},0)
    .fromTo(copy,{y:46},{y:0,duration:.82,ease:'power2.out'},.03);
  if(terminal)tl.fromTo(terminal,{y:38},{y:0,duration:.78,ease:'power2.out'},.06);
  if(photoCopy)tl.to(photoCopy,{autoAlpha:1,y:0,duration:.56,ease:'power2.out'},.16);
  tl.to(rows,{autoAlpha:1,y:0,duration:.42,stagger:.055,ease:'power2.out'},.28)
    .fromTo(logos,{y:8},{y:0,duration:.32,stagger:.045,ease:'power2.out'},.46);
}

function initLogoJourney(){
  var section=document.getElementById('logo-journey');
  if(!section)return;
  if(section.classList.contains('media-journey'))return;

  var mm=gsap.matchMedia();
  mm.add('(min-width: 761px)',function(){
    buildLogoJourney(false);
  });
  mm.add('(max-width: 760px)',function(){
    buildLogoJourney(true);
  });

  function buildLogoJourney(isMobile){
    var pin=section.querySelector('.lj-pin');
    var bg=section.querySelector('.lj-bg');
    var mark=section.querySelector('.lj-mark');
    var mega=section.querySelector('.lj-mega');
    var panel1=section.querySelector('.lj-panel-1');
    var proof=section.querySelector('.lj-proof');
    var final=section.querySelector('.lj-final');
    var shots=section.querySelectorAll('.lj-shot');
    if(!pin||!mark||!mega||!panel1)return;
    var hideTargets=[panel1,proof,final].filter(Boolean).concat(Array.prototype.slice.call(shots));

    var markPeak=isMobile?1.72:2.18;
    var markEnd=isMobile?1.95:2.45;
    var megaShift=isMobile?-46:-82;

    var tl=gsap.timeline({
      defaults:{ease:'none'},
      scrollTrigger:{
        trigger:section,
        start:'top top',
        end:'bottom bottom',
        scrub:.35,
        pin:pin,
        pinSpacing:false,
        anticipatePin:1,
        invalidateOnRefresh:true
      }
    });

    gsap.set(hideTargets,{autoAlpha:0});
    gsap.set(final,{pointerEvents:'none'});
    gsap.set(panel1,{autoAlpha:1,y:0});
    if(proof)gsap.set(proof,{autoAlpha:1,y:0});
    gsap.set(mark,{autoAlpha:1,scale:1,y:0,letterSpacing:'0em',force3D:true});
    gsap.set(mega,{autoAlpha:0,y:0,scale:1,letterSpacing:'0em',force3D:true});

    tl.to(mark,{scale:markPeak,autoAlpha:.18,y:isMobile?-12:-18,duration:.78,ease:'power2.inOut'},.05)
      .to(mega,{autoAlpha:.08,y:isMobile?-18:-28,duration:.78,ease:'power2.out'},.05)
      .to(bg,{scale:1.03,opacity:.9,duration:.78,ease:'power2.out'},.05)
      .to(panel1,{autoAlpha:0,y:isMobile?-46:-62,duration:.36,ease:'power2.inOut'},1.02)
      .to(mark,{autoAlpha:0,scale:markEnd,y:isMobile?-34:-54,duration:.52,ease:'power2.out'},.98)
      .to(mega,{autoAlpha:.05,y:megaShift,letterSpacing:'.01em',duration:.66,ease:'power2.inOut'},.98)
      .to(bg,{scale:1.1,opacity:.56,duration:.62,ease:'power2.inOut'},1)
      .fromTo(final,{autoAlpha:0,y:22},{autoAlpha:1,y:0,duration:.38,ease:'power3.out'},1.4)
      .set(final,{pointerEvents:'auto'},1.44)
      .to('.lj-scroll',{autoAlpha:0,duration:.18},.5);
    if(shots.length){
      tl.to(shots,{autoAlpha:.22,duration:.32,ease:'power2.out'},1.14);
    }
  }
}

function animateCards(){
  if(!hasGsap||reduced)return;
  var cards=gsap.utils.toArray('.pc:not([data-gsap-card])');
  if(!cards.length)return;
  cards.forEach(function(card){card.dataset.gsapCard='true';});
  gsap.set(cards,{autoAlpha:0,y:34,scale:.985});
  ScrollTrigger.batch(cards,{
    interval:.08,
    batchMax:6,
    start:'top 90%',
    once:true,
    onEnter:function(batch){
      gsap.to(batch,{
        autoAlpha:1,
        y:0,
        scale:1,
        duration:.82,
        stagger:.06,
        ease:'power3.out',
        clearProps:'opacity,visibility,transform'
      });
    }
  });
}

function bindHoverMotion(){
  if(!hasGsap||reduced)return;
  document.querySelectorAll('.hcta,.rx-cta,.rx-scene a,.archive-feature,.archive-side button,.sell-cta,.lj-button,.pill,.filtoggle,.mbuy,.ck-submit,.track-btn,.geo-confirm,.cf-submit,.iglink,.pback').forEach(function(el){
    if(el.dataset.gsapHover==='true')return;
    el.dataset.gsapHover='true';
    el.addEventListener('pointerenter',function(){gsap.to(el,{y:-2,scale:1.012,duration:.28,ease:'power2.out'});});
    el.addEventListener('pointerleave',function(){gsap.to(el,{y:0,scale:1,duration:.34,ease:'power2.out'});});
  });
}

function observeDynamicMotion(){
  var grid=document.getElementById('grid');
  if(grid){
    new MutationObserver(function(){
      requestAnimationFrame(function(){
        bindHoverMotion();
        ScrollTrigger.refresh();
      });
    }).observe(grid,{childList:true});
  }
  var brandPills=document.getElementById('brandPills');
  var sizePills=document.getElementById('sizePills');
  [brandPills,sizePills].forEach(function(node){
    if(!node)return;
    new MutationObserver(function(){bindHoverMotion();}).observe(node,{childList:true});
  });
  window.addEventListener('load',function(){ScrollTrigger.refresh();},{once:true});
}
initGsapPolish();
})();
