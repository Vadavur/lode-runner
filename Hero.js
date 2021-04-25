class Hero {
  constructor() {
    this.order = [];
    this.isBusy = false;
    this.heroPreviousPosition = [];
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

  isStanding(board) {
    const heroPosition = board.myHeroPosition;
    if (this.heroPreviousPosition[0] === undefined) {
      this.heroPreviousPosition.push([heroPosition[0], heroPosition[1]]);
      return false;
    }

    if (
      this.heroPreviousPosition[0] === heroPosition[0] &&
      this.heroPreviousPosition[1] === heroPosition[1]
    ) {
      return true;
    }
    return false;
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
