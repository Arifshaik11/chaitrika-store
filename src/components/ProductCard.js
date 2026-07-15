import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const getMinPrice = () => {
    return Math.min(...product.sizes.map((size) => size.price));
  };

  const getImageSrc = () => {
    if (!product.image) return '';
    if (product.image.startsWith('http') || product.image.startsWith('data:')) {
      return product.image;
    }
    return `${process.env.PUBLIC_URL}${product.image}`;
  };

  return (
    <div
      className="group relative bg-white flex flex-col overflow-hidden"
      style={{
        borderRadius: '12px',
        boxShadow: isHovered
          ? '0 8px 32px rgba(0,0,0,0.10)'
          : '0 2px 16px rgba(0,0,0,0.06)',
        border: '1px solid #F0F0F0',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: '1 / 1', background: '#F8F8F8' }}
      >
        {!imgError ? (
          <img
            src={getImageSrc()}
            alt={product.name}
            className="w-full h-full object-cover"
            style={{
              transform: isHovered ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.5s ease',
            }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span
              className="font-display text-5xl font-semibold"
              style={{ color: '#DDDDDD' }}
            >
              {product.name?.charAt(0) || '?'}
            </span>
          </div>
        )}

        {/* Sizes badge */}
        <div
          className="absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded-full"
          style={{
            background: 'rgba(255,255,255,0.92)',
            color: '#666666',
            backdropFilter: 'blur(4px)',
          }}
        >
          {product.sizes.length} sizes
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3
          className="font-sans font-semibold text-sm md:text-base mb-1 line-clamp-2 transition-colors duration-200"
          style={{ color: isHovered ? '#C9897A' : '#111111' }}
        >
          {product.name}
        </h3>

        <p
          className="text-xs md:text-sm leading-relaxed line-clamp-2 mb-3 flex-1"
          style={{ color: '#888888' }}
        >
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-4">
          <span
            className="font-sans font-bold text-base md:text-lg"
            style={{ color: '#111111' }}
          >
            ₹{getMinPrice()}
          </span>
          <span className="text-xs" style={{ color: '#AAAAAA' }}>onwards</span>
        </div>

        {/* CTA */}
        <Link
          to={`/product/${product.id}`}
          className="block w-full text-center text-xs md:text-sm font-medium py-2.5 px-4"
          style={{
            background: '#111111',
            color: '#FFFFFF',
            borderRadius: '10px',
            textDecoration: 'none',
            transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.18)' : 'none',
          }}
        >
          View & Customize
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;