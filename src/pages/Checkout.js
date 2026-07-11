import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { MessageCircle, User, Phone, MapPin, ShoppingBag } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, getTotalItems, clearCart } = useCart();
  
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  // Admin WhatsApp number (you can change this)
  const ADMIN_WHATSAPP = '918688273233'; // Replace with actual admin WhatsApp number

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const generateOrderMessage = () => {
    let message = `🛒 *New Order from Chaitra Wrap@Wear*\n\n`;
    message += `👤 *Customer Details:*\n`;
    message += `Name: ${customerInfo.name}\n`;
    message += `Phone: ${customerInfo.phone}\n`;
    message += `Email: ${customerInfo.email || 'Not provided'}\n`;
    message += `Address: ${customerInfo.address}\n\n`;
    
    message += `📦 *Order Details:*\n`;
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Size: ${item.size}\n`;
      message += `   Shape: ${item.shape}\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Price: ₹${item.price} each\n`;
      message += `   Subtotal: ₹${item.price * item.quantity}\n`;
      message += `   Custom Image: ${item.uploadedImage ? '✅ Uploaded' : '❌ Not uploaded'}\n\n`;
    });
    
    message += `💰 *Total Amount: ₹${getTotalPrice()}*\n`;
    message += `📋 *Total Items: ${getTotalItems()}*\n\n`;
    
    if (customerInfo.notes) {
      message += `📝 *Special Instructions:*\n${customerInfo.notes}\n\n`;
    }
    
    message += `⏰ *Order Time:* ${new Date().toLocaleString()}\n`;
    message += `🌐 *Ordered via:* Chaitra Wrap@Wear Website`;
    
    return encodeURI(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert('Please fill in all required fields');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setIsProcessing(true);

    try {
      // Generate WhatsApp message
      const message = generateOrderMessage();
      
      // Create WhatsApp URL
      const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${message}`;
      
      // Clear the cart
      clearCart();
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // Show success message and redirect
      alert('Order submitted successfully! You will be redirected to WhatsApp to complete your order.');
      navigate('/');
      
    } catch (error) {
      console.error('Error processing order:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-24 w-24 text-gray-400 mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some products before checking out!</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 md:mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Customer Information Form */}
        <div>
          <div className="bg-white rounded-lg md:rounded-xl shadow-soft p-4 md:p-6 border border-gray-100">
            <div className="flex items-center mb-6">
              <User className="h-5 md:h-6 w-5 md:w-6 text-primary mr-2" />
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">Customer Information</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  <input
                    type="tel"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-3 md:pr-4 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    placeholder="+91 9912357736"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                  Delivery Address *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                  <textarea
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full pl-10 pr-3 md:pr-4 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm resize-none"
                    placeholder="Enter your complete delivery address"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                  Special Instructions
                </label>
                <textarea
                  name="notes"
                  value={customerInfo.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm resize-none"
                  placeholder="Any special requests or delivery instructions..."
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4">
                <div className="flex items-start gap-2 md:gap-3">
                  <MessageCircle className="h-4 md:h-5 w-4 md:w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs md:text-sm font-medium text-blue-900">Order Process</h4>
                    <p className="text-xs md:text-sm text-blue-800 mt-1">
                      After clicking "Complete Order", you'll be redirected to WhatsApp to confirm your order with our admin.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full flex items-center justify-center gap-2 py-2.5 md:py-3 rounded-lg font-semibold transition-colors text-sm md:text-base ${
                  isProcessing
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700 active:scale-95'
                }`}
              >
                <MessageCircle className="h-4 md:h-5 w-4 md:w-5" />
                <span>{isProcessing ? 'Processing...' : 'Complete Order via WhatsApp'}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg md:rounded-xl shadow-soft p-4 md:p-6 border border-gray-100 sticky top-16 md:top-20">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>

            <div className="space-y-3 md:space-y-4 mb-6 max-h-96 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}-${item.shape}`} className="flex gap-3 pb-3 border-b last:border-0 last:pb-0">
                  <div className="w-12 md:w-16 h-12 md:h-16 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden">
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
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-xs md:text-sm line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-gray-600">
                      {item.size} • {item.shape}
                    </p>
                    <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-semibold text-xs md:text-sm">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="space-y-2 mb-4 text-xs md:text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t text-sm md:text-base">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="text-lg md:text-2xl font-bold text-primary">₹{getTotalPrice()}</span>
                </div>
              </div>

              <div className="text-xs text-gray-600 space-y-1 bg-gray-50 p-2 md:p-3 rounded-lg">
                <p>✓ Free delivery across India</p>
                <p>✓ Quality guarantee</p>
                <p>✓ 24/7 customer support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;