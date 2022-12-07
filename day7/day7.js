const fs = require('fs');
let data = fs.readFileSync('data.txt', {encoding:'utf8', flag:'r'});

let directory = (parent, name) => {
    let folders = [];
    let files = [];
    let totalSize = 0
    let getSize = () => totalSize;
    let getFolders = () => folders;
    let getFiles = () => files;
    let getParent = () => parent;
    let getName = () => name;
    let addFile = (fileName, fileSize) => {
        files.push({name: fileName, size: fileSize});
        addSize(fileSize);
    }
    let addFolder = (folderName) => {
        let folder = directory(thisObj, folderName);
        folders.push(folder);
        return folder;
    }
    let addSize = (amount) => {
        totalSize += parseInt(amount);
        if (parent != null) parent.addSize(amount);
    }
    let thisObj = {getSize, getFolders, getFiles, getParent, getName, addFile, addFolder, addSize};
    return thisObj;
}

let lines = data.split("\r\n");

let currFolder = directory(null, "root");
let root = currFolder;
let directories = [];
directories.push(root);
for (let line of lines) {
    if (line.substring(0, 4) == "$ ls") {
    } else if (line == "$ cd ..") {
        currFolder = currFolder.getParent();
    } else if (line.substring(0, 4) == "$ cd") {
        currFolder = currFolder.addFolder(line.substring(5));
        directories.push(currFolder);
    } else if (line.substring(0, 3) == "dir") {
    } else {
        fileData = line.split(" ");
        currFolder.addFile(fileData[1], fileData[0]);
    }
}

let sum = directories.filter(directory => directory.getSize() <= 100000)
                    .reduce((sum, directory) => sum += directory.getSize(), 0);
console.log(sum);

let spaceNeeded = 30000000 - (70000000 - root.getSize())
let smallestBigEnough = directories.reduce((value, directory) => {
    if (directory.getSize() < value && directory.getSize() >= spaceNeeded) return directory.getSize();
    return value;
}, root.getSize());
console.log(smallestBigEnough);
