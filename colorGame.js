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

easyButton.addEventListener("click", function (){
    easyButton.classList.add("selected");
    hardButton.classList.remove("selected");
    numSquares = 3;
    color = generateRandomColor(numSquares);
    pickedColor = color[randomColor()];
    colorDisplay.textContent = pickedColor;
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
    for(var i=0; i<squares.length; i++){
        squares[i].style.backgroundColor = color[i];
    }
    h1.style.backgroundColor = "steelblue";
    this.textContent = "New Game";
    messageDisplay.textContent = "";
});

colorDisplay.textContent = pickedColor;

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