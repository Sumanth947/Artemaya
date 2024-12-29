import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-deep-purple text-white py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © 2024 ARTEMAYA. All rights reserved.
            </p>
          </div>
          <nav className="flex space-x-6">
            <Link 
              to="/privacy" 
              className="text-sm hover:text-light-pink transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-sm hover:text-light-pink transition-colors"
            >
              Terms of Use
            </Link>
            <Link 
              to="/disclaimer" 
              className="text-sm hover:text-light-pink transition-colors"
            >
              AI Disclaimer
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

