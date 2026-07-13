import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ElegantLogoIntro = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 100);
    const t2 = setTimeout(() => setStage(2), 700);
    const t3 = setTimeout(() => setStage(3), 1400);
    const t4 = setTimeout(() => { setStage(4); onComplete(); }, 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 2,
    size: 2 + Math.random() * 4,
  }));

  return (
    <AnimatePresence>
      {stage < 4 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: '#0F172A' }}
        >
          {/* Aurora Background */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.4) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(236,72,153,0.3) 0%, transparent 60%), #0F172A',
                'radial-gradient(ellipse at 70% 60%, rgba(168,85,247,0.4) 0%, transparent 60%), radial-gradient(ellipse at 30% 80%, rgba(124,58,237,0.3) 0%, transparent 60%), #0F172A',
                'radial-gradient(ellipse at 50% 30%, rgba(236,72,153,0.4) 0%, transparent 60%), radial-gradient(ellipse at 60% 70%, rgba(168,85,247,0.3) 0%, transparent 60%), #0F172A',
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
          />

          {/* Glowing Blobs */}
          <motion.div
            className="absolute w-96 h-96 rounded-full"
            style={{ background: 'rgba(124,58,237,0.15)', filter: 'blur(80px)', top: '10%', left: '10%' }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute w-80 h-80 rounded-full"
            style={{ background: 'rgba(236,72,153,0.15)', filter: 'blur(80px)', bottom: '10%', right: '10%' }}
            animate={{ scale: [1.3, 1, 1.3], opacity: [0.8, 0.5, 0.8] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Floating Particles */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                bottom: '-10px',
                width: p.size,
                height: p.size,
                background: p.id % 2 === 0 ? 'rgba(168,85,247,0.8)' : 'rgba(236,72,153,0.8)',
              }}
              animate={{ y: [0, -window.innerHeight - 20], opacity: [0, 0.8, 0] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
            />
          ))}

          {/* Logo Content */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Icon Ring */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: stage >= 1 ? 1 : 0, opacity: stage >= 1 ? 1 : 0 }}
              transition={{ duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] }}
              className="relative"
            >
              {/* Outer glow ring */}
              <motion.div
                className="absolute -inset-4 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)' }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center text-white text-4xl font-black"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED, #A855F7, #EC4899)',
                  boxShadow: '0 0 40px rgba(124,58,237,0.6), 0 0 80px rgba(168,85,247,0.3)',
                  fontFamily: 'Outfit, sans-serif',
                }}
              >
                C
              </div>
            </motion.div>

            {/* Brand Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: stage >= 2 ? 1 : 0, y: stage >= 2 ? 0 : 20 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="text-center"
            >
              <h1
                className="text-5xl font-black tracking-tight mb-1"
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  background: 'linear-gradient(135deg, #fff 0%, #A855F7 50%, #EC4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Chaitra
              </h1>
              <h2
                className="text-3xl font-bold tracking-widest"
                style={{ fontFamily: 'Outfit, sans-serif', color: 'rgba(255,255,255,0.7)' }}
              >
                Wrap &amp; Wear
              </h2>
            </motion.div>

            {/* Animated Line */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: stage >= 3 ? 120 : 0, opacity: stage >= 3 ? 1 : 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="h-px"
              style={{ background: 'linear-gradient(to right, transparent, #A855F7, #EC4899, transparent)' }}
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: stage >= 3 ? 0.6 : 0 }}
              transition={{ duration: 0.6 }}
              className="text-sm tracking-[0.25em] uppercase"
              style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, sans-serif' }}
            >
              Your Memories, Beautifully Wrapped
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ElegantLogoIntro;
