const fs = require('fs');

const rangeContain = elves => {
    if (elves[0].low == elves[1].low) return true;
    if (elves[0].high == elves[1].high) return true;
    if (elves[0].low > elves[1].low && elves[0].high < elves[1].high) return true;
    if (elves[0].low < elves[1].low && elves[0].high > elves[1].high) return true;
    return false;
};

const rangeOverlap = elves => {
    return ((elves[0].low <= elves[1].high && elves[0].high >= elves[1].high) 
            || (elves[1].low <= elves[0].high && elves[1].high >= elves[0].high));
}

let data = fs.readFileSync('data.txt', {encoding:'utf8', flag:'r'});
let rows = data.split("\r\n")

fullyContained = rows.map(row => {
    let elves = row.split(',');
    elves = elves.map(range => {
        let nums = range.split('-');
        return {
            low: nums[0] - 0,
            high: nums[1] - 0
        }
    });
    return rangeContain(elves);
})

overlaps = rows.map(row => {
    let elves = row.split(',');
    elves = elves.map(range => {
        let nums = range.split('-');
        return {
            low: nums[0] - 0,
            high: nums[1] - 0
        }
    });
    return rangeOverlap(elves);
})

console.log(fullyContained.reduce((count, bool) => count + (bool ? 1 : 0), 0));
console.log(overlaps.reduce((count, bool) => count + (bool ? 1 : 0), 0));