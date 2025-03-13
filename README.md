const handleSubmit = async (e) => {
  e.preventDefault();

  // Check for missing fields
  if (!formData.age || !formData.weight || !formData.height) {
    setError("Please fill in all fields.");
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
