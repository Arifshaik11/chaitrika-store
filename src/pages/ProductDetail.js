import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import ImageUpload from '../components/ImageUpload';
import { ArrowLeft, ShoppingCart, Ruler, Palette, Shapes } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProduct } = useProducts();
  const { addToCart } = useCart();
  
  const product = getProduct(id);
  
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageAdjustments, setImageAdjustments] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100
  });

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate('/products')}
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleShapeSelect = (shape) => {
    setSelectedShape(shape);
  };

  const calculateTotalPrice = () => {
    if (!selectedSize) return 0;
    let total = selectedSize.price;
    if (selectedShape) {
      total += selectedShape.price;
    }
    return total;
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    if (!selectedShape) {
      alert('Please select a shape');
      return;
    }

    if (!uploadedImage) {
      alert('Please upload an image');
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      size: selectedSize.size,
      shape: selectedShape.shape,
      price: calculateTotalPrice(),
      image: product.image,
      uploadedImage: uploadedImage,
      adjustments: imageAdjustments
    };

    addToCart(cartItem);
    alert('Product added to cart!');
  };

  const previewStyle = uploadedImage ? {
    backgroundImage: `url(${uploadedImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: `brightness(${imageAdjustments.brightness}%) contrast(${imageAdjustments.contrast}%) saturate(${imageAdjustments.saturation}%)`
  } : {};

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-primary mb-4 md:mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 md:h-5 w-4 md:w-5 mr-2" />
          <span className="text-sm md:text-base">Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {/* Product Image and Preview */}
          <div className="space-y-4 md:space-y-6">
          <div className="aspect-square bg-gray-100 rounded-lg md:rounded-xl overflow-hidden shadow-soft">
            {uploadedImage ? (
              <div 
                className="w-full h-full flex items-center justify-center p-4 md:p-8"
                style={previewStyle}
              >
                <div className="bg-white bg-opacity-90 p-3 md:p-4 rounded-lg text-center max-w-xs">
                  <p className="text-xs md:text-sm text-gray-600">Preview</p>
                  <p className="font-semibold text-sm md:text-base">{product.name}</p>
                </div>
              </div>
            ) : (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          
          {/* Image Upload */}
          <ImageUpload onImageUpload={setUploadedImage} currentImage={uploadedImage} />
          
          {/* Image Adjustments */}
          {uploadedImage && (
            <div className="bg-white rounded-lg md:rounded-xl shadow-soft p-4 md:p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <Palette className="h-4 md:h-5 w-4 md:w-5 text-gray-600 mr-2" />
                <h3 className="text-base md:text-lg font-semibold">Image Adjustments</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    Brightness: {imageAdjustments.brightness}%
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={imageAdjustments.brightness}
                    onChange={(e) => setImageAdjustments(prev => ({ ...prev, brightness: e.target.value }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    Contrast: {imageAdjustments.contrast}%
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={imageAdjustments.contrast}
                    onChange={(e) => setImageAdjustments(prev => ({ ...prev, contrast: e.target.value }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    Saturation: {imageAdjustments.saturation}%
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={imageAdjustments.saturation}
                    onChange={(e) => setImageAdjustments(prev => ({ ...prev, saturation: e.target.value }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
                
                <button
                  onClick={() => setImageAdjustments({ brightness: 100, contrast: 100, saturation: 100 })}
                  className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-xs md:text-sm font-medium"
                >
                  Reset Adjustments
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-4 md:space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
              {product.name}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Size Selection */}
          <div>
            <div className="flex items-center mb-3 md:mb-4">
              <Ruler className="h-4 md:h-5 w-4 md:w-5 text-gray-600 mr-2" />
              <h3 className="text-base md:text-lg font-semibold">Choose Size</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size.size}
                  onClick={() => handleSizeSelect(size)}
                  className={`p-3 md:p-4 border-2 rounded-lg text-left transition-colors text-sm md:text-base ${
                    selectedSize?.size === size.size
                      ? 'border-primary bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold text-sm md:text-base">{size.size}</div>
                  <div className="text-primary font-bold text-sm md:text-base">₹{size.price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Shape Selection */}
          <div>
            <div className="flex items-center mb-3 md:mb-4">
              <Shapes className="h-4 md:h-5 w-4 md:w-5 text-gray-600 mr-2" />
              <h3 className="text-base md:text-lg font-semibold">Choose Shape</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
              {product.shapes && product.shapes.length > 0 ? (
                product.shapes.map((shape) => (
                  <button
                    key={shape.shape}
                    onClick={() => handleShapeSelect(shape)}
                    className={`p-3 md:p-4 border-2 rounded-lg text-left transition-colors text-sm md:text-base ${
                      selectedShape?.shape === shape.shape
                        ? 'border-primary bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold text-sm md:text-base">{shape.shape}</div>
                    <div className="text-primary font-bold text-sm md:text-base">
                      {shape.price > 0 ? `+₹${shape.price}` : 'Base'}
                    </div>
                  </button>
                ))
              ) : (
                <p className="text-gray-500 col-span-2 text-xs md:text-sm">No shapes available for this product</p>
              )}
            </div>
          </div>

          {/* Price Display */}
          {selectedSize && selectedShape && (
            <div className="bg-gray-50 rounded-lg md:rounded-xl p-4 md:p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-2 text-sm md:text-base">
                <span className="text-gray-700">Size:</span>
                <span className="font-semibold">{selectedSize.size} (₹{selectedSize.price})</span>
              </div>
              <div className="flex justify-between items-center mb-4 text-sm md:text-base">
                <span className="text-gray-700">Shape:</span>
                <span className="font-semibold">{selectedShape.shape} {selectedShape.price > 0 ? `(+₹${selectedShape.price})` : '(Base)'}</span>
              </div>
              <div className="flex justify-between items-center border-t pt-4">
                <span className="text-base md:text-lg text-gray-700">Total Price:</span>
                <span className="text-xl md:text-2xl font-bold text-primary">₹{calculateTotalPrice()}</span>
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedSize || !selectedShape || !uploadedImage}
            className={`w-full flex items-center justify-center space-x-2 px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold transition-colors text-sm md:text-base ${
              selectedSize && selectedShape && uploadedImage
                ? 'bg-primary text-white hover:bg-blue-600 active:scale-95'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="h-4 md:h-5 w-4 md:w-5" />
            <span>Add to Cart</span>
          </button>

          {(!selectedSize || !selectedShape || !uploadedImage) && (
            <p className="text-center text-gray-500 text-xs md:text-sm px-2">
              {!uploadedImage && "Please upload an image"} 
              {!uploadedImage && (!selectedSize || !selectedShape) && ", "}
              {!selectedSize && "select a size"} 
              {!selectedSize && !selectedShape && " and "}
              {!selectedShape && "select a shape"} to continue
            </p>
          )}

          {/* Product Features */}
          <div className="border-t pt-4 md:pt-6">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Features</h3>
            <ul className="space-y-2 text-gray-600 text-xs md:text-sm">
              <li>• High-quality printing</li>
              <li>• Durable materials</li>
              <li>• Custom photo positioning</li>
              <li>• Professional finish</li>
              {product.category === 'magnetic' && <li>• Strong magnetic backing</li>}
              {product.category === 'acrylic' && <li>• Crystal clear transparency</li>}
              {product.category === 'mdf' && <li>• Smooth wooden finish</li>}
            </ul>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;