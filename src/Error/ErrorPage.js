import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Something went wrong</h1>
      <button style={styles.button} onClick={goHome}>
        Go Home
      </button>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    backgroundColor: '#fff',
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#6c63ff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default ErrorPage;
