import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const getMinPrice = () => {
    return Math.min(...product.sizes.map(size => size.price));
  };

  // Resolve image path: use PUBLIC_URL for local paths, keep full URLs as-is
  const getImageSrc = () => {
    if (!product.image) return '';
    // If it's already a full URL or data URI, use as-is
    if (product.image.startsWith('http') || product.image.startsWith('data:')) {
      return product.image;
    }
    // For local paths, prepend PUBLIC_URL for deployment compatibility
    return `${process.env.PUBLIC_URL}${product.image}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-xl md:rounded-2xl overflow-hidden backdrop-blur-sm bg-opacity-95"
      style={{
        boxShadow: isHovered
          ? '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 20px rgba(59, 130, 246, 0.3)'
          : '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container - Uniform Square Size */}
      <div className="relative w-full aspect-square bg-gray-100 border-b-2 md:border-b-4 transition-colors duration-300 group-hover:border-primary overflow-hidden">
        {!imgError ? (
          <motion.img
            src={getImageSrc()}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5 }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
            <span className="text-4xl font-bold text-primary/40">{product.name?.charAt(0) || '?'}</span>
          </div>
        )}
        
        {/* Image Overlay on Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-300"
        />
      </div>

      {/* Content Section */}
      <div className="p-3 md:p-4 relative">
        {/* Accent Border Animation */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          className="absolute top-0 left-0 right-0 h-0.5 md:h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 origin-left"
          style={{ originX: 0 }}
        />

        <h3 className="text-sm md:text-lg font-semibold text-gray-900 mb-1 md:mb-2 group-hover:text-primary transition-colors duration-300 font-display line-clamp-2">
          {product.name}
        </h3>

        <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
          {product.description}
        </p>

        {/* Price Section */}
        <div className="flex items-center justify-between mb-2 md:mb-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="transition-transform duration-300"
          >
            <span className="text-base md:text-xl font-bold text-primary font-display">
              ₹{getMinPrice()}
            </span>
            <span className="text-gray-500 text-xs md:text-sm ml-1">onwards</span>
          </motion.div>

          {/* Sizes Badge */}
          <motion.span
            whileHover={{ scale: 1.1, backgroundColor: '#3B82F6' }}
            className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs transition-all duration-300"
          >
            {product.sizes.length} sizes
          </motion.span>
        </div>

        {/* Customize Button - Gradient Animation */}
        <Link
          to={`/product/${product.id}`}
          className="relative block w-full overflow-hidden rounded-lg md:rounded-xl font-medium text-xs md:text-sm py-2 md:py-2.5 px-3 md:px-4 transition-all duration-300"
        >
          {/* Button Background with Gradient Animation */}
          <motion.div
            initial={{ backgroundPosition: '0% 50%' }}
            whileHover={{ backgroundPosition: '100% 50%' }}
            className="absolute inset-0 bg-gradient-to-r from-primary via-blue-600 to-primary"
            style={{
              backgroundSize: '200% 100%'
            }}
          />

          {/* Button Content */}
          <div className="relative flex items-center justify-center space-x-1 md:space-x-2 text-white">
            <span>Customize</span>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileHover={{ opacity: 1, x: 0, rotate: 180 }}
            >
              <Sparkles className="w-3 md:w-4 h-3 md:h-4" />
            </motion.div>
          </div>

          {/* Glow Effect on Hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-pink-300 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300 -z-10" />
        </Link>

        {/* Bottom Accent Bar */}
        <div className="mt-2 md:mt-3 flex space-x-0.5 md:space-x-1">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 h-0.5 md:h-1 bg-gray-200 rounded-full"
              animate={
                isHovered
                  ? {
                      background: ['#E5E7EB', ['#3B82F6', '#8B5CF6', '#EC4899'][i], '#E5E7EB'][i % 3],
                      scaleY: 1.5
                    }
                  : { background: '#E5E7EB', scaleY: 1 }
              }
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>

      {/* Subtle Corner Accent */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute top-0 right-0 w-8 md:w-12 h-8 md:h-12 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-lg md:rounded-bl-2xl"
      />

      {/* Floating Sparkle Animation */}
      {isHovered && (
        <>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-2 right-3 md:right-4 w-1.5 md:w-2 h-1.5 md:h-2 bg-primary rounded-full"
          />
          <motion.div
            animate={{ y: [0, -8, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute bottom-4 right-4 md:right-6 w-1 md:w-1.5 h-1 md:h-1.5 bg-purple-500 rounded-full"
          />
        </>
      )}
    </motion.div>
  );
};

export default ProductCard;