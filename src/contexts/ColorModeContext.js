import { createContext, useContext, useState, useEffect } from 'react';

const ColorModeContext = createContext();

export const useColorMode = () => {
  return useContext(ColorModeContext);
};

export const ColorModeProvider = ({ children }) => {
  const [colorMode, setColorMode] = useState('light');

  // Set color mode from localStorage or default to 'light'
  useEffect(() => {
    const storedMode = localStorage.getItem('color-mode') || 'light';
    setColorMode(storedMode);
    document.body.classList.add(storedMode === 'dark' ? 'active-dark-mode' : 'active-light-mode');
  }, []);

  // Toggle between light and dark mode
  const toggleColorMode = () => {
    console.log(colorMode)
    const newMode = colorMode === 'light' ? 'dark' : 'light';
    setColorMode(newMode);
    localStorage.setItem('color-mode', newMode);
    document.body.classList.toggle('active-light-mode', newMode === 'light');
    document.body.classList.toggle('active-dark-mode', newMode === 'dark');
  };

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};
