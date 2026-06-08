(function () {

  /* ══════════════════════════════════
     DONNÉES — modifie ici le lore
     categorie: 'mystere' | 'politique' | 'menaces' | 'criminel'
  ══════════════════════════════════ */
  var lore = [
    {
      categorie: 'mystere',
      titre: 'L\'affaire Larouge',
      resume: 'Famille immortelle liée aux Capétiens, salle secrète de poupées de cire, plan d\'infiltration en cours.',
      detail:
        '<strong>Chronologie des faits</strong><br>' +
        '— <em>22/05 :</em> découverte du cadavre du majordome <strong>Denolo</strong> à la Chapelle expiatoire (guidés par une chatte). Lié à la disparition de <strong>Philomène Larouge</strong>, styliste. Son identité réelle reste inconnue.<br>' +
        '— <em>31/05 :</em> Alix révèle que les enfants Larouge auraient <strong>plus de 100 ans</strong> selon des documents, mais paraissent 20 ans sur les photos.<br>' +
        '— <em>04/06 :</em> <strong>Jean Lefèvre</strong> (père d\'Alix, ex-haut gradé) confirme lui-même le non-vieillissement et mandate Jeremy & Alix pour approcher discrètement la famille.<br>' +
        '— <em>07/06 :</em> rencontre de <strong>Danie</strong>, employée Larouge — révélations majeures (voir ci-dessous).<br><br>' +

        '<strong>Révélations de Danie (07/06)</strong><br>' +
        '— La propriété cache une <strong>salle secrète</strong> : immense pièce avec des <strong>poupées de cire géantes</strong>, une grande table centrale et des rangées de sièges disposés comme pour un public.<br>' +
        '— Un <strong>article de journal du XIXe siècle</strong> a été retrouvé avec une photographie de Philomène — son apparence est identique à aujourd\'hui. <strong>Immortalité confirmée.</strong><br>' +
        '— Son véritable nom de famille serait <strong>Capet</strong> — lien potentiel avec la <strong>dynastie des Capétiens</strong>.<br>' +
        '— <strong>Nancy Larouge</strong> parlerait régulièrement de ses <em>« poupées »</em> pour désigner des personnes qui attirent son attention, avec l\'intention de les transformer.<br><br>' +

        '<strong>Connexions & angles d\'enquête</strong><br>' +
        '— La policière <strong>Blanche Pichon</strong> est proche du fils Larouge <em>et</em> sœur de César (impliqué dans la fraude associative) — nœud de connexions dangereux.<br>' +
        '— Jean Lefèvre ne fait plus confiance au commissaire : toute remontée d\'info via la police est risquée.<br><br>' +

        '<strong>Situation active</strong><br>' +
        '<blockquote>Tea time avec Nancy Larouge à venir. Jeremy est invité chez elle — exposition directe au danger. Plan d\'infiltration de la propriété élaboré avec Alix et César pour photographier la salle secrète.</blockquote>'
    },
    {
      categorie: 'politique',
      titre: 'La taupe dans la police',
      resume: 'Selon plusieurs sources fiables, quelqu\'un infiltre les forces de l\'ordre.',
      detail:
        'Information confirmée indépendamment par <strong>Mr Vautrin</strong> et par <strong>Alix</strong> (via son père).<br>' +
        'Identité inconnue. Niveau hiérarchique inconnu.<br>' +
        '<em>Risque :</em> toute information transmise à la police peut fuiter vers des tiers hostiles.'
    },
    {
      categorie: 'menaces',
      titre: 'Menaces de mort — Alix & Vautrin',
      resume: 'Alix De Saint-Claire et le député Vautrin ont tous deux reçu des menaces de mort.',
      detail:
        '<strong>Alix De Saint-Claire</strong> et <strong>Olivier Vautrin</strong> ont été menacés de mort séparément.<br>' +
        'Les auteurs et le mobile précis sont encore inconnus.<br>' +
        'Connexion possible avec la taupe policière ou des opposants politiques.'
    },
    {
      categorie: 'menaces',
      titre: 'Le message de Claude — « Blanche n\'est que la première »',
      resume: 'Des opposants armés ont utilisé Jeremy comme messager pour menacer la police.',
      detail:
        'Après avoir été menacé par des individus hostiles à la droite et à la police, un certain <strong>Claude</strong> et ses accolites ont contraint Jeremy à transmettre un message au commissaire :<br>' +
        '<blockquote>« Blanche n\'est que la première sur la liste. »</blockquote>' +
        'Jeremy n\'a pas encore transmis le message. Identité complète de Claude inconnue.'
    },
    {
      categorie: 'criminel',
      titre: 'Canal Geremy — approvisionnement discret',
      resume: 'Canal d\'approvisionnement en place via Samuel le Grand, à tenir secret de la famille De Saint-Claire.',
      detail:
        'Prise de contact établie avec <strong>Geremy</strong> via l\'intermédiaire <strong>Samuel le Grand</strong>.<br>' +
        'Canal discret opérationnel.<br>' +
        '<em>Consigne :</em> éviter tout contact direct visible par la famille De Saint-Claire.'
    },
    {
      categorie: 'politique',
      titre: 'Film de propagande — député Vautrin',
      resume: 'Jeremy a accepté de réaliser un film de propagande pour le cabinet du député Olivier Vautrin.',
      detail:
        'Contrat avec le cabinet du <strong>député Olivier Vautrin</strong> pour un film de propagande.<br>' +
        'Acompte partiel (sur 10 000 €) déjà reçu. Tournage en cours d\'organisation.<br>' +
        'Lien potentiel avec les menaces reçues par Vautrin.'
    },
  ];

  /* ══════════════════════════════════
     CONFIG CATÉGORIES
  ══════════════════════════════════ */
  var CATEGORIES = {
    'mystere':   { label: 'Mystère',   color: '#9b7fd4' },
    'politique': { label: 'Politique', color: '#4a9eca' },
    'menaces':   { label: 'Menaces',   color: '#e05555' },
    'criminel':  { label: 'Criminel',  color: '#c8a04a' },
  };

  function getAllCategories() {
    var seen = {};
    lore.forEach(function (e) { seen[e.categorie] = true; });
    return Object.keys(seen);
  }

  function filteredLore(filter) {
    if (filter === 'all') return lore;
    return lore.filter(function (e) { return e.categorie === filter; });
  }

  /* ══════════════════════════════════
     CONSTRUCTION DE LA POPIN
  ══════════════════════════════════ */
  function buildPopin() {
    var overlay = document.createElement('div');
    overlay.id  = 'lore-overlay';
    overlay.innerHTML = '<div id="lore-popin" role="dialog" aria-modal="true" aria-label="Récap Lore"></div>';

    var popin = overlay.querySelector('#lore-popin');
    var cats  = getAllCategories();

    var filterBtnsHtml =
      '<button class="lp-filter active" data-filter="all">Tout <span>' + lore.length + '</span></button>' +
      cats.map(function (c) {
        var cfg   = CATEGORIES[c] || { label: c };
        var count = lore.filter(function (e) { return e.categorie === c; }).length;
        return '<button class="lp-filter" data-filter="' + c + '" data-color="' + (cfg.color || '') + '">' +
          cfg.label + ' <span>' + count + '</span></button>';
      }).join('');

    popin.innerHTML =
      '<div class="lp-header">' +
        '<div class="lp-title">📖 Récap Lore</div>' +
        '<button class="lp-close" id="lp-close">✕</button>' +
      '</div>' +
      '<div class="lp-filters">' + filterBtnsHtml + '</div>' +
      '<div class="lp-list" id="lp-list"></div>';

    var list = popin.querySelector('#lp-list');

    function renderList(filter) {
      list.innerHTML = '';
      var items = filteredLore(filter);

      if (!items.length) {
        list.innerHTML = '<div class="lp-empty">Aucune entrée dans cette catégorie.</div>';
        return;
      }

      items.forEach(function (e) {
        var cfg   = CATEGORIES[e.categorie] || { label: e.categorie, color: '#888' };
        var item  = document.createElement('div');
        item.className = 'lp-item';

        item.innerHTML =
          '<div class="lp-item-header">' +
            '<div class="lp-item-left">' +
              '<span class="lp-cat-badge" style="--cat-color:' + cfg.color + '">' + cfg.label + '</span>' +
              '<div class="lp-item-titre">' + e.titre + '</div>' +
              '<div class="lp-item-resume">' + e.resume + '</div>' +
            '</div>' +
            '<span class="lp-chevron">▼</span>' +
          '</div>' +
          '<div class="lp-item-detail collapsed">' + e.detail + '</div>';

        var header  = item.querySelector('.lp-item-header');
        var detail  = item.querySelector('.lp-item-detail');
        var chevron = item.querySelector('.lp-chevron');

        header.addEventListener('click', function () {
          var isOpen = !detail.classList.contains('collapsed');
          detail.classList.toggle('collapsed', isOpen);
          chevron.textContent = isOpen ? '▼' : '▲';
        });

        list.appendChild(item);
      });
    }

    // Filtres
    var filterBtns = popin.querySelectorAll('.lp-filter');
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        renderList(btn.getAttribute('data-filter'));
      });
    });

    document.body.appendChild(overlay);
    renderList('all');

    document.getElementById('lp-close').addEventListener('click', closePopin);
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
    var overlay = document.getElementById('lore-overlay');
    if (!overlay) return;
    overlay.classList.remove('visible');
    setTimeout(function () { overlay.remove(); }, 200);
  }

  window.openLore = function () {
    if (document.getElementById('lore-overlay')) {
      closePopin();
    } else {
      buildPopin();
    }
  };

})();
