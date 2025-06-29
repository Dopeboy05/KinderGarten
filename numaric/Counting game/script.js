const totalQuestions = 10;
let currentQuestion = 0;
let score = 0;
const correctAnswers = [];

const images = [
  { name: "apples", src: "images/apple.png" },
  { name: "stars", src: "images/star.png" },
  { name: "dogs", src: "images/dog.png" },
  { name: "elephants", src: "images/elephant.png" },
  { name: "flowers", src: "images/flower.png" }
];

let currentItemName = "";

function getRandomImage() {
  const index = Math.floor(Math.random() * images.length);
  return images[index];
}

function generateQuestion() {
  if (currentQuestion >= totalQuestions) {
    showResults();
    return;
  }

  const count = Math.floor(Math.random() * 10) + 1;
  const container = document.getElementById("image-container");
  container.innerHTML = "";

  const image = getRandomImage();
  currentItemName = image.name;

  for (let i = 0; i < count; i++) {
    const img = document.createElement("img");
    img.src = image.src;
    img.className = "object-img";
    container.appendChild(img);
  }

  correctAnswers[currentQuestion] = count;

  document.getElementById("question-number").textContent = `Question ${currentQuestion + 1} of ${totalQuestions}`;
  document.getElementById("user-answer").value = "";
  document.getElementById("question-text").textContent = `How many ${currentItemName} are there?`;
}

function submitAnswer() {
  const input = parseInt(document.getElementById("user-answer").value);
  if (!isNaN(input)) {
    if (input === correctAnswers[currentQuestion]) {
      score++;
    }
    currentQuestion++;
    generateQuestion();
  }
}

function showResults() {
  document.getElementById("game-box").style.display = "none";
  document.getElementById("result-screen").style.display = "block";
  launchConfetti();

  document.getElementById("score").textContent = `🎯 You got ${score} out of ${totalQuestions} correct!`;

  const feedback = document.getElementById("feedback");
  if (score === 10) {
    feedback.textContent = "🌟 Perfect counting! You're a number genius!";
  } else if (score >= 7) {
    feedback.textContent = "👏 Great job! You’re getting really good!";
  } else if (score >= 4) {
    feedback.textContent = "😊 You're learning fast! Keep practicing!";
  } else {
    feedback.textContent = "💡 You're doing your best! Try again soon!";
  }
}

function restartGame() {
  score = 0;
  currentQuestion = 0;
  correctAnswers.length = 0;

  document.getElementById("game-box").style.display = "block";
  document.getElementById("result-screen").style.display = "none";
  generateQuestion();
}

function goBack() {
  window.location.href = "index.html"; // Adjust this to your actual main page
}

generateQuestion();
