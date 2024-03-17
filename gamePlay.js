const eventListener = () => {
  let gridItems = gridContainer.querySelectorAll("#grid-item");

  gridItems.forEach((item) => {
    if (item.className !== "grid-item-empty") {
      item.addEventListener("click", function (event) {
        move(event, item);
      });
    }
  });
};

const move = (event, item) => {
  let zeroPosition = grid.indexOf(0);
  if (parseInt(event.target.dataset.id) !== zeroPosition && getUserInput) {
    let origin = parseInt(event.target.dataset.id);
    let status = moveable(origin, zeroPosition);

    if (status !== null) {
      let itemToSwap = gridContainer.querySelector(
        `#grid-item[data-id="${zeroPosition}"]`
      );

      getUserInput = false;
      moveTheIndex(event, item, itemToSwap, zeroPosition);
      tileAnimation(status, item, itemToSwap);

      let won = win();
      if (!won) {
        setTimeout(function () {
          getUserInput = true;
        }, 600);
      } else {
        winAnimation();
      }
    } else {
      console.log("not able to move it");
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

const moveTheIndex = (event, item, itemToSwap, zeroPosition) => {
  let origin = parseInt(event.target.dataset.id);
  grid[zeroPosition] = grid[origin];
  grid[origin] = 0;
  item.dataset.id = origin;
  itemToSwap.dataset.id = zeroPosition;
};

const win = () => {
  return grid.every((value, index) => value === solvedGrid[index]);
};
