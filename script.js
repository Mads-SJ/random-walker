import RandomWalker from "./randomWalker.js";

let rows = 200;
let cols = 200;
let grid = [];
let run = true;
let delayInMilliseconds = 0;
let randomWalkers = [];

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const startStopButton = document.querySelector("#start-stop-btn");
const delayInput = document.querySelector("#delay-input");
const addRandomWalkerButton = document.querySelector("#add-random-walker-btn");
const clearCanvasButton = document.querySelector("#clear-canvas-btn");
const removeRandomWalkerButton = document.querySelector(
    "#remove-random-walker-btn"
);
const resetButton = document.querySelector("#reset-btn");
const randomWalkerCount = document.querySelector("#random-walker-count");

function createGrid() {
    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        for (let j = 0; j < cols; j++) {
            grid[i][j] = false;
        }
    }
}

function renderGrid() {
    // Set the size of the canvas to match the grid
    canvas.width = cols * 4;
    canvas.height = rows * 4;

    // set the color of the whole canvas
    ctx.fillStyle = "rgb(103, 52, 19)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // set the color for the walkers
    ctx.fillStyle = "burlywood";
}

function handleRandomWalkers() {
    setTimeout(() => {
        randomWalkers.forEach(walker => walker.walk());
        if (run) {
            handleRandomWalkers();
        }
    }, delayInMilliseconds);
}

startStopButton.addEventListener("click", () => {
    run = !run;
    if (run) {
        handleRandomWalkers();
    }
});

delayInput.addEventListener("input", e => {
    delayInMilliseconds = e.target.value;
});

addRandomWalkerButton.addEventListener("click", () => {
    randomWalkers.push(new RandomWalker(grid, ctx, rows, cols));
    randomWalkerCount.textContent = randomWalkers.length;
});

removeRandomWalkerButton.addEventListener("click", () => {
    randomWalkers.pop();
    randomWalkerCount.textContent = randomWalkers.length;
});

clearCanvasButton.addEventListener("click", () => {
    createGrid();
    renderGrid();
});

resetButton.addEventListener("click", () => {
    createGrid();
    renderGrid();
    randomWalkers = [new RandomWalker(grid, ctx, rows, cols)];
    randomWalkerCount.textContent = randomWalkers.length;
    delayInMilliseconds = 0;
});

createGrid();
renderGrid();
randomWalkers = [new RandomWalker(grid, ctx, rows, cols)];

handleRandomWalkers();
