const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

const Task = mongoose.model('Task', { title: String, completed: Boolean });

router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.status(201).json(newTask);
});

module.exports = router;
