import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import logger from '../utils/logger';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole, additionalData?: any) => Promise<void>;
  logout: () => Promise<void>;
  updateRole: (newRole: UserRole) => Promise<void>;
  updateUserData: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  updateRole: async () => {},
  updateUserData: async () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const updateUserData = async (data: Partial<User>) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      const updatedUser = {
        ...user,
        ...data,
        updatedAt: new Date().toISOString()
      };

      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);

      logger.info('User data updated', { userId: user.id });
    } catch (error) {
      logger.error('Error updating user data', { error });
      throw new Error('Failed to update user data');
    }
  };

  const updateRole = async (newRole: UserRole) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      const updatedUser = {
        ...user,
        role: newRole,
        // Reset role-specific data
        specialization: newRole === 'lawyer' ? user.specialization : undefined,
        apiKeys: newRole === 'developer' ? user.apiKeys : undefined,
        updatedAt: new Date().toISOString()
      };

      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);

      logger.info('User role updated', { 
        userId: user.id, 
        oldRole: user.role, 
        newRole 
      });
    } catch (error) {
      logger.error('Error updating user role', { error });
      throw new Error('Failed to update role');
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    role: UserRole,
    additionalData?: any
  ) => {
    try {
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role,
        verified: false,
        createdAt: new Date().toISOString(),
        ...additionalData
      };

      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);

      logger.info('User registered', { userId: newUser.id, role });
    } catch (error) {
      logger.error('Error registering user', { error });
      throw new Error('Registration failed');
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        throw new Error('User not found');
      }

      const userData = JSON.parse(storedUser);
      if (userData.email !== email) {
        throw new Error('Invalid email or password');
      }

      setUser(userData);
      logger.info('User logged in', { userId: userData.id });
    } catch (error) {
      logger.error('Error logging in', { error });
      throw error;
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('user');
      setUser(null);
      logger.info('User logged out');
    } catch (error) {
      logger.error('Error logging out', { error });
      throw new Error('Logout failed');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      register, 
      logout, 
      updateRole,
      updateUserData
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;