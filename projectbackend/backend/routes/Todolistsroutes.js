const express = require('express');
const mongoose = require('mongoose');
const Todolist = require('../Models/Todolists');  // Ensure correct file path

const router = express.Router();

//  Create a new Todo List
router.post('/', async (req, res) => {
    try {
        const { title, tasks, createdBy } = req.body;

        // Ensure tasks is an array
        const taskList = tasks && Array.isArray(tasks) ? tasks : [];

        const newTodolist = new Todolist({
            title,
            tasks: taskList,
            createdBy
        });

        await newTodolist.save();
        res.status(201).json(newTodolist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//  Get all Todo Lists
router.get('/', async (req, res) => {
    try {
        const todolists = await Todolist.find();
        res.status(200).json(todolists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//  Get a specific Todo List by ID
router.get('/:id', async (req, res) => {
    try {
        const todolist = await Todolist.findById(req.params.id);
        if (!todolist) return res.status(404).json({ message: 'Todolist not found' });
        res.status(200).json(todolist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//  Update a Todo List by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, tasks } = req.body;

        // Validate ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Todolist ID' });
        }

        // Update the Todo List
        const updatedTodolist = await Todolist.findByIdAndUpdate(
            id,
            { title, tasks },
            { new: true, runValidators: true }
        );

        if (!updatedTodolist) {
            return res.status(404).json({ message: 'Todolist not found' });
        }

        res.status(200).json(updatedTodolist);
    } catch (error) {
        console.error('PUT /todolists/:id Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

//  Delete a Todo List by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedTodolist = await Todolist.findByIdAndDelete(req.params.id);
        if (!deletedTodolist) return res.status(404).json({ message: 'Todolist not found' });
        res.status(200).json({ message: 'Todolist deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;