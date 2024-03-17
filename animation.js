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

const winAnimation = (status, item, itemToSwap) => {
  setTimeout(() => {
    gridContainer.style.display = "none";
    winPage.style.display = "flex";
  }, 600);
};

const restartAnimation = (status, item, itemToSwap) => {
  gridContainer.style.display = "grid";
  winPage.style.display = "none";
};
