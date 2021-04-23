class Hero {
  constructor() {
    this.orders = [];
    this.onMission = false;
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

  getOrders(orders) {
    if (this.onMission) return;
    this.orders = orders;
    this.onMission = true;    
  }
  
  missionCompleted() {
    this.onMission = false;
    return "stop";
  }

  executeOrders() {
    return this.orders.pop() || this.missionCompleted();
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