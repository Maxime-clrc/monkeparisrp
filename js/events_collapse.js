(function () {
  document.addEventListener('DOMContentLoaded', function () {
    // On garde les 2 sessions les plus récentes visibles, on replie le reste.
    makeCollapsible({
      items:          document.querySelectorAll('.event-session'),
      visible:        2,
      collapsedClass: 'event-session-collapsed',
      btnClass:       'events-toggle-btn',
      label: function (n, open) {
        return open
          ? '▲ Masquer les sessions précédentes'
          : '▼ Voir les ' + n + ' sessions précédentes';
      },
      mount: function (btn, hidden) {
        // Avant la première session repliée
        hidden[0].parentNode.insertBefore(btn, hidden[0]);
      }
    });
  });
})();
