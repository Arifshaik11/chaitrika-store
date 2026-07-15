import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import ImageUpload from '../components/ImageUpload';
import SEO from '../components/SEO';
import { productSchema, breadcrumbSchema } from '../utils/structuredData';
import { ArrowLeft, ShoppingBag, Ruler, Palette, Shapes, Sparkles, CheckCircle2 } from 'lucide-react';

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
      <div className="min-h-screen flex items-center justify-center bg-white pt-20">
        <SEO
          title="Product Not Found | Chaitra Wrap & Wear"
          description="The product you're looking for does not exist"
          robots="noindex"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-4"
        >
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Product Not Found
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            This product doesn't exist or was removed.
          </p>
          <button
            onClick={() => navigate('/products')}
            className="btn-primary"
          >
            Browse Products
          </button>
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

  const cleanCard = {
    background: '#F8F8F8',
    border: '1px solid #EBEBEB',
    borderRadius: '12px',
  };

  const SliderInput = ({ label, value, onChange }) => (
    <div>
      <div className="flex justify-between mb-1.5">
        <label className="text-xs font-medium text-gray-700">{label}</label>
        <span className="text-xs font-bold text-[#C9897A]">{value}%</span>
      </div>
      <input
        type="range" min="50" max="150" value={value}
        onChange={onChange}
        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#C9897A]"
      />
    </div>
  );

  return (
    <div className="bg-white min-h-screen text-gray-900 pt-16 pb-12 relative">
      <SEO
        title={`${product.name} | Chaitra Wrap & Wear`}
        description={product.description}
        keywords={`${product.name}, ${product.category}, personalized gifts, photo frames`}
        canonical={`https://chaitrika.in/product/${product.id}`}
        ogTitle={`${product.name} | Chaitra Wrap & Wear`}
        ogDescription={product.description}
        ogImage={product.image.startsWith('http') ? product.image : `https://chaitrika.in${product.image}`}
        ogType="product"
        structuredData={[
          productSchema(product),
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Shop', url: '/products' },
            { name: product.name, url: `/product/${product.id}` }
          ])
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Collection</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT — Image Preview & Upload */}
          <div className="space-y-4">
            
            {/* Visual Canvas Frame */}
            <div
              className="aspect-square overflow-hidden relative bg-[#F8F8F8] border border-[#EBEBEB]"
              style={{ borderRadius: '12px' }}
            >
              {uploadedImage ? (
                <div className="w-full h-full flex items-center justify-center p-8" style={previewStyle}>
                  <div
                    className="px-4 py-2 bg-white bg-opacity-95 rounded-lg border border-gray-100 shadow-sm text-center"
                    style={{ backdropFilter: 'blur(4px)' }}
                  >
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">Preview</p>
                    <p className="font-semibold text-gray-800 text-xs mt-0.5">{product.name}</p>
                  </div>
                </div>
              ) : (
                <img
                  src={product.image?.startsWith('http') || product.image?.startsWith('data:') ? product.image : `${process.env.PUBLIC_URL}${product.image}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Customizer Image Upload Dropzone */}
            <div style={cleanCard} className="p-5">
              <ImageUpload onImageUpload={setUploadedImage} currentImage={uploadedImage} />
            </div>

            {/* Photo Filter Customizers */}
            <AnimatePresence>
              {uploadedImage && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={cleanCard}
                  className="p-5 overflow-hidden"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Palette className="w-4 h-4 text-[#C9897A]" />
                    <h3 className="font-medium text-xs uppercase tracking-wider text-gray-700">
                      Image Adjustments
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <SliderInput label="Brightness" value={imageAdjustments.brightness} onChange={e => setImageAdjustments(p => ({ ...p, brightness: e.target.value }))} />
                    <SliderInput label="Contrast" value={imageAdjustments.contrast} onChange={e => setImageAdjustments(p => ({ ...p, contrast: e.target.value }))} />
                    <SliderInput label="Saturation" value={imageAdjustments.saturation} onChange={e => setImageAdjustments(p => ({ ...p, saturation: e.target.value }))} />
                    <button
                      onClick={() => setImageAdjustments({ brightness: 100, contrast: 100, saturation: 100 })}
                      className="w-full py-2 bg-white border border-gray-200 text-xs font-medium text-gray-500 rounded-lg hover:bg-gray-50 transition-colors mt-2"
                    >
                      Reset Adjustments
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT — Configuration & Specs */}
          <div className="space-y-6">
            
            {/* Header info */}
            <div>
              <div className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#C9897A] font-semibold mb-2 bg-[#F2E8E5] px-2 py-0.5 rounded">
                <Sparkles className="w-2.5 h-2.5" />
                {product.category}
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-semibold text-gray-900 mb-2 leading-tight">
                {product.name}
              </h1>
              <p className="text-sm text-gray-500 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Spec Checkmarks */}
            <div style={cleanCard} className="p-4">
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                {[
                  'High-resolution print',
                  'Premium material finish',
                  'Individually handcrafted',
                  'Ready to hang/display',
                ].map(feat => (
                  <div key={feat} className="flex items-center gap-1.5">
                    <span className="text-[#C9897A] font-bold">✓</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Size selection */}
            <div style={cleanCard} className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Ruler className="w-4 h-4 text-[#C9897A]" />
                <h3 className="font-medium text-xs uppercase tracking-wider text-gray-700">Select Size</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {product.sizes.map(size => {
                  const isSelected = selectedSize?.size === size.size;
                  return (
                    <button
                      key={size.size}
                      onClick={() => setSelectedSize(size)}
                      className={`p-3 rounded-lg text-left transition-all ${
                        isSelected
                          ? 'bg-white border-2 border-[#C9897A]'
                          : 'bg-white border border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <p className="font-medium text-xs text-gray-900">{size.size}</p>
                      <p className="text-sm font-bold text-gray-900 mt-0.5">₹{size.price}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Shape selection */}
            {product.shapes && product.shapes.length > 0 && (
              <div style={cleanCard} className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Shapes className="w-4 h-4 text-[#C9897A]" />
                  <h3 className="font-medium text-xs uppercase tracking-wider text-gray-700">Select Shape</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {product.shapes.map(shape => {
                    const isSelected = selectedShape?.shape === shape.shape;
                    return (
                      <button
                        key={shape.shape}
                        onClick={() => setSelectedShape(shape)}
                        className={`p-3 rounded-lg text-left transition-all ${
                          isSelected
                            ? 'bg-white border-2 border-[#C9897A]'
                            : 'bg-white border border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <p className="font-medium text-xs text-gray-900">{shape.shape}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {shape.price > 0 ? `+₹${shape.price}` : 'No extra cost'}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Price breakdown */}
            <AnimatePresence>
              {selectedSize && selectedShape && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4"
                  style={{
                    background: '#FDFBFB',
                    border: '1px dashed #EBEBEB',
                    borderRadius: '10px',
                  }}
                >
                  <div className="space-y-1 text-xs text-gray-500 mb-2">
                    <div className="flex justify-between">
                      <span>Size ({selectedSize.size})</span>
                      <span>₹{selectedSize.price}</span>
                    </div>
                    {selectedShape.price > 0 && (
                      <div className="flex justify-between">
                        <span>Shape ({selectedShape.shape})</span>
                        <span>+₹{selectedShape.price}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-baseline pt-2 border-t border-gray-100">
                    <span className="text-xs font-semibold text-gray-900">Total Price</span>
                    <span className="text-lg font-bold text-gray-900">
                      ₹{calculateTotalPrice()}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cart action */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedShape || !uploadedImage}
              className="w-full py-3.5 rounded-lg font-medium text-sm text-white flex items-center justify-center gap-2 transition-all"
              style={{
                background: selectedSize && selectedShape && uploadedImage
                  ? added ? '#10B981' : '#111111'
                  : '#E5E7EB',
                color: selectedSize && selectedShape && uploadedImage ? '#FFFFFF' : '#9CA3AF',
                cursor: selectedSize && selectedShape && uploadedImage ? 'pointer' : 'not-allowed',
              }}
            >
              {added ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;