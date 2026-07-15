import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ElegantLogoIntro = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 100);
    const t2 = setTimeout(() => setStage(2), 700);
    const t3 = setTimeout(() => setStage(3), 1400);
    const t4 = setTimeout(() => { setStage(4); onComplete(); }, 3500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage < 4 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: '#FFFFFF' }}
        >
          {/* Logo Content */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            
            {/* Elegant Monogram */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: stage >= 1 ? 1 : 0.9, opacity: stage >= 1 ? 1 : 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative"
            >
              <div
                className="w-18 h-18 rounded-full flex items-center justify-center text-3xl font-light"
                style={{
                  border: '1px solid #EBEBEB',
                  background: '#F8F8F8',
                  color: '#111111',
                  fontFamily: 'Playfair Display, Georgia, serif',
                }}
              >
                C
              </div>
            </motion.div>

            {/* Brand Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: stage >= 2 ? 1 : 0, y: stage >= 2 ? 0 : 10 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="text-center mt-2"
            >
              <h1
                className="text-3xl font-semibold tracking-tight"
                style={{
                  fontFamily: 'Playfair Display, Georgia, serif',
                  color: '#111111',
                }}
              >
                Chaitra
              </h1>
              <h2
                className="text-xs font-sans tracking-widest uppercase mt-1"
                style={{ color: '#C9897A' }}
              >
                Wrap &amp; Wear
              </h2>
            </motion.div>

            {/* Subtle Divider Line */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: stage >= 3 ? 80 : 0, opacity: stage >= 3 ? 1 : 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="h-px"
              style={{ background: '#C9897A' }}
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: stage >= 3 ? 1 : 0 }}
              transition={{ duration: 0.6 }}
              className="text-[10px] tracking-[0.25em] uppercase"
              style={{ color: '#888888', fontFamily: 'Inter, sans-serif' }}
            >
              Your Memories, Beautifully Kept
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ElegantLogoIntro;
