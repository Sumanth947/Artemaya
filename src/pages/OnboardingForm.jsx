import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    weight: '',
    weightUnit: 'kg',
    height: '',
    heightUnit: 'cm',
    dietaryPreferences: [],
    foodPreferences: [],
    location: '',
    preparationTime: '',
    cookingFacilities: [],
    nutrientDeficiencies: [],
    lutealSymptoms: [],
    periodSymptoms: [],
  });

  const dietaryOptions = [
    'Vegetarian',
    'Vegan',
    'Pescatarian',
    'Gluten-free',
    'Dairy-free',
    'Keto',
    'No restrictions'
  ];

  const foodPreferenceOptions = [
    'Asian cuisine',
    'Mediterranean',
    'Indian',
    'Mexican',
    'American',
    'European',
    'Home-style cooking'
  ];

  const cookingFacilityOptions = [
    'Full kitchen',
    'Basic kitchen',
    'Microwave only',
    'Mini fridge',
    'Induction cooktop',
    'Oven',
    'Air fryer'
  ];

  const nutrientDeficiencyOptions = [
    'Iron',
    'Vitamin D',
    'Vitamin B12',
    'Calcium',
    'Magnesium',
    'None known'
  ];

  const symptomOptions = [
    'Cramps',
    'Bloating',
    'Fatigue',
    'Mood changes',
    'Headaches',
    'Back pain',
    'Breast tenderness',
    'None'
  ];

  const timeOptions = [
    '15 minutes or less',
    '15-30 minutes',
    '30-60 minutes',
    'More than 60 minutes'
  ];

  const handleMultiSelect = (category, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const steps = [
    {
      title: 'Basic Measurements',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Weight</label>
              <div className="mt-1 flex">
                <input
                  type="number"
                  className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  value={formData.weight}
                  onChange={(e) => setFormData({...formData, weight: e.target.value})}
                />
                <select
                  className="rounded-r-md border-l-0 border-gray-300"
                  value={formData.weightUnit}
                  onChange={(e) => setFormData({...formData, weightUnit: e.target.value})}
                >
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Height</label>
              <div className="mt-1 flex">
                <input
                  type="number"
                  className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  value={formData.height}
                  onChange={(e) => setFormData({...formData, height: e.target.value})}
                />
                <select
                  className="rounded-r-md border-l-0 border-gray-300"
                  value={formData.heightUnit}
                  onChange={(e) => setFormData({...formData, heightUnit: e.target.value})}
                >
                  <option value="cm">cm</option>
                  <option value="ft">ft</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Dietary Preferences',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select your dietary preferences
            </label>
            <div className="grid grid-cols-2 gap-3">
              {dietaryOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleMultiSelect('dietaryPreferences', option)}
                  className={`p-3 rounded-lg border ${
                    formData.dietaryPreferences.includes(option)
                      ? 'bg-purple-100 border-purple-500 text-purple-700'
                      : 'border-gray-300 hover:border-purple-500'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Food Preferences',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What kind of food do you prefer?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {foodPreferenceOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleMultiSelect('foodPreferences', option)}
                  className={`p-3 rounded-lg border ${
                    formData.foodPreferences.includes(option)
                      ? 'bg-purple-100 border-purple-500 text-purple-700'
                      : 'border-gray-300 hover:border-purple-500'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Location & Time',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Where are you staying?</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Enter your location"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How much time can you spend on food preparation?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {timeOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setFormData({...formData, preparationTime: option})}
                  className={`p-3 rounded-lg border ${
                    formData.preparationTime === option
                      ? 'bg-purple-100 border-purple-500 text-purple-700'
                      : 'border-gray-300 hover:border-purple-500'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Cooking Facilities',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What cooking facilities are available to you?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {cookingFacilityOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleMultiSelect('cookingFacilities', option)}
                  className={`p-3 rounded-lg border ${
                    formData.cookingFacilities.includes(option)
                      ? 'bg-purple-100 border-purple-500 text-purple-700'
                      : 'border-gray-300 hover:border-purple-500'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Health Information',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Do you have any nutrient deficiencies?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {nutrientDeficiencyOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleMultiSelect('nutrientDeficiencies', option)}
                  className={`p-3 rounded-lg border ${
                    formData.nutrientDeficiencies.includes(option)
                      ? 'bg-purple-100 border-purple-500 text-purple-700'
                      : 'border-gray-300 hover:border-purple-500'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Menstrual Health',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Symptoms during luteal phase (before periods)
            </label>
            <div className="grid grid-cols-2 gap-3">
              {symptomOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleMultiSelect('lutealSymptoms', option)}
                  className={`p-3 rounded-lg border ${
                    formData.lutealSymptoms.includes(option)
                      ? 'bg-purple-100 border-purple-500 text-purple-700'
                      : 'border-gray-300 hover:border-purple-500'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Symptoms during periods
            </label>
            <div className="grid grid-cols-2 gap-3">
              {symptomOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleMultiSelect('periodSymptoms', option)}
                  className={`p-3 rounded-lg border ${
                    formData.periodSymptoms.includes(option)
                      ? 'bg-purple-100 border-purple-500 text-purple-700'
                      : 'border-gray-300 hover:border-purple-500'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
        <div className="p-8">
          <div className="mb-8">
            <div className="relative">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-100">
                <div
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500 transition-all duration-500"
                ></div>
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">{steps[currentStep].title}</h2>
                <p className="text-sm text-gray-500">Step {currentStep + 1} of {steps.length}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            {steps[currentStep].content}
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setCurrentStep(current => current - 1)}
              disabled={currentStep === 0}
              className={`flex items-center px-4 py-2 rounded-md ${
                currentStep === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-purple-600 hover:bg-purple-50'
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Previous
            </button>
            
            {currentStep === steps.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
              >
                Complete
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep(current => current + 1)}
                className="flex items-center px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-md"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

