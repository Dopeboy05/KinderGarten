const car = document.getElementById("car");
const targetLetter = document.getElementById("target-letter");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restart-btn");

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let currentLetter = "";
let position = 0;
const step = 30;
const winThreshold = 800;

function setNewLetter() {
  currentLetter = letters[Math.floor(Math.random() * letters.length)];
  targetLetter.textContent = currentLetter;
}

function moveCar() {
  position += step;
  car.style.left = `${position}px`;

  if (position >= winThreshold) {
    message.textContent = "🎉 You reached the finish line! Well done!";
    document.removeEventListener("keydown", handleKeyPress);
  } else {
    setNewLetter();
  }
}

function handleKeyPress(event) {
  const pressed = event.key.toUpperCase();
  if (pressed === currentLetter) {
    moveCar();
  } else {
    message.textContent = `❌ Try again! Press "${currentLetter}"`;
    setTimeout(() => (message.textContent = ""), 1000);
  }
}

restartBtn.addEventListener("click", () => {
  position = 0;
  car.style.left = `0px`;
  message.textContent = "";
  setNewLetter();
  document.addEventListener("keydown", handleKeyPress);
});

// Initialize game
setNewLetter();
document.addEventListener("keydown", handleKeyPress);
