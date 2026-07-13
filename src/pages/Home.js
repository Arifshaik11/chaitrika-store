import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import ScrollReveal from '../components/ScrollReveal';
import AnimatedCounter from '../components/AnimatedCounter';
import { ChevronRight, Users, Zap, Award, Sparkles, Star, Heart, ArrowDown } from 'lucide-react';

/* ─── Aurora Background ─── */
const AuroraBackground = () => {
  const blobs = [
    { color: '#7C3AED', x: '15%', y: '30%', size: 500, duration: 12 },
    { color: '#A855F7', x: '70%', y: '20%', size: 400, duration: 15 },
    { color: '#EC4899', x: '50%', y: '70%', size: 450, duration: 10 },
    { color: '#6D28D9', x: '85%', y: '60%', size: 350, duration: 18 },
  ];

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0" style={{ background: '#0F172A' }} />

      {/* Aurora light layer */}
      <motion.div
        className="absolute inset-0 opacity-50"
        animate={{
          background: [
            'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(124,58,237,0.3) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 20%, rgba(168,85,247,0.2) 0%, transparent 55%), radial-gradient(ellipse 70% 60% at 50% 80%, rgba(236,72,153,0.25) 0%, transparent 60%)',
            'radial-gradient(ellipse 70% 60% at 60% 30%, rgba(168,85,247,0.3) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 20% 70%, rgba(236,72,153,0.2) 0%, transparent 55%), radial-gradient(ellipse 80% 60% at 80% 60%, rgba(124,58,237,0.25) 0%, transparent 60%)',
            'radial-gradient(ellipse 60% 70% at 40% 60%, rgba(236,72,153,0.3) 0%, transparent 60%), radial-gradient(ellipse 80% 50% at 70% 40%, rgba(124,58,237,0.2) 0%, transparent 55%), radial-gradient(ellipse 70% 60% at 30% 20%, rgba(168,85,247,0.25) 0%, transparent 60%)',
            'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(124,58,237,0.3) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 20%, rgba(168,85,247,0.2) 0%, transparent 55%), radial-gradient(ellipse 70% 60% at 50% 80%, rgba(236,72,153,0.25) 0%, transparent 60%)',
          ]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />

      {/* Floating blobs */}
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: blob.x, top: blob.y,
            width: blob.size, height: blob.size,
            background: `radial-gradient(circle, ${blob.color}33 0%, transparent 70%)`,
            filter: 'blur(60px)',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: blob.duration, repeat: Infinity, ease: 'easeInOut', delay: i * 2 }}
        />
      ))}

      {/* Floating particles */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={`p-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${(i * 37 + 7) % 100}%`,
            bottom: '-10px',
            width: 2 + (i % 3),
            height: 2 + (i % 3),
            background: i % 3 === 0 ? 'rgba(168,85,247,0.7)' : i % 3 === 1 ? 'rgba(236,72,153,0.7)' : 'rgba(124,58,237,0.7)',
          }}
          animate={{
            y: [0, -(600 + (i % 400))],
            opacity: [0, 0.7, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 6 + (i % 8),
            delay: (i * 0.4) % 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
};

/* ─── Floating Product Mockup ─── */
const FloatingMockup = ({ style, animProps, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0, ...animProps }}
    transition={{ delay, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
    style={{
      position: 'absolute',
      background: 'rgba(255,255,255,0.06)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: '20px',
      boxShadow: '0 20px 60px rgba(124,58,237,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
      ...style,
    }}
  >
    {children}
  </motion.div>
);

/* ─── Word-by-word heading ─── */
const AnimatedHeading = ({ text, gradient = false }) => {
  const words = text.split(' ');
  return (
    <span>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-3"
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.3 + i * 0.12, duration: 0.6, ease: 'easeOut' }}
        >
          {gradient ? (
            <span style={{
              background: 'linear-gradient(135deg, #A855F7, #EC4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {word}
            </span>
          ) : word}
        </motion.span>
      ))}
    </span>
  );
};

/* ─── MAIN COMPONENT ─── */
const Home = () => {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 4);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const stats = [
    { icon: Users, value: 300, suffix: '+', label: 'Happy Customers', desc: 'Trusted worldwide for quality', color: '#7C3AED' },
    { icon: Zap, value: 300, suffix: '+', label: 'Orders Delivered', desc: 'Fast and reliable service', color: '#EC4899' },
    { icon: Award, value: 99, suffix: '%', label: 'Quality Score', desc: 'Premium satisfaction', color: '#A855F7' },
  ];

  const steps = [
    { num: '01', title: 'Choose', desc: 'Browse our premium collection and select your perfect product', icon: '🎯' },
    { num: '02', title: 'Customize', desc: 'Upload your photo and personalize every detail with ease', icon: '✨' },
    { num: '03', title: 'Order', desc: 'Complete your order via WhatsApp — quick and hassle-free', icon: '📦' },
  ];

  return (
    <div style={{ background: '#0F172A', minHeight: '100vh', color: '#fff', overflow: 'hidden' }}>
      <AuroraBackground />

      {/* ─── HERO SECTION ─── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden"
      >
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* LEFT — Hero Content */}
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
                style={{
                  background: 'rgba(124,58,237,0.15)',
                  border: '1px solid rgba(168,85,247,0.3)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Sparkles className="w-3.5 h-3.5" style={{ color: '#A855F7' }} />
                <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: '#A855F7' }}>
                  Premium Personalized Gifts
                </span>
              </motion.div>

              {/* Heading */}
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] mb-6"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                <AnimatedHeading text="Preserve Your" />
                <br />
                <AnimatedHeading text="Precious Memories" gradient />
              </h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.7 }}
                className="text-lg leading-relaxed mb-10 max-w-lg"
                style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, sans-serif' }}
              >
                Create timeless memories with our premium collection of personalized photo frames, 
                acrylic displays, and custom keychains. Every piece tells your story.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                {/* Primary CTA */}
                <Link to="/products">
                  <motion.div
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white overflow-hidden cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #7C3AED, #A855F7, #EC4899)',
                      backgroundSize: '200% 200%',
                      boxShadow: '0 0 30px rgba(124,58,237,0.5), 0 4px 20px rgba(236,72,153,0.3)',
                      fontFamily: 'Outfit, sans-serif',
                    }}
                  >
                    <span>Shop Now</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                </Link>

                {/* Secondary CTA */}
                <Link to="/products">
                  <motion.div
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white cursor-pointer transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(16px)',
                      fontFamily: 'Outfit, sans-serif',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(124,58,237,0.15)';
                      e.currentTarget.style.borderColor = 'rgba(168,85,247,0.4)';
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(124,58,237,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <span>Customize Frame</span>
                    <Sparkles className="w-4 h-4" style={{ color: '#A855F7' }} />
                  </motion.div>
                </Link>
              </motion.div>

              {/* Trust Signals */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.7 }}
                className="flex items-center gap-4"
              >
                <div className="flex -space-x-2">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                      style={{
                        background: `linear-gradient(135deg, ${['#7C3AED','#A855F7','#EC4899','#6D28D9'][i]}, ${['#A855F7','#EC4899','#6D28D9','#7C3AED'][i]})`,
                        borderColor: '#0F172A',
                      }}
                    >
                      {['A','R','S','M'][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-xs ml-1" style={{ color: 'rgba(255,255,255,0.6)' }}>5.0</span>
                  </div>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Loved by <strong className="text-white">300+</strong> happy customers
                  </p>
                </div>
              </motion.div>
            </div>

            {/* RIGHT — Floating Product Mockups */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="relative h-[520px] hidden lg:block"
            >
              {/* Main Frame Mockup */}
              <FloatingMockup
                delay={0}
                style={{ top: '5%', left: '15%', width: 200, height: 240, padding: '12px' }}
                animProps={{ y: [0, -25, 0], rotate: ['-3deg', '3deg', '-3deg'] }}
              >
                <div
                  className="w-full h-full rounded-xl"
                  style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.6), rgba(236,72,153,0.6))' }}
                />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="h-1.5 rounded-full mb-1" style={{ background: 'rgba(255,255,255,0.3)' }} />
                  <div className="h-1 rounded-full w-2/3" style={{ background: 'rgba(255,255,255,0.2)' }} />
                </div>
              </FloatingMockup>

              {/* Acrylic Frame Mockup */}
              <FloatingMockup
                delay={0.3}
                style={{ top: '25%', right: '5%', width: 160, height: 200, padding: '10px' }}
                animProps={{ y: [0, 20, 0], rotate: ['5deg', '-2deg', '5deg'] }}
              >
                <div
                  className="w-full h-full rounded-lg"
                  style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.5), rgba(99,102,241,0.5))', opacity: 0.8 }}
                />
              </FloatingMockup>

              {/* Keychain Mockup */}
              <FloatingMockup
                delay={0.6}
                style={{ bottom: '10%', left: '30%', width: 100, height: 100, borderRadius: '50%', padding: '8px' }}
                animProps={{ y: [0, -15, 0], rotate: ['0deg', '360deg', '720deg'] }}
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{ background: 'linear-gradient(135deg, #EC4899, #7C3AED)' }}
                />
              </FloatingMockup>

              {/* Small badge mockup */}
              <FloatingMockup
                delay={0.9}
                style={{ top: '50%', left: '5%', width: 120, height: 50, padding: '10px 14px' }}
                animProps={{ y: [0, 10, 0] }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full" style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)' }} />
                  <div>
                    <div className="h-1.5 w-16 rounded-full mb-1" style={{ background: 'rgba(255,255,255,0.4)' }} />
                    <div className="h-1 w-10 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />
                  </div>
                </div>
              </FloatingMockup>

              {/* Glow orbs */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)', filter: 'blur(40px)' }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Scroll
          </span>
          <div
            className="w-6 h-10 rounded-full flex items-start justify-center p-2"
            style={{ border: '1px solid rgba(255,255,255,0.15)' }}
          >
            <motion.div
              className="w-1 h-2 rounded-full"
              style={{ background: 'linear-gradient(to bottom, #A855F7, #EC4899)' }}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="relative z-10 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
                style={{
                  background: 'rgba(236,72,153,0.1)',
                  border: '1px solid rgba(236,72,153,0.2)',
                }}
              >
                <Heart className="w-3 h-3" style={{ color: '#EC4899' }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#EC4899' }}>
                  Most Loved
                </span>
              </motion.div>
              <h2
                className="text-4xl sm:text-5xl font-black mb-4"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Featured{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #A855F7, #EC4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Collection
                </span>
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Discover our most loved pieces, crafted for those who value quality and personalization
              </p>
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
            <div className="text-center mt-12">
              <Link to="/products">
                <motion.div
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white cursor-pointer"
                  style={{
                    background: 'rgba(124,58,237,0.15)',
                    border: '1px solid rgba(168,85,247,0.3)',
                    backdropFilter: 'blur(10px)',
                    fontFamily: 'Outfit, sans-serif',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #7C3AED, #EC4899)';
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(124,58,237,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(124,58,237,0.15)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  View All Products
                  <ChevronRight className="w-4 h-4" />
                </motion.div>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── STATS SECTION ─── */}
      <section className="relative z-10 py-24">
        {/* Divider glow */}
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(124,58,237,0.5), rgba(236,72,153,0.5), transparent)' }} />
        <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(124,58,237,0.5), rgba(236,72,153,0.5), transparent)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map(({ icon: Icon, value, suffix, label, desc, color }, i) => (
              <ScrollReveal key={label} direction="up" delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="relative p-8 rounded-3xl text-center group"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(10px)',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${color}40`;
                    e.currentTarget.style.boxShadow = `0 20px 60px ${color}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                    style={{ background: `${color}20`, border: `1px solid ${color}30` }}
                  >
                    <Icon className="w-8 h-8" style={{ color }} />
                  </div>
                  {/* Counter */}
                  <div className="text-4xl font-black mb-2" style={{ fontFamily: 'Outfit, sans-serif', color }}>
                    <AnimatedCounter end={value} duration={2} suffix={suffix} />
                  </div>
                  <p className="font-semibold text-white mb-1">{label}</p>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>{desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="relative z-10 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <h2
                className="text-4xl sm:text-5xl font-black mb-4"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                How It{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Works
                </span>
              </h2>
              <p className="text-lg" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Three simple steps to your perfect memory
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector line */}
            <div
              className="absolute top-12 left-1/6 right-1/6 h-px hidden md:block"
              style={{ background: 'linear-gradient(to right, transparent, rgba(124,58,237,0.4), rgba(236,72,153,0.4), transparent)' }}
            />

            {steps.map((step, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="relative p-8 rounded-3xl text-center group"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(124,58,237,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(124,58,237,0.25)';
                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(124,58,237,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="text-3xl mb-4">{step.icon}</div>
                  <div
                    className="text-5xl font-black mb-4"
                    style={{
                      fontFamily: 'Outfit, sans-serif',
                      background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {step.num}
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {step.desc}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal direction="up">
            <motion.div
              className="relative p-12 rounded-3xl overflow-hidden"
              style={{
                background: 'rgba(124,58,237,0.08)',
                border: '1px solid rgba(124,58,237,0.2)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Glow orb inside */}
              <div
                className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)', filter: 'blur(40px)' }}
              />

              <div className="relative z-10">
                <div className="text-4xl mb-4">💜</div>
                <h2
                  className="text-3xl sm:text-4xl font-black mb-4"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  Ready to Create Something{' '}
                  <span style={{
                    background: 'linear-gradient(135deg, #A855F7, #EC4899)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    Beautiful?
                  </span>
                </h2>
                <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Turn your favorite photos into stunning personalized gifts. 
                  Start designing today.
                </p>
                <Link to="/products">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-white cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #7C3AED, #A855F7, #EC4899)',
                      boxShadow: '0 0 40px rgba(124,58,237,0.5)',
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: '1.05rem',
                    }}
                  >
                    <Sparkles className="w-5 h-5" />
                    Start Customizing
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Home;