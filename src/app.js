const express = require('express');
const app = express();

app.use(express.json());

const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Only ONE response for "/"
app.get('/', (req, res) => {
  res.json({ message: "Task Manager API running (Lab2)" });
});

// Only start the server if this file is run directly
if (require.main === module) {
  app.listen(3000, () => console.log("API running on port 3000"));
}

// Export the app for testing
module.exports = app;

