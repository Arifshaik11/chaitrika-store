import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import ScrollReveal from '../components/ScrollReveal';
import AnimatedCounter from '../components/AnimatedCounter';
import { Users, Zap, Award, ChevronRight, Sparkles } from 'lucide-react';

const HomeAurora = () => {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 4);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Word animation variants
  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  const words = ['Preserve', 'Your', 'Precious', 'Memories'];

  return (
    <div className="bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 min-h-screen text-white overflow-hidden">
      {/* Aurora Background Animation */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Animated Aurora Gradient */}
        <motion.div
          className="absolute inset-0 opacity-40"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(124, 58, 237, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 20%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(124, 58, 237, 0.3) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: 'loop' }}
        />

        {/* Floating Gradient Blobs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            y: [0, 50, 0],
            x: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.div
          className="absolute top-40 right-10 w-96 h-96 bg-violet-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            y: [0, -50, 0],
            x: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.div
          className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            y: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse' }}
        />

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-violet-400 rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Heading - Word by Word Animation */}
              <div className="mb-6 space-y-4">
                <motion.h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                  {words.map((word, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={wordVariants}
                      className="inline-block mr-3"
                    >
                      {i === 2 || i === 3 ? (
                        <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                          {word}
                        </span>
                      ) : (
                        word
                      )}
                    </motion.span>
                  ))}
                </motion.h1>
              </div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-lg sm:text-xl text-gray-300 mb-8 max-w-lg leading-relaxed"
              >
                Create timeless memories with our premium collection of personalized photo frames, acrylic displays, and custom keychains. Each piece tells your story.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                {/* Primary Button */}
                <Link
                  to="/products"
                  className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/50"
                >
                  {/* Glassmorphism Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-full" />
                  <span className="relative flex items-center gap-2">
                    Shop Now
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>

                {/* Secondary Button */}
                <Link
                  to="/products"
                  className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/30"
                >
                  {/* Glassmorphism Border */}
                  <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md border border-white/20" />
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-gradient-to-r from-violet-400/20 to-pink-400/20 transition-opacity" />
                  <span className="relative">Customize Frame</span>
                </Link>
              </motion.div>

              {/* Trust Badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mt-12 flex items-center gap-4 text-sm text-gray-400"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 border border-slate-800"
                    />
                  ))}
                </div>
                <span>Trusted by 300+ happy customers</span>
              </motion.div>
            </motion.div>

            {/* Right Side - Floating Product Mockups */}
            <motion.div
              className="relative h-96 lg:h-full min-h-96"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse' }}
            >
              {/* Floating Frame 1 */}
              <motion.div
                className="absolute top-0 left-0 w-48 h-64 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 shadow-2xl"
                animate={{
                  rotate: [0, 5, 0],
                  y: [0, -30, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
              >
                <div className="w-full h-full bg-gradient-to-br from-violet-500 to-pink-500 rounded-lg" />
              </motion.div>

              {/* Floating Frame 2 */}
              <motion.div
                className="absolute top-20 right-0 w-40 h-40 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-3 shadow-2xl"
                animate={{
                  rotate: [0, -5, 0],
                  y: [0, 20, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
              >
                <div className="w-full h-full bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg" />
              </motion.div>

              {/* Floating Keychain */}
              <motion.div
                className="absolute bottom-0 left-20 w-32 h-32 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-2xl flex items-center justify-center"
                animate={{
                  rotate: [360, 0],
                  y: [0, -20, 0],
                }}
                transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse' }}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-violet-400 to-violet-600 rounded-full" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-white/50 rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Products Section */}
      <section className="relative z-10 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <motion.h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                Featured Collection
              </motion.h2>
              <motion.p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Discover our most loved pieces crafted for those who value quality and personalization
              </motion.p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product, index) => (
              <ScrollReveal key={product.id} direction="up" delay={index * 0.1}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={0.5}>
            <div className="text-center mt-16">
              <Link
                to="/products"
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-white"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-full" />
                <span className="relative flex items-center gap-2">
                  View All Products
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Happy Customers */}
            <ScrollReveal direction="up" delay={0}>
              <motion.div
                className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/10"
                whileHover={{ y: -10 }}
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 flex items-center justify-center">
                    <Users className="w-8 h-8" />
                  </div>
                </div>
                <div className="text-4xl font-bold mb-2">
                  <AnimatedCounter end={300} duration={2} prefix="" suffix="+" />
                </div>
                <p className="text-gray-300 font-semibold">Happy Customers</p>
                <p className="text-gray-400 text-sm mt-2">Trusted worldwide for quality</p>
              </motion.div>
            </ScrollReveal>

            {/* Orders Delivered */}
            <ScrollReveal direction="up" delay={0.1}>
              <motion.div
                className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/10"
                whileHover={{ y: -10 }}
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 flex items-center justify-center">
                    <Zap className="w-8 h-8" />
                  </div>
                </div>
                <div className="text-4xl font-bold mb-2">
                  <AnimatedCounter end={300} duration={2} prefix="" suffix="+" />
                </div>
                <p className="text-gray-300 font-semibold">Orders Delivered</p>
                <p className="text-gray-400 text-sm mt-2">Fast and reliable service</p>
              </motion.div>
            </ScrollReveal>

            {/* Quality Guaranteed */}
            <ScrollReveal direction="up" delay={0.2}>
              <motion.div
                className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/10"
                whileHover={{ y: -10 }}
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center">
                    <Award className="w-8 h-8" />
                  </div>
                </div>
                <div className="text-4xl font-bold mb-2">
                  <AnimatedCounter end={99} duration={2} prefix="" suffix="%" />
                </div>
                <p className="text-gray-300 font-semibold">Quality Guaranteed</p>
                <p className="text-gray-400 text-sm mt-2">Premium products & satisfaction</p>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">How It Works</h2>
              <p className="text-gray-400 text-lg">Simple steps to create your perfect memory</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'Choose', desc: 'Select your perfect product from our collection' },
              { num: '02', title: 'Customize', desc: 'Upload photos and customize your design' },
              { num: '03', title: 'Order', desc: 'Complete order via WhatsApp with all details' },
            ].map((step, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.1}>
                <motion.div
                  className="relative group"
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity" />
                  <div className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center">
                    <div className="text-5xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent mb-4">
                      {step.num}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-400">{step.desc}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeAurora;
