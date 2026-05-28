import { createContext, useState, useContext,useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

console.log('AuthProvider rendered');

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
  console.log('AuthProvider user changed to:', user);
  }, [user]);


  const login = async (email, password) => {
  console.log('Axios login called with:', email);
  try {
    const response = await api.post('/auth/login', { email, password });
    console.log('Axios response:', response);
    setUser(response.data.user);
    return response.data;
  } catch (err) {
    console.error('Axios error:', err);
    throw err;
  }
};

  
  const register = async (email, password, role = 'user') => {
    const response = await api.post('/auth/register', { email, password, role });
    setUser(response.data.user);
    return response.data;
  };

  const logout = async () => {
    await api.post('/auth/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};