class Routes {
  constructor(board) {
    this.board = board;
    this.myHeroPosition = board.myHeroPosition;
  }

  getPath() {
    const paths = [];
    let gotPlan = false;
    const myHeroPosition = this.myHeroPosition;
    const bestPaths = [];
    const board = this.board;
    paths[0] = new Queue();
    paths[0].enqueue(["stop", myHeroPosition]);
    const visitedCells = [myHeroPosition];

    while (!gotPlan) {
      paths.forEach((directionsQueue, index) => {
        let currentPlaceHero = directionsQueue.tail.value[1];
        let gotDirection = false;
        const currentPlaceY = currentPlaceHero[0];
        const currentPlaceX = currentPlaceHero[1];
        // const goldString = board.boardSymbols.get("goldSymbolsSet");
        const goldString = "$&@";
        const currentPositionItem = board.getBoardItemInPosition(
          currentPlaceY,
          currentPlaceX
        );

        if (directionsQueue.tail.value[2] !== undefined) {
          if (directionsQueue.tail.value[2] === 1) {
            L.l("++++++++++++++++++++++++++++");
            if (directionsQueue.tail.value[0] === "act,left") {
              directionsQueue.enqueue([
                "left",
                directionsQueue.tail.value[1],
                2,
              ]);
            }
            if (directionsQueue.tail.value[0] === "act,left") {
              directionsQueue.enqueue([
                "right",
                directionsQueue.tail.value[1],
                2,
              ]);
            }
            gotDirection = true;
            return;
          }

          if (directionsQueue.tail.value[2] === 2) {
            directionsQueue.enqueue(["down", directionsQueue.tail.value[1]], 3);
            gotDirection = true;
            return;
          }

          if (directionsQueue.tail.value[2] === 3) {
            directionsQueue.enqueue(["down", directionsQueue.tail.value[1]]);
            gotDirection = true;
            return;
          }
        }

        if (goldString.indexOf(currentPositionItem) !== -1) {
          bestPaths.push([directionsQueue, currentPositionItem]);
          gotPlan = true;
          return;
        }

        if (isFalling(currentPlaceHero, board)) {
          const nextPosition = [currentPlaceY - 1, currentPlaceX];
          directionsQueue.enqueue(["down", nextPosition]);
          gotDirection = true;
          return;
        }

        if (canGoLeft(currentPlaceHero, board)) {
          const nextPosition = [currentPlaceY, currentPlaceX - 1];
          if (!includesThisArr(visitedCells, nextPosition)) {
            visitedCells.push(nextPosition);
            directionsQueue.enqueue(["left", nextPosition]);
            gotDirection = true;
          }
        }

        if (canGoRight(currentPlaceHero, board)) {
          const nextPosition = [currentPlaceY, currentPlaceX + 1];
          if (!includesThisArr(visitedCells, nextPosition)) {
            visitedCells.push(nextPosition);
            if (gotDirection) {
              const newPath = duplicateQueue(directionsQueue);
              newPath.tail.value = ["right", nextPosition];
              paths.push(newPath);
            } else {
              directionsQueue.enqueue(["right", nextPosition]);
              gotDirection = true;
            }
          }
        }

        if (canGoDown(currentPlaceHero, board)) {
          const nextPosition = [currentPlaceY - 1, currentPlaceX];
          if (!includesThisArr(visitedCells, nextPosition)) {
            visitedCells.push(nextPosition);
            if (gotDirection) {
              const newPath = duplicateQueue(directionsQueue);
              newPath.tail.value = ["down", nextPosition];
              paths.push(newPath);
            } else {
              directionsQueue.enqueue(["down", nextPosition]);
              gotDirection = true;
            }
          }
        }

        if (canGoUp(currentPlaceHero, board)) {
          const nextPosition = [currentPlaceY + 1, currentPlaceX];
          if (!includesThisArr(visitedCells, nextPosition)) {
            visitedCells.push(nextPosition);
            if (gotDirection) {
              const newPath = duplicateQueue(directionsQueue);
              newPath.tail.value = ["up", nextPosition];
              paths.push(newPath);
            } else {
              directionsQueue.enqueue(["up", nextPosition]);
              gotDirection = true;
            }
          }
        }

        if (canDrillLeft(currentPlaceHero, board)) {
          const nextPosition = [currentPlaceY - 2, currentPlaceX - 1];
          if (!includesThisArr(visitedCells, nextPosition)) {
            visitedCells.push(nextPosition);
            if (gotDirection) {
              const newPath = duplicateQueue(directionsQueue);
              newPath.tail.value = ["act,left", nextPosition];
              paths.push(newPath);
            } else {
              directionsQueue.enqueue(["act,left", nextPosition, 1]);
              gotDirection = true;
            }
          }
        }

        if (canDrillRight(currentPlaceHero, board)) {
          const nextPosition = [currentPlaceY - 2, currentPlaceX + 1];
          if (!includesThisArr(visitedCells, nextPosition)) {
            visitedCells.push(nextPosition);
            if (gotDirection) {
              const newPath = duplicateQueue(directionsQueue);
              newPath.tail.value = ["act,right", nextPosition];
              paths.push(newPath);
            } else {
              directionsQueue.enqueue(["act,right", nextPosition, 1]);
              gotDirection = true;
            }
          }
        }

        if (!gotDirection) {
          paths.splice(index, 1);
        }
      });
    }
    return getTheBestPath(bestPaths);
    // if (bestPaths.length > 1) {}
  }
}

function includesThisArr(container, item) {
  let containerLength = container.length;
  for (let i = 0; i < containerLength; i++) {
    if (container[i][0] === item[0] && container[i][1] === item[1]) {
      return true;
    }
  }
  return false;
}

function getTheBestPath(bestPaths) {
  // let theBestPath = bestPaths[0];
  // bestPaths[0]
  // bestPaths.forEach((item) => item[0])
  bestPaths[0][0].head = bestPaths[0][0].head.next;
  bestPaths[0][0].length--;
  return bestPaths[0][0];
}

// ('@') +5 RED_GOLD
// ('$') +3 YELLOW_GOLD
// ('&') +1 GREEN_GOLD

function isFalling(currentPlaceHero, board) {
  const Y = currentPlaceHero[0];
  const X = currentPlaceHero[1];
  if (
    (board.getMapItemInPosition(Y - 1, X) == " " ||
      board.getMapItemInPosition(Y - 1, X) == "~") &&
    board.getMapItemInPosition(Y, X) === " "
  ) {
    return true;
  }
  return false;
}

function canGoLeft(currentPlaceHero, board) {
  const Y = currentPlaceHero[0];
  const X = currentPlaceHero[1];
  if (
    board.getMapItemInPosition(Y, X - 1) == " " ||
    board.getMapItemInPosition(Y, X - 1) == "H" ||
    board.getMapItemInPosition(Y, X - 1) == "~"
  ) {
    return true;
  }
}

function canGoRight(currentPlaceHero, board) {
  const Y = currentPlaceHero[0];
  const X = currentPlaceHero[1];
  if (
    board.getMapItemInPosition(Y, X + 1) == " " ||
    board.getMapItemInPosition(Y, X + 1) == "H" ||
    board.getMapItemInPosition(Y, X + 1) == "~"
  ) {
    return true;
  }
}

function canGoDown(currentPlaceHero, board) {
  const Y = currentPlaceHero[0];
  const X = currentPlaceHero[1];
  if (
    board.getMapItemInPosition(Y - 1, X) == "H" ||
    board.getMapItemInPosition(Y - 1, X) == " " ||
    board.getMapItemInPosition(Y - 1, X) == "~"
  ) {
    return true;
  }
}

function canGoUp(currentPlaceHero, board) {
  const Y = currentPlaceHero[0];
  const X = currentPlaceHero[1];
  if (
    board.getMapItemInPosition(Y, X) == "H" &&
    (board.getMapItemInPosition(Y + 1, X) == "H" ||
      board.getMapItemInPosition(Y + 1, X) == " " ||
      board.getMapItemInPosition(Y + 1, X) == "~")
  ) {
    return true;
  }
}

function canDrillLeft(currentPlaceHero, board) {
  const Y = currentPlaceHero[0];
  const X = currentPlaceHero[1];
  if (
    board.getMapItemInPosition(Y, X - 1) == " " &&
    board.getMapItemInPosition(Y - 1, X - 1) == "#" &&
    (board.getMapItemInPosition(Y - 2, X - 1) == " " ||
      board.getMapItemInPosition(Y - 2, X - 1) == "H" ||
      board.getMapItemInPosition(Y - 2, X - 1) == "~")
  ) {
    return true;
  }
}

function canDrillRight(currentPlaceHero, board) {
  const Y = currentPlaceHero[0];
  const X = currentPlaceHero[1];
  if (
    board.getMapItemInPosition(Y, X + 1) == " " &&
    board.getMapItemInPosition(Y - 1, X + 1) == "#" &&
    (board.getMapItemInPosition(Y - 2, X + 1) == " " ||
      board.getMapItemInPosition(Y - 2, X + 1) == "H" ||
      board.getMapItemInPosition(Y - 2, X + 1) == "~")
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
