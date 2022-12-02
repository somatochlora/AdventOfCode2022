const fs = require('fs');

let data = fs.readFileSync('data.txt', {encoding:'utf8', flag:'r'});

let elfTotals = data.split("\r\n\r\n")
                    .map(elfStr => elfStr.split("\r\n"))
                    .map(elfArr => elfArr.reduce((prev, curr) => prev + parseInt(curr), 0));
let max = elfTotals.reduce((prev, curr) => Math.max(prev, curr), 0);
console.log(max);
let topThree = elfTotals.reduce((prev, curr) => [Math.max(prev[0], curr), prev[1], prev[2]].sort(), [0, 0, 0]);
console.log(topThree.reduce((prev, curr) => prev + curr));
