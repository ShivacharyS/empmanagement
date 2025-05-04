import { createContext, useState, useEffect } from 'react';
import  jwt_decode  from 'jwt-decode';  // Updated import
import { login as apiLogin, logout as apiLogout } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const decoded = jwt_decode(token);  // Updated usage
          setUser(decoded.user);
        } catch (err) {
          console.error('Invalid token', err);
          logout();
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [token]);

  const login = async (username, password) => {
    const response = await apiLogin(username, password);
    localStorage.setItem('token', response.access);
    setToken(response.access);
    const decoded = jwt_decode(response.access);
    setUser(decoded.user);
    return decoded.user;
  };

  const logout = () => {
    apiLogout();
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};