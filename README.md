@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400

    age = data.get("age")
    weight = data.get("weight")
    height = data.get("height")
    activity_level = data.get("activityLevel", "moderate")

    if not age or not weight or not height:
        return jsonify({"error": "Missing required fields"}), 400

    # Simple BMI Calculation
    bmi = round(float(weight) / (float(height) ** 2), 2)

    # Optionally use activity level to give recommendations
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
