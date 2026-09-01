(function(global){
  'use strict';

  var BASE='EUR';
  var ENDPOINT='https://open.er-api.com/v6/latest/EUR';
  var CACHE_KEY='bl_rates_eur_daily_v1';

  function invalidPayload(){
    return new Error('Invalid rates payload');
  }

  function normalizeRates(payload){
    if(!payload||typeof payload!=='object'||Array.isArray(payload))throw invalidPayload();
    if(payload.base_code!==undefined&&payload.base_code!==BASE)throw invalidPayload();
    if(payload.result!==undefined&&payload.result!=='success')throw invalidPayload();

    var source=payload.rates;
    if(!source||typeof source!=='object'||Array.isArray(source))throw invalidPayload();

    var codes=Object.keys(source);
    if(!codes.length)throw invalidPayload();

    var normalized={EUR:1};
    codes.forEach(function(code){
      var value=source[code];
      if(!/^[A-Z]{3}$/.test(code)||typeof value!=='number'||!isFinite(value)||value<=0){
        throw invalidPayload();
      }
      if(code!==BASE)normalized[code]=value;
    });
    return normalized;
  }

  function normalizeDate(value){
    var date=new Date(value&&typeof value.getTime==='function'?value.getTime():value);
    if(!isFinite(date.getTime()))throw new Error('Invalid current time');
    return date;
  }

  function utcDay(date){
    return date.toISOString().slice(0,10);
  }

  function readCache(storage){
    try{
      var raw=storage.getItem(CACHE_KEY);
      if(!raw)return null;
      var record=JSON.parse(raw);
      if(!record||record.base!==BASE||typeof record.fetchedAt!=='string')return null;
      var fetchedAt=new Date(record.fetchedAt);
      if(!isFinite(fetchedAt.getTime()))return null;
      var rates=normalizeRates({base_code:record.base,rates:record.rates});
      if(rates.EUR!==1)return null;
      return {base:BASE,fetchedAt:fetchedAt.toISOString(),rates:rates};
    }catch(_error){
      return null;
    }
  }

  function writeCache(storage,record){
    try{
      storage.setItem(CACHE_KEY,JSON.stringify(record));
    }catch(_error){}
  }

  function create(options){
    options=options||{};
    var fetchImpl=options.fetch;
    var storage=options.storage;
    var now=options.now||function(){return new Date();};
    var inFlight=null;
    var requestSerial=0;

    if(typeof fetchImpl!=='function')throw new TypeError('A fetch function is required');
    if(!storage||typeof storage.getItem!=='function'||typeof storage.setItem!=='function'){
      throw new TypeError('A storage object is required');
    }
    if(typeof now!=='function')throw new TypeError('A now function is required');

    function getRates(){
      var current=normalizeDate(now());
      var day=utcDay(current);
      var cached=readCache(storage);

      if(cached&&utcDay(new Date(cached.fetchedAt))===day){
        return Promise.resolve(cached.rates);
      }
      if(inFlight&&inFlight.day===day)return inFlight.promise;

      var serial=++requestSerial;
      var promise=Promise.resolve()
        .then(function(){return fetchImpl(ENDPOINT,{cache:'no-store'});})
        .then(function(response){
          if(!response||response.ok===false||typeof response.json!=='function'){
            throw new Error('Rates request failed');
          }
          return response.json();
        })
        .then(function(payload){
          var rates=normalizeRates(payload);
          if(serial===requestSerial){
            writeCache(storage,{base:BASE,fetchedAt:current.toISOString(),rates:rates});
          }
          return rates;
        })
        ['catch'](function(error){
          if(cached)return cached.rates;
          throw error;
        });

      inFlight={day:day,promise:promise};
      promise.then(function(){
        if(inFlight&&inFlight.promise===promise)inFlight=null;
      },function(){
        if(inFlight&&inFlight.promise===promise)inFlight=null;
      });
      return promise;
    }

    return {getRates:getRates};
  }

  var memoryData={};
  var memoryStorage={
    getItem:function(key){return Object.prototype.hasOwnProperty.call(memoryData,key)?memoryData[key]:null;},
    setItem:function(key,value){memoryData[key]=String(value);}
  };
  function browserStorage(){
    try{
      var storage=global.localStorage;
      if(storage&&typeof storage.getItem==='function'&&typeof storage.setItem==='function')return storage;
    }catch(_error){}
    return memoryStorage;
  }

  var defaultService;
  function getRates(){
    try{
      if(!defaultService){
        defaultService=create({
          fetch:typeof global.fetch==='function'?global.fetch.bind(global):null,
          storage:browserStorage(),
          now:function(){return new Date();}
        });
      }
      return defaultService.getRates();
    }catch(error){
      return Promise.reject(error);
    }
  }

  global.BL_RATES={
    BASE:BASE,
    ENDPOINT:ENDPOINT,
    CACHE_KEY:CACHE_KEY,
    create:create,
    getRates:getRates
  };
})(window);
