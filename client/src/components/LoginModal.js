import React, { useState } from 'react';
import { XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import Logo from './Logo';

const LoginModal = () => {
  const { showLoginModal, setShowLoginModal, login, register } = useAuth();
  const { language } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  if (!showLoginModal) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = language === 'th' ? 'กรุณากรอกชื่อผู้ใช้' : 'Username is required';
    }
    
    if (!isLogin && !formData.email.trim()) {
      newErrors.email = language === 'th' ? 'กรุณากรอกอีเมล' : 'Email is required';
    }
    
    if (!formData.password) {
      newErrors.password = language === 'th' ? 'กรุณากรอกรหัสผ่าน' : 'Password is required';
    }
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = language === 'th' ? 'รหัสผ่านไม่ตรงกัน' : 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    const result = isLogin 
      ? await login(formData)
      : await register(formData);
    
    setIsLoading(false);
    
    if (!result.success) {
      setErrors({ submit: result.error });
    }
  };

  const translations = {
    th: {
      login: 'เข้าสู่ระบบ',
      register: 'สมัครสมาชิก',
      username: 'ชื่อผู้ใช้',
      email: 'อีเมล',
      password: 'รหัสผ่าน',
      confirmPassword: 'ยืนยันรหัสผ่าน',
      loginBtn: 'เข้าสู่ระบบ',
      registerBtn: 'สมัครสมาชิก',
      switchToRegister: 'ยังไม่มีบัญชี? สมัครสมาชิก',
      switchToLogin: 'มีบัญชีแล้ว? เข้าสู่ระบบ',
      welcome: 'ยินดีต้อนรับสู่',
      loginSubtitle: 'เข้าสู่ระบบเพื่อใช้งานฟีเจอร์พิเศษ',
      registerSubtitle: 'สมัครสมาชิกฟรีเพื่อใช้งานเต็มรูปแบบ',
      benefits: 'ประโยชน์ของสมาชิก',
      benefit1: '🚀 ประมวลผลไฟล์เร็วขึ้น',
      benefit2: '📊 ติดตามสถิติการใช้งาน',
      benefit3: '🔒 เก็บประวัติการทำงาน',
      benefit4: '⭐ ฟีเจอร์พิเศษเพิ่มเติม'
    },
    en: {
      login: 'Sign In',
      register: 'Sign Up',
      username: 'Username',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      loginBtn: 'Sign In',
      registerBtn: 'Sign Up',
      switchToRegister: "Don't have an account? Sign Up",
      switchToLogin: 'Already have an account? Sign In',
      welcome: 'Welcome to',
      loginSubtitle: 'Sign in to access premium features',
      registerSubtitle: 'Create a free account to get started',
      benefits: 'Member Benefits',
      benefit1: '🚀 Faster file processing',
      benefit2: '📊 Usage statistics tracking',
      benefit3: '🔒 History preservation',
      benefit4: '⭐ Premium features access'
    }
  };

  const txt = translations[language];

  return (
    <div className="modal-overlay">
      <div className="login-modal">
        <button 
          className="modal-close"
          onClick={() => setShowLoginModal(false)}
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="modal-content">
          <div className="modal-header">
            <Logo size="large" />
            <h2>{txt.welcome} {language === 'th' ? 'ไอแฮบPDF' : 'AI Hub PDF'}</h2>
            <p>{isLogin ? txt.loginSubtitle : txt.registerSubtitle}</p>
          </div>

          <div className="modal-body">
            <div className="auth-tabs">
              <button 
                className={`tab ${isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(true)}
              >
                {txt.login}
              </button>
              <button 
                className={`tab ${!isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(false)}
              >
                {txt.register}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="username">{txt.username}</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={errors.username ? 'error' : ''}
                  placeholder={`${txt.username}...`}
                />
                {errors.username && <span className="error-text">{errors.username}</span>}
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="email">{txt.email}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'error' : ''}
                    placeholder={`${txt.email}...`}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="password">{txt.password}</label>
                <div className="password-input">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={errors.password ? 'error' : ''}
                    placeholder={`${txt.password}...`}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">{txt.confirmPassword}</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={errors.confirmPassword ? 'error' : ''}
                    placeholder={`${txt.confirmPassword}...`}
                  />
                  {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                </div>
              )}

              {errors.submit && (
                <div className="error-message">
                  {errors.submit}
                </div>
              )}

              <button 
                type="submit" 
                className="auth-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="loading-spinner" />
                ) : (
                  isLogin ? txt.loginBtn : txt.registerBtn
                )}
              </button>
            </form>

            <div className="auth-switch">
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="switch-btn"
              >
                {isLogin ? txt.switchToRegister : txt.switchToLogin}
              </button>
            </div>

            {!isLogin && (
              <div className="benefits-section">
                <h4>{txt.benefits}</h4>
                <ul>
                  <li>{txt.benefit1}</li>
                  <li>{txt.benefit2}</li>
                  <li>{txt.benefit3}</li>
                  <li>{txt.benefit4}</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;