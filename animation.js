const tileAnimation = (status, item, zeroPosition) => {
  // find the zero tile
  let itemToSwap = gridContainer.querySelector(
    `#grid-item[data-id="${zeroPosition}"]`
  );

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

  // rerender the grid
  // inspired from 2d game engines
  // probably you can prevent rerender if you keep the data-id sync
  // this is NOT a hot fix , it's a design choice
  setTimeout(function () {
    generateGrid(grid);
    eventListener();
  }, 600);
};

const winAnimation = () => {
  setTimeout(() => {
    gridContainer.style.display = "none";
    winPage.style.display = "flex";
  }, 600);
};

const restartAnimation = () => {
  gridContainer.style.display = "grid";
  winPage.style.display = "none";
};

const cursorAnimation = (cursor) => {
  root.style.setProperty("--cursor", cursor);
};

const playButtonAnimation = () => {
  panelContent1.style.display = "none";
  setTimeout(() => {
    panelContent2.style.display = "flex";
  }, 200);
};

const startButtonAnimation = async (tileSize, rowLength) => {
  // set grid style base on user input
  panelContent2.style.display = "none";
  startPage.style.display = "none";
  root.style.setProperty("--grid-size", tileSize);
  gridContainer.style.gridTemplateColumns = `repeat(${rowLength}, 1fr)`;
  gridContainer.style.display = "grid";
};
