import { User, UserRole } from '../../types';

// In-memory storage for demo
const users: Map<string, User> = new Map();

export const registerUser = async (
  email: string,
  password: string,
  name: string,
  role: UserRole,
  additionalData?: any
): Promise<User> => {
  // Check if user exists
  if (users.has(email)) {
    throw new Error('User already exists');
  }

  const user: User = {
    id: Math.random().toString(36).substr(2, 9),
    email,
    name,
    role,
    verified: role === 'developer',
    createdAt: new Date().toISOString(),
    ...additionalData
  };

  users.set(email, user);
  localStorage.setItem('currentUser', JSON.stringify(user));
  return user;
};

export const loginUser = async (email: string, password: string): Promise<User> => {
  const user = users.get(email);
  if (!user) {
    throw new Error('User not found');
  }

  localStorage.setItem('currentUser', JSON.stringify(user));
  return user;
};

export const logoutUser = async (): Promise<void> => {
  localStorage.removeItem('currentUser');
};

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const userStr = localStorage.getItem('currentUser');
    resolve(userStr ? JSON.parse(userStr) : null);
  });
};