/* Collection preview: retains the existing catalog, localization and product navigation. */
(()=>{
  const grid=document.getElementById('grid'), panel=document.getElementById('shopadv');
  if(!grid||!panel)return;
  const catalog=window.collectionCatalog,prods=catalog.products,BRAND_NAME=catalog.brands;
  const titles={it:'Il dettaglio fa la differenza.',en:'The detail makes the difference.',fr:'Le détail fait la différence.',de:'Das Detail macht den Unterschied.',es:'El detalle marca la diferencia.',pt:'O detalhe faz a diferença.',nl:'Het detail maakt het verschil.',pl:'Detal robi różnicę.',ru:'Всё дело в деталях.',uk:'Усе вирішують деталі.',ar:'التفاصيل تصنع الفرق.',zh:'细节成就不同。',ja:'違いを生む、ディテール。',ko:'차이를 만드는 디테일.',tr:'Farkı detaylar yaratır.',sv:'Detaljen gör skillnaden.',da:'Detaljen gør forskellen.',fi:'Yksityiskohta tekee eron.',el:'Η λεπτομέρεια κάνει τη διαφορά.'};
  const condKeys={'Ottima':'cond_great','Molto buono':'cond_vgood','Molto Buona':'cond_vgood','Buona':'cond_good','Buono':'cond_good','Eccellente':'cond_mint','Nuovo':'cond_new'};
  titles.ro='Detaliul face diferența.';titles.no='Detaljene gjør forskjellen.';
  const condition=p=>catalog.pack()[condKeys[p.cond]]||p.cond;
  const dialog=document.createElement('dialog');dialog.className='collection-dialog';
  dialog.innerHTML='<header class="collection-dialog-header"><h2 id="gallery-filter-title"></h2><button class="collection-dialog-close" type="button">×</button></header>';
  dialog.setAttribute('aria-labelledby','gallery-filter-title');document.body.append(dialog);dialog.append(panel);
  panel.hidden=false;panel.setAttribute('data-lenis-prevent','');
  const extra=document.createElement('div');extra.className='gallery-extra';
  extra.innerHTML='<label class="gallery-filter-label" for="gallery-condition"></label><select id="gallery-condition"></select><div class="gallery-price-pair"><label>€ ≥<input id="gallery-min" type="number" min="0" step="1" aria-label="€ ≥"></label><label>€ ≤<input id="gallery-max" type="number" min="0" step="1" aria-label="€ ≤"></label></div>';
  panel.append(extra);
  const show=document.createElement('button');show.className='gallery-show';show.type='button';panel.append(show);
  const reset=document.createElement('button');reset.className='gallery-reset';reset.type='button';panel.append(reset);
  const min=extra.querySelector('#gallery-min'),max=extra.querySelector('#gallery-max'),select=extra.querySelector('select');
  window.collectionAccept=p=>(min.value===''||p.price>=Number(min.value))&&(max.value===''||p.price<=Number(max.value))&&(!select.value||condKeys[p.cond]===select.value);
  const active=()=>{const {curCat,curFilter,curSize,curQ,availOnly,curSort}=catalog.state();return curCat!=='all'||curFilter!=='all'||curSize!=='all'||curQ||availOnly||curSort!=='feat'||min.value!==''||max.value!==''||select.value;};
  function decorate(){
    const curLang=catalog.lang();
    const cards=[...grid.querySelectorAll('.pc')];
    cards.forEach(card=>{
      const id=Number(card.querySelector('[data-id]')?.dataset.id),p=prods.find(x=>x.id===id);if(!p)return;
      const info=card.querySelector('.pinfo'),brand=document.createElement('div');
      brand.className='gallery-brand';brand.textContent=BRAND_NAME[p.brand]||p.brand;info.prepend(brand);
      const name=card.querySelector('.pname');name.textContent=name.textContent.replace(new RegExp('^'+(BRAND_NAME[p.brand]||p.brand)+'\\s+','i'),'');
      card.querySelector('.psub').textContent=[p.sz?siteText('product_spec_size','Taglia')+' '+p.sz:'',condition(p)].filter(Boolean).join(' · ');
      if(!p.sold){
        card.tabIndex=0;card.setAttribute('role','link');card.setAttribute('aria-label',(BRAND_NAME[p.brand]||p.brand)+' '+name.textContent);
        card.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();card.click();}});
      }
    });
    if(!active()&&cards.length>=6){
      const p=prods.find(x=>x.id===1&&!x.sold);
      if(p){
        const story=document.createElement('section');story.className='collection-story';
        story.innerHTML='<div class="collection-story-photo"><img src="img/p1-f1.jpg" loading="lazy" alt="'+escAttr(translateName(p.name,curLang))+'"></div><div class="collection-story-copy"><small>BLUÈLLE — GUCCI</small><h2></h2><a href="#p1"></a></div>';
        story.querySelector('h2').textContent=titles[curLang]||titles.en;
        story.querySelector('a').textContent=siteText('product_details_heading','Dettagli')+' →';
        story.querySelector('a').addEventListener('click',e=>{e.preventDefault();openM(1);});
        cards[5].after(story);
      }
    }
    show.textContent=document.getElementById('resCount').textContent+' →';
    reset.textContent='↺ '+catLabel('all');
    document.getElementById('gallery-filter-title').textContent=siteText('shop_filters','Filtri');
    dialog.querySelector('.collection-dialog-close').setAttribute('aria-label',siteText('checkout_close_aria','Chiudi'));
    extra.querySelector('.gallery-filter-label').textContent=siteText('product_spec_condition','Condizione');
    const selected=select.value;select.replaceChildren();
    const opts=[['',catalog.pack().all||'All'],...Array.from(new Set(prods.map(p=>condKeys[p.cond]).filter(Boolean))).map(k=>[k,catalog.pack()[k]||k])];
    opts.forEach(([value,label])=>select.add(new Option(label,value)));select.value=selected;
    [['brandPills','product_spec_brand','Marca'],['sizePills','product_spec_size','Taglia']].forEach(([id,key,fallback])=>{
      const group=document.getElementById(id);let label=group.parentElement.querySelector('.gallery-filter-label');
      if(!label){label=document.createElement('span');label.className='gallery-filter-label';group.before(label);}label.textContent=siteText(key,fallback);
    });
  }
  window.collectionDecorate=decorate;
  reset.addEventListener('click',()=>{catalog.reset();min.value='';max.value='';select.value='';document.getElementById('q').value='';document.getElementById('availOnly').checked=false;document.getElementById('sortSel').value='feat';render();});
  [min,max].forEach(el=>el.addEventListener('input',()=>render()));select.addEventListener('change',()=>render());
  window.toggleFilters=function(){
    if(dialog.open){dialog.close();return;}
    dialog.showModal();document.getElementById('filToggle').setAttribute('aria-expanded','true');
    window.BLUELLE_LENIS?.stop();
  };
  const close=()=>dialog.close();
  dialog.querySelector('.collection-dialog-close').addEventListener('click',close);show.addEventListener('click',close);
  dialog.addEventListener('click',e=>{if(e.target===dialog){const b=dialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right)close();}});
  dialog.addEventListener('close',()=>{document.getElementById('filToggle').setAttribute('aria-expanded','false');window.BLUELLE_LENIS?.start();document.getElementById('filToggle').focus();});
  render();
})();
