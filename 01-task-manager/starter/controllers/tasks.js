const Task = require('../models/Task') // Task model import kiya jo DB se interact karega

// Get all tasks from database
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({}) // Sare tasks DB se fetch karo
        res.status(200).json({ tasks }) // 200 status (OK) ke sath tasks return karo
    } catch (error) {
        res.status(500).json({ msg: error }) // 500 status (Server error) agar kuch gadbad ho jaye
    }
}

// Create a new task
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body) 
        res.status(201).json({ task }) 
    } catch (error) {
        res.status(500).json({ msg: error }) 
    }
}

// Get a single task by ID
const getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task = await Task.findOne({ _id: taskID }) 

        if (!task) {
            return res.status(404).json({ msg: `No task with id: ${taskID}` }) 
        }

        res.status(200).json({ task }) 
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

// Update an existing task
const updateTask = async (req, res) => {
    try {
        const { id: taskID } = req.params // URL se task ka ID nikala

        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
            new: true, // Updated task return karega
            runValidators: true, // Validation rules apply hongi
        })

        if (!task) {
            return res.status(404).json({ msg: `No task with id: ${taskID}` }) 
        }

        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ msg: error }) 
    }
}

// Delete a task
const deleteTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task = await Task.findOneAndDelete({ _id: taskID }) 

        if (!task) {
            return res.status(404).json({ msg: `No task with id: ${taskID}` }) 
        }

        res.status(200).json({ msg: "Task deleted successfully!" }) 
    } catch (error) {
        res.status(500).json({ msg: error }) 
    }
}

// Sare functions ko export kar diya taki routes me use ho sake
module.exports = {
    getAllTasks, createTask, getTask, updateTask, deleteTask
}
