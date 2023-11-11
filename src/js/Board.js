class Board {
  constructor(board) {
    this.board = board;
  }

  log = [];

  findEmpty() {
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board.length; col++) {
        if (this.board[row][col] === 0) {
          return [row, col];
        }
      }
    }
  }

  randomize(size) {

    this.board = [];


    for (let row = 0; row < size; row++) {
      const r = [];
      for (let col = 0; col < size; col++) {
        const cell = size * row + col + 1;
        r.push(cell === size * size ? 0 : cell);
      }
      this.board.push(r);
    }

    const movesCount = 10;

    for (let i = 0; i < movesCount; i++) {

      let num = Math.floor(Math.random() * 4);
      switch (num) {
        case 0:
          this.up();
          break;
        case 1:
          this.left();
          break;
        case 2:
          this.down();
          break;
        case 3:
          this.right();
      }

    }
  }

  up() {
    const emptyLocation = this.findEmpty();
    if (emptyLocation[0] > 0) {
      this.applyMove(
        {
          from: emptyLocation,
          to: [emptyLocation[0] - 1, emptyLocation[1]]
        }
      )
    }
  }

  down() {
    const emptyLocation = this.findEmpty();
    if (emptyLocation[0] < this.board.length - 1) {
      this.applyMove(
        {
          from: emptyLocation,
          to: [emptyLocation[0] + 1, emptyLocation[1]]
        }
      )
    }
  }

  right() {
    const emptyLocation = this.findEmpty();
    if (emptyLocation[1] < this.board.length - 1) {
      this.applyMove(
        {
          from: emptyLocation,
          to: [emptyLocation[0], emptyLocation[1] + 1]
        }
      )
    }
  }

  left() {
    const emptyLocation = this.findEmpty();
    if (emptyLocation[1] > 0) {
      this.applyMove(
        {
          from: emptyLocation,
          to: [emptyLocation[0], emptyLocation[1] - 1]
        }
      )
    }
  }

  rollback() {

    if (this.log.length === 0) return 0;

    let lastMove = this.log.pop();
    let reversedMove = {
      from: lastMove.to,
      to: lastMove.from
    }
    this.applyMove(reversedMove);

    return this.log.length;
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
    this.log.push(move);

    return {
      move: move,
      card: card,
      finished: this.isFinished()
    }
  }
}

export default Board;
