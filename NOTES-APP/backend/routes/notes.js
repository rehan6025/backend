const express = require('express')
const router = express.Router();


const notesModel = require('../models/notesSchema');

const getNotes = async (req,res) => {
    try {
        const allNotes = await notesModel.find({});
        const formattedNotes = allNotes.map(note => ({
            _id: note._id.toString(),  // ✅ ObjectId ko string me convert karo
            text: note.text
        }));

       
        res.json(formattedNotes);  // ✅ Ab ye frontend pe JSON format me jayega
        

        
    } catch (error) { 
        res.status(500).json({msg : error})
    }
}
const createNote = async (req, res) => {
    try {
        await notesModel.create(req.body);

        // ✅ Naya note add hone ke baad updated list bhejo
        const allNotes = await notesModel.find({});
        const formattedNotes = allNotes.map(note => ({
            _id: note._id.toString(),
            text: note.text
        }));

        res.status(201).json(formattedNotes);
    } catch (error) { 
        res.status(500).json({ msg: error });
        console.log(error);
    }
};



router.route('/').get(getNotes).post(createNote)




module.exports = router