import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import ScrollReveal from '../components/ScrollReveal';
import AnimatedCounter from '../components/AnimatedCounter';
import SEO from '../components/SEO';
import { organizationSchema, websiteSchema, faqSchema, breadcrumbSchema } from '../utils/structuredData';
import { ArrowRight, Gift, Star, Truck } from 'lucide-react';

const Home = () => {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 4);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const whyItems = [
    {
      icon: Gift,
      title: 'Crafted to Order',
      desc: 'Every piece is made uniquely for you — no mass production, no compromise.',
    },
    {
      icon: Star,
      title: 'Premium Materials',
      desc: 'Acrylic, MDF, magnetic — only quality materials that last a lifetime.',
    },
    {
      icon: Truck,
      title: 'Delivered with Care',
      desc: 'Carefully packaged and delivered fast, right to your door.',
    },
  ];

  const steps = [
    { num: '01', title: 'Choose Your Product', desc: 'Browse frames, keychains, acrylic displays, and more.' },
    { num: '02', title: 'Share Your Photo', desc: 'Upload your photo and tell us your customization preferences.' },
    { num: '03', title: 'Order via WhatsApp', desc: 'Place your order through WhatsApp — quick, simple, personal.' },
  ];

  return (
    <div style={{ background: '#FFFFFF' }}>
      <SEO
        title="Chaitra Wrap & Wear - Personalized Photo Frames"
        description="Premium personalized photo frames, acrylic frames, MDF frames, magnetic frames & custom keychains. Preserve your precious memories in style."
        keywords="personalized photo frames, custom keychains, acrylic frames, MDF frames, magnetic photo frames, custom gifts, Hyderabad"
        canonical="https://chaitrika.in"
        ogTitle="Chaitra Wrap & Wear — Preserve Your Precious Memories"
        ogDescription="Premium personalized gifts crafted with love. Custom photo frames, acrylic displays & keychains."
        ogImage="https://chaitrika.in/og-image.jpg"
        twitterTitle="Chaitra Wrap & Wear — Preserve Your Precious Memories"
        twitterDescription="Personalized photo frames and custom keychains. Preserve your precious memories."
        structuredData={[
          organizationSchema,
          websiteSchema,
          faqSchema,
          breadcrumbSchema([
            { name: 'Home', url: '/' }
          ])
        ]}
      />

      {/* ── Hero ─────────────────────────────────────── */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          minHeight: '88vh',
          background: '#FFFFFF',
          borderBottom: '1px solid #F0F0F0',
        }}
      >
        {/* Background texture strip */}
        <div
          className="absolute right-0 top-0 h-full hidden lg:block"
          style={{
            width: '42%',
            background: '#F8F8F8',
            borderLeft: '1px solid #F0F0F0',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-16 md:py-24">

            {/* Text */}
            <div>
              <div
                className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-medium tracking-widest uppercase"
                style={{
                  background: '#F2E8E5',
                  color: '#C9897A',
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? 'none' : 'translateY(12px)',
                  transition: 'opacity 0.6s ease, transform 0.6s ease',
                }}
              >
                ✦ Personalized Gifts
              </div>

              <h1
                className="font-display mb-6"
                style={{
                  fontSize: 'clamp(38px, 5.5vw, 68px)',
                  fontWeight: 600,
                  lineHeight: 1.12,
                  color: '#111111',
                  letterSpacing: '-0.02em',
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? 'none' : 'translateY(20px)',
                  transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
                }}
              >
                Make Every
                <br />
                <span style={{ color: '#C9897A', fontStyle: 'italic' }}>Memory</span>
                <br />
                Last Forever
              </h1>

              <p
                className="font-sans mb-10 leading-relaxed"
                style={{
                  fontSize: '17px',
                  color: '#666666',
                  maxWidth: '420px',
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? 'none' : 'translateY(16px)',
                  transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
                }}
              >
                Personalized photo frames, acrylic gifts, and keepsakes crafted just for you.
              </p>

              <div
                className="flex flex-wrap gap-4"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? 'none' : 'translateY(12px)',
                  transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
                }}
              >
                <Link
                  to="/products"
                  className="btn-primary inline-flex items-center gap-2"
                  id="hero-shop-btn"
                >
                  Shop Collection
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Micro stat row */}
              <div
                className="flex gap-8 mt-12 pt-8"
                style={{
                  borderTop: '1px solid #EBEBEB',
                  opacity: heroVisible ? 1 : 0,
                  transition: 'opacity 0.8s ease 0.5s',
                }}
              >
                {[
                  { value: '300+', label: 'Happy Customers' },
                  { value: '500+', label: 'Orders Delivered' },
                  { value: '100%', label: 'Handcrafted' },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <div
                      className="font-display font-semibold text-2xl"
                      style={{ color: '#111111' }}
                    >
                      {value}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: '#999999' }}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual — elegant frame mockup */}
            <div
              className="relative hidden lg:flex items-center justify-center"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'none' : 'scale(0.97)',
                transition: 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s',
              }}
            >
              <div
                className="relative"
                style={{
                  width: '380px',
                  height: '420px',
                }}
              >
                {/* Main frame card */}
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    right: '20px',
                    bottom: '20px',
                    background: '#FFFFFF',
                    borderRadius: '16px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)',
                    border: '1px solid #F0F0F0',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Photo placeholder area */}
                  <div
                    style={{
                      flex: 1,
                      background: 'linear-gradient(135deg, #F2E8E5 0%, #F8F4F2 50%, #EDE4E0 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span className="font-display text-6xl" style={{ color: 'rgba(201,137,122,0.3)', userSelect: 'none' }}>
                      ♡
                    </span>
                  </div>
                  {/* Frame label */}
                  <div style={{ padding: '16px 20px', borderTop: '1px solid #F0F0F0' }}>
                    <div className="text-sm font-medium" style={{ color: '#111111' }}>Custom Photo Frame</div>
                    <div className="text-xs mt-0.5" style={{ color: '#C9897A' }}>Starting ₹299</div>
                  </div>
                </div>

                {/* Floating badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '0px',
                    right: '0px',
                    background: '#111111',
                    color: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '10px 16px',
                    fontSize: '12px',
                    fontWeight: 500,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.20)',
                  }}
                >
                  ✦ Crafted for you
                </div>

                {/* Accent dot */}
                <div
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: '#F2E8E5',
                    zIndex: -1,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────── */}
      <section style={{ background: '#FFFFFF', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="flex items-end justify-between mb-10 md:mb-14">
              <div>
                <p
                  className="text-xs font-semibold tracking-widest uppercase mb-3"
                  style={{ color: '#C9897A' }}
                >
                  Our Collection
                </p>
                <h2
                  className="font-display font-semibold"
                  style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', color: '#111111', lineHeight: 1.2 }}
                >
                  Featured Products
                </h2>
              </div>
              <Link
                to="/products"
                className="hidden md:inline-flex items-center gap-2 text-sm font-medium link-accent"
                style={{ color: '#444444', textDecoration: 'none' }}
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.map((product, index) => (
                <ScrollReveal key={product.id} direction="up" delay={index * 0.08}>
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p style={{ color: '#AAAAAA' }}>Products are loading…</p>
            </div>
          )}

          <ScrollReveal direction="up" delay={0.3}>
            <div className="text-center mt-12 md:hidden">
              <Link to="/products" className="btn-primary">
                View All Products
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Why Chaitra Wrap & Wear ─────────────────────────────── */}
      <section style={{ background: '#F8F8F8', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center mb-14">
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: '#C9897A' }}
              >
                Why Choose Us
              </p>
              <h2
                className="font-display font-semibold"
                style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', color: '#111111', lineHeight: 1.2 }}
              >
                The Chaitra Difference
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {whyItems.map(({ icon: Icon, title, desc }, i) => (
              <ScrollReveal key={title} direction="up" delay={i * 0.1}>
                <div
                  className="p-8"
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #EBEBEB',
                  }}
                >
                  <div
                    className="w-11 h-11 flex items-center justify-center rounded-xl mb-5"
                    style={{ background: '#F2E8E5' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: '#C9897A' }} />
                  </div>
                  <h3
                    className="font-sans font-semibold text-base mb-2"
                    style={{ color: '#111111' }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#777777' }}>
                    {desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────── */}
      <section style={{ background: '#FFFFFF', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {[
              { end: 300, suffix: '+', label: 'Happy Customers', sub: 'Trusted with their memories' },
              { end: 500, suffix: '+', label: 'Orders Delivered', sub: 'Fast and reliable delivery' },
              { end: 99, suffix: '%', label: 'Satisfaction Rate', sub: 'We stand by quality' },
            ].map(({ end, suffix, label, sub }, i) => (
              <ScrollReveal key={label} direction="up" delay={i * 0.1}>
                <div
                  className="text-center py-12 px-8"
                  style={{
                    borderRight: i < 2 ? '1px solid #EBEBEB' : 'none',
                  }}
                >
                  <div
                    className="font-display font-semibold mb-2"
                    style={{ fontSize: '52px', color: '#111111', lineHeight: 1 }}
                  >
                    <AnimatedCounter end={end} duration={2} suffix={suffix} />
                  </div>
                  <div
                    className="font-sans font-medium text-base mb-1"
                    style={{ color: '#333333' }}
                  >
                    {label}
                  </div>
                  <div className="text-sm" style={{ color: '#AAAAAA' }}>{sub}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────── */}
      <section style={{ background: '#F8F8F8', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center mb-14">
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: '#C9897A' }}
              >
                Simple Process
              </p>
              <h2
                className="font-display font-semibold"
                style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', color: '#111111', lineHeight: 1.2 }}
              >
                How It Works
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map(({ num, title, desc }, i) => (
              <ScrollReveal key={num} direction="up" delay={i * 0.12}>
                <div className="relative">
                  <div
                    className="font-display font-semibold mb-4"
                    style={{ fontSize: '48px', color: '#F0ECEA', lineHeight: 1 }}
                  >
                    {num}
                  </div>
                  <div
                    className="w-6 h-px mb-4"
                    style={{ background: '#C9897A' }}
                  />
                  <h3
                    className="font-sans font-semibold text-base mb-2"
                    style={{ color: '#111111' }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#777777' }}>
                    {desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────── */}
      <section
        className="py-20 px-4"
        style={{ background: '#111111' }}
      >
        <ScrollReveal direction="up">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="font-display font-semibold mb-4"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: '#FFFFFF', lineHeight: 1.15 }}
            >
              Ready to Create Something Special?
            </h2>
            <p
              className="mb-8 text-base"
              style={{ color: '#AAAAAA' }}
            >
              Browse our collection and let us help you craft a memory that lasts forever.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 font-medium text-sm"
              style={{
                background: '#FFFFFF',
                color: '#111111',
                padding: '14px 36px',
                borderRadius: '10px',
                textDecoration: 'none',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,255,255,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Shop Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
};

export default Home;