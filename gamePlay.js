const eventListener = () => {
  globalGridItems = gridContainer.querySelectorAll(".grid-item");

  globalGridItems.forEach((item) => {
    item.addEventListener("click", function (event) {
      move(event, item);
    });
  });
};

const move = (event, item) => {
  let zeroPosition = grid.indexOf(0);
  let origin = parseInt(event.target.dataset.id);
  if (origin !== zeroPosition && getUserInput) {
    let status = moveable(origin, zeroPosition);

    if (status !== null) {
      let itemToSwap = gridContainer.querySelector(
        `#grid-item[data-id="${zeroPosition}"]`
      );

      getUserInput = false;
      cursorAnimation("wait");
      moveTheIndex(origin, item, itemToSwap, zeroPosition);
      tileAnimation(status, item, itemToSwap);

      let won = win();
      if (!won) {
        setTimeout(function () {
          getUserInput = true;
          cursorAnimation("pointer");
        }, 600);
      } else {
        getUserInput = true;
        cursorAnimation("pointer");
        winAnimation();
      }
    } else {
      cursorAnimation("not-allowed");
      setTimeout(function () {
        cursorAnimation("pointer");
      }, 100);
    }
  }
};

const moveable = (id, zeroPosition) => {
  let tileRow = Math.floor(id / rowLength);
  let zeroRow = Math.floor(zeroPosition / rowLength);

  if (id + rowLength === zeroPosition) {
    return 1;
  } else if (tileRow === zeroRow && id + 1 === zeroPosition) {
    return 2;
  } else if (id - rowLength === zeroPosition) {
    return 3;
  } else if (tileRow === zeroRow && id - 1 === zeroPosition) {
    return 4;
  } else {
    return null;
  }
};

const moveTheIndex = (origin, item, itemToSwap, zeroPosition) => {
  grid[zeroPosition] = grid[origin];
  grid[origin] = 0;
  item.dataset.id = origin;
  itemToSwap.dataset.id = zeroPosition;
};

const win = () => {
  return grid.every((value, index) => value === solvedGrid[index]);
};
