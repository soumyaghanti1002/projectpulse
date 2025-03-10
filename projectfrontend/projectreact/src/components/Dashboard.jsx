import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaSun, FaMoon, FaHome, FaSignOutAlt, FaTimes } from "react-icons/fa";
import "./Dashboard.css";

function Dashboard() {
    const [darkMode, setDarkMode] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    // Toggle Dark Mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle("dark-mode");
    };

    // Toggle Sidebar
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Navigate Functions
    const goToHome = () => navigate("/home");
    const goToProjects = () => navigate("/projects");
    const goToTasks = () => navigate("/tasks");
    const goToTodoLists = () => navigate("/todolists");

    // Logout Function
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        sessionStorage.clear();
        navigate("/login");
    };

    return (
        <div className={`dashboard ${darkMode ? "dark" : ""}`}>
            {/* Navbar */}
            <nav className="navbar">
                <div className="left-section">
                    <FaBars className="menu-icon" onClick={toggleSidebar} />
                    <h1 className="dashboard-title">Dashboard</h1>
                </div>
                <div className="right-section">
                    <span className="project-management-title">Project Pulse</span>
                    <FaHome className="nav-icon" title="Home" onClick={goToHome} />
                    <button className="dark-mode-toggle" onClick={toggleDarkMode}>
                        {darkMode ? <FaSun title="Light Mode" /> : <FaMoon title="Dark Mode" />}
                    </button>
                    <button className="logout-btn" onClick={handleLogout}>
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </nav>

            {/* Sidebar */}
            <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
                <FaTimes className="close-icon" onClick={toggleSidebar} />
                <div className="sidebar-menu">
                    <button className="sidebar-btn" onClick={goToProjects}>Projects</button>
                    <button className="sidebar-btn" onClick={goToTasks}>Tasks</button>
                    <button className="sidebar-btn" onClick={goToTodoLists}>To-Do Lists</button>
                </div>
            </div>

            {/* Main Content */}
            <div className="content">
                <h2>Welcome to the Dashboard!</h2>
                <p>Here is your project and task management overview.</p>
            </div>
        </div>
    );
}

export default Dashboard;
