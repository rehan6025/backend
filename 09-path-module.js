const path = require('path')

// console.log(path);


console.log(path.sep)
const filePath = path.join('/content' , 'subfolder' , 'test.txt')

console.log(filePath);

const base = path.basename(filePath)
console.log(base);

const dirName = path.dirname(filePath)
console.log(dirName);

const absolutePath = path.resolve( __dirname,'content' , 'subfolder' , 'text')
const absolutePath2 = path.resolve()
console.log(absolutePath);
console.log(absolutePath2);

