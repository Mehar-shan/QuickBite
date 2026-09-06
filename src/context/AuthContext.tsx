import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: 'customer' | 'manager' | 'admin';
  phone?: string;
  address?: string;
  city?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isManager: boolean;
  loginAsCustomer: (name?: string, email?: string) => void;
  loginAsManager: () => void;
  register: (name: string, email: string, phone: string, address: string) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register' | 'manager_login';
  setAuthModalMode: (mode: 'login' | 'register' | 'manager_login') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('quickbite_user');
      return saved
        ? JSON.parse(saved)
        : {
            uid: 'usr-customer-1',
            name: 'Sarah Jenkins',
            email: 'sarah.j@example.com',
            role: 'customer',
            phone: '(212) 555-0145',
            address: '128 W 44th St, Apt 6C',
            city: 'New York',
          };
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'manager_login'>('login');

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('quickbite_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('quickbite_user');
      }
    } catch {
      // ignore
    }
  }, [user]);

  const loginAsCustomer = (name = 'Sarah Jenkins', email = 'sarah.j@example.com') => {
    const customerUser: UserProfile = {
      uid: `cust-${Date.now()}`,
      name,
      email,
      role: 'customer',
      phone: '(212) 555-0145',
      address: '128 W 44th St, Apt 6C',
      city: 'New York',
    };
    setUser(customerUser);
    setIsAuthModalOpen(false);
  };

  const loginAsManager = () => {
    const managerUser: UserProfile = {
      uid: 'mgr-admin-01',
      name: 'Manager Robert Bell',
      email: 'manager@quickbite.com',
      role: 'manager',
      phone: '(212) 555-7890',
      address: 'QuickBite Branch #01',
      city: 'New York',
    };
    setUser(managerUser);
    setIsAuthModalOpen(false);
  };

  const register = (name: string, email: string, phone: string, address: string) => {
    const newUser: UserProfile = {
      uid: `cust-${Date.now()}`,
      name,
      email,
      role: 'customer',
      phone,
      address,
      city: 'New York',
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isManager: user?.role === 'manager' || user?.role === 'admin',
        loginAsCustomer,
        loginAsManager,
        register,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
