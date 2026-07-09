import React from 'react';
import { Camera, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, label: 'Facebook', url: '#' },
    { icon: Twitter, label: 'Twitter', url: '#' },
    { icon: Instagram, label: 'Instagram', url: '#' },
    { icon: Linkedin, label: 'LinkedIn', url: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Camera className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">
                Chaitra <span className="text-primary">Wrap</span>@Wear
              </span>
            </div>
            <p className="text-gray-300 mb-4">
              We specialize in creating beautiful, customized photo frames and accessories. 
              From magnetic frames to acrylic displays, we help you preserve your precious memories in style.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm">+91 9912357736</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm">info@chaitrawrapwear.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm">123 Main Street, City, State 12345</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    className="group relative w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-primary/50"
                  >
                    <Icon className="h-5 w-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                    
                    {/* Lift effect on hover */}
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110">
                      <div className="w-full h-full bg-gradient-to-br from-primary to-secondary rounded-full blur-lg" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-3">
              {['Magnetic Frames', 'Custom Keychains', 'Acrylic Frames', 'MDF Frames', 'Custom Sizes'].map((item) => (
                <li key={item}>
                  <a href="#" className="group text-gray-300 hover:text-primary transition-colors duration-300 relative inline-block">
                    <span className="relative">
                      {item}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="text-center text-gray-300">
            <p>&copy; 2024 Chaitra Wrap@Wear. All rights reserved.</p>
            <p className="text-sm text-gray-500 mt-2">Crafted with ❤️ for your precious memories</p>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        @keyframes float-icon {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </footer>
  );
};

export default Footer;