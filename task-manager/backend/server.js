const express = require('express')
const app = new express()
require('dotenv').config();

const PORT = process.env.PORT 

app.get('/', (req, res)=>{
    res.send('Server is running')
})

app.listen(5000 , () => {
    console.log(`server listening at port ${PORT}`);
})