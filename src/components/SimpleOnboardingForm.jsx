import React, { useState } from 'react';

export default function SimpleOnboardingForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    weight: '',
    weightUnit: 'kg',
    height: '',
    heightUnit: 'cm',
  });

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
      title: 'Confirmation',
      content: (
        <div>
          <h3 className="text-lg font-medium text-gray-900">Please confirm your details:</h3>
          <p>Weight: {formData.weight} {formData.weightUnit}</p>
          <p>Height: {formData.height} {formData.heightUnit}</p>
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
              className={`px-4 py-2 rounded-md ${
                currentStep === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-purple-600 hover:bg-purple-50'
              }`}
            >
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
                className="px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-md"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

