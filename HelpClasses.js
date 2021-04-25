// simple logger to display logs in log-panel
class L {
  static l(log) {
    document.getElementById("log-panel").value += "\n" + log;
  }
}


// activates keabord control for testing
class KeyboardController {
  constructor() {
    this.keyboardCommand = new Queue();

    this.setKeyboardListener();
  }

  releaseCommand() {
    return this.keyboardCommand.dequeue();
  }

  setKeyboardListener() {
    let command = "";
    const keyyy = document.addEventListener("keydown", (event) => {
      switch (event.code) {
        case "KeyW":
          command = "up";
          break;
        case "KeyS":
          command = "down";
          break;
        case "KeyA":
          command = "left";
          break;
        case "KeyD":
          command = "right";
          break;
        case "KeyQ":
          command = "act,left";
          break;
        case "KeyE":
          command = "act,right";
          break;
        case "KeyR":
          command = "stop";
          break;
        case "KeyF":
          command = "act(0)";
          break;
        case "KeyX":
          this.keyboardCommand = new Queue();
          command = "";
          return;

        default:
          break;
      }
      this.keyboardCommand.enqueue(command);
      return;
    });
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  get size() {
    return this.length;
  }

  enqueue(element) {
    if (this.length === 0) {
      this.tail = new QueueNode(element);
      this.head = this.tail;
    } else {
      this.tail.next = new QueueNode(element);
      this.tail = this.tail.next;
    }
    this.length++;
  }

  dequeue() {
    if (this.head === null) {
      return undefined;
    }
    const dequeuedItem = this.head.value;
    if (this.tail === this.head) {
      this.tail = null;
    }
    this.head = this.head.next;
    this.length--;
    return dequeuedItem;
  }
}

function duplicateQueue(origQueue) {
  const newQueue = new Queue();
  let item = origQueue.head;
  while (item !== null) {
    newQueue.enqueue(item.value);
    item = item.next;
  }
  return newQueue;
}

function QueueNode(x) {
  this.value = x;
  this.next = null;
}

class Observer {
  constructor() {
    this.counter = 0;
    this.startObserving();
    this.clearAllLogsButtonListener();
  }

  // const clearLogBtnOn = clearLogButtonListener();

  startObserving() {
    this.counter = 0;
    document.getElementById("log-panel").value = "";
    document.getElementById("text").value = "Reload!" + "\n";
    document.getElementById("help-panel").value = "Initializing...";
  }

  nextStep() {
    if (this.counter >= 80) {
      this.startObserving();
    }
    this.counter++;
    document.getElementById("help-panel").value = this.counter;
    L.l(`\n---------------------------------------------- ${this.counter}`);
  }

  clearAllLogsButtonListener() {
    document.getElementById("btn_clear_log").addEventListener("click", () => {
      this.startObserving();
    });
  }
}


// Not this time...
// class PathsTree {
//   constructor(myHeroPosition) {
//     this.from = null;
//     this.value = ["stop", myHeroPosition];
//     this.left = null;
//     this.right = null;
//     this.down = null;
//     this.up = null;
//   }

//   // get size() {
//   //   return this.length;
//   // }
//   // this.right.addDirection

//   addDirection(position, direction) {
//     this.left = new PathNode([direction, position], )
//   }

//   // enqueue(element) {
//   //   {
//   //     this.tail.next = new QueueNode(element);
//   //     this.tail = this.tail.next;
//   //   }
//   //   this.length++;
//   // }

// }

// function PathNode(x, previous) {
//   this.value = x;
//   this.from = previous;
//   this.left = null;
//   this.right = null;
//   this.down = null;
//   this.up = null;
// }
