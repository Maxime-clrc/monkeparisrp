(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var nav     = document.querySelector('.anchor-nav');
    var links   = document.querySelectorAll('.anchor-nav a');
    var targets = Array.from(links).map(function (l) {
      return document.querySelector(l.getAttribute('href'));
    }).filter(Boolean);

    if (!nav || !targets.length) return;

    var isMobile = window.innerWidth <= 768;
    var wrap     = null;

    // ══════════════════════════════════
    //  WRAPPER + FADE MOBILE
    // ══════════════════════════════════
    function setupMobileFade() {
      if (!isMobile) return;

      // Crée le wrapper autour du nav
      wrap = document.createElement('div');
      wrap.className = 'anchor-nav-wrap';
      nav.parentNode.insertBefore(wrap, nav);
      wrap.appendChild(nav);

      // Scroll horizontal → met à jour le fade
      nav.addEventListener('scroll', updateFade, { passive: true });
      updateFade();
    }

    function updateFade() {
      if (!wrap) return;
      var atEnd = nav.scrollLeft + nav.offsetWidth >= nav.scrollWidth - 4;
      wrap.classList.toggle('scrolled-end', atEnd);
    }

    setupMobileFade();

    // ══════════════════════════════════
    //  STICKY
    // ══════════════════════════════════
    var navOffsetTop = nav.getBoundingClientRect().top + window.scrollY;
    var placeholder  = document.createElement('div');
    placeholder.style.display = 'none';
    placeholder.style.height  = nav.offsetHeight + 'px';

    // Le placeholder va avant le wrapper si mobile, sinon avant le nav
    var navParent = wrap || nav;
    navParent.parentNode.insertBefore(placeholder, navParent);

    function updateSticky() {
      var isSticky = window.scrollY > navOffsetTop;
      nav.classList.toggle('sticky', isSticky);
      placeholder.style.display = isSticky ? 'block' : 'none';
      if (wrap) wrap.classList.toggle('nav-is-sticky', isSticky);
    }

    // ══════════════════════════════════
    //  SCROLL SPY
    // ══════════════════════════════════
    function updateActive() {
      var offset  = nav.offsetHeight + 24;
      var scrollY = window.scrollY + offset;
      var atBottom = (window.innerHeight + window.scrollY) >= document.body.scrollHeight - 4;

      var current;
      if (atBottom) {
        current = targets[targets.length - 1];
      } else {
        current = targets[0];
        targets.forEach(function (t) {
          if (t.getBoundingClientRect().top + window.scrollY <= scrollY) {
            current = t;
          }
        });
      }

      links.forEach(function (l) {
        l.classList.toggle('active', l.getAttribute('href') === '#' + current.id);
      });

      // Scroll horizontal auto pour garder le lien actif visible
      var activeLink = nav.querySelector('a.active');
      if (activeLink) {
        var linkLeft  = activeLink.offsetLeft;
        var linkRight = linkLeft + activeLink.offsetWidth;
        var navScroll = nav.scrollLeft;
        var navWidth  = nav.offsetWidth;
        if (linkRight > navScroll + navWidth) {
          nav.scrollLeft = linkRight - navWidth + 16;
        } else if (linkLeft < navScroll) {
          nav.scrollLeft = linkLeft - 16;
        }
        updateFade();
      }
    }

    // ══════════════════════════════════
    //  CLIC ANCRE avec offset sticky
    // ══════════════════════════════════
    links.forEach(function (l) {
      l.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        var offset = nav.offsetHeight + 16;
        var top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });

    // ══════════════════════════════════
    //  EVENTS
    // ══════════════════════════════════
    window.addEventListener('scroll', function () {
      updateSticky();
      updateActive();
    }, { passive: true });

    // Recalcul si resize (rotation mobile)
    window.addEventListener('resize', function () {
      isMobile = window.innerWidth <= 768;
      updateFade();
    });

    updateSticky();
    updateActive();
  });
})();