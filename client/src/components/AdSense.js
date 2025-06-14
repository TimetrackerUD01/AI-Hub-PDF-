import React, { useEffect } from 'react';

// Banner Ad Component
export const BannerAd = ({ 
  adSlot = "1234567890", 
  adFormat = "auto", 
  responsive = true,
  style = {}
}) => {
  useEffect(() => {
    try {
      if (window.adsbygoogle && window.adsbygoogle.length === 0) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.log('AdSense error:', error);
    }
  }, []);

  return (
    <div className="ad-container" style={{ margin: '20px 0', textAlign: 'center', ...style }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client="ca-pub-1797172064583364"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={responsive}
      />
    </div>
  );
};

// Sidebar Ad Component
export const SidebarAd = ({ adSlot = "2345678901" }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.log('AdSense error:', error);
    }
  }, []);

  return (
    <div className="sidebar-ad">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1797172064583364"
        data-ad-slot={adSlot}
        data-ad-format="rectangle"
      />
    </div>
  );
};

// In-Article Ad Component
export const InArticleAd = ({ adSlot = "3456789012" }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.log('AdSense error:', error);
    }
  }, []);

  return (
    <div className="in-article-ad" style={{ margin: '30px 0', textAlign: 'center' }}>
      <div style={{ fontSize: '12px', color: '#999', marginBottom: '10px' }}>
        Advertisement
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client="ca-pub-1797172064583364"
        data-ad-slot={adSlot}
        data-ad-format="fluid"
        data-ad-layout-key="-6t+ed+2i-1n-4w"
      />
    </div>
  );
};

// ads.txt content
export const adsContent = `google.com, pub-1797172064583364, DIRECT, f08c47fec0942fa0`;