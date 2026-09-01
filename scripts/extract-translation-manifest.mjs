import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const assets = path.join(root, 'assets');
const output = process.argv[2] || path.join(root, '.translation-manifest.json');

const targetLocales = [
  'pt', 'nl', 'pl', 'ro', 'sv', 'no', 'da',
  'el', 'tr', 'ar', 'zh', 'ja', 'ko', 'ru',
];

function readAsset(name) {
  return fs.readFileSync(path.join(assets, name), 'utf8');
}

function extractLiteral(source, name, nextMarker) {
  const token = `const ${name}=`;
  const spacedToken = `const ${name} = `;
  let start = source.indexOf(token);
  let prefix = token;
  if (start < 0) {
    start = source.indexOf(spacedToken);
    prefix = spacedToken;
  }
  const end = source.indexOf(nextMarker, start + prefix.length);
  if (start < 0 || end <= start) throw new Error(`Cannot extract ${name}`);
  const literal = source.slice(start + prefix.length, end).trim().replace(/;$/, '');
  return vm.runInNewContext(`(${literal})`);
}

function loadStaticMessages() {
  const sandbox = { window: {}, console };
  vm.runInNewContext(readAsset('i18n.js'), sandbox, { filename: 'assets/i18n.js' });
  for (const name of ['i18n-home-support.js', 'i18n-shop-about.js', 'i18n-account-legal.js']) {
    vm.runInNewContext(readAsset(name), sandbox, { filename: `assets/${name}` });
  }
  return JSON.parse(JSON.stringify(sandbox.window.BL_I18N.messages.en));
}

function loadProductCopy() {
  const sandbox = { window: {} };
  vm.runInNewContext(readAsset('i18n-product-copy.js'), sandbox, {
    filename: 'assets/i18n-product-copy.js',
  });
  return JSON.parse(JSON.stringify(sandbox.window.BL_PRODUCT_COPY));
}

function englishProductName(name) {
  const start = appSource.indexOf('function translateName(');
  const end = appSource.indexOf('const PRODUCT_FIELDS=', start);
  if (start < 0 || end <= start) throw new Error('Cannot extract translateName');
  const sandbox = { window: {}, langBase: (locale) => locale };
  vm.runInNewContext(`${appSource.slice(start, end)}\nthis.result=translateName(${JSON.stringify(name)},'en');`, sandbox);
  return sandbox.result;
}

const appSource = readAsset('app.js');
const appObjects = {
  T: extractLiteral(appSource, 'T', 'const EXTRA_T=').en,
  EXTRA_T: extractLiteral(appSource, 'EXTRA_T', '// CHECKOUT TRANSLATIONS').en,
  CK: extractLiteral(appSource, 'CK', '// PRODUCTS').en,
  PRODUCT_FIELDS: extractLiteral(appSource, 'PRODUCT_FIELDS', 'function translateProductField').en,
  SPEC_LBL: extractLiteral(appSource, 'SPEC_LBL', 'const BRAND_NAME=').en,
  TRUST_LBL: extractLiteral(appSource, 'TRUST_LBL', 'function escAttr').en,
  DETAIL_LBL: extractLiteral(appSource, 'DETAIL_LBL', 'function conditionLevel').en,
  TT: extractLiteral(appSource, 'TT', '/* ═══════════════ REGISTRO ORDINI').en,
  STEPS: extractLiteral(appSource, 'STEPS', '// Messaggi del tracking').en,
  TMSG: extractLiteral(appSource, 'TMSG', '// ── RILEVATORE POSIZIONE').en,
};

const geo = extractLiteral(appSource, 'GEO_T', 'const APP_I18N=').en;
appObjects.GEO_T = {
  eye: geo.eye,
  title: geo.title,
  lang: geo.lang,
  curr: geo.curr,
  btn: geo.btn,
  from: geo.from('{country}'),
  nofrom: geo.nofrom,
};

const orders = extractLiteral(appSource, 'ORDERS', '// Etichette degli step');
appObjects.ORDER_ETA = orders['1']?.eta?.en || '2–3 business days';

const products = extractLiteral(appSource, 'prods', '// STATE');
const existingProductCopy = loadProductCopy();
const productDescriptions = {};
const productNames = {};
for (const product of products) {
  const id = String(product.id);
  productDescriptions[id] = existingProductCopy[id]?.en || product.desc || '';
  productNames[product.name] = englishProductName(product.name);
}

const manifest = {
  version: 1,
  sourceLocale: 'en',
  targetLocales,
  static: loadStaticMessages(),
  app: appObjects,
  productDescriptions,
  productNames: {
    sourceLocale: 'en',
    values: productNames,
  },
};

fs.writeFileSync(output, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Translation manifest: ${output}`);
console.log(`Static keys: ${Object.keys(manifest.static).length}`);
console.log(`Products: ${Object.keys(productDescriptions).length}`);
