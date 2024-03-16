const main = () => {
  let game = generateRandomArraySolutionOne();

  let valid = isSolvable(game.gridArray);

  while (!valid) {
    game = generateRandomArraySolutionOne();
    valid = isSolvable(game.gridArray);
  }
  grid = game.gridArray;
  generateGrid(game.gridArray);
  eventListener();
};
