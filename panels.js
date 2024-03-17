playButton.addEventListener("click", function (event) {
  panelContent1.style.display = "none";
  setTimeout(() => {
    panelContent2.style.display = "flex";
  }, 200);
});

startButton.addEventListener("click", function (event) {
  rowLength = dimensionInput.valueAsNumber ? dimensionInput.valueAsNumber : 4;

  shuffleCount = shuffleInput.valueAsNumber ? shuffleInput.valueAsNumber : 100;

  panelContent2.style.display = "none";
  setTimeout(() => {
    startPage.style.display = "none";
  }, 200);

  setTimeout(() => {
    gridContainer.style.gridTemplateColumns = `repeat(${rowLength}, 1fr)`;
    gridContainer.style.display = "grid";
    main();
  }, 300);
});

restartButton.addEventListener("click", function (event) {
  getUserInput = true;
  main();
  restartAnimation();
});
