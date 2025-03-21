const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name:{
        type: String,     // Name ek string hoga
        required: [true, 'Must provide name'],  // Name required hai
        trim: true,       // Extra spaces remove karega
        maxlength: [20, 'Name cannot be more than 20 characters']
    },
    completed:{
        type: Boolean,   // Task complete hai ya nahi (true/false)
        default: false   // Default false rakha hai
    },

})

module.exports = mongoose.model('Task',TaskSchema)