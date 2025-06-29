const plantData = [
  { name: "Rose", image: "images/rose.jpg" },
  { name: "Sunflower", image: "images/sunflower.jpg" },
  { name: "Cactus", image: "images/cactus.jpg" },
  { name: "Tulip", image: "images/tulip.jpg" },
  { name: "Bamboo", image: "images/bamboo.jpg" },
  { name: "Lily", image: "images/lily.jpg" },
  { name: "Maple Tree", image: "images/maple.jpg" },
  { name: "Fern", image: "images/fern.jpg" },
  { name: "Daisy", image: "images/daisy.jpg" },
  { name: "Palm Tree", image: "images/palm.jpg" }
];

let currentQuestion = 0;
let totalQuestions = 10;
let score = 0;
let questions = [];

function shuffleArray(arr) {
  return arr.sort(() => 0.5 - Math.random());
}

function generateQuestions() {
  const shuffled = shuffleArray([...plantData]);
  questions = shuffled.slice(0, totalQuestions);
}

function showQuestion() {
  if (currentQuestion >= totalQuestions) {
    showResult();
    return;
  }

  const questionPlant = questions[currentQuestion];
  const options = shuffleArray([
    questionPlant.name,
    ...shuffleArray(plantData.filter(p => p.name !== questionPlant.name))
      .slice(0, 3)
      .map(p => p.name)
  ]);

  document.getElementById("question-number").textContent = `Question ${currentQuestion + 1} of ${totalQuestions}`;
  document.getElementById("plant-image").src = questionPlant.image;

  const optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";

  options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option;
    btn.onclick = () => {
      if (option === questionPlant.name) {
        score++;
      }
      currentQuestion++;
      showQuestion();
    };
    optionsContainer.appendChild(btn);
  });
}

function showResult() {
  document.getElementById("game-box").style.display = "none";
  document.getElementById("result-screen").style.display = "block";
  document.getElementById("score").textContent = `🌿 You got ${score} out of ${totalQuestions} correct!`;

  const feedback = document.getElementById("feedback");
  if (score === 10) {
    feedback.textContent = "🌟 Wow! You’re a true plant expert!";
  } else if (score >= 7) {
    feedback.textContent = "🌼 Great job! You know your plants!";
  } else if (score >= 4) {
    feedback.textContent = "🌱 You're learning! Keep going!";
  } else {
    feedback.textContent = "🪴 Good try! Keep practicing and you'll grow!";
  }
}

function restartGame() {
  score = 0;
  currentQuestion = 0;
  generateQuestions();
  document.getElementById("game-box").style.display = "block";
  document.getElementById("result-screen").style.display = "none";
  showQuestion();
}

function goBackToMenu() {
  window.location.href = "home.html"; // Adjust this to your actual menu page
}

generateQuestions();
showQuestion();
