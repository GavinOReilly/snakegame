const startButton = document.getElementById("startButton");
const scoreDisplay = document.getElementById("scoreDisplay");
const message = document.getElementById("message");
const gridDiv = document.getElementById("grid");
const highScoreDisplay = document.getElementById("highScoreDisplay");
const downArrow = document.getElementById("downArrow");
const upArrow = document.getElementById("upArrow");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");

const WIDTH = 20;
const MOVE_RIGHT = 1;
const MOVE_LEFT = -1;
const MOVE_UP = -20;
const MOVE_DOWN = 20;

let gridSquares = [];

for (let index = 0; index < WIDTH * WIDTH; index = index + 1) {
    const newDiv = document.createElement("div");
    gridDiv.appendChild(newDiv);
    gridSquares.push(newDiv);
}

let snakePos;
let currentDirection = MOVE_RIGHT;
let tickInterval;
let score = 0;
let highScore = 0;
let highScoreString = localStorage.getItem("snakeHighScore");
if (highScoreString) {
    highScore = parseInt(highScoreString)
    highScoreDisplay.innerText = highScore;
};
let gameSpeed = 450;

function endGame (msg) {
    message.innerText = msg;
    clearInterval(tickInterval);
}

function moveSnake() {

    let tail = snakePos.pop();
    let newHead = snakePos[0] + currentDirection;

    if(gridSquares[newHead].classList.contains('apple')){
        clearInterval(tickInterval);
        snakePos.push(tail);
        score = score +1;
        scoreDisplay.innerText = score;
        if (score > highScore) {
            highScore = score; 
            highScoreDisplay.innerText = highScore;
            localStorage.setItem("snakeHighScore", highScore);
        }
        gridSquares[newHead].classList.remove('apple');
        placeApple();
        gameSpeed = gameSpeed -20;
        tickInterval = setInterval(onGameTick, gameSpeed);
    }else{
        gridSquares[tail].classList.remove('snake');
    }

    snakePos.unshift(newHead);

   
    gridSquares[newHead].classList.add('snake');
};
function placeApple(){
    let index;
    
    do {
        index = Math.floor(Math.random() * WIDTH * WIDTH);
    } while(snakePos.indexOf(index) > 0); 

    
    gridSquares[index].classList.add('apple')
}

function onGameTick() {

    // hit buttom side
    if( snakePos[0] + currentDirection >= WIDTH * WIDTH && currentDirection === MOVE_DOWN) {
        endGame('You hit the bottom');
        return;
    }

    // hit top
    if( snakePos[0] + currentDirection < 0 && currentDirection === MOVE_UP) {
        endGame('You hit the top');
        return;
    }

    // hit the left
    if( snakePos[0] % WIDTH === 0 && currentDirection === MOVE_LEFT ) {
        endGame('You hit the left side');
        return;
    }

    // hit the right
    if( snakePos[0] % WIDTH === WIDTH -1 && currentDirection === MOVE_RIGHT ) {
        endGame('You hit the right side');
        return;
    }

    // hit myslef
    if ( gridSquares [snakePos[0] + currentDirection].classList.contains('snake')) {
        endGame('You hit yourself');
        return;
    };

     moveSnake();
    }


function onGameStart() {
    gameSpeed = 450;
    gridSquares.forEach((square) => {
        square.classList.remove('snake')
        square.classList.remove('apple')
    });
    snakePos = [106, 105, 104, 103, 102];
    snakePos.forEach(index => {
        gridSquares[index].classList.add('snake');
    });

    score = 0;
    scoreDisplay.innerText = score;

     currentDirection = MOVE_RIGHT;
     placeApple();
     tickInterval = setInterval(onGameTick, gameSpeed);
}
startButton.addEventListener('click', onGameStart);
document.addEventListener('keyup', (ev) => {
   if (ev.code === 'ArrowUp') {
        currentDirection = MOVE_UP;
   } else if (ev.code === 'ArrowDown') {
    currentDirection = MOVE_DOWN;
   } else if (ev.code === 'ArrowLeft') {
    currentDirection = MOVE_LEFT;
   } else if (ev.code === 'ArrowRight') {
    currentDirection = MOVE_RIGHT;
   }
});

function onButtonClick(dir) {
    currentDirection = dir
}

