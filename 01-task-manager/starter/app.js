// 🔹 Environment variables load karne ke liye dotenv require kiya
require('dotenv').config()

// 🔹 Express.js import kiya aur ek app banaya
const express = require('express')
const app = new express()

// 🔹 Task-related routes ko alag file me rakhne ke liye import kiya
const tasks = require('./routes/tasks')

// 🔹 MongoDB se connect hone ke liye function import kiya
const connectDB = require('./db/connect')

// 🔹 Middleware: Ye ensure karega ki request body JSON format me ho
app.use(express.json())
// second middleware apna frontend load krne ke liyey 
app.use(express.static('./public'))

//route

// 🔹 API routes ko mount kiya `/api/v1/tasks` pe 
//    Iska matlab hai ki saare task-related endpoints `/api/v1/tasks` ke under honge
app.use('/api/v1/tasks', tasks)

// 🔹 Port define kiya, jisme server chalega
const port = 3000

// 🔹 Database connection aur server start karne ka function
const start = async () => {
    try {
        // 🟢 MongoDB se connect karne ki koshish kar raha hai
        await connectDB(process.env.MONGO_URI)
        
        // 🟢 Agar DB se connection successful hota hai toh server start hoga
        app.listen(port, ()=>{console.log(`listening on port ${port}`);})
    } catch (error) {
        // 🔴 Agar koi error aati hai toh usko print karega
        console.log(error);
    }
}

// 🔹 Function call kiya taaki server start ho sake
start()
