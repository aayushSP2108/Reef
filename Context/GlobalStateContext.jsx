import React, { createContext, useContext, useState, useEffect } from 'react';

// Global Context for user data and login status
export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);  // Store user data here
  const [isLogin, setIsLogin] = useState(false);  // Login status

  return (
    <GlobalStateContext.Provider value={{ userData, setUserData, isLogin, setIsLogin }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to use global context
export const useGlobalState = () => useContext(GlobalStateContext);