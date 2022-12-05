const fs = require('fs');
let data = fs.readFileSync('data.txt', {encoding:'utf8', flag:'r'});

let stacksData, instructions;
[stacksData, instructions] = data.split("\r\n\r\n");
stacksData = stacksData.split("\r\n");
let stackNum = stacksData[0].length / 4;

let stacks = [];
for (let i = 0; i < stackNum; i++) {
    stacks.push([]);
    for (level of stacksData) {
        if (level[i * 4 + 2] != " ") stacks[i].unshift(level[i * 4 + 1]);
    }
}
stacksMethod1 = structuredClone(stacks);
stacksMethod2 = structuredClone(stacks);
instructions = instructions.split("\r\n")
                            .map(instruction => instruction.split(" "))
                            .map(instruction => {
                                return {amount: instruction[1] - 0, source: instruction[3] - 1, destination: instruction[5] - 1}
                            });



instructions.forEach(instruction => {
    let tempArray = []
    for (let i = 0; i < instruction.amount; i++) {
        stacksMethod1[instruction.destination].push(stacksMethod1[instruction.source].pop());
        tempArray.unshift(stacksMethod2[instruction.source].pop());   
    }
    stacksMethod2[instruction.destination] = stacksMethod2[instruction.destination].concat(tempArray);
})

console.log(stacksMethod1.reduce((string, stack) => string + stack[stack.length - 1], ""));
console.log(stacksMethod2.reduce((string, stack) => string + stack[stack.length - 1], ""));

