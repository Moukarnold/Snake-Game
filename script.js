// scripts.js
// Initialize the score display
updateScore();

// Set up event listener for speed range input
const speedRange = document.getElementById("speedRange");
speedRange.addEventListener("input", () => {
  speed = parseInt(speedRange.value);
});

// Start the game loop
function main(ctime) {
  window.requestAnimationFrame(main);

  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }

  lastPaintTime = ctime;
  gameEngine();
}

let lastPaintTime = 0;
window.requestAnimationFrame(main);
window.addEventListener("keydown", handleInput);
