// input.js
let inputDir = { x: 0, y: 0 };

// Function to handle user input
function handleInput(e) {
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
}
