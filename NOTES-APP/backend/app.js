const express = require('express')
const app = new express();
require('dotenv').config()
const cors = require("cors");


app.use(cors());
const notes = require('./routes/notes')
//setting up middleware
app.use(express.json())
app.use('/api/notes',notes)

const connectDB = require('./db')

const port = 5000;


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)

        app.listen(port , ()=>{
            console.log(`Server listening on port ${port}`);
        })
    } catch (error) {
        console.log(error);
        
    }
}

start();




