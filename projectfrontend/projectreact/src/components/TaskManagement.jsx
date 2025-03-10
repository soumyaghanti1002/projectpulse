import React, { useEffect, useState } from "react";

const TaskManagement = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '', status: 'To-Do' });
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/tasks");
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const handleAddTask = async () => {
        if (!newTask.title || !newTask.description) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask),
            });

            if (response.ok) {
                fetchTasks();
                setNewTask({ title: '', description: '', status: 'To-Do' });
            }
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const handleDeleteTask = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        if (!confirmDelete) return;

        try {
            await fetch(`http://localhost:5000/api/tasks/${id}`, {
                method: "DELETE",
            });
            fetchTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
    };

    const handleUpdateTask = async () => {
        if (!editingTask.title || !editingTask.description) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/tasks/${editingTask._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingTask),
            });

            if (response.ok) {
                fetchTasks();
                setEditingTask(null);
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'To-Do': return '#f44336';
            case 'In Progress': return '#ff9800';
            case 'Done': return '#4CAF50';
            default: return '#607d8b';
        }
    };

    return (
        <div style={{ padding: "50px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            <h1 style={{ textAlign: "center", marginBottom: "20px",paddingTop: "15px"}}>Task Management</h1>

            {/* Add Task Form */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    style={{ padding: "10px", width: "30%" }}
                />
                <input
                    type="text"
                    placeholder="Task Description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    style={{ padding: "10px", width: "40%" }}
                />
                <select
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                    style={{ padding: "10px" }}
                >
                    <option value="To-Do">To-Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
                <button onClick={handleAddTask} style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "white" }}>
                    Add Task
                </button>
            </div>

            {/* Task Columns */}
            <div style={{ display: "flex", gap: "20px" }}>
                {['To-Do', 'In Progress', 'Done'].map((status) => (
                    <div key={status} style={{ flex: 1 }}>
                        <h2 style={{ color: getStatusColor(status) }}>{status}</h2>
                        {tasks.filter(task => task.status === status).map(task => (
                            <div key={task._id} style={{
                                backgroundColor: "white",
                                borderRadius: "10px",
                                padding: "15px",
                                marginBottom: "10px",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
                            }}>
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <button onClick={() => handleEditTask(task)} style={{ backgroundColor: "#2196F3", color: "white" }}>Edit</button>
                                    <button onClick={() => handleDeleteTask(task._id)} style={{ backgroundColor: "#f44336", color: "white" }}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Edit Task Modal */}
            {editingTask && (
                <div style={{
                    position: "fixed",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <div style={{
                        backgroundColor: "white",
                        padding: "20px",
                        borderRadius: "10px",
                        width: "400px"
                    }}>
                        <h3>Edit Task</h3>
                        <input
                            type="text"
                            value={editingTask.title}
                            onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                            style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
                        />
                        <input
                            type="text"
                            value={editingTask.description}
                            onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                            style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
                        />
                        <button onClick={handleUpdateTask} style={{ backgroundColor: "#4CAF50", color: "white" }}>Update</button>
                        <button onClick={() => setEditingTask(null)} style={{ backgroundColor: "#f44336", color: "white" }}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskManagement;
