import React, { useState, useEffect } from 'react';

const Dashboard = ({ token, onLogout }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeModal, setActiveModal] = useState(null);
  const [recommendationData, setRecommendationData] = useState(null);
  const [recommendationLoading, setRecommendationLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log('Fetching profile with token:', token ? 'Token exists' : 'No token');
        const response = await fetch('http://localhost:8000/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log('Profile response status:', response.status);

        if (response.ok) {
          const data = await response.json();
          console.log('User data received:', data);
          setUserData(data);
        } else {
          const errorText = await response.text();
          console.error('Profile fetch failed:', errorText);
          setError('Failed to fetch profile data');
        }
      } catch (err) {
        console.error('Network error:', err);
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const fetchRecommendation = async (type) => {
    console.log(`Fetching ${type} recommendation`);
    setRecommendationLoading(true);
    setActiveModal(type);
    
    try {
      const endpoint = type === 'diet' 
        ? 'http://localhost:8000/diet-recommendation'
        : 'http://localhost:8000/workout-recommendation';

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log(`${type} recommendation response:`, response.status);

      if (response.ok) {
        const data = await response.json();
        setRecommendationData(data);
      } else {
        const errorText = await response.text();
        console.error(`${type} recommendation failed:`, errorText);
        setError(`Failed to fetch ${type} recommendation`);
        setActiveModal(null);
      }
    } catch (err) {
      console.error('Network error:', err);
      setError('Network error. Please try again.');
      setActiveModal(null);
    } finally {
      setRecommendationLoading(false);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setRecommendationData(null);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="dashboard">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  const renderRecommendationModal = () => {
    if (!activeModal) return null;

    const title = activeModal === 'diet' ? 'Diet Recommendation' : 'Workout Recommendation';
    
    return (
      <div className="recommendation-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h3>{title}</h3>
            <button className="close-btn" onClick={closeModal}>×</button>
          </div>
          
          {recommendationLoading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Generating your personalized recommendation...</p>
            </div>
          ) : recommendationData ? (
            <div>
              <div className="recommendation-item">
                <h4>Personalized for You</h4>
                <p>Based on your profile data</p>
              </div>
              
              {activeModal === 'diet' ? (
                <div>
                  <div className="recommendation-item">
                    <h4>🍳 Breakfast</h4>
                    <p>{recommendationData.placeholder_recommendation.breakfast}</p>
                  </div>
                  <div className="recommendation-item">
                    <h4>🍽️ Lunch</h4>
                    <p>{recommendationData.placeholder_recommendation.lunch}</p>
                  </div>
                  <div className="recommendation-item">
                    <h4>🍴 Dinner</h4>
                    <p>{recommendationData.placeholder_recommendation.dinner}</p>
                  </div>
                  <div className="recommendation-item">
                    <h4>🔥 Daily Calories</h4>
                    <p>{recommendationData.placeholder_recommendation.calories}</p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="recommendation-item">
                    <h4>📅 Monday</h4>
                    <p>{recommendationData.placeholder_recommendation.monday}</p>
                  </div>
                  <div className="recommendation-item">
                    <h4>📅 Tuesday</h4>
                    <p>{recommendationData.placeholder_recommendation.tuesday}</p>
                  </div>
                  <div className="recommendation-item">
                    <h4>📅 Wednesday</h4>
                    <p>{recommendationData.placeholder_recommendation.wednesday}</p>
                  </div>
                  <div className="recommendation-item">
                    <h4>📅 Thursday</h4>
                    <p>{recommendationData.placeholder_recommendation.thursday}</p>
                  </div>
                  <div className="recommendation-item">
                    <h4>📅 Friday</h4>
                    <p>{recommendationData.placeholder_recommendation.friday}</p>
                  </div>
                  <div className="recommendation-item">
                    <h4>📅 Saturday</h4>
                    <p>{recommendationData.placeholder_recommendation.saturday}</p>
                  </div>
                  <div className="recommendation-item">
                    <h4>📅 Sunday</h4>
                    <p>{recommendationData.placeholder_recommendation.sunday}</p>
                  </div>
                </div>
              )}
              
              <div className="recommendation-item">
                <p><em>Note: This is a sample recommendation. Full personalized plans coming in Phase 2!</em></p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="dashboard">
        <h1>Welcome to Your Dashboard, {userData?.full_name || 'User'}!</h1>
        
        {error && (
          <div className="error-message">
            {error}
            <br />
            <small>Check console for details</small>
          </div>
        )}
        
        {userData && (
          <>
            <div className="user-info">
              <div className="info-item">
                <span className="info-label">Name:</span>
                <span className="info-value">{userData.full_name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">{userData.email}</span>
              </div>
              {userData.phone && (
                <div className="info-item">
                  <span className="info-label">Phone:</span>
                  <span className="info-value">{userData.phone}</span>
                </div>
              )}
              {userData.gender && (
                <div className="info-item">
                  <span className="info-label">Gender:</span>
                  <span className="info-value">{userData.gender}</span>
                </div>
              )}
              {userData.age && (
                <div className="info-item">
                  <span className="info-label">Age:</span>
                  <span className="info-value">{userData.age} years</span>
                </div>
              )}
              {userData.height && (
                <div className="info-item">
                  <span className="info-label">Height:</span>
                  <span className="info-value">{userData.height} cm</span>
                </div>
              )}
              {userData.weight && (
                <div className="info-item">
                  <span className="info-label">Weight:</span>
                  <span className="info-value">{userData.weight} kg</span>
                </div>
              )}
            </div>
            
            {/* Feature Buttons - SIMPLIFIED VERSION */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '20px', 
              margin: '2rem 0',
              padding: '0 10px'
            }}>
              <button 
                style={{
                  padding: '20px',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, #a3e4d7 0%, #48c9b0 100%)',
                  color: 'white',
                  minHeight: '100px'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
                onClick={() => fetchRecommendation('diet')}
              >
                <div style={{ fontSize: '1.8rem' }}>🥗</div>
                <div>Get Diet Recommendation</div>
                <div style={{ fontSize: '0.8rem', opacity: '0.9' }}>Personalized meal plans</div>
              </button>
              
              <button 
                style={{
                  padding: '20px',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, #f8c8c8 0%, #f1948a 100%)',
                  color: 'white',
                  minHeight: '100px'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
                onClick={() => fetchRecommendation('workout')}
              >
                <div style={{ fontSize: '1.8rem' }}>💪</div>
                <div>Get Workout Plan</div>
                <div style={{ fontSize: '0.8rem', opacity: '0.9' }}>Custom exercise routines</div>
              </button>
            </div>
          </>
        )}
        
        <button 
          style={{
            background: 'linear-gradient(135deg, #fc8181 0%, #e53e3e 100%)',
            color: 'white',
            border: 'none',
            padding: '12px 30px',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: '1rem',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 5px 15px rgba(229, 62, 62, 0.3)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
      
      {renderRecommendationModal()}
    </div>
  );
};

export default Dashboard;