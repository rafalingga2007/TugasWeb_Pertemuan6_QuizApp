// Logika quiz terpisah dari layout (windows.js) dan bank soal (questions.js).
const $ = (selector) => document.querySelector(selector);
const modal = $("#quizModal");
const difficultySelect = $("#difficulty");
const chosenDifficulty = $("#chosenDifficulty");
const quizMessage = $("#quizMessage");
const music = $("#music");
const musicToggle = $("#musicToggle");
const musicStatus = $("#musicStatus");
const volume = $("#volume");

let selectedQuestions = [];
let currentIndex = 0;
let score = 0;
let hasAnswered = false;
let chosenMode = "easy";

music.volume = Number(volume.value);
musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.textContent = "Ⅱ";
      musicToggle.setAttribute("aria-label", "Pause music");
      musicStatus.textContent = "Now playing";
    } catch {
      musicStatus.textContent = "Check mg1.mp3";
    }
  } else {
    music.pause();
    musicToggle.textContent = "▶";
    musicToggle.setAttribute("aria-label", "Play music");
    musicStatus.textContent = "Paused";
  }
});
volume.addEventListener("input", () => { music.volume = Number(volume.value); });

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
function openModal() {
  chosenMode = difficultySelect.value;
  chosenDifficulty.textContent = chosenMode === "random"
    ? "Randomize (Easy / Medium / Hard)"
    : chosenMode[0].toUpperCase() + chosenMode.slice(1);
  $("#quizSetup").classList.remove("hidden");
  $("#questionStage").classList.add("hidden");
  $("#quizResults").classList.add("hidden");
  modal.classList.remove("hidden");
}
function closeModal() { modal.classList.add("hidden"); }

$("#startQuiz").addEventListener("click", openModal);
$("#closeModal").addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target.dataset.close === "true") closeModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

$("#modalOk").addEventListener("click", () => {
  const bank = window.VOCALOID_QUESTIONS || [];
  const actualDifficulty = chosenMode === "random"
    ? ["easy", "medium", "hard"][Math.floor(Math.random() * 3)]
    : chosenMode;
  selectedQuestions = shuffle(bank.filter(q => q.difficulty === actualDifficulty));
  if (!selectedQuestions.length) {
    $("#modalText").textContent = "Belum ada soal untuk tingkat kesulitan ini.";
    return;
  }
  currentIndex = 0;
  score = 0;
  $("#quizSetup").classList.add("hidden");
  $("#quizResults").classList.add("hidden");
  $("#questionStage").classList.remove("hidden");
  renderQuestion();
});

function renderQuestion() {
  const q = selectedQuestions[currentIndex];
  hasAnswered = false;
  $("#questionCounter").textContent = `Question ${currentIndex + 1}/${selectedQuestions.length}`;
  $("#liveScore").textContent = `Score: ${score}`;
  $("#miniBar").style.width = `${currentIndex / selectedQuestions.length * 100}%`;
  $("#questionLevel").textContent = `${q.difficulty.toUpperCase()} · VOCALOID`;
  $("#questionPrompt").textContent = q.question;
  $("#questionFeedback").textContent = "";
  $("#questionFeedback").className = "question-feedback";
  $("#nextQuestion").disabled = true;
  $("#nextQuestion").textContent = currentIndex === selectedQuestions.length - 1 ? "See Results →" : "Next Question →";
  const options = $("#questionOptions");
  options.replaceChildren();
  q.options.forEach((label, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-option";
    button.textContent = `${String.fromCharCode(65 + index)}. ${label}`;
    button.dataset.index = String(index);
    options.append(button);
  });
}
$("#questionOptions").addEventListener("click", (event) => {
  const button = event.target.closest(".answer-option");
  if (!button || hasAnswered) return;
  hasAnswered = true;
  const q = selectedQuestions[currentIndex];
  const selected = Number(button.dataset.index);
  $("#questionOptions").querySelectorAll(".answer-option").forEach((option) => {
    option.disabled = true;
    if (Number(option.dataset.index) === q.correct) option.classList.add("answer-correct");
  });
  if (selected === q.correct) {
    score++;
    $("#questionFeedback").textContent = "Correct! Nice one ♡";
    $("#questionFeedback").classList.add("feedback-correct");
  } else {
    button.classList.add("answer-wrong");
    $("#questionFeedback").textContent = `Not quite! Correct answer: ${q.options[q.correct]}`;
    $("#questionFeedback").classList.add("feedback-wrong");
  }
  $("#liveScore").textContent = `Score: ${score}`;
  $("#nextQuestion").disabled = false;
});
$("#nextQuestion").addEventListener("click", () => {
  if (!hasAnswered) return;
  currentIndex++;
  if (currentIndex < selectedQuestions.length) renderQuestion();
  else showResults();
});
function showResults() {
  const percent = Math.round(score / selectedQuestions.length * 100);
  const key = `ichibankawaii-vocaloid-${chosenMode}`;
  const oldBest = Number(localStorage.getItem(key)) || 0;
  const best = Math.max(oldBest, percent);
  localStorage.setItem(key, String(best));
  $("#questionStage").classList.add("hidden");
  $("#quizResults").classList.remove("hidden");
  $("#resultScore").textContent = `${percent}%`;
  $("#resultSummary").textContent = `You got ${score} out of ${selectedQuestions.length} questions correct.`;
  $("#personalBest").textContent = `${best}%`;
  $("#miniBar").style.width = "100%";
}
$("#retryQuiz").addEventListener("click", () => {
  $("#quizResults").classList.add("hidden");
  $("#quizSetup").classList.remove("hidden");
});
