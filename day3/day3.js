let getCharValue = c => {
    c = c.charCodeAt(0);
    if (c >= 97) return c - 97 + 1;
    return c - 65 + 27;
}

const fs = require('fs');
let data = fs.readFileSync('data.txt', {encoding:'utf8', flag:'r'});
let rows = data.split("\r\n")
let chars = rows.map(row => {
                    for(let i = 0; i < row.length / 2; i++) {
                        if (row.lastIndexOf(row[i]) >= row.length / 2) return row[i];
                    }
                });
let output = chars.map(char => getCharValue(char))
                .reduce((prev, curr) => prev + curr, 0);
console.log(output)

let groups = [];
for (let i = 2; i < rows.length; i += 3) {
    groups.push([rows[i], rows[i - 1], rows[i -2]]);
}
output = groups.map(group => {
                for (let char of group[0]) {
                    if (group[1].indexOf(char) >= 0 && group[2].indexOf(char) >= 0) return char;
                }
            }).reduce((prev, curr) => prev + getCharValue(curr), 0);

console.log(output);