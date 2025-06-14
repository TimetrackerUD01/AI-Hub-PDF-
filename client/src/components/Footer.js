import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-blue-400 mb-2">ไอแฮบPDF</h3>
          <p className="text-gray-400">ระบบแปลงไฟล์ PDF ออนไลน์ที่ดีที่สุด</p>
        </div>
        
        <div className="border-t border-gray-700 pt-4">
          <p className="text-gray-400">
            © 2025 ไอแฮบPDF. All rights reserved. | 
            <span className="ml-2">Made with ❤️ in Thailand</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
