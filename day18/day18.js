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

let countExposedAround = (cubeMap, outsideMap, cube, faces) => {
    return faces.reduce((total, face) => {
        return total + (checkFaceExposed(cubeMap, outsideMap, cube, face) ? 1 : 0);
    }, 0);
}

let faces = [[0, 0, 1], [0, 0, -1], [0, 1, 0], [0, -1, 0], [1, 0, 0], [-1, 0, 0]];

let checkFace = (cubeMap, cube, face) => {
    let newPos = addFace(cube, face);
    return checkLoc(cubeMap, calcHash(newPos.x, newPos.y, newPos.z));
}

let checkFaceExposed = (cubeMap, outsideMap, cube, face) => {
    let newPos = addFace(cube, face);
    let newHash = calcHash(newPos.x, newPos.y, newPos.z);
    return outsideMap.has(newHash);
}

let cubes = lines.map(line => lineToCube(line));
console.log(cubes);
let cubeMap = new Map();
cubes.forEach(cube => cubeMap.set(cube.hash, cube));

let air = cubes.reduce((total, cube) => {
    return total + countEmptyAround(cubeMap, cube, faces);
}, 0);
console.log(air);

let min = cubes.reduce((min, cube) => {
    return Math.min(min, cube.x, cube.y, cube.z);
}, 0);
let max = cubes.reduce((max, cube) => {
    return Math.max(max, cube.x, cube.y, cube.z);
}, 0);
max += 1;
min -= 1;

let expandSteam = (cubeMap, outsideMap, min, max, coords, targetList) => {
    let hash = calcHash(coords.x, coords.y, coords.z);
    if (outsideMap.has(hash)) {
        return;
    }
    outsideMap.add(hash);
    faces.forEach(face => {
        let newPos = addFace(coords, face);
        let newHash = calcHash(newPos.x, newPos.y, newPos.z);
        if (!cubeMap.has(newHash) && checkIfInBounds(min, max, newPos.x, newPos.y, newPos.z)) {
            targetList.add(newPos);
        }
    });
}

let expandSteamWrapper = (cubeMap, outsideMap, min, max, coords) => {
    let targetList = new Set();
    targetList.add(coords)
    targetList.forEach(coords => {
        expandSteam(cubeMap, outsideMap, min, max, coords, targetList);
    });
}

let checkIfInBounds = (min, max, x, y, z) => {
    return x >= min && x <= max && y >= min && y <= max && z >= min && z <= max;
};

let outsideMap = new Set()

expandSteamWrapper(cubeMap, outsideMap, min, max, {x: -1, y: -1, z: -1});

let outside = cubes.reduce((total, cube) => {
    return total + countExposedAround(cubeMap, outsideMap, cube, faces);
}, 0);
console.log(outside);