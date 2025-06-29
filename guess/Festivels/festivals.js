const festivalData = [
    { name: "Diwali", image: "images/diwali.jpg" },
    { name: "Christmas", image: "images/christmas.jpg" },
    { name: "Eid", image: "images/eid.jpg" },
    { name: "Holi", image: "images/holi.jpg" },
    { name: "Baisakhi", image: "images/baisakhi.jpg" },
    { name: "Pongal", image: "images/pongal.jpg" },
    { name: "Raksha Bandhan", image: "images/raksha-bandhan.jpg" },
    { name: "Halloween", image: "images/halloween.jpg" },
    { name: "Navratri", image: "images/navratri.jpg" },
    { name: "Makar Sankranti", image: "images/makar-sankranti.jpg" }
  ];
  
  
  let currentQuestion = 0;
  let score = 0;
  let questions = [];
  
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  function generateQuestions() {
    questions = shuffle([...festivalData]).slice(0, 10);
  }
  
  function showQuestion() {
    if (currentQuestion >= 10) {
      showResult();
      return;
    }
  
    const festival = questions[currentQuestion];
    const correctName = festival.name;
    const wrongOptions = shuffle(festivalData.filter(f => f.name !== correctName)).slice(0, 3);
    const options = shuffle([correctName, ...wrongOptions.map(f => f.name)]);
  
    document.getElementById("question-number").textContent = `Question ${currentQuestion + 1} of 10`;
    document.getElementById("festival-image").src = festival.image;
  
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
    document.getElementById("score").textContent = `🎯 You got ${score} out of 10!`;
  
    let feedback = "🎁 Keep learning!";
    if (score === 10) feedback = "🎉 Amazing! You're a festival master!";
    else if (score >= 7) feedback = "✨ Great memory!";
    else if (score >= 4) feedback = "🎈 You're getting there!";
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
  
  generateQuestions();
  showQuestion();
  