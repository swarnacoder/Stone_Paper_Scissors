const rulesBtn = document.querySelectorAll(".rulesBtn");
const nextBtn = document.getElementById("nextButton");
const playAgainBtn = document.querySelector("#play-again");
const replayBtn = document.querySelector("#replay");
const crossBtn = document.getElementById("cross");
const gameRules = document.getElementById("game-rules");
const winner = document.querySelector(".winner");
const gameIcon = document.getElementById("gameicon");
const resultAll = document.getElementById("resultAll");
const userResult = document.querySelector(".user-result");
const pcResult = document.querySelector(".pc-result");
let result1 = document.getElementById("result-1");
let result2 = document.getElementById("result-2");
let picked = document.querySelectorAll(".picked");
const computerScore = document.getElementById("computer-number"); 
const userScore = document.getElementById("your-number");

let score = {
  user: 0,
  computer: 0,
};
let userWon = false;
if (localStorage.getItem("score")) {
  score = JSON.parse(localStorage.getItem("score"));
}
userScore.innerHTML = score.user;
computerScore.innerHTML = score.computer;


const result = {
  WIN: "YOU WIN",
  LOST: "YOU LOST",
  TIEUP: "TIE UP",
};
rulesBtn.forEach((element) => {
  element.addEventListener("click", () => {
    gameRules.style.display = "block";
  });
});

crossBtn.addEventListener("click", () => {
  gameRules.style.display = "none";
});

nextBtn.addEventListener("click", () => {
  gameIcon.style.display = "none";
  resultAll.style.display = "none";
  winner.style.display = "flex";
});

playAgainBtn.addEventListener("click", playAgain);

replayBtn.addEventListener("click", playAgain);

function playAgain() {
  gameIcon.style.display = "grid";
  resultAll.style.display = "none";
  winner.style.display = "none";
  nextBtn.style.display = "none";
  userWon = false;
  updateButtonPositions();

}

const computer = ["rock", "paper", "scissor"];
function computerPicked() {
  let picked = Math.floor(Math.random() * computer.length);
  return computer[picked];
}
function displayImg(picked) {
  let img = `<img src="./images/${picked}.png" alt=${picked} width="52px"/>`;
  console.log(picked, 'picked');
  return img;
}



function updateStyle() {

  resultAll.style.marginTop = "50px";

  picked.forEach((element) => {
    element.style.top = "350px";
  });

  for (let index = 0; index < 3; index++) {
    userResult.classList.remove("rock-div");
    userResult.classList.remove("paper-div");
    userResult.classList.remove("scissor-div");
    pcResult.classList.remove("rock-div");
    pcResult.classList.remove("paper-div");
    pcResult.classList.remove("scissor-div");

    playAgainBtn.style.display = "block";
    result2.style.display = "block";
    replayBtn.style.display = "none";
    nextBtn.style.display = "none";
  }
}


const makeChoices = (userPicked) => {
  let pcPicked = computerPicked();
  updateStyle();
  let res;
  if (userPicked === pcPicked) {
    res = result.TIEUP;
    removeDiv();
    playAgainBtn.style.display = "none";
    replayBtn.style.display = "block";
    result2.style.display = "none";

    picked.forEach((element) => {
      element.style.top = "300px";
    });

    resultAll.style.marginTop = "6rem";
  } 
  else if (
    (userPicked === "rock" && pcPicked === "scissor") ||
    (userPicked === "paper" && pcPicked === "rock") ||
    (userPicked === "scissor" && pcPicked === "paper")
  ) {
    res = result.WIN;
    userWon = true;
    coloruserWinner();
    score.user++;
  } 
  else {
    res = result.LOST;
    colorcomputerrWinner();
    score.computer++;
  }

  if (userWon) {
    nextBtn.style.display = "block"; 
  }
  updateButtonPositions();
  function updateButtonPositions() {
    if (userWon) {
      rulesBtn.forEach((element) => {
        element.style.right = "9rem";
      });
      nextBtn.style.right = "20px"; 
    } else {
      rulesBtn.forEach((element) => {
        element.style.right = "20px"; 
        element.style.left = "auto";
      });
      nextBtn.style.display = "none";
    }
  }
  gameIcon.style.display = "none";
  resultAll.style.display = "flex";
  userResult.classList.add(`${userPicked}-div`);
  pcResult.classList.add(`${pcPicked}-div`);
  userResult.innerHTML = displayImg(userPicked);
  pcResult.innerHTML = displayImg(pcPicked);
  result1.innerHTML = res;
  userScore.innerHTML = score.user;
  computerScore.innerHTML = score.computer;
  localStorage.setItem("score", JSON.stringify(score));
};


let userbox1 = document.querySelector(".user-box1");
let userbox2 = document.querySelector(".user-box2");
let userbox3 = document.querySelector(".user-box3");
let pcbox1 = document.querySelector(".pc-box1");
let pcbox2 = document.querySelector(".pc-box2");
let pcbox3 = document.querySelector(".pc-box3");

let coloruserWinner = () => {
  pcbox1.classList.remove("box1");
  pcbox2.classList.remove("box2");
  pcbox3.classList.remove("box3");

  userbox1.classList.add("box1");
  userbox2.classList.add("box2");
  userbox3.classList.add("box3");
};
let colorcomputerrWinner = () => {
  userbox1.classList.remove("box1");
  userbox2.classList.remove("box2");
  userbox3.classList.remove("box3");

  pcbox1.classList.add("box1");
  pcbox2.classList.add("box2");
  pcbox3.classList.add("box3");
};

let removeDiv = () => {
  userbox1.classList.remove("box1");
  userbox2.classList.remove("box2");
  userbox3.classList.remove("box3");

  pcbox1.classList.remove("box1");
  pcbox2.classList.remove("box2");
  pcbox3.classList.remove("box3");
};


