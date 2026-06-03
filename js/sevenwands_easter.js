(function () {
  var target = document.querySelector('.hdr-img');
  if (!target) return;

  var clicks = 0;
  var timer = null;
  var NEEDED = 7;
  var TIMEOUT = 4000;

  target.addEventListener('click', function (e) {
    e.stopPropagation();
    clicks++;

    clearTimeout(timer);

    if (clicks === NEEDED) {
      clicks = 0;
      window.open('SevenWands_Maquette.html', '_blank');
      return;
    }

    // subtle pulse feedback on each valid click
    target.style.transition = 'box-shadow .15s';
    target.style.boxShadow = '0 0 ' + (clicks * 6) + 'px rgba(124,92,255,' + (clicks * 0.1) + ')';

    timer = setTimeout(function () {
      clicks = 0;
      target.style.boxShadow = '';
    }, TIMEOUT);
  });
})();
