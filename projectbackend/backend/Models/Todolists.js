const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },  // Each task has a title
    status: { type: String, enum: ['To-Do', 'In Progress', 'Done']}
}, { timestamps: true });

const TodolistSchema = new mongoose.Schema({
    title: { type: String, required: true },  // Title of the entire todo list
    tasks: [TaskSchema],  // Array of tasks
    createdBy: { type: mongoose.Schema.Types.ObjectId,required: true }
}, { timestamps: true });

module.exports = mongoose.model('Todolist', TodolistSchema);

