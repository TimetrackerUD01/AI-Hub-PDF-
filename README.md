# ไอแฮบPDF - ระบบแปลงไฟล์ PDF ออนไลน์

![AI Hub PDF](https://img.shields.io/badge/AI%20Hub-PDF-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## 📋 รายละเอียด

ไอแฮบPDF เป็นระบบแปลงไฟล์ PDF ออนไลน์ที่ทำงานได้รวดเร็วและปลอดภัย พัฒนาด้วย React และ Node.js

## ✨ คุณสมบัติ

- 🗜️ **บีบอัด PDF** - ลดขนาดไฟล์ PDF โดยไม่สูญหายคุณภาพ
- 🖼️ **แปลง PDF เป็นรูปภาพ** - แปลงหน้า PDF เป็นไฟล์ PNG หรือ JPG
- 📄 **รวมรูปภาพเป็น PDF** - รวมรูปภาพหลายไฟล์เป็น PDF เดียว
- 🔒 **ความปลอดภัย** - ไฟล์จะถูกลบออกจากเซิร์ฟเวอร์โดยอัตโนมัติ
- 🌐 **รองรับภาษาไทย** - Interface และข้อความเป็นภาษาไทย
- 📱 **Responsive Design** - ใช้งานได้ทั้งเดสก์ท็อปและมือถือ

## 🚀 เทคโนโลยี

### Frontend
- React 18.x
- React Router DOM
- Tailwind CSS
- Framer Motion
- Axios
- React Dropzone

### Backend
- Node.js & Express
- PDF-lib
- pdf2pic
- Jimp
- Multer
- Helmet (Security)
- CORS
- Rate Limiting

## 📦 การติดตั้ง

### ข้อกำหนดเบื้องต้น
- Node.js 18.x หรือสูงกว่า
- NPM หรือ Yarn

### ขั้นตอนการติดตั้ง

1. **Clone repository**
   ```bash
   git clone https://github.com/TimetrackerUD01/AI-Hub-PDF-.git
   cd AI-Hub-PDF-
   ```

2. **ติดตั้ง dependencies**
   ```bash
   # ติดตั้ง dependencies หลัก
   npm install
   
   # ติดตั้ง dependencies สำหรับ server
   cd server
   npm install
   
   # ติดตั้ง dependencies สำหรับ client
   cd ../client
   npm install
   ```

3. **รันในโหมดพัฒนา**
   ```bash
   # กลับไปที่ root directory
   cd ..
   
   # รันทั้ง client และ server พร้อมกัน
   npm run dev
   ```

   หรือรันแยกกัน:
   ```bash
   # รัน server (Terminal 1)
   cd server
   npm start
   
   # รัน client (Terminal 2)
   cd client
   npm start
   ```

4. **เข้าใช้งาน**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🔧 การตั้งค่า Environment

สร้างไฟล์ `.env` ในโฟลเดอร์ `server` (ถ้าจำเป็น):

```env
NODE_ENV=development
PORT=5000
RENDER_EXTERNAL_URL=http://localhost:5000
```

## 📖 API Documentation

### Health Check
```
GET /health
GET /ping
```

### PDF Operations
```
POST /api/compress-pdf
- Body: multipart/form-data
- Field: pdf (file)

POST /api/pdf-to-images
- Body: multipart/form-data
- Field: pdf (file)

POST /api/images-to-pdf
- Body: multipart/form-data
- Field: images (files)
```

## 🚀 การ Deploy

### Render.com
```bash
# ใช้ไฟล์ render.yaml ที่มีอยู่แล้ว
```

### Heroku
```bash
# ใช้ script heroku-postbuild ที่กำหนดไว้แล้ว
```

## 🧪 การทดสอบ

```bash
# รัน tests (ถ้ามี)
npm test

# ตรวจสอบ code quality
npm run lint
```

## 📁 โครงสร้างโปรเจ็กต์

```
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   └── ...
│   └── package.json
├── server/                 # Node.js backend
│   ├── server.js          # Main server file
│   └── package.json
├── render.yaml            # Render deployment config
└── package.json           # Root package.json
```

## 🤝 การมีส่วนร่วม

1. Fork repository
2. สร้าง feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add some AmazingFeature'`)
4. Push ไปยัง branch (`git push origin feature/AmazingFeature`)
5. เปิด Pull Request

## 📝 License

โปรเจ็กต์นี้ใช้ MIT License - ดูรายละเอียดใน [LICENSE](LICENSE) file

## 🙏 ขอบคุณ

- [PDF-lib](https://pdf-lib.js.org/) - สำหรับการจัดการ PDF
- [React](https://reactjs.org/) - สำหรับ frontend framework
- [Express](https://expressjs.com/) - สำหรับ backend framework

## 📞 ติดต่อ

- GitHub: [TimetrackerUD01](https://github.com/TimetrackerUD01)
- Project Link: [https://github.com/TimetrackerUD01/AI-Hub-PDF-](https://github.com/TimetrackerUD01/AI-Hub-PDF-)

---

⭐ หากโปรเจ็กต์นี้มีประโยชน์ กรุณากด Star ให้กับเรา!
