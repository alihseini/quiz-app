const loader = document.getElementById("loader");
const container = document.getElementById("container");
const questionText = document.getElementById("questionText");
const answerList = document.querySelectorAll(".answers");
const yourScore = document.getElementById("score");
const nextButton = document.getElementById("next");
const finishButton = document.getElementById("finish");
const showedQuestion = document.getElementById("question-number");
const error = document.getElementById("error");

const level = localStorage.getItem("level") || "medium";

let formattedData = null;
let questionNumber = 0;
let correctAnswerIndex = null;
let score = 0;
let correctScore = 10;
let isAccepted = true;

const URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;

const getData = async () => {
  try {
    const result = await fetch(URL);
    const data = await result.json();
    formattedData = formatingData(data.results);
    beginTest();
  } catch (er) {
    loader.style.display = "none";
    error.style.display = "block";
  }
};
const formatingData = (data) => {
  const result = data.map((item) => {
    const dataObject = { question: item.question };
    const answers = [...item.incorrect_answers];
    const CAindex = Math.floor(Math.random() * 4);
    answers.splice(CAindex, 0, item.correct_answer);
    dataObject.answers = answers;
    dataObject.CAindex = CAindex;
    return dataObject;
  });
  return result;
};
const beginTest = () => {
  showQuestions();
  loader.style.display = "none";
  container.style.display = "flex";
};
const showQuestions = () => {
  const { question, answers, CAindex } = formattedData[questionNumber];
  correctAnswerIndex = CAindex;
  questionText.innerText = question;
  answerList.forEach((button, index) => {
    button.innerText = answers[index];
  });
  showedQuestion.innerHTML = questionNumber + 1;
};
const checkAnswers = (event, index) => {
  if (!isAccepted) return;
  isAccepted = false;
  const isCorrect = correctAnswerIndex === index;
  if (isCorrect) {
    event.target.classList.add("correct-answer");
    score += correctScore;
    yourScore.innerText = score;
  } else {
    event.target.classList.add("wrong-answer");
    answerList[correctAnswerIndex].classList.add("correct-answer");
  }
};
const nextHandler = () => {
  questionNumber++;
  if (questionNumber < formattedData.length) {
    removeClasses();
    showQuestions();
    isAccepted = true;
  } else {
    localStorage.setItem("score", JSON.stringify(score));
    window.location.assign("./end.html");
  }
};
const finishHandler = () => {
  localStorage.setItem("score", JSON.stringify(score));
  window.location.assign("./end.html");
};
const removeClasses = () => {
  answerList.forEach((button) => {
    button.className = "";
  });
};

window.addEventListener("load", () => {
  getData();
  nextButton.addEventListener("click", nextHandler);
  finishButton.addEventListener("click", finishHandler);
  answerList.forEach((button, index) => {
    button.addEventListener("click", (event) => checkAnswers(event, index));
  });
});
