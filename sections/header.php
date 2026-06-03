<div class="hdr">
    <div class="hdr-img" title="▶ Lancer la musique">
      <img src="img/jeremy-alix.png" alt="Jeremy & Alix">
    </div>

    <audio id="bgMusic"></audio>

    <div id="player">

      <!-- Titre + bouton playlist -->
      <div class="player-top">
        <div class="player-title" id="trackTitle">—</div>
        <button class="player-playlist-btn" id="playlistBtn" title="Playlist">♫ Liste</button>
      </div>

      <!-- Dropdown playlist -->
      <div class="player-playlist-dropdown" id="playlistDropdown"></div>

      <!-- Timeline -->
      <input class="player-timeline" id="timeline" type="range" min="0" max="100" step="0.1" value="0">

      <!-- Contrôles -->
      <div class="player-controls">
        <button class="player-btn player-btn--sm" id="prevBtn" title="Précédent">◀◀</button>
        <button class="player-btn" id="playBtn">▶</button>
        <button class="player-btn player-btn--sm" id="nextBtn" title="Suivant">▶▶</button>
        <div class="player-time">
          <span id="currentTime">0:00</span>
          <span class="player-time-sep"> / </span>
          <span id="duration">0:00</span>
        </div>
      </div>

      <!-- Volume -->
      <div class="player-volume">
        <span class="player-vol-icon" id="volIcon">🔊</span>
        <input class="player-vol-slider" id="volSlider" type="range" min="0" max="1" step="0.02" value="0.5">
      </div>

    </div>

    <div class="hdr-content">
      <div class="lbl">Dossier personnage · GTA RP Paris</div>
      <div class="bigname">Jeremy<br>De Rocherfort</div>
      <div class="sub">19 ans · Héritier déchu · Stagiaire Police · Paris</div>
      <div class="bdg-wrap">
        <span class="bdg bdg-g">Bourgeoisie</span>
        <span class="bdg bdg-r">Fraudeur</span>
        <span class="bdg bdg-r">Manipulateur</span>
        <span class="bdg bdg-p">Opportuniste</span>
      </div>
    </div>

    <div class="hdr-img-mobile" title="▶ Lancer la musique">
      <img src="img/jeremy-alix.png" alt="Jeremy & Alix">
    </div>

    <div class="hdr-right">
      <div class="lbl lbl-mb">Statut</div>
      <div class="hdr-statut">Héritier coupé de ses fonds</div>
      <div class="hdr-handicap">Handicap moteur · fauteuil</div>

      <button class="quetes-picto" onclick="openQuetes()" title="Quêtes & missions">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 11l3 3L22 4"/>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
        </svg>
        <span>Quêtes</span>
        <span class="quetes-badge" id="quetes-badge">5</span>
      </button>
    </div>
  </div>
