import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import AnimatedButton from '../components/AnimatedButton';
import ScrollReveal from '../components/ScrollReveal';
import AnimatedCounter from '../components/AnimatedCounter';
import { Camera, ChevronRight, Sparkles, Users, Zap, Award } from 'lucide-react';

const Home = () => {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 4);
  const [isHeroVisible, setIsHeroVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsHeroVisible(true);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-shift" />
        
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 opacity-20 md:opacity-30">
          <div className="absolute top-0 md:top-5 left-0 md:left-5 w-32 md:w-56 h-32 md:h-56 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-float-slow" />
          <div className="absolute top-5 md:top-20 right-0 md:right-5 w-32 md:w-56 h-32 md:h-56 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-0 md:bottom-5 left-1/2 w-32 md:w-56 h-32 md:h-56 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-float-slow" style={{ animationDelay: '4s' }} />
        </div>

        {/* Floating Product Cards Background - Hidden on mobile */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
          {/* Cards hidden on mobile for performance */}
        </div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center">
            {/* Main Heading - Fade Up */}
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 drop-shadow-2xl transition-all duration-1000 transform ${
                isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              Preserve Your
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent animate-text-gradient">
                Precious Memories
              </span>
            </h1>

            {/* Subtitle - Fade Up with Delay */}
            <p
              className={`text-base sm:text-lg md:text-xl lg:text-2xl text-white drop-shadow-lg mb-6 md:mb-8 max-w-3xl mx-auto transition-all duration-1000 transform delay-100 px-2 ${
                isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              Custom photo frames, keychains, and more - designed just for you
            </p>

            {/* CTA Buttons - Fade Up with More Delay */}
            <div
              className={`space-y-3 sm:space-y-0 sm:space-x-3 md:space-x-4 sm:flex sm:justify-center transition-all duration-1000 transform delay-200 px-3 ${
                isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              {/* Primary Button */}
              <Link
                to="/products"
                className="group block sm:inline-block bg-white text-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:shadow-2xl hover:shadow-white/50 transition-all duration-300 transform hover:scale-105 cursor-pointer relative overflow-hidden text-sm md:text-base"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-pink-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center">
                  Shop Now
                  <ChevronRight className="w-4 md:w-5 h-4 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Secondary Button */}
              <Link
                to="/products"
                className="group block sm:inline-block border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 relative overflow-hidden text-sm md:text-base"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 rounded-md" />
                <div className="relative flex items-center justify-center">
                  Customize Frame
                </div>
              </Link>
            </div>

            {/* Scroll Indicator - Hidden */}
            <div className="hidden"></div>
          </div>
        </div>

        {/* Animated Styles */}
        <style jsx>{`
          @keyframes gradient-shift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }

          @keyframes float-slow {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(30px); }
          }

          @keyframes text-gradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }

          .animate-gradient-shift {
            background-size: 400% 400%;
            animation: gradient-shift 15s ease infinite;
          }

          .animate-float-slow {
            animation: float-slow 6s ease-in-out infinite;
          }

          .animate-text-gradient {
            background-size: 300% 300%;
            animation: text-gradient 6s ease infinite;
          }
        `}</style>
      </section>



      {/* Featured Products */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                Featured Products
              </h2>
              <p className="text-base md:text-lg text-gray-600 px-2">
                Discover our most popular photo frames and accessories
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            {featuredProducts.map((product, index) => (
              <ScrollReveal key={product.id} direction="up" delay={index * 0.1}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={0.4}>
            <div className="text-center mt-8 md:mt-12">
              <Link
                to="/products"
                className="inline-block bg-primary text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors text-sm md:text-base"
              >
                View All Products
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section with Animated Counters */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10 md:opacity-20">
          <div className="absolute top-10 md:top-20 left-5 md:left-10 w-40 md:w-72 h-40 md:h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-float-slow" />
          <div className="absolute bottom-10 md:bottom-20 right-5 md:right-10 w-40 md:w-72 h-40 md:h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <ScrollReveal direction="up">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
                Our Impact
              </h2>
              <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto px-2">
                Trusted by thousands of customers to preserve their precious memories
              </p>
            </div>
          </ScrollReveal>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
            {/* Happy Customers */}
            <ScrollReveal direction="up" delay={0.1}>
              <div className="text-center p-6 md:p-8 bg-white/10 backdrop-blur-sm rounded-lg md:rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="flex justify-center mb-4">
                  <div className="bg-white/20 rounded-full p-3 md:p-4">
                    <Users className="w-6 md:w-8 h-6 md:h-8 text-yellow-300" />
                  </div>
                </div>
                <div className="mb-2">
                  <div className="text-4xl md:text-5xl font-bold text-black">300<span className="text-white">+</span></div>
                </div>
                <p className="text-base md:text-lg text-white/90">Happy Customers</p>
                <p className="text-xs md:text-sm text-white/70 mt-2">
                  Trusted worldwide for quality and service
                </p>
              </div>
            </ScrollReveal>

            {/* Orders Delivered */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="text-center p-6 md:p-8 bg-white/10 backdrop-blur-sm rounded-lg md:rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="flex justify-center mb-4">
                  <div className="bg-white/20 rounded-full p-3 md:p-4">
                    <Zap className="w-6 md:w-8 h-6 md:h-8 text-pink-300" />
                  </div>
                </div>
                <div className="mb-2">
                  <div className="text-4xl md:text-5xl font-bold text-black">300<span className="text-white">+</span></div>
                </div>
                <p className="text-base md:text-lg text-white/90">Orders Delivered</p>
                <p className="text-xs md:text-sm text-white/70 mt-2">
                  Fast and reliable delivery service
                </p>
              </div>
            </ScrollReveal>

            {/* Product Quality */}
            <ScrollReveal direction="up" delay={0.3}>
              <div className="text-center p-6 md:p-8 bg-white/10 backdrop-blur-sm rounded-lg md:rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="flex justify-center mb-4">
                  <div className="bg-white/20 rounded-full p-3 md:p-4">
                    <Award className="w-6 md:w-8 h-6 md:h-8 text-blue-300" />
                  </div>
                </div>
                <div className="mb-2">
                  <AnimatedCounter end={99} duration={2} prefix="" suffix="%" />
                </div>
                <p className="text-base md:text-lg text-white/90">Quality Guaranteed</p>
                <p className="text-xs md:text-sm text-white/70 mt-2">
                  Premium products with satisfaction promise
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Animated Styles */}
        <style jsx>{`
          @keyframes float-slow {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(30px); }
          }

          .animate-float-slow {
            animation: float-slow 6s ease-in-out infinite;
          }
        `}</style>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                How It Works
              </h2>
              <p className="text-base md:text-lg text-gray-600">
                Simple steps to create your perfect photo frame
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="text-center">
                <div className="bg-blue-100 w-14 md:w-16 h-14 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl md:text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-base md:text-xl font-semibold text-gray-900 mb-2">
                  Choose Your Product
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  Select from our range of frames, keychains, and accessories
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="text-center">
                <div className="bg-blue-100 w-14 md:w-16 h-14 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl md:text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="text-base md:text-xl font-semibold text-gray-900 mb-2">
                  Upload & Customize
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  Upload your photo and adjust size, position, and other details
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <div className="text-center">
                <div className="bg-blue-100 w-14 md:w-16 h-14 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl md:text-2xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="text-base md:text-xl font-semibold text-gray-900 mb-2">
                  Order via WhatsApp
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  Complete your order through WhatsApp with all details included
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;