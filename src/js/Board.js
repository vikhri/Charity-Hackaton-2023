class Board {
  constructor(board) {
    this.board = board;
    this.movesCounter = 0;
  }

  log = [];

  findItem(item = 0) {
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board.length; col++) {
        if (this.board[row][col] === item) {
          return [row, col];
        }
      }
    }
  }

  randomize(size) {

    this.movesCounter = 0;
    this.board = [];


    for (let row = 0; row < size; row++) {
      const r = [];
      for (let col = 0; col < size; col++) {
        const cell = size * row + col + 1;
        r.push(cell === size * size ? 0 : cell);
      }
      this.board.push(r);
    }

    let movesCount = 0;

    for (let i = 0; i < 1000; i++) {

      let num = Math.floor(Math.random() * 4);
      let result = false;
      switch (num) {
        case 0:
          result = this.up();
          break;
        case 1:
          result = this.left();
          break;
        case 2:
          result = this.down();
          break;
        case 3:
          result = this.right();
      }
      if (result) movesCount++;
      if (movesCount === 10) return;
    }
  }

  up() {
    const emptyLocation = this.findItem();
    if (emptyLocation[0] > 0) {
      this.applyMove(
        {
          from: emptyLocation,
          to: [emptyLocation[0] - 1, emptyLocation[1]]
        }
      )
      return true;
    }
    return false;
  }

  down() {
    const emptyLocation = this.findItem();
    if (emptyLocation[0] < this.board.length - 1) {
      this.applyMove(
        {
          from: emptyLocation,
          to: [emptyLocation[0] + 1, emptyLocation[1]]
        }
      )
      return true;
    }
    return false;
  }

  right() {
    const emptyLocation = this.findItem();
    if (emptyLocation[1] < this.board.length - 1) {
      this.applyMove(
        {
          from: emptyLocation,
          to: [emptyLocation[0], emptyLocation[1] + 1]
        }
      )
      return true;
    }
    return false;
  }

  left() {
    const emptyLocation = this.findItem();
    if (emptyLocation[1] > 0) {
      this.applyMove(
        {
          from: emptyLocation,
          to: [emptyLocation[0], emptyLocation[1] - 1]
        }
      )
      return true;
    }
    return false;
  }

  rollback() {

    if (this.log.length === 0 || this.isFinished()) return null;

    let lastMove = this.log.pop();
    const item = this.board[lastMove.to[0]][lastMove.to[1]];


    let reversedMove = {
      from: lastMove.to,
      to: lastMove.from
    }
    this.applyMove(reversedMove);

    this.movesCounter++;

    return {
     item: item,
     movesCount: this.log.length,
     direction: this.calculateDirection(reversedMove.from, reversedMove.to)
    }
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

  calculateDirection(from, to) {
    if (from[0] < to[0]) return 'down';
    if (from[0] > to[0]) return 'up';
    if (from[1] < to[1]) return 'right';
    if (from[1] > to[1]) return 'left';
  }

  getMoveDown() {
    const emptyZone = this.findItem(0);
    if (emptyZone[0] < 1) return null;
    const value = this.board[emptyZone[0] - 1][emptyZone[1]];
    return value;
  }
  getMoveUp() {
    const emptyZone = this.findItem(0);
    if (emptyZone[0] >= this.board.length - 1) return null;
    const value = this.board[emptyZone[0] + 1][emptyZone[1]];
    return value;
  }
  getMoveRight() {
    const emptyZone = this.findItem(0);
    if (emptyZone[1] < 1) return null;
    const value = this.board[emptyZone[0]][emptyZone[1] - 1];
    return value;
  }
  getMoveLeft() {
    const emptyZone = this.findItem(0);
    if (emptyZone[1] >= this.board.length - 1) return null;
    const value = this.board[emptyZone[0]][emptyZone[1] + 1];
    return value;
  }

  move(item) {
    if (this.isFinished()) return null;


    const cell = this.findItem(item);

    const row = cell[0];
    const col = cell[1];
    const card = this.board[row][col];

    let move = {
      from: [row, col],
      to: []
    }


    const leftCell = this.board[row][col - 1];
    const rightCell = this.board[row][col + 1];
    const upCell = row > 0 ? this.board[row - 1 ][col] : undefined;
    const downCell = row < this.board.length - 1 ? this.board[row + 1][col] : undefined;


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

    this.movesCounter++;

    return {
      card: card,
      finished: this.isFinished(),
      direction: this.calculateDirection(move.from, move.to)
    }
  }
}

export default Board;
