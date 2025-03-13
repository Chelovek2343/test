import React, { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    activityLevel: "moderate", // Default activity level
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation function to check inputs
  const moderate = () => {
    const { age, weight, height } = formData;
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setResult(null); // Reset result

    // Validate form data before sending to backend
    if (!moderate()) {
      return;
    }

    try {
      // Send POST request to Flask API with form data
      const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
        headers: { "Content-Type": "application/json" }
      });
      setResult(response.data); // Set response data in state
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

      {/* Display Results */}
      {result && (
        <div>
          <h3>BMI: {result.bmi}</h3>
          <p>{result.activityMessage}</p>
        </div>
      )}
      
      {/* Display Errors */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
