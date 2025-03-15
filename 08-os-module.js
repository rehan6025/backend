const os = require('os')
// console.log(os.freemem());
// console.log(16957431808 - 9238257664);
const user = os.userInfo()
console.log(user);

// const currentOS = {
//     name: os.type(),
//     release: os.release(),
//     totalMem: os.totalmem() / 1024 / 1024 / 1024,
//     freeMem: os.freemem() / 1024 / 1024 / 1024,
// }


