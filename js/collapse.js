/* ══════════════════════════════════
   Helper de repli partagé
   Garde les `visible` premiers éléments, replie le reste
   derrière un bouton toggle.

   opts = {
     items:          NodeList | Array,   // éléments à gérer
     visible:        number,             // combien rester ouverts
     collapsedClass: string,             // classe ajoutée aux repliés
     btnClass:       string,             // classe du bouton
     label:          fn(count, isOpen) -> html,
     mount:          fn(btn, hidden)     // place le bouton dans le DOM
   }
══════════════════════════════════ */
window.makeCollapsible = function (opts) {
  var items = Array.prototype.slice.call(opts.items);
  if (items.length <= opts.visible) return;

  var hidden = items.slice(opts.visible);
  hidden.forEach(function (el) { el.classList.add(opts.collapsedClass); });

  var btn = document.createElement('button');
  btn.className = opts.btnClass;
  btn.setAttribute('aria-expanded', 'false');

  var isOpen = false;

  function refresh() {
    btn.innerHTML = opts.label(hidden.length, isOpen);
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  btn.addEventListener('click', function () {
    isOpen = !isOpen;
    hidden.forEach(function (el) {
      el.classList.toggle(opts.collapsedClass, !isOpen);
    });
    refresh();
  });

  refresh();
  opts.mount(btn, hidden);
};
