import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import { Search, ChevronRight, Package, Zap, Crown, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import { breadcrumbSchema } from '../utils/structuredData';

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      <SEO
        title="Shop Our Collection | Chaitra Wrap & Wear"
        description="Browse personalized photo frames, keychains, acrylic displays, and MDF frames. Customize your perfect gift today."
        keywords="personalized photo frames, custom keychains, acrylic frames, MDF frames, shop online, Hyderabad"
        canonical="https://chaitrika.in/products"
        ogTitle="Shop Our Collection | Chaitra Wrap & Wear"
        ogDescription="Personalized photo frames and custom keychains. Browse our full collection now."
        ogImage="https://chaitrika.in/og-image.jpg"
        structuredData={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Shop', url: '/products' }
        ])}
      />
      {/* Filter Modal - Mobile/Tablet */}
      {showFilterModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 flex items-end justify-center"
          onClick={() => setShowFilterModal(false)}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ borderTop: '1px solid #EBEBEB' }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              <button
                onClick={() => setShowFilterModal(false)}
                className="text-gray-400 hover:text-gray-600 text-lg"
              >
                ✕
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Category</h4>
              <div className="space-y-2">
                {categories.map((category) => {
                  return (
                    <label key={category.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category.value}
                        checked={selectedCategory === category.value}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="h-4 w-4 accent-[#C9897A]"
                      />
                      <div className="ml-3">
                        <span className="text-sm text-gray-700">{category.label}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Price Range</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#C9897A]"
                />
                <div className="pt-2 grid grid-cols-2 gap-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.label}
                      onClick={() => setPriceRange(range.value)}
                      className={`text-center px-3 py-2 rounded-lg text-xs transition-all ${
                        priceRange[0] === range.value[0] && priceRange[1] === range.value[1]
                          ? 'bg-ink text-white'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setPriceRange([0, 2000]);
                  setSearchQuery('');
                }}
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-all text-sm font-medium"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowFilterModal(false)}
                className="flex-1 bg-ink text-white px-4 py-3 rounded-lg hover:bg-gray-900 transition-all text-sm font-medium"
              >
                Apply
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Elegant Header Section */}
      <div className="bg-[#F8F8F8] border-b border-[#EBEBEB] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-1.5 text-xs tracking-wider uppercase text-gray-400 mb-3">
            <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-700">Shop Collection</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 mb-3">
            Our Collection
          </h1>
          <p className="text-sm md:text-base text-gray-500 max-w-xl mx-auto">
            Personalized photo frames, acrylic gifts, and keepsakes crafted to preserve your precious memories.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Search & Categories Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 pb-6 border-b border-gray-100">
          
          {/* Search bar */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-[#C9897A] text-sm transition-colors"
            />
          </div>

          {/* Desktop Categories filter chips */}
          <div className="flex flex-wrap gap-2 justify-center w-full md:w-auto">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === category.value
                    ? 'bg-ink text-white'
                    : 'bg-[#F8F8F8] text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

        </div>

        <div className="flex flex-col gap-6">
          <div className="flex-1 w-full">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                Showing <span className="text-gray-900 font-semibold">{filteredProducts.length}</span> products
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Package className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                <p className="text-gray-500 text-sm mb-4">No products found matching your filters.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange([0, 2000]);
                    setSearchQuery('');
                  }}
                  className="bg-ink text-white px-5 py-2 rounded-lg text-xs font-medium hover:bg-gray-900 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Products;