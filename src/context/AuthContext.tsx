import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  bio?: string;
  followers: number;
  following: number;
  posts: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string, fullName: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock user database
const mockUsers: { [key: string]: User & { password: string } } = {
  'john@example.com': {
    id: '1',
    email: 'john@example.com',
    password: 'password123',
    username: 'johndoe',
    fullName: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    followers: 1234,
    following: 567,
    posts: 42,
    bio: 'Living life to the fullest 🌟'
  },
  'sarah@example.com': {
    id: '2',
    email: 'sarah@example.com',
    password: 'password123',
    username: 'sarahwilson',
    fullName: 'Sarah Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    followers: 2345,
    following: 890,
    posts: 156,
    bio: 'Travel enthusiast 🌎 | Photographer 📸'
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for saved session
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUser = mockUsers[email];
      if (!mockUser || mockUser.password !== password) {
        throw new Error('Invalid email or password');
      }

      const { password: _, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, username: string, fullName: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (mockUsers[email]) {
        throw new Error('Email already exists');
      }

      const newUser = {
        id: String(Object.keys(mockUsers).length + 1),
        email,
        password,
        username,
        fullName,
        avatar: `https://images.unsplash.com/photo-${Math.random()}?w=100&h=100&fit=crop`,
        followers: 0,
        following: 0,
        posts: 0,
        bio: ''
      };

      mockUsers[email] = newUser;
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}