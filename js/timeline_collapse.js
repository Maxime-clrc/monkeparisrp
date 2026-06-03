(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var oldItems = document.querySelectorAll('.tli[data-tl-old="true"]');
    if (!oldItems.length) return;

    // Replie tous les anciens jalons au chargement
    oldItems.forEach(function (item) {
      item.classList.add('tli-collapsed');
    });

    // Crée le bouton "Voir les anciens jalons"
    var tl = document.querySelector('.tl');
    if (!tl) return;

    var btn = document.createElement('button');
    btn.className = 'tl-toggle-btn';
    btn.innerHTML = '▼ Voir les ' + oldItems.length + ' anciens jalons';
    var isOpen = false;

    btn.addEventListener('click', function () {
      isOpen = !isOpen;
      oldItems.forEach(function (item) {
        item.classList.toggle('tli-collapsed', !isOpen);
      });
      btn.innerHTML = isOpen
        ? '▲ Masquer les anciens jalons'
        : '▼ Voir les ' + oldItems.length + ' anciens jalons';
    });

    // Insère le bouton AVANT le premier ancien jalon
    tl.insertBefore(btn, oldItems[0]);
  });
})();
