from flask import Flask, request, jsonify
from flask_cors import CORS
import math

app = Flask(__name__)
CORS(app)  # Allow requests from frontend

def calculate_bmi(weight, height):
    return round(weight / (height ** 2), 2)

def get_health_tips(bmi, activity_level):
    if bmi < 18.5:
        return "Underweight: Increase your calorie intake with healthy foods."
    elif 18.5 <= bmi < 24.9:
        return "Normal weight: Maintain a balanced diet and regular exercise."
    elif 25 <= bmi < 29.9:
        return "Overweight: Consider adjusting your diet and increasing activity."
    else:
        return "Obese: Consult a healthcare provider for personalized advice."

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        weight = float(data.get('weight'))
        height = float(data.get('height'))
        activity_level = data.get('activity', 'moderate')

        if weight <= 0 or height <= 0:
            return jsonify({'error': 'Invalid weight or height'}), 400

        bmi = calculate_bmi(weight, height)
        recommendation = get_health_tips(bmi, activity_level)

        return jsonify({'bmi': bmi, 'recommendation': recommendation})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
