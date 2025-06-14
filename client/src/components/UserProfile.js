import React, { useState } from 'react';
import { ChevronDownIcon, UserIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const { language } = useLanguage();
  const [showDropdown, setShowDropdown] = useState(false);

  if (!user) return null;

  const translations = {
    th: {
      profile: 'โปรไฟล์',
      settings: 'ตั้งค่า',
      logout: 'ออกจากระบบ',
      filesProcessed: 'ไฟล์ที่ประมวลผล',
      memberSince: 'สมาชิกตั้งแต่',
      freePlan: 'แผนฟรี'
    },
    en: {
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Logout',
      filesProcessed: 'Files Processed',
      memberSince: 'Member Since',
      freePlan: 'Free Plan'
    }
  };

  const txt = translations[language];

  return (
    <div className="user-profile">
      <button 
        className="profile-trigger"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <img 
          src={user.avatar} 
          alt={user.username}
          className="avatar"
        />
        <span className="username">{user.username}</span>
        <ChevronDownIcon className="chevron" />
      </button>

      {showDropdown && (
        <div className="profile-dropdown">
          <div className="dropdown-header">
            <img src={user.avatar} alt={user.username} className="avatar-large" />
            <div className="user-info">
              <h4>{user.username}</h4>
              <p>{user.email}</p>
              <span className="plan-badge">{txt.freePlan}</span>
            </div>
          </div>

          <div className="dropdown-stats">
            <div className="stat">
              <span className="stat-number">{user.filesProcessed}</span>
              <span className="stat-label">{txt.filesProcessed}</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {new Date(user.joinDate).toLocaleDateString(language === 'th' ? 'th-TH' : 'en-US')}
              </span>
              <span className="stat-label">{txt.memberSince}</span>
            </div>
          </div>

          <div className="dropdown-menu">
            <button className="menu-item">
              <UserIcon className="menu-icon" />
              {txt.profile}
            </button>
            <button className="menu-item">
              <Cog6ToothIcon className="menu-icon" />
              {txt.settings}
            </button>
            <button className="menu-item logout" onClick={logout}>
              <ArrowRightOnRectangleIcon className="menu-icon" />
              {txt.logout}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;