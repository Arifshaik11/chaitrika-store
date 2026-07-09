import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, Camera, User, LogOut } from 'lucide-react';

const Header = () => {
  const { getTotalItems } = useCart();
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-1 md:space-x-2 flex-shrink-0">
            <Camera className="h-6 md:h-8 w-6 md:w-8 text-primary" />
            <span className="text-sm md:text-lg lg:text-xl font-bold text-gray-900 hidden sm:inline">
              Chaitra <span className="text-primary">Wrap</span>@Wear
            </span>
            <span className="text-xs md:text-sm font-bold text-gray-900 sm:hidden">
              Chaitra<span className="text-primary">Wrap</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative p-1.5 md:p-2 text-gray-700 hover:text-primary transition-colors">
              <ShoppingCart className="h-5 md:h-6 w-5 md:w-6" />
              {getTotalItems() > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  whileHover={{ scale: 1.2 }}
                  className="absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1 bg-red-500 text-white text-xs rounded-full h-4 md:h-5 w-4 md:w-5 flex items-center justify-center font-bold"
                >
                  {getTotalItems()}
                </motion.span>
              )}
            </Link>

            {/* Admin */}
            {isAdmin ? (
              <div className="flex items-center space-x-1 md:space-x-2">
                <Link to="/admin/panel" className="text-gray-700 hover:text-primary transition-colors p-1.5 md:p-2">
                  <User className="h-5 md:h-6 w-5 md:w-6" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-500 transition-colors p-1.5 md:p-2"
                >
                  <LogOut className="h-5 md:h-6 w-5 md:w-6" />
                </button>
              </div>
            ) : (
              <Link to="/admin" className="text-gray-700 hover:text-primary transition-colors p-1.5 md:p-2">
                <User className="h-5 md:h-6 w-5 md:w-6" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;