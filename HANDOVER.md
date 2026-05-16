# June. Website — Claude Handover

## What this project is
A static HTML website concept for **June.** — a specialty coffee & brunch café in Tilburg (Dwaalgebied). The site has 4 pages: `index.html`, `menu.html`, `contact.html`, `partners.html`.

---

## File structure

```
Claude Design/
├── index.html          ← Homepage (hero, about, gallery, visit)
├── menu.html           ← Menu page
├── contact.html        ← Contact & reservations
├── partners.html       ← Partners & vacatures
├── styles/
│   ├── site.css        ← All shared CSS
│   ├── chrome.js       ← Injects shared header + footer into every page
│   └── site.js         ← Scroll behaviour, burger menu, reveal animations
└── assets/
    ├── logo/
    │   ├── june_logo_transparent.png   ← Olive logo on transparent bg (USE THIS)
    │   ├── june_logo_horizontal.png    ← Olive logo on beige bg
    │   ├── june_logo_square.png        ← Cream logo on olive bg
    │   ├── june_logo_horizontal.svg    ← Large pixel-art SVG (avoid inlining)
    │   └── june_logo_square.svg        ← Large pixel-art SVG (avoid inlining)
    ├── photos/                         ← All food/interior JPGs
    └── menu/                           ← Menu PDF + JPG previews
```

---

## How the header & footer work
Every page has two empty divs:
```html
<div id="site-header-slot"></div>
...
<div id="site-footer-slot"></div>
```
Then at the bottom of each page:
```html
<script src="styles/chrome.js"></script>
<script>JuneChrome.render({ active: 'home' });</script>  <!-- 'home'|'menu'|'partners'|'contact' -->
<script src="styles/site.js"></script>
```
`chrome.js` replaces those slots with the full header and footer markup. **Edit `chrome.js` to change anything that appears on all pages** (logo, nav links, footer address, etc.).

---

## Brand colours (CSS variables in site.css)
```css
--bg:        #F1E9D9;   /* sand — page background */
--text:      #555440;   /* dark olive — body text */
--accent:    #858264;   /* olive — headings, logo */
--warm:      #C26A39;   /* rust — CTAs, highlights */
--warm-deep: #8E441E;   /* rust hover */
--dark:      #2A2620;   /* near-black — footer, dark sections */
--cream:     #FAF5EA;   /* subtle card elevation */
```
Font: **Prata** (Google Fonts, loaded in every HTML `<head>`).

---

## Logo — what was fixed & how it works now

### The problem that was fixed
`chrome.js` originally had hand-crafted SVG path strings that didn't match the real June. logo (which has a distinctive merged U+N letterform). Those were replaced with `<img>` tags pointing to the actual files.

### Current logo implementation

**Header** (`chrome.js` → `LOGO_SVG`):
```js
const LOGO_SVG = `<img class="site-header__logo-svg" src="assets/logo/june_logo_transparent.png" alt="June.">`;
```
CSS rules in `site.css` handle colour states:
- **Over hero / not scrolled** → `filter: brightness(0) invert(1)` (turns logo white)
- **Scrolled or inner pages** → `filter: none` (natural olive colour)
- Sizes: 44px mobile / 52px desktop

**Footer** (`chrome.js` → `FOOTER_SVG`):
```js
const FOOTER_SVG = `<img class="footer-mark__svg" src="assets/logo/june_logo_transparent.png" alt="June.">`;
```
CSS: `filter: brightness(0) invert(1) opacity(0.85)` → appears soft white on the dark footer.

---

## Homepage hero — what was changed

The `<h1>` in the hero now uses the actual logo image instead of text:
```html
<h1 class="home-hero__title">
  <img src="assets/logo/june_logo_transparent.png" alt="June.">
</h1>
```
Key CSS (inline `<style>` block inside `index.html`):
```css
.home-hero__title {
  margin: -4vw 0 -5vw;   /* compensates for PNG's internal whitespace */
  line-height: 1;
}
.home-hero__title img {
  display: block;
  width: clamp(180px, 30vw, 460px);
  height: auto;
  filter: brightness(0) invert(1);  /* white over dark hero image */
}
```
The negative margins pull "Tilburg · Dwaalgebied" and "Specialty coffee & brunch" visually close to the logo (the PNG has ~20% transparent padding inside it).

---

## Gallery (index.html) — current state

**12 uniform square cells, no tall/wide spans.** This was simplified from a more complex layout because mixed span sizes caused empty spots at different viewport widths. 12 divides evenly into 4-col (desktop), 3-col (tablet), and 2-col (mobile).

Grid CSS (inside `index.html` `<style>`):
```css
.gallery-grid {
  display: grid;
  grid-auto-flow: dense;
  grid-template-columns: repeat(2, 1fr);  /* mobile */
}
@media (min-width: 700px) {
  .gallery-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (min-width: 1100px) {
  .gallery-grid { grid-template-columns: repeat(4, 1fr); }
}
```

Photos currently in the gallery (in order):
1. pancakes.jpg
2. coffees-marble.jpg
3. brunch-sesame.jpg
4. acai-bowl.jpg
5. coffee-shadow.jpg
6. fresh-meal.jpg
7. cucumber-cheese.jpg
8. latte-art-marble.jpg
9. breakfast-bowl.jpg
10. crumble-dessert.jpg
11. croissant-icecream.jpg
12. colorful-plate.jpg

Photos **removed from gallery** during this session (still exist in `assets/photos/`):
- `giraffe-coffee.jpg` — was a tall spanning cell, caused layout gaps
- `coffee-making.jpg` — removed to fix cell count
- `latte-pastry.jpg` — removed to fix cell count
- `marble-dish.jpg` — removed to achieve exactly 12 cells

---

## Known things still to do / possible next steps
- The `menu.html`, `contact.html`, `partners.html` pages have their own hero/content — none of that was touched in this session
- The gallery photos removed are still available in `assets/photos/` if the client wants to restore any
- Email links use a Cloudflare email-obfuscation script (`/cdn-cgi/...`) which won't work locally — this is fine for a static concept
- If you want tall/wide spanning cells back in the gallery: the total cell count must be a multiple of 12 to avoid empty spots at all breakpoints (e.g., 12 all-normal, or carefully chosen combinations — see note below)

### The gallery empty-spot rule (important)
With a responsive grid (2-col / 3-col / 4-col), to have **zero gaps at all breakpoints** the total number of grid squares must be divisible by LCM(2,3,4) = **12**. Each normal cell = 1 square, each `tall` (row-span 2) = 2 squares, each `wide` (col-span 2) = 2 squares. Count before adding spans.
