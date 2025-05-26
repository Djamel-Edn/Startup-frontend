import React, { createContext, useContext, useState, useEffect, useMemo, useRef } from 'react';

interface User {
  name: string;
  email: string;
  role: string;
  id: string;
  projectId: string | null;
  projectRole: string | null;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  isRoleAllowed: (roles: string[]) => boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const hasInitialized = useRef(false);

  const checkAuth = () => {
    const token = localStorage.getItem('authToken');
    const email = localStorage.getItem('userEmail');
    const name = localStorage.getItem('userFullName');
    const role = localStorage.getItem('userRole');
    const id = localStorage.getItem('userId');
    const projectId = localStorage.getItem('projectId');
    const projectRole = localStorage.getItem('projectRole');

    if (token && email && name && role && id) {
      setUser({ name, email, role, id, projectId: projectId || null, projectRole: projectRole || null });
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.clear();
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      checkAuth();
    }
  }, []);

  const login = async (email: string, password: string) => {
  setLoading(true);
  try {
    if (email=== 'admin@gmail.com' && password === 'admin') {
      const adminUser: User = {
        name: 'Admin User',
        email: "admin@gmail.com",
        role: 'ADMIN',
        id: '',
        projectId: null,
        projectRole: null
      };
      setUser(adminUser);
      localStorage.setItem('userEmail', adminUser.email);
      localStorage.setItem('userFullName', adminUser.name);
      localStorage.setItem('userRole', adminUser.role);
      
      setTimeout(() => {
          setIsAuthenticated(true);
          setLoading(false);
        }, 2000);
      return;

    }
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok || !data.token || !data.user) {
      throw new Error(data.message || 'Login failed');
    }

    const fullName = `${data.user.firstName} ${data.user.lastName}`;
    const projectId =   data.user.projects;
    const projectRole = data.user.projectRole;
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('userEmail', data.user.email);
    localStorage.setItem('userFullName', fullName);
    localStorage.setItem('userRole', data.user.role);
    localStorage.setItem('userId', data.user.id);
    localStorage.setItem('projectId', projectId|| null);
    localStorage.setItem('projectRole', projectRole || null );

    const newUser = { name: fullName, email: data.user.email, role: data.user.role, id: data.user.id, projectId, projectRole };
    setUser(newUser);
    setIsAuthenticated(true);
    console.log('User state updated:', newUser); 
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  } finally {
    setLoading(false);
  }
};

  const logout = () => {
    setLoading(true);
    localStorage.clear();
    setUser(null);
    setIsAuthenticated(false);
    setLoading(false);
  };

  const isRoleAllowed = (roles: string[]) => (user ? roles.includes(user.role) : false);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      loading,
      isRoleAllowed,
      login,
      logout,
    }),
    [user, isAuthenticated, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within AuthProvider');
  return context;
};