import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Dashboard() {
    const { user ,logout} = useAuth();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

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
      try{
        await api.post('/tasks',{title, description});
        setTitle('');
        setDescription('');
        fetchTasks();
      }
      catch(err){
        console.error('Error creating task:', err);
      }
    };

    const handleLogout = async() => {
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

    return( 
    <div className="min-h-screen bg-blue-100">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {user?.email}!
          </h1>
          <button 
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Task</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input 
              type = "text"
              placeholder = "Task Title"
              value = {title}
              onChange ={(e) => setTitle(e.target.value)}
              required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input 
              type = "text"
              placeholder="Task description"
              value = {description}
              onChange ={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
              focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button 
              type = "submit" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
              >
              Add Task
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 p-6 pb-2">Your Tasks</h2>
          {tasks.length === 0 ? (
            <p className="text-gray-500 p-6 pt-0">No tasks yet. Create one above!</p>
          ): (
            <ul className="divide-y divide-gray-200">
              {tasks.map((task) => (
                <li key={task._id} className="p-6 hover:bg-gray-50 transition" 
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="text-gray-600 mt-1">{task.description}</p>
                      )}
                    </div>
                    <button onClick={() => console.log('Edit task:', task._id)}>Edit</button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-md transition text-sm"
                      >
                      Delete
                    </button>
                  </div>
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