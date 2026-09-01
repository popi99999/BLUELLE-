# Design QA — Account Bluèlle

## Source of truth

- Reference: `/var/folders/bd/7n9g6s_j10x4z86l3_dgy86w0000gn/T/codex-clipboard-9c7285ea-fc39-4f9e-85a6-f1a02efa85cf.png`
- Reference viewport: 1130 × 1038 px
- Intended state: Italian, signed out, login view
- Explicit user override: use the Patek-inspired typography already used by the site instead of the serif face shown in the reference.

## Evidence

- Desktop implementation: `design-qa-account-desktop.png` — 1130 × 1038 px
- Mobile implementation: `design-qa-account-mobile.png` — responsive 390 × 844 px frame
- Long-locale mobile check: `design-qa-account-mobile-de.png` — German at 390 × 844 px
- Side-by-side comparison: `design-qa-account-comparison.png`

The comparison includes the complete reference and the complete implementation at the same scale. The implementation intentionally retains the live site's global navigation above the account section.

## Fidelity review

- Typography: centered hierarchy, restrained tracking and thin Open Sans treatment match the site's Patek-inspired system.
- Layout: frameless single column, 726 px desktop form width, square controls, full-width primary action, divider, Google action and account prompt match the reference composition.
- Color: flat warm ivory surface, warm black CTA, restrained teal accent and accessible muted text.
- Assets: real Google icon asset; no improvised symbol or placeholder artwork.
- Copy: complete login, registration, reset and profile copy in Italian, English, French, Spanish and German.
- Responsive behavior: no horizontal clipping at 390 px; the longer German heading wraps cleanly.

## Functional review

- Login, registration and password-reset views switch correctly.
- View changes move keyboard focus to the new heading.
- Password visibility toggles update type, label and `aria-pressed` state.
- Invalid email validation is announced in the status region.
- The visible language picker changes the entire account view and document language.
- Clean browser load produced no console errors or warnings.

## Comparison history

1. First pass reproduced the visual structure but the form was wider than the 726 px reference measure.
2. Second pass corrected the column width and control proportions.
3. Final pass applied the explicit Patek-inspired site font, strengthened text/placeholder contrast, preserved the accessible “oppure” label, added focus management and protected long profile names from overflow.
4. Final side-by-side and mobile checks found no remaining P0, P1 or P2 fidelity defects.

final result: passed

---

# Design QA — Scheda prodotto Bluèlle

## Source of truth

- Hero editoriale: `/var/folders/bd/7n9g6s_j10x4z86l3_dgy86w0000gn/T/codex-clipboard-52a63a2f-f3e2-46ec-9846-91a6af5c259c.png` — 1840 × 996 px.
- Gallery e acquisto: `/var/folders/bd/7n9g6s_j10x4z86l3_dgy86w0000gn/T/codex-clipboard-c2dedc4c-8c58-4c38-a781-3c3baa9281e0.png` — 1820 × 944 px.
- Condizione: `/var/folders/bd/7n9g6s_j10x4z86l3_dgy86w0000gn/T/codex-clipboard-a0e819d1-58d8-46d1-ba32-999bc4fd199b.png` — 650 × 236 px.
- Caratteristiche: `/var/folders/bd/7n9g6s_j10x4z86l3_dgy86w0000gn/T/codex-clipboard-afcc74e0-2025-47ab-ac6f-decf8bad781e.png` — 1802 × 284 px.
- Intended state: product `p1`, Italian, available, 1280 × 720 desktop verification and 390 × 844 responsive frame.
- Product constraint: use the real product photography already present in the repository rather than the idealised studio render in the reference.

## Evidence

- Desktop hero: `design-qa-product-hero.png` — 1280 × 720 px.
- Desktop gallery and purchase: `design-qa-product-detail.png` — 1280 × 720 px.
- Desktop continuous dossier: `design-qa-product-dossier.png` — 1280 × 720 px.
- Responsive implementation: `design-qa-product-mobile.png` — 390 × 844 px page inside the 1280 × 720 QA frame.
- Combined reference/implementation input: `design-qa-product-comparison.png` — all four references and all three implementation states in one side-by-side board.

## Fidelity review

- Hero: full-width dark editorial opening, real garment detail on the left, negative space on the right, restrained gold metadata, Lora display title and a fade directly into the commerce surface.
- Main dossier: 58/42 gallery and purchase split, vertical thumbnail rail, large product stage, Patek-inspired typography, thin rules and no detached cards.
- Commerce: equal-weight purchase and personal-assistance actions, three visible service guarantees, official PayPal, Klarna, Scalapay and BitPay assets, plus a translated additional-methods message.
- Condition and characteristics: continue immediately after the commerce grid as two architectural bands, using the same 28/72 information rhythm and no decorative star or invented iconography.
- Responsive behavior: hero, gallery, actions, payment grid, condition scale and native details collapse cleanly at 390 px without horizontal clipping.

## Functional review

- All three product thumbnails replace the active stage media.
- The five native `details` controls open with keyboard-accessible summaries; verified “Misure e vestibilità” exposes `Taglia S. Veste normale.`
- Payment logos begin monochrome and reveal their official colors on hover/focus.
- German runtime check translated the payment heading, condition heading, materials label and checkout availability note; Italian was restored afterward.
- Product-story copy is registered for all 19 supported locales.
- Clean browser load produced no console errors.
- Automated checks cover static structure, dynamic data binding, logo assets, color reveal, mobile reflow and full locale coverage.

## Comparison history

1. Initial implementation reproduced the four visual parts but left the condition inside an over-tall right rail, creating a large empty area below the gallery.
2. The condition report was promoted into a full-width dossier band between commerce and characteristics; the gallery height was aligned to the purchase rail.
3. The first trust strip inherited obsolete decorative circles and the CTA grid inherited old column placement. Both conflicts were removed, restoring the three real icons and the intended purchase-first order.
4. Combined reference/implementation review found the hero image too wide and the title oversized. The image was reduced to 68 vw, recropped to retain the Gucci label and the title was reduced to the reference proportion.
5. Desktop, responsive, hover, accordion, German translation and console checks found no remaining P0, P1 or P2 defects.

final result: passed
