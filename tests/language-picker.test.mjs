import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const appPath = path.join(root, 'assets', 'app.js');
const appSource = fs.readFileSync(appPath, 'utf8');

function extractLiteral(name, nextMarker) {
  const startToken = `const ${name}=`;
  const start = appSource.indexOf(startToken);
  const end = appSource.indexOf(nextMarker, start + startToken.length);
  assert.ok(start >= 0 && end > start, `cannot extract ${name} from assets/app.js`);
  const literal = appSource.slice(start + startToken.length, end).trim().replace(/;$/, '');
  return vm.runInNewContext(`(${literal})`);
}

function extractFunction(name, nextName) {
  const start = appSource.indexOf(`function ${name}(`);
  const end = appSource.indexOf(`function ${nextName}(`, start + 1);
  assert.ok(start >= 0 && end > start, `cannot extract ${name} from assets/app.js`);
  return appSource.slice(start, end).trim();
}

test('language picker exposes exactly the supported languages in product order with native names and flags', () => {
  const languages = extractLiteral('LANGS', 'const LANG_BY_CODE=');
  const visibleEntries = Array.from(languages, ({ code, name, flag }) => ({ code, name, flag }));

  assert.deepEqual(visibleEntries, [
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'ro', name: 'Română', flag: '🇷🇴' },
    { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
    { code: 'no', name: 'Norsk', flag: '🇳🇴' },
    { code: 'da', name: 'Dansk', flag: '🇩🇰' },
    { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  ]);

  const list = { innerHTML: '' };
  const sandbox = {
    LANGS: languages,
    pickerMode: 'lang',
    curLang: 'it',
    document: { getElementById: () => list },
    escHtml: (value) => String(value),
    siteText: (_key, fallback) => fallback,
  };
  vm.runInNewContext(`${extractFunction('buildPickerList', 'togglePicker')}; buildPickerList('');`, sandbox);
  const renderedEntries = Array.from(
    list.innerHTML.matchAll(/<span class="pick-code">([^<]+)<\/span><span class="pick-name">([^<]+)<\/span>/g),
    (match) => ({ flag: match[1], name: match[2] }),
  );
  assert.deepEqual(
    renderedEntries,
    visibleEntries.map(({ flag, name }) => ({ flag, name })),
    'the visible picker rows must show each flag beside its native language name',
  );
});

test('choosing a currency leaves the selected language unchanged', () => {
  const writes = [];
  const currencySelect = { value: '' };
  const sandbox = {
    CUR: { EUR: { code: 'EUR' }, USD: { code: 'USD' } },
    curLang: 'it',
    curCurr: 'EUR',
    localStorage: { setItem(key, value) { writes.push([key, value]); } },
    document: {
      getElementById(id) {
        return id === 'currSel' ? currencySelect : null;
      },
      querySelectorAll() { return [currencySelect]; },
    },
    hydrateCurrencySelects() {},
    renderPrices() {},
    updatePickerLabels() {},
    closePicker() {},
  };

  vm.runInNewContext(
    `${extractFunction('setCurr', 'updatePickerLabels')}\n${extractFunction('selectCurr', 'selectLang')}; selectCurr('USD');`,
    sandbox,
  );

  assert.equal(sandbox.curCurr, 'USD');
  assert.equal(currencySelect.value, 'USD');
  assert.equal(sandbox.curLang, 'it');
  assert.deepEqual(writes, [['bl_curr', 'USD']], 'currency selection must never write the language preference');
});

test('every currency already configured in the app hydrates both currency dropdowns', () => {
  const currencies = extractLiteral('CURRENCIES', 'const CUR=');
  const codes = Array.from(currencies, (currency) => currency.code);
  assert.deepEqual(codes, [
    'EUR', 'USD', 'GBP', 'CHF', 'JPY', 'CNY', 'AUD', 'CAD', 'NZD', 'SEK', 'NOK', 'DKK',
    'ISK', 'PLN', 'CZK', 'HUF', 'RON', 'BGN', 'TRY', 'RUB', 'UAH', 'AED', 'SAR', 'QAR',
    'KWD', 'BHD', 'ILS', 'INR', 'IDR', 'MYR', 'SGD', 'HKD', 'TWD', 'KRW', 'THB', 'PHP',
    'VND', 'ZAR', 'EGP', 'MAD', 'BRL', 'MXN', 'ARS', 'CLP', 'COP', 'PEN',
  ]);
  assert.equal(new Set(codes).size, 46);
  assert.match(appSource, /document\.querySelectorAll\('#currSel,#geoCurr'\)/);
  assert.match(appSource, /CURRENCIES\.map\(function\(currency\)/);
  assert.match(appSource, /currencyDisplayName\(currency\)/);
});

test('the offline fallback covers every configured currency until the daily rates arrive', () => {
  const currencies = extractLiteral('CURRENCIES', 'const CUR=');
  const fallbackRates = extractLiteral('rates', '// Elenco valute');
  const missing = Array.from(currencies, (currency) => currency.code)
    .filter((code) => !(code in fallbackRates) || !(fallbackRates[code] > 0));
  assert.deepEqual(missing, [], `missing positive fallback rates for: ${missing.join(', ')}`);
  assert.equal(fallbackRates.EUR, 1);
});

test('currency amounts use the full locale selected in the language picker', () => {
  const languages = extractLiteral('LANGS', 'const LANG_BY_CODE=');
  const byCode = Object.fromEntries(Array.from(languages, (language) => [language.code, language]));
  const locales = {
    it: 'it-IT', en: 'en-GB', fr: 'fr-FR', es: 'es-ES', de: 'de-DE',
    pt: 'pt-PT', nl: 'nl-NL', pl: 'pl-PL', ro: 'ro-RO', sv: 'sv-SE',
    no: 'no-NO', da: 'da-DK', el: 'el-GR', tr: 'tr-TR', ar: 'ar-SA',
    zh: 'zh-CN', ja: 'ja-JP', ko: 'ko-KR', ru: 'ru-RU',
  };

  for (const [code, locale] of Object.entries(locales)) {
    assert.equal(byCode[code]?.locale, locale, `${code} must use the full ${locale} locale`);
  }

  function format(language, currency, amount) {
    const sandbox = {
      curLang: language,
      curCurr: currency,
      rates: { [currency]: 1 },
      CUR: { [currency]: { code: currency, sym: currency } },
      LANG_BY_CODE: byCode,
      Intl,
    };
    return vm.runInNewContext(`(()=>{${extractFunction('fmt', 'fetchRates')}\nreturn fmt(${amount});})()`, sandbox);
  }

  for (const [language, currency] of [
    ['it', 'EUR'],
    ['en', 'GBP'],
    ['pl', 'PLN'],
    ['ar', 'AED'],
    ['ja', 'JPY'],
  ]) {
    const expected = new Intl.NumberFormat(locales[language], {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(1234);
    assert.equal(format(language, currency, 1234), expected, `${language}/${currency} must follow ${locales[language]}`);
  }
});

test('selecting Arabic enables RTL and every other language restores LTR', () => {
  const languages = extractLiteral('LANGS', 'const LANG_BY_CODE=');
  const byCode = Object.fromEntries(Array.from(languages, (language) => [language.code, language]));
  const documentElement = { lang: 'it', dir: 'ltr' };
  const sandbox = {
    LANG_BY_CODE: byCode,
    curLang: 'it',
    localStorage: { setItem() {} },
    document: {
      documentElement,
      querySelectorAll: () => [],
      getElementById: () => null,
    },
    T: { it: {}, en: {} },
    EXTRA_T: { it: {}, en: {} },
    TRUST_LBL: { it: [], en: [] },
    langBase(code) {
      return byCode[code]?.base || code || 'it';
    },
    syncLangSelects() {},
    render() {},
    window: { BL_I18N: { apply() {} } },
    location: { hash: '' },
    syncDefaultCountry() {},
    updatePickerLabels() {},
    ckCurrentProduct: null,
  };

  vm.runInNewContext(extractFunction('setLang', 'setCurr'), sandbox);
  sandbox.setLang('ar');
  assert.equal(documentElement.lang, 'ar');
  assert.equal(documentElement.dir, 'rtl');

  sandbox.setLang('ja');
  assert.equal(documentElement.lang, 'ja');
  assert.equal(documentElement.dir, 'ltr');
});
