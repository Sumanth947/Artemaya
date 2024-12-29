import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-deep-purple mb-6">Welcome to ARTEMAYA</h1>
        <Link 
          to="/onboarding" 
          className="bg-light-pink hover:bg-deep-purple text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Start Onboarding
        </Link>
      </div>
    </div>
  );
};

export default Home;

