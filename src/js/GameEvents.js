import Board from "./Board.js";

const elem = document.getElementById('app');
const cells = document.querySelectorAll('.cell');

const board = new Board([]);

elem.addEventListener('click', () => {
  board.randomize(4);
  console.log(board.board)
})

cells.forEach((cell) => {
  cell.addEventListener('click', () => {
    cell.style.transform = 'translate(0, -100%)';
  })
})