import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { adminApi } from '../utils/api';
import type { User } from '../types/cms';

interface AdminAuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  clearError: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const idTokenResult = await firebaseUser.getIdTokenResult();
        setToken(idTokenResult.token);
        
        const isUserAdmin = idTokenResult.claims.admin === true || firebaseUser.email === 'admin@assistroofing.com.au';
        
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || firebaseUser.email || 'Admin User',
          role: isUserAdmin ? 'admin' : 'editor',
          mustChangePassword: false
        });
      } else {
        setUser(null);
        setToken(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    try {
      await adminApi.login(email, password);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please verify your credentials.');
      setIsLoading(false);
      throw err;
    }
    // Auth state listener handles the rest
  };

  const logout = async () => {
    try {
      await adminApi.logout();
    } finally {
      setUser(null);
      setToken(null);
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      await adminApi.changePassword(currentPassword, newPassword);
      if (user) {
        setUser({ ...user, mustChangePassword: false });
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isAdmin: user?.role === 'admin',
        isLoading,
        error,
        login,
        logout,
        changePassword,
        clearError: () => setError(null)
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  return context;
};
