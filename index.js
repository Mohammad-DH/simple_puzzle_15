const main = () => {
  let game = generateRandomArray();

  grid = game.gridArray;
  generateGrid(game.gridArray);
  eventListener();
};
