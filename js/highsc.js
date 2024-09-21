const highScores = JSON.parse(localStorage.getItem("highScores"));
const ul = document.querySelector("ul");

const content = highScores.map((item, index) => {
  return `
        <li>
            <span class="numbers">${index + 1}</span>
            <span class="names">${item.name}</span>
            <span class="scores">${item.score}</span>
        </li>
    `;
});
ul.innerHTML = content.join("");
