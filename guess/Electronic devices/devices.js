const deviceData = [
    { name: "Computer", image: "images/computer.jpg" },
    { name: "Smartphone", image: "images/smartphone.jpg" },
    { name: "Tablet", image: "images/tablet.jpg" },
    { name: "Television", image: "images/television.jpg" },
    { name: "Washing Machine", image: "images/washing-machine.jpg" },
    { name: "Refrigerator", image: "images/refrigerator.jpg" },
    { name: "Microwave", image: "images/microwave.jpg" },
    { name: "Camera", image: "images/camera.jpg" },
    { name: "Fan", image: "images/fan.jpg" },
    { name: "Printer", image: "images/printer.jpg" }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let questions = [];
  
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  function generateQuestions() {
    questions = shuffle([...deviceData]).slice(0, 10);
  }
  
  function showQuestion() {
    if (currentQuestion >= 10) {
      showResult();
      return;
    }
  
    const device = questions[currentQuestion];
    const correctName = device.name;
    const wrongOptions = shuffle(deviceData.filter(d => d.name !== correctName)).slice(0, 3);
    const options = shuffle([correctName, ...wrongOptions.map(d => d.name)]);
  
    document.getElementById("question-number").textContent = `Question ${currentQuestion + 1} of 10`;
    document.getElementById("device-image").src = device.image;
  
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
    document.getElementById("score").textContent = `🔌 You got ${score} out of 10!`;
  
    let feedback = "🔋 Keep trying!";
    if (score === 10) feedback = "💡 You're an electronics genius!";
    else if (score >= 7) feedback = "📺 Great job!";
    else if (score >= 4) feedback = "📱 Good effort!";
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
    window.location.href = "home.html"; // change to your home screen
  }
  
  generateQuestions();
  showQuestion();
  