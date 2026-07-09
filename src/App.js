import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollProgressBar from './components/ScrollProgressBar';
import GiftUnwrapAnimation from './components/GiftUnwrapAnimation';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import Checkout from './pages/Checkout';

function App() {
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

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
    // Check if animation has been shown in this session
    const hasSeenAnimation = sessionStorage.getItem('hasSeenGiftAnimation');
    
    if (!hasSeenAnimation) {
      setShowAnimation(true);
    } else {
      setAnimationComplete(true);
    }
  }, []);

  const handleAnimationComplete = () => {
    sessionStorage.setItem('hasSeenGiftAnimation', 'true');
    setShowAnimation(false);
    setAnimationComplete(true);
  };

  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <ScrollProgressBar />
          {showAnimation && !animationComplete && (
            <GiftUnwrapAnimation onComplete={handleAnimationComplete} />
          )}
          
          <div className={`min-h-screen flex flex-col bg-gray-50 transition-opacity duration-500 ${
            showAnimation ? 'opacity-0' : 'opacity-100'
          }`}>
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
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