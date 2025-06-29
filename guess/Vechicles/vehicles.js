const vehicleData = [
    { name: "Car", image: "images/car.jpg" },
    { name: "Bus", image: "images/bus.jpg" },
    { name: "Airplane", image: "images/airplane.jpg" },
    { name: "Bicycle", image: "images/bicycle.jpg" },
    { name: "Train", image: "images/train.jpg" },
    { name: "Boat", image: "images/boat.jpg" },
    { name: "Motorcycle", image: "images/motorcycle.jpg" },
    { name: "Truck", image: "images/truck.jpg" },
    { name: "Ambulance", image: "images/ambulance.jpg" },
    { name: "Helicopter", image: "images/helicopter.jpg" }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let questions = [];
  
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  function generateQuestions() {
    questions = shuffle([...vehicleData]).slice(0, 10);
  }
  
  function showQuestion() {
    if (currentQuestion >= 10) {
      showResult();
      return;
    }
  
    const vehicle = questions[currentQuestion];
    const correctName = vehicle.name;
    const wrongOptions = shuffle(vehicleData.filter(v => v.name !== correctName)).slice(0, 3);
    const options = shuffle([correctName, ...wrongOptions.map(v => v.name)]);
  
    document.getElementById("question-number").textContent = `Question ${currentQuestion + 1} of 10`;
    document.getElementById("vehicle-image").src = vehicle.image;
  
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
    document.getElementById("score").textContent = `🚗 You got ${score} out of 10!`;
  
    let feedback = "⛽ Keep going!";
    if (score === 10) feedback = "🏁 You're a vehicle master!";
    else if (score >= 7) feedback = "🚦 Great job!";
    else if (score >= 4) feedback = "🚙 You're learning!";
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
    window.location.href = "home.html"; // adjust to your home page file
  }
  
  generateQuestions();
  showQuestion();
  