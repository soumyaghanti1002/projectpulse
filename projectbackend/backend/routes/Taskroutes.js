const express = require('express');
const mongoose = require('mongoose');
const Task = require('../Models/Task'); 

const router = express.Router();

//  Create a Task
router.post('/', async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error('POST /api/tasks Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

//  Get All Tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.error('GET /api/tasks Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

//  Get a Single Task by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid task ID' });
        }

        const task = await Task.findById(id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        res.status(200).json(task);
    } catch (error) {
        console.error('GET /api/tasks/:id Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

//  Update a Task by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid task ID' });
        }

        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('PUT /api/tasks/:id Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

//  Delete a Task by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid task ID' });
        }

        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) return res.status(404).json({ message: 'Task not found' });

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('DELETE /api/tasks/:id Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = router;
