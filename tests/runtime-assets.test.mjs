import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const root = path.resolve(import.meta.dirname, '..');
const appPages = [
  'index.html', 'chi-siamo.html', 'collezione.html', 'faq.html',
  'tracking.html', 'contatti.html', 'account.html',
];
const locales = [
  'it', 'en', 'fr', 'es', 'de', 'pt', 'nl', 'pl', 'ro', 'sv',
  'no', 'da', 'el', 'tr', 'ar', 'zh', 'ja', 'ko', 'ru',
];

test('every app page loads generated locales and daily rates before app.js', () => {
  for (const page of appPages) {
    const html = fs.readFileSync(path.join(root, page), 'utf8');
    const generatedAt = html.indexOf('assets/i18n-generated.js');
    const ratesAt = html.indexOf('assets/rates.js');
    const appAt = html.indexOf('assets/app.js');
    assert.ok(generatedAt >= 0, `${page} must load generated locale data`);
    assert.ok(ratesAt > generatedAt, `${page} must load daily rates after locale data`);
    assert.ok(appAt > ratesAt, `${page} must load app.js after daily rates`);
  }
});

test('terms loads generated locales and offers the full locale set', () => {
  const html = fs.readFileSync(path.join(root, 'termini.html'), 'utf8');
  assert.ok(html.indexOf('assets/i18n-generated.js') > html.indexOf('assets/i18n.js'));
  const optionCodes = Array.from(
    html.matchAll(/<option\s+value="([a-z]{2})">/g),
    (match) => match[1],
  );
  assert.deepEqual(optionCodes, locales);
});

test('app delegates live exchange-rate loading to the daily cache module', () => {
  const source = fs.readFileSync(path.join(root, 'assets', 'app.js'), 'utf8');
  assert.match(source, /window\.BL_RATES\.getRates\(\)/);
  assert.doesNotMatch(source, /fetch\('https:\/\/open\.er-api\.com\/v6\/latest\/EUR'/);
});

test('every page using the open rates displays the required discreet attribution', () => {
  for (const page of appPages) {
    const html = fs.readFileSync(path.join(root, page), 'utf8');
    assert.match(
      html,
      /<a class="fx-attribution" href="https:\/\/www\.exchangerate-api\.com"[^>]*>Rates By Exchange Rate API<\/a>/,
      `${page} must attribute the daily exchange-rate provider`,
    );
  }
});

test('the i18n core sets right-to-left direction only for Arabic', () => {
  const source = fs.readFileSync(path.join(root, 'assets', 'i18n.js'), 'utf8');
  assert.match(source, /document\.documentElement\.dir=lang==='ar'\?'rtl':'ltr'/);
});

test('Arabic and CJK locales receive readable native-script typography', () => {
  const css = fs.readFileSync(path.join(root, 'assets', 'styles.css'), 'utf8');
  const terms = fs.readFileSync(path.join(root, 'termini.html'), 'utf8');
  assert.match(css, /html\[lang="ar"\]\{--f-disp:/);
  assert.match(css, /html\[lang="zh"\],html\[lang="ja"\],html\[lang="ko"\]\{--f-disp:/);
  assert.match(css, /html\[lang="ar"\] \[data-i\][^{]*\{[^}]*letter-spacing:0!important;[^}]*text-transform:none!important/);
  assert.match(css, /html\[lang="ar"\] \.brand-word\{direction:ltr;unicode-bidi:isolate\}/);
  assert.match(terms, /html\[lang="ar"\]\{--f-disp:/);
  assert.match(terms, /html\[lang="zh"\],html\[lang="ja"\],html\[lang="ko"\]\{--f-disp:/);
});
