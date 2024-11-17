import React, { useState, useEffect, useContext } from 'react';
import { GlobalStateContext } from '../../Context/GlobalStateContext';
import ModelList from './ModelList';

export default function YourModels() {
    const { userData, isLogin } = useContext(GlobalStateContext);
    const [allModels, setAllModels] = useState([]);
    const [userModels, setUserModels] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Assuming the JWT token is stored in localStorage
    const token = localStorage.getItem('token');

    // Function to fetch models of the specific user
    const fetchUserModels = async () => {
        console.log(token)
        if (!token) {
            setError("No authentication token found");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5001/getusermodels', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            const data = await response.json();

            if (response.ok) {
                setUserModels(data.data);
            } else {
                setError("Error fetching user models: " + data.message);
            }
        } catch (err) {
            setError("Error fetching user models");
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (token) {
            fetchUserModels(); // Fetch user's models if a token exists
        }
    }, [token]);


    return (
        <div className={`grid grid-cols-1 gap-4 p-4`}>
        {/* <div > */} 
            {token && (
            <>
                    {userModels.map((model, index) => (
                        <ModelList model={model} />
                    ))}
            </>
        )}</div>
    )
}
