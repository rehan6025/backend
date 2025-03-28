const express = require('express')
const app = new express();

//middleware integration - importing and using middlewares 
const cors = require('cors')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')

const mongoose = require('mongoose')

app.use(cors())
app.use(helmet())
app.use(cookieParser())
app.use(express.json()) 

//setting routers
const authRouter = require('./routers/authRouter')



const connectDb= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI).then(()=>{
            console.log('Database connected');
            
        })
    } catch (error) {
        console.log(error);
    }
}

connectDb();


app.use('/api/auth',authRouter);

app.get('/', (req,res) => {
    res.json({message:"Hello from the server"})
})



app.listen(process.env.PORT, ()=> {
    console.log('listening...');
})

