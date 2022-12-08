const fs = require('fs');
let data = fs.readFileSync('data.txt', {encoding:'utf8', flag:'r'});
let rows = data.split("\r\n");
let width = rows[0].length;
let height = rows.length;

let treesVisible = [];
rows.forEach(row => {
    treesRow = [];
    let max = -1;
    for (tree of row) {
        tree = parseInt(tree);
        if (tree > max) {
            treesRow.push(true);
            max = tree;
        } else treesRow.push(false);
    }
    max = -1
    for (let i = width - 1; i >= 0; i--) {
        tree = [parseInt(row[i])]
        if (tree > max) {
            treesRow[i] = true;
            max = tree;
        }
    }
    treesVisible.push(treesRow);
});
for (let i = 0; i < width; i++) {
    let topMax = -1, bottomMax = -1;
    for (let j = 0; j < height; j++) {
        let topTree = parseInt(rows[j][i]);
        if (topTree > topMax) {
            treesVisible[j][i] = true;
            topMax = topTree;
        }
        let bottomTree = parseInt(rows[height - j - 1][i]);
        if (bottomTree > bottomMax) {
            treesVisible[height - j - 1][i] = true;
            bottomMax = bottomTree;
        }
    }
}

let count = treesVisible.reduce((total, row) => {
    return total + row.reduce((total, tree) => {
        return total += tree ? 1 : 0;
    });
}, 0)

console.log(count);

let calculateVisibility = (row, col) => { 
    let up = true, down = true, left = true, right = true;
    if (row == 0) up = false;
    if (row == height - 1) down = false;
    if (col == 0) left = false;
    if (col == width - 1) right = false;
    let index = 1
    let upVal = 0, downVal = 0, leftVal = 0, rightVal = 0;
    let tree = parseInt(rows[row][col]);
    while (up || down || left || right) {
        if (down) downVal++;
        if (down && (parseInt(rows[row + index][col]) >= tree || row + index == height - 1)) down = false; 
        if (up) upVal++;
        if (up && (parseInt(rows[row - index][col]) >= tree || row - index == 0)) up = false; 
        if (left) leftVal++;
        if (left && (parseInt(rows[row][col - index]) >=tree || col - index == 0)) left = false;
        if (right) rightVal++;
        if (right && (parseInt(rows[row][col + index]) >= tree || col + index == width - 1)) right = false;
        index++;
    }
    return upVal * downVal * leftVal * rightVal;
};

let max = 0
for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
        max = Math.max(max, calculateVisibility(row, col));
    }
}
console.log(max);