import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const PLAN_LIMITS = {
  free: {
    dailyFiles: 10,
    maxFileSize: 50, // MB
    features: ['compress', 'pdf-to-images', 'images-to-pdf']
  },
  premium: {
    dailyFiles: 100,
    maxFileSize: 200, // MB
    features: ['compress', 'pdf-to-images', 'images-to-pdf', 'merge-pdf', 'split-pdf', 'watermark', 'password-protect']
  },
  pro: {
    dailyFiles: -1, // unlimited
    maxFileSize: 500, // MB
    features: ['all']
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [usage, setUsage] = useState({ daily: 0, total: 0, lastReset: new Date().toDateString() });

  useEffect(() => {
    // Check for saved user data
    const savedUser = localStorage.getItem('aihub_user');
    const savedUsage = localStorage.getItem('aihub_usage');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    if (savedUsage) {
      const parsedUsage = JSON.parse(savedUsage);
      // Reset daily count if it's a new day
      const today = new Date().toDateString();
      if (parsedUsage.lastReset !== today) {
        setUsage({ daily: 0, total: parsedUsage.total, lastReset: today });
        localStorage.setItem('aihub_usage', JSON.stringify({ daily: 0, total: parsedUsage.total, lastReset: today }));
      } else {
        setUsage(parsedUsage);
      }
    }
    
    setIsLoading(false);
  }, []);

  const register = async (userData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newUser = {
        id: 'user_' + Date.now(),
        username: userData.username,
        email: userData.email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.username)}&background=667eea&color=fff&size=128`,
        plan: 'free',
        joinDate: new Date().toISOString(),
        subscription: {
          plan: 'free',
          startDate: new Date().toISOString(),
          endDate: null,
          autoRenew: false
        },
        preferences: {
          language: 'th',
          notifications: true,
          theme: 'light'
        }
      };
      
      setUser(newUser);
      localStorage.setItem('aihub_user', JSON.stringify(newUser));
      setShowLoginModal(false);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const mockUser = {
        id: 'user_' + Date.now(),
        username: credentials.username,
        email: credentials.email || `${credentials.username}@example.com`,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(credentials.username)}&background=764ba2&color=fff&size=128`,
        plan: 'free',
        joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
        subscription: {
          plan: 'free',
          startDate: new Date().toISOString(),
          endDate: null,
          autoRenew: false
        }
      };
      
      setUser(mockUser);
      localStorage.setItem('aihub_user', JSON.stringify(mockUser));
      setShowLoginModal(false);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real app, send reset email
      console.log('Password reset email sent to:', email);
      
      setShowResetModal(false);
      setShowLoginModal(false);
      return { success: true, message: 'Password reset email sent!' };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aihub_user');
  };

  const canProcessFile = (fileSize = 0) => {
    if (!user) {
      // Anonymous users get limited access
      return usage.daily < 3; // 3 files per day for non-members
    }
    
    const limits = PLAN_LIMITS[user.plan];
    const fileSizeMB = fileSize / (1024 * 1024);
    
    if (limits.dailyFiles === -1) return true; // unlimited
    if (fileSizeMB > limits.maxFileSize) return false;
    if (usage.daily >= limits.dailyFiles) return false;
    
    return true;
  };

  const updateUsage = () => {
    const today = new Date().toDateString();
    const newUsage = {
      daily: usage.lastReset === today ? usage.daily + 1 : 1,
      total: usage.total + 1,
      lastReset: today
    };
    
    setUsage(newUsage);
    localStorage.setItem('aihub_usage', JSON.stringify(newUsage));
    
    if (user) {
      const updatedUser = { ...user };
      setUser(updatedUser);
      localStorage.setItem('aihub_user', JSON.stringify(updatedUser));
    }
  };

  const upgradePlan = async (planType) => {
    if (!user) return { success: false, error: 'Please login first' };
    
    const updatedUser = {
      ...user,
      plan: planType,
      subscription: {
        ...user.subscription,
        plan: planType,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        autoRenew: true
      }
    };
    
    setUser(updatedUser);
    localStorage.setItem('aihub_user', JSON.stringify(updatedUser));
    return { success: true };
  };

  const getRemainingFiles = () => {
    if (!user) return 3 - usage.daily; // Anonymous limit
    
    const limits = PLAN_LIMITS[user.plan];
    if (limits.dailyFiles === -1) return -1; // unlimited
    return Math.max(0, limits.dailyFiles - usage.daily);
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    resetPassword,
    logout,
    upgradePlan,
    canProcessFile,
    updateUsage,
    getRemainingFiles,
    usage,
    planLimits: PLAN_LIMITS,
    showLoginModal,
    setShowLoginModal,
    showResetModal,
    setShowResetModal
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};