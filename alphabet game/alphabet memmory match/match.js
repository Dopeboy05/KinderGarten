const board = document.getElementById('game-board');
const restartBtn = document.getElementById('restart-btn');
const message = document.getElementById('message');

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').slice(0, 12); // Use 12 letters = 24 cards
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  cards = shuffle([...alphabet, ...alphabet]);
  board.innerHTML = '';
  message.textContent = '';
  cards.forEach(letter => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.letter = letter;
    card.innerHTML = '?';
    card.addEventListener('click', handleCardClick);
    board.appendChild(card);
  });
}

function handleCardClick(e) {
  const card = e.target;
  if (lockBoard || card.classList.contains('flipped') || card.classList.contains('matched')) return;

  card.classList.add('flipped');
  card.textContent = card.dataset.letter;

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  lockBoard = true;

  if (firstCard.dataset.letter === secondCard.dataset.letter) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetSelection();
    checkWin();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      firstCard.textContent = '?';
      secondCard.textContent = '?';
      resetSelection();
    }, 1000);
  }
}

function resetSelection() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function checkWin() {
  const matchedCards = document.querySelectorAll('.matched');
  if (matchedCards.length === cards.length) {
    message.textContent = '🎉 You matched them all! Great job!';
  }
}

restartBtn.addEventListener('click', createBoard);

createBoard();
