const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

const DEFAULT_SIZE = 80;
const OFFSET = 10;
const GAP = 10;
const MAX = 11;

const FRAME_DURATION = 1000 / 60;
const getTime = typeof performance === 'function' ? performance.now : Date.now;
let lastUpdate = getTime();

var tileColour = {
    0:  "#EEE4DA",
    1:  "#EDE0C8",
    2:  "#F85A3D",
    3:  "#E2462D",
    4:  "#F79264",
    5:  "#F67C5F",
    6:  "#F65E3B",
    7:  "#EFCF6A",
    8:  "#F2B179",
    9:  "#ECC850",
    10: "#EDC53F",
    11: "#EEC22E"
};

var tileNums = {
    0:  0,
    1:  0,
    2:  0,
    3:  0,
    4:  0,
    5:  0,
    6:  0,
    7:  0,
    8:  0,
    9:  0,
    10: 0,
    11: 0
};

var tileText = {
    0:  {text: "",      font: "",                   colour: ""},
    1:  {text: "2",     font: "35px Arial Black",   colour: "#776E65"},
    2:  {text: "4",     font: "35px Arial Black",   colour: "white"},
    3:  {text: "8",     font: "35px Arial Black",   colour: "white"},
    4:  {text: "16",    font: "35px Arial Black",   colour: "white"},
    5:  {text: "32",    font: "30px Arial Black",   colour: "white"},
    6:  {text: "64",    font: "30px Arial Black",   colour: "white"},
    7:  {text: "128",   font: "25px Arial Black",   colour: "white"},
    8:  {text: "256",   font: "25px Arial Black",   colour: "white"},
    9:  {text: "512",   font: "25px Arial Black",   colour: "white"},
    10: {text: "1024",  font: "20px Arial Black",   colour: "white"},
    11: {text: "2048",  font: "20px Arial Black",   colour: "white"}
};

var gridDimensions = [
    [], [], [], []
];

var grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

var sizes = [
    [DEFAULT_SIZE, DEFAULT_SIZE, DEFAULT_SIZE, DEFAULT_SIZE],
    [DEFAULT_SIZE, DEFAULT_SIZE, DEFAULT_SIZE, DEFAULT_SIZE],
    [DEFAULT_SIZE, DEFAULT_SIZE, DEFAULT_SIZE, DEFAULT_SIZE],
    [DEFAULT_SIZE, DEFAULT_SIZE, DEFAULT_SIZE, DEFAULT_SIZE]
];

const DEFAULT_TILE_SIZES = [
    [DEFAULT_SIZE, DEFAULT_SIZE, DEFAULT_SIZE, DEFAULT_SIZE],
    [DEFAULT_SIZE, DEFAULT_SIZE, DEFAULT_SIZE, DEFAULT_SIZE],
    [DEFAULT_SIZE, DEFAULT_SIZE, DEFAULT_SIZE, DEFAULT_SIZE],
    [DEFAULT_SIZE, DEFAULT_SIZE, DEFAULT_SIZE, DEFAULT_SIZE]
];

const DEFAULT_TEXT_SIZES = {
    0: 0,
    1: 35,
    2: 35,
    3: 35,
    4: 35,
    5: 30,
    6: 30,
    7: 25,
    8: 25,
    9: 25,
    10: 25,
    11: 15,
    12: 15
};

var directions = {
    37: {x: 1,  y: 0},
    38: {x: 0,  y: 1},
    39: {x: -1, y: 0},
    40: {x: 0,  y: -1}
};

function fillGridDimensions(){
    grid.forEach((row, x) => {
        row.forEach((value, y) => {
            gridDimensions[x][y] = {x: OFFSET + DEFAULT_SIZE / 2 + (GAP + DEFAULT_SIZE) * x, y: OFFSET + DEFAULT_SIZE / 2 + (GAP + DEFAULT_SIZE) * y};
        });
    });
}

function drawTile(x, y, size, fillStyle, tileDetails){
    ctx.fillStyle = fillStyle;
    ctx.fillRect(x + (size * 0.1 / 2) - size / 2, y - size / 2, size * 0.9, size);
    ctx.fillRect(x - size / 2, y + (size * 0.1 / 2) - size / 2, size, size * 0.9);
    ctx.beginPath();
    ctx.arc(x + size * 0.1 / 2 - size / 2, y + size * 0.1 / 2 - size / 2, size * 0.1 / 2, 0, 2 * Math.PI, false);
    ctx.arc(x + size - size * 0.1 / 2 - size / 2, y + size * 0.1 / 2 - size / 2, size * 0.1 / 2, 0, 2 * Math.PI, false);
    ctx.arc(x + size * 0.1 / 2 - size / 2, y + size - size * 0.1 / 2 - size / 2, size * 0.1 / 2, 0, 2 * Math.PI, false);
    ctx.arc(x + size - size * 0.1 / 2 - size / 2, y + size - size * 0.1 / 2 - size / 2, size * 0.1 / 2, 0, 2 * Math.PI, false);
    ctx.fill();

    ctx.fillStyle = tileDetails.colour;
    ctx.font = tileDetails.font;
    ctx.textAlign="center";
    ctx.textBaseline="middle"; 
    ctx.fillText(tileDetails.text, x + (size / 2) - size / 2, y + (size / 2) - size / 2);
}

function animate() {
    for (i = 0; i < 4; i++){
        for (j = 0; j < 4; j++){
            if (sizes[i][j] < DEFAULT_SIZE){
                sizes[i][j] += 2;
            }
        }
    }
    drawTiles();
    if (sizes.toString() != DEFAULT_TILE_SIZES.toString()){
        setTimeout(animate, 1);
    }
}

function newTile(){
    if (hasAvailableTile()){
        var randTile = {x: Math.floor(Math.random() * 4), y: Math.floor(Math.random() * 4)};
        while (grid[randTile.x][randTile.y] != 0){
            randTile = {x: Math.floor(Math.random() * 4), y: Math.floor(Math.random() * 4)};
        }
        grid[randTile.x][randTile.y]++;
        sizes[randTile.x][randTile.y] = 0;
    }
}

function hasAvailableTile(){
    for (i = 0; i < 4; i++){
        if (grid[i].includes(0)){
            return true;
        }
    }
    return false;
}

function drawTiles(){
    ctx.fillStyle = "#BBADA0";
    ctx.fillRect(0, 0, 390, 390);
    grid.forEach((row, y) => {
        row.forEach((value, x) => {
            drawTile(
                gridDimensions[x][y].x,
                gridDimensions[x][y].y,
                sizes[y][x],
                tileColour[value],
                tileText[value]
            )
        });
    });
}

function shift(x, y){
    var direction = x + y;
    for (outer = 0; outer < 4; outer++){
        var index = direction == 1 ? 0 : 3;
        for (inner = direction == 1 ? 0 : 3; inner <= 3 && inner >= 0; inner += direction){
            var row = x == 0 ? inner : outer;
            var col = y == 0 ? inner : outer;
            if (grid[row][col] != 0){
                var value = grid[row][col];
                grid[row][col] = 0;
                if (x == 0){
                    grid[index][col] = value;
                }else{
                    grid[row][index] = value;
                }
                index += direction;
            }
        }
    }
}

function combine(x, y, iter){
    var direction = x + y;
    iter = direction == 1 ? iter : 3 - iter;
    for (outer = 0; outer < 4; outer++){
        var row = x == 0 ? iter : outer;
        var col = y == 0 ? iter : outer;
        if (x == 0){
            if (grid[row][col] == grid[row + direction][col]
                && grid[row][col] != 0
                && grid[row][col] != MAX){
                grid[row][col]++;
                grid[row + direction][col] = 0;
            }
        }else{
            if (grid[row][col] == grid[row][col + direction]
                && grid[row][col] != 0
                && grid[row][col] != MAX){
                grid[row][col]++;
                grid[row][col + direction] = 0;
            }
        }
    }
}

function tileSum(array){
    var total = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (i = 0; i < 3; i++){
        for (j = 0; j < 3; j++){
            total[array[i][j]]++;
        }
    }
    return total;
}

function newGame(){
    grid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    fillGridDimensions();
    newTile();
    newTile();
    drawTiles();
    animate();
}

newGame();
document.addEventListener('keydown', function(event) {
    var initGrid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    for (i = 0; i < 4; i++){
        for (j = 0; j < 4; j++){
            initGrid[i][j] = grid[i][j];
        }
    }

    for (i = 0; i < 3; i++){
        shift(directions[event.keyCode].x, directions[event.keyCode].y);
        combine(directions[event.keyCode].x, directions[event.keyCode].y, i);
    }
    if (initGrid.toString() != grid.toString()){
        newTile();
    }
    drawTiles();
    animate();
});