import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CompressPDF from './pages/CompressPDF';
import PDFToImages from './pages/PDFToImages';
import ImagesToPDF from './pages/ImagesToPDF';
import About from './pages/About';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <div className="App">
              <Header />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/compress-pdf" element={<CompressPDF />} />
                  <Route path="/pdf-to-images" element={<PDFToImages />} />
                  <Route path="/images-to-pdf" element={<ImagesToPDF />} />
                  <Route path="/about" element={<About />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;