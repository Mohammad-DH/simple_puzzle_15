function generateRandomArray() {
  const gridArray = [];
  const totalTiles = rowLength ** 2;

  // Fill with numbers
  for (let i = 1; i < totalTiles; i++) {
    gridArray.push(i);
  }
  solvedGrid = [...gridArray, 0];

  console.log("solvedGrid", solvedGrid);

  while (true) {
    // Shuffle the array
    shuffleArray(gridArray);

    let Solvable = isSolvable(gridArray, totalTiles);
    console.log(Solvable);
    if (Solvable) {
      break;
    }
  }
  gridArray.push(0);
  console.log(gridArray);

  return { gridArray };
}

function shuffleArray(gridArray) {
  for (let i = gridArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [gridArray[i], gridArray[j]] = [gridArray[j], gridArray[i]];
  }
}

const getValidMoves = (gridArray, zeroPosition) => {
  let possibleMoves = [];
  gridArray.map((number, index) => {
    if (number !== 0) {
      let tileRow = Math.floor(index / rowLength);
      let zeroRow = Math.floor(zeroPosition / rowLength);
      if (
        index + rowLength === zeroPosition ||
        (tileRow === zeroRow && index + 1 === zeroPosition) ||
        index - rowLength === zeroPosition ||
        (tileRow === zeroRow && index - 1 === zeroPosition)
      ) {
        possibleMoves.push(index);
      }
    }
  });

  return possibleMoves;
};

const isSolvable = (gridArray, totalTiles) => {
  let inversions = 0;

  // Calculate inversions ex: 1 ,2 , 9 , 4 , 5 ==> inversion of 9 is 2
  for (let i = 0; i < totalTiles - 1; i++) {
    for (let j = i + 1; j < totalTiles; j++) {
      if (gridArray[j] !== 0 && gridArray[i] > gridArray[j]) {
        inversions++;
      }
    }
  }

  // Check solvability
  // if totalTiles is odd and inversions is odd too
  // if totalTiles is even and inversions is even too
  const isSolvable =
    (totalTiles % 2 === 1 && inversions % 2 === 1) ||
    (totalTiles % 2 === 0 && inversions % 2 === 0);

  return isSolvable;
};

const generateGrid = (gridArray) => {
  gridContainer.innerHTML = "";

  function createGridItem(content, index) {
    const item = document.createElement("div");
    item.id = "grid-item";
    item.classList.add(content !== "0" ? "grid-item" : "grid-item-empty");
    item.textContent = content !== "0" ? content : "";
    item.dataset.id = index;
    return item;
  }

  for (let i = 0; i < gridArray.length; i++) {
    gridContainer.appendChild(createGridItem(`${gridArray[i]}`, i));
  }
};
