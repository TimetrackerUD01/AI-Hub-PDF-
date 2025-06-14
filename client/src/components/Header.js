import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, GlobeAltIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';
import UserProfile from './UserProfile';
import LoginModal from './LoginModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { language, t, switchLanguage } = useLanguage();
  const { user, setShowLoginModal } = useAuth();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.language-switcher')) {
        setIsLangMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      <header className="header">
        <div className="container">
          <Link to="/" className="logo-link">
            <Logo size="normal" />
          </Link>
          
          <nav className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>{t('home')}</Link>
            <Link to="/compress-pdf" onClick={() => setIsMenuOpen(false)}>{t('compressPDF')}</Link>
            <Link to="/pdf-to-images" onClick={() => setIsMenuOpen(false)}>{t('pdfToImages')}</Link>
            <Link to="/images-to-pdf" onClick={() => setIsMenuOpen(false)}>{t('imagesToPDF')}</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>{t('about')}</Link>
          </nav>

          <div className="header-actions">
            {/* Language Switcher */}
            <div className="language-switcher">
              <button 
                className="lang-btn"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              >
                <GlobeAltIcon className="w-5 h-5" />
                <span>{language.toUpperCase()}</span>
              </button>
              
              {isLangMenuOpen && (
                <div className="lang-dropdown">
                  <button 
                    onClick={() => {
                      switchLanguage('th');
                      setIsLangMenuOpen(false);
                    }}
                    className={language === 'th' ? 'active' : ''}
                  >
                    🇹🇭 ไทย
                  </button>
                  <button 
                    onClick={() => {
                      switchLanguage('en');
                      setIsLangMenuOpen(false);
                    }}
                    className={language === 'en' ? 'active' : ''}
                  >
                    🇺🇸 English
                  </button>
                </div>
              )}
            </div>

            {/* User Authentication */}
            {user ? (
              <UserProfile />
            ) : (
              <button 
                className="login-btn"
                onClick={() => setShowLoginModal(true)}
              >
                <UserPlusIcon className="w-5 h-5" />
                <span>{language === 'th' ? 'เข้าสู่ระบบ' : 'Sign In'}</span>
              </button>
            )}

            <button 
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      <LoginModal />
    </>
  );
};

export default Header;