import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const cards = [
  {
    title: "How's your mood today?",
    options: ["😊 Great", "😐 Okay", "😔 Not so good", "😫 Terrible"]
  },
  {
    title: "How's your energy level?",
    options: ["⚡ High", "😌 Moderate", "😴 Low", "💤 Exhausted"]
  },
  {
    title: "How's your stress level?",
    options: ["😎 Relaxed", "😅 Slightly stressed", "😰 Very stressed", "😱 Overwhelmed"]
  },
  {
    title: "How well did you sleep?",
    options: ["😴 Great", "😌 Okay", "😑 Not well", "😫 Terrible"]
  }
];

const IntroCards = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextCard = () => {
    setDirection(1);
    setCurrentCard((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setDirection(-1);
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full max-w-md mx-auto h-[400px]">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentCard}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute w-full h-full"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col justify-between">
            <h2 className="text-2xl font-semibold text-deep-purple mb-4">{cards[currentCard].title}</h2>
            <div className="space-y-4">
              {cards[currentCard].options.map((option, index) => (
                <button
                  key={index}
                  className="w-full py-2 px-4 bg-soft-lavender text-deep-purple rounded-lg hover:bg-light-pink hover:text-white transition-colors duration-300"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-light-pink text-white p-2 rounded-full"
        onClick={prevCard}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-light-pink text-white p-2 rounded-full"
        onClick={nextCard}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default IntroCards;

