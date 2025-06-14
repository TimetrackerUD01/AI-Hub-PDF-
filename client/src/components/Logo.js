import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Logo = ({ size = 'normal', showText = true, className = '', variant = 'default' }) => {
  const { language } = useLanguage();
  
  const logoSizes = {
    small: { icon: 'w-8 h-8', text: 'text-sm', container: 'gap-2' },
    normal: { icon: 'w-10 h-10', text: 'text-lg', container: 'gap-2' },
    large: { icon: 'w-16 h-16', text: 'text-2xl', container: 'gap-3' },
    hero: { icon: 'w-32 h-32', text: 'text-5xl', container: 'gap-4' }
  };

  const currentSize = logoSizes[size];
  const brandName = language === 'th' ? 'ไอแฮบ' : 'AI Hub';

  return (
    <div className={`logo-container ${currentSize.container} ${className}`}>
      {/* AI Hub PDF Logo Icon */}
      <div className={`logo-icon ${currentSize.icon} ${variant}`}>
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full drop-shadow-lg"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Glow */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            {/* Gradients */}
            <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#667eea" />
              <stop offset="50%" stopColor="#764ba2" />
              <stop offset="100%" stopColor="#f093fb" />
            </linearGradient>
            
            <linearGradient id="documentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f8f9ff" />
            </linearGradient>
            
            <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd700" />
              <stop offset="100%" stopColor="#ffed4e" />
            </linearGradient>
          </defs>

          {/* Main Circle Background */}
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="url(#mainGradient)"
            filter="url(#glow)"
            className="logo-bg"
          />
          
          {/* Inner Shadow Circle */}
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
          />

          {/* PDF Document */}
          <g className="pdf-document">
            {/* Document Background */}
            <rect
              x="35"
              y="25"
              width="35"
              height="50"
              rx="4"
              ry="4"
              fill="url(#documentGradient)"
              stroke="rgba(102,126,234,0.2)"
              strokeWidth="1"
            />
            
            {/* Document Corner Fold */}
            <polygon
              points="65,25 65,35 75,35"
              fill="rgba(102,126,234,0.1)"
            />
            <line x1="65" y1="25" x2="65" y2="35" stroke="rgba(102,126,234,0.3)" strokeWidth="1"/>
            <line x1="65" y1="35" x2="75" y2="35" stroke="rgba(102,126,234,0.3)" strokeWidth="1"/>
            
            {/* Document Text Lines */}
            <line x1="40" y1="40" x2="65" y2="40" stroke="#667eea" strokeWidth="2" strokeLinecap="round" />
            <line x1="40" y1="45" x2="60" y2="45" stroke="#667eea" strokeWidth="2" strokeLinecap="round" />
            <line x1="40" y1="50" x2="65" y2="50" stroke="#667eea" strokeWidth="2" strokeLinecap="round" />
            <line x1="40" y1="55" x2="55" y2="55" stroke="#764ba2" strokeWidth="2" strokeLinecap="round" />
            
            {/* PDF Text */}
            <text x="52.5" y="68" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#667eea">
              PDF
            </text>
          </g>

          {/* AI Elements */}
          <g className="ai-elements">
            {/* AI Brain/Chip */}
            <rect
              x="75"
              y="45"
              width="20"
              height="15"
              rx="3"
              fill="url(#aiGradient)"
              className="ai-chip"
            />
            
            {/* Chip Details */}
            <line x1="78" y1="48" x2="92" y2="48" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5"/>
            <line x1="78" y1="52" x2="92" y2="52" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5"/>
            <line x1="78" y1="56" x2="92" y2="56" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5"/>
            
            {/* Connection Lines */}
            <line x1="75" y1="52.5" x2="70" y2="52.5" stroke="#ffd700" strokeWidth="2" strokeLinecap="round"/>
            
            {/* AI Sparkles/Particles */}
            <g className="sparkles">
              <circle cx="85" cy="35" r="2" fill="#ffd700" opacity="0.8">
                <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
                <animate attributeName="r" values="2;1.5;2" dur="2s" repeatCount="indefinite" />
              </circle>
              
              <circle cx="95" cy="40" r="1.5" fill="#ffed4e" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.5s" repeatCount="indefinite" />
              </circle>
              
              <circle cx="90" cy="70" r="1" fill="#ffd700" opacity="0.7">
                <animate attributeName="opacity" values="0.7;0.2;0.7" dur="1.8s" repeatCount="indefinite" />
              </circle>
              
              {/* Moving Particles */}
              <circle cx="30" cy="30" r="1" fill="rgba(255,215,0,0.5)">
                <animateMotion dur="4s" repeatCount="indefinite" path="M0,0 Q20,10 40,0 T80,0" />
                <animate attributeName="opacity" values="0;0.8;0" dur="4s" repeatCount="indefinite" />
              </circle>
            </g>
          </g>

          {/* Processing Arrows */}
          <g className="processing-arrows" opacity="0.6">
            <path
              d="M25,80 Q35,75 45,80"
              stroke="#667eea"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            >
              <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
            </path>
            
            <polygon
              points="43,78 47,80 43,82"
              fill="#667eea"
            >
              <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
            </polygon>
          </g>
        </svg>
      </div>
      
      {/* Brand Text */}
      {showText && (
        <div className={`logo-text ${currentSize.text}`}>
          <div className="brand-container">
            <span className="brand-main">{brandName}</span>
            <span className="brand-sub">PDF</span>
          </div>
          {size === 'hero' && (
            <div className="brand-tagline">
              {language === 'th' 
                ? 'เครื่องมือ PDF ที่ขับเคลื่อนด้วย AI'
                : 'AI-Powered PDF Tools'
              }
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;