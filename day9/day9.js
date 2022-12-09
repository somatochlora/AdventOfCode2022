const fs = require('fs');
let data = fs.readFileSync('data.txt', {encoding:'utf8', flag:'r'});
let rows = data.split("\r\n");

let nodes = []
for (let i = 0; i < 10; i++) {
    nodes.push({x: 0, y: 0})
}
let head = nodes[0];
let tail = nodes[9];
let visitedSet = new Set();
visitedSet.add(tail.x + " " + tail.y);

rows.forEach(row => {
    let direction, amount;
    [direction, amount] = row.split(" ");
    for (let i = 0; i < amount; i++) {
        switch(direction) {
            case "U": head.y++;
                        break;
            case "D": head.y--;
                        break;
            case "L": head.x--;
                        break;
            case "R": head.x++;
                        break;
        }
        for (let i = 1; i <= 9; i++) {
            if (Math.abs(nodes[i - 1].x - nodes[i].x) + Math.abs(nodes[i - 1].y - nodes[i].y) > 2) {
                nodes[i].x += nodes[i - 1].x - nodes[i].x > 0 ? 1 : -1;
                nodes[i].y += nodes[i - 1].y - nodes[i].y > 0 ? 1 : -1;
            }
            else if (nodes[i - 1].x > nodes[i].x + 1) nodes[i].x++;
            else if (nodes[i - 1].x < nodes[i].x - 1) nodes[i].x--;
            else if (nodes[i - 1].y > nodes[i].y + 1) nodes[i].y++;
            else if (nodes[i - 1].y < nodes[i].y - 1) nodes[i].y--;
        }        
        visitedSet.add(tail.x + " " + tail.y);
    }
})

console.log(visitedSet.size);
