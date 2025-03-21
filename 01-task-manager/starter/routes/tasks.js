const express = require('express')
const router = express.Router();

//creating all logic functions in separate file to not make a mess here
const {
    getAllTasks, createTask, getTask, updateTask, deleteTask
} = require('../controllers/tasks')


router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)



module.exports = router