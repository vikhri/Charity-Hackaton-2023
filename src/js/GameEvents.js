import Board from "./Board.js";

const startGameButton = document.getElementById('start-game-button');
const gameBoard = document.getElementById('game-board');
const cells = document.querySelectorAll('.cell');
const undoButton = document.getElementById('undo-button');
const movesCounter = document.getElementById('moves-counter');

const board = new Board([]);
const transforms = {};

startGameButton.addEventListener('click', () => {
  board.randomize(3);
  console.log(board.board);

  const flatBoard = board.board.flat();
  const className = 'cell-3x3'
  let content = [];

  startGameButton.innerHTML = 'Заново';

  flatBoard.forEach((item) => {
    let image = item === 0 ? '' : `<img data-item="${item}" src="src/images/photo-Field/${3}/${item}.jpg" alt="">`;
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



cells.forEach((cell) => {
  cell.addEventListener('click', () => {
    cell.style.transform = 'translate(0, -100%)';
  })
})