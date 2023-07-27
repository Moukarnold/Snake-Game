// score.js
let highScoreValue = 0;

// Function to update score display
function updateScore(score) {
  const scorebox = document.getElementById("scorebox");
  scorebox.innerHTML = "Score: " + score;

  const highScorebox = document.getElementById("highScorebox");
  highScorebox.innerHTML = "High Score: " + highScoreValue;
}
