const animalData = [
  { name: "Lion", image: "images/lion.jpg" },
  { name: "Elephant", image: "images/elephant.jpg" },
  { name: "Cat", image: "images/cat.jpg" },
  { name: "Dog", image: "images/dog.jpg" },
  { name: "Giraffe", image: "images/giraffe.jpg" },
  { name: "Monkey", image: "images/monkey.jpg" },
  { name: "Zebra", image: "images/zebra.jpg" },
  { name: "Tiger", image: "images/tiger.jpg" },
  { name: "Bear", image: "images/bear.jpg" },
  { name: "Rabbit", image: "images/rabbit.jpg" } // Replaced Horse with Rabbit
];

let currentQuestion = 0;
let score = 0;
let questions = [];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function generateQuestions() {
  questions = shuffle([...animalData]).slice(0, 10);
}

function showQuestion() {
  if (currentQuestion >= 10) {
    showResult();
    return;
  }

  const animal = questions[currentQuestion];
  const correctName = animal.name;
  const wrongOptions = shuffle(animalData.filter(a => a.name !== correctName)).slice(0, 3);
  const options = shuffle([correctName, ...wrongOptions.map(a => a.name)]);

  document.getElementById("question-number").textContent = `Question ${currentQuestion + 1} of 10`;
  document.getElementById("animal-image").src = animal.image;

  const optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";

  options.forEach(option => {
    const button = document.createElement("button");
    button.className = "option-btn";
    button.textContent = option;
    button.onclick = () => {
      if (option === correctName) score++;
      currentQuestion++;
      showQuestion();
    };
    optionsContainer.appendChild(button);
  });
}

function showResult() {
  document.getElementById("game-box").style.display = "none";
  document.getElementById("result-screen").style.display = "block";
  document.getElementById("score").textContent = `🐾 You got ${score} out of 10!`;

  let feedback = "🐢 Keep practicing!";
  if (score === 10) feedback = "🐯 You're an animal expert!";
  else if (score >= 7) feedback = "🐶 Great job!";
  else if (score >= 4) feedback = "🐰 Not bad!";
  document.getElementById("feedback").textContent = feedback;
}

function restartGame() {
  currentQuestion = 0;
  score = 0;
  generateQuestions();
  document.getElementById("result-screen").style.display = "none";
  document.getElementById("game-box").style.display = "block";
  showQuestion();
}

function goBackHome() {
  window.location.href = "home.html"; // Replace with actual home/menu page
}

generateQuestions();
showQuestion();
