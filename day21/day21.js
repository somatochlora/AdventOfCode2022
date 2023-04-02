const fs = require('fs');
let data = fs.readFileSync('data.txt', {encoding:'utf8', flag:'r'});
let lines = data.split("\r\n");

let monkies = lines.map(line => {
    let monkey = {};
    let [name, rule] = line.split(": ");
    let a, b, op;
    if (rule.includes(" ")) {
        [a, op, b] = rule.split(" ");
    }
    return {name, rule, a, b, op};
});

let getVal = (monkey) => {
    if (monkey.rule == null) return NaN;
    if (!isNaN(parseInt(monkey.rule))) {
        return parseInt(monkey.rule);
    }
    let a = monkey.a;
    let b = monkey.b;
    let op = monkey.op;
    let opFunc;
    switch (op) {
        case "+": opFunc = (a, b) => a + b; break;
        case "*": opFunc = (a, b) => a * b; break;
        case "-": opFunc = (a, b) => a - b; break;
        case "/": opFunc = (a, b) => a / b; break;
    }
    let aVal = getVal(monkies.find(m => m.name == a));
    let bVal = getVal(monkies.find(m => m.name == b));
    return opFunc(aVal, bVal);
}

let root = monkies.find(m => m.name == "root");

let output = getVal(root);
console.log(output);

monkies.find(m => m.name == "humn").rule = null;

let targetNum = getVal(monkies.find(m => m.name == root.a));
let treeRoot;
if (isNaN(targetNum)) {
    treeRoot = monkies.find(m => m.name == root.a);
    targetNum = getVal(monkies.find(m => m.name == root.b));
} else {
    treeRoot = monkies.find(m => m.name == root.b);
}

let calcTarget = (monkey, curTarget) => {
    if (monkey.name == "humn") return curTarget;
    let opFunc;

    let leftHasHumn = false;
    
    let otherBranchVal = getVal(monkies.find(m => m.name == monkey.a));
    let nextMonkey = monkies.find(m => m.name == monkey.b);
    if (isNaN(otherBranchVal)) {
        leftHasHumn = true;
        otherBranchVal = getVal(monkies.find(m => m.name == monkey.b));
        nextMonkey = monkies.find(m => m.name == monkey.a);
    }

    switch (monkey.op) {
        case "+": opFunc = (a, b) => a - b; break;
        case "*": opFunc = (a, b) => a / b; break;
        case "-": opFunc = leftHasHumn ? (a, b) => a + b : (a, b) => b - a; break;
        case "/": opFunc = leftHasHumn ? (a, b) => a * b : (a, b) => b / a; break;
    }

    return calcTarget(nextMonkey, opFunc(curTarget, otherBranchVal));
}

console.log(calcTarget(treeRoot, targetNum));