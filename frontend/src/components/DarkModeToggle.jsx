import { useState, useEffect } from 'react';
import '../styles/DarkModeToggle.css';

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode') === 'true';
    setDarkMode(saved);
    if (saved) {
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <button 
      className="dark-mode-toggle" 
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
}

export default DarkModeToggle;
