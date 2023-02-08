const fs = require('fs');
let data = fs.readFileSync('data.txt', {encoding:'utf8', flag:'r'});

let textMap = data
    .split("\r\n")
    .map(row => row.split(""));

let curLocations = [];

let targetMap = {};
let currMap = {};
let directions = [[[-1,0],[-1,-1],[-1,1]], [[1,0],[1,-1],[1,1]], [[0,-1],[-1,-1],[1,-1]], [[0,1],[-1,1],[1,1]]];

for (let row = 0; row < textMap.length; row++) {
    for (let col = 0; col < textMap[0].length; col++) {
        if (textMap[row][col] == '#') {
            curLocations.push({row: row, col: col, text: row + " " + col});
        }
    }
}

const addToCurrMap = () => {
    currMap = {};
    curLocations.forEach(loc => {
        currMap[loc.text] = true;
    })
}

for (let i = 0; i < 10; i++) {

    addToCurrMap();
    targetMap = {};

    curLocations.forEach(loc => {
        let finalDir = false;

        let fullyOpen = true;
        for (let dir of directions) {
            let open = true;            
            for (let check of dir) {
                if (currMap.hasOwnProperty((loc.row + check[0]) + " " + (loc.col + check[1]))) {
                    open = false;
                    fullyOpen = false;
                }
            }
            if (open && !finalDir) finalDir = dir[0];
        }
        if (fullyOpen) finalDir = false;

        if (finalDir) {        
            loc.targetY = loc.row + finalDir[0]
            loc.targetX = loc.col + finalDir[1]
            let text = loc.targetY + " " + loc.targetX;
            loc.target = text;
            if (targetMap.hasOwnProperty(text)) targetMap[text] = 2;
            else targetMap[text] = 1;
        } else loc.target = false;
    
    });
    
    curLocations.forEach(loc => {
        if (loc.target && targetMap[loc.target] === 1) {
            loc.row = loc.targetY;
            loc.col = loc.targetX;
            loc.text = loc.target;
        }
        loc.target = false;
        loc.targetX = false;
        loc.targetY = false;
    });

    directions.push(directions.shift());

}

let minX, maxX, minY, maxY;
minX = curLocations[0].row;
maxX = curLocations[0].row;
minY = curLocations[0].col;
maxY = curLocations[0].col;

curLocations.forEach(loc => {
    minX = Math.min(minX, loc.row);
    maxX = Math.max(maxX, loc.row);
    minY = Math.min(minY, loc.col);
    maxY = Math.max(maxY, loc.col);
});

console.log(minX);
console.log(maxX);
console.log(minY);
console.log(maxY);

let empties = (maxX - minX + 1) * (maxY - minY + 1) - curLocations.length;

console.log(empties);

let moved = true;

let count = 10;
while(moved) {
    count++;
    moved = false;
    addToCurrMap();
    targetMap = {};

    curLocations.forEach(loc => {
        let finalDir = false;

        let fullyOpen = true;
        for (let dir of directions) {
            let open = true;            
            for (let check of dir) {
                if (currMap.hasOwnProperty((loc.row + check[0]) + " " + (loc.col + check[1]))) {
                    open = false;
                    fullyOpen = false;
                }
            }
            if (open && !finalDir) finalDir = dir[0];
        }
        if (fullyOpen) finalDir = false;

        if (finalDir) { 
            moved = true;       
            loc.targetY = loc.row + finalDir[0]
            loc.targetX = loc.col + finalDir[1]
            let text = loc.targetY + " " + loc.targetX;
            loc.target = text;
            if (targetMap.hasOwnProperty(text)) targetMap[text] = 2;
            else targetMap[text] = 1;
        } else loc.target = false;
    
    });
    
    curLocations.forEach(loc => {
        if (loc.target && targetMap[loc.target] === 1) {
            loc.row = loc.targetY;
            loc.col = loc.targetX;
            loc.text = loc.target;
        }
        loc.target = false;
        loc.targetX = false;
        loc.targetY = false;
    });

    directions.push(directions.shift());

    if (!moved) {
        break;
    }
}

console.log(count);