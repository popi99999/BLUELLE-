import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const modulePath = path.join(root, 'assets', 'rates.js');
const appPath = path.join(root, 'assets', 'app.js');

function loadRatesModule(windowOverrides = {}) {
  assert.ok(fs.existsSync(modulePath), 'assets/rates.js must exist');
  const sandbox = { window: windowOverrides };
  vm.runInNewContext(fs.readFileSync(modulePath, 'utf8'), sandbox, { filename: modulePath });
  return sandbox.window.BL_RATES;
}

function makeStorage(seed = {}) {
  const data = new Map(Object.entries(seed));
  return {
    getItem(key) {
      return data.has(key) ? data.get(key) : null;
    },
    setItem(key, value) {
      data.set(key, String(value));
    },
  };
}

function response(payload) {
  return {
    ok: true,
    async json() {
      return payload;
    },
  };
}

function plain(value) {
  return JSON.parse(JSON.stringify(value));
}

test('exposes a browser IIFE factory fixed to EUR', () => {
  const ratesModule = loadRatesModule();

  assert.equal(ratesModule.BASE, 'EUR');
  assert.equal(typeof ratesModule.create, 'function');
  assert.equal(typeof ratesModule.getRates, 'function');
});

test('the browser getter rejects asynchronously when fetch is unavailable', async () => {
  const ratesModule = loadRatesModule({ localStorage: makeStorage() });
  let promise;
  assert.doesNotThrow(() => { promise = ratesModule.getRates(); });
  await assert.rejects(promise, /fetch function is required/i);
});

test('blocked localStorage falls back to memory without interrupting live rates', async () => {
  const browser = {
    fetch: async () => response({ base_code: 'EUR', rates: { EUR: 1, USD: 1.17 } }),
  };
  Object.defineProperty(browser, 'localStorage', {
    get() { throw new Error('storage denied'); },
  });
  const ratesModule = loadRatesModule(browser);
  let promise;
  assert.doesNotThrow(() => { promise = ratesModule.getRates(); });
  assert.deepEqual(plain(await promise), { EUR: 1, USD: 1.17 });
});

test('the app applies resolved daily rates and rerenders every visible price', async () => {
  const appSource = fs.readFileSync(appPath, 'utf8');
  const start = appSource.indexOf('function fetchRates(');
  const end = appSource.indexOf('function translateName(', start);
  assert.ok(start >= 0 && end > start, 'cannot extract fetchRates from assets/app.js');
  let renderCount = 0;
  const sandbox = {
    window: { BL_RATES: { getRates: async () => ({ EUR: 1, USD: 1.21 }) } },
    rates: { EUR: 1, USD: 1.1 },
    renderPrices() { renderCount += 1; },
  };
  const promise = vm.runInNewContext(`(()=>{${appSource.slice(start, end)}; return fetchRates();})()`, sandbox);
  assert.equal(typeof promise?.then, 'function', 'fetchRates should expose completion for integration checks');
  await promise;
  assert.deepEqual(plain(sandbox.rates), { EUR: 1, USD: 1.21 });
  assert.equal(renderCount, 1);
});

test('requests fresh rates from the existing EUR endpoint when the cache is empty', async () => {
  const ratesModule = loadRatesModule();
  const storage = makeStorage();
  const calls = [];
  const service = ratesModule.create({
    storage,
    now: () => new Date('2026-08-31T09:30:00.000Z'),
    fetch: async (...args) => {
      calls.push(args);
      return response({ base_code: 'EUR', rates: { EUR: 0.5, USD: 1.17, GBP: 0.87 } });
    },
  });

  const rates = await service.getRates();

  assert.deepEqual(plain(rates), { EUR: 1, USD: 1.17, GBP: 0.87 });
  assert.deepEqual(plain(calls), [[
    'https://open.er-api.com/v6/latest/EUR',
    { cache: 'no-store' },
  ]]);
});

test('stores successful rates with the fetch timestamp', async () => {
  const ratesModule = loadRatesModule();
  const storage = makeStorage();
  const fetchedAt = '2026-08-31T09:30:00.000Z';
  const service = ratesModule.create({
    storage,
    now: () => new Date(fetchedAt),
    fetch: async () => response({ rates: { USD: 1.17, GBP: 0.87 } }),
  });

  await service.getRates();

  assert.deepEqual(JSON.parse(storage.getItem(ratesModule.CACHE_KEY)), {
    base: 'EUR',
    fetchedAt,
    rates: { EUR: 1, USD: 1.17, GBP: 0.87 },
  });
});

test('performs only one fetch across repeated calls in the same UTC day', async () => {
  const ratesModule = loadRatesModule();
  const storage = makeStorage();
  let fetchCount = 0;
  let currentTime = new Date('2026-08-31T00:00:01.000Z');
  const service = ratesModule.create({
    storage,
    now: () => currentTime,
    fetch: async () => {
      fetchCount += 1;
      return response({ rates: { USD: 1.17 } });
    },
  });

  const first = await service.getRates();
  currentTime = new Date('2026-08-31T23:59:59.999Z');
  const second = await service.getRates();

  assert.equal(fetchCount, 1);
  assert.deepEqual(plain(first), { EUR: 1, USD: 1.17 });
  assert.deepEqual(plain(second), { EUR: 1, USD: 1.17 });
});

test('refreshes cached rates on the next UTC day', async () => {
  const ratesModule = loadRatesModule();
  const storage = makeStorage({
    [ratesModule.CACHE_KEY]: JSON.stringify({
      base: 'EUR',
      fetchedAt: '2026-08-31T23:59:59.999Z',
      rates: { EUR: 1, USD: 1.17 },
    }),
  });
  let fetchCount = 0;
  const service = ratesModule.create({
    storage,
    now: () => new Date('2026-09-01T00:00:00.000Z'),
    fetch: async () => {
      fetchCount += 1;
      return response({ rates: { USD: 1.19 } });
    },
  });

  const rates = await service.getRates();

  assert.equal(fetchCount, 1);
  assert.deepEqual(plain(rates), { EUR: 1, USD: 1.19 });
  assert.equal(JSON.parse(storage.getItem(ratesModule.CACHE_KEY)).fetchedAt, '2026-09-01T00:00:00.000Z');
});

test('an older cross-day request cannot overwrite a newer daily cache entry', async () => {
  const ratesModule = loadRatesModule();
  const storage = makeStorage();
  let currentTime = new Date('2026-08-31T23:59:59.000Z');
  const pending = [];
  const service = ratesModule.create({
    storage,
    now: () => currentTime,
    fetch: () => new Promise((resolve) => { pending.push(resolve); }),
  });

  const oldRequest = service.getRates();
  currentTime = new Date('2026-09-01T00:00:01.000Z');
  const newRequest = service.getRates();
  await Promise.resolve();
  pending[1](response({ rates: { USD: 1.2 } }));
  await newRequest;
  pending[0](response({ rates: { USD: 1.1 } }));
  await oldRequest;

  assert.deepEqual(JSON.parse(storage.getItem(ratesModule.CACHE_KEY)), {
    base: 'EUR',
    fetchedAt: '2026-09-01T00:00:01.000Z',
    rates: { EUR: 1, USD: 1.2 },
  });
});

test('returns the last cached rates when a daily refresh fails', async () => {
  const ratesModule = loadRatesModule();
  const cached = {
    base: 'EUR',
    fetchedAt: '2026-08-30T12:00:00.000Z',
    rates: { EUR: 1, USD: 1.15, GBP: 0.85 },
  };
  const storage = makeStorage({ [ratesModule.CACHE_KEY]: JSON.stringify(cached) });
  const service = ratesModule.create({
    storage,
    now: () => new Date('2026-08-31T12:00:00.000Z'),
    fetch: async () => {
      throw new Error('network unavailable');
    },
  });

  const rates = await service.getRates();

  assert.deepEqual(plain(rates), cached.rates);
  assert.deepEqual(JSON.parse(storage.getItem(ratesModule.CACHE_KEY)), cached);
});

test('rejects a malformed response instead of caching it', async () => {
  const ratesModule = loadRatesModule();
  const storage = makeStorage();
  const service = ratesModule.create({
    storage,
    now: () => new Date('2026-08-31T12:00:00.000Z'),
    fetch: async () => response({ base_code: 'EUR', rates: { USD: 'not-a-number' } }),
  });

  await assert.rejects(service.getRates(), /invalid rates payload/i);
  assert.equal(storage.getItem(ratesModule.CACHE_KEY), null);
});

test('uses stale cache when a refresh payload is malformed', async () => {
  const ratesModule = loadRatesModule();
  const cached = {
    base: 'EUR',
    fetchedAt: '2026-08-30T12:00:00.000Z',
    rates: { EUR: 1, USD: 1.15 },
  };
  const storage = makeStorage({ [ratesModule.CACHE_KEY]: JSON.stringify(cached) });
  const service = ratesModule.create({
    storage,
    now: () => new Date('2026-08-31T12:00:00.000Z'),
    fetch: async () => response({ base_code: 'USD', rates: { EUR: 0.9 } }),
  });

  const rates = await service.getRates();

  assert.deepEqual(plain(rates), cached.rates);
  assert.deepEqual(JSON.parse(storage.getItem(ratesModule.CACHE_KEY)), cached);
});
