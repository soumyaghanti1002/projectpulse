import React, { useState, useEffect } from 'react';

export default function TodoList() {
    const [todolistTitle, setTodolistTitle] = useState('');
    const [taskTitle, setTaskTitle] = useState('');
    const [status, setStatus] = useState('To-Do');
    const [tasks, setTasks] = useState([]);
    const [todolists, setTodolists] = useState([]);

    // ✅ [1] Automatically Fetch Todolists From MongoDB (useEffect)
    useEffect(() => {
        fetch('http://localhost:5000/api/todolists')
            .then((res) => res.json())
            .then((data) => setTodolists(data))
            .catch((err) => console.error('Error fetching todolists:', err));
    }, []);

    // ✅ [2] Handle Add Task
    const handleAddTask = () => {
        if (taskTitle.trim() === '') {
            alert('Task title cannot be empty!');
            return;
        }

        const newTask = {
            title: taskTitle,
            status: status
        };

        setTasks([...tasks, newTask]);
        setTaskTitle('');
    };

    // ✅ [3] Handle Add Todolist (POST Request to MongoDB)
    const handleAddTodolist = async () => {
        if (todolistTitle.trim() === '') {
            alert('Todolist title cannot be empty!');
            return;
        }

        const newTodolist = {
            title: todolistTitle,
            tasks: tasks,
            createdBy: "65f0420fc360fe6a5b223c58"  // ✅ Temporary Hardcoded User ID
        };

        // Send POST Request to MongoDB
        try {
            const response = await fetch('http://localhost:5000/api/todolists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTodolist)
            });

            const data = await response.json();
            setTodolists([...todolists, data]);

            // ✅ Reset the form after submitting
            setTodolistTitle('');
            setTasks([]);
        } catch (error) {
            console.error('Error adding todolist:', error);
        }
    };

    // ✅ [4] Handle Delete Todolist (MongoDB DELETE Request)
    const handleDeleteTodolist = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/todolists/${id}`, {
                method: 'DELETE'
            });

            // ✅ Remove the Todolist from the state
            setTodolists(todolists.filter((todolist) => todolist._id !== id));
        } catch (error) {
            console.error('Error deleting todolist:', error);
        }
    };

    return (
        <div style={{ padding: '30px', backgroundColor: 'white', height: '100vh', color: 'black' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}> Todolists</h2>

            {/* ✅ Add New Todolist */}
            <div style={{
                backgroundColor: 'white', color: 'black', padding: '20px', borderRadius: '8px', maxWidth: '600px', margin: '0 auto'
            }}>
                <h4><strong>Add New Todolist</strong></h4>
                <input
                    type="text"
                    placeholder="Todolist Title"
                    value={todolistTitle}
                    onChange={(e) => setTodolistTitle(e.target.value)}
                    style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                />
                <input
                    type="text"
                    placeholder="Task Title"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    style={{ width: '70%', padding: '10px' }}
                />
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    style={{ padding: '10px', marginLeft: '10px' }}
                >
                    <option value="To-Do">To-Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
                <br /><br />
                <button
                    onClick={handleAddTask}
                    style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px' }}
                >
                    + Add Task
                </button>
                <button
                    onClick={handleAddTodolist}
                    style={{ backgroundColor: '#28a745', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', marginLeft: '10px' }}
                >
                    ✅ Add Todolist
                </button>
            </div>

            {/* ✅ Display All Todolists */}
            <h4 style={{ textAlign: 'center', marginTop: '40px' }}> All Todolists</h4>
            {todolists.map((todolist) => (
                <div key={todolist._id} style={{
                    backgroundColor: 'white', color: 'black', padding: '20px', borderRadius: '8px', maxWidth: '600px', margin: '10px auto'
                }}>
                    <h5><strong>{todolist.title}</strong></h5>

                    {/* ✅ NOW THE TASKS WILL BE VISIBLE */}
                    {todolist.tasks.length > 0 ? (
                        todolist.tasks.map((task, i) => (
                            <div key={i} style={{
                                borderBottom: '1px solid #e0e0e0', padding: '5px 0'
                            }}>
                                <strong>{task.title}</strong> - <span>{task.status}</span>
                            </div>
                        ))
                    ) : (
                        <p style={{ color: 'gray' }}>No Tasks Added</p>
                    )}

                    <button
                        onClick={() => handleDeleteTodolist(todolist._id)}
                        style={{ backgroundColor: '#dc3545', color: 'white', padding: '8px 15px', border: 'none', borderRadius: '4px', marginTop: '10px' }}
                    >
                        ❌ Delete Todolist
                    </button>
                </div>
            ))}
        </div>
    );
}
