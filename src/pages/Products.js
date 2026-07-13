import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import { Search, Package, Zap, Crown, Sparkles, SlidersHorizontal, X, ChevronRight } from 'lucide-react';

const Products = () => {
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
    <div style={{ background: '#0F172A', minHeight: '100vh', color: '#fff', paddingTop: '80px' }}>
      {/* Aurora bg */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0" style={{ background: '#0F172A' }} />
        <div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            top: '-100px', left: '-100px',
            background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            bottom: '20%', right: '-50px',
            background: 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* Filter Modal */}
      <AnimatePresence>
        {showFilterModal && (
          <motion.div
            key="filter-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
            onClick={() => setShowFilterModal(false)}
          >
            <motion.div
              key="filter-panel"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-full sm:max-w-md max-h-[85vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl p-6"
              style={{
                background: 'rgba(15,23,42,0.95)',
                border: '1px solid rgba(124,58,237,0.25)',
                backdropFilter: 'blur(30px)',
              }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Filter Products
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowFilterModal(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                >
                  <X className="w-4 h-4 text-white/70" />
                </motion.button>
              </div>

              {/* Category */}
              <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: '#A855F7' }}>
                  Category
                </p>
                <div className="space-y-2">
                  {categories.map(cat => {
                    const Icon = cat.icon;
                    const isSelected = selectedCategory === cat.value;
                    return (
                      <motion.button
                        key={cat.value}
                        whileHover={{ x: 4 }}
                        onClick={() => setSelectedCategory(cat.value)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 text-left"
                        style={{
                          background: isSelected ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.03)',
                          border: isSelected ? '1px solid rgba(168,85,247,0.4)' : '1px solid rgba(255,255,255,0.06)',
                          color: isSelected ? '#fff' : 'rgba(255,255,255,0.6)',
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4" style={{ color: isSelected ? '#A855F7' : 'rgba(255,255,255,0.4)' }} />
                          <span className="text-sm font-medium">{cat.label}</span>
                        </div>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            background: isSelected ? 'rgba(168,85,247,0.2)' : 'rgba(255,255,255,0.06)',
                            color: isSelected ? '#A855F7' : 'rgba(255,255,255,0.4)',
                          }}
                        >
                          {cat.count}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: '#EC4899' }}>
                  Price Range
                </p>
                <div className="flex items-center justify-between text-sm mb-3" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <span>₹{priceRange[0]}</span>
                  <span
                    className="font-semibold"
                    style={{ background: 'linear-gradient(135deg, #A855F7, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                  >
                    up to ₹{priceRange[1]}
                  </span>
                </div>
                <input
                  type="range" min="0" max="2000"
                  value={priceRange[1]}
                  onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer mb-4"
                  style={{ accentColor: '#A855F7', background: `linear-gradient(to right, #7C3AED ${(priceRange[1]/2000)*100}%, rgba(255,255,255,0.1) 0%)` }}
                />
                <div className="grid grid-cols-2 gap-2">
                  {priceRanges.map(range => {
                    const isActive = priceRange[0] === range.value[0] && priceRange[1] === range.value[1];
                    return (
                      <button
                        key={range.label}
                        onClick={() => setPriceRange(range.value)}
                        className="px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200"
                        style={{
                          background: isActive ? 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(236,72,153,0.2))' : 'rgba(255,255,255,0.04)',
                          border: isActive ? '1px solid rgba(168,85,247,0.4)' : '1px solid rgba(255,255,255,0.06)',
                          color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                        }}
                      >
                        {range.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={clearAll}
                  className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}
                >
                  Clear All
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => setShowFilterModal(false)}
                  className="flex-1 py-3 rounded-xl font-semibold text-sm text-white"
                  style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)', boxShadow: '0 0 20px rgba(124,58,237,0.3)' }}
                >
                  Apply Filters
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Banner */}
      <div className="relative z-10 overflow-hidden" style={{ borderBottom: '1px solid rgba(124,58,237,0.1)' }}>
        <div
          className="py-16 px-4 text-center relative"
          style={{ background: 'linear-gradient(to bottom, rgba(124,58,237,0.08), transparent)' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Link to="/" className="text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }}
                onMouseEnter={e => e.target.style.color = '#A855F7'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
              >
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.3)' }} />
              <span className="text-sm text-white">Products</span>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-black mb-3"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Our{' '}
              <span style={{
                background: 'linear-gradient(135deg, #A855F7, #EC4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Collection
              </span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.05rem' }}>
              Craft memories that last forever
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + Filter Row */}
        <div className="flex gap-3 mb-8">
          <div className="flex-1 relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-white text-sm outline-none transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(10px)',
                fontFamily: 'Inter, sans-serif',
              }}
              onFocus={e => {
                e.target.style.borderColor = 'rgba(168,85,247,0.4)';
                e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.1)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setShowFilterModal(true)}
            className="flex items-center gap-2 px-5 py-3.5 rounded-2xl font-medium text-sm text-white transition-all"
            style={{
              background: 'rgba(124,58,237,0.15)',
              border: '1px solid rgba(168,85,247,0.25)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:block">Filter</span>
          </motion.button>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.value;
            return (
              <motion.button
                key={cat.value}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedCategory(cat.value)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  background: isSelected ? 'linear-gradient(135deg, #7C3AED, #A855F7)' : 'rgba(255,255,255,0.04)',
                  border: isSelected ? '1px solid rgba(168,85,247,0.4)' : '1px solid rgba(255,255,255,0.08)',
                  color: isSelected ? '#fff' : 'rgba(255,255,255,0.55)',
                  boxShadow: isSelected ? '0 0 20px rgba(124,58,237,0.3)' : 'none',
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full"
                  style={{ background: isSelected ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)' }}
                >
                  {cat.count}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Count + Clear row */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Showing{' '}
            <span className="font-bold" style={{
              background: 'linear-gradient(135deg, #A855F7, #EC4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {filteredProducts.length}
            </span>{' '}
            products
          </p>
          {(selectedCategory !== 'all' || searchQuery || priceRange[1] !== 2000) && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={clearAll}
              className="text-xs font-medium flex items-center gap-1 transition-colors"
              style={{ color: 'rgba(236,72,153,0.8)' }}
            >
              <X className="w-3 h-3" />
              Clear filters
            </motion.button>
          )}
        </div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            <motion.div
              key="grid"
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-24"
            >
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                No products found
              </h3>
              <p className="mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Try adjusting your search or filters
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={clearAll}
                className="px-8 py-3 rounded-full font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)', boxShadow: '0 0 25px rgba(124,58,237,0.4)' }}
              >
                Clear All Filters
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Products;