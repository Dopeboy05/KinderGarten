const bodyPartsData = [
    { name: "Eye", image: "images/eye.jpg" },
    { name: "Ear", image: "images/ear.jpg" },
    { name: "Nose", image: "images/nose.jpg" },
    { name: "Mouth", image: "images/mouth.jpg" },
    { name: "Hand", image: "images/hand.jpg" },
    { name: "Foot", image: "images/foot.jpg" },
    { name: "Leg", image: "images/leg.jpg" },
    { name: "Arm", image: "images/arm.jpg" },
    { name: "Hair", image: "images/hair.jpg" },
    { name: "Head", image: "images/head.jpg" }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let questions = [];
  
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  function generateQuestions() {
    questions = shuffle([...bodyPartsData]).slice(0, 10);
  }
  
  function showQuestion() {
    if (currentQuestion >= 10) {
      showResult();
      return;
    }
  
    const bodyPart = questions[currentQuestion];
    const correctName = bodyPart.name;
    const wrongOptions = shuffle(bodyPartsData.filter(p => p.name !== correctName)).slice(0, 3);
    const options = shuffle([correctName, ...wrongOptions.map(p => p.name)]);
  
    document.getElementById("question-number").textContent = `Question ${currentQuestion + 1} of 10`;
    document.getElementById("body-image").src = bodyPart.image;
  
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
    document.getElementById("score").textContent = `🧠 You got ${score} out of 10!`;
  
    let feedback = "🙂 Keep learning!";
    if (score === 10) feedback = "🦾 You're a body part pro!";
    else if (score >= 7) feedback = "🧒 Great job!";
    else if (score >= 4) feedback = "👶 Good try!";
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
    window.location.href = "home.html"; // your menu page
  }
  
  generateQuestions();
  showQuestion();
  