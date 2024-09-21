const highScores = JSON.parse(localStorage.getItem("highScores"))||[];
const score = JSON.parse(localStorage.getItem("score"));
const finalScore = document.getElementById("final-score");
const save = document.getElementById("save");
const player = document.getElementById("name");

finalScore.innerText = score;

const saveHandler = () => {
  if (!player.value || !score) {
    alert("Invalid Name Or Score!");
  } else {
    currentScore = { name: player.value, score };
    highScores.push(currentScore);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(10);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    localStorage.removeItem("score");
  }
};

save.addEventListener("click", saveHandler);
