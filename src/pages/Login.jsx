import React, { useEffect, useState } from 'react';
import { colors } from '../styles/colors';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { API_BASE_URL, LOGIN_ENDPOINT } from '../../Constants/Constants';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { useGlobalState } from '../../Context/GlobalStateContext';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [contactinfo, setContactinfo] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Use useNavigate hook

    const { userData, setUserData, setIsLogin } = useGlobalState();
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page refresh on form submission
        const userData = {
            contactinfo: contactinfo,
            password: password,
        };

        fetch(`${API_BASE_URL}:${LOGIN_ENDPOINT}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === "ok") {
                    toast.success("Logged In Successfully");
                    localStorage.setItem('token', data.data);
                    localStorage.setItem('isLoggedIn', JSON.stringify(true));

                    setIsLogin(true);

                    navigate('/'); // Navigate to homepage
                } else {
                    toast.error(data.data || "Login failed");
                }
            })
            .catch(error => {
                toast.error("An error occurred, please try again.");
                console.log("err", error);
            });
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
                
                return;
            }

            setUserData(data.data); // Update global user data state
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getData();
      }, [userData]);

    return (
        <div style={{ minHeight: `${window.innerHeight - 134}px`, overflow: 'hidden' }} className="flex items-center justify-center bg-gray-100">
            <div className="box bg-white p-8 rounded-lg border-[1px] w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            value={contactinfo}
                            onChange={(e) => setContactinfo(e.target.value)}
                            type="email"
                            required
                            className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:shadow-md"
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:shadow-md"
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 top-[23px] flex items-center pr-3 cursor-pointer"
                        >
                            {showPassword ? (
                                <FaEye size={20} />
                            ) : (
                                <FaEyeSlash size={20} />
                            )}
                        </span>
                    </div>
                    <button
                        style={{ backgroundColor: colors.differentColor }}
                        type="submit"
                        className="w-full text-white py-2 rounded-md transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Don't have an account? <Link to="/signin">Sign up</Link>
                </p>
            </div>

            {/* Toast container */}
            <ToastContainer
                position="top-left"   // Change position as needed
                autoClose={3000}      // Toast auto-close time
                // hideProgressBar={true} // Hide the progress bar for simplicity
                closeOnClick
                pauseOnHover
                draggable
            />
        </div>
    );
};

export default Login;
