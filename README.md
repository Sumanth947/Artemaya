# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Artemaya

Artemaya is a platform designed to improve menstrual health and well-being through personalized nutrition and tracking tools.

---

## Features

1. **Home Page**: Welcoming page with a "Start Onboarding" button.
2. **Onboarding Form**: Multi-step form to collect user information.
3. **Login and Registration**: Secure access and account creation.
4. **Calendar Page**: Interactive calendar for health tracking.
5. **Stats Page**: Displays health metrics like cycle length and period duration.
6. **Contact Page**: Form for inquiries or feedback.
7. **Chat Page**: AI-powered chatbot for personalized interactions.
8. **Nutrition Recommendation**: Advice based on regional dietary habits.
9. **Menstrual phase-specific**: Health condition-specific guidance

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sumanth947/Artemaya.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Artemaya
   ```
   
3. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
4. Activate the virtual environment:
   ```bash
   venv\Scripts\activate
   ```
5. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
6. Create a .env file in the project root directory:
   ```bash
   touch .env
   ```
7. Add the following keys to the .env file:
   ```bash
   GEMINI_API_KEY=your_gemini_api_key
   ```
8. Run the Application:
   ```bash
   python main.py
   ```
**Backend Structure**
Nutrition-advisory-system/
├── main.py                 # Entry point for the application
├── nutrition_advisor.py    # Core logic for recommendations
├── prompts/                # Prompt templates for AI
├── config/                 # Configuration and utility files
├── data/                   # File-based user profiles and recommendations
├── requirements.txt        # Python dependencies
├── README.md               # Project documentation
└── .env                    # Environment variables


---

## Contact

For inquiries, visit the Contact Page or reach out on GitHub: [Sumanth947](https://github.com/Sumanth947/Artemaya).
