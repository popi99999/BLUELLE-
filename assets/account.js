(function(){
  'use strict';

  const STORE_KEY='bluelle_accounts_v1';
  const SESSION_KEY='bluelle_session_v1';
  const $=function(sel,root){return (root||document).querySelector(sel);};
  const $$=function(sel,root){return Array.prototype.slice.call((root||document).querySelectorAll(sel));};
  let lastStatusKey='';
  let lastStatusType='';

  function t(key){
    if(window.BL_I18N&&typeof window.BL_I18N.t==='function')return window.BL_I18N.t(key);
    return key;
  }

  function format(key,values){
    let message=t(key);
    Object.keys(values||{}).forEach(function(name){
      message=message.split('{'+name+'}').join(String(values[name]));
    });
    return message;
  }

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

  function status(key,type){
    const node=$('#accountStatus');
    if(!node)return;
    lastStatusKey=key||'';
    lastStatusType=type||'';
    node.textContent=key?t(key):'';
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
    $('#profileName').textContent=format('account_profile_greeting',{name:account.name||t('account_default_name')});
    $('#profileEmail').textContent=account.email;
    $('#profileProvider').textContent=t(account.provider==='google'?'account_provider_google':'account_provider_password');
    const currentField=$('#currentPasswordField');
    if(currentField)currentField.hidden=account.provider==='google'&&!account.passwordHash;
    setView('profile');
  }

  function validatePassword(password,confirm){
    if(password.length<8)return 'account_error_password_length';
    if(password!==confirm)return 'account_error_password_mismatch';
    return '';
  }

  async function handleRegister(event){
    event.preventDefault();
    const form=event.currentTarget;
    const name=String(form.elements.name.value||'').trim();
    const email=normalizeEmail(form.elements.email.value);
    const password=String(form.elements.password.value||'');
    const confirm=String(form.elements.confirm.value||'');
    if(!name)return status('account_error_name_required','error');
    if(!validEmail(email))return status('account_error_email_invalid','error');
    const passError=validatePassword(password,confirm);
    if(passError)return status(passError,'error');
    if(findAccount(email))return status('account_error_exists','error');
    const accounts=readAccounts();
    const account={name:name,email:email,provider:'email',passwordHash:await hashPassword(password),createdAt:new Date().toISOString()};
    accounts.push(account);
    writeAccounts(accounts);
    writeSession(account);
    form.reset();
    renderProfile();
    status('account_success_created','success');
  }

  async function handleLogin(event){
    event.preventDefault();
    const form=event.currentTarget;
    const email=normalizeEmail(form.elements.email.value);
    const password=String(form.elements.password.value||'');
    if(!validEmail(email))return status('account_error_email_invalid','error');
    const account=findAccount(email);
    if(!account)return status('account_error_not_found_login','error');
    if(account.provider==='google'&&!account.passwordHash){
      writeSession(account);
      renderProfile();
      return status('account_success_google_restored','success');
    }
    const hash=await hashPassword(password);
    if(hash!==account.passwordHash)return status('account_error_password_wrong','error');
    writeSession(account);
    form.reset();
    renderProfile();
    status('account_success_login','success');
  }

  async function handleReset(event){
    event.preventDefault();
    const form=event.currentTarget;
    const email=normalizeEmail(form.elements.email.value);
    const password=String(form.elements.password.value||'');
    const confirm=String(form.elements.confirm.value||'');
    if(!validEmail(email))return status('account_error_email_invalid','error');
    const passError=validatePassword(password,confirm);
    if(passError)return status(passError,'error');
    const accounts=readAccounts();
    const idx=accounts.findIndex(function(account){return account.email===email;});
    if(idx<0)return status('account_error_not_found_reset','error');
    accounts[idx].passwordHash=await hashPassword(password);
    accounts[idx].updatedAt=new Date().toISOString();
    writeAccounts(accounts);
    writeSession(accounts[idx]);
    form.reset();
    renderProfile();
    status('account_success_password_updated','success');
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
      if(currentHash!==account.passwordHash)return status('account_error_current_password','error');
    }
    const accounts=readAccounts();
    const idx=accounts.findIndex(function(item){return item.email===account.email;});
    if(idx<0)return status('account_error_session_expired','error');
    accounts[idx].passwordHash=await hashPassword(password);
    accounts[idx].updatedAt=new Date().toISOString();
    writeAccounts(accounts);
    writeSession(accounts[idx]);
    form.reset();
    renderProfile();
    status('account_success_password_updated','success');
  }

  function googlePrompt(){
    const email=normalizeEmail(window.prompt(t('account_google_prompt'))||'');
    if(!email)return null;
    if(!validEmail(email)){
      status('account_error_google_email','error');
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
      account={name:name||'',email:email,provider:'google',createdAt:new Date().toISOString()};
      accounts.push(account);
      writeAccounts(accounts);
    }
    writeSession(account);
    renderProfile();
    status('account_success_google','success');
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
      status('account_success_logout','success');
    });
    const mode=new URLSearchParams(window.location.search).get('mode');
    if(currentAccount())renderProfile();
    else if(mode==='register'||mode==='reset')setView(mode);
    else setView('login');
    document.addEventListener('bl:languagechange',function(){
      const account=currentAccount();
      if(account&&$('#profileView').classList.contains('on')){
        $('#profileName').textContent=format('account_profile_greeting',{name:account.name||t('account_default_name')});
        $('#profileProvider').textContent=t(account.provider==='google'?'account_provider_google':'account_provider_password');
      }
      if(lastStatusKey){
        const node=$('#accountStatus');
        if(node){
          node.textContent=t(lastStatusKey);
          node.dataset.type=lastStatusType;
        }
      }
    });
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
  else init();
})();
