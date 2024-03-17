playButton.addEventListener("click", function (event) {
  panelContent1.style.display = "none";
  setTimeout(() => {
    panelContent2.style.display = "flex";
  }, 200);
});

startButton.addEventListener("click", function (event) {
  rowLength = rowInput.valueAsNumber ? rowInput.valueAsNumber : 4;
  columnLength = columnInput.valueAsNumber ? columnInput.valueAsNumber : 4;
  tileSize = tileSizeInput.valueAsNumber ? tileSizeInput.valueAsNumber : 6;

  shuffleCount = shuffleInput.valueAsNumber ? shuffleInput.valueAsNumber : 100;

  panelContent2.style.display = "none";
  setTimeout(() => {
    startPage.style.display = "none";
  }, 200);

  setTimeout(() => {
    root.style.setProperty("--grid-size", `${tileSize}vw`);

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
