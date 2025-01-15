// src/components/Header.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, Camera } from 'lucide-react'; // Import Camera icon

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const links = [
    { path: '/', label: 'Home' },
    { path: '/calendar', label: 'Calendar' },
    { path: '/chat', label: 'AI Chat' },
    { path: '/stats', label: 'Stats' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header className="bg-deep-purple text-white py-4 px-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          ARTEMAYA
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex space-x-6">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative"
              >
                {isActive(link.path) && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 right-0 bottom-0 h-0.5 bg-light-pink"
                  />
                )}
                <span className="relative z-10 hover:text-light-pink transition-colors">
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              to="/upload" // Link to the UploadPic page
              className="flex items-center space-x-1 px-3 py-1.5 rounded-md hover:bg-white/10 transition-colors"
            >
              <Camera className="h-4 w-4" /> {/* Camera icon */}
              <span>Upload Pic</span>
            </Link>
            <Link
              to="/login" // Ensure this points to the correct login path
              className="flex items-center space-x-1 px-3 py-1.5 rounded-md hover:bg-white/10 transition-colors"
            >
              <LogIn className="h-4 w-4" />
              <span>Sign in</span>
            </Link>
            <Link
              to="/register" // Ensure this points to the correct signup path
              className="flex items-center space-x-1 px-4 py-1.5 bg-light-pink rounded-md hover:bg-light-pink/90 transition-colors"
            >
              <UserPlus className="h-4 w-4" />
              <span>Sign up</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;