const fs = require('fs');
let data = fs.readFileSync('data.txt', {encoding:'utf8', flag:'r'});
let numsText = data.split("\r\n");
let nums = numsText.map(num => parseInt(num)).map(num => num % numsText.length);
for (let i = 0; i < nums.length; i++) {
    nums[i] = {
        val: nums[i],
    };    
}
let numRefs = nums.map(num => num);

for (let numRef of numRefs) {
    let pos = nums.indexOf(numRef);
    nums.splice(pos, 1);
    let newpos = (pos + numRef.val)
    if (newpos == 0) newpos = numRefs.length;
    
    else if (newpos >= numRefs.length) newpos = newpos % numRefs.length + 1;
    nums.splice(newpos, 0, numRef);
    console.log(numRef.val + " | " + pos + " | " + newpos);
    console.log(nums.reduce((str, num) => str + num.val + ", ", ""));
}

let zeroPos = nums.findIndex(num => num.val == 0);
console.log(nums[(zeroPos + 1000) % nums.length].val +
    nums[(zeroPos + 2000) % nums.length].val +
    nums[(zeroPos + 3000) % nums.length].val);

