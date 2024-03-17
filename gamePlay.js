const eventListener = () => {
  // update the grid items list
  globalGridItems = gridContainer.querySelectorAll(".grid-item");

  // loop over it and add the click listener
  globalGridItems.forEach((item) => {
    item.addEventListener("click", function (event) {
      move(event, item);
    });
  });
};

const move = (event, item) => {
  let zeroPosition = grid.indexOf(0);
  // index of selected tile
  let origin = parseInt(event.target.dataset.id);
  // getUserInput false means animation is playing
  if (origin !== zeroPosition && getUserInput) {
    // check the moveability of selected tile
    // status will tale which animation to play
    let status = moveable(origin, zeroPosition);

    if (status !== null) {
      // prevent user input
      getUserInput = false;
      cursorAnimation("wait");
      // swap items in array
      moveTheIndex(origin, zeroPosition);
      // play swap animation
      tileAnimation(status, item, zeroPosition);

      // check if won
      let won = win();
      if (!won) {
        // give time to animation to end
        setTimeout(function () {
          getUserInput = true;
          cursorAnimation("pointer");
        }, 600);
      } else {
        // game ended , make the app ready for next game
        getUserInput = true;
        cursorAnimation("pointer");
        // show win page
        winAnimation();
      }
    } else {
      // wrong tile , give small feedback to user
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
    // above the empty tile
    return 1;
  } else if (tileRow === zeroRow && id + 1 === zeroPosition) {
    // in the same row left side of empty tile
    return 2;
  } else if (id - rowLength === zeroPosition) {
    // blow the empty tile
    return 3;
  } else if (tileRow === zeroRow && id - 1 === zeroPosition) {
    // in the same row right side of empty tile
    return 4;
  } else {
    return null;
  }
};

const moveTheIndex = (origin, zeroPosition) => {
  grid[zeroPosition] = grid[origin];
  grid[origin] = 0;
};

const win = () => {
  // compare the grid to solvedGrid
  return grid.every((value, index) => value === solvedGrid[index]);
};
