import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const pages = [
  'index.html',
  'chi-siamo.html',
  'collezione.html',
  'faq.html',
  'tracking.html',
  'contatti.html',
  'account.html',
  'termini.html',
];
const locales = ['it', 'en', 'fr', 'es', 'de'];
const i18nPath = path.join(root, 'assets', 'i18n.js');

assert.ok(fs.existsSync(i18nPath), 'assets/i18n.js must provide the site-wide translation layer');

const sandbox = { window: {}, console };
vm.runInNewContext(fs.readFileSync(i18nPath, 'utf8'), sandbox, { filename: i18nPath });
for (const file of fs.readdirSync(path.join(root, 'assets')).filter((name) => /^i18n-.+\.js$/.test(name)).sort()) {
  const filePath = path.join(root, 'assets', file);
  vm.runInNewContext(fs.readFileSync(filePath, 'utf8'), sandbox, { filename: filePath });
}
const i18n = sandbox.window.BL_I18N;
assert.ok(i18n, 'assets/i18n.js must expose window.BL_I18N');
assert.deepEqual(Array.from(i18n.locales), locales, 'only fully translated languages may be offered');

for (const page of pages) {
  const html = fs.readFileSync(path.join(root, page), 'utf8');
  assert.match(html, /assets\/i18n\.js/, `${page} must load the site-wide translation layer`);
}

const dictionaries = i18n.messages;
const appSource = fs.readFileSync(path.join(root, 'assets', 'app.js'), 'utf8');
const extractObject = (name, nextMarker) => {
  const startToken = `const ${name}=`;
  const start = appSource.indexOf(startToken);
  const end = appSource.indexOf(nextMarker, start + startToken.length);
  assert.ok(start >= 0 && end > start, `cannot extract ${name} from assets/app.js`);
  const literal = appSource.slice(start + startToken.length, end).trim().replace(/;$/, '');
  return vm.runInNewContext(`(${literal})`);
};
const legacyT = extractObject('T', 'const EXTRA_T=');
const legacyExtra = extractObject('EXTRA_T', '// CHECKOUT TRANSLATIONS');
const checkoutMessages = extractObject('CK', '// PRODUCTS');
for (const locale of locales) {
  Object.assign(dictionaries[locale], legacyT[locale] || {}, legacyExtra[locale] || {});
}
for (const locale of locales) {
  assert.ok(dictionaries[locale], `missing ${locale} dictionary`);
}

for (const key of ['picker_currency_search', 'picker_language_search', 'picker_empty']) {
  for (const locale of locales) {
    assert.equal(typeof dictionaries[locale][key], 'string', `missing ${locale} dynamic picker translation "${key}"`);
  }
}

for (const key of ['picker_currency_search', 'picker_language_search', 'picker_empty']) {
  assert.match(appSource, new RegExp(`siteText\\('${key}'`), `assets/app.js must use the translated ${key} copy`);
}
assert.match(
  appSource,
  /const haystack=\[p\.name,translateName\(p\.name,curLang\)/,
  'collection search must include the translated product name',
);
assert.match(
  appSource,
  /trackingResult\.textContent\.trim\(\).*doTrack\(\)/s,
  'an open tracking result must refresh when the language changes',
);

const termsHtml = fs.readFileSync(path.join(root, 'termini.html'), 'utf8');
assert.match(termsHtml, /<select\b[^>]*\bid="legalLang"/, 'terms must expose a language selector');
for (const locale of locales) {
  assert.match(termsHtml, new RegExp(`<option value="${locale}">`), `terms selector must offer ${locale}`);
}

const italianSignals = /(?:\b(?:il|la|lo|gli|le|un|una|di|del|della|dei|delle|con|per|alla|che|come|quest[oa]|nostr[oaie]|tu[oa]|capi|capo|ordine|pagamento|spedizione|contatti|siamo|accedi|crea|password|scrivici|cerca|filtri|disponibile|sicuro|selezionat[oaie]|autenticat[oaie]|venditore|privacy|reso|condizioni|invia|messaggio)\b|[àèìòù])/i;
const textTags = /<(title|h1|h2|h3|h4|p|summary|button|label|a)\b([^>]*)>([\s\S]*?)<\/\1>/gi;
const stripMarkup = (value) => value
  .replace(/<svg\b[\s\S]*?<\/svg>/gi, '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;|&#160;/gi, ' ')
  .replace(/&amp;/gi, '&')
  .replace(/\s+/g, ' ')
  .trim();

const missingMarkers = [];
const usedKeys = new Set();
const usedCheckoutKeys = new Set();
const keysByPage = new Map();

for (const page of pages) {
  const html = fs.readFileSync(path.join(root, page), 'utf8')
    .replace(/<style\b[\s\S]*?<\/style>/gi, '')
    .replace(/<script\b[\s\S]*?<\/script>/gi, '');

  const pageKeys = new Set();
  for (const match of html.matchAll(/\bdata-i(?:-placeholder|-aria|-alt|-title|-content)?="([^"]+)"/g)) {
    usedKeys.add(match[1]);
    pageKeys.add(match[1]);
  }
  keysByPage.set(page, pageKeys);
  for (const match of html.matchAll(/\bdata-ck(?:-opt)?="([^"]+)"/g)) usedCheckoutKeys.add(match[1]);

  for (const match of html.matchAll(textTags)) {
    const [, tag, attrs, body] = match;
    const text = stripMarkup(body);
    if (!text || /\bbrand-word\b/.test(attrs) || /\bdata-i(?:-|=)/.test(body) || text === 'Bluèlle' || text === '@bluelle._') continue;
    if (italianSignals.test(text) && !/\bdata-i="/.test(attrs)) {
      missingMarkers.push(`${page}: <${tag}> ${text.slice(0, 90)}`);
    }
  }

  for (const match of html.matchAll(/<(input|textarea|button|nav|section|div|img)\b([^>]*)>/gi)) {
    const [, tag, attrs] = match;
    for (const attr of ['placeholder', 'aria-label', 'alt', 'title']) {
      const value = attrs.match(new RegExp(`\\b${attr}="([^"]+)"`, 'i'))?.[1];
      if (!value || value === 'Bluèlle' || !italianSignals.test(value)) continue;
      const marker = attr === 'placeholder' ? 'data-i-placeholder' : attr === 'title' ? 'data-i-title' : attr === 'alt' ? 'data-i-alt' : 'data-i-aria';
      if (!new RegExp(`\\b${marker}="`).test(attrs)) {
        missingMarkers.push(`${page}: <${tag}> ${attr}="${value}"`);
      }
    }
  }
}

assert.equal(
  missingMarkers.length,
  0,
  `Italian interface copy is not wired to i18n:\n${missingMarkers.join('\n')}`,
);

for (const key of usedKeys) {
  for (const locale of locales) {
    assert.equal(
      typeof dictionaries[locale][key],
      'string',
      `missing ${locale} translation for data-i key "${key}"`,
    );
  }
}

for (const page of pages) {
  const html = fs.readFileSync(path.join(root, page), 'utf8');
  const pageSandbox = { window: {}, console };
  vm.runInNewContext(fs.readFileSync(i18nPath, 'utf8'), pageSandbox, { filename: i18nPath });
  for (const match of html.matchAll(/<script\b[^>]*\bsrc="(assets\/i18n-[^"?]+\.js)(?:\?[^"#]*)?"/gi)) {
    const packPath = path.join(root, match[1]);
    vm.runInNewContext(fs.readFileSync(packPath, 'utf8'), pageSandbox, { filename: packPath });
  }
  const pageMessages = pageSandbox.window.BL_I18N.messages;
  for (const locale of locales) Object.assign(pageMessages[locale], legacyT[locale] || {}, legacyExtra[locale] || {});
  for (const key of keysByPage.get(page)) {
    for (const locale of locales) {
      assert.equal(
        typeof pageMessages[locale][key],
        'string',
        `${page} does not load the ${locale} translation for data-i key "${key}"`,
      );
    }
  }
}

for (const key of usedCheckoutKeys) {
  for (const locale of locales) {
    assert.equal(
      typeof checkoutMessages[locale][key],
      'string',
      `missing ${locale} checkout translation for data-ck key "${key}"`,
    );
  }
}

console.log(`i18n coverage OK: ${pages.length} pages, ${usedKeys.size} site keys, ${usedCheckoutKeys.size} checkout keys, ${locales.length} locales`);
