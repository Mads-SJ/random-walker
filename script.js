import RandomWalker from "./randomWalker.js";
import GridContext from "./GridContext.js";

let cellSize = 4;
let run = true;
let delayInMilliseconds = 0;
let randomWalkers = [];
const resizeWidth = 1200;
let timeoutId = null;
let isMobile = window.innerWidth < resizeWidth;

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

const gridContext = new GridContext(ctx, 200, 200);

function renderGrid() {
    if (window.innerWidth < resizeWidth) {
        gridContext.rows = 100;
        gridContext.cols = 100;
    }
    // Set the size of the canvas to match the grid
    canvas.width = gridContext.cols * cellSize;
    canvas.height = gridContext.rows * cellSize;

    // set the color of the whole canvas
    ctx.fillStyle = "rgb(103, 52, 19)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // set the color for the walkers
    ctx.fillStyle = "burlywood";
}

function updateRandomWalkers() {
    timeoutId = setTimeout(() => {
        randomWalkers.forEach(walker => walker.walk());
        if (run) {
            updateRandomWalkers();
        }
    }, delayInMilliseconds);
}

startStopButton.addEventListener("click", () => {
    run = !run;
    if (run) {
        updateRandomWalkers();
        startStopButton.textContent = "Stop";
    } else {
        startStopButton.textContent = "Start";
    }
});

delayInput.addEventListener("input", e => {
    delayInMilliseconds = e.target.value;
    if (timeoutId !== null) {
        clearTimeout(timeoutId);
    }
    if (run) {
        updateRandomWalkers();
    }
});

addRandomWalkerButton.addEventListener("click", () => {
    randomWalkers.push(new RandomWalker(gridContext));
    randomWalkerCount.textContent = randomWalkers.length;
});

removeRandomWalkerButton.addEventListener("click", () => {
    randomWalkers.pop();
    randomWalkerCount.textContent = randomWalkers.length;
});

clearCanvasButton.addEventListener("click", () => {
    renderGrid();
});

resetButton.addEventListener("click", () => {
    renderGrid();
    randomWalkers = [new RandomWalker(gridContext)];
    randomWalkerCount.textContent = randomWalkers.length;
    delayInMilliseconds = 0;
    delayInput.value = 0;
});

window.addEventListener("resize", () => {
    if (window.innerWidth < resizeWidth && !isMobile) {
        isMobile = true;
        gridContext.rows = 100;
        gridContext.cols = 100;
        renderGrid();
    } else if (window.innerWidth >= resizeWidth && isMobile) {
        isMobile = false;
        gridContext.rows = 200;
        gridContext.cols = 200;
        renderGrid();
    }
});

renderGrid();

randomWalkers = [new RandomWalker(gridContext)];

updateRandomWalkers();
