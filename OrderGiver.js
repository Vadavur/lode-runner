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

    this.goldPath = routes.getGoldPath();
    // this.portalPath = routes.getPortalPath();
    // this.pillsPath = routes.getPillsPath();

    // if (this.goldPath.length >= 25) {
    //   if (this.pillsPath <= 15) {
    //     this.order = this.pillsPath;
    //   } else {
    //     if (this.portalPath.length <= this.goldPath.length) {
    //       this.order = this.portalPath;
    //     } else {
    //       this.order = this.goldPath;
    //     }
    //   }
    // } else {
    //   this.order = this.goldPath;
    // }
    // this.order = this.pillsPath;
    // this.order = this.portalPath;
    this.order = this.goldPath;

    this.inProcess = false;
  }
}
