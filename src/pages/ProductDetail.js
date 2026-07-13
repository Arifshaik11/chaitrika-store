import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import ImageUpload from '../components/ImageUpload';
import { ArrowLeft, ShoppingCart, Ruler, Palette, Shapes, Sparkles, CheckCircle2, Star } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProduct } = useProducts();
  const { addToCart } = useCart();

  const product = getProduct(id);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageAdjustments, setImageAdjustments] = useState({ brightness: 100, contrast: 100, saturation: 100 });
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: '#0F172A', paddingTop: '80px' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-4"
        >
          <div className="text-6xl mb-6">😕</div>
          <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Product Not Found
          </h2>
          <p className="mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
            This product doesn't exist or was removed.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/products')}
            className="px-8 py-3 rounded-full font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)', boxShadow: '0 0 25px rgba(124,58,237,0.4)' }}
          >
            Browse Products
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const calculateTotalPrice = () => {
    if (!selectedSize) return 0;
    return selectedSize.price + (selectedShape?.price || 0);
  };

  const handleAddToCart = () => {
    if (!selectedSize) { alert('Please select a size'); return; }
    if (!selectedShape) { alert('Please select a shape'); return; }
    if (!uploadedImage) { alert('Please upload an image'); return; }

    addToCart({
      id: product.id,
      name: product.name,
      size: selectedSize.size,
      shape: selectedShape.shape,
      price: calculateTotalPrice(),
      image: product.image,
      uploadedImage,
      adjustments: imageAdjustments,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const previewStyle = uploadedImage
    ? {
        backgroundImage: `url(${uploadedImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: `brightness(${imageAdjustments.brightness}%) contrast(${imageAdjustments.contrast}%) saturate(${imageAdjustments.saturation}%)`,
      }
    : {};

  const glassCard = {
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '20px',
  };

  const SliderInput = ({ label, value, onChange }) => (
    <div>
      <div className="flex justify-between mb-2">
        <label className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>{label}</label>
        <span className="text-sm font-bold" style={{ color: '#A855F7' }}>{value}%</span>
      </div>
      <input
        type="range" min="50" max="150" value={value}
        onChange={onChange}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{ accentColor: '#A855F7' }}
      />
    </div>
  );

  return (
    <div style={{ background: '#0F172A', minHeight: '100vh', color: '#fff', paddingTop: '80px' }}>
      {/* Aurora background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: '#0F172A' }} />
        <div className="absolute w-96 h-96 rounded-full" style={{ top: '-80px', right: '10%', background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute w-80 h-80 rounded-full" style={{ bottom: '20%', left: '5%', background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          whileHover={{ x: -4 }}
          className="flex items-center gap-2 mb-8 transition-colors group"
          style={{ color: 'rgba(255,255,255,0.5)' }}
          onMouseEnter={e => e.currentTarget.style.color = '#A855F7'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT — Image + Upload */}
          <div className="space-y-5">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="aspect-square overflow-hidden relative"
              style={glassCard}
            >
              {uploadedImage ? (
                <div className="w-full h-full flex items-center justify-center p-8" style={previewStyle}>
                  <div
                    className="px-5 py-3 rounded-xl text-center"
                    style={{ background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Preview</p>
                    <p className="font-bold text-white text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>{product.name}</p>
                  </div>
                </div>
              ) : (
                <motion.img
                  src={product.image?.startsWith('http') || product.image?.startsWith('data:') ? product.image : `${process.env.PUBLIC_URL}${product.image}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.5 }}
                />
              )}
              {/* Gradient overlay */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.5) 0%, transparent 50%)' }} />
            </motion.div>

            {/* Image Upload */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={glassCard}
              className="p-5"
            >
              <ImageUpload onImageUpload={setUploadedImage} currentImage={uploadedImage} />
            </motion.div>

            {/* Image Adjustments */}
            <AnimatePresence>
              {uploadedImage && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={glassCard}
                  className="p-5 overflow-hidden"
                >
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(168,85,247,0.15)' }}>
                      <Palette className="w-3.5 h-3.5" style={{ color: '#A855F7' }} />
                    </div>
                    <h3 className="font-bold text-sm text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      Image Adjustments
                    </h3>
                  </div>
                  <div className="space-y-5">
                    <SliderInput label="Brightness" value={imageAdjustments.brightness} onChange={e => setImageAdjustments(p => ({ ...p, brightness: e.target.value }))} />
                    <SliderInput label="Contrast" value={imageAdjustments.contrast} onChange={e => setImageAdjustments(p => ({ ...p, contrast: e.target.value }))} />
                    <SliderInput label="Saturation" value={imageAdjustments.saturation} onChange={e => setImageAdjustments(p => ({ ...p, saturation: e.target.value }))} />
                    <motion.button
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      onClick={() => setImageAdjustments({ brightness: 100, contrast: 100, saturation: 100 })}
                      className="w-full py-2.5 rounded-xl text-sm font-medium transition-all"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}
                    >
                      Reset to Default
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT — Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {/* Title + Category */}
            <div>
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
                style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(168,85,247,0.25)', color: '#A855F7' }}
              >
                <Sparkles className="w-3 h-3" />
                {product.category}
              </div>
              <h1 className="text-3xl sm:text-4xl font-black mb-3 text-white leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {product.name}
              </h1>
              <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.95rem' }}>
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div
              className="p-5"
              style={glassCard}
            >
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#A855F7' }}>Features</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'High-quality printing',
                  'Durable materials',
                  'Custom positioning',
                  'Professional finish',
                  ...(product.category === 'magnetic' ? ['Strong magnetic'] : []),
                  ...(product.category === 'acrylic' ? ['Crystal clear'] : []),
                  ...(product.category === 'mdf' ? ['Smooth wood finish'] : []),
                ].map(feat => (
                  <div key={feat} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#A855F7' }} />
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="p-5" style={glassCard}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(124,58,237,0.15)' }}>
                  <Ruler className="w-3.5 h-3.5" style={{ color: '#7C3AED' }} />
                </div>
                <h3 className="font-bold text-sm text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>Choose Size</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {product.sizes.map(size => {
                  const isSelected = selectedSize?.size === size.size;
                  return (
                    <motion.button
                      key={size.size}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedSize(size)}
                      className="p-4 rounded-xl text-left transition-all duration-200"
                      style={{
                        background: isSelected ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.04)',
                        border: isSelected ? '1px solid rgba(168,85,247,0.5)' : '1px solid rgba(255,255,255,0.06)',
                        boxShadow: isSelected ? '0 0 15px rgba(124,58,237,0.2)' : 'none',
                      }}
                    >
                      <p className="font-semibold text-sm text-white">{size.size}</p>
                      <p className="text-sm font-bold mt-0.5" style={{
                        background: 'linear-gradient(135deg, #A855F7, #EC4899)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}>₹{size.price}</p>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Shape Selection */}
            {product.shapes && product.shapes.length > 0 && (
              <div className="p-5" style={glassCard}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(236,72,153,0.15)' }}>
                    <Shapes className="w-3.5 h-3.5" style={{ color: '#EC4899' }} />
                  </div>
                  <h3 className="font-bold text-sm text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>Choose Shape</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {product.shapes.map(shape => {
                    const isSelected = selectedShape?.shape === shape.shape;
                    return (
                      <motion.button
                        key={shape.shape}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedShape(shape)}
                        className="p-4 rounded-xl text-left transition-all duration-200"
                        style={{
                          background: isSelected ? 'rgba(236,72,153,0.15)' : 'rgba(255,255,255,0.04)',
                          border: isSelected ? '1px solid rgba(236,72,153,0.4)' : '1px solid rgba(255,255,255,0.06)',
                          boxShadow: isSelected ? '0 0 15px rgba(236,72,153,0.15)' : 'none',
                        }}
                      >
                        <p className="font-semibold text-sm text-white">{shape.shape}</p>
                        <p className="text-xs mt-0.5 font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
                          {shape.price > 0 ? `+₹${shape.price}` : 'Base price'}
                        </p>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Price Summary */}
            <AnimatePresence>
              {selectedSize && selectedShape && (
                <motion.div
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="p-5 overflow-hidden"
                  style={{
                    background: 'rgba(124,58,237,0.08)',
                    border: '1px solid rgba(168,85,247,0.2)',
                    borderRadius: '20px',
                  }}
                >
                  <div className="space-y-2 mb-3 text-sm">
                    <div className="flex justify-between" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      <span>Size ({selectedSize.size})</span>
                      <span>₹{selectedSize.price}</span>
                    </div>
                    {selectedShape.price > 0 && (
                      <div className="flex justify-between" style={{ color: 'rgba(255,255,255,0.6)' }}>
                        <span>Shape ({selectedShape.shape})</span>
                        <span>+₹{selectedShape.price}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <span className="font-semibold text-white">Total</span>
                    <span className="text-2xl font-black" style={{
                      fontFamily: 'Outfit, sans-serif',
                      background: 'linear-gradient(135deg, #A855F7, #EC4899)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>
                      ₹{calculateTotalPrice()}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Requirement hints */}
            {(!selectedSize || !selectedShape || !uploadedImage) && (
              <div className="flex flex-wrap gap-2">
                {!uploadedImage && <span className="text-xs px-3 py-1.5 rounded-full" style={{ background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.2)', color: 'rgba(236,72,153,0.8)' }}>Upload image</span>}
                {!selectedSize && <span className="text-xs px-3 py-1.5 rounded-full" style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', color: 'rgba(168,85,247,0.8)' }}>Select size</span>}
                {!selectedShape && <span className="text-xs px-3 py-1.5 rounded-full" style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', color: 'rgba(168,85,247,0.8)' }}>Select shape</span>}
              </div>
            )}

            {/* Add to Cart Button */}
            <motion.button
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedShape || !uploadedImage}
              whileHover={selectedSize && selectedShape && uploadedImage ? { scale: 1.02, y: -2 } : {}}
              whileTap={selectedSize && selectedShape && uploadedImage ? { scale: 0.98 } : {}}
              className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-3 transition-all duration-300 text-base"
              style={{
                fontFamily: 'Outfit, sans-serif',
                background: selectedSize && selectedShape && uploadedImage
                  ? added
                    ? 'linear-gradient(135deg, #10B981, #059669)'
                    : 'linear-gradient(135deg, #7C3AED, #A855F7, #EC4899)'
                  : 'rgba(255,255,255,0.05)',
                border: selectedSize && selectedShape && uploadedImage
                  ? 'none'
                  : '1px solid rgba(255,255,255,0.08)',
                color: selectedSize && selectedShape && uploadedImage ? '#fff' : 'rgba(255,255,255,0.3)',
                cursor: selectedSize && selectedShape && uploadedImage ? 'pointer' : 'not-allowed',
                boxShadow: selectedSize && selectedShape && uploadedImage && !added
                  ? '0 0 30px rgba(124,58,237,0.4)'
                  : added ? '0 0 30px rgba(16,185,129,0.4)' : 'none',
              }}
            >
              {added ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </>
              )}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;