import React, { useEffect, useState } from "react";

const ProjectManagement = () => {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({ name: '', description: '' });
    const [editingProject, setEditingProject] = useState(null);

    // Fetch Projects from MongoDB
    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/projects");
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    // Handle Add Project
    const handleAddProject = async () => {
        if (!newProject.name || !newProject.description) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProject),
            });

            if (response.ok) {
                fetchProjects();
                setNewProject({ name: '', description: '' });
            }
        } catch (error) {
            console.error("Error adding project:", error);
        }
    };

    // Handle Delete Project
    const handleDeleteProject = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this project?");
        if (!confirmDelete) return;

        try {
            await fetch(`http://localhost:5000/api/projects/${id}`, {
                method: "DELETE",
            });
            fetchProjects();
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    // Handle Edit Button Click
    const handleEditProject = (project) => {
        setEditingProject(project);
    };

    // Handle Update Project
    const handleUpdateProject = async () => {
        if (!editingProject.name || !editingProject.description) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/projects/${editingProject._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingProject),
            });

            if (response.ok) {
                fetchProjects();
                setEditingProject(null);
            }
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    return (
        <div style={{ padding: "40px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Project Management</h1>

            {/* Add Project Form */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Project Title"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    style={{ padding: "10px", width: "30%" }}
                />
                <input
                    type="text"
                    placeholder="Project Description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    style={{ padding: "10px", width: "40%" }}
                />
                <button onClick={handleAddProject} style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "white" }}>
                    Add Project
                </button>
            </div>

            {/* Project Table */}
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ backgroundColor: "#f0f0f0", textAlign: "left" }}>
                        <th style={{ padding: "10px" }}>Project Name</th>
                        <th style={{ padding: "10px" }}>Description</th>
                        <th style={{ padding: "10px" }}>Edit</th>
                        <th style={{ padding: "10px" }}>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project._id} style={{ borderBottom: "1px solid #ddd" }}>
                            <td style={{ padding: "10px" }}>
                                {editingProject && editingProject._id === project._id ? (
                                    <input
                                        type="text"
                                        value={editingProject.name}
                                        onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                                    />
                                ) : (
                                    project.name
                                )}
                            </td>
                            <td style={{ padding: "10px" }}>
                                {editingProject && editingProject._id === project._id ? (
                                    <input
                                        type="text"
                                        value={editingProject.description}
                                        onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                                    />
                                ) : (
                                    project.description
                                )}
                            </td>
                            <td style={{ padding: "10px" }}>
                                {editingProject && editingProject._id === project._id ? (
                                    <button
                                        onClick={handleUpdateProject}
                                        style={{ backgroundColor: "#4CAF50", color: "white", padding: "5px 10px" }}>
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleEditProject(project)}
                                        style={{ backgroundColor: "#FF9800", color: "white", padding: "5px 10px" }}>
                                        Edit
                                    </button>
                                )}
                            </td>
                            <td style={{ padding: "10px" }}>
                                <button
                                    onClick={() => handleDeleteProject(project._id)}
                                    style={{ backgroundColor: "#F44336", color: "white", padding: "5px 10px" }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectManagement;
