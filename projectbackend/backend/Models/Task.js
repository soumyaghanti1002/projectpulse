const mongoose = require('mongoose');
 
const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    status: { type: String, enum: ['To-Do', 'In Progress', 'Done'] },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);  
