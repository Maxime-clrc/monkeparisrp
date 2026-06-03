(function () {
  var btn = document.getElementById('theme-toggle');
  var html = document.documentElement;

  function applyTheme(theme, animate) {
    if (animate) {
      html.classList.add('theme-transitioning');
      setTimeout(function () { html.classList.remove('theme-transitioning'); }, 300);
    }

    if (theme === 'light') {
      html.setAttribute('data-theme', 'light');
      btn.textContent = '☾';
      btn.title = 'Mode sombre';
    } else {
      html.removeAttribute('data-theme');
      btn.textContent = '☀';
      btn.title = 'Mode clair';
    }

    localStorage.setItem('theme', theme);
  }

  var saved = localStorage.getItem('theme');
  applyTheme(saved || 'dark', false);

  btn.addEventListener('click', function () {
    var current = html.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    applyTheme(current === 'light' ? 'dark' : 'light', true);
  });
})();
