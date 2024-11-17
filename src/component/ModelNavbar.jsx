import React, { useContext, useState } from 'react';
import { FaBars, FaTimes, FaShoppingBasket, FaUserCircle, FaShoppingCart, FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
// import { useTheme } from '../context/ThemeContext';
import { colors } from '../styles/colors';
import { FiSearch } from 'react-icons/fi';
import { GlobalStateContext } from '../../Context/GlobalStateContext';


export default function ModelNavbar({ searchQuery, setSearchQuery }) {
    const { userData, isLogin } = useContext(GlobalStateContext);

    const Logout = async () => {
        // await localStorage.removeItem("token");
        await localStorage.setItem("token", "token expired");
    };

    return (
        <nav
            style={{ zIndex: 9999, backgroundColor: colors.mainBackgroundColor, borderBottomWidth: 1, borderColor: colors.borderMainColor }}
            className=" shadow-custom fixed top-0 left-0 w-full z-10"
        >
            <div className=" flex justify-between items-center p-4">
                <div className=' flex items-center'>
                    <div className='text-[#11023b] font-bold pr-7' style={{ borderRightWidth: 1, borderColor: colors.borderMainColor }}>
                        <a href="#">REEFS Lab</a>
                    </div>

                    <div className="ml-7 hidden md:block relative" style={{ width: '50vw' }}>
                        <input
                            type="text"
                            placeholder="Search by Tags..." //components, wireframes, elements and illustrations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className=" border rounded-lg pl-10 pr-4 py-2 placeholder:font-light focus:outline-none focus:shadow-md"
                            style={{ height: '38px', width: '100%' }}
                        // onFocus={c}
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <FiSearch color={colors.iconColor} size={21} />
                        </span>
                    </div>
                </div>
                <div className=' flex items-center gap-2'>
                    {isLogin ? (
                        <>
                        <div className={`px-3 flex items-center rounded-lg justify-center hover:bg-[#ECEFF3]`} style={{ height: '36px' }}>
                        Hello and welcome, {userData?.name || 'Loading...'}
                        </div>
                            {/* <div onClick={Logout} className='box px-4 flex items-center rounded-lg justify-center border-[1px]' style={{ height: '38px', borderColor: colors.borderBoxColor }}>
                                Log out
                            </div> */}
                            </>
                    ) : (
                        <>
                            <div className={`px-3 flex items-center rounded-lg justify-center hover:bg-[#ECEFF3]`} style={{ height: '36px' }}>
                                <Link to="/login">Log in</Link>
                            </div>
                            <div className='box px-4 flex items-center rounded-lg justify-center border-[1px]' style={{ height: '38px', borderColor: colors.borderBoxColor }}>
                                <Link to="/signin">Sign up</Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
