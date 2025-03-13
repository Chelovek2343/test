from flask import Flask, request, jsonify
import numpy as np
import joblib  # For loading the ML model (later)
import os

app = Flask(__name__)

# Sample Health Risk Prediction Model (Placeholder)
def predict_health_risk(data):
    age, weight, height, activity = data["age"], data["weight"], data["height"], data["activity"]
    bmi = weight / (height ** 2)
    
    # Placeholder logic for risk (Replace with AI model later)
    risk_score = (age / 100) + (bmi / 40) - (0.1 if activity == "active" else 0)

    if risk_score > 0.8:
        risk = "High"
    elif risk_score > 0.5:
        risk = "Moderate"
    else:
        risk = "Low"

    return {"bmi": round(bmi, 2), "risk_score": round(risk_score, 2), "risk_category": risk}

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    result = predict_health_risk(data)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
