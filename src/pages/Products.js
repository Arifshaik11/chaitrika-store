import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import { Filter, Search, Heart, ChevronRight, Package, Zap, Crown, Sparkles } from 'lucide-react';

const Products = () => {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [searchQuery, setSearchQuery] = useState('');

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
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Banner Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-48 md:h-64 lg:h-80 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 overflow-hidden"
      >
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
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center text-white z-10 px-3 xs:px-4"
          >
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
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Search Bar */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6 md:mb-8"
        >
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
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-full lg:w-72 flex-shrink-0"
          >
            <div className="bg-white rounded-lg md:rounded-2xl shadow-soft p-4 md:p-6 sticky top-16 md:top-20 space-y-6">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 md:h-5 w-4 md:w-5 text-primary" />
                <h3 className="text-base md:text-lg font-semibold text-gray-900">Filters</h3>
              </div>

              {/* Category Filter with Icons */}
              <div>
                <h4 className="text-xs md:text-sm font-semibold text-gray-900 mb-3 md:mb-4">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <motion.label
                        key={category.value}
                        whileHover={{ x: 4 }}
                        className="flex items-center cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="category"
                          value={category.value}
                          checked={selectedCategory === category.value}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="h-4 w-4 text-primary accent-primary"
                        />
                        <div className="ml-3 flex items-center space-x-2 flex-1 px-2 py-2 rounded-lg group-hover:bg-gray-50 transition-colors">
                          <Icon className="h-3 md:h-4 w-3 md:w-4 text-primary opacity-70" />
                          <span className="text-xs md:text-sm text-gray-700">{category.label}</span>
                        </div>
                      </motion.label>
                    );
                  })}
                </div>
              </div>

              {/* Price Slider */}
              <div>
                <h4 className="text-xs md:text-sm font-semibold text-gray-900 mb-3 md:mb-4">Price Range</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs md:text-sm">
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
                      <motion.button
                        key={range.label}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setPriceRange(range.value)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs md:text-sm transition-all ${
                          priceRange[0] === range.value[0] && priceRange[1] === range.value[1]
                            ? 'bg-primary text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {range.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedCategory('all');
                  setPriceRange([0, 2000]);
                  setSearchQuery('');
                }}
                className="w-full bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 px-4 py-2 rounded-lg hover:from-gray-200 hover:to-gray-100 transition-all text-xs md:text-sm font-medium"
              >
                Clear All
              </motion.button>
            </div>
          </motion.div>

          {/* Products Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1"
          >
            <div className="mb-6 flex justify-between items-center flex-wrap gap-2">
              <motion.p
                key={filteredProducts.length}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-600 font-medium text-sm md:text-base"
              >
                Showing <span className="text-primary font-bold">{filteredProducts.length}</span> products
              </motion.p>
            </div>

            {filteredProducts.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
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
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Products;