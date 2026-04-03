import { createContext, useContext, useState, useCallback } from 'react';
import { getSession, saveSession, login as authLogin, register as authRegister, logout as authLogout, updateProfile as authUpdateProfile } from '../services/auth.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getSession());

  const login = useCallback(async (credentials) => {
    const session = await authLogin(credentials);
    setUser(session);
    return session;
  }, []);

  const register = useCallback(async (data) => {
    const session = await authRegister(data);
    setUser(session);
    return session;
  }, []);

  const logout = useCallback(() => {
    authLogout();
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (data) => {
    const session = await authUpdateProfile({ ...data, id: user.id });
    setUser(session);
    return session;
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
