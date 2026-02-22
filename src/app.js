const express = require('express');
const app = express();
app.use(express.json());

const tasksRouter = require('./routes/tasks');

// Add this line to mount the tasks router at /tasks
app.use('/tasks', tasksRouter);

app.get('/', (req, res) => {
    res.json({ message: "Welcome from FEATURE branch" });
});

app.listen(3000, () => console.log("API running on port 3000"));
