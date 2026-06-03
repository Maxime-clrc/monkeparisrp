(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var oldSessions = document.querySelectorAll('.event-session[data-session-old="true"]');
    if (!oldSessions.length) return;

    // Replie toutes les anciennes sessions
    oldSessions.forEach(function (s) {
      s.classList.add('event-session-collapsed');
    });

    // Crée le bouton toggle
    var eventsSection = document.getElementById('events');
    if (!eventsSection) return;

    var btn = document.createElement('button');
    btn.className   = 'events-toggle-btn';
    btn.innerHTML   = '▼ Voir les ' + oldSessions.length + ' sessions précédentes';
    var isOpen      = false;

    btn.addEventListener('click', function () {
      isOpen = !isOpen;
      oldSessions.forEach(function (s) {
        s.classList.toggle('event-session-collapsed', !isOpen);
      });
      btn.innerHTML = isOpen
        ? '▲ Masquer les sessions précédentes'
        : '▼ Voir les ' + oldSessions.length + ' sessions précédentes';
    });

    // Insère le bouton après la dernière session visible (avant la première old)
    oldSessions[0].parentNode.insertBefore(btn, oldSessions[0]);
  });
})();