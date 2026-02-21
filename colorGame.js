var numSquares = 6;
var color = generateRandomColor(numSquares);
var squares = document.querySelectorAll(".square");
var pickedColor = color[randomColor()];
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.getElementById("messageDisplay");
var resetColorDisplay = document.getElementById("resetColorDisplay");
var header = document.getElementById("header");
var h1 = document.querySelector("h1");
var easyButton = document.getElementById("easyButton");
var hardButton = document.getElementById("hardButton");
var colorPreview = document.getElementById("colorPreview");
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
    this.classList.remove("play-again");
});

function resetGame() {
    color = generateRandomColor(numSquares);
    pickedColor = color[randomColor()];
    colorDisplay.textContent = pickedColor;
    updateRGBBreakdown(pickedColor);
    updateColorPreview(pickedColor);
    guessesThisRound = 0;
    header.classList.remove("win-state");
    header.style.backgroundColor = "";
    messageDisplay.textContent = "";
    messageDisplay.className = "";
    resetColorDisplay.textContent = "New Game";
    resetColorDisplay.classList.remove("play-again");

    for (var i = 0; i < squares.length; i++) {
        squares[i].classList.remove("eliminated", "win-pulse");

        if (i < numSquares) {
            squares[i].style.display = "";
            squares[i].style.backgroundColor = color[i];
            squares[i].style.opacity = "";
            squares[i].style.pointerEvents = "";
            playEntrance(squares[i], i);
        } else {
            squares[i].style.display = "none";
        }
    }
}

function playEntrance(square, index) {
    square.classList.remove("entrance");
    // Force reflow to restart animation
    void square.offsetWidth;
    square.style.animationDelay = (index * 60) + "ms";
    square.classList.add("entrance");
}

// Initialize game
colorDisplay.textContent = pickedColor;
updateRGBBreakdown(pickedColor);
updateColorPreview(pickedColor);

for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color[i];
    playEntrance(squares[i], i);

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
    animateScorePop();

    messageDisplay.textContent = "Correct! +" + points;
    messageDisplay.className = "correct";

    header.style.backgroundColor = pickedColor;
    header.classList.add("win-state");

    changeColors(clickedColor);
    resetColorDisplay.textContent = "Play Again?";
    resetColorDisplay.classList.add("play-again");
}

function handleWrongGuess(square) {
    guessesThisRound++;
    messageDisplay.textContent = "Try Again!";
    messageDisplay.className = "wrong";
    square.classList.add("eliminated");
}

function animateScorePop() {
    scoreValue.classList.remove("pop");
    void scoreValue.offsetWidth;
    scoreValue.classList.add("pop");
}

function changeColors(colors) {
    for (var i = 0; i < squares.length; i++) {
        if (squares[i].style.display !== "none") {
            (function(idx) {
                setTimeout(function() {
                    squares[idx].style.backgroundColor = colors;
                    squares[idx].classList.add("win-pulse");
                }, idx * 60);
            })(i);
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

function updateColorPreview(rgbString) {
    colorPreview.style.backgroundColor = rgbString;
    colorPreview.style.boxShadow = "0 0 12px " + rgbString;
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
