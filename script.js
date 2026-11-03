let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];

let started = false;
let canPress = false;
let level = 0;

const FLASH_TIME = 250;
const GAP_TIME = 600;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started === false) {
    started = true;
    level = 0;
    gameSeq = [];
    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");

  setTimeout(function () {
    btn.classList.remove("flash");
  }, FLASH_TIME);
}

function userFlash(btn) {
  btn.classList.add("userFlash");

  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, FLASH_TIME);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * btns.length);
  gameSeq.push(btns[randIdx]);

  canPress = false;
  setTimeout(playSequence, 400);
}

function playSequence() {
  let i = 0;

  let interval = setInterval(function () {
    let btn = document.querySelector(`.${gameSeq[i]}`);
    gameFlash(btn);
    i++;

    if (i === gameSeq.length) {
      clearInterval(interval);
      setTimeout(function () {
        canPress = true;
      }, GAP_TIME);
    }
  }, GAP_TIME);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      canPress = false;
      h2.innerText = `Level ${level} complete!`;
      setTimeout(levelUp, 1000);
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  h2.innerText = `Game Over! Your score was ${level}. Press any key to start again.`;
  document.body.classList.add("game-over");

  setTimeout(function () {
    document.body.classList.remove("game-over");
  }, 200);

  started = false;
  canPress = false;
  level = 0;
  gameSeq = [];
  userSeq = [];
}

function btnPress() {
  if (!started || !canPress) return;

  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

const allBtns = document.querySelectorAll(".btn");
for (const btn of allBtns) {
  btn.addEventListener("click", btnPress);
}
