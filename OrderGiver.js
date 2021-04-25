class OrderGiver {
  constructor() {
    // this.initialBoard = board;
    // this.gameBoard = new GameBoard(board);
    this.order = [];
    this.commandsList = {
      GO_LEFT: "left",
      GO_RIGHT: "right",
      GO_UP: "up",
      GO_DOWN: "down",
      DRILL_LEFT: "act,left",
      DRILL_RIGHT: "act,right",
      DRILL: "act",
      SUICIDE: "act(0)",
      DO_NOTHING: "stop",
    };
    this.inProcess = false;
  }

  takeBoard(board) {
    this.board = board;
  }

  formOrder() {
    this.inProcess = true;
    const routes = new Routes(this.board);
    this.order = routes.getPath();
    this.inProcess = false;
  }
}
