# app.py
from flask import Flask, request, jsonify
from nutrition_advisor import NutritionAdvisor
from flask_cors import CORS
import os
from dotenv import load_dotenv
import json
from datetime import datetime

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize NutritionAdvisor
advisor = NutritionAdvisor(os.getenv('GEMINI_API_KEY'))

@app.route('/health-check', methods=['GET'])
def health_check():
    return jsonify({"status": "Server is up and running!"})

@app.route('/create-profile', methods=['POST'])
def create_profile():
    try:
        profile_data = request.json
        if not profile_data:
            return jsonify({"error": "No profile data provided"}), 400

        # Format profile and get recommendations
        profile_text = advisor._format_profile(profile_data)
        
        # Save profile
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"user_profile_{timestamp}.json"
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(profile_data, f, indent=4)

        # Generate recommendations
        recommendations = advisor.get_recommendations(profile_text)

        return jsonify({
            "success": True,
            "profile_id": filename,
            "recommendations": recommendations
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/load-profile/<profile_id>', methods=['GET'])
def load_profile(profile_id):
    try:
        profile_text = advisor.load_profile(profile_id)
        recommendations = advisor.get_recommendations(profile_text)

        return jsonify({
            "success": True,
            "profile": profile_text,
            "recommendations": recommendations
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/list-profiles', methods=['GET'])
def list_profiles():
    try:
        profiles = [f for f in os.listdir('.') if f.startswith('user_profile_') and f.endswith('.json')]
        return jsonify({
            "success": True,
            "profiles": profiles
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_input = data.get("message", "")
        profile_id = data.get("profile_id", None)

        if not user_input:
            return jsonify({"error": "No input message provided"}), 400

        # Load profile context if provided
        profile_context = ""
        if profile_id:
            try:
                profile_text = advisor.load_profile(profile_id)
                profile_context = f"\nUser Profile Context:\n{profile_text}\n"
            except Exception:
                pass

        # Generate response using the advisor
        response = advisor.get_recommendations(f"{profile_context}\nUser Query: {user_input}")

        return jsonify({
            "success": True,
            "response": response
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)