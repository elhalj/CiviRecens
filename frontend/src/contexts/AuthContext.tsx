import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginCredentials, RegisterData } from '../types/auth';

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication
    const mockUser: User = {
      id: '1',
      email: credentials.email,
      firstName: credentials.email === 'institution@gov.fr' ? 'Institution' : 'Jean',
      lastName: credentials.email === 'institution@gov.fr' ? 'Gouvernementale' : 'Dupont',
      role: credentials.email === 'institution@gov.fr' ? 'institution' : 'citizen',
      isRegistered: true
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    setIsLoading(false);
    return true;
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: 'citizen',
      isRegistered: false
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};