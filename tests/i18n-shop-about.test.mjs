import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const locales = ['it', 'en', 'fr', 'es', 'de'];
const pages = ['chi-siamo.html', 'collezione.html'];
const packPath = path.join(root, 'assets', 'i18n-shop-about.js');

assert.ok(fs.existsSync(packPath), 'assets/i18n-shop-about.js must exist');

let registered;
const sandbox = {
  window: {
    BL_I18N: {
      register(messages) {
        registered = messages;
      },
    },
  },
};
vm.runInNewContext(fs.readFileSync(packPath, 'utf8'), sandbox, { filename: packPath });

assert.ok(registered, 'the shop/about pack must register its messages');
assert.deepEqual(Object.keys(registered), locales);

const markerPattern = /\bdata-i(?:-placeholder|-aria|-alt|-title|-content)?="([^"]+)"/g;
const allKeys = new Set();

for (const page of pages) {
  const html = fs.readFileSync(path.join(root, page), 'utf8');
  const coreAt = html.indexOf('assets/i18n.js?v=20260831b');
  const packAt = html.indexOf('assets/i18n-shop-about.js?v=20260831b');
  const appAt = html.indexOf('assets/app.js?v=20260831b');

  assert.ok(coreAt >= 0, `${page} must load the i18n core`);
  assert.ok(packAt > coreAt, `${page} must load the shop/about pack after the core`);
  assert.ok(appAt > packAt, `${page} must load app.js after the translation pack`);

  for (const match of html.matchAll(markerPattern)) allKeys.add(match[1]);
}

for (const key of allKeys) {
  for (const locale of locales) {
    assert.equal(
      typeof registered[locale]?.[key],
      'string',
      `missing ${locale} translation for "${key}"`,
    );
    assert.notEqual(registered[locale][key].trim(), '', `empty ${locale} translation for "${key}"`);
  }
}

const collection = fs.readFileSync(path.join(root, 'collezione.html'), 'utf8');
for (const marker of [
  'data-i="shop_filters"',
  'data-i="shop_sort_label"',
  'data-i-placeholder="shop_search_placeholder"',
  'data-i="shop_available_only"',
  'data-i="shop_no_results"',
  'data-i="product_price_heading"',
  'data-i="product_price_label"',
  'data-i="product_payment_heading"',
  'data-i="product_back_button"',
  'data-i="product_whatsapp_cta"',
  'data-i="checkout_zone_it"',
  'data-i="checkout_zone_eu"',
  'data-i="checkout_zone_world"',
  'data-i="checkout_eur_note"',
]) {
  assert.ok(collection.includes(marker), `collezione.html must contain ${marker}`);
}
assert.ok(
  collection.includes('data-country-default-key="checkout_country_default"'),
  'the checkout country default must be locale-aware',
);
for (const locale of locales) {
  assert.equal(
    typeof registered[locale]?.checkout_country_default,
    'string',
    `missing ${locale} checkout country default`,
  );
}

const appSource = fs.readFileSync(path.join(root, 'assets', 'app.js'), 'utf8');
const detailStartToken = 'const DETAIL_LBL=';
const detailStart = appSource.indexOf(detailStartToken);
const detailEnd = appSource.indexOf('function conditionLevel', detailStart);
assert.ok(detailStart >= 0 && detailEnd > detailStart, 'cannot extract DETAIL_LBL from assets/app.js');
const detailLiteral = appSource.slice(detailStart + detailStartToken.length, detailEnd).trim().replace(/;$/, '');
const detailLabels = vm.runInNewContext(`(${detailLiteral})`);
for (const locale of ['fr', 'es', 'de']) {
  assert.notDeepEqual(
    Array.from(detailLabels[locale].scale),
    Array.from(detailLabels.en.scale),
    `${locale} condition scale must not remain in English`,
  );
  assert.notEqual(detailLabels[locale].pack, 'Packaging', `${locale} packaging label must be translated`);
}
assert.deepEqual(
  Array.from(detailLabels.fr.scale),
  ['À restaurer', 'Correct', 'Bon', 'Très bon', 'Comme neuf'],
  'French condition labels must use renderable Unicode text',
);
assert.match(appSource, /conditionScaleHtml\(p\.cond\)/, 'condition level must be calculated from the source condition');
assert.match(appSource, /siteText\('product_video'/, 'dynamic video labels must use i18n');
assert.match(appSource, /function syncDefaultCountry\(/, 'checkout country default must update with language');

const styles = fs.readFileSync(path.join(root, 'assets', 'styles.css'), 'utf8');
assert.doesNotMatch(styles, /content:\s*['"]Prezzo['"]/, 'the product price label must not be hard-coded in CSS');
assert.match(styles, /\.mprice-label\s*\{/, 'the translated product price label must be styled');

const about = fs.readFileSync(path.join(root, 'chi-siamo.html'), 'utf8');
for (const marker of [
  'data-i="page_about"',
  'data-i-placeholder="picker_search"',
  'data-i="nav_home"',
  'data-i="footer_tag"',
  'data-i="footer_bottom"',
]) {
  assert.ok(about.includes(marker), `chi-siamo.html must contain ${marker}`);
}

console.log(`shop/about i18n OK: ${pages.length} pages, ${allKeys.size} keys, ${locales.length} locales`);
