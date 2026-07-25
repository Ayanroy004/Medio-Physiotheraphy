import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { loginRequest, logoutRequest, fetchCurrentUser } from '../services/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      const token = localStorage.getItem('vitality_token');
      if (!token) {
        setUser(null);
        return;
      }
      const currentUser = await fetchCurrentUser();
      setUser(currentUser);
    } catch {
      localStorage.removeItem('vitality_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (credentials) => {
    const data = await loginRequest(credentials);
    localStorage.setItem('vitality_token', data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } finally {
      localStorage.removeItem('vitality_token');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
