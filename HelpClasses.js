// simple logger to display logs in log-panel
class L {
  static l(log) {
    document.getElementById("log-panel").value += "\n" + log;
  }
}

// activates btn to clear logs
function clearLogButtonListener() {
  document.getElementById("btn_clear_log").addEventListener("click", () => {
    document.getElementById("log-panel").value = "";
  });
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
          command = ""
          return;

        default:
          break;
      }
      L.l(command);
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
      this.tail = new ListNode(element);
      this.head = this.tail;
    } else {
      this.tail.next = new ListNode(element);
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

function ListNode(x) {
  this.value = x;
  this.next = null;
}