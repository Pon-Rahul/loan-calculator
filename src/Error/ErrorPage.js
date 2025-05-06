import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = ({ darkMode }) => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className={`error-container ${darkMode ? 'dark-mode' : ''}`}>
      <h1 className="error-heading">Something went wrong</h1>
      <button className="error-button" onClick={goHome}>
        Go Home
      </button>
    </div>
  );
};

export default ErrorPage;
