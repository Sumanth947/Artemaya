import React from 'react';
import { motion } from 'framer-motion';

const AIDisclaimer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-black text-white p-8">
      <motion.div
        className="max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center"
          variants={itemVariants}
        >
          AI Disclaimer
        </motion.h1>

        <motion.section variants={itemVariants} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Nature of AI Services</h2>
          <p>ARTEMAYA utilizes artificial intelligence to provide personalized menstrual health tracking and advice. While we strive for accuracy, please understand that AI-generated content may not always be perfect or comprehensive.</p>
        </motion.section>

        <motion.section variants={itemVariants} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Not a Substitute for Professional Advice</h2>
          <p>The information provided by our AI should not be considered as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding your health.</p>
        </motion.section>

        <motion.section variants={itemVariants} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Limitations of AI</h2>
          <p>Our AI models are trained on large datasets, but they may not account for all individual circumstances or the latest medical research. Always cross-reference important information with reliable sources.</p>
        </motion.section>

        <motion.section variants={itemVariants} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Continuous Improvement</h2>
          <p>We are constantly working to improve our AI models. However, errors or inconsistencies may occur. If you notice any issues, please report them to our support team.</p>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4">User Responsibility</h2>
          <p>By using ARTEMAYA, you acknowledge these limitations and agree to use the service responsibly. Always use your best judgment when interpreting AI-generated advice related to your health.</p>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default AIDisclaimer;