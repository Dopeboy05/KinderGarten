// Generate alphabet inputs
const letterList = document.getElementById("letter-list");
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

alphabet.forEach(letter => {
    const div = document.createElement("div");
    div.className = "letter-item";

    const label = document.createElement("label");
    label.textContent = `${letter}`;
    label.setAttribute("for", `input-${letter}`);

    const input = document.createElement("input");
    input.type = "text";
    input.id = `input-${letter}`;
    input.name = letter;

    div.appendChild(label);
    div.appendChild(input);
    letterList.appendChild(div);
});

// Evaluate form submission
const form = document.getElementById("hunt-form");
const resultsDiv = document.getElementById("results");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    let filled = 0;

    alphabet.forEach(letter => {
        const input = document.getElementById(`input-${letter}`);
        if (input.value.trim() !== "") {
            filled++;
        }
    });

    const percentage = Math.round((filled / 26) * 100);
    let message = `✅ You found ${filled} out of 26 items! (${percentage}%)\n`;

    if (percentage === 100) {
        message += "🎉 Amazing! You completed the scavenger hunt!";
    } else if (percentage >= 50) {
        message += "👏 Good job! Try to find the rest!";
    } else {
        message += "📚 Keep going! You can do it!";
    }

    resultsDiv.textContent = message;
});
