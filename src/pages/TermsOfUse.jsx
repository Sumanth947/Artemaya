import React from 'react';
import { motion } from 'framer-motion';

const TermsOfUse = () => {
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
          Terms of Use
        </motion.h1>

        <motion.section variants={itemVariants} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>By accessing and using ARTEMAYA, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our service.</p>
        </motion.section>

        <motion.section variants={itemVariants} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Use of Service</h2>
          <p>ARTEMAYA is intended for personal, non-commercial use. You agree not to misuse the service or help anyone else do so.</p>
        </motion.section>

        <motion.section variants={itemVariants} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Privacy</h2>
          <p>Your privacy is important to us. Please refer to our Privacy Policy for information on how we collect, use, and disclose your personal information.</p>
        </motion.section>

        <motion.section variants={itemVariants} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Modifications to Service</h2>
          <p>We reserve the right to modify or discontinue ARTEMAYA at any time without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.</p>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4">5. Governing Law</h2>
          <p>These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.</p>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default TermsOfUse;

