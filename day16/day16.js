const fs = require('fs');
let data = fs.readFileSync('data.txt', {encoding:'utf8', flag:'r'});
let roomsArray = data.split("\r\n")
    .map(room => {
        words = room.split(" ");
        let id = words[1];
        let rate = parseInt(words[4].substring(5, words[4].length - 1));
        let hasValve = rate > 0;
        let paths = words.slice(9)
            .map(word => word.substring(0, 2));
        let open = false;
        return [id, {id, rate, hasValve, paths, open}];
    });

let rooms = Object.fromEntries(roomsArray);

let maxFlow = 0;
const stepN = 30;

let tryOptions = (room, totalFlow, flowRate, step, noChangeStack) => {
    totalFlow += flowRate;
    if (step == stepN) {
        maxFlow = Math.max(maxFlow, totalFlow);
        return;
    }
    if (room.hasValve && !room.open) {
        room.open = true;
        tryOptions(room, totalFlow, flowRate + room.rate, step + 1, []); 
        room.open = false;
    }
    for (path of room.paths) {
        if (noChangeStack.includes(path)) {
            maxFlow = Math.max(maxFlow, totalFlow + (stepN - step - 1) * flowRate);
        } else {    
            noChangeStack.push(room.id);        
            tryOptions(rooms[path], totalFlow, flowRate, step + 1, noChangeStack);
            noChangeStack.splice(noChangeStack.indexOf(room.id), 1);
        }
    }
}

tryOptions(rooms["AA"], 0, 0, 1, []);
console.log(maxFlow);