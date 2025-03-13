import React, { useState } from "react";
import Chart from "chart.js/auto";

const App = () => {
    const [formData, setFormData] = useState({ weight: "", height: "", activity: "moderate" });
    const [bmiData, setBmiData] = useState(null);
    const [error, setError] = useState("");
    const [chartInstance, setChartInstance] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const fetchData = async () => {
        setError("");
        try {
            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                setBmiData(data);
                updateChart(data.bmi);
            } else {
                setError(data.error || "Something went wrong.");
            }
        } catch (error) {
            setError("Server error. Please try again.");
        }
    };

    const updateChart = (bmi) => {
        if (chartInstance) {
            chartInstance.destroy();
        }

        const ctx = document.getElementById("bmiChart").getContext("2d");
        const newChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Your BMI"],
                datasets: [{ label: "BMI Value", data: [bmi], backgroundColor: "blue" }],
            },
        });

        setChartInstance(newChart);
    };

    return (
        <div className="container">
            <h1>Health Dashboard</h1>
            <input type="number" name="weight" placeholder="Weight (kg)" value={formData.weight} onChange={handleChange} />
            <input type="number" name="height" placeholder="Height (m)" value={formData.height} onChange={handleChange} />
            <select name="activity" value={formData.activity} onChange={handleChange}>
                <option value="sedentary">Sedentary</option>
                <option value="moderate">Moderate</option>
                <option value="active">Active</option>
            </select>
            <button onClick={fetchData}>Calculate BMI</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {bmiData && (
                <div>
                    <h2>Your BMI: {bmiData.bmi}</h2>
                    <p>{bmiData.recommendation}</p>
                    <canvas id="bmiChart"></canvas>
                </div>
            )}
        </div>
    );
};

export default App;
