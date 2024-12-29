from flask import Flask, request, jsonify
from transformers import pipeline
from flask_ngrok import run_with_ngrok

# Initialize Flask app
app = Flask(__name__)
run_with_ngrok(app)  # Expose the app publicly for testing

model_name = "google/flan-t5-small"  # Lightweight and efficient
dialogue_pipeline = pipeline("text2text-generation", model=model_name)


# Example system instructions for the LLM
SYSTEM_PROMPT = """
You are a diet and nutrition advisor. Respond to user queries with personalized and actionable diet recommendations, considering their location, symptoms, and preferences.
"""

@app.route('/chat', methods=['POST'])
def chatbot():
    # Get user input from the request
    user_input = request.json.get("message", "")

    if not user_input:
        return jsonify({"error": "No input message provided."}), 400

    # Dynamic user-specific prompt
    prompt = f"""
    {SYSTEM_PROMPT}
    User: {user_input}
    """

    try:
        # Generate response using the local LLM
        response = dialogue_pipeline(prompt, max_length=200, num_return_sequences=1)

        # Extract and return the bot's response
        bot_response = response[0]['generated_text'].strip()
        return jsonify({"response": bot_response})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/health-check', methods=['GET'])
def health_check():
    return jsonify({"status": "Server is up and running!"})

if __name__ == '__main__':
    app.run()
