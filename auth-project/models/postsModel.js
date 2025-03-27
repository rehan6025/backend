//Schema to store/manage user's posts requests

const { required } = require('joi')
const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title:{
        type:String,
        required: [true , 'title is required!'],
        trim:true
    },
    description:{
        type:String,
        required: [true , 'description is required!'],
        trim:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId
    }
    
})