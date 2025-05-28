from flask import Flask, request, jsonify
from flask_cors import CORS
from collections import defaultdict
import google.generativeai as genai
import pandas as pd
import os

# === Configure Gemini API ===
genai.configure(api_key="AIzaSyA44wnbpyjIET5WOEnENGqWKYfxVzGzFow")  # Replace with your key

# === Flask App Setup ===
app = Flask(__name__)
CORS(app)

# === Load Real Estate Dataset ===
real_estate_df = pd.read_csv("bangalore_real_estate.csv")
real_estate_data = real_estate_df.to_dict(orient="records")

# === In-Memory Chat History ===
chat_histories = defaultdict(list)

# === Domain Keywords for Filtering ===
REAL_ESTATE_KEYWORDS = [
    "property", "flat", "apartment", "villa", "bangalore", "location", "price",
    "sqft", "bedroom", "2 BHK", "3 BHK", "investment", "area", "layout", "rent",
    "real estate", "plot", "site", "possession", "builder", "loan", "amenities", "1 BHK"
]

def is_real_estate_related(query):
    query_lower = query.lower()
    return any(keyword in query_lower for keyword in REAL_ESTATE_KEYWORDS)

# === Chat Route ===
@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    session_id = data.get("session_id")
    user_message = data.get("message")

    # Get the session history
    chat_history = chat_histories[session_id]

    # Add system prompt once per session
    if not any(msg['role'] == 'model' for msg in chat_history):
        context_prompt = (
            "You are a helpful assistant for Bangalore real estate. "
            "Answer ONLY questions related to real estate such as prices, locations, apartments, etc. "
            "If someone asks something outside of that domain, refuse politely. "
            "Respond clearly, concisely within 12 lines with related answer only and professionally without using special characters like **, *, etc."
        )
        chat_history.append({"role": "model", "parts": [context_prompt]})

    # Append user message
    chat_history.append({"role": "user", "parts": [user_message]})

    # Initialize Gemini model
    model = genai.GenerativeModel("gemini-2.5-flash-preview-05-20")
    response = model.generate_content(chat_history)

    # Clean and format reply
    reply = response.text.strip()
    reply = reply.replace("**", "").replace("*", "").replace("##", "").replace("#", "")
    reply = reply.replace("\n\n", "\n").strip()

    # Append model response
    chat_history.append({"role": "model", "parts": [reply]})
    chat_histories[session_id] = chat_history

    return jsonify({"reply": reply})

# === Run Server ===
if __name__ == "__main__":
    app.run(debug=True)
