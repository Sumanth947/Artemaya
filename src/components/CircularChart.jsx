import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(ArcElement, Tooltip, Legend);

const CircularChart = () => {
  const data = {
    labels: ['Cycle Days', 'Non-Cycle Days'],
    datasets: [
      {
        data: [7, 21],
        backgroundColor: ['#F5C0C0', '#B8B5CB'],
        hoverBackgroundColor: ['#f7d4d4', '#c9c7d6'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: 'Montserrat',
            size: 14,
          },
          color: '#2D2A3D',
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h2 className="text-2xl font-semibold text-deep-purple text-center mb-6">
        Cycle Overview
      </h2>
      <div className="relative">
        <Pie data={data} options={options} />
      </div>
    </motion.div>
  );
};

export default CircularChart;

