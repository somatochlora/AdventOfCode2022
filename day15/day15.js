const fs = require('fs');
let data = fs.readFileSync('data.txt', {encoding:'utf8', flag:'r'});
let sensors = data.split("\r\n")
    .map(lineText => {
        let words = lineText.split(" ");
        return {
            sensorX: parseInt(words[2].substring(2, words[2].length - 1)),
            sensorY: parseInt(words[3].substring(2, words[3].length - 1)),
            beaconX: parseInt(words[8].substring(2, words[8].length - 1)),
            beaconY: parseInt(words[9].substring(2)),
        }
    });

let beaconSet = new Set();

sensors.forEach(sensor => {
    sensor.beaconDistance = Math.abs(sensor.sensorX - sensor.beaconX) + Math.abs(sensor.sensorY - sensor.beaconY)
    beaconSet.add(sensor.beaconX + " " + sensor.beaconY);
});

let [minX, maxX] = sensors.reduce((prev, sensor) => {
    let sensorMin = Math.min(sensor.sensorX, sensor.beaconX);
    let sensorMax = Math.max(sensor.sensorX, sensor.beaconX);
    return [Math.min(prev[0], sensorMin), Math.max(prev[1], sensorMax)];
}, [sensors[0].sensorX, sensors[0].sensorX]);

let maxDistance = sensors.reduce((max, sensor) => Math.max(max, sensor.beaconDistance), 0);

minX -= maxDistance;
maxX += maxDistance;

/*
const y = 2000000;
let count = 0;
for (let currX = minX; currX <= maxX; currX++) {
    let possible = true;
    for (let sensor of sensors) {
        let currDistance = Math.abs(sensor.sensorX - currX) + Math.abs(sensor.sensorY - y);
        if (currDistance <= sensor.beaconDistance) {
            //console.log("------");
            //console.log(sensor);
            //console.log(currX + ": not possible");
            //console.log("currDsitance: " + currDistance);
            possible = false;
            break;
        }
    }
    if (!beaconSet.has(currX + " " + y)) count += (possible) ? 0 : 1;
}

console.log(count);

*/

// part 2

const checkBeacon = (sensors, coord) => {
    let x = coord.x;
    let y = coord.y;
    for (let sensor of sensors) {
        let currDistance = Math.abs(sensor.sensorX - x) + Math.abs(sensor.sensorY - y);
        if (currDistance <= sensor.beaconDistance) {
            return false;
        }
    }
    return !beaconSet.has(x + " " + y)
};

const calcLine = (x1, y1, x2, y2) => {
    let coefficient = (y1 - y2) / (x1 - x2);
    let constant = y1 - coefficient * x1;
    return {coefficient, constant};
};

const getIntersection = (line1, line2) => {
    let x = (line2.constant - line1.constant) / (line1.coefficient - line2.coefficient);
    let y = line1.coefficient * x + line1.constant;
    return {x, y};
};

sensors.forEach(sensor => {
    let x = sensor.sensorX;
    let y = sensor.sensorY;
    let dist = sensor.beaconDistance + 1;
    sensor.topRight = calcLine(x, y - dist, x + dist, y);
    sensor.topLeft = calcLine(x, y - dist, x - dist, y);
    sensor.botRight = calcLine(x, y + dist, x + dist, y);
    sensor.botLeft = calcLine(x, y + dist, x - dist, y);
});

let downLines = []
let upLines = []

for (let i = 0; i < sensors.length; i++) {
    for (let j = i + 1; j < sensors.length; j++) {
        if (sensors[i].topRight.constant == sensors[j].botLeft.constant) downLines.push(sensors[i].topRight);
        if (sensors[i].botLeft.constant == sensors[j].topRight.constant) downLines.push(sensors[i].botLeft);
        if (sensors[i].topLeft.constant == sensors[j].botRight.constant) upLines.push(sensors[i].topLeft);
        if (sensors[i].botRight.constant == sensors[j].topLeft.constant) upLines.push(sensors[i].botRight);
    }
}

let possibleCoords = [];

for (let downLine of downLines) {
    for (let upLine of upLines) {
        let coord = getIntersection(downLine, upLine);
        if (coord.x >= 0 && coord.x <= 4000000 && coord.y >= 0 && coord.x <= 4000000) {
            possibleCoords.push(coord);
        }
    }
}

for (let coord of possibleCoords) {
    if (checkBeacon(sensors, coord)) {
        console.log(coord.x * 4000000 + coord.y);
    }
};

