/* June Tilburg — shared header/footer JS */

(function () {
  // Header transparency-to-solid on scroll
  const header = document.querySelector('.site-header');
  if (header && !document.body.classList.contains('has-solid-header')) {
    const onScroll = () => {
      if (window.scrollY > 40) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Burger / fullscreen menu
  const burger = document.querySelector('.site-header__burger');
  const fs = document.getElementById('fsmenu');
  const closeBtn = fs && fs.querySelector('.close');
  if (burger && fs) {
    burger.addEventListener('click', () => fs.classList.add('open'));
    if (closeBtn) closeBtn.addEventListener('click', () => fs.classList.remove('open'));
    fs.querySelectorAll('a').forEach(a => a.addEventListener('click', () => fs.classList.remove('open')));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fs.classList.remove('open'); });
  }

  // Reveal-on-scroll
  const els = document.querySelectorAll('.reveal');
  if (els.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    els.forEach(el => io.observe(el));
  } else {
    els.forEach(el => el.classList.add('is-in'));
  }
})();
