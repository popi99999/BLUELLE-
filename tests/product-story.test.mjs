import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const root = path.resolve(import.meta.dirname, '..');
const html = fs.readFileSync(path.join(root, 'collezione.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'assets', 'styles.css'), 'utf8');
const appSource = fs.readFileSync(path.join(root, 'assets', 'app.js'), 'utf8');

function extractSectionByClass(className) {
  const pattern = new RegExp(
    `<section\\b(?=[^>]*\\bclass=["'][^"']*\\b${className}\\b[^"']*["'])[^>]*>[\\s\\S]*?<\\/section>`,
    'i',
  );
  return html.match(pattern)?.[0] || '';
}

function extractFunction(name, nextMarker) {
  const start = appSource.indexOf(`function ${name}(`);
  const end = appSource.indexOf(nextMarker, start + 1);
  assert.ok(start >= 0 && end > start, `cannot extract ${name} from assets/app.js`);
  return appSource.slice(start, end);
}

function plainText(markup) {
  return markup
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

test('product purchase panel identifies secure payments, four real logos and additional checkout methods', () => {
  const paymentSection = extractSectionByClass('product-payments');
  assert.ok(paymentSection, 'collezione.html must expose a dedicated .product-payments section');
  assert.match(
    paymentSection,
    /data-i=["']product_payments_label["']/i,
    'the secure-payments label must be translated',
  );

  for (const provider of ['PayPal', 'Klarna', 'Scalapay', 'BitPay']) {
    assert.match(
      paymentSection,
      new RegExp(`<img\\b(?=[^>]*\\bsrc=["'][^"']+["'])(?=[^>]*\\balt=["'][^"']*${provider}[^"']*["'])[^>]*>`, 'i'),
      `${provider} must be rendered as a real image logo with accessible alternative text`,
    );
  }

  assert.match(
    paymentSection,
    /data-i=["']product_payments_more["']/i,
    'the additional-methods message must be translated',
  );
  assert.match(
    plainText(paymentSection),
    /(?:\+\s*)?altri(?:\s+metodi)?[^.]*checkout/i,
    'the Italian fallback must make clear that more methods are available at checkout',
  );
});

test('purchase guarantees remain visible and are populated for the selected product', () => {
  assert.match(html, /\bid=["']mtrust["']/, 'the product guarantee strip must remain in the purchase panel');
  assert.match(
    appSource,
    /getElementById\(["']mtrust["']\)\.innerHTML\s*=\s*TR\.map/,
    'the guarantee strip must be populated from the localized guarantee dictionary',
  );

  const trustRules = Array.from(css.matchAll(/\.mtrust\s*\{([^}]*)\}/g), (match) => match[1]);
  assert.ok(trustRules.length, 'the guarantee strip needs a CSS rule');
  assert.ok(
    trustRules.some((rule) => /display\s*:\s*(?:flex|grid)/.test(rule)),
    'the guarantee strip must use a visible flex or grid layout',
  );
  assert.ok(
    trustRules.every((rule) => !/display\s*:\s*none/.test(rule)),
    'the guarantee strip must not be hidden',
  );
});

test('the continuous product story includes the condition report and five accessible characteristics', () => {
  assert.match(html, /data-i=["']product_condition_heading["']/, 'the translated condition section is missing');
  assert.match(html, /\bid=["']conditionScale["']/, 'the dynamic condition scale is missing');
  assert.match(html, /\bid=["']conditionCopy["']/, 'the localized condition explanation is missing');

  const characteristics = extractSectionByClass('product-characteristics');
  assert.ok(characteristics, 'collezione.html must expose a .product-characteristics section');

  const details = Array.from(characteristics.matchAll(/<details\b[\s\S]*?<\/details>/gi), (match) => match[0]);
  const buttons = Array.from(
    characteristics.matchAll(/<button\b(?=[^>]*\baria-expanded=["'](?:true|false)["'])[^>]*>[\s\S]*?<\/button>/gi),
    (match) => match[0],
  );
  assert.ok(
    details.length === 5 || buttons.length === 5,
    'the characteristics accordion must expose five native details or five aria-expanded buttons',
  );

  const expectedLabels = [
    /materiali/i,
    /misure\s+e\s+vestibilit(?:[aà]|&agrave;)/i,
    /autenticazione/i,
    /spedizione\s+e\s+resi/i,
    /pagamenti/i,
  ];
  const controls = details.length
    ? details.map((entry) => entry.match(/<summary\b[^>]*>[\s\S]*?<\/summary>/i)?.[0] || '')
    : buttons;
  controls.forEach((control, index) => {
    assert.ok(control, `accordion entry ${index + 1} needs an accessible control`);
    assert.match(control, /data-i=["'][^"']+["']/, `accordion entry ${index + 1} needs a translated name`);
    if (!details.length) {
      assert.match(control, /aria-controls=["'][^"']+["']/, `accordion button ${index + 1} must name its panel`);
    }
    assert.match(plainText(control), expectedLabels[index], `accordion entry ${index + 1} has the wrong Italian fallback`);
  });
});

test('product data, condition and accordion content are rendered dynamically through localized copy', () => {
  const renderer = extractFunction('fillProductDetails', 'const PRODUCT_FILM_DEFAULT');
  const withoutComments = renderer.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');

  assert.match(renderer, /conditionScale/, 'the renderer must update the condition scale');
  assert.match(
    renderer,
    /(?:productAccordion|productMaterials|productMeasurements|productAuthentication|productShipping|productPayments|data-product-detail)/,
    'the renderer must update the characteristics accordion',
  );
  assert.match(renderer, /\bp\.(?:brand|sz|fit|color|cond|hasBox)\b/, 'accordion content must derive from the selected product');
  assert.match(renderer, /(?:DETAIL_LBL|siteText\()/, 'dynamic product-story copy must come from the i18n layer');
  assert.match(appSource, /fillProductDetails\(p\s*,/, 'opening a product must render its full product story');
  assert.doesNotMatch(
    withoutComments,
    /(?:innerHTML|textContent)\s*=\s*['"`][^'"`]*(?:Materiali|Misure e vestibilit[aà]|Autenticazione|Spedizione e resi|Pagamenti sicuri)/i,
    'rendered product-story labels must not be hard-coded in Italian',
  );
});

test('the product story has desktop and mobile layouts plus colour-reveal payment logos', () => {
  assert.match(
    css,
    /\.ptop\s*\{[^}]*display\s*:\s*grid[^}]*grid-template-columns\s*:/,
    'the main product story needs a desktop grid',
  );
  assert.match(
    css,
    /\.product-payments(?:__logos)?\s*\{[^}]*(?:display\s*:\s*(?:flex|grid)|grid-template-columns\s*:)/,
    'payment methods need an intentional desktop layout',
  );
  assert.match(
    css,
    /\.product-payment-logo img\s*\{[^}]*filter\s*:[^;}]*grayscale\(1\)/,
    'payment logos must begin in a quiet monochrome state',
  );
  assert.match(
    css,
    /\.product-payment-logo:hover img\s*\{[^}]*filter\s*:\s*(?:none|grayscale\(0\))/,
    'hovering a payment logo must reveal its original colours',
  );
  assert.match(
    css,
    /@media\s*\(max-width\s*:\s*\d+px\)[\s\S]*?\.product-payments(?:__logos)?\s*\{[^}]*(?:grid-template-columns\s*:\s*repeat\(2|flex-wrap\s*:\s*wrap)/,
    'the payment block must reflow for mobile screens',
  );
});
