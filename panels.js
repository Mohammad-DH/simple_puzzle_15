let startPage = document.querySelector(".startPage");
let panelContent1 = document.querySelector(".panelContent1");
let playButton = document.querySelector("#playButton");
let panelContent2 = document.querySelector(".panelContent2");
let startButton = document.querySelector("#startButton");
let dimensionInput = document.querySelector("#dimension");
let shuffleInput = document.querySelector("#shuffle");
let winPage = document.querySelector(".winPage");

playButton.addEventListener("click", function (event) {
  panelContent1.style.display = "none";
  setTimeout(() => {
    panelContent2.style.display = "flex";
  }, 200);
});

startButton.addEventListener("click", function (event) {
  rowLength = dimensionInput.valueAsNumber ? dimensionInput.valueAsNumber : 4;

  shuffleCount = shuffleInput.valueAsNumber ? shuffleInput.valueAsNumber : 1;

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
