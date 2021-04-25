class Hero {
  constructor() {
    this.order = [];
    this.isBusy = false;
    this.currentPosition;
    this.previousPosition;
    this.prePreviousPosition;
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
    this.prePreviousPosition = this.previousPosition;
    this.previousPosition = this.currentPosition;
    this.currentPosition = board.myHeroPosition;
    const heroItem = board.getBoardItemInPosition(
      this.currentPosition[0],
      this.currentPosition[1]
    );
    if (heroItem === "Ѡ" || heroItem === "x") {
      this.isBusy = false;
      return false;
    }
    // if (this.standsTooLong(this.currentPosition, this.prePreviousPosition)) {
    //   this.order = [{value : ['stop', ''], next : null}];
    //   this.isBusy = false;
    // }
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

  standsTooLong(currentPosition, prePreviousPosition) {
    if (prePreviousPosition === undefined){
      return false;
    }
    if (
      currentPosition[0] === prePreviousPosition[0] &&
      currentPosition[0] === prePreviousPosition[0]
    ) {
      return true;
    }
    return false;
  }
}
