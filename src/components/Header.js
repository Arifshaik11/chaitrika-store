import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Search, Filter, X, Menu } from 'lucide-react';

const Header = () => {
  const { getTotalItems } = useCart();
  const location = useLocation();
  const isProductsPage = location.pathname === '/products';
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleFilterClick = () => {
    window.dispatchEvent(new CustomEvent('toggleFilterModal'));
  };

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Shop', to: '/products' },
    { label: 'About', to: '/' },
    { label: 'Contact', to: '/' },
  ];

  return (
    <header
      className="sticky top-0 z-50 bg-white transition-all duration-300"
      style={{
        borderBottom: scrolled ? '1px solid #EBEBEB' : '1px solid transparent',
        boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.04)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">

          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 flex items-center gap-2"
            style={{ textDecoration: 'none' }}
          >
            <span
              className="font-display text-xl md:text-2xl font-semibold"
              style={{ color: '#111111', letterSpacing: '-0.01em' }}
            >
              Chaitra
            </span>
            <span
              className="hidden sm:inline-block text-xs font-sans font-normal tracking-widest uppercase"
              style={{ color: '#C9897A', marginTop: '4px' }}
            >
              &nbsp;Wrap &amp; Wear
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="link-accent text-sm font-medium transition-colors duration-200"
                style={{
                  color: location.pathname === link.to ? '#C9897A' : '#444444',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Filter — products page only */}
            {isProductsPage && (
              <button
                onClick={handleFilterClick}
                className="p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100"
                title="Filters"
                style={{ color: '#444444' }}
              >
                <Filter className="h-4 w-4" />
              </button>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100"
              style={{ color: '#444444', textDecoration: 'none' }}
            >
              <ShoppingBag className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 text-white text-[9px] font-bold rounded-full"
                  style={{ background: '#C9897A' }}
                >
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ color: '#111111' }}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {menuOpen && (
        <div
          className="md:hidden border-t py-4 px-4"
          style={{ borderColor: '#EBEBEB', background: '#FFFFFF' }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-sm font-medium border-b link-accent"
              style={{
                color: location.pathname === link.to ? '#C9897A' : '#444444',
                borderColor: '#F0F0F0',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;