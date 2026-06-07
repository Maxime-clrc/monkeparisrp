(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var section = document.getElementById('tensions');
    if (!section) return;

    // La grille .g2 suit directement le titre de section
    var grid = section.nextElementSibling;
    if (!grid || !grid.classList.contains('g2')) return;

    // On garde les 6 premières cartes visibles, on replie le reste.
    makeCollapsible({
      items:          grid.children,
      visible:        6,
      collapsedClass: 'tension-collapsed',
      btnClass:       'tensions-toggle-btn',
      label: function (n, open) {
        return open
          ? '▲ Masquer les anciennes tensions'
          : '▼ Voir les ' + n + ' autres tensions';
      },
      mount: function (btn) {
        // Juste après la grille
        grid.parentNode.insertBefore(btn, grid.nextSibling);
      }
    });
  });
})();
