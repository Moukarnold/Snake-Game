let highScoreValue = 0;

function updateScore(score) {
  const scorebox = document.getElementById("scorebox");
  scorebox.innerHTML = "Score: " + score;

  const highScorebox = document.getElementById("highScorebox");
  let highScore = localStorage.getItem("highScore");
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

  highScorebox.innerHTML = "High Score: " + highScoreValue;
}

