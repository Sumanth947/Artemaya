import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted', { email, password });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-off-white"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-semibold text-deep-purple mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-deep-purple">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-soft-lavender shadow-sm focus:border-light-pink focus:ring focus:ring-light-pink focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-deep-purple">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-soft-lavender shadow-sm focus:border-light-pink focus:ring focus:ring-light-pink focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-light-pink text-white py-2 px-4 rounded-md hover:bg-deep-purple transition-colors duration-300"
            >
              Login
            </motion.button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-soft-lavender">
          Don't have an account?{' '}
          <Link to="/register" className="text-light-pink hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
