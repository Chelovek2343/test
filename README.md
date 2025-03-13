const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setResult(null);

  try {
    const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    setResult(response.data);
  } catch (err) {
    setError("Error connecting to the server.");
  }
};
