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
let stepN = 30;

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

// part 2

roomsArray.forEach(room => room[0].open = false);
rooms["AA"].open = true;

maxFlow = 0;
stepN = 26;

optionsDouble = (room1, room1left, room2, room2left, totalFlow, flowRate, step) => {

    totalFlow += flowRate;     
    if (step == stepN) { 
        maxFlow = Math.max(maxFlow, totalFlow);  
        return;
    }   

    step++;
    room1left--
    room2left--

    let room1opened = false;
    if (room1 != null && !room1.open && room1left == 0) {
        flowRate += room1.rate;
        room1.open = true;
        room1opened = true;
        room1left++;
    }
    let room2opened = false;
    if (room2 != null && !room2.open && room2left == 0) {
        flowRate += room2.rate; 
        room2.open = true;
        room2opened = true;
        room2left++;
    }

    let dest1list, dest2list;

    if (room1left == 0) {
        console.log("AAA");
        dest1list = room1.routes.slice()
        dest1list.push({dest: null, len: -1});
        console.log(dest1list);
    } else {
        dest1list = [{dest: room1, len: room1left}];
    }

    if (room2left == 0) {
        dest2list = room2.routes.slice();
        dest2list.push({dest: null, len: -1});
    } else {
        dest2list = [{dest: room2, len: room2left}];
    }    

    for (let route1 of dest1list) {
        for (let route2 of dest2list) {
            if ((route1.dest == null || !route1.dest.open) 
            && (route2.dest == null || !route2.dest.open)
            && route1.len < stepN - step 
            && route2.len < stepN - step
            && (route1.dest != route2.dest || route1.dest == null)) {
                if (route1.dest != null) console.log("going! | " + route1.len);
                optionsDouble(route1.dest, route1.len, route2.dest, route2.len, totalFlow, flowRate, step);
            }
        }
    }

    if (room1opened) room1.open = false;
    if (room2opened) room2.open = false;
}

optionsDouble(rooms["AA"], 1, rooms["AA"], 1, 0, 0, 1);

console.log(maxFlow);

