import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">เกี่ยวกับเรา</h1>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">ไอแฮบPDF</h2>
            <p className="text-lg text-gray-600">
              ระบบแปลงไฟล์ PDF ออนไลน์ที่ดีที่สุด
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">คุณสมบัติ</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• บีบอัด PDF ลดขนาดไฟล์</li>
                <li>• แปลง PDF เป็นรูปภาพ</li>
                <li>• รวมรูปภาพเป็น PDF</li>
                <li>• ใช้งานง่าย รวดเร็ว</li>
                <li>• ปลอดภัย 100%</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">ข้อมูลเพิ่มเติม</h3>
              <p className="text-gray-600 mb-4">
                ไอแฮบPDF พัฒนาขึ้นเพื่อให้ผู้ใช้งานสามารถจัดการไฟล์ PDF ได้อย่างสะดวก
                และรวดเร็ว โดยไม่ต้องติดตั้งโปรแกรมเพิ่มเติม
              </p>
              <p className="text-gray-600">
                เราให้ความสำคัญกับความปลอดภัยและความเป็นส่วนตัวของผู้ใช้งาน
                ไฟล์ทั้งหมดจะถูกลบออกจากเซิร์ฟเวอร์โดยอัตโนมัติ
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
