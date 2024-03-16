// global variables
let rowLength = 4;
let getUserInput = true;
let grid;
let solvedGrid;
let gridContainer = document.querySelector(".grid");

/*  UTILITY  */

// in this solution we will make a correct array and then shuffle it
const generateRandomArraySolutionOne = () => {
  //* create a base array
  let history = [];
  let gridArray = [];
  for (let i = 0; i < rowLength ** 2; i++) {
    gridArray[i] = i + 1;
  }

  gridArray[gridArray.length - 1] = 0;
  solvedGrid = [...gridArray];
  //* shuffle it
  for (let i = 0; i < 100; i++) {
    let zeroPosition = gridArray.indexOf(0);
    let possibleMoves = getValidMoves(gridArray, zeroPosition);

    //* randomly chose one
    let number = possibleMoves[parseInt(Math.random() * possibleMoves.length)];
    gridArray[zeroPosition] = gridArray[number];
    gridArray[number] = 0;
    history.push([zeroPosition, number]);
  }

  let zeroPosition = gridArray.indexOf(0);
  //* bring the 0 to the end
  while (zeroPosition !== rowLength ** 2 - 1) {
    if (zeroPosition + rowLength <= rowLength ** 2 - 1) {
      history.push([zeroPosition, zeroPosition + rowLength]);
      gridArray[zeroPosition] = gridArray[zeroPosition + rowLength];
      gridArray[zeroPosition + rowLength] = 0;
      zeroPosition = zeroPosition + rowLength;
    }
    if (zeroPosition + 1 <= rowLength ** 2 - 1) {
      history.push([zeroPosition, zeroPosition + 1]);
      gridArray[zeroPosition] = gridArray[zeroPosition + 1];
      gridArray[zeroPosition + 1] = 0;
      zeroPosition = zeroPosition + 1;
    }
  }

  return { gridArray, history };
};

const getValidMoves = (gridArray, zeroPosition) => {
  let possibleMoves = [];
  gridArray.map((number, index) => {
    if (number !== 0) {
      if (
        index + rowLength === zeroPosition ||
        index + 1 === zeroPosition ||
        index - rowLength === zeroPosition ||
        index - 1 === zeroPosition
      ) {
        possibleMoves.push(index);
      }
    }
  });

  return possibleMoves;
};

const isSolvable = (gridArray) => {
  let zeroPosition = gridArray.indexOf(0);
  let inversions = 0;
  const zeroRow = Math.floor(zeroPosition / rowLength);

  // Count inversions
  for (let i = 0; i < gridArray.length - 1; i++) {
    const currentTile = gridArray[i];
    // 0 does't matter
    if (currentTile === 0) continue;

    for (let j = i + 1; j < gridArray.length; j++) {
      const comparedTile = gridArray[j];
      if (comparedTile !== 0 && currentTile > comparedTile) {
        inversions++;
      }
    }
  }

  // if rowLength is even
  if (rowLength % 2 === 0) {
    // and inversion is even too
    return inversions % 2 === 0;
  } else {
    // if rowLength is odd
    // and inversion + zeroRow is not even ( it odd )
    return (inversions + zeroRow) % 2 === 1;
  }
};

const generateGrid = (gridArray) => {
  gridContainer.innerHTML = "";

  function createGridItem(content, index) {
    const item = document.createElement("div");
    item.classList.add("grid-item");
    item.textContent = content;
    item.dataset.id = index;
    return item;
  }

  for (let i = 0; i < gridArray.length; i++) {
    gridContainer.appendChild(createGridItem(` ${gridArray[i]}`, i));
  }
};

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

const animation = (status, item, itemToSwap) => {
  switch (status) {
    case 1:
      item.classList.add("goToTop");
      itemToSwap.classList.add("goToBottom");
      break;
    case 2:
      item.classList.add("goToRight");
      itemToSwap.classList.add("goToLeft");
      break;
    case 3:
      item.classList.add("goToBottom");
      itemToSwap.classList.add("goToTop");
      break;
    case 4:
      item.classList.add("goToLeft");
      itemToSwap.classList.add("goToRight");
      break;

    default:
      break;
  }

  setTimeout(function () {
    generateGrid(grid);
    eventListener();
    let won = win();
    if (!won) {
      getUserInput = true;
    }
  }, 550);
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

const win = () => {
  return grid.every((value, index) => value === solvedGrid[index]);
};

/* MAIN */

const main = () => {
  gridContainer.style.gridTemplateColumns = `repeat(${rowLength}, 1fr)`;

  let game = generateRandomArraySolutionOne();

  let valid = isSolvable(game.gridArray);

  while (!valid) {
    game = generateRandomArraySolutionOne();
    valid = isSolvable(game.gridArray);
  }
  grid = game.gridArray;
  generateGrid(game.gridArray);
  eventListener();
};

main();
