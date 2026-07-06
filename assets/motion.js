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
    duration:.9,
    smoothWheel:true,
    wheelMultiplier:.9,
    touchMultiplier:1.06,
    anchors:{
      offset:-86,
      duration:1,
      easing:function(t){return Math.min(1,1-Math.pow(1-t,3));}
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
    if(tb)tb.classList.toggle('gone',y>60);
    if(y>lastY&&y>420)nav.classList.add('hide');
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

  gsap.from('.heye,.hrule,.hsub,.hcta', {
    autoAlpha:0,
    y:22,
    duration:.95,
    stagger:.12,
    ease:'power3.out',
    delay:document.getElementById('intro')?.style.display==='none'?0:.35
  });

  gsap.utils.toArray('.man-body,.man-foot,.efig,.prow,.auth-check,.iris-step,.save-stat,.faq-item,.cform,.ci,footer,.psec,#trkintro').forEach(function(el,i){
    gsap.from(el,{
      autoAlpha:0,
      y:34,
      duration:.9,
      delay:Math.min((i%4)*.035,.12),
      ease:'power3.out',
      clearProps:'opacity,visibility,transform',
      scrollTrigger:{trigger:el,start:'top 86%',once:true}
    });
  });

  gsap.utils.toArray('.imr img,.pgallery img').forEach(function(img){
    gsap.fromTo(img,{scale:1.045},{scale:1,duration:1.4,ease:'power3.out',scrollTrigger:{trigger:img,start:'top 92%',once:true}});
  });

  bindHoverMotion();
  animateCards();
  observeDynamicMotion();
}

function initLogoJourney(){
  var section=document.getElementById('logo-journey');
  if(!section)return;

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
    var panels=section.querySelectorAll('.lj-panel-1,.lj-panel-2,.lj-panel-3');
    var panel1=section.querySelector('.lj-panel-1');
    var panel2=section.querySelector('.lj-panel-2');
    var panel3=section.querySelector('.lj-panel-3');
    var final=section.querySelector('.lj-final');
    var shots=section.querySelectorAll('.lj-shot');
    if(!pin||!mark||!mega)return;
    var hideTargets=Array.prototype.slice.call(panels).concat([final],Array.prototype.slice.call(shots));

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
    gsap.set(mark,{autoAlpha:1,scale:1,y:0,letterSpacing:'0em',force3D:true});
    gsap.set(mega,{autoAlpha:0,y:0,scale:1,letterSpacing:'0em',force3D:true});

    tl.fromTo(panel1,{autoAlpha:0,y:30},{autoAlpha:1,y:0,duration:.34,ease:'power3.out'},.1)
      .to(mark,{scale:markPeak,autoAlpha:.22,y:isMobile?-12:-18,duration:.68,ease:'power2.inOut'},.24)
      .to(mega,{autoAlpha:.13,y:isMobile?-18:-28,duration:.68,ease:'power2.out'},.24)
      .to(bg,{scale:1.04,opacity:.96,duration:.7,ease:'power2.out'},.24)
      .to(panel1,{autoAlpha:0,y:-34,duration:.24,ease:'power2.in'},.82)
      .to(mark,{scale:markEnd,autoAlpha:.08,y:isMobile?-30:-48,duration:.65,ease:'power2.inOut'},.82)
      .to(mega,{autoAlpha:.16,y:megaShift*.55,duration:.65,ease:'power2.inOut'},.82)
      .fromTo(panel2,{autoAlpha:0,y:34},{autoAlpha:1,y:0,duration:.34,ease:'power3.out'},1)
      .to('.lj-shot-a',{autoAlpha:1,y:0,rotation:-3,duration:.48,ease:'power3.out'},1.08)
      .to('.lj-shot-b',{autoAlpha:1,y:0,rotation:4,duration:.48,ease:'power3.out'},1.18)
      .to(panel2,{autoAlpha:0,y:-38,duration:.26,ease:'power2.in'},1.54)
      .to(mark,{autoAlpha:0,scale:markEnd*1.03,y:isMobile?-38:-62,duration:.42,ease:'power2.out'},1.5)
      .to(mega,{autoAlpha:.11,y:megaShift,letterSpacing:'.012em',duration:.72,ease:'power2.inOut'},1.5)
      .fromTo(panel3,{autoAlpha:0,y:36},{autoAlpha:1,y:0,duration:.34,ease:'power3.out'},1.74)
      .to('.lj-shot-c',{autoAlpha:1,y:0,rotation:0,duration:.48,ease:'power3.out'},1.82)
      .to('.lj-shot-a',{x:isMobile?'5vw':'7vw',y:isMobile?'6vh':'9vh',rotation:-1,duration:.72,ease:'power2.inOut'},1.9)
      .to('.lj-shot-b',{x:isMobile?'-5vw':'-7vw',y:isMobile?'7vh':'10vh',rotation:2,duration:.72,ease:'power2.inOut'},1.9)
      .to(panel3,{autoAlpha:0,y:-38,duration:.28,ease:'power2.in'},2.3)
      .to(mega,{autoAlpha:.06,y:megaShift*1.2,duration:.6,ease:'power2.inOut'},2.26)
      .to(bg,{scale:1.12,opacity:.58,duration:.64,ease:'power2.inOut'},2.26)
      .to(shots,{autoAlpha:.38,duration:.36,ease:'power2.out'},2.56)
      .fromTo(final,{autoAlpha:0,y:22},{autoAlpha:1,y:0,duration:.36,ease:'power3.out'},2.62)
      .set(final,{pointerEvents:'auto'},2.64)
      .to('.lj-scroll',{autoAlpha:0,duration:.18},.5);
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
  document.querySelectorAll('.hcta,.lj-button,.pill,.filtoggle,.mbuy,.ck-submit,.track-btn,.geo-confirm,.cf-submit,.iglink,.pback').forEach(function(el){
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
        animateCards();
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
