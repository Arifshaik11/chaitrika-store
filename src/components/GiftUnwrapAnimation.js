import React, { useState, useEffect } from 'react';
import { Gift } from 'lucide-react';

const GiftUnwrapAnimation = ({ onComplete }) => {
  const [animationStage, setAnimationStage] = useState(0);
  // 0: wrapped gift
  // 1: ribbon untying
  // 2: wrapper opening
  // 3: logo reveal
  // 4: fade to homepage

  useEffect(() => {
    const timers = [];

    // Stage 1: Show wrapped gift for 400ms (FAST)
    timers.push(setTimeout(() => setAnimationStage(1), 400));

    // Stage 2: Ribbon untying animation (800ms) (FAST)
    timers.push(setTimeout(() => setAnimationStage(2), 1200));

    // Stage 3: Wrapper opening (700ms) (FAST)
    timers.push(setTimeout(() => setAnimationStage(3), 1900));

    // Stage 4: Logo appears and grows (1500ms) (SLOW)
    timers.push(setTimeout(() => setAnimationStage(4), 3400));

    // Stage 5: Fade to homepage (1200ms) (SLOW)
    timers.push(setTimeout(() => {
      if (onComplete) onComplete();
    }, 4600));

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-20 animate-float"
            style={{
              width: `${Math.random() * 50 + 10}px`,
              height: `${Math.random() * 50 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      {/* Gift Box Container */}
      <div className="relative">
        {/* Wrapped Gift Box */}
        <div
          className={`relative transition-all duration-700 ${
            animationStage >= 2 ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
          }`}
        >
          {/* Gift Box */}
          <div className="relative w-64 h-64 bg-gradient-to-br from-red-500 to-red-700 rounded-lg shadow-2xl transform perspective-1000"
            style={{
              transform: animationStage >= 1 ? 'rotateY(10deg) rotateX(-5deg)' : 'rotateY(0) rotateX(0)',
              transition: 'transform 0.7s ease-in-out'
            }}
          >
            {/* Vertical Ribbon */}
            <div
              className={`absolute left-1/2 top-0 bottom-0 w-8 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 shadow-lg transform -translate-x-1/2 transition-all duration-700 ${
                animationStage >= 1 ? 'scale-y-0 opacity-0' : 'scale-y-100 opacity-100'
              }`}
              style={{ transformOrigin: 'top' }}
            />

            {/* Horizontal Ribbon */}
            <div
              className={`absolute top-1/2 left-0 right-0 h-8 bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-300 shadow-lg transform -translate-y-1/2 transition-all duration-700 ${
                animationStage >= 1 ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100'
              }`}
              style={{ transformOrigin: 'left' }}
            />

            {/* Bow on Top */}
            <div
              className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${
                animationStage >= 1 ? 'scale-0 rotate-180 opacity-0' : 'scale-100 rotate-0 opacity-100'
              }`}
            >
              <div className="w-20 h-20 relative">
                {/* Bow loops */}
                <div className="absolute top-0 left-0 w-10 h-10 bg-yellow-400 rounded-full transform -rotate-45" />
                <div className="absolute top-0 right-0 w-10 h-10 bg-yellow-400 rounded-full transform rotate-45" />
                {/* Bow center */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-yellow-500 rounded-full shadow-lg" />
              </div>
            </div>

            {/* Sparkles around gift */}
            {animationStage === 0 && (
              <>
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-ping"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.2}s`
                    }}
                  />
                ))}
              </>
            )}
          </div>
        </div>

        {/* Wrapper Opening Effect */}
        {animationStage >= 2 && animationStage < 4 && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Left wrapper piece */}
            <div
              className="absolute w-32 h-64 bg-gradient-to-r from-red-600 to-red-700 rounded-l-lg shadow-2xl transition-all duration-700 opacity-80"
              style={{
                transform: animationStage >= 2 ? 'translateX(-200px) rotateY(-45deg)' : 'translateX(0)',
                transformOrigin: 'right'
              }}
            />
            
            {/* Right wrapper piece */}
            <div
              className="absolute w-32 h-64 bg-gradient-to-l from-red-600 to-red-700 rounded-r-lg shadow-2xl transition-all duration-700 opacity-80"
              style={{
                transform: animationStage >= 2 ? 'translateX(200px) rotateY(45deg)' : 'translateX(0)',
                transformOrigin: 'left'
              }}
            />
          </div>
        )}

        {/* Logo Reveal */}
        {animationStage >= 3 && (
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-1500 ${
              animationStage >= 3 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}
          >
            <div className="text-center">
              {/* Logo Container with Glow */}
              <div className="relative">
                <div className="absolute inset-0 bg-white rounded-full blur-3xl opacity-50 animate-pulse" />
                <div className="relative bg-white rounded-full p-8 shadow-2xl">
                  <Gift className="w-24 h-24 text-purple-600 animate-bounce" />
                </div>
              </div>
              
              {/* Store Name */}
              <div
                className={`mt-6 transition-all duration-1000 delay-300 ${
                  animationStage >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                <h1 className="text-5xl font-bold text-white drop-shadow-2xl mb-2">
                  Chaitra
                </h1>
                <h2 className="text-4xl font-bold text-yellow-300 drop-shadow-2xl">
                  <span className="text-white">Wrap</span>@Wear
                </h2>
                <p className="text-white text-lg mt-4 opacity-90">
                  Your Memories, Beautifully Wrapped
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Confetti Effect */}
        {animationStage >= 2 && animationStage < 4 && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 animate-confetti"
                style={{
                  left: '50%',
                  top: '50%',
                  backgroundColor: ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a8e6cf', '#ff8b94'][i % 5],
                  animationDelay: `${i * 0.05}s`,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Fade to Homepage Effect */}
      {animationStage >= 4 && (
        <div className="absolute inset-0 bg-white animate-fadeIn" />
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }

        @keyframes confetti {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(300px) translateX(${Math.random() * 400 - 200}px) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-confetti {
          animation: confetti 1.5s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 1.2s ease-in forwards;
        }
      `}</style>
    </div>
  );
};

export default GiftUnwrapAnimation;