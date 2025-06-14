import React, { useState } from 'react';
import { XMarkIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import Logo from './Logo';

const ResetPasswordModal = () => {
  const { showResetModal, setShowResetModal, resetPassword, isLoading } = useAuth();
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!showResetModal) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError(language === 'th' ? 'กรุณากรอกอีเมล' : 'Please enter your email');
      return;
    }

    const result = await resetPassword(email);
    if (result.success) {
      setSuccess(result.message || (language === 'th' 
        ? 'ส่งลิงก์รีเซ็ตรหัสผ่านไปยังอีเมลแล้ว' 
        : 'Password reset link sent to your email'));
      setTimeout(() => {
        setShowResetModal(false);
        setSuccess('');
        setEmail('');
      }, 3000);
    } else {
      setError(result.error);
    }
  };

  const translations = {
    th: {
      title: 'รีเซ็ตรหัสผ่าน',
      subtitle: 'กรอกอีเมลของคุณเพื่อรับลิงก์รีเซ็ตรหัสผ่าน',
      email: 'อีเมล',
      send: 'ส่งลิงก์รีเซ็ต',
      backToLogin: 'กลับไปหน้าเข้าสู่ระบบ',
      checkEmail: 'กรุณาตรวจสอบอีเมลของคุณ'
    },
    en: {
      title: 'Reset Password',
      subtitle: 'Enter your email to receive a password reset link',
      email: 'Email',
      send: 'Send Reset Link',
      backToLogin: 'Back to Login',
      checkEmail: 'Please check your email'
    }
  };

  const txt = translations[language];

  return (
    <div className="modal-overlay">
      <div className="reset-modal">
        <button 
          className="modal-close"
          onClick={() => setShowResetModal(false)}
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="modal-content">
          <div className="modal-header">
            <Logo size="large" />
            <h2>{txt.title}</h2>
            <p>{txt.subtitle}</p>
          </div>

          {success ? (
            <div className="success-state">
              <div className="success-icon">
                <EnvelopeIcon className="w-16 h-16 text-green-500" />
              </div>
              <h3>{txt.checkEmail}</h3>
              <p className="success-message">{success}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="reset-form">
              <div className="form-group">
                <label htmlFor="reset-email">{txt.email}</label>
                <div className="input-with-icon">
                  <EnvelopeIcon className="input-icon" />
                  <input
                    type="email"
                    id="reset-email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    className={error ? 'error' : ''}
                    placeholder="example@email.com"
                    required
                  />
                </div>
                {error && <span className="error-text">{error}</span>}
              </div>

              <button 
                type="submit" 
                className="reset-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="loading-spinner" />
                ) : (
                  <>
                    <EnvelopeIcon className="w-5 h-5" />
                    {txt.send}
                  </>
                )}
              </button>
            </form>
          )}

          <div className="reset-footer">
            <button 
              onClick={() => {
                setShowResetModal(false);
                setError('');
                setSuccess('');
                setEmail('');
              }}
              className="back-btn"
            >
              {txt.backToLogin}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordModal;