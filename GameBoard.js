class GameBoard {
  constructor() {
    this.boardSymbols = new Map([
      ["ladderSymbolsSet", "HY⍬U⋕⋊Q"],
      ["pipeSymbolsSet", "~{}⋜⋝ЭЄ⊣⊢<>"],
      ["brickSymbolsSet", "#*4321X"],
      ["environmentSymbolsSet", " #H~☼"],
      ["heroSymbolsSet", "ѠЯRY◄►[]{}x⊰⊱⍬⊲⊳⊅⊄⋜⋝"],
      ["goldSymbolsSet", "$&@"],
      ["dangerSymbolsSet", "<>Z⋈⋰⋱⋊⋉⋕⋣⋢⊣⊢Q«»"],
      ["otherHeroSymbolsSet", "⌋⌊U)(⊐⊏ЭЄ"],
      ["drillSymbolsSet", "*X1234VW"],
    ]);
    this.initialBoard = "";
  }

  initializeBoard(board) {
    this.initialBoard = board;
    this.boardStartString = this.setBoardString(board._boardString);
    this.boardWidth = this.setBoardWidth();
    this.boardHeight = this.setBoardHeight();
    this.boardStartMatrix = this.setBoardMatrix(this.boardStartString);
    this.boardMapMatrix = this.setBoardMapMatrix();
    this.boardMapString = this.setBoardMapString();
  }

  refreshBoard(board) {
    this.boardString = this.setBoardString(board._boardString);
    this.showOpenedDrillsOnBoardString();
    this.boardMatrix = this.setBoardMatrix(this.boardString);
    this.boardMatrixString = this.setBoardMatrixString();
    this.myHeroPosition = this.getMyHeroPosition();
    this.colorizedBoardMatrixString = this.getColorizedBoardMatrixString();
    L.l(this.myHeroPosition)
  }

  setBoardString(board) {
    return board.slice(0);
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
      j++;
    }

    return boardMatrix;
  }

  setBoardMapMatrix() {
    const ladderSymbolsSet = this.boardSymbols.get("ladderSymbolsSet");
    const pipeSymbolsSet = this.boardSymbols.get("pipeSymbolsSet");
    const brickSymbolsSet = this.boardSymbols.get("brickSymbolsSet");

    const boardMapMatrix = this.boardStartMatrix.map((itemY) => {
      return itemY.map((itemX) => {
        if (ladderSymbolsSet.includes(itemX)) {
          itemX = "H";
          return itemX;
        }
        if (pipeSymbolsSet.includes(itemX)) {
          itemX = "~";
          return itemX;
        }
        if (brickSymbolsSet.includes(itemX)) {
          itemX = "#";
          return itemX;
        }
        if (itemX === "☼") {
          return itemX;
        }

        itemX = " ";
        return itemX;
      });
    });
    return boardMapMatrix;
  }

  setCurrentBoardState(board) {
    this.boardString = this.setBoardString(board._boardString);
    this.boardMatrix = this.setBoardMatrix(this.boardString);
  }

  setBoardMatrixString() {
    return this.boardString
      .match(new RegExp(`.{${this.boardWidth}}`, "g"))
      ?.join("\n");
  }

  getMyHeroPosition() {
    const heroSymbolsSet = this.boardSymbols.get("heroSymbolsSet");
    const boardString = this.boardString;
    L.l(boardString);
    const regexp = new RegExp(`[\$\{heroSymbolsSet\}]`);
    return this.getMatrixYXPositionOf(boardString.match(regexp).index);
  }

  getMatrixYXPositionOf(itemIndex) {
    const yValue = this.boardHeight - Math.ceil(itemIndex / this.boardWidth);
    const xValue = itemIndex % this.boardWidth;
    return [yValue, xValue];
  }

  getColorizedBoardMatrixString() {
    function colorizeSymbols(symbolsSet, color, bgColor) {
      return colorizedBoardArray.map((item) => {
        if (symbolsSet.includes(item)) {
          item = `<span style="color: ${
            color || "inherit"
          }; background-color: ${bgColor || "inherit"}">${item}</span>`;
        }
        return item;
      });
    }

    let colorizedBoardArray = this.boardMatrixString.split("");
    colorizedBoardArray = colorizeSymbols(
      this.boardSymbols.get("heroSymbolsSet"),
      "",
      "green"
    );

    colorizedBoardArray = colorizeSymbols(
      this.boardSymbols.get("goldSymbolsSet"),
      "",
      "yellow"
    );

    colorizedBoardArray = colorizeSymbols(
      this.boardSymbols.get("dangerSymbolsSet"),
      "",
      "red"
    );

    colorizedBoardArray = colorizeSymbols(
      this.boardSymbols.get("drillSymbolsSet"),
      "",
      "orange"
    );

    colorizedBoardArray = colorizeSymbols(
      this.boardSymbols.get("otherHeroSymbolsSet"),
      "",
      "lightblue"
    );

    colorizedBoardArray = colorizeSymbols("☼", "", "#102200");

    colorizedBoardArray = colorizeSymbols("#", "", "grey");

    return colorizedBoardArray.join("");
  }

  showOpenedDrillsOnBoardString() {
    const boardStringArr = this.boardString.split("");
    const boardMapStringArr = this.boardMapString.split("");
    this.boardString = boardStringArr
      .map((item, index) => {
        if (boardMapStringArr[index] === "#" && item === " ") {
          item = "V";
          return item;
        }
        if (boardMapStringArr[index] === " " && item === "#") {
          boardMapStringArr[index] = "#";
          return item;
        }
        return item;
      })
      .join("");
    this.boardMapString = boardMapStringArr.join("");
  }

  setBoardMapString() {
    return this.boardMapMatrix
      .reduceRight((arr, item) => {
        arr.push(item.join(""));
        return arr;
      }, [])
      .join("");
  }
}

// document.getElementById('otherViewer').value = '4323';
// const gameBoard = new GameBoard(board);

// gameBoard.setCurrentBoardState(board);
