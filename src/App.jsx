// npm run dev

import React, { useContext, useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { GlobalStateProvider, GlobalStateContext } from '../Context/GlobalStateContext';
import Models from './pages/Models';
import HomeScreen from './pages/HomeScreen';
import DetailsScreen from './pages/DetailsScreen';
import ViewPort from './pages/ViewPort';
import Footer from './component/Footer';
import Navbar from './component/Navbar';
import Contribute from './pages/Contribute';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { API_BASE_URL, USERSDATA_ENDPOINT } from '../Constants/Constants';
import { colors } from './styles/colors';
import Overview from './pages/Overview';
import Contact from './pages/Contact';

function App() {
  return (
    <GlobalStateProvider>
      <HashRouter>
        <Main />
      </HashRouter>
    </GlobalStateProvider>
  );
}

const Main = () => {
  const { userData, setUserData, isLogin, setIsLogin } = useContext(GlobalStateContext);

  // Fetch user data and check login status on mount
  useEffect(() => {
    getData();
    loginStatus();
  }, [isLogin, userData]); // Empty dependency array ensures this runs once after the initial render

  const loginStatus = async () => {
    const token = await localStorage.getItem("token");
    if (token) {
      setIsLogin(true); // Set user as logged in if token exists
    } else {
      setIsLogin(false); // Otherwise, set login status to false
    }
  }

  const getData = async () => {
    try {
      const token = await localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        setIsLogin(false)
        return;
      }


      const response = await fetch(`${API_BASE_URL}:${USERSDATA_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const data = await response.json();

      if (data.data === 'token expired') {
        alert(
          "Oops! Your Session Has Expired",
          "We’re sorry for the inconvenience. It looks like your session has expired due to inactivity or other reasons"
        );
        setIsLogin(false)
        return;
      }

      setUserData(data.data); // Update global user data state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div style={{ backgroundColor: colors.mainBackgroundColor, color: colors.mainTextColor, fontSize: 14 }}>
      <Navbar />
      <div style={{ marginTop: '70px', marginBottom: '70px' }} >
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signup />} />
        <Route path="/Models" element={<Models />} />
        <Route path="/ViewPort" element={<ViewPort />} />
        <Route path="/Models/:index" element={<DetailsScreen />} />
        <Route path="/contribute" element={<Contribute />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;