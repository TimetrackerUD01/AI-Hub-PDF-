import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  DocumentArrowDownIcon, 
  PhotoIcon, 
  DocumentTextIcon,
  SparklesIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { BannerAd, InArticleAd } from '../components/AdSense';
import Logo from '../components/Logo';
import PremiumModal from '../components/PremiumModal';

const Home = () => {
  const { t, language } = useLanguage();
  const { user, getRemainingFiles, usage } = useAuth();
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const remainingFiles = getRemainingFiles();

  const seoTitle = language === 'th' 
    ? 'ไอแฮบPDF - ระบบแปลงไฟล์ PDF ออนไลน์ฟรี | บีบอัด แปลงรูป'
    : 'AI Hub PDF - Free Online PDF Tools | Compress, Convert, Merge';

  const seoDescription = language === 'th'
    ? 'ไอแฮบPDF เครื่องมือแปลงไฟล์ PDF ออนไลน์ฟรี บีบอัด PDF, แปลง PDF เป็นรูปภาพ, รวมรูปเป็น PDF ใช้งานง่าย รวดเร็ว ปลอดภัย 100%'
    : 'AI Hub PDF - Free online PDF tools. Compress PDF, convert PDF to images, merge images to PDF. Easy, fast, and 100% secure.';

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={t('seoKeywords')} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://aihub-pdf.onrender.com" />
        <link rel="alternate" hrefLang={language === 'th' ? 'en' : 'th'} href={`https://aihub-pdf.onrender.com?lang=${language === 'th' ? 'en' : 'th'}`} />
      </Helmet>

      <section className="hero">
        <div className="container">
          <Logo size="hero" className="fade-in-up" />
          <p className="fade-in-up">
            {t('heroSubtitle')}
            <br />
            {t('heroDescription')}
          </p>
          
          {/* Usage Indicator */}
          {user ? (
            <div className="usage-indicator fade-in-up">
              <div className="usage-text">
                {language === 'th' 
                  ? `ใช้งานวันนี้: ${usage.daily}/${user.plan === 'pro' ? '∞' : usage.daily + remainingFiles} ไฟล์`
                  : `Today's usage: ${usage.daily}/${user.plan === 'pro' ? '∞' : usage.daily + remainingFiles} files`
                }
              </div>
              {user.plan !== 'pro' && (
                <div className="usage-bar">
                  <div 
                    className="usage-fill" 
                    style={{ width: `${Math.min((usage.daily / (usage.daily + remainingFiles)) * 100, 100)}%` }}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="usage-indicator fade-in-up">
              <div className="usage-text">
                {language === 'th' 
                  ? `ผู้ใช้ทั่วไป: ${Math.max(0, 3 - usage.daily)}/3 ไฟล์ต่อวัน`
                  : `Anonymous users: ${Math.max(0, 3 - usage.daily)}/3 files per day`
                }
              </div>
              <div className="usage-bar">
                <div 
                  className="usage-fill" 
                  style={{ width: `${Math.min((usage.daily / 3) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}

          <Link to="/compress-pdf" className="btn btn-large fade-in-up">
            🚀 {t('startNow')}
          </Link>
        </div>
      </section>

      {/* Top Banner Ad */}
      <div className="container">
        <BannerAd 
          adSlot="1111111111"
          style={{ maxWidth: '728px', height: '90px', margin: '20px auto' }}
        />
      </div>

      <section className="container">
        <div className="features-grid">
          <div className="feature-card fade-in-up">
            <DocumentArrowDownIcon className="feature-icon" />
            <h3>{t('compressTitle')}</h3>
            <p>{t('compressDesc')}</p>
            <Link to="/compress-pdf" className="btn">
              {language === 'th' ? 'บีบอัดไฟล์' : 'Compress Now'} →
            </Link>
          </div>

          <div className="feature-card fade-in-up">
            <PhotoIcon className="feature-icon" />
            <h3>{t('pdfToImgTitle')}</h3>
            <p>{t('pdfToImgDesc')}</p>
            <Link to="/pdf-to-images" className="btn btn-secondary">
              {language === 'th' ? 'แปลงเป็นรูป' : 'Convert Now'} →
            </Link>
          </div>

          <div className="feature-card fade-in-up">
            <DocumentTextIcon className="feature-icon" />
            <h3>{t('imgToPdfTitle')}</h3>
            <p>{t('imgToPdfDesc')}</p>
            <Link to="/images-to-pdf" className="btn">
              {language === 'th' ? 'รวมรูปเป็น PDF' : 'Merge Images'} →
            </Link>
          </div>
        </div>

        {/* Premium Features Promotion */}
        {(!user || user.plan === 'free') && (
          <div className="upgrade-prompt fade-in-up">
            <div className="upgrade-prompt-text">
              <StarIcon className="w-5 h-5 inline mr-2" />
              {language === 'th' 
                ? 'อัพเกรดเป็นสมาชิกพิเศษเพื่อใช้งานได้ไม่จำกัด!'
                : 'Upgrade to Premium for unlimited usage!'
              }
            </div>
            <button 
              className="upgrade-prompt-btn"
              onClick={() => setShowPremiumModal(true)}
            >
              {language === 'th' ? 'ดูแผนสมาชิก' : 'View Plans'}
            </button>
          </div>
        )}

        {/* In-Article Ad */}
        <InArticleAd adSlot="2222222222" />

        <div className="feature-card fade-in-up" style={{marginTop: '3rem', textAlign: 'center'}}>
          <SparklesIcon className="feature-icon" />
          <h3>{t('whyChooseUs')}</h3>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '2rem'}}>
            <div>
              <h4>🔒 {t('secure')}</h4>
              <p>{t('secureDesc')}</p>
            </div>
            <div>
              <h4>⚡ {t('fast')}</h4>
              <p>{t('fastDesc')}</p>
            </div>
            <div>
              <h4>💰 {t('free')}</h4>
              <p>{t('freeDesc')}</p>
            </div>
            <div>
              <h4>📱 {t('responsive')}</h4>
              <p>{t('responsiveDesc')}</p>
            </div>
          </div>
        </div>

        {/* Bottom Banner Ad */}
        <BannerAd 
          adSlot="3333333333"
          style={{ maxWidth: '728px', height: '90px', margin: '40px auto' }}
        />
      </section>

      <PremiumModal 
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
      />
    </>
  );
};

export default Home;