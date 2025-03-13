from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://localhost:3000"}})  # Allow React frontend

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Backend is running!"})

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400

    age = data.get("age")
    weight = data.get("weight")
    height = data.get("height")

    if not age or not weight or not height:
        return jsonify({"error": "Missing required fields"}), 400

    # Simple BMI Calculation
    bmi = round(float(weight) / (float(height) ** 2), 2)

    return jsonify({"bmi": bmi, "message": "Prediction successful!"})

if __name__ == "__main__":
    app.run(debug=True)
