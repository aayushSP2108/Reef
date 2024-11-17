import React, { createContext, useContext, useState, useEffect } from 'react';
import { colors } from '../styles/colors';
import { colors } from '../styles/colors';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check localStorage for the theme preference or default to dark mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem('isDarkMode');
    return storedTheme !== null ? JSON.parse(storedTheme) : true; // default to true (dark mode)
  });

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
    // Update localStorage whenever isDarkMode changes
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const theme = isDarkMode ? colors : colors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
