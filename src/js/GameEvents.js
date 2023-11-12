import Board from "./Board.js";
import sendUserData from "./Finish.js";

const startGameButton = document.getElementById('start-game-button');
const gameBoard = document.getElementById('game-board');
const cells = document.querySelectorAll('.cell');
const undoButton = document.getElementById('undo-button');
const movesCounter = document.getElementById('moves-counter');
const tabs = document.querySelectorAll('.js-board-size');
const winDialog = document.getElementById('win-dialog');
const form = document.getElementById('user-name-form');
const username = document.getElementById('user-name-input');

const board = new Board([]);
const transforms = {};
let boardSize = 4;

tabs.forEach((tab) => {
  tab.addEventListener('change', () => {
    if (tab.checked === true) {
        boardSize = tab.value;
    }
  });
})

const state = {
  name: null,
  time: null,
};

const render = (state) => {
  document.querySelector('.timer').textContent = state.time;
};

let currentInterval;
const startTimer = (startOver = false) => {
  let startDate = startOver ? new Date() : new Date();
  const updateTimer = () => {
    const currentDate = new Date();
    const passedSeconds = Math.floor((currentDate - startDate) / 1000);
    state.time = `${Math.floor(passedSeconds / 60)}:${(passedSeconds % 60) < 10 ? '0' : ''}${passedSeconds % 60}`;
    render(state);
  }
  clearInterval(currentInterval);
  currentInterval = setInterval(updateTimer, 1000);
};

startGameButton.addEventListener('click', () => {
  startTimer(true);

  board.randomize(boardSize);
  console.log(board.board);

  const flatBoard = board.board.flat();
  const className = `cell-${boardSize}x${boardSize}`
  let content = [];

  startGameButton.innerHTML = 'Заново';

  flatBoard.forEach((item) => {
    let image = item === 0 ? '' : `<img data-item="${item}" src="/photo/${boardSize}/${item}.jpg" alt="">`;
    content.push(
      `<div class="cell ${className}">` +
      `<div class="image-wrapper">` +
      image +
      `</div>` +
      `</div>`
    )

    transforms[item] = [0,0];
  })

  gameBoard.innerHTML = content.join('');

  gameBoard.querySelectorAll('img').forEach((pic) => {
    pic.addEventListener("click", ()=> {

      const item = parseInt(pic.dataset.item);
      const response = board.move(item);

      console.log(response);

      if (response.finished) {
        setTimeout(()=> {winDialog.showModal()}, 700)
        sendUserData(state);
      }

      if (response === null) return;


      switch (response.direction) {
        case "left":
          transforms[item][0] -= 100;
          break;
        case "right":
          transforms[item][0] += 100;
          break;
        case "up":
          transforms[item][1] -= 100;
          break;
        case "down":
          transforms[item][1] += 100;
          break;
      }

      pic.style.transform = `translate(${transforms[item][0]}%,${transforms[item][1]}%)`;

      movesCounter.innerHTML = board.movesCounter;
    })
  })
})


undoButton.addEventListener('click', () => {
  const response = board.rollback();

  if (response === null) return;

  const item = response.item;

  switch (response.direction) {
    case "left":
      transforms[item][0] -= 100;
      break;
    case "right":
      transforms[item][0] += 100;
      break;
    case "up":
      transforms[item][1] -= 100;
      break;
    case "down":
      transforms[item][1] += 100;
      break;
  }

  const pic = gameBoard.querySelector(`[data-item="${item}"]`);

  pic.style.transform = `translate(${transforms[item][0]}%,${transforms[item][1]}%)`;
  movesCounter.innerHTML = board.movesCounter;
})


form.addEventListener('submit', (e) => {
  e.preventDefault();
  state.name = username.value ?? 'Аноним';
  winDialog.close();
})