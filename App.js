import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activity, setActivity] = useState('moderate');
  const [result, setResult] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = { age, weight, height, activity };

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', userData);
      setResult(response.data);
    } catch (error) {
      console.error("There was an error with the API request!", error);
    }
  };

  return (
    <div className="App">
      <h1>Personalized Health Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <label>Age: </label>
        <input 
          type="number" 
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
        />
        <br />
        
        <label>Weight (kg): </label>
        <input 
          type="number" 
          value={weight} 
          onChange={(e) => setWeight(e.target.value)} 
        />
        <br />
        
        <label>Height (m): </label>
        <input 
          type="number" 
          step="0.01" 
          value={height} 
          onChange={(e) => setHeight(e.target.value)} 
        />
        <br />
        
        <label>Activity Level: </label>
        <select 
          value={activity} 
          onChange={(e) => setActivity(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="active">Active</option>
        </select>
        <br />

        <button type="submit">Submit</button>
      </form>

      {result && (
        <div>
          <h2>Results:</h2>
          <p>BMI: {result.bmi}</p>
          <p>Risk Score: {result.risk_score}</p>
          <p>Risk Category: {result.risk_category}</p>
        </div>
      )}
    </div>
  );
}

export default App;
