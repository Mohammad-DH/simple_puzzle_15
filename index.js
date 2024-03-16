const main = () => {
  gridContainer.style.gridTemplateColumns = `repeat(${rowLength}, 1fr)`;

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

main();
