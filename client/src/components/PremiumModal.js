import React, { useState } from 'react';
import { XMarkIcon, StarIcon, CheckIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import Logo from './Logo';

const PremiumModal = ({ isOpen, onClose, feature = null }) => {
  const { user, upgradePlan } = useAuth();
  const { language } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleUpgrade = async () => {
    setIsLoading(true);
    const result = await upgradePlan(selectedPlan);
    setIsLoading(false);
    
    if (result.success) {
      onClose();
      // Show success message
      alert(language === 'th' 
        ? 'อัพเกรดสำเร็จ! ตอนนี้คุณสามารถใช้ฟีเจอร์พิเศษได้แล้ว' 
        : 'Upgrade successful! You can now access premium features');
    }
  };

  const plans = {
    premium: {
      name: language === 'th' ? 'พรีเมียม' : 'Premium',
      price: 99,
      period: language === 'th' ? '/เดือน' : '/month',
      features: [
        language === 'th' ? '100 ไฟล์ต่อวัน' : '100 files per day',
        language === 'th' ? 'ไฟล์ขนาดสูงสุด 200MB' : 'Max file size 200MB',
        language === 'th' ? 'รวม/แยก PDF' : 'Merge/Split PDF',
        language === 'th' ? 'ใส่ลายน้ำ' : 'Add Watermark',
        language === 'th' ? 'ไม่มีโฆษณา' : 'No Ads',
        language === 'th' ? 'ประมวลผลเร็วขึ้น' : 'Faster Processing'
      ],
      popular: true
    },
    pro: {
      name: language === 'th' ? 'โปร' : 'Pro',
      price: 199,
      period: language === 'th' ? '/เดือน' : '/month',
      features: [
        language === 'th' ? 'ไฟล์ไม่จำกัด' : 'Unlimited files',
        language === 'th' ? 'ไฟล์ขนาดสูงสุด 500MB' : 'Max file size 500MB',
        language === 'th' ? 'ฟีเจอร์ทั้งหมด' : 'All features',
        language === 'th' ? 'ป้องกันด้วยรหัสผ่าน' : 'Password Protection',
        language === 'th' ? 'API Access' : 'API Access',
        language === 'th' ? 'การสนับสนุนลำดับความสำคัญ' : 'Priority Support'
      ],
      popular: false
    }
  };

  const translations = {
    th: {
      upgradeTitle: 'อัพเกรดเป็นสมาชิกพิเศษ',
      upgradeSubtitle: 'ปลดล็อกฟีเจอร์เพิ่มเติมและใช้งานได้ไม่จำกัด',
      featureBlocked: `ฟีเจอร์ "${feature}" ต้องการสมาชิกพิเศษ`,
      currentPlan: 'แผนปัจจุบัน',
      mostPopular: 'ยอดนิยม',
      selectPlan: 'เลือกแผน',
      upgradeNow: 'อัพเกรดเลย',
      freePlan: 'แผนฟรี',
      freeFeatures: [
        '10 ไฟล์ต่อวัน',
        'ไฟล์ขนาดสูงสุด 50MB',
        'ฟีเจอร์พื้นฐาน',
        'มีโฆษณา'
      ]
    },
    en: {
      upgradeTitle: 'Upgrade to Premium',
      upgradeSubtitle: 'Unlock more features and unlimited usage',
      featureBlocked: `"${feature}" feature requires premium membership`,
      currentPlan: 'Current Plan',
      mostPopular: 'Most Popular',
      selectPlan: 'Select Plan',
      upgradeNow: 'Upgrade Now',
      freePlan: 'Free Plan',
      freeFeatures: [
        '10 files per day',
        'Max file size 50MB',
        'Basic features',
        'With ads'
      ]
    }
  };

  const txt = translations[language];

  return (
    <div className="modal-overlay">
      <div className="premium-modal">
        <button 
          className="modal-close"
          onClick={onClose}
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="modal-content">
          <div className="modal-header">
            <Logo size="large" />
            <h2>{txt.upgradeTitle}</h2>
            <p>{txt.upgradeSubtitle}</p>
            {feature && (
              <div className="feature-blocked">
                <span>⚠️ {txt.featureBlocked}</span>
              </div>
            )}
          </div>

          <div className="plans-grid">
            {/* Free Plan (Current) */}
            <div className={`plan-card ${!user ? 'current' : user.plan === 'free' ? 'current' : ''}`}>
              <div className="plan-header">
                <h3>{txt.freePlan}</h3>
                <div className="plan-price">
                  <span className="price">฿0</span>
                  <span className="period">{language === 'th' ? '/เดือน' : '/month'}</span>
                </div>
                {(!user || user.plan === 'free') && (
                  <div className="current-badge">{txt.currentPlan}</div>
                )}
              </div>
              <ul className="plan-features">
                {txt.freeFeatures.map((feature, index) => (
                  <li key={index}>
                    <CheckIcon className="feature-icon" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Premium Plans */}
            {Object.entries(plans).map(([key, plan]) => (
              <div 
                key={key}
                className={`plan-card ${plan.popular ? 'popular' : ''} ${selectedPlan === key ? 'selected' : ''} ${user?.plan === key ? 'current' : ''}`}
                onClick={() => setSelectedPlan(key)}
              >
                {plan.popular && (
                  <div className="popular-badge">
                    <StarIcon className="w-4 h-4" />
                    {txt.mostPopular}
                  </div>
                )}
                
                <div className="plan-header">
                  <h3>{plan.name}</h3>
                  <div className="plan-price">
                    <span className="price">฿{plan.price}</span>
                    <span className="period">{plan.period}</span>
                  </div>
                  {user?.plan === key && (
                    <div className="current-badge">{txt.currentPlan}</div>
                  )}
                </div>
                
                <ul className="plan-features">
                  {plan.features.map((feature, index) => (
                    <li key={index}>
                      <CheckIcon className="feature-icon" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {user?.plan !== key && (
                  <button
                    className={`select-plan-btn ${selectedPlan === key ? 'selected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlan(key);
                    }}
                  >
                    {selectedPlan === key ? '✓ ' + txt.selectPlan : txt.selectPlan}
                  </button>
                )}
              </div>
            ))}
          </div>

          {user?.plan === 'free' && (
            <div className="upgrade-actions">
              <button 
                className="upgrade-btn"
                onClick={handleUpgrade}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="loading-spinner" />
                ) : (
                  <>
                    <CreditCardIcon className="w-5 h-5" />
                    {txt.upgradeNow} - ฿{plans[selectedPlan].price}{plans[selectedPlan].period}
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PremiumModal;