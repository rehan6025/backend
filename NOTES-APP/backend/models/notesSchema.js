const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
    text:{
        type: String,
        required: [true, 'Must enter content']
    }
})

module.exports = mongoose.model('notesModel',notesSchema)