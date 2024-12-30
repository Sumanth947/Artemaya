import { useEffect, useState } from 'react';
import app from '../firebaseConfig'; // Import the Firebase app
import { getDatabase, ref, set, onValue } from "firebase/database"; // Import Firebase Database functions
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { getAuth } from "firebase/auth"; // Import Auth to get current user

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
  });
  const navigate = useNavigate();
  const auth = getAuth(app); // Get the Auth instance
  const db = getDatabase(app); // Get the Database instance

  useEffect(() => {
    const user = auth.currentUser; // Get the current user

    if (!user) {
      // If no user is authenticated, redirect to login
      navigate('/'); // Redirect to login page
      return; // Exit the effect
    }

    const userId = user.uid; // Get the current user's ID
    const userRef = ref(db, 'users/' + userId);

    // Check if onboarding data already exists
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        navigate('/stats'); // Redirect to stats page if onboarding is complete
      }
    });
  }, [auth, navigate]);

  const handleSubmit = async () => {
    const user = auth.currentUser; // Get the current user

    if (!user) {
      // If no user is authenticated, redirect to login
      navigate('/'); // Redirect to login page
      return; // Exit the function
    }

    const userId = user.uid; // Get the current user's ID

    try {
      // Store onboarding data in Firebase Realtime Database
      await set(ref(db, 'users/' + userId), formData);
      console.log('Onboarding data saved successfully');
      // Redirect to stats page after saving data
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
      title: 'Gender Selection',
      content: (
        <div className="space-y-6">
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Prefer not to say">Prefer not to say</option>
            <option value="Custom">Custom</option>
          </select>
          {formData.gender === 'Custom' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Please specify:</label>
              <input
                type="text"
                value={formData.customGender}
                onChange={(e) => setFormData({ ...formData, customGender: e.target.value })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          )}
        </div>
      )
    },
    {
      title: 'Measurements',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Weight</label>
              <div className="mt-1 flex">
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
                <select
                  className="rounded-r-md border-l-0 border-gray-300"
                  value={formData.weightUnit}
                  onChange={(e) => setFormData({ ...formData, weightUnit: e.target.value })}
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
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
                <select
                  className="rounded-r-md border-l-0 border-gray-300"
                  value={formData.heightUnit}
                  onChange={(e) => setFormData({ ...formData, heightUnit: e.target.value })}
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
      title: 'Menstrual Cycle Details',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Cycle Length (in days)</label>
            <input
              type="number"
              value={formData.cycleLength}
              onChange={(e) => setFormData({ ...formData, cycleLength: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Period Duration (in days)</label>
            <input
              type="number"
              value={formData.periodDuration}
              onChange={(e) => setFormData({ ...formData, periodDuration: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Cycle Tracking History</label>
            <input
              type="text"
              value={formData.cycleTracking}
              onChange={(e) => setFormData({ ...formData, cycleTracking: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="How do you track your cycle?"
            />
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
            {formData.symptoms.includes('Other') && (
              <input
                type="text"
                placeholder="Specify other symptoms"
                onChange={(e) => setFormData({ ...formData, otherSymptoms: e.target.value })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 mt-2"
              />
            )}
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
      title: 'Menstrual Health Conditions',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Have you been diagnosed with PCOS or PCOD?</label>
            <input
              type="checkbox"
              checked={formData.healthConditions.pcos}
              onChange={(e) => setFormData({ ...formData, healthConditions: { ...formData.healthConditions, pcos: e.target.checked } })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Do you experience severe pelvic pain or have been diagnosed with endometriosis?</label>
            <input
              type="checkbox"
              checked={formData.healthConditions.endometriosis}
              onChange={(e) => setFormData({ ...formData, healthConditions: { ...formData.healthConditions, endometriosis: e.target.checked } })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Have you been diagnosed with anemia or iron deficiency?</label>
            <input
              type="checkbox"
              checked={formData.healthConditions.anemia}
              onChange={(e) => setFormData({ ...formData, healthConditions: { ...formData.healthConditions, anemia: e.target.checked } })}
            />
          </div>
        </div>
      )
    },
    {
      title: 'Emotional and Mental Health',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Do you experience mood swings during your cycle?</label>
            <input
              type="text"
              value={formData.moodChanges}
              onChange={(e) => setFormData({ ...formData, moodChanges: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Rate mood changes</label>
            <select
              value={formData.moodSeverity}
              onChange={(e) => setFormData({ ...formData, moodSeverity: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="">Select Severity</option>
              <option value="Mild">Mild</option>
              <option value="Moderate">Moderate</option>
              <option value="Severe">Severe</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Do you experience anxiety or depression during your cycle?</label>
            <input
              type="text"
              value={formData.anxietyDepression}
              onChange={(e) => setFormData({ ...formData, anxietyDepression: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Does your cycle significantly affect your daily activities?</label>
            <input
              type="text"
              value={formData.impactOnDailyLife}
              onChange={(e) => setFormData({ ...formData, impactOnDailyLife: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>
      )
    },
    {
      title: 'Lifestyle Factors',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">How active are you during your cycle?</label>
            <select
              value={formData.activityLevel}
              onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="">Select Activity Level</option>
              <option value="Sedentary">Sedentary</option>
              <option value="Moderate">Moderate</option>
              <option value="Active">Active</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Do your food cravings or preferences change during your cycle?</label>
            <input
              type="text"
              value={formData.dietaryChanges}
              onChange={(e) => setFormData({ ...formData, dietaryChanges: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Does your period affect your sleep quality?</label>
            <input
              type="text"
              value={formData.sleepPatterns}
              onChange={(e) => setFormData({ ...formData, sleepPatterns: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>
      )
    },
    {
      title: 'Menstrual Hygiene Practices',
      content: (
        <div className="space-y-6">
          <label className="block text-sm font-medium text-gray-700">Products Used</label>
          <div className="flex flex-col">
            {['Pads', 'Tampons', 'Menstrual Cups', 'Period Underwear', 'Other'].map((product) => (
              <div key={product} className="flex items-center">
                <input
                  type="checkbox"
                  value={product}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setFormData((prev) => {
                      const products = checked
                        ? [...prev.hygieneProducts, product]
                        : prev.hygieneProducts.filter((p) => p !== product);
                      return { ...prev, hygieneProducts: products };
                    });
                  }}
                />
                <label className="ml-2">{product}</label>
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Do you have easy access to menstrual hygiene products?</label>
            <input
              type="text"
              value={formData.hygieneAccess}
              onChange={(e) => setFormData({ ...formData, hygieneAccess: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>
      )
    },
    {
      title: 'Current Challenges',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">How do you currently manage period pain?</label>
            <input
              type="text"
              value={formData.painManagement}
              onChange={(e) => setFormData({ ...formData, painManagement: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Do you feel your diet supports your menstrual health?</label>
            <input
              type="text"
              value={formData.nutritionalConcerns}
              onChange={(e) => setFormData({ ...formData, nutritionalConcerns: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Do you face challenges accessing menstrual health resources or facilities?</label>
            <input
              type="text"
              value={formData.accessibilityIssues}
              onChange={(e) => setFormData({ ...formData, accessibilityIssues: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>
      )
    },
    {
      title: 'Goal Setting',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Are you looking to reduce symptoms, track your cycle, or improve overall menstrual health?</label>
            <input
              type="text"
              value={formData.healthGoals}
              onChange={(e) => setFormData({ ...formData, healthGoals: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Are you interested in personalized dietary recommendations for your cycle?</label>
            <input
              type="text"
              value={formData.nutritionGoals}
              onChange={(e) => setFormData({ ...formData, nutritionGoals: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>
      )
    },
    {
      title: 'Additional Personalization',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">At what age did you have your first period?</label>
            <input
              type="number"
              value={formData.firstPeriodAge}
              onChange={(e) => setFormData({ ...formData, firstPeriodAge: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Is your cycle regular or irregular?</label>
            <input
              type="text"
              value={formData.cycleRegularity}
              onChange={(e) => setFormData({ ...formData, cycleRegularity: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Is there a family history of menstrual health issues like PCOS or endometriosis?</label>
            <input
              type="text"
              value={formData.familyHistory}
              onChange={(e) => setFormData({ ...formData, familyHistory: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>
      )
    },
    {
      title: 'Education and Awareness',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">How familiar are you with the phases of the menstrual cycle?</label>
            <input
              type="text"
              value={formData.awarenessLevel}
              onChange={(e) => setFormData({ ...formData, awarenessLevel: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Are you interested in learning more about how your cycle affects your body?</label>
            <input
              type="text"
              value={formData.educationalGoals}
              onChange={(e) => setFormData({ ...formData, educationalGoals: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
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