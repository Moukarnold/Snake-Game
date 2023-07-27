let inputDir = { x: 0, y: 0 };
const moveSound = new Audio("move.mp3");
const foodSound = new Audio("food.mp3");
const gameOverSound = new Audio("gameOver.mp3");
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };
let lastPaintTime = 0;
let speed = 4;
let score = 0;

function main(ctime) {
  window.requestAnimationFrame(main);

  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }

  lastPaintTime = ctime;
  gameEngine();
}

function collision(snakeArr) {
  // If collision with itself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
      return true;
    }
  }

  // If collision with wall
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

    const scorebox = document.getElementById("scorebox");
    scorebox.innerHTML = "Score: " + score;

    const highScorebox = document.getElementById("highScorebox");
    highScorebox.innerHTML = "High Score: " + highScoreValue;

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

  // Part 2: Display / Render snake
  const playArea = document.getElementById("playArea");
  playArea.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    playArea.appendChild(snakeElement);
  });

  // Display food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  playArea.appendChild(foodElement);
}

let highScore = localStorage.getItem("highScore");
let highScoreValue;

if (highScore === null) {
  highScoreValue = 0;
  localStorage.setItem("highScore", JSON.stringify(highScoreValue));
} else {
  highScoreValue = JSON.parse(highScore);
}

const scorebox = document.getElementById("scorebox");
scorebox.innerHTML = "Score: " + score;

const highScorebox = document.getElementById("highScorebox");
highScorebox.innerHTML = "High Score: " + highScoreValue;

const speedRange = document.getElementById("speedRange");
speedRange.addEventListener("input", () => {
  speed = parseInt(speedRange.value);
});

window.requestAnimationFrame(main);

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      console.log("Arrow Up");
      inputDir = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      console.log("Arrow Down");
      inputDir = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      console.log("Arrow Left");
      inputDir = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      console.log("Arrow Right");
      inputDir = { x: 1, y: 0 };
      break;
  }
});
