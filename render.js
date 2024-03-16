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
  for (let i = 0; i < shuffleCount; i++) {
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
