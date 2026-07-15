import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { breadcrumbSchema } from '../utils/structuredData';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();
  const [removingKeys, setRemovingKeys] = useState(new Set());

  const handleRemove = (id, size, shape) => {
    const key = `${id}-${size}-${shape}`;
    setRemovingKeys(prev => new Set(prev).add(key));
    setTimeout(() => {
      removeFromCart(id, size);
      setRemovingKeys(prev => { const s = new Set(prev); s.delete(key); return s; });
    }, 300);
  };

  const cleanBorderCard = {
    background: '#FFFFFF',
    border: '1px solid #EBEBEB',
    borderRadius: '12px',
  };

  /* ─── Empty State ─── */
  if (cartItems.length === 0) {
    return (
      <div className="bg-white min-h-screen pt-20 text-gray-900">
        <SEO
          title="Shopping Cart | Chaitra Wrap & Wear"
          description="Your shopping cart is empty"
          canonical="https://chaitrika.in/cart"
          structuredData={breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Cart', url: '/cart' }
          ])}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto flex flex-col items-center justify-center min-h-[60vh] px-4 text-center"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-5 bg-[#F8F8F8] border border-[#EBEBEB]"
          >
            <ShoppingBag className="w-6 h-6 text-gray-400" />
          </div>

          <h2 className="font-display text-2xl font-semibold mb-2">
            Your cart is empty
          </h2>

          <p className="text-sm text-gray-400 mb-8 leading-relaxed">
            It looks like you haven't added anything to your cart yet. Discover our premium personalized collections.
          </p>

          <Link to="/products" className="btn-primary">
            Browse Products
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-20 text-gray-900 pb-16">
      <SEO
        title="Shopping Cart | Chaitra Wrap & Wear"
        description="Review and manage your shopping cart items"
        canonical="https://chaitrika.in/cart"
        structuredData={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Cart', url: '/cart' }
        ])}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-semibold text-gray-900">
            Shopping Cart
          </h1>
          <p className="text-xs text-gray-400 uppercase tracking-wider mt-1.5">
            {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cartItems.map((item, index) => {
                const key = `${item.id}-${item.size}-${item.shape}`;
                const isRemoving = removingKeys.has(key);
                return (
                  <motion.div
                    key={key}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: isRemoving ? 0.4 : 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="p-4"
                    style={cleanBorderCard}
                  >
                    <div className="flex gap-4">
                      {/* Image */}
                      <div
                        className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[#F8F8F8] border border-gray-100"
                      >
                        {item.uploadedImage ? (
                          <img src={item.uploadedImage} alt="Uploaded" className="w-full h-full object-cover" />
                        ) : (
                          <img
                            src={item.image?.startsWith('http') || item.image?.startsWith('data:') ? item.image : `${process.env.PUBLIC_URL}${item.image}`}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-semibold text-sm text-gray-950 pr-2">
                              {item.name}
                            </h3>
                            <button
                              onClick={() => handleRemove(item.id, item.size, item.shape)}
                              className="text-gray-300 hover:text-red-500 transition-colors p-1"
                              title="Remove Item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="flex flex-wrap gap-1.5 mb-1.5">
                            <span className="text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                              {item.size}
                            </span>
                            <span className="text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                              {item.shape}
                            </span>
                          </div>

                          <p className="text-sm font-bold text-gray-900">
                            ₹{item.price}
                          </p>
                        </div>

                        {/* Qty Controls */}
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                          <div className="flex items-center border border-gray-200 rounded bg-[#F8F8F8]">
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.shape, item.quantity - 1)}
                              className="px-2 py-1 text-gray-500 hover:text-gray-900"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 text-xs font-semibold text-gray-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.shape, item.quantity + 1)}
                              className="px-2 py-1 text-gray-500 hover:text-gray-900"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-xs font-bold text-gray-500">
                            Subtotal: ₹{item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div
              className="sticky top-24 p-6"
              style={{
                background: '#F8F8F8',
                border: '1px solid #EBEBEB',
                borderRadius: '12px',
              }}
            >
              <h3 className="font-display text-lg font-semibold text-gray-900 mb-5">
                Order Summary
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-xs text-gray-500 uppercase tracking-wider">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span className="text-gray-950 font-semibold">₹{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 uppercase tracking-wider">
                  <span>Shipping</span>
                  <span className="font-semibold text-emerald-600">Free</span>
                </div>
                <div
                  className="flex justify-between items-baseline pt-4 border-t border-gray-200"
                >
                  <span className="font-semibold text-sm text-gray-900">Total Price</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{getTotalPrice()}
                  </span>
                </div>
              </div>

              <Link to="/checkout" className="block w-full">
                <button
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>

              <Link
                to="/products"
                className="block text-center text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors mt-4"
              >
                Continue Shopping
              </Link>

              <p className="text-center text-[10px] text-gray-400 tracking-wider uppercase mt-6 pt-4 border-t border-gray-100">
                🔒 Checkout securely via WhatsApp
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;