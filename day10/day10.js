const fs = require('fs');
let data = fs.readFileSync('data.txt', {encoding:'utf8', flag:'r'});
let rows = data.split("\r\n");

let steps = []
let curVal = 1
rows.forEach(row => {
    if (row === "noop") steps.push(curVal);
    else {
        let addVal = parseInt(row.substring(5));
        steps.push(curVal);
        steps.push(curVal);
        curVal += addVal;
    }
});

output = 0;
[20, 60, 100, 140, 180, 220].forEach(index => {
    output += index * steps[index - 1];
})
console.log(output);

// part 2;

for(let i = 0; i < 6; i++) {
    let row = "";
    for(let j = 0; j < 40; j++) {
        index = j + (i * 40);
        row += (steps[index] >= j - 1 && steps[index] <= j + 1) ? "■ " : "  ";
    }
    console.log(row);
}
