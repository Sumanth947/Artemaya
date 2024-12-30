import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CalendarIcon } from 'lucide-react';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { format } from 'date-fns';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [reminderText, setReminderText] = useState('');
  const [reminders, setReminders] = useState({});
  const auth = getAuth();
  const db = getDatabase();

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const remindersRef = ref(db, `reminders/${userId}`);

      onValue(remindersRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setReminders(data);
        }
      });
    }
  }, [auth, db]);

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
    setReminderText(reminders[format(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day), 'yyyy-MM-dd')] || '');
  };

  const handleAddReminder = () => {
    const user = auth.currentUser;
    if (user && selectedDate) {
      const userId = user.uid;
      const dateKey = format(selectedDate, 'yyyy-MM-dd');

      set(ref(db, `reminders/${userId}/${dateKey}`), reminderText)
        .then(() => {
          setReminderText('');
        })
        .catch((error) => {
          console.error('Error saving reminder:', error);
        });
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
    const calendarDays = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="h-14"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDate && 
        selectedDate.getDate() === day && 
        selectedDate.getMonth() === currentMonth.getMonth() &&
        selectedDate.getFullYear() === currentMonth.getFullYear();

      const dateKey = format(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day), 'yyyy-MM-dd');
      const reminder = reminders[dateKey] || '';

      calendarDays.push(
        <motion.div
          key={day}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`h-14 flex flex-col items-center justify-center rounded-lg cursor-pointer transition-colors duration-200 ease-in-out
            ${isSelected ? 'bg-light-pink text-white shadow-md' : 'hover:bg-white/30'}
          `}
          onClick={() => handleDateClick(day)}
        >
          <span className={`text-lg ${isSelected ? 'font-semibold' : ''}`}>{day}</span>
          {reminder && (
            <span className="text-xs bg-deep-purple text-white px-1 rounded mt-1">
              {reminder.length > 10 ? reminder.substring(0, 10) + '...' : reminder}
            </span>
          )}
        </motion.div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-lavender via-light-pink to-deep-purple flex items-center justify-center p-4 sm:p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center flex items-center justify-center">
          <CalendarIcon className="w-8 h-8 mr-2" />
          <span>{monthName} {year}</span>
        </h1>
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-4 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrevMonth}
              className="p-2 rounded-full bg-light-pink text-white shadow-md transition-colors duration-200 hover:bg-pink-500"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <h2 className="text-xl sm:text-2xl font-bold text-deep-purple">{monthName} {year}</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNextMonth}
              className="p-2 rounded-full bg-light-pink text-white shadow-md transition-colors duration-200 hover:bg-pink-500"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
          <div className="grid grid-cols-7 gap-2 sm:gap-4 mb-4">
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
              className="grid grid-cols-7 gap-2 sm:gap-4"
            >
              {renderCalendar()}
            </motion.div>
          </AnimatePresence>
        </div>
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-4 bg-white/90 backdrop-blur-md rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-bold text-deep-purple mb-4 flex items-center">
              <CalendarIcon className="w-6 h-6 mr-2" />
              <span>{selectedDate.toDateString()}</span>
            </h3>
            <textarea
              value={reminderText}
              onChange={(e) => setReminderText(e.target.value)}
              placeholder="Add your reminder here..."
              className="w-full p-3 border border-soft-lavender rounded-lg focus:ring-2 focus:ring-light-pink focus:border-transparent transition duration-200 ease-in-out bg-white/50"
              rows="3"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddReminder}
              className="mt-4 bg-deep-purple text-white py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 transition-colors duration-200 ease-in-out"
            >
              Save Reminder
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Calendar;

