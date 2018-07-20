function Grid(size) {
    this.size = size;
    this.grid = this.reset();
}
Grid.prototype.reset = function() {
    var grid = [size][size];
    for (i = 0; i < size; i++){
        for (j = 0; j < size; j++){
            grid[i][j] = 0;
        }
    }
    return grid;
}