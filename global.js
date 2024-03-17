// global variables

// grid variables
let rowLength;
let columnLength;
let tileSize;
let grid;
let solvedGrid;

// gameplay variable
let getUserInput = true;

// references
let root = document.documentElement;
let gridContainer = document.querySelector(".grid");
let globalGridItems = gridContainer.querySelectorAll(".grid-item");

let startPage = document.querySelector(".startPage");
let panelContent1 = document.querySelector(".panelContent1");
let playButton = document.querySelector("#playButton");

let panelContent2 = document.querySelector(".panelContent2");
let startButton = document.querySelector("#startButton");
let rowInput = document.querySelector("#row");
let columnInput = document.querySelector("#column");
let shuffleInput = document.querySelector("#shuffle");
let tileSizeInput = document.querySelector("#tileSize");

let winPage = document.querySelector(".winPage");
let restartButton = document.querySelector("#restartButton");
