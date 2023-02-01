const fs = require('fs');
let data = fs.readFileSync('data.txt', {encoding:'utf8', flag:'r'});

let rows = data
    .split("\r\n")
    .filter(row => row.charAt(3) != '#')
    .map(row => row.slice(1, -1))
    .map(row => row.split(""));

const width = rows[0].length;
const height = rows.length;

const generateMap = () => {
    let map = [];
    for (let row = 0; row < height; row++) {
        map.push([]);
        for (let col = 0; col < width; col++) {
            map[row].push(false);
        }
    }
    return map;
};

let blizzards = [];

for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
        if (rows[row][col] == '.') continue;
        let dir;
        switch (rows[row][col]) {
            case '^':
                dir = [-1,0];
                break;
            case 'v':
                dir = [1,0];
                break;
            case '<':
                dir = [0,-1];
                break;
            case '>':
                dir = [0,1];
                break;
        }
        blizzards.push({pos:[row,col], dir:dir});
    }
}

const directions = [[0,0],[0,1],[0,-1],[1,0],[-1,0]];

let possibleMap = generateMap();
let step = 1;

while(!possibleMap[height - 1][width - 1]) {
    step++;
    let blizzardMap = generateMap();
    blizzards.forEach(blizzard => {
        blizzard.pos[0] += blizzard.dir[0];
        if (blizzard.pos[0] < 0) blizzard.pos[0] = height - 1;
        if (blizzard.pos[0] >= height) blizzard.pos[0] = 0;
        blizzard.pos[1] += blizzard.dir[1];
        if (blizzard.pos[1] < 0) blizzard.pos[1] = width - 1;
        if (blizzard.pos[1] >= width) blizzard.pos[1] = 0;
        blizzardMap[blizzard.pos[0]][blizzard.pos[1]] = true;
    });

    let newPosMap = generateMap();
    if(!blizzardMap[0][0]) newPosMap[0][0] = true;
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            if (possibleMap[row][col]) {
                directions.forEach(dir => {
                    if (row + dir[0] >= 0 &&
                        row + dir[0] < height &&
                        col + dir[1] >= 0 &&
                        col + dir[1] < width &&
                        !blizzardMap[row + dir[0]][col + dir[1]]) 
                    {
                        newPosMap[row + dir[0]][col + dir[1]] = true;
                    }
                });
            }
        }
    }
    possibleMap = newPosMap;
}

console.log(step);

possibleMap = generateMap();

while(!possibleMap[0][0]) {
    step++;
    let blizzardMap = generateMap();
    blizzards.forEach(blizzard => {
        blizzard.pos[0] += blizzard.dir[0];
        if (blizzard.pos[0] < 0) blizzard.pos[0] = height - 1;
        if (blizzard.pos[0] >= height) blizzard.pos[0] = 0;
        blizzard.pos[1] += blizzard.dir[1];
        if (blizzard.pos[1] < 0) blizzard.pos[1] = width - 1;
        if (blizzard.pos[1] >= width) blizzard.pos[1] = 0;
        blizzardMap[blizzard.pos[0]][blizzard.pos[1]] = true;
    });

    let newPosMap = generateMap();
    if(!blizzardMap[height - 1][width - 1]) newPosMap[height - 1][width - 1] = true;
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            if (possibleMap[row][col]) {
                directions.forEach(dir => {
                    if (row + dir[0] >= 0 &&
                        row + dir[0] < height &&
                        col + dir[1] >= 0 &&
                        col + dir[1] < width &&
                        !blizzardMap[row + dir[0]][col + dir[1]]) 
                    {
                        newPosMap[row + dir[0]][col + dir[1]] = true;
                    }
                });
            }
        }
    }
    possibleMap = newPosMap;
}

console.log(step);

possibleMap = generateMap();

while(!possibleMap[height - 1][width - 1]) {
    step++;
    let blizzardMap = generateMap();
    blizzards.forEach(blizzard => {
        blizzard.pos[0] += blizzard.dir[0];
        if (blizzard.pos[0] < 0) blizzard.pos[0] = height - 1;
        if (blizzard.pos[0] >= height) blizzard.pos[0] = 0;
        blizzard.pos[1] += blizzard.dir[1];
        if (blizzard.pos[1] < 0) blizzard.pos[1] = width - 1;
        if (blizzard.pos[1] >= width) blizzard.pos[1] = 0;
        blizzardMap[blizzard.pos[0]][blizzard.pos[1]] = true;
    });

    let newPosMap = generateMap();
    if(!blizzardMap[0][0]) newPosMap[0][0] = true;
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            if (possibleMap[row][col]) {
                directions.forEach(dir => {
                    if (row + dir[0] >= 0 &&
                        row + dir[0] < height &&
                        col + dir[1] >= 0 &&
                        col + dir[1] < width &&
                        !blizzardMap[row + dir[0]][col + dir[1]]) 
                    {
                        newPosMap[row + dir[0]][col + dir[1]] = true;
                    }
                });
            }
        }
    }
    possibleMap = newPosMap;
}
console.log(step);