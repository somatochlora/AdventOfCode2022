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
        let routes = [];
        return [id, {id, rate, hasValve, paths, open, routes}];
    });

let rooms = Object.fromEntries(roomsArray);

let findShortestRoute = (a, b, avoid) => {
    if (avoid.includes(a)) return 99999;
    if (a.paths.includes(b.id)) return 1;
    let min = 99999;
    for (let path of a.paths) {
        min = Math.min(min, findShortestRoute(rooms[path], b, avoid.concat(a)));
    }
    return 1 + min;
}

// optimise routes
let nodes = []
for (let i = 0; i < roomsArray.length; i++) {
    let room = roomsArray[i][1];
    if (room.id == "AA" || room.hasValve) nodes.push(room);
}

for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
        let dist = findShortestRoute(nodes[i], nodes[j], []);
        if (nodes[j].id != "AA") nodes[i].routes.push({dest: nodes[j], len: dist});
        if (nodes[i].id != "AA") nodes[j].routes.push({dest: nodes[i], len: dist});
    }
}

let maxFlow = 0;
const stepN = 30;

let tryOptions = (room, totalFlow, flowRate, step) => {

    totalFlow += flowRate;     
    if (step == stepN) { 
        maxFlow = Math.max(maxFlow, totalFlow);       
        return;
    }   

    step += 1
    flowRate += room.rate;    
    totalFlow += flowRate;    
    room.open = true;
    maxFlow = Math.max(maxFlow, totalFlow + flowRate * (stepN - step))

    for (let route of room.routes) {
        if (route.len < (stepN - step) && !route.dest.open) {
            tryOptions(route.dest, totalFlow + flowRate * (route.len - 1), flowRate, step + route.len);
        }
    }
    room.open = false;
}

tryOptions(rooms["AA"], 0, 0, 0);
console.log(maxFlow);
