export default class GridContext {
    static instance;

    constructor(ctx, rows, cols) {
        if (GridContext.instance) {
            return GridContext.instance;
        }
        this.ctx = ctx;
        this.rows = rows;
        this.cols = cols;

        GridContext.instance = this;
    }
}
