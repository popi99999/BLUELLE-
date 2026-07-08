(function(){
  'use strict';

  const STORE_KEY='bluelle_accounts_v1';
  const SESSION_KEY='bluelle_session_v1';
  const $=function(sel,root){return (root||document).querySelector(sel);};
  const $$=function(sel,root){return Array.prototype.slice.call((root||document).querySelectorAll(sel));};

  function normalizeEmail(value){return String(value||'').trim().toLowerCase();}
  function validEmail(value){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);}

  function readAccounts(){
    try{
      const parsed=JSON.parse(localStorage.getItem(STORE_KEY)||'[]');
      return Array.isArray(parsed)?parsed:[];
    }catch(err){
      return [];
    }
  }

  function writeAccounts(accounts){localStorage.setItem(STORE_KEY,JSON.stringify(accounts));}

  function readSession(){
    try{return JSON.parse(localStorage.getItem(SESSION_KEY)||'null');}
    catch(err){return null;}
  }

  function writeSession(account){
    localStorage.setItem(SESSION_KEY,JSON.stringify({email:account.email,ts:Date.now()}));
  }

  function clearSession(){localStorage.removeItem(SESSION_KEY);}

  function fallbackHash(value){
    let h=2166136261;
    for(let i=0;i<value.length;i+=1){
      h^=value.charCodeAt(i);
      h=Math.imul(h,16777619);
    }
    return 'local-'+(h>>>0).toString(16);
  }

  async function hashPassword(value){
    if(window.crypto&&window.crypto.subtle&&window.TextEncoder){
      const data=new TextEncoder().encode(value);
      const digest=await window.crypto.subtle.digest('SHA-256',data);
      return Array.from(new Uint8Array(digest)).map(function(b){return b.toString(16).padStart(2,'0');}).join('');
    }
    return fallbackHash(value);
  }

  function status(message,type){
    const node=$('#accountStatus');
    if(!node)return;
    node.textContent=message||'';
    node.dataset.type=type||'';
  }

  function findAccount(email){
    return readAccounts().find(function(account){return account.email===email;})||null;
  }

  function currentAccount(){
    const session=readSession();
    if(!session||!session.email)return null;
    return findAccount(session.email);
  }

  function setView(name){
    const panel=$('#accountApp');
    if(!panel)return;
    $$('.acct-view',panel).forEach(function(view){
      view.classList.toggle('on',view.dataset.view===name);
    });
    $$('.acct-tab',panel).forEach(function(tab){
      const on=tab.dataset.authView===name;
      tab.classList.toggle('on',on);
      tab.setAttribute('aria-selected',on?'true':'false');
    });
    status('');
  }

  function renderProfile(){
    const account=currentAccount();
    if(!account){
      setView('login');
      return;
    }
    $('#profileName').textContent='Ciao, '+(account.name||'Bluelle')+'.';
    $('#profileEmail').textContent=account.email;
    $('#profileProvider').textContent=account.provider==='google'?'Accesso Google':'Accesso email e password';
    const currentField=$('#currentPasswordField');
    if(currentField)currentField.hidden=account.provider==='google'&&!account.passwordHash;
    setView('profile');
  }

  function validatePassword(password,confirm){
    if(password.length<8)return 'La password deve avere almeno 8 caratteri.';
    if(password!==confirm)return 'Le password non coincidono.';
    return '';
  }

  async function handleRegister(event){
    event.preventDefault();
    const form=event.currentTarget;
    const name=String(form.elements.name.value||'').trim();
    const email=normalizeEmail(form.elements.email.value);
    const password=String(form.elements.password.value||'');
    const confirm=String(form.elements.confirm.value||'');
    if(!name)return status('Inserisci il tuo nome.','error');
    if(!validEmail(email))return status('Inserisci una email valida.','error');
    const passError=validatePassword(password,confirm);
    if(passError)return status(passError,'error');
    if(findAccount(email))return status('Esiste gia un account con questa email. Accedi oppure cambia password.','error');
    const accounts=readAccounts();
    const account={name:name,email:email,provider:'email',passwordHash:await hashPassword(password),createdAt:new Date().toISOString()};
    accounts.push(account);
    writeAccounts(accounts);
    writeSession(account);
    form.reset();
    renderProfile();
    status('Account creato. Benvenuto in Bluelle.','success');
  }

  async function handleLogin(event){
    event.preventDefault();
    const form=event.currentTarget;
    const email=normalizeEmail(form.elements.email.value);
    const password=String(form.elements.password.value||'');
    if(!validEmail(email))return status('Inserisci una email valida.','error');
    const account=findAccount(email);
    if(!account)return status('Account non trovato. Creane uno in pochi secondi.','error');
    if(account.provider==='google'&&!account.passwordHash){
      writeSession(account);
      renderProfile();
      return status('Accesso Google ripristinato.','success');
    }
    const hash=await hashPassword(password);
    if(hash!==account.passwordHash)return status('Password non corretta.','error');
    writeSession(account);
    form.reset();
    renderProfile();
    status('Accesso effettuato.','success');
  }

  async function handleReset(event){
    event.preventDefault();
    const form=event.currentTarget;
    const email=normalizeEmail(form.elements.email.value);
    const password=String(form.elements.password.value||'');
    const confirm=String(form.elements.confirm.value||'');
    if(!validEmail(email))return status('Inserisci una email valida.','error');
    const passError=validatePassword(password,confirm);
    if(passError)return status(passError,'error');
    const accounts=readAccounts();
    const idx=accounts.findIndex(function(account){return account.email===email;});
    if(idx<0)return status('Account non trovato. Controlla la email o registrati.','error');
    accounts[idx].passwordHash=await hashPassword(password);
    accounts[idx].updatedAt=new Date().toISOString();
    writeAccounts(accounts);
    writeSession(accounts[idx]);
    form.reset();
    renderProfile();
    status('Password aggiornata.','success');
  }

  async function handleChange(event){
    event.preventDefault();
    const account=currentAccount();
    if(!account)return setView('login');
    const form=event.currentTarget;
    const current=String(form.elements.current?form.elements.current.value:'');
    const password=String(form.elements.password.value||'');
    const confirm=String(form.elements.confirm.value||'');
    const passError=validatePassword(password,confirm);
    if(passError)return status(passError,'error');
    if(account.passwordHash){
      const currentHash=await hashPassword(current);
      if(currentHash!==account.passwordHash)return status('Password attuale non corretta.','error');
    }
    const accounts=readAccounts();
    const idx=accounts.findIndex(function(item){return item.email===account.email;});
    if(idx<0)return status('Sessione scaduta. Accedi di nuovo.','error');
    accounts[idx].passwordHash=await hashPassword(password);
    accounts[idx].updatedAt=new Date().toISOString();
    writeAccounts(accounts);
    writeSession(accounts[idx]);
    form.reset();
    renderProfile();
    status('Password aggiornata.','success');
  }

  function googlePrompt(){
    const email=normalizeEmail(window.prompt('Inserisci la tua email Google per la preview locale:')||'');
    if(!email)return null;
    if(!validEmail(email)){
      status('Email Google non valida.','error');
      return null;
    }
    return email;
  }

  function handleGoogle(){
    const email=googlePrompt();
    if(!email)return;
    const accounts=readAccounts();
    let account=accounts.find(function(item){return item.email===email;});
    if(!account){
      const name=email.split('@')[0].replace(/[._-]+/g,' ').replace(/\b\w/g,function(letter){return letter.toUpperCase();});
      account={name:name||'Cliente Bluelle',email:email,provider:'google',createdAt:new Date().toISOString()};
      accounts.push(account);
      writeAccounts(accounts);
    }
    writeSession(account);
    renderProfile();
    status('Accesso Google completato.','success');
  }

  function init(){
    if(!$('#accountApp'))return;
    $$('#accountApp [data-auth-view]').forEach(function(btn){
      btn.addEventListener('click',function(){setView(btn.dataset.authView);});
    });
    $('#registerForm').addEventListener('submit',handleRegister);
    $('#loginForm').addEventListener('submit',handleLogin);
    $('#resetForm').addEventListener('submit',handleReset);
    $('#changeForm').addEventListener('submit',handleChange);
    $('#googleLogin').addEventListener('click',handleGoogle);
    $('#googleRegister').addEventListener('click',handleGoogle);
    $('#logoutBtn').addEventListener('click',function(){
      clearSession();
      setView('login');
      status("Sei uscito dall'account.",'success');
    });
    const mode=new URLSearchParams(window.location.search).get('mode');
    if(currentAccount())renderProfile();
    else if(mode==='register'||mode==='reset')setView(mode);
    else setView('login');
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
  else init();
})();
