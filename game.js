// game.js
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };
let score = 0;
let speed = 4;

const moveSound = new Audio("./Sound/move.mp3");
const foodSound = new Audio("./Sound/food.mp3");
const gameOverSound = new Audio("./Sound/gameOver.mp3");

// Function to check collision
function collision(snakeArr) {
  // Check collision with itself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
      return true;
    }
  }

  // Check collision with walls
  if (
    snakeArr[0].x >= 18 ||
    snakeArr[0].x <= 0 ||
    snakeArr[0].y >= 18 ||
    snakeArr[0].y <= 0
  ) {
    return true;
  }

  return false;
}

// Main logic behind running the game
function gameEngine() {
  // If collision happens
  if (collision(snakeArr)) {
    gameOverSound.play();
    inputDir = { x: 0, y: 0 };
    alert("Game Over");
    snakeArr = [{ x: 13, y: 15 }];
    score = 0;
    return;
  }

  // If food is eaten, regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score++;
    snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });

    let highScore = localStorage.getItem("highScore");
    let highScoreValue;

    if (highScore === null) {
      highScoreValue = 0;
      localStorage.setItem("highScore", JSON.stringify(highScoreValue));
    } else {
      highScoreValue = JSON.parse(highScore);
    }

    if (score > highScoreValue) {
      highScoreValue = score;
      localStorage.setItem("highScore", JSON.stringify(highScoreValue));
    }

    updateScore(score);

    // Generate new food at random position
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // Move the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  displaySnake();
  displayFood();
}
