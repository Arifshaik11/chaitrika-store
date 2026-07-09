import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();
  const [removingItems, setRemovingItems] = useState(new Set());

  const handleRemove = (id, size) => {
    setRemovingItems(prev => new Set(prev).add(`${id}-${size}`));
    setTimeout(() => {
      removeFromCart(id, size);
      setRemovingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(`${id}-${size}`);
        return newSet;
      });
    }, 300);
  };

  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            <ShoppingBag className="mx-auto h-24 w-24 text-gray-400 mb-6" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some products to get started!</p>
          <Link
            to="/products"
            className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 md:mb-8"
      >
        Shopping Cart ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'})
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-3 md:space-y-4">
          <AnimatePresence>
            {cartItems.map((item, index) => (
              <motion.div
                key={`${item.id}-${item.size}-${item.shape}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-lg md:rounded-xl shadow-soft overflow-hidden transition-all duration-300 ${
                  removingItems.has(`${item.id}-${item.size}-${item.shape}`) ? 'opacity-50' : ''
                }`}
              >
                <div className="p-4 md:p-6 flex flex-col sm:flex-row gap-3 md:gap-4">
                  {/* Product Image */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-full sm:w-24 md:w-32 h-24 md:h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0"
                  >
                    {item.uploadedImage ? (
                      <img
                        src={item.uploadedImage}
                        alt="Uploaded"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={item.image.startsWith('http') || item.image.startsWith('data:') ? item.image : `${process.env.PUBLIC_URL}${item.image}`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </motion.div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-base md:text-lg font-semibold text-gray-900 flex-1 pr-2">
                          {item.name}
                        </h3>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRemove(item.id, item.size, item.shape)}
                          className="text-red-500 hover:text-red-700 p-1 flex-shrink-0"
                        >
                          <Trash2 className="h-4 md:h-5 w-4 md:w-5" />
                        </motion.button>
                      </div>

                      <p className="text-xs md:text-sm text-gray-600 mb-1">Size: {item.size}</p>
                      <p className="text-xs md:text-sm text-gray-600 mb-2">Shape: {item.shape}</p>
                      <p className="text-lg md:text-xl font-bold text-primary mb-3 md:mb-4">₹{item.price}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs md:text-sm text-gray-700">Qty:</span>
                        <div className="flex items-center border rounded-lg bg-gray-50">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateQuantity(item.id, item.size, item.shape, item.quantity - 1)}
                            className="p-1 md:p-2 hover:bg-gray-100"
                          >
                            <Minus className="h-3 md:h-4 w-3 md:w-4" />
                          </motion.button>
                          <span className="px-2 md:px-4 py-1 md:py-2 border-x text-sm">{item.quantity}</span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateQuantity(item.id, item.size, item.shape, item.quantity + 1)}
                            className="p-1 md:p-2 hover:bg-gray-100"
                          >
                            <Plus className="h-3 md:h-4 w-3 md:w-4" />
                          </motion.button>
                        </div>
                      </div>

                      <span className="text-sm md:text-base font-semibold">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-lg md:rounded-xl shadow-soft p-4 md:p-6 sticky top-16 md:top-20">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">
              Order Summary
            </h3>

            <div className="space-y-3 mb-6 text-sm md:text-base">
              <div className="flex justify-between">
                <span className="text-gray-600">Items ({getTotalItems()})</span>
                <span className="font-semibold">₹{getTotalPrice()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600 font-semibold">Free</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-base md:text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-xl md:text-2xl font-bold text-primary">₹{getTotalPrice()}</span>
                </div>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/checkout"
                className="w-full bg-gradient-to-r from-primary to-secondary text-white py-2.5 md:py-3 rounded-lg font-semibold hover:shadow-lg transition-all text-center block text-sm md:text-base"
              >
                Proceed to Checkout
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-3"
            >
              <Link
                to="/products"
                className="w-full bg-gray-100 text-gray-700 py-2.5 md:py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center block text-sm md:text-base"
              >
                Continue Shopping
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;