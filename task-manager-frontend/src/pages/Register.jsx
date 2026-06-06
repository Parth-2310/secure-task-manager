import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Register form submitted');
    setError('');
    try {
      await register(email, password);
      navigate('/dashboard');
    } catch (err) {
      const message = err.response?.data?.error || 'Registration failed';
      setError(message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-
      200/80 border border-slate-100 p-8 md:p-10">
      <div className='mb-8'>
        <h2 className='text-3xl font-bold tracking-tight text-slate-900'>
          Create an account
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          Get started with your premium task manager today.
        </p>
      </div>
        
      {error && (
        <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600 font-medium">
          ⚠️ {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Email:
          </label>
          <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 
              placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-4 
              focus:ring-slate-900/5 transition-all duration-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 
              placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-4 focus:ring-
              slate-900/5 transition-all duration-200
              required"
            />
          </div>
          <button type="submit"
                  className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold 
                  rounded-xl shadow-lg shadow-slate-900/10 hover:shadow-xl hover:shadow-slate-900/15 
                  transition-all duration-200 active:scale-[0.99] mt-2 text-sm">
            Create Account
          </button>
        </form>
        <p className="text-sm text-center text-slate-500 mt-6">
          Already have an account?{" "} 
          <a href="/login" className="font-semibold text-slate-900 hover:underline underline-offset-4">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;