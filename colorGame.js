var numSquares = 6;
var color = generateRandomColor(numSquares);
var squares = document.querySelectorAll(".square");
var pickedColor = color[randomColor()];
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.getElementById("messageDisplay");
var resetColorDisplay = document.getElementById("resetColorDisplay");
var h1 = document.querySelector("h1");
var easyButton = document.getElementById("easyButton");
var hardButton = document.getElementById("hardButton");

// RGB Breakdown elements
var redBar = document.getElementById("redBar");
var greenBar = document.getElementById("greenBar");
var blueBar = document.getElementById("blueBar");
var redValue = document.getElementById("redValue");
var greenValue = document.getElementById("greenValue");
var blueValue = document.getElementById("blueValue");
var redPercentage = document.getElementById("redPercentage");
var greenPercentage = document.getElementById("greenPercentage");
var bluePercentage = document.getElementById("bluePercentage");

easyButton.addEventListener("click", function (){
    easyButton.classList.add("selected");
    hardButton.classList.remove("selected");
    numSquares = 3;
    color = generateRandomColor(numSquares);
    pickedColor = color[randomColor()];
    colorDisplay.textContent = pickedColor;
    updateRGBBreakdown(pickedColor);
    for(var i=0; i<squares.length; i++){
        if(color[i]){
            squares[i].style.backgroundColor = color[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "steelblue";
    messageDisplay.textContent = "";
});

hardButton.addEventListener("click", function (){
    easyButton.classList.remove("selected");
    hardButton.classList.add("selected");
    numSquares = 6;
    color = generateRandomColor(numSquares);
    pickedColor = color[randomColor()];
    colorDisplay.textContent = pickedColor;
    updateRGBBreakdown(pickedColor);
    for(var i=0; i<squares.length; i++){
        squares[i].style.backgroundColor = color[i];
        squares[i].style.display = "block";
    }
    h1.style.backgroundColor = "steelblue";
    messageDisplay.textContent = "";
});


resetColorDisplay.addEventListener("click", function(){
    color = generateRandomColor(numSquares);
    pickedColor = color[randomColor()];
    colorDisplay.textContent = pickedColor;
    updateRGBBreakdown(pickedColor);
    for(var i=0; i<squares.length; i++){
        squares[i].style.backgroundColor = color[i];
    }
    h1.style.backgroundColor = "steelblue";
    this.textContent = "New Game";
    messageDisplay.textContent = "";
});

colorDisplay.textContent = pickedColor;
updateRGBBreakdown(pickedColor);

for(var i=0; i<squares.length; i++){
    squares[i].style.backgroundColor = color[i];
    squares[i].addEventListener("click", function(){
        var clickedColor = this.style.backgroundColor;
        if(clickedColor === pickedColor){
            messageDisplay.textContent = "Correct!";
            h1.style.backgroundColor = pickedColor;
            changeColors(clickedColor);
            resetColorDisplay.textContent = "Play Again?";
        }else{
            messageDisplay.textContent = "Try Again!";
            this.style.backgroundColor = "#232323";
        }
    });
}

function changeColors(colors){
    for(var i=0; i <squares.length; i++){
        squares[i].style.backgroundColor = colors;
    }
}

function randomColor(){
    var random = Math.floor(Math.random() * color.length);
    return random;
}

function generateRandomColor(num){
    var arr = [];
    for(var i=0; i<num; i++){
        arr[i] = genRandomColor();
    }
    return arr;
}

function genRandomColor(){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function updateRGBBreakdown(rgbString){
    // Parse RGB string like "rgb(255, 128, 64)" to extract values
    var rgb = rgbString.match(/\d+/g);
    var r = parseInt(rgb[0]);
    var g = parseInt(rgb[1]);
    var b = parseInt(rgb[2]);

    // Calculate percentages
    var rPercent = Math.round(r / 255 * 100);
    var gPercent = Math.round(g / 255 * 100);
    var bPercent = Math.round(b / 255 * 100);

    // Update bar widths (0-255 maps to 0-100%)
    redBar.style.width = rPercent + "%";
    greenBar.style.width = gPercent + "%";
    blueBar.style.width = bPercent + "%";

    // Update numeric values
    redValue.textContent = r;
    greenValue.textContent = g;
    blueValue.textContent = b;

    // Update percentage displays
    redPercentage.textContent = rPercent + "%";
    greenPercentage.textContent = gPercent + "%";
    bluePercentage.textContent = bPercent + "%";
}