import { createContext, useEffect, useMemo, useState } from 'react';
import authService from '../services/authService.js';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ user: null });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('authUser');
    if (user) {
      setAuth({ user: JSON.parse(user) });
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    if (response?.user) {
      localStorage.setItem('authUser', JSON.stringify(response.user));
      setAuth({ user: response.user });
    }
    return response;
  };

  const register = async (signUpData) => {
    const response = await authService.register(signUpData);
    if (response?.user) {
      localStorage.setItem('authUser', JSON.stringify(response.user));
      setAuth({ user: response.user });
    }
    return response;
  };

  const logout = () => {
    localStorage.removeItem('authUser');
    setAuth({ user: null });
    window.location.href = '/auth/login';
  };

  const value = useMemo(
    () => ({ auth, isAuthenticated: Boolean(auth?.user), isLoading, login, register, logout }),
    [auth, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
