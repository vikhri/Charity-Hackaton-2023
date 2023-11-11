import Board from "./Board.js";

const startGameButton = document.getElementById('start-game-button');
const gameBoard = document.getElementById('game-board');
const cells = document.querySelectorAll('.cell');

const board = new Board([]);

startGameButton.addEventListener('click', () => {
  board.randomize(3);
  console.log(board.board);

  const flatBoard = board.board.flat();
  const className = 'cell-3x3'
  let content = [];




  flatBoard.forEach((item) => {

    let image = item === 0 ? '' : `<img src="src/images/photo-Field/${3}/${item}.jpg">`;

    content.push(
      `<div class="cell ${className}">` +
      `<div class="image-wrapper">` +
      image +
      `</div>` +
      `</div>`
    )
  })


  gameBoard.innerHTML = content.join('');







})

cells.forEach((cell) => {
  cell.addEventListener('click', () => {
    cell.style.transform = 'translate(0, -100%)';
  })
})