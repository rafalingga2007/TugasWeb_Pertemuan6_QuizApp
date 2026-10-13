// EDIT FLOATING WINDOWS DI FILE INI SAJA.
// Kamu bisa mengubah judul, deskripsi, class, dan isi masing-masing card di bawah.

document.querySelector("#floatingWindows").innerHTML = `
  <article class="float-card vocaloid-card">
    <div class="card-topline">
      <span class="category-icon" aria-hidden="true">♫</span>
      <span class="status-pill">PLAYABLE</span>
    </div>
    <p class="card-kicker">MAIN QUIZ</p>
    <h2>Vocaloid</h2>
    <p class="card-description">Seberapa jauh kamu mengenal karakter, lagu ikonik, dan meme Vocaloid?</p>
    <label class="field-label" for="difficulty">Difficulty</label>
    <select id="difficulty">
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
      <option value="random">Randomize</option>
    </select>
    <button id="startQuiz" class="main-button" type="button">Enter Quiz <span>↗</span></button>
    <p id="quizMessage" class="small-note">50 pertanyaan tersedia · pilih tingkat kesulitan.</p>
  </article>

  <article class="float-card coming-card">
    <div class="coming-glow" aria-hidden="true">✧</div>
    <p class="card-kicker">ANOTHER WORLD</p>
    <h2>Coming Soon</h2>
    <p class="card-description">A new quiz universe is on its way. Stay tuned!</p>
    <div class="coming-line"><span></span><span>IN DEVELOPMENT</span><span></span></div>
    <div class="coming-decoration" aria-hidden="true">♡ ♪ ✦</div>
  </article>
`;
