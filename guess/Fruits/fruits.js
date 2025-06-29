const fruitData = [
    { name: "Apple", image: "images/apple.jpg" },
    { name: "Banana", image: "images/banana.jpg" },
    { name: "Mango", image: "images/mango.jpg" },
    { name: "Orange", image: "images/orange.jpg" },
    { name: "Grapes", image: "images/grapes.jpg" },
    { name: "Watermelon", image: "images/watermelon.jpg" },
    { name: "Pineapple", image: "images/pineapple.jpg" },
    { name: "Strawberry", image: "images/strawberry.jpg" },
    { name: "Papaya", image: "images/papaya.jpg" },
    { name: "Cherry", image: "images/cherry.jpg" }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let questions = [];
  
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  function generateQuestions() {
    questions = shuffle([...fruitData]).slice(0, 10);
  }
  
  function showQuestion() {
    if (currentQuestion >= 10) {
      showResult();
      return;
    }
  
    const fruit = questions[currentQuestion];
    const correctName = fruit.name;
    const wrongOptions = shuffle(fruitData.filter(f => f.name !== correctName)).slice(0, 3);
    const options = shuffle([correctName, ...wrongOptions.map(f => f.name)]);
  
    document.getElementById("question-number").textContent = `Question ${currentQuestion + 1} of 10`;
    document.getElementById("fruit-image").src = fruit.image;
  
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
    document.getElementById("score").textContent = `🍓 You got ${score} out of 10!`;
  
    let feedback = "🍉 Keep practicing!";
    if (score === 10) feedback = "🍍 You're a fruit expert!";
    else if (score >= 7) feedback = "🍊 Great job!";
    else if (score >= 4) feedback = "🍌 Good try!";
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
    window.location.href = "home.html"; // change to your menu page
  }
  
  generateQuestions();
  showQuestion();
  