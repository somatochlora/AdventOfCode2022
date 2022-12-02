const fs = require('fs');

let pointsMap = {
    "A X": 4,
    "B X": 1,
    "C X": 7,
    "A Y": 8,
    "B Y": 5,
    "C Y": 2,
    "A Z": 3,
    "B Z": 9,
    "C Z": 6
}

let data = fs.readFileSync('data.txt', {encoding:'utf8', flag:'r'});

let rounds = data.split("\r\n");
let score = rounds.reduce((prev, curr) => pointsMap[curr] + prev, 0);
console.log(score);