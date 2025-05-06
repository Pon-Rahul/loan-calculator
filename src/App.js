import React, { useState } from 'react';
import './App.css';
import Header from './header/Header';
import AllRoutes from './Routes/Route';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'app dark-mode' : 'app'}>
      <Header onToggleTheme={toggleDarkMode} />
      <AllRoutes darkMode={darkMode} />
    </div>
  );
}

export default App;
