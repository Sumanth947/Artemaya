import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();

  const getDaysInMonth = (date) => {
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return lastDay.getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
    const calendarDays = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDate && 
        selectedDate.getDate() === day && 
        selectedDate.getMonth() === currentMonth.getMonth() &&
        selectedDate.getFullYear() === currentMonth.getFullYear();

      calendarDays.push(
        <motion.div
          key={day}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`h-12 flex items-center justify-center rounded-full cursor-pointer
            ${isSelected ? 'bg-light-pink text-white' : 'hover:bg-soft-lavender'}
          `}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </motion.div>
      );
    }

    return calendarDays;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 max-w-4xl mx-auto"
    >
      <h1 className="text-4xl font-semibold text-deep-purple mb-8 text-center">
        {monthName} {year}
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrevMonth}
            className="p-2 rounded-full bg-light-pink text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <h2 className="text-2xl font-semibold text-deep-purple">{monthName} {year}</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNextMonth}
            className="p-2 rounded-full bg-light-pink text-white"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
        <div className="grid grid-cols-7 gap-4 mb-4">
          {days.map(day => (
            <div key={day} className="text-center font-semibold text-soft-lavender">
              {day}
            </div>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${currentMonth.getMonth()}-${currentMonth.getFullYear()}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-7 gap-4"
          >
            {renderCalendar()}
          </motion.div>
        </AnimatePresence>
      </div>
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-4 bg-white rounded-lg shadow-lg"
        >
          <h3 className="text-xl font-semibold text-deep-purple mb-2">
            Selected Date: {selectedDate.toDateString()}
          </h3>
          <p className="text-soft-lavender">
            Add your events or health tracking information here.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Calendar;

