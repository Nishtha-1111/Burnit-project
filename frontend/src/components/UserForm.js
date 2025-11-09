import React, { useState } from 'react';

const UserForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    gender: 'male',
    activity_level: 'moderate',
    fitness_goal: 'weight_loss',
    diet_preference: 'Vegetarian'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <h2>Personal Information</h2>
      <p style={{ marginBottom: '30px', color: '#666' }}>
        Provide your details to get a personalized diet plan
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="form-input"
              required
              min="1"
              max="120"
              placeholder="Age in years"
            />
          </div>

          <div className="form-group">
            <label htmlFor="weight">Weight (kg)</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="form-input"
              required
              min="1"
              step="0.1"
              placeholder="Weight in kg"
            />
          </div>

          <div className="form-group">
            <label htmlFor="height">Height (cm)</label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="form-input"
              required
              min="1"
              placeholder="Height in cm"
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="activity_level">Activity Level</label>
            <select
              id="activity_level"
              name="activity_level"
              value={formData.activity_level}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="sedentary">Sedentary (little or no exercise)</option>
              <option value="light">Light (exercise 1-3 times/week)</option>
              <option value="moderate">Moderate (exercise 3-5 times/week)</option>
              <option value="active">Active (exercise 6-7 times/week)</option>
              <option value="very_active">Very Active (physical job or intense exercise)</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="fitness_goal">Fitness Goal</label>
            <select
              id="fitness_goal"
              name="fitness_goal"
              value={formData.fitness_goal}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="weight_loss">Weight Loss</option>
              <option value="muscle_gain">Muscle Gain</option>
              <option value="maintenance">Maintenance</option>
              <option value="extreme_weight_loss">Extreme Weight Loss</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="diet_preference">Diet Preference</label>
            <select
              id="diet_preference"
              name="diet_preference"
              value={formData.diet_preference}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="Vegetarian">Vegetarian</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
              <option value="Vegan">Vegan</option>
            </select>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Generating Your Diet Plan...' : 'Generate Diet Plan'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;