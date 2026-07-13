import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Camera, Filter } from 'lucide-react';

const Header = () => {
  const { getTotalItems } = useCart();
  const location = useLocation();
  const isProductsPage = location.pathname === '/products';

  const handleFilterClick = () => {
    // Emit custom event to show filter modal on products page
    window.dispatchEvent(new CustomEvent('toggleFilterModal'));
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12 md:h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-1 md:space-x-2 flex-shrink-0">
            <Camera className="h-5 md:h-6 w-5 md:w-6 text-primary" />
            <span className="text-xs md:text-base lg:text-lg font-bold text-gray-900 hidden sm:inline">
              Chaitra <span className="text-primary">Wrap</span>@Wear
            </span>
            <span className="text-xs font-bold text-gray-900 sm:hidden">
              Chaitra<span className="text-primary">Wrap</span>
            </span>
          </Link>

          {/* Actions */}
          <div className="flex items-center space-x-1 md:space-x-3">
            {/* Filter Button - Only on Products Page */}
            {isProductsPage && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFilterClick}
                className="text-gray-700 hover:text-primary transition-colors p-1 md:p-1.5 relative"
                title="Toggle Filters"
              >
                <Filter className="h-5 md:h-5 w-5 md:w-5" />
              </motion.button>
            )}

            {/* Cart */}
            <Link to="/cart" className="relative p-1 md:p-1.5 text-gray-700 hover:text-primary transition-colors">
              <ShoppingCart className="h-5 md:h-5 w-5 md:w-5" />
              {getTotalItems() > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  whileHover={{ scale: 1.2 }}
                  className="absolute -top-1 -right-1 md:-top-1 md:-right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold text-[10px]"
                >
                  {getTotalItems()}
                </motion.span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;