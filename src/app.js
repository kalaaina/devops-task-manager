const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Only connect to MongoDB if we are NOT running tests
// This allows GitHub Actions CI to pass even without a live MongoDB instance
if (process.env.NODE_ENV !== 'test') {
    const mongoUri = process.env.MONGO_URL || 'mongodb://localhost:27017/tasksdb';

    mongoose.connect(mongoUri)
        .then(() => console.log("Connected to MongoDB successfully"))
        .catch(err => console.log("MongoDB connection error: ", err));
}

const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);

// Base route
app.get('/', (req, res) => {
    res.json({ message: "Task Manager API running (Lab 5 - Orchestration)" });
});

// Only start the server if this file is run directly (not via Jest/testing)
if (require.main === module) {
    app.listen(3000, () => {
        console.log("API running on port 3000");
    });
}

// Export the app for testing
module.exports = app;

