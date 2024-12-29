import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Droplet, Sun } from 'lucide-react';

const Stats = () => {
  const stats = [
    { title: "Cycle Length", value: "28 days", progress: 75, icon: TrendingUp, trend: "up" },
    { title: "Period Duration", value: "5 days", progress: 60, icon: Droplet, trend: "down" },
    { title: "Ovulation Day", value: "Day 14", progress: 45, icon: Sun, trend: "neutral" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 max-w-6xl mx-auto"
    >
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-semibold text-deep-purple mb-12 text-center"
      >
        Your Health Statistics
      </motion.h1>
      <div className="grid md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-deep-purple">{stat.title}</h2>
              <stat.icon className={`w-8 h-8 ${
                stat.trend === 'up' ? 'text-green-500' :
                stat.trend === 'down' ? 'text-red-500' :
                'text-yellow-500'
              }`} />
            </div>
            <p className="text-3xl font-bold text-light-pink mb-4">{stat.value}</p>
            <div className="relative h-3 bg-soft-lavender rounded-full overflow-hidden">
              <motion.div 
                className="absolute h-full bg-light-pink rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${stat.progress}%` }}
                transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Stats;

