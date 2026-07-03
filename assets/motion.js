/* Bluèlle — motion layer (cursor, split-text, veil transitions, parallax, nav) */
(function(){
'use strict';
var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── PAGE TRANSITION VEIL ─────────────────────────── */
var veil=document.createElement('div');
veil.className='ptv';
veil.innerHTML='<span class="ptv-mark">Bluèlle</span>';
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
})();
