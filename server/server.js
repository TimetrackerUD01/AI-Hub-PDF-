const express = require('express');
const multer = require('multer');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const cron = require('node-cron');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const pdf2pic = require('pdf2pic');
const Jimp = require('jimp');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// File upload configuration
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('ไฟล์ไม่ถูกต้อง กรุณาอัปโหลด PDF หรือรูปภาพเท่านั้น'));
    }
  }
});

// Keep alive ping endpoint
app.get('/ping', (req, res) => {
  res.json({ 
    status: 'alive', 
    timestamp: new Date().toISOString(),
    message: 'ไอแฮบPDF กำลังทำงาน 24/7' 
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    service: 'ไอแฮบPDF',
    version: '1.0.0'
  });
});

// PDF Compression
app.post('/api/compress-pdf', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'ไม่พบไฟล์ PDF' });
    }

    const pdfDoc = await PDFDocument.load(req.file.buffer);
    const compressedPdfBytes = await pdfDoc.save({
      useObjectStreams: false,
      addDefaultPage: false,
      objectsPerTick: 50,
      updateFieldAppearances: false
    });

    const originalSize = req.file.buffer.length;
    const compressedSize = compressedPdfBytes.length;
    const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="compressed.pdf"',
      'X-Original-Size': originalSize,
      'X-Compressed-Size': compressedSize,
      'X-Compression-Ratio': compressionRatio
    });

    res.send(Buffer.from(compressedPdfBytes));
  } catch (error) {
    console.error('PDF Compression Error:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการบีบอัด PDF' });
  }
});

// PDF to Images
app.post('/api/pdf-to-images', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'ไม่พบไฟล์ PDF' });
    }

    const tempPath = path.join(__dirname, 'temp', `${Date.now()}.pdf`);
    
    // Ensure temp directory exists
    if (!fs.existsSync(path.dirname(tempPath))) {
      fs.mkdirSync(path.dirname(tempPath), { recursive: true });
    }

    fs.writeFileSync(tempPath, req.file.buffer);

    const convert = pdf2pic.fromPath(tempPath, {
      density: 100,
      saveFilename: "page",
      savePath: path.dirname(tempPath),
      format: "png",
      width: 800,
      height: 600
    });

    const results = await convert.bulk(-1);
    
    // Convert images to base64
    const images = results.map((result, index) => {
      const imageBuffer = fs.readFileSync(result.path);
      const base64 = imageBuffer.toString('base64');
      
      // Clean up temp file
      fs.unlinkSync(result.path);
      
      return {
        page: index + 1,
        image: `data:image/png;base64,${base64}`
      };
    });

    // Clean up temp PDF
    fs.unlinkSync(tempPath);

    res.json({ images });
  } catch (error) {
    console.error('PDF to Images Error:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการแปลง PDF เป็นรูปภาพ' });
  }
});

// Images to PDF
app.post('/api/images-to-pdf', upload.array('images', 20), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'ไม่พบไฟล์รูปภาพ' });
    }

    const pdfDoc = await PDFDocument.create();

    for (const file of req.files) {
      let image;
      
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        image = await pdfDoc.embedJpg(file.buffer);
      } else if (file.mimetype === 'image/png') {
        image = await pdfDoc.embedPng(file.buffer);
      }

      const page = pdfDoc.addPage([image.width, image.height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });
    }

    const pdfBytes = await pdfDoc.save();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="converted.pdf"'
    });

    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error('Images to PDF Error:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการแปลงรูปภาพเป็น PDF' });
  }
});

// Serve static files from React build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Keep-alive ping every 14 minutes (Render free tier sleeps after 15 minutes)
cron.schedule('*/14 * * * *', async () => {
  try {
    const url = process.env.RENDER_EXTERNAL_URL || 'http://localhost:5000';
    await axios.get(`${url}/ping`);
    console.log('Keep-alive ping sent at:', new Date().toISOString());
  } catch (error) {
    console.error('Keep-alive ping failed:', error.message);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 ไอแฮบPDF Server running on port ${PORT}`);
});