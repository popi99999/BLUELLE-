import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const input = process.argv[2] || path.join(root, '.translation-output.json');
const output = process.argv[3] || path.join(root, 'assets', 'i18n-generated.js');
const payload = JSON.parse(fs.readFileSync(input, 'utf8'));

if (payload.version !== 1 || !payload.locales || typeof payload.locales !== 'object') {
  throw new Error('Unsupported translation output');
}

const localeOrder = [
  'pt', 'nl', 'pl', 'ro', 'sv', 'no', 'da',
  'el', 'tr', 'ar', 'zh', 'ja', 'ko', 'ru',
];
const appGroups = [
  'T', 'EXTRA_T', 'CK', 'PRODUCT_FIELDS', 'SPEC_LBL', 'TRUST_LBL',
  'DETAIL_LBL', 'TT', 'STEPS', 'TMSG', 'GEO_T', 'ORDER_ETA',
];

const staticMessages = {};
const app = Object.fromEntries(appGroups.map((name) => [name, {}]));
const productCopy = {};
const productNames = {};

for (const locale of localeOrder) {
  const translated = payload.locales[locale];
  if (!translated) throw new Error(`Missing locale ${locale}`);
  staticMessages[locale] = translated.static;
  for (const group of appGroups) app[group][locale] = translated.app[group];
  productNames[locale] = translated.productNames;
  for (const [id, value] of Object.entries(translated.productDescriptions)) {
    if (!productCopy[id]) productCopy[id] = {};
    productCopy[id][locale] = value;
  }
}

function json(value) {
  return JSON.stringify(value, null, 2)
    .replaceAll('</script', '<\\/script')
    .replace(/[\u2028\u2029]/g, (char) => `\\u${char.charCodeAt(0).toString(16)}`);
}

const source = `(function(global){
  'use strict';

  var staticMessages=${json(staticMessages)};
  var appMessages=${json(app)};
  var productCopy=${json(productCopy)};
  var productNames=${json(productNames)};

  global.BL_APP_I18N=appMessages;
  global.BL_I18N_GENERATED_STATIC=staticMessages;
  global.BL_PRODUCT_NAMES=productNames;
  global.BL_PRODUCT_COPY_EXT=productCopy;

  if(global.BL_PRODUCT_COPY){
    Object.keys(productCopy).forEach(function(id){
      if(!global.BL_PRODUCT_COPY[id])global.BL_PRODUCT_COPY[id]={};
      Object.assign(global.BL_PRODUCT_COPY[id],productCopy[id]);
    });
  }
  if(global.BL_I18N&&typeof global.BL_I18N.register==='function'){
    global.BL_I18N.register(staticMessages);
  }
})(window);
`;

fs.writeFileSync(output, source);
console.log(`Generated locale bundle: ${output}`);
console.log(`Locales: ${localeOrder.length}; static keys per locale: ${Object.keys(staticMessages.pt).length}`);
