import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import ScrollReveal from '../components/ScrollReveal';
import { Search, Package, Zap, Crown, Sparkles, SlidersHorizontal, X, ChevronRight } from 'lucide-react';

const ProductsAurora = () => {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    const handleFilterToggle = () => setShowFilterModal(prev => !prev);
    window.addEventListener('toggleFilterModal', handleFilterToggle);
    return () => window.removeEventListener('toggleFilterModal', handleFilterToggle);
  }, []);

  const categories = [
    { value: 'all', label: 'All Products', icon: Package, count: products.length },
    { value: 'magnetic', label: 'Magnetic', icon: Sparkles, count: products.filter(p => p.category === 'magnetic').length },
    { value: 'keychain', label: 'Keychains', icon: Crown, count: products.filter(p => p.category === 'keychain').length },
    { value: 'acrylic', label: 'Acrylic', icon: Zap, count: products.filter(p => p.category === 'acrylic').length },
    { value: 'mdf', label: 'MDF', icon: Crown, count: products.filter(p => p.category === 'mdf').length },
  ];

  const priceRanges = [
    { value: [0, 500], label: 'Under ₹500' },
    { value: [500, 1000], label: '₹500 – ₹1,000' },
    { value: [1000, 2000], label: '₹1,000 – ₹2,000' },
    { value: [2000, 5000], label: 'Above ₹2,000' },
  ];

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const minPrice = Math.min(...product.sizes.map(s => s.price));
    const priceMatch = minPrice >= priceRange[0] && minPrice <= priceRange[1];
    const searchMatch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && priceMatch && searchMatch;
  });

  const clearAll = () => {
    setSelectedCategory('all');
    setPriceRange([0, 2000]);
    setSearchQuery('');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 pt-32 pb-20">
      {/* Aurora Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-40"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(124, 58, 237, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 20%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(124, 58, 237, 0.2) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: 'loop' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4">
              Our Collection
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover premium personalized frames and keychains that celebrate your precious moments
            </p>
          </div>
        </ScrollReveal>

        {/* Search Bar */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-12 relative">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg"
              />
            </div>
          </div>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories & Filters */}
          <ScrollReveal direction="left" delay={0.2} className="lg:w-64 flex-shrink-0">
            <motion.div
              className="sticky top-32 rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '24px',
              }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Filters</h3>
                {(selectedCategory !== 'all' || priceRange[1] !== 2000 || searchQuery) && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={clearAll}
                    className="text-sm text-violet-400 hover:text-violet-300"
                  >
                    Clear All
                  </motion.button>
                )}
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">Categories</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <motion.button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      whileHover={{ x: 4 }}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 flex items-center justify-between ${
                        selectedCategory === cat.value
                          ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white'
                          : 'text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <cat.icon className="w-4 h-4" />
                        {cat.label}
                      </span>
                      <span className="text-xs opacity-70">({cat.count})</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="border-t border-white/10 pt-6">
                <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">Price Range</h4>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <motion.button
                      key={range.label}
                      onClick={() => setPriceRange(range.value)}
                      whileHover={{ x: 4 }}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 text-sm ${
                        priceRange[0] === range.value[0] && priceRange[1] === range.value[1]
                          ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white'
                          : 'text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      {range.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Products Grid */}
          <ScrollReveal direction="up" delay={0.2} className="flex-1">
            {/* Results Count */}
            <div className="mb-8 flex items-center justify-between">
              <p className="text-gray-400">
                Showing{' '}
                <span className="text-white font-semibold">{filteredProducts.length}</span>
                {' '}products
              </p>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <Package className="w-16 h-16 text-gray-600 mx-auto mb-4 opacity-50" />
                <p className="text-gray-400 text-lg mb-4">No products found</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={clearAll}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition-all"
                >
                  Clear Filters
                </motion.button>
              </motion.div>
            )}
          </ScrollReveal>
        </div>
      </div>

      {/* Filter Modal - Mobile */}
      <AnimatePresence>
        {showFilterModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFilterModal(false)}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-0 left-0 right-0 rounded-t-3xl max-h-[80vh] overflow-y-auto"
              style={{
                background: 'linear-gradient(to bottom, #0A0F1E, #0F172A)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div className="p-6 sticky top-0 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Filters</h2>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-8">
                {/* Categories */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-4 uppercase">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => {
                          setSelectedCategory(cat.value);
                          setShowFilterModal(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                          selectedCategory === cat.value
                            ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white'
                            : 'text-gray-300 hover:bg-white/5'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-4 uppercase">Price</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range.label}
                        onClick={() => {
                          setPriceRange(range.value);
                          setShowFilterModal(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                          priceRange[0] === range.value[0] && priceRange[1] === range.value[1]
                            ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white'
                            : 'text-gray-300 hover:bg-white/5'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    clearAll();
                    setShowFilterModal(false);
                  }}
                  className="w-full py-3 rounded-lg bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all"
                >
                  Clear All
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductsAurora;
