const http = require('http')

const server = http.createServer( (req , res) => {

    if(req.url === '/'){
        res.end('welcome to our home page')
        return
    }
    if(req.url === '/about'){
        res.end('this is our small history')
        return
    }

    res.end(`
        <h1>Oops!</h1>
        <p>We can't seem to find the link you are looking for</p>
        <a href='/'> back home </a>
        `)
})

server.listen(5000)
