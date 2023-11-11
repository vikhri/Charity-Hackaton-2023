const move = {
  from: [3,2],
  to: [3,3]
};


class Board {
  constructor(board) {
    this.board = board;
  }

  checkVictory() {
    const boardFlat = this.board.flat();

    for (let i = 0; i < boardFlat.length - 1; i++) {
      if( i + 1 !== boardFlat[i]) return false;
    }

    return true;
  }

  applyMove(move) {
    const rowFrom = move.from[0] - 1;
    const colFrom = move.from[1] - 1;
    const rowTo = move.to[0] - 1;
    const colTo = move.to[1] - 1;

    let tempCell = this.board[rowTo][colTo];

    this.board[rowTo][colTo] = this.board[rowFrom][colFrom];
    this.board[rowFrom][colFrom] = tempCell;
  }

  move(cell) {
    const row = cell[0];
    const col = cell[1];

    let move = {
      from: [row, col],
      to: []
    }

    const leftCell = this.board[row][col - 1];
    const rightCell = this.board[row][col + 1];
    const upCell = this.board[row - 1][col];
    const downCell = this.board[row + 1][col];

    if (leftCell == 0) {
      move.to = [row, col - 1]
    }
  }
}

// [1,2]


const testBoard = new Board([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 0],
])

testBoard.checkVictory();

console.log(testBoard.checkVictory());


testBoard.applyMove({
  from: [3,2],
  to: [3,3]
})

console.log(testBoard.board)
