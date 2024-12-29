
from nutrition_advisor import NutritionAdvisor
from config import GEMINI_API_KEY
import sys
import os

def clear_screen():
    """Clear the console screen"""
    os.system('cls' if os.name == 'nt' else 'clear')

def print_header():
    """Print the application header"""
    print("=" * 60)
    print("             Indian Women's Nutrition Advisor")
    print("=" * 60)
    print("\nProviding personalized nutrition advice based on your health profile")
    print("-" * 60)

def get_user_choice() -> str:
    """Get user's choice for program operation"""
    print("\nPlease select an option:")
    print("1. Create new profile and get recommendations")
    print("2. Load existing profile and get recommendations")
    print("3. Exit")
    
    while True:
        choice = input("\nEnter your choice (1-3): ").strip()
        if choice in ['1', '2', '3']:
            return choice
        print("Invalid choice. Please enter 1, 2, or 3.")

def load_existing_profile() -> str:
    """Handle loading of existing profile"""
    profiles = [f for f in os.listdir('.') if f.startswith('user_profile_') and f.endswith('.json')]
    
    if not profiles:
        print("\nNo existing profiles found.")
        return None
    
    print("\nAvailable profiles:")
    for i, profile in enumerate(profiles, 1):
        print(f"{i}. {profile}")
    
    while True:
        try:
            choice = int(input("\nEnter profile number to load (0 to cancel): "))
            if choice == 0:
                return None
            if 1 <= choice <= len(profiles):
                return profiles[choice-1]
            print("Invalid choice. Please try again.")
        except ValueError:
            print("Please enter a valid number.")

def main():
    clear_screen()
    print_header()
    
    try:
        advisor = NutritionAdvisor(GEMINI_API_KEY)
        
        while True:
            choice = get_user_choice()
            
            if choice == '1':
                # Create new profile
                profile = advisor.create_user_profile()
                
            elif choice == '2':
                # Load existing profile
                profile_file = load_existing_profile()
                if not profile_file:
                    continue
                try:
                    profile = advisor.load_profile(profile_file)
                    print("\nProfile loaded successfully!")
                except Exception as e:
                    print(f"\nError loading profile: {str(e)}")
                    continue
                
            else:  # choice == '3'
                print("\nThank you for using the Nutrition Advisor. Goodbye!")
                sys.exit(0)
            
            # Generate recommendations
            print("\nGenerating personalized recommendations...")
            recommendations = advisor.get_recommendations(profile)
            
            print("\n=== Your Personalized Recommendations ===")
            print(recommendations)
            
            input("\nPress Enter to continue...")
            clear_screen()
            print_header()
            
    except Exception as e:
        print(f"\nAn error occurred: {str(e)}")
        print("Please try again or contact support if the problem persists.")
        sys.exit(1)

if __name__ == "__main__":
    main()
