const main = () => {
  // generate a flat array (render.js)
  grid = generateRandomArray();
  // render it to the view (render.js)
  generateGrid(grid);

  // start the listener (gamePlay.js)
  eventListener();
};
