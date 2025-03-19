let { todos } = require('../data.js');
const express = require('express');
const router = express.Router();

//get all todos
router.get('/', (req, res) => {
    res.status(200).json(todos);
});

//post a new todo
router.post('/', (req, res) => {
    const { title } = req.body;
    console.log(req.body);


    if (!title) {
        return res.status(400).json({ msg: 'title is required' });
    }

    const id = todos.length + 1;
    const newTodo = { id, title, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo)
});

//update a todo
router.put('/:id', (req, res) => {
    const { id } = req.params
    const { title, completed } = req.body
    const todo = todos.find((t) => t.id == id)


    if (!todo) res.status(404).json({ error: "Todo not found" });

    todo.title = title
    todo.completed = completed

    res.json(todo)
})

//deleting a todo
router.delete('/:id' , (req,res)=>{
    const {id} = req.params
    todos = todos.filter((t)=> t.id != id)

    console.log(todos);
    
    res.json(todos)
})


module.exports = router;
