const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({ error: 'Title required' });
    }
    if (title.length > 100) {
      return res.status(400).json({ error: 'Title too long' });
    }
 
    const task = new Task({
      title: title.trim(),
      description: description ? description.trim() : '',
      completed: completed || false,
      user: req.user.id
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/',authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


router.delete('/:taskId', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.taskId,
      user: req.user.id
    });
    if (!task) {
      return res.status(404).json({ error: 'Task not found or not yours' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:taskId', authMiddleware, async (req, res) => {
  try {
    const { title, description, completed } = req.body; 
    const taskId = req.params.taskId;

    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (completed !== undefined) updateData.completed = completed;

    const task  = await Task.findOneAndUpdate(
      { _id: taskId, user: req.user.id },
      updateData,
      { new: true ,runValidators: true}
    );

     if (!task) {
      return res.status(404).json({ error: 'Task not found or not yours' });
    }

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;