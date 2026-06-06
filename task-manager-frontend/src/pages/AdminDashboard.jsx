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
        <div className="flex min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased">

            <aside className="w-64 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col justify-between hidden md:flex">
                <div>
                    <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Navigation Panel</p>
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-emerald-500 text-zinc-950 flex items-center justify-center font-bold">
                            Ω
                        </div>
                        <span className="font-bold tracking-tight text-white">TaskVault</span>
                    </div>

                    <nav className="space-y-2">
                        {/* Link to User Dashboard */}
                        <Link to="/dashboard" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white transition">
                            📊 Overview
                        </Link>
                        
                        {/* Active Admin Link */}
                        <Link to="/admin/users" className="w-full flex items-center gap-3 bg-zinc-800 text-white px-3 py-2 rounded-lg text-sm border border-zinc-700/50">
                            🔑 Access Directory
                        </Link>
                    </nav>

                </div>
            
                <div className="text-xs text-zinc-500">
                    System: Active
                </div>
            </aside>

            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                <div className="p-6 max-w-4xl mx-auto space-y-6">
                    <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">Admin Dashboard</h1>
                    <p className="text-sm text-zinc-400 mt-1">Logged in as: <strong>{user?.email}</strong> (Admin)</p>
                    </div>

                    <div className="border border-dashed border-zinc-800 rounded-xl p-8 text-center text-zinc-500 text-sm">
                        Sidebar layout loaded successfully. Next step: We will build the user data table here.
                    </div>

                    
                    <h2 className="text-xl font-semibold mb-2">All Registered Users</h2>
                    <Link to="/dashboard" className="inline-block mb-4 text-blue-600 hover:underline">
                ← Back to Dashboard
                    </Link>
                    <ul className="border rounded divide-y">
                        
                    </ul>
                </div>
            </main>
        </div>
    );
}

export default AdminDashboard;