const express = require('express');
const cors = require('cors');

const app = express();

const crud = require('./routes/crud');

app.use(cors());
app.use(express.json());

//settinn up the routes
app.use('/todos', crud);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(5000, () =>{
    console.log('Server is running on port 5000...');
})