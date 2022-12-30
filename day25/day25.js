const snafuToDec = snafuNum => {
    let decNum = 0;
    for (let i = snafuNum.length - 1, power = 1; i >= 0; i--, power *= 5) {
        let char = snafuNum[i];
        decNum += charToVal(char) * power;
    }  
    return decNum;
};

const decToSnafu = decNum => {
    let snafuNum = "";
    let carry = 0;
    while(decNum > 0) {
        let char;
        [char, carry] = valToChar(decNum % 5 + carry);
        snafuNum = char + snafuNum;
        decNum = Math.floor(decNum / 5);
    }
    if (carry == 1) snafuNum = '1' + snafuNum;
    return snafuNum;
};

const charToVal = char => {
    if (char == "2") return 2;
    if (char == "1") return 1;
    if (char == "0") return 0;
    if (char == "-") return -1;
    if (char == "=") return -2;
}

const valToChar = val => {
    if (val == 2) return ['2', 0];
    if (val == 1) return ['1', 0];
    if (val == 0) return ['0', 0];
    if (val == 3) return ['=', 1];
    if (val == 4) return ['-', 1];
    if (val == 5) return ['0', 1];
    return ["aaa", 1];
}


const fs = require('fs');
let data = fs.readFileSync('data.txt', {encoding:'utf8', flag:'r'});
let numbers = data.split("\r\n");
let total = numbers.reduce((total, curr) => total + snafuToDec(curr), 0);
console.log(total);
console.log(decToSnafu(total));
/*



*/