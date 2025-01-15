import { useEffect, useState } from 'react';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";

function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    customGender: '',
    weight: '',
    weightUnit: 'kg',
    height: '',
    heightUnit: 'cm',
    cycleLength: '',
    periodDuration: '',
    cycleTracking: '',
    symptoms: [],
    symptomSeverity: '',
    healthConditions: {
      pcos: false,
      endometriosis: false,
      anemia: false,
    },
    moodChanges: '',
    moodSeverity: '',
    anxietyDepression: '',
    activityLevel: '',
    dietaryChanges: '',
    sleepPatterns: '',
    hygieneProducts: [],
    hygieneAccess: '',
    painManagement: '',
    nutritionalConcerns: '',
    accessibilityIssues: '',
    healthGoals: '',
    nutritionGoals: '',
    firstPeriodAge: '',
    cycleRegularity: '',
    familyHistory: '',
    awarenessLevel: '',
    educationalGoals: '',
    lastPeriodDate: '',
    cycleLengthDays: '28',
  });

  const navigate = useNavigate();
  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) {
      navigate('/');
      return;
    }

    const userId = user.uid;
    const userRef = ref(db, 'users/' + userId);

    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        navigate('/stats');
      }
    });
  }, [auth, navigate]);

  const handleSubmit = async () => {
    const user = auth.currentUser;

    if (!user) {
      navigate('/');
      return;
    }

    const userId = user.uid;

    try {
      await set(ref(db, 'users/' + userId), formData);
      console.log('Onboarding data saved successfully');
      navigate('/stats');
    } catch (error) {
      console.error('Error saving onboarding data:', error);
    }
  };

  const steps = [
    {
      title: 'Personal Information',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>
        </div>
      )
    },
    {
      title: 'Period Tracking',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">When was your last period?</label>
            <input
              type="date"
              value={formData.lastPeriodDate}
              onChange={(e) => setFormData({ ...formData, lastPeriodDate: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              This helps us predict your cycle phases accurately
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Average Cycle Length (in days)</label>
            <select
              value={formData.cycleLengthDays}
              onChange={(e) => setFormData({ ...formData, cycleLengthDays: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            >
              <option value="28">28 days</option>
              <option value="30">30 days</option>
            </select>
            <p className="mt-1 text-sm text-gray-500">
              Most menstrual cycles last between 28-30 days
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Menstrual Symptoms',
      content: (
        <div className="space-y-6">
          <label className="block text-sm font-medium text-gray-700">Common Symptoms</label>
          <div className="flex flex-col">
            {[
              'Cramps',
              'Bloating',
              'Mood swings',
              'Fatigue',
              'Breast tenderness',
              'Acne',
              'Heavy bleeding',
              'Other'
            ].map((symptom) => (
              <div key={symptom} className="flex items-center">
                <input
                  type="checkbox"
                  value={symptom}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setFormData((prev) => {
                      const symptoms = checked
                        ? [...prev.symptoms, symptom]
                        : prev.symptoms.filter((s) => s !== symptom);
                      return { ...prev, symptoms };
                    });
                  }}
                />
                <label className="ml-2">{symptom}</label>
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Severity</label>
            <select
              value={formData.symptomSeverity}
              onChange={(e) => setFormData({ ...formData, symptomSeverity: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="">Select Severity</option>
              <option value="Mild">Mild</option>
              <option value="Moderate">Moderate</option>
              <option value="Severe">Severe</option>
            </select>
          </div>
        </div>
      )
    },
    {
      title: 'Health Conditions',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Have you been diagnosed with any of the following?</label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.healthConditions.pcos}
                  onChange={(e) => setFormData({
                    ...formData,
                    healthConditions: { ...formData.healthConditions, pcos: e.target.checked }
                  })}
                  className="mr-2"
                />
                <span>PCOS/PCOD</span>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.healthConditions.endometriosis}
                  onChange={(e) => setFormData({
                    ...formData,
                    healthConditions: { ...formData.healthConditions, endometriosis: e.target.checked }
                  })}
                  className="mr-2"
                />
                <span>Endometriosis</span>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.healthConditions.anemia}
                  onChange={(e) => setFormData({
                    ...formData,
                    healthConditions: { ...formData.healthConditions, anemia: e.target.checked }
                  })}
                  className="mr-2"
                />
                <span>Anemia</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

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

export default OnboardingForm;