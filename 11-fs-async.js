const {readFile, writeFile} = require('fs')

console.log('start');


readFile('./content/first.txt', 'utf8', (err, result) => {
    if(err) {
        console.log(err);
        return;
    }

    const first = result;

    readFile('./content/second.txt', 'utf8', (err, result2) => {
        if(err){
            console.log(err);
            return;
        }

        writeFile('./content/result-async.txt', `Here is the result: ${first}, ${result2}`, (err, result) => {
                if(err){
                    console.log(err);
                    return;
                }

                console.log('finished with this task');
                                
            });
    });
});
console.log('starting next task');
