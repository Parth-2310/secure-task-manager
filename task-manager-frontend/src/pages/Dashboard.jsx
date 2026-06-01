import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Link } from 'react-router-dom'

function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    const fetchTasks = async () => {
        try {
            const res = await api.get('/tasks');
            setTasks(res.data);
        } catch (err) {
            console.error('Error fetching tasks:', err);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await api.post('/tasks', { title, description });
            setTitle('');
            setDescription('');
            fetchTasks();
        } catch (err) {
            console.error('Error creating task:', err);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const handleDelete = async (taskId) => {
        try {
            await api.delete(`/tasks/${taskId}`);
            fetchTasks();
        } catch (err) {
            console.error('Error deleting task:', err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="min-h-screen bg-blue-100">
            <div className="max-w-4xl mx-auto p-6">
                {/* Header Section */}
                <div className="flex justify-between 
                    items-center bg-white p-4 rounded-lg shadow mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Welcome, {user?.email}!
                    </h1>
                    <div>
                    {user?.role === 'admin' && (
                    <Link to="/admin/users" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition mr-2">
                    Admin Dashboard
                    </Link>
                    )}
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 
                        text-white px-4 py-2 rounded-md transition"
                    >
                        Logout
                    </button>
                    </div>
                </div>

                {/* Task Creation Form */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      Create New Task</h2>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                placeholder="Task Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 
                                rounded-md focus:outline-none focus:ring-blue-500 
                                focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <input
                                type="text"
                                placeholder="Task description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 
                                rounded-md focus:outline-none focus:ring-blue-500 
                                focus:border-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 
                            py-2 rounded-md transition"
                        >
                            Add Task
                        </button>
                    </form>
                </div>

                {/* Tasks List Section */}
                <div className="bg-white rounded-lg shadow">
                    <h2 className="text-xl font-semibold text-gray-800 p-6 pb-2">Your Tasks</h2>
                    {tasks.length === 0 ? (
                        <p className="text-gray-500 p-6 pt-0">No tasks yet. Create one above!</p>
                    ) : (
                        <ul className="divide-y divide-gray-200">
                            {tasks.map((task) => (
                                <li key={task._id} className="p-6 hover:bg-gray-50 transition">
                                    {editingTaskId === task._id ? (
                                        /* Editing Mode Layout */
                                        <div className="space-y-3 w-full">
                                            <input
                                                type="text"
                                                value={editTitle}
                                                onChange={(e) => setEditTitle(e.target.value)}
                                                placeholder="Title"
                                                className="w-full px-3 py-2 border rounded-md"
                                            />
                                            <input
                                                type="text"
                                                value={editDescription}
                                                onChange={(e) => setEditDescription(e.target.value)}
                                                placeholder="Description"
                                                className="w-full px-3 py-2 border rounded-md"
                                            />
                                            <div className="flex gap-2">
                                                <button
                                                    className="bg-green-500 hover:bg-green-600 
                                                    text-white px-3 py-1 rounded transition text-sm"
                                                    onClick={async () => {
                                                        await api.put(`/tasks/${task._id}`, {
                                                            title: editTitle,
                                                            description: editDescription
                                                        });
                                                        setEditingTaskId(null);
                                                        fetchTasks();
                                                    }}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    className="bg-gray-300 hover:bg-gray-400 
                                                    text-gray-700 px-3 py-1 rounded transition text-sm"
                                                    onClick={() => setEditingTaskId(null)}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        /* View Mode Layout */
                                        <div className="flex justify-between items-center w-full">
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-800">
                                                    {task.title}
                                                </h3>
                                                {task.description && (
                                                    <p className="text-gray-600 mt-1">{task.description}</p>
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        setEditingTaskId(task._id);
                                                        setEditTitle(task.title);
                                                        setEditDescription(task.description || '');
                                                    }}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white 
                                                    px-3 py-1 rounded-md transition text-sm"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(task._id)}
                                                    className="bg-red-100 hover:bg-red-200 text-red-700 px-3 
                                                    py-1 rounded-md transition text-sm"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;