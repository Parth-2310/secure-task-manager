import { useEffect,useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom';

function AdminDashboard(){
    const { user } = useAuth();
    const [users,setUsers] = useState([]);
    const [loading,setLoading] = useState(true);

    const fetchUsers = async () => {
        try{
            const res = await api.get('/auth/admin/users');
            setUsers(res.data);
        }catch(err){
            console.error('Error fetching users:',err);
        }finally{
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchUsers();
    },[]);

    if (loading) {
        return <div className="p-6">Loading users...</div>;
    }


    return(
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <p className="mb-4">Logged in as: <strong>{user?.email}</strong> (Admin)</p>
            <h2 className="text-xl font-semibold mb-2">All Registered Users</h2>
            <Link to="/dashboard" className="inline-block mb-4 text-blue-600 hover:underline">
          ← Back to Dashboard
            </Link>
            <ul className="border rounded divide-y">
                
            </ul>
        </div>
    );
}

export default AdminDashboard;