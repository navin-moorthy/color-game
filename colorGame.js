var numSquares = 6;
var color = generateRandomColor(numSquares);
var squares = document.querySelectorAll(".square");
var pickedColor = color[randomColor()];
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.getElementById("messageDisplay");
var resetColorDisplay = document.getElementById("resetColorDisplay");
var header = document.getElementById("header");
var easyButton = document.getElementById("easyButton");
var hardButton = document.getElementById("hardButton");
var scoreValue = document.getElementById("scoreValue");

// RGB Breakdown elements
var redBar = document.getElementById("redBar");
var greenBar = document.getElementById("greenBar");
var blueBar = document.getElementById("blueBar");
var redValue = document.getElementById("redValue");
var greenValue = document.getElementById("greenValue");
var blueValue = document.getElementById("blueValue");

// Score tracking
var score = 0;
var guessesThisRound = 0;

easyButton.addEventListener("click", function() {
    easyButton.classList.add("selected");
    hardButton.classList.remove("selected");
    numSquares = 3;
    resetGame();
});

hardButton.addEventListener("click", function() {
    easyButton.classList.remove("selected");
    hardButton.classList.add("selected");
    numSquares = 6;
    resetGame();
});

resetColorDisplay.addEventListener("click", function() {
    resetGame();
    this.textContent = "New Game";
});

function resetGame() {
    color = generateRandomColor(numSquares);
    pickedColor = color[randomColor()];
    colorDisplay.textContent = pickedColor;
    updateRGBBreakdown(pickedColor);
    guessesThisRound = 0;
    header.style.backgroundColor = "";
    messageDisplay.textContent = "";
    messageDisplay.className = "";
    resetColorDisplay.textContent = "New Game";

    for (var i = 0; i < squares.length; i++) {
        squares[i].classList.remove("eliminated");

        if (i < numSquares) {
            squares[i].style.display = "";
            squares[i].style.backgroundColor = color[i];
        } else {
            squares[i].style.display = "none";
        }
    }
}

// Initialize game
colorDisplay.textContent = pickedColor;
updateRGBBreakdown(pickedColor);

for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color[i];

    squares[i].addEventListener("click", function() {
        var clickedColor = this.style.backgroundColor;
        if (clickedColor === pickedColor) {
            handleCorrectGuess(clickedColor);
        } else {
            handleWrongGuess(this);
        }
    });

    // Keyboard support
    squares[i].addEventListener("keydown", function(e) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            this.click();
        }
    });
}

function handleCorrectGuess(clickedColor) {
    // Score: more points for fewer guesses
    var points = Math.max(1, numSquares - guessesThisRound);
    score += points;
    scoreValue.textContent = score;

    messageDisplay.textContent = "Correct! +" + points;
    messageDisplay.className = "correct";

    header.style.backgroundColor = pickedColor;

    changeColors(clickedColor);
    resetColorDisplay.textContent = "Play Again?";
}

function handleWrongGuess(square) {
    guessesThisRound++;
    var closeness = colorCloseness(square.style.backgroundColor, pickedColor);
    messageDisplay.textContent = "Try Again! " + closeness + "% close";
    messageDisplay.className = "wrong";
    square.classList.add("eliminated");
}

function changeColors(color) {
    for (var i = 0; i < squares.length; i++) {
        if (squares[i].style.display !== "none") {
            squares[i].style.backgroundColor = color;
        }
    }
}

function randomColor() {
    var random = Math.floor(Math.random() * color.length);
    return random;
}

function generateRandomColor(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr[i] = genRandomColor();
    }
    return arr;
}

function genRandomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function colorCloseness(guessedRgb, targetRgb) {
    var guess = guessedRgb.match(/\d+/g).map(Number);
    var target = targetRgb.match(/\d+/g).map(Number);
    var distance = Math.sqrt(
        Math.pow(guess[0] - target[0], 2) +
        Math.pow(guess[1] - target[1], 2) +
        Math.pow(guess[2] - target[2], 2)
    );
    var maxDistance = Math.sqrt(3 * Math.pow(255, 2));
    return Math.round((1 - distance / maxDistance) * 100);
}

function updateRGBBreakdown(rgbString) {
    var rgb = rgbString.match(/\d+/g);
    var r = parseInt(rgb[0]);
    var g = parseInt(rgb[1]);
    var b = parseInt(rgb[2]);

    redBar.style.width = (r / 255 * 100) + "%";
    greenBar.style.width = (g / 255 * 100) + "%";
    blueBar.style.width = (b / 255 * 100) + "%";

    redValue.textContent = r;
    greenValue.textContent = g;
    blueValue.textContent = b;
}
