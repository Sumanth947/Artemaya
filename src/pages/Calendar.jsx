import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CalendarIcon, Moon, Sun, Cloud, Droplets } from 'lucide-react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { format, differenceInDays } from 'date-fns';

// Kerala-specific nutrition data
const nutritionData = {
  menstruation: [
    {
      name: 'Iron-Rich Kerala Foods',
      foods: [
        {
          name: 'Drumstick Leaf Thoran',
          ingredients: [
            'Fresh drumstick leaves',
            'Grated coconut',
            'Shallots',
            'Garlic',
            'Turmeric powder',
            'Cumin seeds'
          ],
          recipe: 'Sauté shallots and garlic, add drumstick leaves, coconut, and spices. Cook until done.'
        },
        {
          name: 'Ulli Theeyal',
          ingredients: [
            'Small onions',
            'Roasted coconut',
            'Tamarind',
            'Jaggery',
            'Spices'
          ],
          recipe: 'Roast coconut with spices, make gravy with tamarind and jaggery, cook onions in the gravy.'
        }
      ]
    }
  ],
  follicular: [
    {
      name: 'Protein-Rich Kerala Foods',
      foods: [
        {
          name: 'Kadala Curry',
          ingredients: [
            'Black chickpeas',
            'Coconut',
            'Shallots',
            'Kerala spices',
            'Curry leaves'
          ],
          recipe: 'Pressure cook chickpeas, prepare coconut gravy, combine and simmer with spices.'
        },
        {
          name: 'Meen Curry',
          ingredients: [
            'Fish',
            'Coconut milk',
            'Ginger',
            'Garlic',
            'Green chilies',
            'Curry leaves'
          ],
          recipe: 'Marinate fish, prepare coconut milk gravy with spices, cook fish in the gravy until done.'
        }
      ]
    }
  ],
  ovulation: [
    {
      name: 'Anti-inflammatory Kerala Foods',
      foods: [
        {
          name: 'Vendakka Mappas',
          ingredients: [
            'Ladies finger',
            'Coconut milk',
            'Green chilies',
            'Curry leaves',
            'Kerala spices'
          ],
          recipe: 'Cook ladies finger in coconut milk with spices until tender.'
        },
        {
          name: 'Pineapple Pachadi',
          ingredients: [
            'Ripe pineapple',
            'Yogurt',
            'Green chilies',
            'Grated coconut',
            'Mustard seeds'
          ],
          recipe: 'Cook pineapple, mix with yogurt and coconut, temper with mustard seeds and chilies.'
        }
      ]
    }
  ],
  luteal: [
    {
      name: 'Magnesium-Rich Kerala Foods',
      foods: [
        {
          name: 'Cheera Thoran',
          ingredients: [
            'Red spinach',
            'Grated coconut',
            'Shallots',
            'Garlic',
            'Turmeric powder'
          ],
          recipe: 'Sauté shallots and garlic, add spinach and coconut, cook until done.'
        },
        {
          name: 'Avial',
          ingredients: [
            'Mixed vegetables',
            'Yogurt',
            'Coconut',
            'Cumin seeds',
            'Green chilies',
            'Curry leaves'
          ],
          recipe: 'Cook mixed vegetables, add coconut-yogurt mixture, season with cumin and curry leaves.'
        }
      ]
    }
  ]
};

// Main Calendar component
const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [cyclePhase, setCyclePhase] = useState('menstruation');
  const [lastPeriodDate, setLastPeriodDate] = useState(null);
  const [cycleLengthDays, setCycleLengthDays] = useState(28);
  const [cycleDay, setCycleDay] = useState(1);
  const [expandedFood, setExpandedFood] = useState(null);
  const auth = getAuth();
  const db = getDatabase();

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const today = new Date();
  const formattedToday = format(today, 'dd MMMM');

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const userRef = ref(db, `users/${userId}`);

      onValue(userRef, (snapshot) => {
        const userData = snapshot.val();
        if (userData && userData.lastPeriodDate) {
          setLastPeriodDate(userData.lastPeriodDate);
          setCycleLengthDays(userData.cycleLengthDays || 28);
          
          // Calculate current cycle day
          const daysSinceLastPeriod = differenceInDays(new Date(), new Date(userData.lastPeriodDate));
          const currentCycleDay = (daysSinceLastPeriod % (userData.cycleLengthDays || 28)) + 1;
          setCycleDay(currentCycleDay);
          
          // Set cycle phase
          const phase = calculateCyclePhase(userData.lastPeriodDate, userData.cycleLengthDays || 28, new Date());
          setCyclePhase(phase);
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

  const calculateCyclePhase = (lastPeriodDate, cycleLengthDays, currentDate) => {
    const daysSinceLastPeriod = differenceInDays(currentDate, new Date(lastPeriodDate));
    const currentCycleDay = daysSinceLastPeriod % cycleLengthDays + 1;

    if (currentCycleDay <= 5) return 'menstruation';
    if (currentCycleDay <= 14) return 'follicular';
    if (currentCycleDay <= 21) return 'ovulation';
    return 'luteal';
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
    const calendarDays = [];
    const today = new Date();

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Calendar days
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isToday = today.getDate() === day && 
                     today.getMonth() === currentMonth.getMonth() &&
                     today.getFullYear() === currentMonth.getFullYear();

      calendarDays.push(
        <div
          key={day}
          className={`relative flex items-center justify-center ${
            isToday ? 'text-pink-500 font-bold' : 'text-gray-700'
          }`}
        >
          <div className={`
            w-10 h-10 flex items-center justify-center rounded-full
            ${isToday ? 'border-2 border-pink-500 border-dotted' : ''}
          `}>
            {day}
          </div>
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-pink-300 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          {formattedToday}
        </h1>

        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={handlePrevMonth}
              className="p-2"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div className="grid grid-cols-7 gap-8 text-center w-full max-w-xs mx-auto">
              {days.map(day => (
                <div key={day} className="text-gray-600 font-medium">
                  {day}
                </div>
              ))}
            </div>
            <button
              onClick={handleNextMonth}
              className="p-2"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-4 text-center">
            {renderCalendar()}
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Prediction: {cyclePhase}</h2>
          <p className="text-4xl font-bold mb-6">Day {cycleDay}</p>
          
        </div>

        {nutritionData[cyclePhase] && (
          <div className="mt-8 bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Recommended Kerala foods for {cyclePhase} phase:
            </h3>
            {nutritionData[cyclePhase].map((category) => (
              <div key={category.name} className="mb-4">
                <h4 className="font-semibold mb-2">{category.name}</h4>
                <div className="space-y-2">
                  {category.foods.map((food) => (
                    <div key={food.name} className="bg-white/70 p-4 rounded-lg">
                      <h5 
                        className="font-medium mb-2 cursor-pointer flex items-center justify-between"
                        onClick={() => setExpandedFood(expandedFood === food.name ? null : food.name)}
                      >
                        {food.name}
                        <ChevronRight className={`w-5 h-5 transition-transform ${expandedFood === food.name ? 'transform rotate-90' : ''}`} />
                      </h5>
                      <AnimatePresence>
                        {expandedFood === food.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-sm overflow-hidden"
                          >
                            <p className="font-medium">Ingredients:</p>
                            <ul className="list-disc ml-5 mb-2">
                              {food.ingredients.map((ingredient, idx) => (
                                <li key={idx}>{ingredient}</li>
                              ))}
                            </ul>
                            <p className="font-medium">Recipe:</p>
                            <p>{food.recipe}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;

