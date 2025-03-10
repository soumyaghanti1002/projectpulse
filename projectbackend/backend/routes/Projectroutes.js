const express = require('express');
const mongoose = require('mongoose');  

const Project = require('../Models/Project');

const router = express.Router();

//  Create a Project
router.post('/', async (req, res) => {
    try {
        const newProject = new Project(req.body);
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//  Get All Projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//  Get a Single Project
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//Update Project by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid project ID' });
        }

        console.log('Updating project with ID:', id);
        console.log('Request Body:', req.body);

        // Find and update project
        const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json(updatedProject);
    } catch (error) {
        console.error('PUT /projects/:id Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});
//Delete the project
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid project ID' });
        }

        console.log('Deleting project with ID:', id);

        // Find and delete project
        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('DELETE /projects/:id Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = router;