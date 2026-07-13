import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const getMinPrice = () => Math.min(...product.sizes.map(s => s.price));

  const getImageSrc = () => {
    if (!product.image) return '';
    if (product.image.startsWith('http') || product.image.startsWith('data:')) return product.image;
    return `${process.env.PUBLIC_URL}${product.image}`;
  };

  const isPremium = product.category === 'acrylic';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: 'easeOut' } }}
      transition={{ duration: 0.5 }}
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container */}
      <div
        className="relative overflow-hidden transition-all duration-500"
        style={{
          borderRadius: '20px',
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: isHovered
            ? '1px solid rgba(124,58,237,0.5)'
            : '1px solid rgba(255,255,255,0.08)',
          boxShadow: isHovered
            ? '0 20px 60px rgba(124,58,237,0.25), 0 0 0 1px rgba(124,58,237,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
            : '0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        {/* Purple glow on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.12) 0%, transparent 70%)',
            borderRadius: '20px',
          }}
        />

        {/* Premium badge - Gold only for acrylic */}
        {isPremium && (
          <div
            className="absolute top-3 left-3 z-20 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
            style={{
              background: 'linear-gradient(135deg, #F59E0B, #D97706)',
              color: '#fff',
              boxShadow: '0 0 12px rgba(245,158,11,0.4)',
            }}
          >
            <Star className="w-2.5 h-2.5 fill-white" />
            Premium
          </div>
        )}

        {/* Image Section */}
        <div className="relative w-full aspect-square overflow-hidden">
          {!imgError ? (
            <motion.img
              src={getImageSrc()}
              alt={product.name}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.08 : 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(236,72,153,0.2))' }}
            >
              <span
                className="text-5xl font-black opacity-30"
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  background: 'linear-gradient(135deg, #A855F7, #EC4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {product.name?.charAt(0) || '?'}
              </span>
            </div>
          )}

          {/* Image overlay gradient */}
          <div
            className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(15,23,42,0.7) 0%, transparent 50%)',
              opacity: isHovered ? 1 : 0.4,
            }}
          />
        </div>

        {/* Content Section */}
        <div className="p-4 relative">
          {/* Accent bar */}
          <motion.div
            className="absolute top-0 left-4 right-4 h-px"
            style={{ background: 'linear-gradient(to right, #7C3AED, #EC4899)' }}
            animate={{ scaleX: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          <h3
            className="font-semibold text-sm mb-1.5 line-clamp-2 leading-snug transition-colors duration-200"
            style={{
              fontFamily: 'Outfit, sans-serif',
              color: isHovered ? '#fff' : 'rgba(255,255,255,0.9)',
            }}
          >
            {product.name}
          </h3>

          <p
            className="text-xs line-clamp-2 mb-3 leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            {product.description}
          </p>

          {/* Price + Sizes Row */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <span
                className="text-lg font-bold"
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  background: 'linear-gradient(135deg, #A855F7, #EC4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                ₹{getMinPrice()}
              </span>
              <span className="text-xs ml-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
                onwards
              </span>
            </div>
            <span
              className="text-[10px] font-medium px-2 py-0.5 rounded-full"
              style={{
                background: 'rgba(168,85,247,0.15)',
                border: '1px solid rgba(168,85,247,0.25)',
                color: '#A855F7',
              }}
            >
              {product.sizes.length} sizes
            </span>
          </div>

          {/* Customize Button */}
          <Link
            to={`/product/${product.id}`}
            className="relative block w-full overflow-hidden rounded-xl text-center text-sm font-semibold text-white py-2.5 transition-all duration-300"
            style={{
              background: isHovered
                ? 'linear-gradient(135deg, #7C3AED, #A855F7, #EC4899)'
                : 'rgba(124,58,237,0.2)',
              border: '1px solid rgba(124,58,237,0.3)',
              boxShadow: isHovered ? '0 0 20px rgba(124,58,237,0.4)' : 'none',
              fontFamily: 'Outfit, sans-serif',
            }}
          >
            <span className="flex items-center justify-center gap-2">
              Customize
              <motion.div
                animate={{ rotate: isHovered ? 180 : 0, scale: isHovered ? 1.2 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Sparkles className="w-3.5 h-3.5" />
              </motion.div>
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;