import React, { useState } from 'react';
import Header from './components/Header';
import UserForm from './components/UserForm';
import DietPlan from './components/DietPlan';
import { dietAPI } from './services/api';
import './styles/App.css';

function App() {
  const [dietPlan, setDietPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await dietAPI.recommendDiet(userData);
      setDietPlan(response);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate diet plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Header />
      
      <UserForm onSubmit={handleFormSubmit} loading={loading} />
      
      {loading && (
        <div className="loading">
          ⏳ Generating your personalized diet plan...
        </div>
      )}
      
      {error && (
        <div className="error">
          ❌ {error}
        </div>
      )}
      
      {dietPlan && <DietPlan dietPlan={dietPlan} />}
    </div>
  );
}

export default App;