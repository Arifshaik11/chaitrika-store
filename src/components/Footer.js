import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Instagram, Twitter, Facebook, Heart, Sparkles } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, label: 'Instagram', url: '#', color: '#E1306C' },
    { icon: Twitter, label: 'Twitter', url: '#', color: '#1DA1F2' },
    { icon: Facebook, label: 'Facebook', url: '#', color: '#4267B2' },
  ];

  const productLinks = [
    { label: 'Magnetic Photo Frames', href: '/products' },
    { label: 'Acrylic Frames', href: '/products' },
    { label: 'MDF Frames', href: '/products' },
    { label: 'Custom Keychains', href: '/products' },
    { label: 'Personalized Gifts', href: '/products' },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1, y: 0,
      transition: { staggerChildren: 0.1, duration: 0.6 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #0A0F1E, #0F172A)',
        borderTop: '1px solid rgba(124,58,237,0.2)',
      }}
    >
      {/* Aurora background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute bottom-0 left-1/4 w-96 h-64 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #7C3AED, transparent 70%)', filter: 'blur(60px)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-48 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #EC4899, transparent 70%)', filter: 'blur(60px)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 mb-5 group w-fit">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-xl"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED, #A855F7, #EC4899)',
                  boxShadow: '0 0 25px rgba(124,58,237,0.5)',
                  fontFamily: 'Outfit, sans-serif',
                }}
              >
                C
              </div>
              <div>
                <p className="text-lg font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Chaitra
                </p>
                <p className="text-sm" style={{ color: 'rgba(168,85,247,0.9)', fontFamily: 'Outfit, sans-serif' }}>
                  Wrap &amp; Wear
                </p>
              </div>
            </Link>

            <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
              We craft premium personalized gifts that help you preserve your most cherished memories. 
              From magnetic frames to acrylic displays — every piece is made with love.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              {[
                { icon: Phone, text: '+91 8499999498' },
                { icon: Mail, text: 'info@chaitrawrapwear.com' },
                { icon: MapPin, text: 'Madhapur, Hyderabad' },
              ].map(({ icon: Icon, text }) => (
                <motion.div
                  key={text}
                  className="flex items-center gap-3 group cursor-default"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.2)' }}
                  >
                    <Icon className="w-4 h-4" style={{ color: '#A855F7' }} />
                  </div>
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{text}</span>
                </motion.div>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map(({ icon: Icon, label, url, color }) => (
                <motion.a
                  key={label}
                  href={url}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  aria-label={label}
                >
                  <Icon className="w-4 h-4 text-white/70" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Products Links */}
          <motion.div variants={itemVariants}>
            <h3
              className="text-sm font-semibold uppercase tracking-widest mb-5"
              style={{ color: '#A855F7' }}
            >
              Products
            </h3>
            <ul className="space-y-3">
              {productLinks.map(({ label, href }) => (
                <li key={label}>
                  <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link
                      to={href}
                      className="text-sm transition-colors duration-200 flex items-center gap-2 group"
                      style={{ color: 'rgba(255,255,255,0.5)' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                    >
                      <span
                        className="w-1 h-1 rounded-full flex-shrink-0 transition-colors duration-200"
                        style={{ background: 'rgba(168,85,247,0.5)' }}
                      />
                      {label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links + Promise */}
          <motion.div variants={itemVariants}>
            <h3
              className="text-sm font-semibold uppercase tracking-widest mb-5"
              style={{ color: '#EC4899' }}
            >
              Our Promise
            </h3>
            <div className="space-y-4">
              {[
                { title: '✨ Premium Quality', desc: 'Only the finest materials' },
                { title: '⚡ Fast Delivery', desc: 'Quick & reliable shipping' },
                { title: '🔒 Secure Orders', desc: 'Via WhatsApp with care' },
                { title: '💜 Made with Love', desc: 'Every piece handcrafted' },
              ].map(({ title, desc }) => (
                <div key={title}>
                  <p className="text-sm font-medium text-white/80">{title}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            © 2024 Chaitra Wrap &amp; Wear. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            <span>Crafted with</span>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-3 h-3 fill-pink-500 text-pink-500" />
            </motion.div>
            <span>for your precious memories</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;