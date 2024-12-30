import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-deep-purple text-white py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p className="text-sm font-light">
              © {new Date().getFullYear()} ARTEMAYA. All rights reserved.
            </p>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end space-x-6">
            {['Privacy Policy', 'Terms of Use', 'AI Disclaimer'].map((item, index) => (
              <Link 
                key={index}
                to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm font-medium hover:text-pink-300 transition-colors duration-300 ease-in-out transform hover:scale-105"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 border-t border-purple-600 pt-8 text-center">
          <p className="text-xs text-purple-200">
            Empowering creativity with AI - ARTEMAYA
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

