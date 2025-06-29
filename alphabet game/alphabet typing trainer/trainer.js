const letterBox = document.getElementById("letter-box");
const scoreEl = document.getElementById("score");
const missesEl = document.getElementById("misses");
const startBtn = document.getElementById("start-btn");
const resultMessage = document.getElementById("result-message");

let score = 0;
let misses = 0;
let currentLetter = '';
let fallInterval;
let letterTop = 0;

function getRandomLetter() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return letters[Math.floor(Math.random() * letters.length)];
}

function dropLetter() {
  currentLetter = getRandomLetter();
  letterBox.textContent = currentLetter;
  letterTop = 0;
  letterBox.style.top = `${letterTop}px`;

  fallInterval = setInterval(() => {
    letterTop += 5;
    letterBox.style.top = `${letterTop}px`;
    if (letterTop > 260) {
      clearInterval(fallInterval);
      misses++;
      missesEl.textContent = misses;
      if (misses >= 5) {
        gameOver();
      } else {
        dropLetter();
      }
    }
  }, 100);
}

function handleKeyPress(e) {
  if (e.key.toUpperCase() === currentLetter) {
    clearInterval(fallInterval);
    score++;
    scoreEl.textContent = score;
    dropLetter();
  }
}

function startGame() {
  score = 0;
  misses = 0;
  scoreEl.textContent = 0;
  missesEl.textContent = 0;
  resultMessage.textContent = "";
  startBtn.disabled = true;
  document.addEventListener("keydown", handleKeyPress);
  dropLetter();
}

function gameOver() {
  clearInterval(fallInterval);
  document.removeEventListener("keydown", handleKeyPress);
  resultMessage.textContent = `Game Over! Final Score: ${score}`;
  startBtn.disabled = false;
}

startBtn.addEventListener("click", startGame);
