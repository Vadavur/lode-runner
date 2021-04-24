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
  
  missionCompleted() {
    this.onMission = false;
    return "stop";
  }

  executeOrders() {
    return this.order.pop() || this.missionCompleted();
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