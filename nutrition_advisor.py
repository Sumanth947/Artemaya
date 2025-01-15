import google.generativeai as genai
from typing import Dict, List
import json
from datetime import datetime
from prompts import get_system_prompt, get_base_questions

class NutritionAdvisor:
    def __init__(self, api_key: str):
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel("gemini-1.5-flash")
        self.user_profile = {}
        
    def create_user_profile(self) -> str:
        """Gather user information through interactive questions"""
        profile_data = {}
        
        print("\nWelcome to your personalized nutrition advisory system!")
        print("I'll ask you some questions to understand your needs better.")
        print("Please provide detailed answers for the most personalized recommendations.\n")
        
        for question_group in get_base_questions():
            print(f"\n=== {question_group['id'].replace('_', ' ').title()} ===")
            for question in question_group['questions']:
                while True:
                    answer = input(f"{question}\n> ").strip()
                    if answer:  # Basic validation - ensure answer isn't empty
                        break
                    print("Please provide an answer to continue.")
                profile_data[question] = answer

        profile_text = self._format_profile(profile_data)
        self.user_profile = profile_data
        
        # Save profile to file
        self._save_profile(profile_data)
        
        return profile_text

    def _format_profile(self, profile_data: Dict) -> str:
        """Format the gathered data into a structured profile"""
        return f"""
<profile>
Basic Information:
- Name: {profile_data.get('What is your name?', 'Unknown')}
- Age: {profile_data.get('What is your age?', 'Unknown')}
- Location: {profile_data.get('Where do you live (city and state in South India)?', 'Unknown')}
- Dietary Preference: {profile_data.get('Are you vegetarian or non-vegetarian?', 'Unknown')}
- Allergies: {profile_data.get('Do you have any food allergies or intolerances?', 'None')}
- Current Weight/Height: {profile_data.get('What is your current weight and height?', 'Unknown')}
- Target Weight: {profile_data.get('What is your target weight (if any)?', 'None')}

Health Information:
- Menstrual Phase: {profile_data.get('Which phase of your menstrual cycle are you in currently? (follicular/ovulation/luteal/menstrual)', 'Unknown')}
- PCOD/PMS: {profile_data.get('Do you have PCOD or experience PMS symptoms?', 'Unknown')}
- Symptoms: {profile_data.get('What specific symptoms do you experience during menstruation?', 'None')}
- Deficiencies: {profile_data.get('Have you been diagnosed with any nutritional deficiencies? (like iron, B12, D3, etc.)', 'Unknown')}
- Other Health Conditions: {profile_data.get('Do you have any other health conditions?', 'None')}
- Activity Level: {profile_data.get('How would you describe your activity level? (sedentary/moderate/active)', 'Unknown')}
- Physical Activity: {profile_data.get('What type of physical activity do you do and how often?', 'Unknown')}

Dietary Information:
- Typical Breakfast: {profile_data.get('What does your typical breakfast look like?', 'Unknown')}
- Typical Lunch: {profile_data.get('What do you usually have for lunch?', 'Unknown')}
- Typical Dinner: {profile_data.get('What is your typical dinner?', 'Unknown')}
- Meal Frequency: {profile_data.get('How many meals do you prefer per day?', 'Unknown')}
- Cooking Equipment: {profile_data.get('What cooking equipment do you have? (pressure cooker, mixer, etc.)', 'Unknown')}
- Cooking Time: {profile_data.get('How much time can you spend on cooking each day?', 'Unknown')}
- Meal Prep Preference: {profile_data.get('Do you meal prep or prefer cooking fresh?', 'Unknown')}
- Favorite Dishes: {profile_data.get('What are your favorite local dishes?', 'Unknown')}
- Food Restrictions: {profile_data.get('Are there any specific foods you avoid?', 'None')}
- Dietary Goals: {profile_data.get('Do you have any specific dietary goals?', 'Unknown')}
</profile>
"""

    def _save_profile(self, profile_data: Dict):
        """Save user profile to a JSON file"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"user_profile_{timestamp}.json"
        
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(profile_data, f, indent=4)
            print(f"\nProfile saved to {filename}")
        except Exception as e:
            print(f"\nWarning: Could not save profile to file: {str(e)}")

    def get_recommendations(self, profile_text: str) -> str:
        """Get personalized recommendations from the LLM"""
        try:
            # Split recommendations into chunks to handle length
            recommendations = []
            
            # Get main dietary recommendations
            main_prompt = f"{get_system_prompt()}\n\nUser Profile:\n{profile_text}\n\nBased on this profile, provide a comprehensive personalized diet plan and recommendations."
            
            try:
                response = self.model.generate_content(main_prompt)
                recommendations.append(response.text)
            except Exception as e:
                print(f"Error generating main recommendations: {str(e)}")
                return "Error generating recommendations. Please try again."

            # Save recommendations to file
            self._save_recommendations(recommendations[0])
            
            return recommendations[0]
        
        except Exception as e:
            return f"Error generating recommendations: {str(e)}"

    def _save_recommendations(self, recommendations: str):
        """Save recommendations to a text file"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"recommendations_{timestamp}.txt"
        
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(recommendations)
            print(f"\nRecommendations saved to {filename}")
        except Exception as e:
            print(f"\nWarning: Could not save recommendations to file: {str(e)}")

    def load_profile(self, filename: str) -> str:
        """Load a previously saved user profile"""
        try:
            with open(filename, 'r', encoding='utf-8') as f:
                profile_data = json.load(f)
            self.user_profile = profile_data
            return self._format_profile(profile_data)
        except Exception as e:
            raise Exception(f"Error loading profile: {str(e)}")

