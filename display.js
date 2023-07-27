// display.js
function displaySnake() {
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
  }
  
  function displayFood() {
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
  
    const playArea = document.getElementById("playArea");
    playArea.appendChild(foodElement);
  }
  