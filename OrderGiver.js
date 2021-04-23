class OrderGiver {
  constructor() {
    // this.initialBoard = board;
    // this.gameBoard = new GameBoard(board);
    this.orders = [];
    this.orderList = {
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
  }

  takeBoard(board) {
    this.board = board;
  }

  formFinalOrder() {
    // this.orders = ["right", "act,right", "right"];
    this.orders = [
      "left",
      "left",
      "left",
      "left",
      "left",
      "left",
      "left",
      "up",
      "up",
      "right",
    ].reverse();
  }
}
