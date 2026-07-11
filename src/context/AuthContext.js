import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const ADMIN_CREDENTIALS = {
  username: 'chaitrika',
  password: 'chaitrika@wrap'
};

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    const loginTime = localStorage.getItem('adminLoginTime');
    const currentTime = new Date().getTime();
    
    // Session expires after 24 hours
    if (adminStatus === 'true' && loginTime) {
      const timeDiff = currentTime - parseInt(loginTime);
      if (timeDiff < 24 * 60 * 60 * 1000) { // 24 hours in milliseconds
        setIsAdmin(true);
      } else {
        // Session expired
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('adminLoginTime');
      }
    }
  }, []);

  const login = (username, password) => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('adminLoginTime', new Date().getTime().toString());
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminLoginTime');
  };

  return (
    <AuthContext.Provider value={{
      isAdmin,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};