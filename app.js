const EventEmitter = require('events')

const customEmitter = new EventEmitter()

customEmitter.on('res', ()=>{
    console.log(`data received`);
    
})

customEmitter.on('res', ()=>{
    console.log(`some other logic here`);
})

customEmitter.emit('res')



















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