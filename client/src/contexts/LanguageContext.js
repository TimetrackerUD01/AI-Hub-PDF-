import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  th: {
    // Navigation
    home: 'หน้าแรก',
    compressPDF: 'บีบอัด PDF',
    pdfToImages: 'PDF เป็นรูป',
    imagesToPDF: 'รูปเป็น PDF',
    about: 'เกี่ยวกับเรา',
    
    // Hero Section
    heroTitle: 'ไอแฮบPDF',
    heroSubtitle: 'ระบบแปลงไฟล์ PDF ออนไลน์ที่ทรงพลัง ใช้งานฟรี ปลอดภัย และรวดเร็ว',
    heroDescription: 'บีบอัด PDF, แปลง PDF เป็นรูปภาพ, รวมรูปเป็น PDF ได้ทุกที่ทุกเวลา',
    startNow: 'เริ่มใช้งานทันที',
    
    // Features
    compressTitle: 'บีบอัด PDF',
    compressDesc: 'ลดขนาดไฟล์ PDF ได้สูงสุด 90% โดยไม่สูญเสียคุณภาพ พร้อมแสดงอัตราการบีบอัด',
    pdfToImgTitle: 'PDF เป็นรูปภาพ',
    pdfToImgDesc: 'แปลงทุกหน้าใน PDF เป็นรูปภาพ PNG หรือ JPG คุณภาพสูง พร้อมดาวน์โหลดทีละไฟล์',
    imgToPdfTitle: 'รูปภาพเป็น PDF',
    imgToPdfDesc: 'รวมรูปภาพหลายไฟล์เป็น PDF เดียว เรียงลำดับได้ตามต้องการ',
    
    // Why Choose Us
    whyChooseUs: 'ทำไมต้องเลือก ไอแฮบPDF?',
    secure: 'ปลอดภัย 100%',
    secureDesc: 'ไฟล์จะถูกลบทิ้งอัตโนมัติหลังจากประมวลผลเสร็จ',
    fast: 'รวดเร็วทันใจ',
    fastDesc: 'ประมวลผลไฟล์ขนาดใหญ่ได้ในเวลาไม่กี่วินาที',
    free: 'ใช้งานฟรี',
    freeDesc: 'ไม่มีค่าใช้จ่าย ไม่ต้องสมัครสมาชิก',
    responsive: 'ใช้ได้ทุกอุปกรณ์',
    responsiveDesc: 'รองรับมือถือ แท็บเล็ต และคอมพิวเตอร์',
    
    // Upload
    dragDrop: 'คลิกหรือลากไฟล์มาที่นี่',
    dropHere: 'วางไฟล์ที่นี่',
    maxSize: 'รองรับไฟล์ขนาดไม่เกิน 50MB',
    processing: 'กำลังประมวลผล...',
    success: 'สำเร็จ!',
    download: 'ดาวน์โหลด',
    
    // Errors
    error: 'ข้อผิดพลาด',
    selectFile: 'กรุณาเลือกไฟล์',
    invalidFile: 'ไฟล์ไม่ถูกต้อง',
    
    // SEO Keywords
    seoKeywords: 'บีบอัด PDF, แปลง PDF, PDF to image, image to PDF, ไอแฮบPDF, PDF converter, PDF compressor'
  },
  en: {
    // Navigation
    home: 'Home',
    compressPDF: 'Compress PDF',
    pdfToImages: 'PDF to Images',
    imagesToPDF: 'Images to PDF',
    about: 'About',
    
    // Hero Section
    heroTitle: 'AI Hub PDF',
    heroSubtitle: 'Powerful Online PDF Tools - Free, Secure & Fast',
    heroDescription: 'Compress PDF, Convert PDF to Images, Merge Images to PDF anywhere, anytime',
    startNow: 'Get Started Now',
    
    // Features
    compressTitle: 'Compress PDF',
    compressDesc: 'Reduce PDF file size up to 90% without quality loss. Shows compression ratio in real-time.',
    pdfToImgTitle: 'PDF to Images',
    pdfToImgDesc: 'Convert every PDF page to high-quality PNG or JPG images with individual download options.',
    imgToPdfTitle: 'Images to PDF',
    imgToPdfDesc: 'Combine multiple images into a single PDF file with custom ordering.',
    
    // Why Choose Us
    whyChooseUs: 'Why Choose AI Hub PDF?',
    secure: '100% Secure',
    secureDesc: 'Files are automatically deleted after processing is complete',
    fast: 'Lightning Fast',
    fastDesc: 'Process large files in seconds with our optimized algorithms',
    free: 'Completely Free',
    freeDesc: 'No charges, no registration required',
    responsive: 'Works Everywhere',
    responsiveDesc: 'Compatible with mobile, tablet, and desktop devices',
    
    // Upload
    dragDrop: 'Click or drag files here',
    dropHere: 'Drop files here',
    maxSize: 'Maximum file size: 50MB',
    processing: 'Processing...',
    success: 'Success!',
    download: 'Download',
    
    // Errors
    error: 'Error',
    selectFile: 'Please select a file',
    invalidFile: 'Invalid file type',
    
    // SEO Keywords
    seoKeywords: 'compress PDF, PDF converter, PDF to image, image to PDF, online PDF tools, PDF compressor, free PDF tools'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // ตรวจสอบภาษาจาก localStorage หรือ browser language
    const savedLang = localStorage.getItem('language');
    if (savedLang) return savedLang;
    
    const browserLang = navigator.language.toLowerCase();
    return browserLang.includes('th') ? 'th' : 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => {
    return translations[language][key] || key;
  };

  const switchLanguage = (lang) => {
    setLanguage(lang);
  };

  const value = {
    language,
    t,
    switchLanguage,
    isThaiLang: language === 'th'
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};