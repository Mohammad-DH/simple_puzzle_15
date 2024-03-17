function generateRandomArray() {
  const gridArray = [];
  const totalTiles = rowLength * columnLength;

  // fill with numbers
  for (let i = 1; i < totalTiles; i++) {
    gridArray.push(i);
  }
  // save it as the solution , win (gameplay.js) works with this
  solvedGrid = [...gridArray, 0];

  while (true) {
    // Shuffle the array
    shuffleArray(gridArray);

    let Solvable = isSolvable(gridArray, totalTiles);
    if (Solvable) {
      break;
    }
  }
  // add zero as the empty tile , it will not effect on inversions
  gridArray.push(0);

  return gridArray;
}

function shuffleArray(gridArray) {
  // randomly swap two item
  for (let i = gridArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [gridArray[i], gridArray[j]] = [gridArray[j], gridArray[i]];
  }
}

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
  // empty the innerHTML
  gridContainer.innerHTML = "";

  function createGridItem(content, index) {
    // create and div element -> add id -> add class -> make and span with content -> append it to the div -> add data-id
    const item = document.createElement("div");
    item.id = "grid-item";
    item.classList.add(content !== "0" ? "grid-item" : "grid-item-empty");
    const span = document.createElement("span");
    span.textContent = content !== "0" ? content : "";
    item.appendChild(span);
    item.dataset.id = index; // it will be used for move click event (gameplay.js)
    return item;
  }

  // add them to the div with class of .grid
  for (let i = 0; i < gridArray.length; i++) {
    gridContainer.appendChild(createGridItem(`${gridArray[i]}`, i));
  }
};
