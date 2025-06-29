const totalQuestions = 10;
let currentQuestion = 0;
let score = 0;

const userAnswers = [];
const questions = [];

function getRandomSubtraction() {
  let a = Math.floor(Math.random() * 10);
  let b = Math.floor(Math.random() * 10);
  if (a < b) [a, b] = [b, a]; // ensure no negative results
  return {
    text: `${a} - ${b}`,
    correctAnswer: a - b
  };
}

function loadQuestion() {
  if (currentQuestion >= totalQuestions) {
    showResults();
    return;
  }

  const q = getRandomSubtraction();
  questions.push(q);
  document.getElementById('answer').value = '';
  document.getElementById('question-number').textContent = `📚 Question ${currentQuestion + 1} of ${totalQuestions}`;
  document.getElementById('question-text').textContent = q.text;
}

function submitAnswer() {
  const userInput = parseInt(document.getElementById('answer').value);
  const q = questions[currentQuestion];

  userAnswers.push(userInput);

  if (userInput === q.correctAnswer) {
    score++;
  }

  currentQuestion++;
  loadQuestion();
}

function showResults() {
  document.getElementById('quiz-box').style.display = 'none';
  document.getElementById('final-score').style.display = 'block';
  document.getElementById('solution-list').style.display = 'block';
  document.getElementById('feedback').style.display = 'block';

  document.getElementById('final-score').textContent = `🎯 You got ${score} out of ${totalQuestions} correct!`;

  const list = document.getElementById('solution-list');
  list.innerHTML = '<strong>🔍 Questions to review:</strong><br>';
  let missedAny = false;

  for (let i = 0; i < totalQuestions; i++) {
    const q = questions[i];
    const userAns = userAnswers[i];
    if (userAns !== q.correctAnswer) {
      missedAny = true;
      list.innerHTML += `<div class="solution-item">❌ Q${i + 1}: ${q.text} = ${q.correctAnswer} (You answered: ${userAns})</div>`;
    }
  }

  if (!missedAny) {
    list.innerHTML = '🎉 Amazing! You got every question right!';
  }

  const feedback = document.getElementById('feedback');
  if (score === 10) {
    feedback.innerHTML = "🌟 Perfect score! You're a subtraction star!";
  } else if (score >= 7) {
    feedback.innerHTML = "👍 Great work! Keep it up!";
  } else if (score >= 4) {
    feedback.innerHTML = "😊 You're learning! Keep practicing!";
  } else {
    feedback.innerHTML = "💡 Keep trying! You’re doing great!";
  }
}

function goBack() {
  window.location.href = "menu.html"; // Change this to your actual menu page path
}

loadQuestion();
