const board = document.getElementById("bingo-board");
const resultDiv = document.getElementById("bingo-result");
const calledLetterDiv = document.getElementById("called-letter");
const callButton = document.getElementById("call-letter");

let calledLetters = [];
let selectedCells = new Set();

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const shuffled = alphabet.sort(() => 0.5 - Math.random()).slice(0, 25);

// Create bingo board
shuffled.forEach((letter, index) => {
  const cell = document.createElement("div");
  cell.classList.add("bingo-cell");
  cell.textContent = letter;
  cell.dataset.letter = letter;
  cell.dataset.index = index;

  cell.addEventListener("click", () => {
    if (calledLetters.includes(letter)) {
      cell.classList.toggle("selected");
      if (selectedCells.has(index)) {
        selectedCells.delete(index);
      } else {
        selectedCells.add(index);
      }
      checkBingo();
    }
  });

  board.appendChild(cell);
});

// Call random letter
callButton.addEventListener("click", () => {
  const remaining = alphabet.filter(l => !calledLetters.includes(l));
  if (remaining.length === 0) {
    calledLetterDiv.textContent = "All letters called!";
    return;
  }
  const letter = remaining[Math.floor(Math.random() * remaining.length)];
  calledLetters.push(letter);
  calledLetterDiv.textContent = `🎯 Letter Called: ${letter}`;
});

// Check for bingo
function checkBingo() {
  const winPatterns = [
    // Rows
    [0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14],[15,16,17,18,19],[20,21,22,23,24],
    // Columns
    [0,5,10,15,20],[1,6,11,16,21],[2,7,12,17,22],[3,8,13,18,23],[4,9,14,19,24],
    // Diagonals
    [0,6,12,18,24],[4,8,12,16,20]
  ];

  for (let pattern of winPatterns) {
    if (pattern.every(index => selectedCells.has(index))) {
      resultDiv.textContent = "🎉 Bingo! You won!";
      return;
    }
  }

  resultDiv.textContent = "Keep going! Mark called letters.";
}
