import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    age: "",
    height: "",
    weight: "",
    gender: "",
    level: "",
    purpose: "",
    equipment: "None",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    setResults([]);

    // Simple validation
    const newErrors = {};
    if (!formData.age) newErrors.age = "Age is required";
    if (!formData.height) newErrors.height = "Height is required";
    if (!formData.weight) newErrors.weight = "Weight is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.level) newErrors.level = "Level is required";
    if (!formData.purpose) newErrors.purpose = "Purpose is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    // Call backend API
    try {
      const response = await fetch("http://127.0.0.1:8000/recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", response.status);

      const data = await response.json();
      console.log("API response:", data); // Check backend response

      if (data.exercises) {
        setResults(data.exercises);
      } else {
        alert("No exercises found for the given input.");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching exercises. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Workout Recommendation</h1>
      <form onSubmit={handleSubmit} className="workout-form">
        {/* Age */}
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Enter your age"
        />
        {errors.age && <span className="error">{errors.age}</span>}

        {/* Height */}
        <label>Height (cm):</label>
        <input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleChange}
          placeholder="Enter your height"
        />
        {errors.height && <span className="error">{errors.height}</span>}

        {/* Weight */}
        <label>Weight (kg):</label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          placeholder="Enter your weight"
        />
        {errors.weight && <span className="error">{errors.weight}</span>}

        {/* Gender */}
        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && <span className="error">{errors.gender}</span>}

        {/* Level */}
        <label>Workout Level:</label>
        <select name="level" value={formData.level} onChange={handleChange}>
          <option value="">Select Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        {errors.level && <span className="error">{errors.level}</span>}

        {/* Purpose */}
        <label>Purpose / Goal:</label>
        <select name="purpose" value={formData.purpose} onChange={handleChange}>
          <option value="">Select Purpose</option>
          <option value="Weight Loss">Weight Loss</option>
          <option value="Weight Gain">Weight Gain</option>
          <option value="Core Strength">Core Strength</option>
          <option value="Flexibility / Mobility">Flexibility / Mobility</option>
          <option value="Muscle Toning">Muscle Toning</option>
          <option value="Endurance / Stamina">Endurance / Stamina</option>
          <option value="Posture / Back Strength">Posture / Back Strength</option>
          <option value="Overall Health / Fitness">Overall Health / Fitness</option>
        </select>
        {errors.purpose && <span className="error">{errors.purpose}</span>}

        {/* Equipment */}
        <label>Equipment:</label>
        <select name="equipment" value={formData.equipment} onChange={handleChange}>
          <option value="None">None</option>
          <option value="Dumbbell">Dumbbell</option>
          <option value="Kettlebell">Kettlebell</option>
          <option value="Resistance Band">Resistance Band</option>
          <option value="Yoga Mat">Yoga Mat</option>
          <option value="Medicine Ball">Medicine Ball</option>
          <option value="Pull-up Bar">Pull-up Bar</option>
        </select>

        {/* Buttons */}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? <span className="spinner"></span> : "Get My Exercises"}
        </button>
        <button
          type="button"
          className="reset-btn"
          onClick={() => {
            setFormData({
              age: "",
              height: "",
              weight: "",
              gender: "",
              level: "",
              purpose: "",
              equipment: "None",
            });
            setErrors({});
            setResults([]);
          }}
        >
          Reset
        </button>
      </form>

      {/* Results */}
      <div className="results-container">
        {results.map((ex, idx) => (
          <div key={idx} className="exercise-card">
            <h3>{ex.name}</h3>
            <p><strong>Type:</strong> {ex.type}</p>
            {ex.equipment_needed && <p><strong>Equipment:</strong> {ex.equipment_needed}</p>}
            {/* Conditionally show reps if it exists */}
            {ex.reps && <p><strong>Reps/Duration:</strong> {ex.reps}</p>}
            <p>{ex.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
