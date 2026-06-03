(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var music        = document.getElementById('bgMusic');
    var player       = document.getElementById('player');
    var playBtn      = document.getElementById('playBtn');
    var prevBtn      = document.getElementById('prevBtn');
    var nextBtn      = document.getElementById('nextBtn');
    var timeline     = document.getElementById('timeline');
    var volSlider    = document.getElementById('volSlider');
    var volIcon      = document.getElementById('volIcon');
    var timeEl       = document.getElementById('currentTime');
    var durEl        = document.getElementById('duration');
    var titleEl      = document.getElementById('trackTitle');
    var playlistBtn  = document.getElementById('playlistBtn');
    var playlistDrop = document.getElementById('playlistDropdown');

    if (!music || !player) return;

    var playlist = [];
    var current  = 0;
    music.volume = 0.5;

    // ══════════════════════════════════
    //  UTILS
    // ══════════════════════════════════
    function fmt(s) {
      if (isNaN(s) || !isFinite(s)) return '0:00';
      var m = Math.floor(s / 60), sec = Math.floor(s % 60);
      return m + ':' + (sec < 10 ? '0' : '') + sec;
    }

    function cleanName(file) {
      return decodeURIComponent(file).replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
    }

    // ══════════════════════════════════
    //  PLAYLIST DROPDOWN
    // ══════════════════════════════════
    function buildPlaylistDropdown() {
      if (!playlistDrop) return;
      playlistDrop.innerHTML = '';

      playlist.forEach(function (file, i) {
        var item = document.createElement('div');
        item.className = 'player-playlist-item' + (i === current ? ' playing' : '');
        item.textContent = cleanName(file);
        item.addEventListener('click', function () {
          playTrack(i);
          closePlaylistDropdown();
        });
        playlistDrop.appendChild(item);
      });
    }

    function openPlaylistDropdown() {
      if (!playlistDrop) return;
      buildPlaylistDropdown();
      playlistDrop.classList.add('open');
      if (playlistBtn) playlistBtn.classList.add('active');
      // Ferme au clic extérieur
      setTimeout(function () {
        document.addEventListener('click', onOutsideClick);
      }, 10);
    }

    function closePlaylistDropdown() {
      if (!playlistDrop) return;
      playlistDrop.classList.remove('open');
      if (playlistBtn) playlistBtn.classList.remove('active');
      document.removeEventListener('click', onOutsideClick);
    }

    function onOutsideClick(e) {
      if (!playlistDrop.contains(e.target) && e.target !== playlistBtn) {
        closePlaylistDropdown();
      }
    }

    if (playlistBtn) {
      playlistBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        playlistDrop.classList.contains('open')
          ? closePlaylistDropdown()
          : openPlaylistDropdown();
      });
    }

    // ══════════════════════════════════
    //  CHARGEMENT PISTE
    // ══════════════════════════════════
    function loadTrack(index) {
      if (!playlist.length) return;
      current = (index + playlist.length) % playlist.length;
      music.src = 'audio/' + playlist[current];
      music.load();

      if (titleEl) titleEl.textContent = cleanName(playlist[current]);
      if (timeline) { timeline.value = 0; timeline.style.setProperty('--progress', '0%'); }
      if (timeEl)   timeEl.textContent = '0:00';
      if (durEl)    durEl.textContent  = '0:00';
    }

    function playTrack(index) {
      loadTrack(index);
      music.play().then(function () {
        playBtn.innerHTML = '&#9646;&#9646;';
      }).catch(function (e) { console.log('Lecture bloquée :', e); });
    }

    // ── Charge depuis audio/playlist.json
    fetch('audio/playlist.json')
      .then(function (r) { return r.json(); })
      .then(function (files) {
        playlist = files;
        if (playlist.length) {
          loadTrack(0);
          player.classList.add('ready'); // affiche le player
        }
      })
      .catch(function () {
        var src = music.getAttribute('src') || '';
        if (src) {
          playlist = [src.replace('audio/', '')];
          loadTrack(0);
          player.classList.add('ready');
        }
      });

    // ══════════════════════════════════
    //  LANCER DEPUIS LA PHOTO (easter egg)
    // ══════════════════════════════════
    function startMusic() {
      if (music.paused) {
        music.play().catch(function (e) { console.log('Autoplay bloqué :', e); });
        playBtn.innerHTML = '&#9646;&#9646;';
      }
      // Plus besoin de player.classList.add('visible')
    }

    var hdrImg       = document.querySelector('.hdr-img');
    var hdrImgMobile = document.querySelector('.hdr-img-mobile');
    // if (hdrImg)       hdrImg.addEventListener('click', startMusic);
    if (hdrImgMobile) hdrImgMobile.addEventListener('click', startMusic);

    // ══════════════════════════════════
    //  CONTRÔLES
    // ══════════════════════════════════
    playBtn.addEventListener('click', function () {
      if (music.paused) {
        music.play();
        playBtn.innerHTML = '&#9646;&#9646;';
      } else {
        music.pause();
        playBtn.innerHTML = '&#9654;';
      }
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        music.currentTime > 3 ? (music.currentTime = 0) : playTrack(current - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () { playTrack(current + 1); });
    }

    // ══════════════════════════════════
    //  TIMELINE
    // ══════════════════════════════════
    music.addEventListener('loadedmetadata', function () {
      if (durEl) durEl.textContent = fmt(music.duration);
    });

    music.addEventListener('timeupdate', function () {
      if (!music.duration) return;
      var pct = (music.currentTime / music.duration) * 100;
      if (timeline) {
        timeline.value = pct;
        timeline.style.setProperty('--progress', pct + '%');
      }
      if (timeEl) timeEl.textContent = fmt(music.currentTime);
    });

    if (timeline) {
      timeline.addEventListener('input', function () {
        music.currentTime = (this.value / 100) * music.duration;
      });
    }

    music.addEventListener('ended', function () {
      playlist.length > 1 ? playTrack(current + 1) : (music.currentTime = 0, music.play());
    });

    // ══════════════════════════════════
    //  VOLUME
    // ══════════════════════════════════
    if (volSlider) {
      volSlider.addEventListener('input', function () {
        music.muted  = false;
        music.volume = this.value;
        updateVolIcon();
      });
    }

    function updateVolIcon() {
      if (!volIcon) return;
      volIcon.textContent = (music.muted || music.volume === 0) ? '🔇'
        : music.volume < 0.4 ? '🔉' : '🔊';
    }

    if (volIcon) {
      volIcon.addEventListener('click', function () {
        music.muted = !music.muted;
        if (!music.muted && music.volume === 0) {
          music.volume = 0.5;
          if (volSlider) volSlider.value = 0.5;
        }
        updateVolIcon();
      });
    }

  });
})();