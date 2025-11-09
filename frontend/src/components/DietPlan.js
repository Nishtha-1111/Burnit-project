import React from 'react';

const DietPlan = ({ dietPlan }) => {
  if (!dietPlan) return null;

  return (
    <div className="diet-plan-container">
      <div className="plan-header">
        <h2>Your Personalized Diet Plan</h2>
        <p>Tailored specifically for your goals and preferences</p>
      </div>

      <div className="nutrition-facts">
        <div className="nutrition-card">
          <h4>Daily Calories</h4>
          <div className="value">{dietPlan.calories}</div>
          <small>kcal</small>
        </div>
        <div className="nutrition-card">
          <h4>Protein</h4>
          <div className="value">{dietPlan.protein}g</div>
          <small>per day</small>
        </div>
        <div className="nutrition-card">
          <h4>Carbs</h4>
          <div className="value">{dietPlan.carbs}g</div>
          <small>per day</small>
        </div>
        <div className="nutrition-card">
          <h4>Fats</h4>
          <div className="value">{dietPlan.fats}g</div>
          <small>per day</small>
        </div>
      </div>

      <div className="meals-grid">
        <div className="meal-card">
          <h3>🍳 Breakfast</h3>
          <p>{dietPlan.breakfast}</p>
        </div>

        <div className="meal-card">
          <h3>🍽️ Lunch</h3>
          <p>{dietPlan.lunch}</p>
        </div>

        <div className="meal-card">
          <h3>🍲 Dinner</h3>
          <p>{dietPlan.dinner}</p>
        </div>

        <div className="meal-card">
          <h3>🥗 Snacks</h3>
          <p>{dietPlan.snacks}</p>
        </div>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', background: 'var(--lavender)', borderRadius: '12px' }}>
        <h4 style={{ marginBottom: '10px' }}>💡 Tips for Success</h4>
        <ul style={{ lineHeight: '1.6', color: '#666' }}>
          <li>Stay hydrated - drink at least 8 glasses of water daily</li>
          <li>Combine this diet with regular exercise for best results</li>
          <li>Listen to your body and adjust portion sizes as needed</li>
          <li>Maintain consistent meal timing</li>
        </ul>
      </div>
    </div>
  );
};

export default DietPlan;