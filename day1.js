const fs = require('fs');

let data = fs.readFileSync('data.txt', {encoding:'utf8', flag:'r'});
let max = data.split("\r\n\r\n")
                .map(elfStr => elfStr.split("\r\n"))
                .map(elfArr => elfArr.reduce((prev, curr) => prev + parseInt(curr), 0))
                .reduce((prev, curr) => Math.max(prev, curr), 0);
console.log(max);