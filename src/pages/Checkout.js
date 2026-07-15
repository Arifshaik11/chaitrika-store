import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { MessageCircle, User, Phone, MapPin, ShoppingBag } from 'lucide-react';
import SEO from '../components/SEO';
import { breadcrumbSchema } from '../utils/structuredData';

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

  // Admin WhatsApp number
  const ADMIN_WHATSAPP = '918499999498'; // Chaitra Wrap & Wear admin number

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const generateOrderMessage = () => {
    let message = `🛒 *New Order from Chaitra Wrap & Wear*\n\n`;
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
    message += `🌐 *Ordered via:* Chaitra Wrap & Wear Website`;
    
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
      <div className="bg-white min-h-screen pt-20 text-gray-900">
        <SEO
          title="Checkout | Chaitra Wrap & Wear"
          description="Complete your order"
          canonical="https://chaitrika.in/checkout"
          structuredData={breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Checkout', url: '/checkout' }
          ])}
        />
        <div className="max-w-md mx-auto flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5 bg-[#F8F8F8] border border-[#EBEBEB]">
            <ShoppingBag className="w-6 h-6 text-gray-400" />
          </div>
          <h2 className="font-display text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-sm text-gray-400 mb-8 leading-relaxed">Add some products to your cart before checking out!</p>
          <button
            onClick={() => navigate('/products')}
            className="btn-primary"
          >
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-20 text-gray-900 pb-16">
      <SEO
        title="Checkout | Chaitra Wrap & Wear"
        description="Proceed to checkout and complete your personalized order"
        canonical="https://chaitrika.in/checkout"
        structuredData={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Checkout', url: '/checkout' }
        ])}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 className="font-display text-3xl font-semibold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information Form */}
          <div>
            <div className="bg-white rounded-lg p-5 border border-[#EBEBEB]">
              <div className="flex items-center mb-6">
                <User className="h-4 w-4 text-[#C9897A] mr-2" />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-700">Customer Details</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9897A] text-sm transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
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
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9897A] text-sm transition-colors"
                      placeholder="+91 9912357736"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9897A] text-sm transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
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
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9897A] text-sm transition-colors resize-none"
                      placeholder="Enter your complete delivery address"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                    Special Instructions
                  </label>
                  <textarea
                    name="notes"
                    value={customerInfo.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9897A] text-sm transition-colors resize-none"
                    placeholder="Any special requests or delivery instructions..."
                  />
                </div>

                <div className="bg-[#F8F8F8] border border-[#EBEBEB] rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <MessageCircle className="h-4 w-4 text-[#C9897A] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-700">Order Process</h4>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                        After clicking "Complete Order", you will be redirected to WhatsApp to confirm and complete your purchase.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 rounded-lg font-medium text-sm text-white flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: isProcessing ? '#9CA3AF' : '#111111',
                    cursor: isProcessing ? 'not-allowed' : 'pointer'
                  }}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{isProcessing ? 'Processing...' : 'Complete Order via WhatsApp'}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-[#F8F8F8] rounded-lg p-5 border border-[#EBEBEB] sticky top-24">
              <h2 className="font-display text-lg font-semibold text-gray-900 mb-5">Order Summary</h2>

              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.shape}`} className="flex gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="w-12 h-12 bg-white rounded border border-gray-100 flex-shrink-0 overflow-hidden">
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
                      <h4 className="font-semibold text-gray-900 text-xs line-clamp-1">{item.name}</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5">
                        {item.size} • {item.shape} • Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-xs text-gray-900">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="space-y-2 mb-4 text-xs text-gray-500 uppercase tracking-wider">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-gray-900 font-semibold">₹{getTotalPrice()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-emerald-600 font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-4 border-t border-gray-200">
                    <span className="font-semibold text-sm text-gray-900 normal-case">Total</span>
                    <span className="text-xl font-bold text-gray-900">₹{getTotalPrice()}</span>
                  </div>
                </div>

                <div className="text-[10px] text-gray-400 uppercase tracking-wider space-y-1 bg-white p-3 rounded border border-gray-100 mt-4">
                  <p>✓ Free delivery across India</p>
                  <p>✓ Quality guarantee</p>
                  <p>✓ Personalized support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;