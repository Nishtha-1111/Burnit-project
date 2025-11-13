import React, { useState, useEffect } from 'react';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      setCurrentPage('dashboard');
    }
  }, [token]);

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setCurrentPage('login');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'signup':
        return <Signup onSwitchToLogin={() => setCurrentPage('login')} />;
      case 'dashboard':
        return <Dashboard token={token} onLogout={handleLogout} />;
      default:
        return <Login onLogin={handleLogin} onSwitchToSignup={() => setCurrentPage('signup')} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;