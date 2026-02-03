import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/authService';
import { toast } from 'sonner';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const userData = await authService.getMe();
      setUser(userData);
    } catch (error) {
      console.log('Not authenticated');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      // Backend now sets the cookie, data contains user info
      setUser({ _id: data._id, name: data.name, email: data.email });
      toast.success('Login successful!');
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      const data = await authService.register(name, email, password);
      setUser({ _id: data._id, name: data.name, email: data.email });
      toast.success('Registration successful!');
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      throw error;
    }
  };

  const logout = async () => {
    // In a real app we might call a server endpoint to clear cookie: await authService.logout();
    // For now we just clear local state, but the cookie will persist unless we implement server-side logout 
    // OR we play a trick by sending a request to specific logout endpoint if exists.
    // Assuming we need to implement server side logout or handle cookie clearing.
    // Ideally: await authService.logout();
    setUser(null);
    // Force reload or manual cookie clearing if possible (cannot clear HttpOnly from client script).
    // Best practice: Add logout endpoint.
    try {
      await authService.logout();
    } catch (e) {
      console.error("Logout failed", e);
    }
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
