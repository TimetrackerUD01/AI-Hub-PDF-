import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Helmet } from 'react-helmet-async';
import { CloudArrowUpIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../contexts/LanguageContext';
import { BannerAd, SidebarAd } from '../components/AdSense';
import axios from 'axios';

const CompressPDF = () => {
  const { t, language } = useLanguage();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);

  const seoTitle = language === 'th' 
    ? 'บีบอัด PDF ออนไลน์ฟรี - ลดขนาดไฟล์ PDF | ไอแฮบPDF'
    : 'Compress PDF Online Free - Reduce PDF File Size | AI Hub PDF';

  const seoDescription = language === 'th'
    ? 'บีบอัด PDF ออนไลน์ฟรี ลดขนาดไฟล์ PDF ได้สูงสุด 90% โดยไม่สูญเสียคุณภาพ ใช้งานง่าย รวดเร็ว ปลอดภัย'
    : 'Compress PDF online for free. Reduce PDF file size up to 90% without quality loss. Easy, fast, and secure.';

  const onDrop = useCallback((acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile && uploadedFile.type === 'application/pdf') {
      setFile(uploadedFile);
      setError('');
      setResult(null);
    } else {
      setError(language === 'th' ? 'กรุณาเลือกไฟล์ PDF เท่านั้น' : 'Please select PDF files only');
    }
  }, [language]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024 // 50MB
  });

  const compressPDF = async () => {
    if (!file) return;

    setLoading(true);
    setError('');
    setProgress(0);

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await axios.post('/api/compress-pdf', formData, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        }
      });

      const originalSize = parseInt(response.headers['x-original-size']);
      const compressedSize = parseInt(response.headers['x-compressed-size']);
      const compressionRatio = response.headers['x-compression-ratio'];

      const url = window.URL.createObjectURL(new Blob([response.data]));
      
      setResult({
        url,
        originalSize,
        compressedSize,
        compressionRatio,
        filename: `compressed_${file.name}`
      });
    } catch (err) {
      setError(err.response?.data?.error || (language === 'th' 
        ? 'เกิดข้อผิดพลาดในการบีบอัด PDF' 
        : 'Error compressing PDF'));
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={language === 'th' 
          ? 'บีบอัด PDF, ลดขนาด PDF, PDF compressor, compress PDF online, ไอแฮบPDF'
          : 'compress PDF, reduce PDF size, PDF compressor, compress PDF online, AI Hub PDF'} />
      </Helmet>

      <div className="container">
        <div className="content-with-sidebar">
          <main className="main-content">
            <div className="hero" style={{ padding: '2rem 0' }}>
              <h1>📄 {t('compressTitle')}</h1>
              <p>{language === 'th' 
                ? 'ลดขนาดไฟล์ PDF ของคุณโดยไม่สูญเสียคุณภาพ'
                : 'Reduce your PDF file size without losing quality'}</p>
            </div>

            {/* Top Banner Ad */}
            <BannerAd 
              adSlot="4444444444"
              style={{ maxWidth: '728px', height: '90px', margin: '20px auto' }}
            />

            <div 
              {...getRootProps()} 
              className={`upload-area ${isDragActive ? 'active' : ''}`}
            >
              <input {...getInputProps()} />
              <CloudArrowUpIcon className="upload-icon" />
              {isDragActive ? (
                <div>
                  <h3>{t('dropHere')}</h3>
                  <p>{language === 'th' ? 'ปล่อยไฟล์เพื่ออัปโหลด' : 'Release to upload'}</p>
                </div>
              ) : (
                <div>
                  <h3>{t('dragDrop')}</h3>
                  <p>{t('maxSize')}</p>
                </div>
              )}
            </div>

            {error && (
              <div className="error">
                <strong>{t('error')}:</strong> {error}
              </div>
            )}

            {file && (
              <div className="results">
                <h3>📎 {language === 'th' ? 'ไฟล์ที่เลือก' : 'Selected File'}</h3>
                <div className="file-info">
                  <div>
                    <strong>{file.name}</strong>
                    <br />
                    <span>{language === 'th' ? 'ขนาด' : 'Size'}: {formatFileSize(file.size)}</span>
                  </div>
                  <button 
                    className="btn" 
                    onClick={compressPDF}
                    disabled={loading}
                  >
                    {loading 
                      ? (language === 'th' ? 'กำลังบีบอัด...' : 'Compressing...') 
                      : `🗜️ ${language === 'th' ? 'บีบอัดไฟล์' : 'Compress File'}`}
                  </button>
                </div>

                {loading && (
                  <div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p style={{ textAlign: 'center' }}>{t('processing')} {progress}%</p>
                  </div>
                )}
              </div>
            )}

            {result && (
              <div className="results">
                <h3>✅ {language === 'th' ? 'บีบอัดสำเร็จ!' : 'Compression Successful!'}</h3>
                <div className="file-info">
                  <div>
                    <strong>{language === 'th' ? 'ผลลัพธ์การบีบอัด' : 'Compression Results'}</strong>
                    <br />
                    <span>{language === 'th' ? 'ขนาดเดิม' : 'Original Size'}: {formatFileSize(result.originalSize)}</span>
                    <br />
                    <span>{language === 'th' ? 'ขนาดหลังบีบอัด' : 'Compressed Size'}: {formatFileSize(result.compressedSize)}</span>
                    <br />
                    <span style={{color: '#4CAF50', fontWeight: 'bold'}}>
                      {language === 'th' ? 'ลดลง' : 'Reduced by'}: {result.compressionRatio}%
                    </span>
                  </div>
                  <a 
                    href={result.url}
                    download={result.filename}
                    className="btn btn-secondary"
                  >
                    <DocumentArrowDownIcon style={{width: '20px', display: 'inline', marginRight: '5px'}} />
                    {t('download')}
                  </a>
                </div>
              </div>
            )}

            <div className="feature-card" style={{ marginTop: '3rem' }}>
              <h3>🎯 {language === 'th' ? 'คุณสมบัติการบีบอัด PDF' : 'PDF Compression Features'}</h3>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem'}}>
                <div>
                  <strong>🔧 {language === 'th' ? 'อัลกอริทึมขั้นสูง' : 'Advanced Algorithm'}</strong>
                  <p>{language === 'th' 
                    ? 'ใช้เทคโนโลยี PDF optimization ล่าสุด' 
                    : 'Uses latest PDF optimization technology'}</p>
                </div>
                <div>
                  <strong>📊 {language === 'th' ? 'รายงานผลลัพธ์' : 'Detailed Reports'}</strong>
                  <p>{language === 'th' 
                    ? 'แสดงอัตราการบีบอัดและขนาดไฟล์ที่ชัดเจน' 
                    : 'Shows clear compression ratio and file sizes'}</p>
                </div>
                <div>
                  <strong>⚡ {language === 'th' ? 'ประมวลผลเร็ว' : 'Fast Processing'}</strong>
                  <p>{language === 'th' 
                    ? 'บีบอัดไฟล์ขนาดใหญ่ในเวลาไม่กี่วินาที' 
                    : 'Compress large files in seconds'}</p>
                </div>
                <div>
                  <strong>🛡️ {language === 'th' ? 'คุณภาพคงเดิม' : 'Quality Preserved'}</strong>
                  <p>{language === 'th' 
                    ? 'รักษาคุณภาพเนื้อหาและรูปภาพ' 
                    : 'Maintains content and image quality'}</p>
                </div>
              </div>
            </div>
          </main>

          {/* Sidebar with Ads */}
          <aside className="sidebar">
            <SidebarAd adSlot="5555555555" />
            
            <div className="sidebar-widget">
              <h4>{language === 'th' ? 'เครื่องมืออื่นๆ' : 'Other Tools'}</h4>
              <ul>
                <li><a href="/pdf-to-images">{t('pdfToImages')}</a></li>
                <li><a href="/images-to-pdf">{t('imagesToPDF')}</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default CompressPDF;