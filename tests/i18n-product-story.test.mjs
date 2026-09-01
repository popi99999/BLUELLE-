import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const locales = [
  'it', 'en', 'fr', 'es', 'de', 'pt', 'nl', 'pl', 'ro', 'sv',
  'no', 'da', 'el', 'tr', 'ar', 'zh', 'ja', 'ko', 'ru',
];
const keys = [
  'product_hero_subtitle',
  'product_shipping_label',
  'product_shipping_copy',
  'product_delivery_label',
  'product_delivery_copy',
  'product_authentication_label',
  'product_authentication_copy',
  'product_payments_label',
  'product_payment_more',
  'product_payment_availability',
  'product_characteristics_heading',
  'product_materials_heading',
  'product_size_fit_heading',
  'product_authentication_heading',
  'product_shipping_returns_heading',
  'product_payments_heading',
  'product_materials_fallback',
  'product_size_fit_copy',
  'product_authentication_details',
  'product_shipping_returns_copy',
  'product_payments_details',
  'product_condition_renew',
  'product_condition_discreet',
  'product_condition_good',
  'product_condition_very_good',
  'product_condition_excellent',
  'product_condition_note',
  'product_spec_brand',
  'product_spec_size',
  'product_spec_condition',
  'product_spec_color',
  'product_spec_fit',
];

const corePath = path.join(root, 'assets', 'i18n.js');
const bundlePath = path.join(root, 'assets', 'i18n-product-story.js');
assert.ok(fs.existsSync(bundlePath), 'assets/i18n-product-story.js must exist');

const sandbox = { window: {}, console };
vm.runInNewContext(fs.readFileSync(corePath, 'utf8'), sandbox, { filename: corePath });
vm.runInNewContext(fs.readFileSync(bundlePath, 'utf8'), sandbox, { filename: bundlePath });

const messages = sandbox.window.BL_I18N.messages;
for (const locale of locales) {
  for (const key of keys) {
    assert.equal(typeof messages[locale]?.[key], 'string', `missing ${locale} translation for ${key}`);
    assert.notEqual(messages[locale][key].trim(), '', `empty ${locale} translation for ${key}`);
  }

  const placeholders = [...messages[locale].product_size_fit_copy.matchAll(/\{([^}]+)\}/g)]
    .map((match) => match[1])
    .sort();
  assert.deepEqual(placeholders, ['fit', 'size'], `${locale} product_size_fit_copy must preserve {size} and {fit}`);
}

assert.equal(messages.it.product_payments_label, 'Pagamenti sicuri');
assert.equal(messages.it.product_condition_renew, 'Da rinnovare');
assert.equal(messages.it.product_spec_fit, 'Vestibilità');

console.log(`product story i18n OK: ${keys.length} keys, ${locales.length} locales`);
