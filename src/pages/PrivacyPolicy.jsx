import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
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
          Privacy Policy
        </motion.h1>

        <motion.section variants={itemVariants} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you create an account, use our services, or communicate with us. This may include personal information such as your name, email address, and health-related data.</p>
        </motion.section>

        <motion.section variants={itemVariants} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p>We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect ARTEMAYA and our users. We may also use the information to communicate with you about our services.</p>
        </motion.section>

        <motion.section variants={itemVariants} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Information Sharing and Disclosure</h2>
          <p>We do not share your personal information with companies, organizations, or individuals outside of ARTEMAYA except in the following cases: with your consent, for legal reasons, or to protect rights, property, or safety.</p>
        </motion.section>

        <motion.section variants={itemVariants} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
          <p>We work hard to protect ARTEMAYA and our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold.</p>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4">5. Changes to This Policy</h2>
          <p>Our Privacy Policy may change from time to time. We will post any privacy policy changes on this page and, if the changes are significant, we will provide a more prominent notice.</p>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;

