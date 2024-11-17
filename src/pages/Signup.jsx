import React, { useState } from 'react';
import { colors } from '../styles/colors';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { API_BASE_URL, REGISTER_ENDPOINT } from '../../Constants/Constants';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const Signup = () => {
    const [userName, setUserName] = useState('');
    const [contactinfo, setContactinfo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const passwordCriteria = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordCriteria.test(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validatePassword(password)) {
            setError('Password must be at least 8 characters long and include at least one letter, one number, and one special character.');
            toast.error("Password does not meet the criteria.");
        } else {
            setError('');

            if (!contactinfo) {
                toast.error("Contact info is required.");
                return;
            }

            const userData = {
                name: userName,
                contactinfo: String(contactinfo),
                password: password,
            };

            console.log("User Data:", userData);

            fetch(`${API_BASE_URL}:${REGISTER_ENDPOINT}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === "ok") {
                        toast.success("Register Successful");
                        navigate('/login');
                    } else {
                        toast.error(data.data);
                    }
                })
                .catch(error => {
                    toast.error("An error occurred. Please try again.");
                    console.log("Error:", error);
                });
        }
    };

    return (
        <div style={{ minHeight: `${window.innerHeight - 134}px`, overflow: 'hidden' }} className="flex items-center justify-center bg-gray-100">
            <div className="border-[1px] box bg-white p-8 rounded-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            required
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:shadow-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            required
                            value={contactinfo}
                            onChange={(e) => setContactinfo(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:shadow-md"
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:shadow-md"
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
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>
                    <button
                        style={{ backgroundColor: colors.differentColor }}
                        type="submit"
                        className="w-full text-white py-2 rounded-md transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>

            {/* Toast container */}
            <ToastContainer 
            position="top-left"
            autoClose={3000}
            // hideProgressBar={true} // Hide the progress bar for simplicity
            draggable 
            pauseOnHover  />
        </div>
    );
};

export default Signup;
