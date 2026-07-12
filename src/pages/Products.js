import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import { Search, Heart, ChevronRight, Package, Zap, Crown, Sparkles } from 'lucide-react';

const Products = () => {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    const handleFilterToggle = () => {
      setShowFilterModal(!showFilterModal);
    };
    window.addEventListener('toggleFilterModal', handleFilterToggle);
    return () => window.removeEventListener('toggleFilterModal', handleFilterToggle);
  }, [showFilterModal]);

  const categories = [
    { value: 'all', label: 'All Products', icon: Package },
    { value: 'magnetic', label: 'Magnetic', icon: Sparkles },
    { value: 'keychain', label: 'Keychains', icon: Crown },
    { value: 'acrylic', label: 'Acrylic', icon: Zap },
    { value: 'mdf', label: 'MDF', icon: Crown }
  ];

  const priceRanges = [
    { value: [0, 500], label: 'Under ₹500' },
    { value: [500, 1000], label: '₹500 - ₹1000' },
    { value: [1000, 2000], label: '₹1000 - ₹2000' },
    { value: [2000, 5000], label: 'Above ₹2000' }
  ];

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    
    const minPrice = Math.min(...product.sizes.map(size => size.price));
    const priceMatch = minPrice >= priceRange[0] && minPrice <= priceRange[1];
    
    const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       product.description.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && priceMatch && searchMatch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen bg-gradient-to-b from-white to-blue-50"
    >
      {/* Filter Modal - Mobile/Tablet */}
      {showFilterModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setShowFilterModal(false)}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Filters</h3>
              <button
                onClick={() => setShowFilterModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Category</h4>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <label key={category.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category.value}
                        checked={selectedCategory === category.value}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="h-4 w-4 text-primary accent-primary"
                      />
                      <div className="ml-3 flex items-center space-x-2">
                        <Icon className="h-4 w-4 text-primary opacity-70" />
                        <span className="text-gray-700">{category.label}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Price Range</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">₹{priceRange[0]}</span>
                  <span className="text-gray-600">₹{priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="pt-3 space-y-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.label}
                      onClick={() => setPriceRange(range.value)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        priceRange[0] === range.value[0] && priceRange[1] === range.value[1]
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setPriceRange([0, 2000]);
                  setSearchQuery('');
                }}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-300 transition-all font-medium"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowFilterModal(false)}
                className="flex-1 bg-primary text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-all font-medium"
              >
                Apply
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Banner Section */}
      <div className="relative h-48 md:h-64 lg:h-80 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&h=400&fit=crop"
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white z-10 px-3 xs:px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 font-display">
              Craft Memories That Last Forever
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/90 max-w-2xl mx-auto mb-4 md:mb-6">
              Explore our collection of personalized photo frames, keychains, and gifts
            </p>

            {/* Breadcrumbs */}
            <div className="flex items-center justify-center space-x-2 text-white/80 text-xs md:text-sm">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="h-3 md:h-4 w-3 md:w-4" />
              <span className="text-white">Products</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Search Bar */}
        <div className="mb-6 md:mb-8">
          <div className="relative">
            <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 h-4 md:h-5 w-4 md:w-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3 bg-white rounded-lg md:rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-soft transition-all text-sm md:text-base"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 md:gap-8">
          {/* Products Grid - Full Width */}
          <div className="flex-1 w-full">
            <div className="mb-6 flex justify-between items-center flex-wrap gap-2">
              <p className="text-gray-600 font-medium text-sm md:text-base">
                Showing <span className="text-primary font-bold">{filteredProducts.length}</span> products
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6"
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 md:py-16"
              >
                <Package className="mx-auto h-12 md:h-16 w-12 md:w-16 text-gray-400 mb-4" />
                <p className="text-gray-500 text-base md:text-lg mb-4">No products found matching your filters.</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange([0, 2000]);
                    setSearchQuery('');
                  }}
                  className="bg-primary text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg hover:bg-blue-600 transition-colors text-sm md:text-base"
                >
                  Clear Filters
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Products;