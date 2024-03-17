playButton.addEventListener("click", () => {
  playButtonAnimation();
});

startButton.addEventListener("click", () => {
  cursorAnimation("pointer");

  rowLength = rowInput.valueAsNumber ? rowInput.valueAsNumber : 4;
  columnLength = columnInput.valueAsNumber ? columnInput.valueAsNumber : 4;

  tileSize = tileSizeInput.valueAsNumber
    ? `${tileSizeInput.valueAsNumber}px`
    : calculateTileSize();

  shuffleCount = shuffleInput.valueAsNumber ? shuffleInput.valueAsNumber : 100;

  startButtonAnimation(tileSize, rowLength);
  main();
});

restartButton.addEventListener("click", function (event) {
  main();
  restartAnimation();
});

const calculateTileSize = () => {
  if (window.innerWidth < 800) {
    return `${Math.floor(window.innerWidth / rowLength) * 0.9}px`;
  } else if (window.innerWidth < 1400) {
    return `${Math.floor((window.innerWidth / rowLength) * 0.6)}px`;
  } else {
    return `${Math.floor((window.innerWidth / rowLength) * 0.4)}px`;
  }
};
