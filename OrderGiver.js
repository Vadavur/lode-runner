class OrderGiver {
  constructor() {
    // this.initialBoard = board;
    // this.gameBoard = new GameBoard(board);
    this.finalOrder = "stop";
    this.orders = {
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

  takeBoard(board){
    this.board = board;
  }
  // getAimsList(){
  //   this.gameBoard
  // }



}

// lazy logger class
class L{
  static l (log){
    document.getElementById('log-panel').value += '\n' + log;
  }
}