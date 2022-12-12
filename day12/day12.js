const fs = require('fs');
let data = fs.readFileSync('data.txt', {encoding:'utf8', flag:'r'});
let textData = data.split("\r\n").map(row => row.split(""));
let squares = textData.map(row => {
    return row.map(space => {
        let start = end = false;
        switch(space) {
            case "S":
                start = true;
                space = "a";
                break;
            case "E":
                end = true;
                space = "z";
                break;
        }
        return{start, end, height: space.charCodeAt(0) - 97, shortest: 999999, shortestFromEnd: 999999};
    });    
});

let width = squares[0].length;
let height = squares.length;

let startRow, startCol, endRow, endCol;
for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
        if (!startRow || !endRow) {
            if (squares[row][col].start) {
                startRow = row;
                startCol = col;
            }
            if (squares[row][col].end) {
                endRow = row;
                endCol = col;
            }
        }
    }
}

squares[startRow][startCol].shortest = 0;
const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

const calcShortest = (row, col) => {
    directions.forEach(direction => {
        let rowI = row + direction[0];
        let colI = col + direction[1];
        if (rowI >= 0 && rowI < height && colI >= 0 && colI < width) {
            if (squares[rowI][colI].shortest > squares[row][col].shortest + 1
            && squares[rowI][colI].height <= squares[row][col].height + 1) {
                squares[rowI][colI].shortest = squares[row][col].shortest + 1;
                calcShortest(rowI, colI);
            }
        }
    });    
}
calcShortest(startRow, startCol);
console.log(squares[endRow][endCol].shortest);

squares[endRow][endCol].shortestFromEnd = 0;
const calcShortestDownhill = (row, col) => {
    directions.forEach(direction => {
        let rowI = row + direction[0];
        let colI = col + direction[1];
        if (rowI >= 0 && rowI < height && colI >= 0 && colI < width) {
            if (squares[rowI][colI].shortestFromEnd > squares[row][col].shortestFromEnd + 1
            && squares[rowI][colI].height >= squares[row][col].height - 1) {
                squares[rowI][colI].shortestFromEnd = squares[row][col].shortestFromEnd + 1;
                calcShortestDownhill(rowI, colI);
            }
        }
    });    
}

calcShortestDownhill(endRow, endCol);
minPerRow = squares.map(row => row.reduce((prevMin, square) => {
    if (square.height == 0) return Math.min(prevMin, square.shortestFromEnd);
    return prevMin;
}, 999999));
console.log(minPerRow.reduce((prevMin, curr) => Math.min(prevMin, curr)));