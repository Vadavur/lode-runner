class GameBoard {
  constructor() {
    this.boardSymbols = new Map([
      ["ladderSymbolsSet", "HY⍬U⋕⋊Q"],
      ["pipeSymbolsSet", "~{}⋜⋝ЭЄ⊣⊢<>"],
      ["brickSymbolsSet", "#*X123456789ABVW"],
      ["environmentSymbolsSet", " #H~☼"],
      ["heroSymbolsSet", "ѠЯRY◄►[]{}x⊰⊱⍬⊲⊳⊅⊄⋜⋝"],
      ["goldSymbolsSet", "$&@"],
      ["dangerSymbolsSet", "<>Z⋈⋰⋱⋊⋉⋕⋣⋢⊣⊢Q«»"],
      ["otherHeroSymbolsSet", "⌋⌊U)(⊐⊏ЭЄ"],
      ["drillSymbolsSet", "*X123456789ABVW"],
    ]);
    this.initialBoard = "";
  }

  initializeBoard(board) {
    this.initialBoard = board;
    this.initialBoardString = board._boardString;
    this.boardWidth = this.setBoardWidth();
    this.boardHeight = this.setBoardHeight();
    this.boardMapString = this.setBoardMapString();
    this.boardMapMatrix = this.setBoardMatrix(this.boardMapString);
  }

  actualizeBoard(board) {
    this.boardString = board._boardString;
    this.showDrillsStatusOnBoardString();
    this.boardMatrix = this.setBoardMatrix(this.boardString);
    this.boardMatrixString = this.setBoardMatrixString();
    this.myHeroPosition = this.getMyHeroPosition();
    this.colorizedBoardMatrixString = this.getColorizedBoardMatrixString();
  }

  setBoardWidth() {
    return Math.sqrt(this.initialBoardString.length);
  }

  setBoardHeight() {
    return this.initialBoardString.length / this.boardWidth;
  }

  setBoardMapString() {
    const ladderSymbolsSet = this.boardSymbols.get("ladderSymbolsSet");
    const pipeSymbolsSet = this.boardSymbols.get("pipeSymbolsSet");
    const brickSymbolsSet = this.boardSymbols.get("brickSymbolsSet");

    return this.initialBoardString
      .split("")
      .map((item) => {
        if (ladderSymbolsSet.includes(item)) {
          item = "H";
          return item;
        }
        if (pipeSymbolsSet.includes(item)) {
          item = "~";
          return item;
        }
        if (brickSymbolsSet.includes(item) || item === "☼") {
          return item;
        }
        if (item === "⊛") {
          item = "O";
          return item;
        }

        item = " ";
        return item;
      })
      .join("");
  }

  showDrillsStatusOnBoardString() {
    const boardStringArr = this.boardString.split("");
    const boardMapStringArr = this.boardMapString.split("");
    this.boardString = boardStringArr
      .map((item, index) => {
        if (item === "#") {
          return item;
        }
        // if (item === "*") {
        //   boardMapStringArr[index] = "*";
        //   return item;
        // }
        // if (boardMapStringArr[index] === "*") {
        //   boardMapStringArr[index] = "B";
        //   return "B";
        // }
        // if (boardMapStringArr[index] === "B") {
        //   boardMapStringArr[index] = "A";
        //   return "A";
        // }
        // if (boardMapStringArr[index] === "A") {
        //   boardMapStringArr[index] = 9;
        //   return 9;
        // }
        // if (boardMapStringArr[index] >= 5 && boardMapStringArr[index] <= 9) {
        //   item = boardMapStringArr[index] - 1;
        //   boardMapStringArr[index]--;
        //   return item;
        // }
        if (item === "⊛") {
          return "O";
        }
        return item;
      })
      .join("");
    this.boardMapString = boardMapStringArr.join("");
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

  setBoardMatrixString() {
    return this.boardString
      .match(new RegExp(`.{${this.boardWidth}}`, "g"))
      ?.join("\n");
  }

  getMyHeroPosition() {
    const boardString = this.boardString;

    return this.getMatrixYXPositionOf(
      boardString.search(/[ѠЯRY◄►\[\]{}x⊰⊱⍬⊲⊳⊅⊄⋜⋝]/)
    );
  }

  getMatrixYXPositionOf(itemIndex) {
    const yValue = this.boardHeight - Math.ceil(itemIndex / this.boardWidth);
    const xValue = itemIndex % this.boardWidth;
    return [yValue, xValue];
  }

  getColorizedBoardMatrixString() {
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
    colorizedBoardArray = colorizeSymbols("O", "", "purple");
    colorizedBoardArray = colorizeSymbols("S", "", "blue");

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
    return colorizedBoardArray.join("");
  }

  getBoardItemInPosition(coordY, coordX) {
    return this.boardMatrix[coordY][coordX];
  }

  getMapItemInPosition(coordY, coordX) {
    return this.boardMapMatrix[coordY][coordX];
  }
}
