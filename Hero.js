class Hero {
  constructor() {
    this.order = [];
    this.onMission = false;
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
    if (this.onMission) return;
    this.order = order;
    this.onMission = true;
  }

  isNotDead(board) {
    const heroPosition = board.myHeroPosition;
    const heroItem = board.getBoardItemInPosition(
      heroPosition[0],
      heroPosition[1]
    );
    if (heroItem === "Ѡ" || heroItem === "x") {
      return false;
    }
    return true;
  }

  executeOrder() {
    if (this.order.length === 1) {
      this.onMission = false;
      return this.order.dequeue()[0];
    } else {
      return this.order.dequeue()[0];
    }
  }
}

// canMoveLeft isOnXYCell()
// canMoveRight
// canMoveUp
// canMoveDown
// falling

// 4
// 3
// 2
// 1
// ☼
// *
// $
// @
// &
// H
// ~
