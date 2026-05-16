/* June Tilburg — shared header & footer markup injection
   Each page calls JuneChrome.render({ active: '...' }) before site.js runs.
   This keeps four pages in sync without duplicating SVGs and nav.
*/

(function () {
  const LOGO_SVG = `<img class="site-header__logo-svg" src="assets/logo/june_logo_transparent.png" alt="June.">`;

  const FOOTER_SVG = `<img class="footer-mark__svg" src="assets/logo/june_logo_transparent.png" alt="June.">`;

  // page key → { href, label }
  const NAV = [
    { key: 'menu',     href: 'menu.html',     label: 'Menukaart' },
    { key: 'partners', href: 'partners.html', label: 'Partners & vacatures' },
    { key: 'contact',  href: 'contact.html',  label: 'Contact' },
  ];

  function navMarkup(active, options = {}) {
    return NAV.map(n => {
      const isActive = active === n.key;
      const aria = isActive ? ' aria-current="page"' : '';
      return `<li><a href="${n.href}"${aria}>${n.label}</a></li>`;
    }).join('');
  }

  function headerMarkup(active) {
    return `
      <header class="site-header">
        <div class="site-header__inner">
          <a href="index.html" class="site-header__logo" aria-label="June — naar de homepagina">
            ${LOGO_SVG}
          </a>
          <nav class="site-nav" aria-label="Hoofdmenu">
            <ul>${navMarkup(active)}</ul>
          </nav>
          <button class="site-header__burger" type="button" aria-label="Menu openen" aria-controls="fsmenu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>
      <div class="fullscreen-menu" id="fsmenu" role="dialog" aria-modal="true" aria-label="Navigatiemenu">
        <button class="close" type="button" aria-label="Menu sluiten">✕</button>
        <ul>
          <li><a href="index.html"${active === 'home' ? ' aria-current="page"' : ''}>Home</a></li>
          ${navMarkup(active)}
        </ul>
        <div class="fsm-footer">
          <span>Nieuwlandstraat 16, Tilburg</span>
          <span>Wo – Zo · 09:00 – 16:30</span>
        </div>
      </div>
    `;
  }

  function footerMarkup() {
    return `
      <footer class="site-footer">
        <div class="footer-top">
          <div class="footer-mark">${FOOTER_SVG}</div>
          <div class="footer-col">
            <h4>Bezoek</h4>
            <p>Nieuwlandstraat 16<br>5038 SN Tilburg</p>
            <p>Wo – Za · 09:00 – 16:30<br>Zo · 10:00 – 16:30</p>
          </div>
          <div class="footer-col">
            <h4>Contact</h4>
            <a href="tel:+31138895139">+31 13 889 51 39</a>
            <a href="mailto:info@junetilburg.nl">info@junetilburg.nl</a>
            <a href="https://www.instagram.com/june.tilburg/" target="_blank" rel="noopener">Instagram</a>
            <a href="https://www.facebook.com/june.tilburg/" target="_blank" rel="noopener">Facebook</a>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 June Tilburg</span>
          <span>Specialty coffee &amp; brunch</span>
        </div>
      </footer>
    `;
  }

  window.JuneChrome = {
    render({ active } = {}) {
      const headerSlot = document.getElementById('site-header-slot');
      const footerSlot = document.getElementById('site-footer-slot');
      if (headerSlot) headerSlot.outerHTML = headerMarkup(active);
      if (footerSlot) footerSlot.outerHTML = footerMarkup();
    },
  };
})();
