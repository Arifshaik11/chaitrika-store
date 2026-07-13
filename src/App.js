import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollProgressBar from './components/ScrollProgressBar';
import ElegantLogoIntro from './components/ElegantLogoIntro';
import HomeAurora from './pages/Home';
import ProductsAurora from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import Checkout from './pages/Checkout';

function App() {
  const [showIntro, setShowIntro] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    // Check if intro has been shown in this session
    const hasSeenIntro = sessionStorage.getItem('hasSeenElegantIntro');
    
    if (!hasSeenIntro) {
      setShowIntro(true);
    } else {
      setIntroComplete(true);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem('hasSeenElegantIntro', 'true');
    setShowIntro(false);
    setIntroComplete(true);
  };

  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <ScrollProgressBar />
          {showIntro && !introComplete && (
            <ElegantLogoIntro onComplete={handleIntroComplete} />
          )}
          
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomeAurora />} />
                <Route path="/products" element={<ProductsAurora />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/panel" element={<AdminPanel />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;