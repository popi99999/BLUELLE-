import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const html = fs.readFileSync(path.join(root, 'account.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'assets', 'styles.css'), 'utf8');
const accountJs = fs.readFileSync(path.join(root, 'assets', 'account.js'), 'utf8');
const i18nSource = fs.readFileSync(path.join(root, 'assets', 'i18n-account-legal.js'), 'utf8');

for (const hook of [
  'accountApp', 'loginForm', 'registerForm', 'resetForm', 'profileView',
  'changeForm', 'googleLogin', 'googleRegister', 'logoutBtn', 'accountStatus',
  'profileName', 'profileEmail', 'profileProvider', 'currentPasswordField'
]) {
  assert.match(html, new RegExp(`id=["']${hook}["']`), `missing auth hook #${hook}`);
}

assert.match(html, /data-i="account_login_intro"/, 'login introduction must be translated');
assert.match(html, /class="acct-divider"/, 'reference-style divider is missing');
assert.doesNotMatch(html, /class="acct-divider" aria-hidden="true"/, 'the alternative sign-in label must remain accessible');
assert.match(html, /data-i="account_no_account"/, 'account creation prompt is missing');
assert.match(html, /simple-icons@13\.21\.0\/icons\/google\.svg/, 'Google must use a real icon asset');
assert.equal((html.match(/data-password-toggle=/g) || []).length, 8, 'every password control must expose a visibility toggle');
assert.doesNotMatch(html, /class="acct-copy/, 'legacy two-column account copy must be removed');
assert.doesNotMatch(html, /class="acct-benefits/, 'legacy benefit chips must be removed');

assert.match(css, /\.acct-shell\{width:min\(100%,726px\);margin:0 auto\}/, 'account shell must be a centered single column');
assert.match(css, /\.acct-panel\{[^}]*background:transparent;[^}]*border:0;[^}]*box-shadow:none;/, 'account panel must be visually frameless');
assert.match(css, /\.acct-heading h1\{[^}]*font-family:var\(--f-ui\)/, 'account title must use the Patek-inspired site UI font');
assert.match(css, /\.acct-password-toggle\{/, 'password toggle styling is missing');
assert.match(css, /#profileName\{overflow-wrap:anywhere\}/, 'long profile names must not overflow');

assert.match(accountJs, /\[data-password-toggle\]/, 'password toggle behavior is missing');
assert.match(accountJs, /aria-pressed/, 'password toggle must expose its state');
assert.match(accountJs, /account_password_hide_aria/, 'password toggle must update its accessible label');
assert.match(accountJs, /heading\.focus\(\{preventScroll:false\}\)/, 'view changes must move focus to their heading');

const sandbox = { window: {}, console };
const corePath = path.join(root, 'assets', 'i18n.js');
const generatedPath = path.join(root, 'assets', 'i18n-generated.js');
vm.runInNewContext(fs.readFileSync(corePath, 'utf8'), sandbox, { filename: corePath });
vm.runInNewContext(i18nSource, sandbox, { filename: 'assets/i18n-account-legal.js' });
assert.ok(fs.existsSync(generatedPath), 'assets/i18n-generated.js must exist');
vm.runInNewContext(fs.readFileSync(generatedPath, 'utf8'), sandbox, { filename: generatedPath });
const registered = sandbox.window.BL_I18N.messages;

const requiredKeys = [
  'account_login_intro', 'account_register_intro', 'account_reset_intro',
  'account_profile_intro', 'account_or', 'account_no_account',
  'account_have_account', 'account_password_show', 'account_password_hide',
  'account_password_show_aria', 'account_password_hide_aria'
];
for (const locale of [
  'it', 'en', 'fr', 'es', 'de', 'pt', 'nl', 'pl', 'ro', 'sv',
  'no', 'da', 'el', 'tr', 'ar', 'zh', 'ja', 'ko', 'ru',
]) {
  for (const key of requiredKeys) {
    assert.equal(typeof registered?.[locale]?.[key], 'string', `missing ${locale}.${key}`);
    assert.ok(registered[locale][key].trim(), `empty ${locale}.${key}`);
  }
}

console.log('account redesign OK: centered layout, preserved auth hooks, 19 locales');
