let getCharValue = c => {
    c = c.charCodeAt(0);
    if (c >= 97) return c - 97 + 1;
    return c - 65 + 27;
}

const fs = require('fs');
let data = fs.readFileSync('data.txt', {encoding:'utf8', flag:'r'});
let chars = data.split("\r\n")
                .map(row => {
                    for(let i = 0; i < row.length / 2; i++) {
                        if (row.lastIndexOf(row[i]) >= row.length / 2) return row[i];
                    }
                });
let output = chars.map(char => getCharValue(char))
                .reduce((prev, curr) => prev + curr, 0);
console.log(output)