import React, { useEffect, useState } from 'react';
import { Camera } from 'lucide-react';
import { motion } from 'framer-motion';

const ElegantLogoIntro = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage 1: Show camera icon (0ms - 600ms)
    const timer1 = setTimeout(() => setStage(1), 0);

    // Stage 2: Show text (600ms - 1500ms)
    const timer2 = setTimeout(() => setStage(2), 600);

    // Stage 3: Draw line (1500ms - 2000ms)
    const timer3 = setTimeout(() => setStage(3), 1500);

    // Stage 4: Hold logo for 2 seconds (2000ms - 4000ms)
    // Then fade out (4000ms - 5200ms) - SLOW FADE

    // Stage 4: Fade out and complete (4000ms - 5200ms)
    const timer4 = setTimeout(() => {
      setStage(4);
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: stage === 4 ? 0 : 1 }}
      transition={{ duration: 1.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
    >
      <div className="flex flex-col items-center justify-center gap-6">
        {/* Camera Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: stage >= 1 ? 1 : 0,
            scale: stage >= 1 ? 1 : 0.8,
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Camera className="w-16 h-16 text-gray-900" strokeWidth={1.5} />
        </motion.div>

        {/* Text Container */}
        <div className="flex flex-col items-center gap-1">
          {/* "Chaitra Wrap@Wear" Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 2 ? 1 : 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              Chaitra
            </h1>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
              <span className="text-gray-600">Wrap</span>@Wear
            </h2>
          </motion.div>

          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: stage >= 3 ? 80 : 0,
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="h-px bg-gray-900 mt-3"
          />
        </div>

        {/* Tagline (Optional, appears with text) */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 2 ? 0.7 : 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-sm text-gray-600 tracking-widest uppercase"
        >
          Your Memories, Beautifully Wrapped
        </motion.p>
      </div>
    </motion.div>
  );
};

export default ElegantLogoIntro;
