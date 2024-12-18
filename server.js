const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());

let tasks = [];

// GET endpoint to fetch tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// POST endpoint to add a new task
app.post('/tasks', (req, res) => {
    const { task } = req.body;
    if (!task) {
      return res.status(400).json({ message: 'Please add a task' });
    }
    else{
        tasks.push(task);
        res.status(201).json({ message: 'Task has been added successfully' });
    }
  });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
