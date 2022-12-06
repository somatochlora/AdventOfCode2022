const fs = require('fs');
let data = fs.readFileSync('data.txt', {encoding:'utf8', flag:'r'});

const detectMarker = N => {
    for (let i = 0; i < data.length; i++) {
        let different = true;
        for (let j = 0; j < N; j++) {
            for (let k = j + 1; k < N; k++) {
                if (data[i + j] == data[i + k]) {
                    different = false;
                }
            }
        }
        if (different) {
            return i + N
        }
    }
};

console.log(detectMarker(4));
console.log(detectMarker(14));