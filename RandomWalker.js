export default class RandomWalker {
    constructor(grid, ctx, rows, cols) {
        this.UP = 0;
        this.DOWN = 1;
        this.LEFT = 2;
        this.RIGHT = 3;
        this.grid = grid;
        this.rows = rows;
        this.cols = cols;
        this.row = Math.trunc(Math.random() * rows);
        this.col = Math.trunc(Math.random() * cols);
        this.ctx = ctx;
        this.addToPath(this.row, this.col);
    }

    walk() {
        const nextDirection = this.findNextDirection(this.row, this.col);

        switch (nextDirection) {
            case this.UP: {
                this.row -= 1;
                break;
            }
            case this.DOWN: {
                this.row += 1;
                break;
            }
            case this.LEFT: {
                this.col -= 1;
                break;
            }
            case this.RIGHT: {
                this.col += 1;
                break;
            }
        }

        this.addToPath(this.row, this.col);
    }

    findNextDirection(currentRow, currentCol) {
        const possibleDirections = [];
        if (currentRow - 1 >= 0) {
            possibleDirections.push(this.UP);
        }
        if (currentRow + 1 < this.rows) {
            possibleDirections.push(this.DOWN);
        }
        if (currentCol - 1 >= 0) {
            possibleDirections.push(this.LEFT);
        }
        if (currentCol + 1 < this.cols) {
            possibleDirections.push(this.RIGHT);
        }

        const direction = Math.trunc(Math.random() * possibleDirections.length);
        return possibleDirections[direction];
    }

    addToPath(row, col) {
        this.ctx.fillRect(col * 4, row * 4, 4, 4);
        this.grid[row][col] = true;
    }
}
