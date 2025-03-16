const {writeFileSync} = require('fs')
for(let i = 0; i<10000 ;i++){
    writeFileSync('./content/big.txt' , `hello world ${i}\n` , {flag : 'a'})
}



















// const {readFile , writeFile} = require('fs').promises

// const start = async () => {
//     try {
//         const first = await readFile('./content/first.txt', 'utf8')
//         const second = await readFile('./content/second.txt', 'utf8')

//         await writeFile('./content/result-mind-grenade.txt',
//             `THIS IS AWESOME : ${first} ${second}`,
//             {flag: 'a'}
//         )

//         console.log(first, second);
        
//     } catch (error) {
//         console.log(error);
//     }
// }

// start()