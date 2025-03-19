const { json } = require('body-parser');
const express = require('express');
const router = express.Router();

//modify - adding fs
const fs = require('fs')

//function to read todos
const readTodos = () => {
    try {
        const data = fs.readFileSync('../data.json', "utf8")
        return JSON.parse(data)
    } catch (error) {
        return [];
    }
}

//function to write todos
const writeTodos = (data) => {
    fs.writeFileSync('../data.json', JSON.stringify(data, null, 2))
}



//get all todos
router.get('/', (req, res) => {
    const todos = readTodos();
    res.status(200).json(todos);
});

//post a new todo
router.post('/', (req, res) => {
    const todos = readTodos()
    const { title } = req.body;
    console.log(req.body);


    if (!title) {
        return res.status(400).json({ msg: 'title is required' });
    }

    const id = todos.length + 1;
    const newTodo = { id, title, completed: false };
    todos.push(newTodo)
    writeTodos(todos)
    res.status(201).json(newTodo)
});

//update a todo
router.put('/:id', (req, res) => {
    let todos = readTodos();
    const { id } = req.params;
    const { title, completed } = req.body;
    const todoIndex = todos.findIndex((t) => t.id == id);

    if (todoIndex === -1) return res.status(404).json({ error: "Todo not found" });

    if (title !== undefined) todos[todoIndex].title = title;
    if (completed !== undefined) todos[todoIndex].completed = completed;

    writeTodos(todos);
    res.json(todos[todoIndex]);

})

//deleting a todo
router.delete('/:id', (req, res) => {
    let todos = readTodos();
    const { id } = req.params
    todos = todos.filter((t) => t.id != id)

    console.log(todos);
    writeTodos(todos)
    res.json({message : "todo deleted successfully"})
})


module.exports = router;
