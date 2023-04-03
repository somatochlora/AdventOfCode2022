const fs = require('fs');
let data = fs.readFileSync('data.txt', {encoding:'utf8', flag:'r'});
let lines = data.split("\r\n");

let lineToCube = (line) => {
    let [x, y, z] = line.split(",");
    x = parseInt(x);
    y = parseInt(y);
    z = parseInt(z);
    let hash = calcHash(x, y, z);
    return {x, y, z, hash};
};

let calcHash = (x, y, z) => {  
    return parseInt(x) + y * 100 + z * 10000;
}

let addFace = (cube, face) => {
    return {x: cube.x + face[0], y: cube.y + face[1], z: cube.z + face[2]};
};

let checkLoc = (cubeMap, hash) => {
    return cubeMap.has(hash);
};

let countEmptyAround = (cubeMap, cube, faces) => {
    return faces.reduce((total, face) => {
        return total + (checkFace(cubeMap, cube, face) ? 0 : 1);
    }, 0);
}

let faces = [[0, 0, 1], [0, 0, -1], [0, 1, 0], [0, -1, 0], [1, 0, 0], [-1, 0, 0]];

let checkFace = (cubeMap, cube, face) => {
    let newPos = addFace(cube, face);
    return checkLoc(cubeMap, calcHash(newPos.x, newPos.y, newPos.z));
}

let cubes = lines.map(line => lineToCube(line));
console.log(cubes);
let cubeMap = new Map();
cubes.forEach(cube => cubeMap.set(cube.hash, cube));

let outside = cubes.reduce((total, cube) => {
    return total + countEmptyAround(cubeMap, cube, faces);
}, 0);
console.log(outside);