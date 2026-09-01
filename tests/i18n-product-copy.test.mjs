import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const appPath = path.join(root, 'assets', 'app.js');
const copyPath = path.join(root, 'assets', 'i18n-product-copy.js');
const appSource = fs.readFileSync(appPath, 'utf8');

assert.ok(fs.existsSync(copyPath), 'the curated product translation file must exist');

const productsStartToken = 'const prods = ';
const productsStart = appSource.indexOf(productsStartToken);
const productsEnd = appSource.indexOf('\n];', productsStart) + 3;
assert.ok(productsStart >= 0 && productsEnd > productsStart, 'cannot extract products from assets/app.js');
const productsLiteral = appSource.slice(productsStart + productsStartToken.length, productsEnd).trim().replace(/;$/, '');
const products = vm.runInNewContext(`(${productsLiteral})`);

const sandbox = { window: {}, console };
vm.runInNewContext(fs.readFileSync(copyPath, 'utf8'), sandbox, { filename: copyPath });
const generatedPath = path.join(root, 'assets', 'i18n-generated.js');
assert.ok(fs.existsSync(generatedPath), 'the generated locale bundle must exist');
vm.runInNewContext(fs.readFileSync(generatedPath, 'utf8'), sandbox, { filename: generatedPath });
const copy = sandbox.window.BL_PRODUCT_COPY;
assert.ok(copy, 'the product copy file must expose window.BL_PRODUCT_COPY');

const sourceIds = Array.from(products, (product) => String(product.id)).sort((a, b) => Number(a) - Number(b));
const translatedIds = Object.keys(copy).sort((a, b) => Number(a) - Number(b));
assert.deepEqual(translatedIds, sourceIds, 'curated product translations must cover every product ID exactly once');

const locales = [
  'en', 'fr', 'es', 'de', 'pt', 'nl', 'pl', 'ro', 'sv',
  'no', 'da', 'el', 'tr', 'ar', 'zh', 'ja', 'ko', 'ru',
];
for (const product of products) {
  for (const locale of locales) {
    const value = copy[product.id]?.[locale];
    assert.equal(typeof value, 'string', `missing ${locale} description for product ${product.id}`);
    const minimumLength = ['zh', 'ja', 'ko'].includes(locale) ? 18 : 35;
    assert.ok(value.trim().length >= minimumLength, `${locale} description for product ${product.id} is unexpectedly short`);
  }
  assert.equal(Object.keys(copy[product.id]).length, locales.length, `product ${product.id} has unexpected locale keys`);
}

for (const locale of locales) {
  assert.ok(
    copy[44][locale].length >= 35,
    `${locale} product 44 must preserve a substantive disclosure of the detached wash-care label`,
  );
}

const names = sandbox.window.BL_PRODUCT_NAMES;
assert.ok(names, 'the generated locale bundle must expose translated product names');
for (const locale of locales.filter((locale) => locale !== 'en' && !['fr', 'es', 'de'].includes(locale))) {
  for (const product of products) {
    assert.equal(typeof names[locale]?.[product.name], 'string', `missing ${locale} product name for ${product.name}`);
    assert.ok(names[locale][product.name].trim(), `empty ${locale} product name for ${product.name}`);
  }
}

assert.match(appSource, /window\.BL_PRODUCT_COPY/, 'app.js must consume the curated product descriptions');
const collection = fs.readFileSync(path.join(root, 'collezione.html'), 'utf8');
const copyAt = collection.indexOf('assets/i18n-product-copy.js?v=20260831b');
const appAt = collection.indexOf('assets/app.js');
assert.ok(copyAt >= 0 && appAt > copyAt, 'product descriptions must load before app.js');

console.log(`product copy OK: ${products.length} products, ${locales.length} translated locales`);
