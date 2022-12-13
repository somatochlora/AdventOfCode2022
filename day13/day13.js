const fs = require('fs');
let data = fs.readFileSync('data.txt', {encoding:'utf8', flag:'r'});
let textPairs = data.split("\r\n\r\n").map(pair => pair.split("\r\n"));

let processArray = text => {
    if (text[0] != "[") {
        return parseInt(text);
    }
    let items = [];
    let currIndex = 1;
    while (currIndex < text.length - 1) {
        let character = text[currIndex];
        if (character == "[") {
            let bracketStack = ["["];
            let str = character;
            while (bracketStack.length > 0) {                
                currIndex++;
                character = text[currIndex];
                if (character == "[") bracketStack.push(character);
                if (character == "]") bracketStack.pop();                
                str += character;
            }
            items.push(processArray(str)); 
            currIndex += 2;           
        } else {
            let number = "";
            while (character != "," && currIndex < text.length - 1) {
                number += character;
                currIndex++;
                character = text[currIndex]
            }
            items.push(processArray(number));
            currIndex++;
        }
    }
    return items;
};

const compare = (left, right) => {
    if (left.length == 0 && right.length == 0) return 0;
    if (left.length == 0) return 1;
    if (right.length == 0) return -1;

    if (typeof left == "number" && typeof right == "number") {
        if (left > right) return -1;
        if (left < right) return 1;
        return 0;
    }
    
    if (typeof left == "number") left = [left];
    if (typeof right == "number") right = [right];
    for (let i = 0; i < left.length; i++) {
        if (i >= right.length) return -1;
        let comparison = compare(left[i], right[i]);
        if (comparison != 0) return comparison;
    }
    if (right.length > left.length) return 1;
    return 0;
};

let total = 0;
for (let i = 0; i < textPairs.length; i++) {
    let left = processArray(textPairs[i][0]);
    let right = processArray(textPairs[i][1]);
    if (compare(left, right) == 1) total += i + 1;
}

console.log(total);

// part2

let packets = []
textPairs.forEach(pair => {
    packets.push(pair[0]);
    packets.push(pair[1]);
});
packets = packets.map(packet => processArray(packet));

let divider1 = processArray("[[2]]");
let divider2 = processArray("[[6]]");
packets.push(divider1);
packets.push(divider2);

packets.sort((a, b) => -compare(a, b));
let product = 1;
for (let i = 0; i < packets.length ; i++) {
    if (packets[i] === divider1) product *= i + 1;
    if (packets[i] === divider2) product *= i + 1;
}
console.log(product);