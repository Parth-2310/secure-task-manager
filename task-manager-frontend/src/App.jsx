import {Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path ="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path ="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
    <Route path ="/admin/users" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
  </Routes>
  );
}

export default App;