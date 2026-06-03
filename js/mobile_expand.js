/**
 * mobile_expand.js
 * Boutons "Voir plus / Voir moins" sur mobile (≤ 600px)
 * pour .rd, .tld — descriptions longues dans les cartes relation et timeline.
 */
(function () {
  var BREAKPOINT = 600;
  var SELECTORS  = ['.rd', '.tld'];
  var MIN_HEIGHT = 58; /* px — ~3 lignes à 13px/1.6 */

  function initExpandables() {
    if (window.innerWidth > BREAKPOINT) return;

    SELECTORS.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (el.dataset.expInit) return;
        el.dataset.expInit = '1';

        /* Mesure la hauteur naturelle avant toute modification */
        var h = el.scrollHeight;
        if (h <= MIN_HEIGHT) return;

        el.classList.add('expandable', 'collapsed');

        var btn = document.createElement('button');
        btn.className   = 'toggle-btn';
        btn.textContent = '▼ Voir plus';
        btn.setAttribute('aria-expanded', 'false');

        btn.addEventListener('click', function () {
          var collapsed = el.classList.contains('collapsed');
          if (collapsed) {
            el.classList.remove('collapsed');
            btn.textContent = '▲ Voir moins';
            btn.setAttribute('aria-expanded', 'true');
          } else {
            el.classList.add('collapsed');
            btn.textContent = '▼ Voir plus';
            btn.setAttribute('aria-expanded', 'false');
          }
        });

        el.parentNode.insertBefore(btn, el.nextSibling);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initExpandables);
  } else {
    initExpandables();
  }

  /* Relance sur rotation / redimensionnement */
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initExpandables, 150);
  });
})();