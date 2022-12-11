const fs = require('fs');
let data = fs.readFileSync('data.txt', {encoding:'utf8', flag:'r'});
let monkeyText = data.split("\r\n\r\n");

let monkeys = monkeyText.map(text => {
    let rows = text.split("\r\n");
    let number = parseInt(rows[0].substring(7, 8));
    let items = rows[1].substring(18).split(", ").map(n => parseInt(n));
    let opComponents = rows[2].split(" ");
    let operation = opComponents[6] == "*" ? (a, b) => a * b : (a, b) => a + b
    let operationFunc = opComponents[7] == "old" ? old => operation(old, old) : old => operation(old, parseInt(opComponents[7]));
    let testVal = parseInt(rows[3].substring(21));
    let trueDest = parseInt(rows[4].substring(29));
    let falseDest = parseInt(rows[5].substring(30));
    return {number, items, operationFunc, testVal, trueDest, falseDest, inspectCount: 0};
});

const rounds = 10000;
const multiple = monkeys.reduce((product, monkey) => product * monkey.testVal, 1);
for (let round = 0; round < rounds; round++) {
    monkeys.forEach(monkey => {
        while(monkey.items.length > 0) {
            monkey.inspectCount++;
            item = monkey.items.shift();
            item = monkey.operationFunc(item);
            item = item % multiple;
            if (item % monkey.testVal == 0) {
                monkeys[monkey.trueDest].items.push(item);
            }
            else monkeys[monkey.falseDest].items.push(item);
        }
    })
}

let inspectionCounts = monkeys.map(monkey => monkey.inspectCount).sort((a, b) => a - b);
console.log(inspectionCounts[monkeys.length - 1] * inspectionCounts[monkeys.length - 2]);