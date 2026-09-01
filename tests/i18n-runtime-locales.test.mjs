import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const generatedPath = path.join(root, 'assets', 'i18n-generated.js');
const locales = ['pt', 'nl', 'pl', 'ro', 'sv', 'no', 'da', 'el', 'tr', 'ar', 'zh', 'ja', 'ko', 'ru'];
const groups = [
  'T', 'EXTRA_T', 'CK', 'PRODUCT_FIELDS', 'SPEC_LBL', 'TRUST_LBL',
  'DETAIL_LBL', 'TT', 'STEPS', 'TMSG', 'GEO_T', 'ORDER_ETA',
];

function stringLeaves(value, at = 'value') {
  if (typeof value === 'string') return [[at, value]];
  if (Array.isArray(value)) return value.flatMap((item, index) => stringLeaves(item, `${at}[${index}]`));
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) => stringLeaves(item, `${at}.${key}`));
  }
  return [];
}

test('generated runtime dictionaries cover every new locale with non-empty text', () => {
  assert.ok(fs.existsSync(generatedPath), 'assets/i18n-generated.js must exist');
  const sandbox = { window: {}, console };
  vm.runInNewContext(fs.readFileSync(generatedPath, 'utf8'), sandbox, { filename: generatedPath });
  const app = sandbox.window.BL_APP_I18N;
  assert.ok(app, 'generated bundle must expose BL_APP_I18N');

  for (const group of groups) {
    assert.ok(app[group], `missing runtime group ${group}`);
    assert.deepEqual(Object.keys(app[group]), locales, `${group} must cover every generated locale`);
    for (const locale of locales) {
      for (const [at, value] of stringLeaves(app[group][locale], `${group}.${locale}`)) {
        assert.ok(value.trim(), `${at} must not be empty`);
      }
    }
  }
});

test('Arabic, CJK and Cyrillic translations contain their native scripts', () => {
  const sandbox = { window: {}, console };
  vm.runInNewContext(fs.readFileSync(generatedPath, 'utf8'), sandbox, { filename: generatedPath });
  const messages = sandbox.window.BL_APP_I18N.T;
  assert.match(JSON.stringify(messages.ar), /[\u0600-\u06ff]/, 'Arabic should contain Arabic script');
  assert.match(JSON.stringify(messages.zh), /[\u3400-\u9fff]/, 'Chinese should contain Han characters');
  assert.match(JSON.stringify(messages.ja), /[\u3040-\u30ff\u3400-\u9fff]/, 'Japanese should contain Japanese script');
  assert.match(JSON.stringify(messages.ko), /[\uac00-\ud7af]/, 'Korean should contain Hangul');
  assert.match(JSON.stringify(messages.ru), /[\u0400-\u04ff]/, 'Russian should contain Cyrillic');
});

test('interpolation tokens and semantic markup survive generation', () => {
  const sandbox = { window: {}, console };
  vm.runInNewContext(fs.readFileSync(generatedPath, 'utf8'), sandbox, { filename: generatedPath });
  for (const locale of locales) {
    const staticMessages = sandbox.window.BL_I18N_GENERATED_STATIC?.[locale];
    assert.ok(staticMessages, `missing generated static dictionary for ${locale}`);
    for (const token of ['{name}', '{color}', '{fit}', '{condition}']) {
      assert.ok(staticMessages.product_desc.includes(token), `${locale}.product_desc must preserve ${token}`);
    }
    assert.match(staticMessages.account_profile_greeting, /\{name\}/);
    assert.match(sandbox.window.BL_APP_I18N.GEO_T[locale].from, /\{country\}/);
    assert.match(sandbox.window.BL_APP_I18N.T[locale].about_title, /<br><em>.*<\/em>/s);
  }
});

test('each added locale translates representative copy across the whole site', () => {
  const sandbox = { window: {}, console };
  vm.runInNewContext(fs.readFileSync(generatedPath, 'utf8'), sandbox, { filename: generatedPath });
  const generated = sandbox.window;
  const english = {
    account: 'Welcome back.',
    legal: 'Terms of Service<br><em>and Privacy</em>',
    hero: 'Explore the collection',
    checkout: 'Your <em style="color:var(--brass)">details</em>',
    product: 'Blue Gucci V-neck jumper with a GG monogram intarsia-knit in gold yarn. One of the house’s most elegant silhouettes.',
  };

  for (const locale of locales) {
    assert.notEqual(generated.BL_I18N_GENERATED_STATIC[locale].account_login_title, english.account, `${locale} account copy is still English`);
    assert.notEqual(generated.BL_I18N_GENERATED_STATIC[locale].legal_hero_title, english.legal, `${locale} legal copy is still English`);
    assert.notEqual(generated.BL_APP_I18N.T[locale].hero_cta, english.hero, `${locale} home copy is still English`);
    assert.notEqual(generated.BL_APP_I18N.CK[locale].ck_title, english.checkout, `${locale} checkout copy is still English`);
    assert.notEqual(generated.BL_PRODUCT_COPY_EXT['1'][locale], english.product, `${locale} product copy is still English`);
  }
});
