const fs = require('fs');

let moveMap = {
    "A": 1,
    "B": 2,
    "C": 3,
    "X": 1,
    "Y": 2,
    "Z": 3
}

let strategyMap = {
    "X": -1,
    "Y": 0,
    "Z": 1
}

let calcPlayer = (outcome, opponent) => {
    let player = opponent + outcome;
    player = player > 3 ? 1 : player;
    return player < 1 ? 3 : player;
}

let scoreRound = (player, opponent) => {
    let diffMap = {
        "-1": 0,
        "2": 0,
        "0": 3 ,
        "-2": 6,
        "1": 6
    }
    return diffMap[player - opponent] + player;
};

let data = fs.readFileSync('data.txt', {encoding:'utf8', flag:'r'});

let rounds = data.split("\r\n").map(roundStr => [roundStr[2], roundStr[0]]);
let naiveScore = rounds.reduce(
    (prev, curr) => prev + scoreRound(moveMap[curr[0]],moveMap[curr[1]]),
    0);
console.log(naiveScore);
let realScore = rounds.reduce(
    (prev, curr) => prev + scoreRound(calcPlayer(strategyMap[curr[0]], moveMap[curr[1]]), moveMap[curr[1]]),
    0);
console.log(realScore);