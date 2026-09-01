import fs from 'node:fs';
import path from 'node:path';

const manifestPath = process.argv[2] || '/tmp/bluelle-translation-manifest.json';
const outputPath = process.argv[3] || '/tmp/bluelle-translation-output.json';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const requestedLocales = process.argv[4]
  ? process.argv[4].split(',').map((locale) => locale.trim()).filter(Boolean)
  : manifest.targetLocales;
const tokenPattern = /<\/?[^>]+>|\{[a-zA-Z0-9_]+\}|&(?:#\d+|#x[\da-f]+|[a-z]+);|@[a-zA-Z0-9._]+/gi;

function kind(value) {
  if (Array.isArray(value)) return 'array';
  if (value === null) return 'null';
  return typeof value;
}

function validateShape(source, translated, at, locale) {
  assert(kind(translated) === kind(source), `${locale}: ${at} changed type`);
  if (typeof source === 'string') {
    assert(translated.trim(), `${locale}: ${at} is empty`);
    const expected = source.match(tokenPattern) || [];
    const actual = translated.match(tokenPattern) || [];
    assert(JSON.stringify(actual) === JSON.stringify(expected),
      `${locale}: ${at} changed protected tokens\nexpected ${JSON.stringify(expected)}\nactual   ${JSON.stringify(actual)}`);
    return;
  }
  if (Array.isArray(source)) {
    assert(translated.length === source.length, `${locale}: ${at} changed array length`);
    source.forEach((item, index) => validateShape(item, translated[index], `${at}[${index}]`, locale));
    return;
  }
  if (source && typeof source === 'object') {
    const sourceKeys = Object.keys(source);
    const translatedKeys = Object.keys(translated);
    assert(JSON.stringify(translatedKeys) === JSON.stringify(sourceKeys),
      `${locale}: ${at} changed keys`);
    sourceKeys.forEach((key) => validateShape(source[key], translated[key], `${at}.${key}`, locale));
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const locales = {};
for (const locale of requestedLocales) {
  const localePath = `/tmp/bluelle-locale-${locale}.json`;
  assert(fs.existsSync(localePath), `Missing ${localePath}`);
  const translated = JSON.parse(fs.readFileSync(localePath, 'utf8'));
  validateShape(manifest.static, translated.static, 'static', locale);
  validateShape(manifest.app, translated.app, 'app', locale);
  validateShape(manifest.productDescriptions, translated.productDescriptions, 'productDescriptions', locale);
  validateShape(manifest.productNames.values, translated.productNames, 'productNames', locale);
  assert(translated.app.TT.locale === locale, `${locale}: app.TT.locale must be ${locale}`);
  locales[locale] = translated;
  console.log(`${locale}: validated`);
}

fs.writeFileSync(outputPath, `${JSON.stringify({ version: 1, locales }, null, 2)}\n`);
console.log(`Combined locale output: ${path.resolve(outputPath)}`);
