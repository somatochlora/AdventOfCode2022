const fs = require('fs');
let data = fs.readFileSync('data.txt', {encoding:'utf8', flag:'r'});

const createStructures = data => {
    let minX = 0;
    let maxX = 1000;
    let maxY = 0;
    let structures = data.split("\r\n")
                        .map(line => line.split(" -> "))
                        .map(line => line.map(coordinate => {
                            const numbers = coordinate.split(",");
                            let coordObj = {x: parseInt(numbers[0]),
                                            y: parseInt(numbers[1])};
                            minX = Math.min(minX, coordObj.x);
                            maxX = Math.max(maxX, coordObj.x);
                            maxY = Math.max(maxY, coordObj.y);
                            return coordObj;
                        }));

    const rockMap = Array(maxY + 1).fill(null).map(() => Array(maxX - minX + 1).fill(false));

    structures.forEach(structure => {
        for (let i = 0; i < structure.length - 1; i++) {
            let direction;
            if (structure[i].x > structure[i + 1].x) direction = [-1, 0];
            else if (structure[i].x < structure[i + 1].x) direction = [1, 0];
            else if (structure[i].y > structure[i + 1].y) direction = [0, -1];
            else if (structure[i].y < structure[i + 1].y) direction = [0, 1];
            let distance = Math.abs(structure[i].x - structure[i + 1].x + structure[i].y - structure[i + 1].y);
            for (let j = 0; j <= distance; j++) {           
                rockMap[structure[i].y + direction[1] * j][structure[i].x + direction[0] * j - minX] = true;
            }
        }
    });
    return [minX, maxY, rockMap];
}

// part 1
let [minX, maxY, rockMap] = createStructures(data);
let sandCount = 0;
grainsLoop:
while(true) {
    sandCount++;
    let x = 500 - minX;
    for (let y = 0; y < maxY; y++) {        
        if (!rockMap[y + 1][x]) continue;
        if (!rockMap[y + 1][x - 1]) {
            x--;
            continue;
        }
        if (!rockMap[y + 1][x + 1]) {
            x++;
            continue;
        }
        rockMap[y][x] = true;        
        continue grainsLoop;
    }
    break;
}
console.log(sandCount - 1);

// part 2
[minX, maxY, rockMap] = createStructures(data);
rockMap.push(new Array(rockMap[0].length).fill(false));
rockMap.push(new Array(rockMap[0].length).fill(true));
maxY += 2;
sandCount = 0;
grainsLoop:
while(true) {
    sandCount++;
    let x = 500 - minX;
    for (let y = 0; y < maxY; y++) {        
        if (!rockMap[y + 1][x]) continue;
        if (!rockMap[y + 1][x - 1]) {
            x--;
            continue;
        }
        if (!rockMap[y + 1][x + 1]) {
            x++;
            continue;
        }
        rockMap[y][x] = true;                
        if (y == 0) break grainsLoop;
        break;
    }
}
console.log(sandCount);

