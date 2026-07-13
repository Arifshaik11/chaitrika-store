import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

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

  const glassCard = {
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '20px',
  };

  /* ─── Empty State ─── */
  if (cartItems.length === 0) {
    return (
      <div style={{ background: '#0F172A', minHeight: '100vh', paddingTop: '80px', color: '#fff' }}>
        {/* Aurora bg */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute w-96 h-96 rounded-full" style={{ top: '10%', left: '10%', background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute w-80 h-80 rounded-full" style={{ bottom: '20%', right: '10%', background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-4 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
            className="w-28 h-28 rounded-3xl flex items-center justify-center mb-6 mx-auto"
            style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(168,85,247,0.2)' }}
          >
            <ShoppingBag className="w-12 h-12" style={{ color: '#A855F7' }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-black mb-3"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Your cart is empty
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-8 max-w-sm"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            Looks like you haven't added anything yet. Start browsing our premium collection!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/products">
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED, #A855F7, #EC4899)',
                  boxShadow: '0 0 30px rgba(124,58,237,0.4)',
                  fontFamily: 'Outfit, sans-serif',
                }}
              >
                <Sparkles className="w-4 h-4" />
                Shop Now
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ background: '#0F172A', minHeight: '100vh', paddingTop: '80px', color: '#fff' }}>
      {/* Aurora bg */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute w-96 h-96 rounded-full" style={{ top: '-80px', right: '15%', background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute w-72 h-72 rounded-full" style={{ bottom: '20%', left: '5%', background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Shopping{' '}
            <span style={{
              background: 'linear-gradient(135deg, #A855F7, #EC4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Cart
            </span>
          </h1>
          <p className="mt-1 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
            {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: isRemoving ? 0.4 : 1, x: 0 }}
                    exit={{ opacity: 0, x: 100, scale: 0.9 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    className="p-5 transition-all duration-300"
                    style={{
                      ...glassCard,
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(168,85,247,0.2)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Image */}
                      <motion.div
                        whileHover={{ scale: 1.04 }}
                        className="w-full sm:w-28 h-28 rounded-xl overflow-hidden flex-shrink-0"
                        style={{ background: 'rgba(255,255,255,0.04)' }}
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
                      </motion.div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-white leading-snug pr-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                              {item.name}
                            </h3>
                            <motion.button
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleRemove(item.id, item.size, item.shape)}
                              className="p-1.5 rounded-lg transition-colors flex-shrink-0"
                              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.15)' }}
                            >
                              <Trash2 className="w-3.5 h-3.5" style={{ color: '#EF4444' }} />
                            </motion.button>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-2">
                            <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(168,85,247,0.2)', color: '#A855F7' }}>
                              {item.size}
                            </span>
                            <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.2)', color: '#EC4899' }}>
                              {item.shape}
                            </span>
                          </div>
                          <p className="font-black text-lg" style={{
                            fontFamily: 'Outfit, sans-serif',
                            background: 'linear-gradient(135deg, #A855F7, #EC4899)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }}>
                            ₹{item.price}
                          </p>
                        </div>

                        {/* Qty Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)' }}>
                            <motion.button
                              whileHover={{ backgroundColor: 'rgba(124,58,237,0.2)' }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.size, item.shape, item.quantity - 1)}
                              className="px-3 py-2 transition-colors"
                              style={{ color: 'rgba(255,255,255,0.7)' }}
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </motion.button>
                            <span className="px-4 py-2 font-bold text-white border-x text-sm" style={{ borderColor: 'rgba(255,255,255,0.08)', fontFamily: 'Outfit, sans-serif' }}>
                              {item.quantity}
                            </span>
                            <motion.button
                              whileHover={{ backgroundColor: 'rgba(124,58,237,0.2)' }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.size, item.shape, item.quantity + 1)}
                              className="px-3 py-2 transition-colors"
                              style={{ color: 'rgba(255,255,255,0.7)' }}
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </motion.button>
                          </div>
                          <span className="font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            ₹{item.price * item.quantity}
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
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div
              className="sticky top-24 p-6"
              style={{
                background: 'rgba(124,58,237,0.07)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(124,58,237,0.2)',
                borderRadius: '24px',
              }}
            >
              <h3 className="text-lg font-black text-white mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Order Summary
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'rgba(255,255,255,0.55)' }}>Items ({getTotalItems()})</span>
                  <span className="text-white font-medium">₹{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'rgba(255,255,255,0.55)' }}>Shipping</span>
                  <span className="font-semibold" style={{ color: '#10B981' }}>Free ✨</span>
                </div>
                <div
                  className="flex justify-between items-center pt-4 mt-4"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <span className="font-bold text-white">Total</span>
                  <span className="text-2xl font-black" style={{
                    fontFamily: 'Outfit, sans-serif',
                    background: 'linear-gradient(135deg, #A855F7, #EC4899)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    ₹{getTotalPrice()}
                  </span>
                </div>
              </div>

              <Link to="/checkout">
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white cursor-pointer mb-3"
                  style={{
                    background: 'linear-gradient(135deg, #7C3AED, #A855F7, #EC4899)',
                    boxShadow: '0 0 25px rgba(124,58,237,0.4)',
                    fontFamily: 'Outfit, sans-serif',
                  }}
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </Link>

              <Link to="/products">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 rounded-2xl font-semibold text-center text-sm cursor-pointer transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.6)',
                    fontFamily: 'Outfit, sans-serif',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                >
                  Continue Shopping
                </motion.div>
              </Link>

              {/* Trust note */}
              <p className="text-center text-xs mt-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
                🔒 Secure order via WhatsApp
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;