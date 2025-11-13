import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <h1>🍎 Diet-Recommender</h1>
      <p>Get your personalized diet plan powered by Machine Learning</p>
      <div style={{ 
        marginTop: '20px', 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '10px',
        flexWrap: 'wrap'
      }}>
        <span style={{ 
          background: 'var(--mint)', 
          padding: '8px 16px', 
          borderRadius: '20px',
          fontSize: '0.9rem'
        }}>Personalized</span>
        <span style={{ 
          background: 'var(--peach)', 
          padding: '8px 16px', 
          borderRadius: '20px',
          fontSize: '0.9rem'
        }}>ML-Powered</span>
        <span style={{ 
          background: 'var(--baby-blue)', 
          padding: '8px 16px', 
          borderRadius: '20px',
          fontSize: '0.9rem'
        }}>Healthy</span>
      </div>
    </header>
  );
};

export default Header;