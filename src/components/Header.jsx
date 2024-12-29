import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

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
        <nav className="hidden md:flex space-x-6">
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
      </div>
    </header>
  );
};

export default Header;

