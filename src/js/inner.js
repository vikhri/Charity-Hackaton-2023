const move = {
  from: [3,2],
  to: [3,3]
};
class Board {
  constructor(board) {
    this.board = board;
  }

  isFinished() {
    const boardFlat = this.board.flat();

    for (let i = 0; i < boardFlat.length - 1; i++) {
      if( i + 1 !== boardFlat[i]) return false;
    }

    return true;
  }
  applyMove(move) {
    const rowFrom = move.from[0];
    const colFrom = move.from[1];
    const rowTo = move.to[0];
    const colTo = move.to[1];

    let tempCell = this.board[rowTo][colTo];

    this.board[rowTo][colTo] = this.board[rowFrom][colFrom];
    this.board[rowFrom][colFrom] = tempCell;
  }

  move(cell) {
    const row = cell[0] - 1;
    const col = cell[1] - 1 ;
    const card = this.board[row][col];

    let move = {
      from: [row, col],
      to: []
    }


    const leftCell = this.board[row][col - 1];
    const rightCell = this.board[row][col + 1];
    const upCell = row > 0 ? this.board[row - 1 ][col] : undefined;
    const downCell = row < this.board.length - 1 ? this.board[row + 1][col] : undefined;

    console.log(
      leftCell, rightCell, upCell, downCell
    )

    if (leftCell === 0) {
      move.to = [row, col - 1]
    }
    if (rightCell === 0) {
      move.to = [row, col + 1]
    }
    if (upCell === 0) {
      move.to = [row - 1, col]
    }
    if (downCell === 0) {
      move.to = [row + 1, col]
    }

    if (upCell !== 0 && downCell !==0 && rightCell !==0 && leftCell !==0) {
      return null;
    }

    this.applyMove(move);

    return {
      move: move,
      card: card,
      finished: this.isFinished()
    }
  }
}

const testBoard = new Board([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 0],
])


console.log(testBoard.move([2,3]));
console.log(testBoard.move([3,3]));

