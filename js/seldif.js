const buttons = document.querySelectorAll("a");

const seldif = (event) => {
  const level = event.target.innerText.toLowerCase();
  localStorage.setItem("level",level);
};

buttons.forEach((button) => {
  button.addEventListener("click", seldif);
});
