class Hero {
  constructor() {
    this.order = [];
    this.isBusy = false;
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
  }

  getOrder(order) {
    if (this.isBusy) return;
    this.order = order;
    this.isBusy = true;
  }

  isNotDead(board) {
    const heroPosition = board.myHeroPosition;
    const heroItem = board.getBoardItemInPosition(
      heroPosition[0],
      heroPosition[1]
    );
    if (heroItem === "Ѡ" || heroItem === "x") {
      this.isBusy = false;
      return false;
    }
    return true;
  }

  executeOrder() {
    if (this.order.length === 1) {
      this.isBusy = false;
      return this.order.dequeue()[0];
    } else {
      return this.order.dequeue()[0];
    }
  }
}
