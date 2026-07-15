import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  const helpLinks = ['How It Works', 'Order via WhatsApp', 'Shipping Info', 'Returns'];

  return (
    <footer style={{ background: '#111111', color: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">

          {/* Brand */}
          <div className="md:col-span-6">
            <div className="flex items-baseline gap-2 mb-3">
              <span
                className="font-display text-2xl font-semibold"
                style={{ color: '#FFFFFF', letterSpacing: '-0.01em' }}
              >
                Chaitra
              </span>
              <span
                className="text-xs font-sans tracking-widest uppercase"
                style={{ color: '#C9897A' }}
              >
                Wrap &amp; Wear
              </span>
            </div>
            <div
              className="w-8 h-px mb-5"
              style={{ background: '#C9897A' }}
            />
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#AAAAAA' }}>
              We craft personalized photo frames, acrylic displays, and keepsakes that preserve
              your most precious memories in timeless style.
            </p>

            {/* Contact */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0" style={{ color: '#C9897A' }} />
                <span className="text-sm" style={{ color: '#CCCCCC' }}>+91 8499999498</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0" style={{ color: '#C9897A' }} />
                <span className="text-sm" style={{ color: '#CCCCCC' }}>hello@chaitrika.in</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 flex-shrink-0" style={{ color: '#C9897A' }} />
                <span className="text-sm" style={{ color: '#CCCCCC' }}>Hyderabad, Madhapur</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Youtube, label: 'YouTube' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                  style={{ border: '1px solid #333333', color: '#AAAAAA' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#C9897A';
                    e.currentTarget.style.color = '#C9897A';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#333333';
                    e.currentTarget.style.color = '#AAAAAA';
                  }}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Help */}
          <div className="md:col-span-4 md:col-start-9">
            <h3 className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: '#777777' }}>
              Help
            </h3>
            <ul className="space-y-3">
              {helpLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm link-accent transition-colors duration-200"
                    style={{ color: '#AAAAAA', textDecoration: 'none' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#AAAAAA'}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderTop: '1px solid #222222', color: '#666666' }}
        >
          <p>© {new Date().getFullYear()} Chaitra Wrap &amp; Wear. All rights reserved.</p>
          <p>Crafted with care in Hyderabad 🤍</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;