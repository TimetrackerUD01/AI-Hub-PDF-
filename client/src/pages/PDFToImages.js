import React from 'react';

const PDFToImages = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">แปลง PDF เป็นรูปภาพ</h1>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-center text-gray-600 mb-4">
            แปลงหน้า PDF เป็นรูปภาพ PNG หรือ JPG
          </p>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-500">คุณสมบัตินี้กำลังพัฒนา...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFToImages;
