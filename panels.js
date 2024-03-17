playButton.addEventListener("click", () => {
  // change the panel to the next one
  playButtonAnimation();
});

startButton.addEventListener("click", () => {
  // change the cursor to pointer , this is a hot fix , for some reason css --cursor not working
  cursorAnimation("pointer");

  // get row and column
  rowLength = rowInput.valueAsNumber ? rowInput.valueAsNumber : 4;
  columnLength = columnInput.valueAsNumber ? columnInput.valueAsNumber : 4;

  // get tileSize or calculate it base on windows width
  tileSize = tileSizeInput.valueAsNumber
    ? `${tileSizeInput.valueAsNumber}px`
    : calculateTileSize();

  // hide the panel and show the game panel
  startButtonAnimation(tileSize, rowLength);

  // start the generation
  main();
});

restartButton.addEventListener("click", function (event) {
  // generate the game
  main();
  // hide win panel
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
