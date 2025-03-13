import React, { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    activityLevel: "moderate", // Added activity level state
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(""); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Moderation function to validate inputs before submission
  const moderate = () => {
    const { age, weight, height, activityLevel } = formData;
    
    // Simple validation check for required fields
    if (!age || !weight || !height) {
      setError("Please fill in all the fields!");
      return false;
    }

    if (isNaN(age) || isNaN(weight) || isNaN(height)) {
      setError("Please enter valid numbers for age, weight, and height!");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    // Validate before submitting
    if (!moderate()) {
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
        headers: { "Content-Type": "application/json" }
      });
      setResult(response.data);
    } catch (err) {
      setError("Error connecting to the server.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Health Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="age"
          placeholder="Age"
          onChange={handleChange}
        />
        <input
          type="text"
          name="weight"
          placeholder="Weight (kg)"
          onChange={handleChange}
        />
        <input
          type="text"
          name="height"
          placeholder="Height (m)"
          onChange={handleChange}
        />
        
        {/* Activity Level Dropdown */}
        <div>
          <label>Activity Level:</label>
          <select
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
          >
            <option value="sedentary">Sedentary</option>
            <option value="moderate">Moderate</option>
            <option value="active">Active</option>
          </select>
        </div>

        <button type="submit">Calculate BMI</button>
      </form>

      {result && <h3>BMI: {result.bmi}</h3>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
