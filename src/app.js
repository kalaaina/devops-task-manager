const express = require('express');
const app = express();
app.use(express.json());

const tasksRouter = require('./routes/tasks');

// Add this line to mount the tasks router at /tasks
app.use('/tasks', tasksRouter);

app.get('/', (req, res) => {
<<<<<<< HEAD
  res.json({ message: "Welcome from MAIN branch" });
=======
    res.json({ message: "Task Manager API running (Lab2)" });
>>>>>>> feature/routes-refactor
});

app.listen(3000, () => console.log("API running on port 3000"));
