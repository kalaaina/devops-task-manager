const express = require('express');
const app = express();

app.use(express.json());

const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);

// Add a fallback string so it doesn't crash when MONGO_URL is missing (like in CI)
const mongoUri = process.env.MONGO_URL || 'mongodb://localhost:27017/tasksdb';

mongoose.connect(mongoUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("MongoDB connection error: ", err));

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

