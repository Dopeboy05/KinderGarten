const words = [
    { word: "apple", hint: "A sweet red or green fruit." },
    { word: "banana", hint: "A long yellow fruit." },
    { word: "giraffe", hint: "A tall animal with a long neck." },
    { word: "elephant", hint: "The largest land animal." },
    { word: "zebra", hint: "A black and white striped animal." },
  ];
  
  let currentWord = {};
  const input = document.getElementById("user-input");
  const feedback = document.getElementById("feedback");
  const playWordBtn = document.getElementById("play-word");
  const nextWordBtn = document.getElementById("next-word");
  const checkBtn = document.getElementById("check-btn");
  
  function pickRandomWord() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    input.value = "";
    feedback.textContent = "";
  }
  
  function playWord() {
    const utterance = new SpeechSynthesisUtterance(currentWord.word);
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  }
  
  function checkSpelling() {
    const userAnswer = input.value.trim().toLowerCase();
    if (userAnswer === currentWord.word) {
      feedback.textContent = "🎉 Correct! Great job!";
      feedback.style.color = "#2ecc71";
    } else {
      feedback.textContent = `❌ Oops! Try again. Hint: ${currentWord.hint}`;
      feedback.style.color = "#e74c3c";
    }
  }
  
  playWordBtn.addEventListener("click", playWord);
  nextWordBtn.addEventListener("click", pickRandomWord);
  checkBtn.addEventListener("click", checkSpelling);
  
  // Start with a random word
  pickRandomWord();
  