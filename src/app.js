const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

/**
 * DATABASE CONNECTION
 * Logic: Only connect if we are NOT in a test environment.
 * This prevents the 'ECONNREFUSED' error in GitHub Actions.
 */
if (process.env.NODE_ENV !== 'test') {
    const mongoUri = process.env.MONGO_URL || 'mongodb://localhost:27017/tasksdb';

    mongoose.connect(mongoUri)
        .then(() => console.log("Connected to MongoDB successfully"))
        .catch(err => console.log("MongoDB connection error: ", err));
}

// Routes
const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);

// Base Health Check Route
app.get('/', (req, res) => {
    res.json({ message: "Task Manager API running (Lab 5 - Orchestration)" });
});

/**
 * SERVER INITIALIZATION
 * Only start the server if this file is run directly (node app.js).
 * Jest (testing) will import the 'app' object without starting the listener.
 */
if (require.main === module) {
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`API running on port ${PORT}`);
    });
}

// Export for the test suite
module.exports = app;

