import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 1.5
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-700 to-black overflow-hidden p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        <h1 className="text-6xl font-extrabold text-gray-100 mb-4">
          Welcome to{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white">
            ARTEMAYA
          </span>
        </h1>
        <p className="text-2xl text-gray-300 mb-8">
          Your personalized menstrual health tracker
        </p>
      </motion.div>
        <div className="mb-16"></div>


      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: isLoaded ? 1 : 0.8, opacity: isLoaded ? 1 : 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="bg-gray-800 bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-2xl max-w-md w-full relative overflow-hidden z-10"
      >
        <p className="text-xl text-gray-200 text-center mb-6">
          Track your cycle, manage your symptoms, and improve your health.
          
        </p>
        
        {/* Animated circles */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute rounded-full border-2 border-gray-400"
              style={{
                width: `${(index + 1) * 100}px`,
                height: `${(index + 1) * 100}px`,
              }}
              variants={circleVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 + index * 0.2 }}
            />
          ))}
        </div>

        {/* Animated dots */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-2 h-2 bg-gray-400 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.7 }}
              transition={{
                delay: 1 + index * 0.1,
                duration: 0.5,
                repeat: Infinity,
                repeatType: 'reverse',
                repeatDelay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-12 z-10"
      >
       
      </motion.div>

      {/* Background animated particles */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gray-400"
          initial={{
            opacity: Math.random() * 0.5 + 0.1,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, Math.random() * -50, Math.random() * 50],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
          }}
        />
      ))}
    </div>
  );
};

export default Home;

