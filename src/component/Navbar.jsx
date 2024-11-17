import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // You can use `useNavigate` for navigation
import { colors } from '../styles/colors';
import { GlobalStateContext } from '../../Context/GlobalStateContext';

const Navbar = () => {
    const { userData, setUserData, isLogin, setIsLogin } = useContext(GlobalStateContext);
    const navigate = useNavigate();

    // Logout function to remove token, update global state, and navigate to the homepage
    const Logout = async () => {
        // Clear token and login status from localStorage
        await localStorage.removeItem("token");
        await localStorage.setItem("isLoggedIn", JSON.stringify(false));

        // Update global state
        setUserData(null);   // Clear user data from the global state
        setIsLogin(false);   // Update login status to false

        // Navigate to the homepage or login page
        navigate("/");       // Redirect to the homepage (or login page)
    };

    // const check = async () => {
    //     const token = await localStorage.getItem("token");
    //     if (token) {
    //         setIsLogin(true); // Set user as logged in if token exists
    //     } else {
    //         setIsLogin(false); // Otherwise, set login status to false
    //     }
    // };

    // useEffect(() => {
    //     check();
    // }, []);

    return (
        <nav
            style={{
                zIndex: 999,
                backgroundColor: colors.mainBackgroundColor,
                borderBottomWidth: 1,
                borderColor: colors.borderMainColor,
            }}
            className="shadow-custom fixed top-0 left-0 w-full z-10"
        >
            <div className="flex justify-between items-center p-4">
                <div className="flex items-center">
                    <div
                        className="font-bold pr-7"
                        style={{
                            color: colors.titleTextColor,
                            borderRightWidth: 1,
                            borderColor: colors.borderMainColor,
                        }}
                    >
                        <Link to="/">REEFS Lab</Link>
                    </div>
                </div>

                <div className="hidden md:flex space-x-8 text-[#262556]">
                    <Link to="/overview">Overview</Link>
                    {/* <Link to="/pricing" >About</Link> */}
                    <Link to="/Models">Explore</Link>
                    <Link to="/contribute">Contribute</Link>
                    <Link to="/contact">Contact Us</Link>
                </div>

                <div className="flex items-center gap-2">
                    {isLogin ? (
                        <>
                            <div
                                onClick={Logout}
                                className="box cursor-pointer px-4 flex items-center rounded-lg justify-center border-[1px]"
                                style={{ height: '38px', borderColor: colors.borderBoxColor }}
                            >
                                Log out
                            </div>
                        </>
                    ) : (
                        <>
                            <div
                                className="px-3 flex items-center rounded-lg justify-center hover:bg-[#ECEFF3]"
                                style={{ height: '36px' }}
                            >
                                <Link to="/login">Log in</Link>
                            </div>
                            <div
                                className="box px-4 flex items-center rounded-lg justify-center border-[1px]"
                                style={{ height: '38px', borderColor: colors.borderBoxColor }}
                            >
                                <Link to="/signin">Sign up</Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
