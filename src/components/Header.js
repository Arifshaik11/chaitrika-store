import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, Home, Package, LogIn, Filter, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { getTotalItems } = useCart();
  const { isAdmin } = useAuth();
  const location = useLocation();
  const isProductsPage = location.pathname === '/products';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleFilterClick = () => {
    window.dispatchEvent(new CustomEvent('toggleFilterModal'));
  };

  const navLinks = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Products', href: '/products', icon: Package },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
      style={{
        background: isScrolled
          ? 'rgba(15, 23, 42, 0.75)'
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(24px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(124,58,237,0.15)' : '1px solid transparent',
        boxShadow: isScrolled ? '0 4px 30px rgba(124,58,237,0.1)' : 'none',
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
            <Link to="/" className="flex items-center gap-3 group">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-black text-xl relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED, #A855F7, #EC4899)',
                  boxShadow: '0 0 20px rgba(124,58,237,0.5)',
                  fontFamily: 'Outfit, sans-serif',
                }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, #EC4899, #A855F7, #7C3AED)' }}
                />
                <span className="relative z-10">C</span>
              </div>
              <div className="hidden sm:block">
                <p
                  className="text-sm font-bold text-white leading-tight"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  Chaitra
                </p>
                <p
                  className="text-xs leading-tight"
                  style={{ color: 'rgba(168,85,247,0.9)', fontFamily: 'Outfit, sans-serif' }}
                >
                  Wrap &amp; Wear
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <motion.div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <Link
                    to={link.href}
                    className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg"
                    style={{
                      color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
                    }}
                  >
                    {/* Active/Hover background */}
                    <AnimatePresence>
                      {(hoveredLink === link.label || isActive) && (
                        <motion.span
                          className="absolute inset-0 rounded-lg"
                          layoutId="nav-pill"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          style={{
                            background: 'rgba(124,58,237,0.2)',
                            border: '1px solid rgba(168,85,247,0.3)',
                          }}
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                        />
                      )}
                    </AnimatePresence>
                    <span className="relative z-10">{link.label}</span>
                    {/* Active underline */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full"
                        style={{ background: 'linear-gradient(to right, #7C3AED, #EC4899)' }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Filter Button - Products Page only */}
            {isProductsPage && (
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFilterClick}
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-white/70 hover:text-white transition-colors"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                title="Toggle Filters"
              >
                <Filter className="w-4 h-4" />
                <span className="hidden lg:block">Filter</span>
              </motion.button>
            )}

            {/* Cart Icon */}
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
              <Link to="/cart" className="relative group">
                <div
                  className="p-2.5 rounded-xl transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <ShoppingCart className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                  <AnimatePresence>
                    {getTotalItems() > 0 && (
                      <motion.span
                        key="cart-count"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute -top-1.5 -right-1.5 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)' }}
                      >
                        {getTotalItems()}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </Link>
            </motion.div>

            {/* Admin Link */}
            {isAdmin && (
              <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/admin/panel"
                  className="p-2.5 rounded-xl text-white transition-all duration-200"
                  style={{
                    background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                    boxShadow: '0 0 20px rgba(124,58,237,0.4)',
                  }}
                >
                  <LogIn className="w-5 h-5" />
                </Link>
              </motion.div>
            )}

            {!isAdmin && location.pathname !== '/admin' && (
              <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} className="hidden sm:block">
                <Link
                  to="/admin"
                  className="p-2.5 rounded-xl text-white/60 hover:text-white transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <LogIn className="w-5 h-5" />
                </Link>
              </motion.div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl text-white/70 hover:text-white transition-colors"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden"
            >
              <nav
                className="py-4 space-y-1 rounded-2xl mb-4 px-3"
                style={{
                  background: 'rgba(15,23,42,0.8)',
                  border: '1px solid rgba(124,58,237,0.2)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                {navLinks.map((link, i) => {
                  const isActive = location.pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <Link
                        to={link.href}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                        style={{
                          color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
                          background: isActive ? 'rgba(124,58,237,0.2)' : 'transparent',
                          border: isActive ? '1px solid rgba(168,85,247,0.3)' : '1px solid transparent',
                        }}
                      >
                        <Icon className="w-4 h-4" />
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
                {isProductsPage && (
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.16 }}
                    onClick={() => { handleFilterClick(); setIsMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/70 w-full text-left transition-all"
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                  >
                    <Filter className="w-4 h-4" />
                    Filter Products
                  </motion.button>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
