const eventListener = () => {
  let gridItems = gridContainer.querySelectorAll(".grid-item");

  gridItems.forEach((item) => {
    item.addEventListener("click", function (event) {
      move(event, item);
    });
  });
};

const moveable = (id, zeroPos) => {
  if (id + rowLength === zeroPos) {
    return { destination: id + rowLength, status: 1 };
  } else if (id + 1 === zeroPos) {
    return { destination: id + 1, status: 2 };
  } else if (id - rowLength === zeroPos) {
    return { destination: id - rowLength, status: 3 };
  } else if (id - 1 === zeroPos) {
    return { destination: id - 1, status: 4 };
  } else {
    return null;
  }
};

const moveTheIndex = (event, destination, item, itemToSwap, zeroPosition) => {
  let origin = parseInt(event.target.dataset.id);
  console.log("destination : ", destination, "/ origin : ", origin);
  grid[destination] = grid[origin];
  grid[origin] = 0;

  item.dataset.id = destination;
  itemToSwap.dataset.id = zeroPosition;
};
const move = (event, item) => {
  let zeroPosition = grid.indexOf(0);
  if (parseInt(event.target.dataset.id) !== zeroPosition && getUserInput) {
    let origin = parseInt(event.target.dataset.id);
    let { destination, status } = moveable(origin, zeroPosition);

    if (destination !== null) {
      let itemToSwap = gridContainer.querySelector(
        `.grid-item[data-id="${destination}"]`
      );

      getUserInput = false;
      moveTheIndex(event, destination, item, itemToSwap, zeroPosition);
      animation(status, item, itemToSwap);
    } else {
      console.log("not able to move it");
    }
  }
};
