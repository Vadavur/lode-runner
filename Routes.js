class Routes {
  constructor(board) {
    this.board = new GameBoard();

    this.gotPlan = false;
    this.visitedCells = [];
    this.myHeroPosition = board.myHeroPosition;
  }

  getPath() {
    const paths = [];
    const myHeroPosition = this.myHeroPosition;

    paths[0] = new Queue();
    paths[0].enqueue(["stop", myHeroPosition]);
    while (!gotPlan) {
      paths.forEach((pathQueue, index) => {
        let currentPlaceHero = pathQueue.tail[1];
        let gotDirection = false;
        let currentPlaceY = currentPlaceHero[0];
        let currentPlaceX = currentPlaceHero[1];

        if (currentPlaceHero.isFalling(this.board)) {
          pathQueue.enqueue(["down", [currentPlaceY - 1, currentPlaceX]]);
          return;
        }

        if (currentPlaceHero.canGoLeft(this.board)) {
          pathQueue.enqueue(["left", [currentPlaceY, currentPlaceX - 1]]);
          gotDirection = true;
        }

        if (currentPlaceHero.canGoRight(this.board)) {
          if (gotDirection) {
            const newPath = new Queue();
            paths.push(new Queue)
          } else {
            pathQueue.enqueue(["right", [currentPlaceY, currentPlaceX + 1]]);
            gotDirection = true;
          }
        }

        if (currentPlaceHero.canGoDown(this.board)) {
          pathQueue.enqueue(["down", [currentPlaceY - 1, currentPlaceX]]);
          gotDirection = true;
        }

        if (currentPlaceHero.canGoUp(this.board)) {
          pathQueue.enqueue(["up", [currentPlaceY + 1, currentPlaceX]]);
        }
      });
    }
  }

  // class Queue {
  //   constructor() {
  //     this.head = null;
  //     this.tail = null;
  //     this.length = 0;
  //   }

  //   get size() {
  //     return this.length;
  //   }

  //   enqueue(element) {
  //     if (this.length === 0) {
  //       this.tail = new ListNode(element);
  //       this.head = this.tail;
  //     } else {
  //       this.tail.next = new ListNode(element);
  //       this.tail = this.tail.next;
  //     }
  //     this.length++;
  //   }

  //   dequeue() {
  //     if (this.head === null) {
  //       return undefined;
  //     }
  //     const dequeuedItem = this.head.value;
  //     if (this.tail === this.head) {
  //       this.tail = null;
  //     }
  //     this.head = this.head.next;
  //     this.length--;
  //     return dequeuedItem;
  //   }
  // }
  // function ListNode(x) {
  //   this.value = x;
  //   this.next = null;
  // }
}

function isFalling(board) {
  const Y = this[0];
  const X = this[1];
  if (
    board.getMapItemInPosition(Y - 1, X) == " " &&
    board.getMapItemInPosition(Y, X) !== " "
  ) {
    return true;
  }
}

function canGoLeft(board) {
  const Y = this[0];
  const X = this[1];
  if (
    board.getMapItemInPosition(Y, X - 1) == " " ||
    board.getMapItemInPosition(Y, X - 1) == "H" ||
    board.getMapItemInPosition(Y, X - 1) == "~"
  ) {
    return true;
  }
}

function canGoRight(board) {
  const Y = this[0];
  const X = this[1];
  if (
    board.getMapItemInPosition(Y, X + 1) == " " ||
    board.getMapItemInPosition(Y, X + 1) == "H" ||
    board.getMapItemInPosition(Y, X + 1) == "~"
  ) {
    return true;
  }
}

function canGoDown(board) {
  const Y = this[0];
  const X = this[1];
  if (
    board.getMapItemInPosition(Y - 1, X) == "H" ||
    board.getMapItemInPosition(Y - 1, X) == " " ||
    board.getMapItemInPosition(Y - 1, X) == "~"
  ) {
    return true;
  }
}

function canGoUp(board) {
  const Y = this[0];
  const X = this[1];
  if (
    board.getMapItemInPosition(Y, X) == "H" &&
    (board.getMapItemInPosition(Y + 1, X) == "H" ||
      board.getMapItemInPosition(Y + 1, X) == " " ||
      board.getMapItemInPosition(Y + 1, X) == "~")
  ) {
    return true;
  }
}

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

// ('$') YELLOW_GOLD +3
// ('@') RED_GOLD +5
// ('&') GREEN_GOLD +1
