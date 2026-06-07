(function () {

  /* ══════════════════════════════════
     DONNÉES — modifie ici tes quêtes
     statut: 'en-cours' | 'bloque' | 'termine'
  ══════════════════════════════════ */
  var quetes = [
    {
      statut: 'termine',
      titre: 'Rendez-vous Victoire de Montfaucon au Céleste',
      detail: 'Pour prouver à Clothilde et Ragnar qu\'il a "50" meufs, Jeremy a pris rendez-vous avec Victoire pour un petit repas.'
    },
    {
      statut: 'en-cours',
      titre: 'Sabotage Clothilde / Ragnar',
      detail: 'Organiser une rencontre entre Samuel le Grand et Clothilde. Faire en sorte qu\'ils se rapprochent pour contrer la relation Clothilde/Ragnar.'
    },
    {
      statut: 'termine',
      titre: 'Film de propagande — Vautrin',
      detail: 'Confirmer les dates de tournage avec le cabinet du député Olivier Vautrin. Récupérer l\'acompte (partie des 10 000 €).'
    },
    {
      statut: 'en-cours',
      titre: 'Association caritative — collecte de dons',
      detail: 'Avec Alix et César, relancer la communication de l\'association fictive pour enfants handicapés. Identifier de nouveaux donateurs potentiels. Attention : la psychologue d\'Alix est au courant de certains arrangements.'
    },
    {
      statut: 'termine',
      titre: 'Contact Geremy — premier approvisionnement',
      detail: 'Prise de contact établie via Samuel le Grand. Canal d\'approvisionnement discret en place. Éviter tout contact direct visible par la famille De Saint-Claire.'
    },
    {
      statut: 'termine',
      titre: 'Planifier un nouveau "date" avec Victoire de Montfaucon',
      detail: 'Le rendez-vous au Céleste ayant été "saboté" par Clothilde et Ragnar + Victoire ayant des obligations, replanifier un rendez-vous.'
    },
    {
      statut: 'termine',
      titre: 'Réaliser l\'entrainement de kung-fu',
      detail: 'Clothilde a pris contact avec les propriétaires asiatiques du Palais de Jade afin de réaliser un entraînement de kung-fu dans leur dojo pour apprendre à se défendre et pourquoi pas recruter l\'un d\'eux en tant que majordome.'
    },
    {
      statut: 'termine',
      titre: 'Organiser une sortie skatepark',
      detail: ''
    },
    {
      statut: 'termine',
      titre: 'Appeler/aller voir maxime',
      detail: ''
    },
    {
      statut: 'en-cours',
      titre: 'Enquêter sur la famille Larouge (LORE)',
      detail: 'Philomène Larouge enlevée, majordome retrouvé mort, les enfants auraient plus de 100 ans mais en paraissent 20 ?'
    },
    {
      statut: 'en-cours',
      titre: 'Enquêter sur la taupe de la police',
      detail: 'Selon plusieurs sources (Mr Vautrin, Alix via son père..), il y aurait une taupe dans la police'
    },
    {
      statut: 'en-cours',
      titre: 'Enquêter sur les menaces Alix/Vautrin',
      detail: 'Alix et Mr Vautrin ont tout les deux été menacé de mort'
    },
    {
      statut: 'en-cours',
      titre: 'Faire passer le message de Claude au comissaire',
      detail: 'Après avoir été manacé par des opposants à la droite et à la police, un certain Claude et ses accolites demandent à Jeremy de faire passer le message au comissaire : "Blanche n\'est que la première sur la liste"'
    },
    {
      statut: 'en-cours',
      titre: 'Aller prendre le thé avec Nancy Larouge (important/enquête)',
      detail: 'Jeremy et Alix doivent prendre le thé avec Nancy, c\'est l\'occasion d\'en apprendre plus sur le mystère qui plane autour de la famille Larouge'
    },
  ];

  /* ══════════════════════════════════
     TRI — en-cours > bloque > termine
  ══════════════════════════════════ */
  var ORDER = { 'en-cours': 0, 'bloque': 1, 'termine': 2 };

  function sortedQuetes(filter) {
    return quetes
      .filter(function (q) { return filter === 'all' || q.statut === filter; })
      .sort(function (a, b) { return ORDER[a.statut] - ORDER[b.statut]; });
  }

  /* ══════════════════════════════════
     CONSTRUCTION DE LA POPIN
  ══════════════════════════════════ */
  function buildPopin() {
    var overlay = document.createElement('div');
    overlay.id  = 'quetes-overlay';
    overlay.innerHTML = '<div id="quetes-popin" role="dialog" aria-modal="true" aria-label="Quêtes & missions"></div>';

    var popin = overlay.querySelector('#quetes-popin');

    // Compte par statut
    var counts = { 'en-cours': 0, 'bloque': 0, 'termine': 0 };
    quetes.forEach(function (q) { counts[q.statut]++; });

    popin.innerHTML =
      '<div class="qp-header">' +
        '<div class="qp-title">Quêtes & missions</div>' +
        '<button class="qp-close" id="qp-close">✕</button>' +
      '</div>' +
      '<div class="qp-filters">' +
        '<button class="qp-filter" data-filter="all">Toutes <span>' + quetes.length + '</span></button>' +
        '<button class="qp-filter active" data-filter="en-cours">En cours <span>' + counts['en-cours'] + '</span></button>' +
        '<button class="qp-filter" data-filter="bloque">Bloqué <span>' + counts['bloque'] + '</span></button>' +
        '<button class="qp-filter" data-filter="termine">Terminé <span>' + counts['termine'] + '</span></button>' +
      '</div>' +
      '<div class="qp-list" id="qp-list"></div>';

    var list        = popin.querySelector('#qp-list');
    var activeFilter = 'all';

    function renderList(filter) {
      list.innerHTML = '';
      var items = sortedQuetes(filter);

      if (!items.length) {
        list.innerHTML = '<div class="qp-empty">Aucune quête dans cette catégorie.</div>';
        return;
      }

      items.forEach(function (q) {
        var item = document.createElement('div');
        item.className = 'qp-item';

        var statutLabel = q.statut === 'termine' ? 'Terminé'
                        : q.statut === 'bloque'  ? 'Bloqué'
                        : 'En cours';

        item.innerHTML =
          '<div class="qp-item-header">' +
            '<div class="qp-item-left">' +
              '<span class="qp-statut qs-' + q.statut + '">' + statutLabel + '</span>' +
              '<div class="qp-item-titre">' + q.titre + '</div>' +
            '</div>' +
            (q.detail ? '<span class="qp-chevron">▼</span>' : '') +
          '</div>' +
          (q.detail
            ? '<div class="qp-item-detail collapsed">' + q.detail + '</div>'
            : '');

        if (q.detail) {
          var header  = item.querySelector('.qp-item-header');
          var detail  = item.querySelector('.qp-item-detail');
          var chevron = item.querySelector('.qp-chevron');

          header.addEventListener('click', function () {
            var isOpen = !detail.classList.contains('collapsed');
            detail.classList.toggle('collapsed', isOpen);
            chevron.textContent = isOpen ? '▼' : '▲';
          });
        }

        list.appendChild(item);
      });
    }

    // Filtres
    var filterBtns = popin.querySelectorAll('.qp-filter');
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        activeFilter = btn.getAttribute('data-filter');
        renderList(activeFilter);
      });
    });

    document.body.appendChild(overlay);
    renderList('en-cours');

    // Fermetures
    document.getElementById('qp-close').addEventListener('click', closePopin);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closePopin();
    });
    document.addEventListener('keydown', function handler(e) {
      if (e.key === 'Escape') {
        closePopin();
        document.removeEventListener('keydown', handler);
      }
    });

    setTimeout(function () { overlay.classList.add('visible'); }, 10);
  }

  function closePopin() {
    var overlay = document.getElementById('quetes-overlay');
    if (!overlay) return;
    overlay.classList.remove('visible');
    setTimeout(function () { overlay.remove(); }, 200);
  }

  /* ══════════════════════════════════
     INIT
  ══════════════════════════════════ */
  document.addEventListener('DOMContentLoaded', function () {
    var badge = document.getElementById('quetes-badge');
    if (badge) {
      badge.textContent = quetes.filter(function (q) {
        return q.statut === 'en-cours';
      }).length;
    }
  });

  window.openQuetes = function () {
    if (document.getElementById('quetes-overlay')) {
      closePopin();
    } else {
      buildPopin();
    }
  };

})();