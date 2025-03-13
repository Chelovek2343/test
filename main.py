from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all domains (you can restrict it to specific origins later)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json  # Get data sent in JSON format

    # Check if all fields are provided
    if not data or not data.get("age") or not data.get("weight") or not data.get("height"):
        return jsonify({"error": "Missing required fields"}), 400

    # Get data from the request
    age = float(data.get("age"))
    weight = float(data.get("weight"))
    height = float(data.get("height"))
    activity_level = data.get("activityLevel", "moderate")

    # Simple BMI Calculation
    bmi = round(weight / (height ** 2), 2)

    # Provide activity-level-based suggestions
    if activity_level == "sedentary":
        activity_message = "Consider adding light physical activity to your routine."
    elif activity_level == "moderate":
        activity_message = "Great! Keep up the moderate activity."
    else:
        activity_message = "You're active! Keep challenging yourself."

    return jsonify({
        "bmi": bmi,
        "activityMessage": activity_message,
        "message": "Prediction successful!"
    })

if __name__ == "__main__":
    app.run(debug=True)
