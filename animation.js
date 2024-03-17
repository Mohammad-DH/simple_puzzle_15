const tileAnimation = (status, item, itemToSwap) => {
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
  panelContent2.style.display = "none";
  startPage.style.display = "none";
  root.style.setProperty("--grid-size", tileSize);
  gridContainer.style.gridTemplateColumns = `repeat(${rowLength}, 1fr)`;
  gridContainer.style.display = "grid";
};
