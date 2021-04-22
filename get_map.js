class GameBoard {
  constructor(board) {
    this.boardSymbolsMap = new Map([
      ["ladderSymbolsString", "HY⍬U⋕⋊Q"],
      ["pipeSymbolsString", "~{}⋜⋝ЭЄ⊣⊢<>"],
      ["brickSymbolsString", "#*4321X"],
      ["environmentSymbolsString", " #H~☼"],
      ["heroSymbolsString", "ѠЯRY◄►[]{}x⊰⊱⍬⊲⊳⊅⊄⋜⋝"],
    ]);
    this.boardStartString = this.setBoardString(board);
    this.boardWidth = this.setBoardWidth();
    this.boardHeight = this.setBoardHeight();
    this.boardStartMatrix = this.setBoardMatrix(this.boardStartString);
    this.boardMapMatrix = this.setBoardMapMatrix();
    this.boardString = this.boardStartString;
    this.boardMatrix = this.boardStartMatrix;
    this.myHeroPosition = this.getMyHeroPosition();
  }

  setBoardString(board) {
    return board.slice(6);
  }

  setBoardWidth() {
    return Math.sqrt(this.boardStartString.length);
  }

  setBoardHeight() {
    return this.boardStartString.length / this.boardWidth;
  }

  setBoardMatrix(boardString) {
    const boardWidth = this.boardWidth;
    const boardArray = boardString.split("");
    const boardLength = boardArray.length;
    const boardMatrix = [];
    boardMatrix[this.boardHeight - 1] = [];

    for (let i = 0, j = 0, k = this.boardHeight - 1; i < boardLength; i++) {
      if (j === boardWidth) {
        j = 0;
        k--;
        boardMatrix[k] = [];
      }

      boardMatrix[k][j] = boardArray[i];
      j--;
    }

    return boardMatrix;
  }

  setBoardMapMatrix() {
    const ladderSymbolsString = this.boardSymbolsMap.get("ladderSymbolsString");
    const pipeSymbolsString = this.boardSymbolsMap.get("pipeSymbolsString");
    const brickSymbolsString = this.boardSymbolsMap.get("brickSymbolsString");

    const boardMapMatrix = this.boardStartMatrix.map((item) => {
      if (ladderSymbolsString.includes(item)) {
        item = "H";
        return;
      }
      if (pipeSymbolsString.includes(item)) {
        item = "~";
        return;
      }
      if (brickSymbolsString.includes(item)) {
        item = "#";
        return;
      }
      if (item === "☼") {
        return;
      }

      item = " ";
    });

    return boardMapMatrix;
  }

  setCurrentBoardState(board) {
    this.boardString = this.setBoardString(board);
    this.boardMatrix = this.setBoardMatrix(this.boardString);
  }

  getItemPosInMatrix(itemIndex) {
    const yValue = this.boardHeight - Math.ceil(itemIndex / this.boardWidth);
    const xValue = itemIndex % this.boardWidth;
    return [yValue, xValue];
  }

  getMyHeroPosition() {
    const heroSymbolsString = this.boardSymbolsMap.get("heroSymbolsString");
    const regexp = new RegExp(`[${heroSymbolsString}]`);
    return getItemPosInMatrix(this.boardString.match(regexp).index);
  }
}

const gameBoard = new GameBoard(board);

gameBoard.setCurrentBoardState(board);
