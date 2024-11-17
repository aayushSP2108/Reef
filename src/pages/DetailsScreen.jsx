// DetailsScreen.js
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AllModels from '../data/StoredModels.json';
import { GoDotFill } from 'react-icons/go';
import { LuDot } from 'react-icons/lu';
import { colors } from '../styles/colors';
import { FaRegEye } from 'react-icons/fa';
import Footer from '../component/Footer';
import { GlobalStateContext } from '../../Context/GlobalStateContext';
import { API_BASE_URL, GETMODEL_ENDPOINT } from '../../Constants/Constants';

export default function DetailsScreen() {
    const { index } = useParams();

    const navigate = useNavigate();
    const location = useLocation();

    const modelVia = location.state?.model;
    // console.log(modelVia)

    const { userData, isLogin } = useContext(GlobalStateContext);
    // const [allModels, setAllModels] = useState([]);

    const [model, setModel] = useState([]);
    const [userModels, setUserModels] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Assuming the JWT token is stored in localStorage
    const token = localStorage.getItem('token');
    const modelIndex = parseInt(index);

    if (!modelIndex) {
        return <div>Model not found or invalid index</div>;
    }

    // Function to fetch the model data
    const fetchModel = (e) => {
        e?.preventDefault(); // Prevent page refresh on form submission (if e exists)

        setLoading(true);  // Set loading state to true
        console.log('modelIndex', modelIndex); // For debugging, log the index

        // Send a POST request to the backend
        fetch(`${API_BASE_URL}:${GETMODEL_ENDPOINT}`, {  // Backend URL
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ index: modelIndex }),  // Send the model index
        })
            .then(response => response.json())  // Parse JSON response
            .then(data => {
                if (data.status === "ok") {
                    setModel(data.data); // Set the model data
                } else {
                    alert(data.data || "Failed to fetch model data");  // Show error message
                }
            })
            .catch(error => {
                alert("An error occurred, please try again.");  // Show error alert if the request fails
                console.error("Error:", error);  // Log the error for debugging
            })
            .finally(() => {
                setLoading(false); // Stop loading state after request completes
            });
    };

    useEffect(() => {
        if(modelVia){
            setModel(modelVia)
            console.log('modelVia')
        }else if (modelIndex) {
            fetchModel();
            console.log('fetchModel')
        }
    }, [modelIndex]);

    const navigateToViewPort = () => {
        navigate('/ViewPort');
    };

    if (!model) {
        return <div>Model not found</div>;
    }

    return (
        <div className='h-full'>
            <div className='h-full px-4 w-full'>
                <h1 style={{ color: colors.titleTextColor, fontWeight: 500, fontSize: 56 }}>{model?.title}</h1>
                <div className='h-full mt-4 w-[66%] flex'>
                    <div className='w-[83%]'>
                        <p>{model?.description}</p>
                    </div>
                    <button className='flex-1' onClick={navigateToViewPort}>
                        <div style={{ fontWeight: 500, backgroundColor: colors.differentColor, color: 'white', borderColor: colors.differentColorBorder }} className='flex items-center gap-2 p-2 justify-center border-[1px] rounded-lg'>Preview<FaRegEye size={21} /></div>
                    </button>
                </div>
                <div className='h-full w-full flex justify-between'>
                    <div className='h-full w-[66%] my-4 '>
                        <div className="box relative overflow-hidden w-full rounded-xl mb-2">
                            <img
                                style={{ backgroundColor: '#F6F6F6' }}
                                className="box relative z-0 h-[39vw] w-full object-cover rounded-xl"
                                src={model?.image}
                                alt={model?.name}
                            />
                        </div>
                        <div className=' rounded-xl w-full my-5'>
                            <div style={{ fontWeight: 500 }} className=' mb-2'>MODEL DESCRIPTION</div>
                            <div style={{ color: colors.subTextColor }}>{model?.largeDescription}</div>
                        </div>
                        <div className=' rounded-xl w-full my-5'>
                            <div style={{ fontWeight: 500 }} className=' mb-2 uppercase'>MODEL Contributors</div>
                            <div style={{ color: colors.subTextColor }}>{model?.contributors?.join(', ')}</div>
                        </div>
                        <div className=' mt-4 flex items-center gap-1'>
                            <h1 style={{ fontWeight: 500 }}>Component Tag</h1>
                            <LuDot color={colors.subTextColor} size={21} />
                            {model?.info?.tags.map((element, index) => (
                                <div style={{ color: colors.subTextColor, fontSize: 12 }} id={index} className=' capitalize px-3 py-1 rounded-full border-[1px]'>
                                    <h1>{element}</h1>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='h-full w-[30%] my-4'>
                        <div className=' rounded-xl w-full border-[1px] p-5 mb-5'>
                            <div style={{ fontWeight: 500 }} className='mb-3'>Model Overview</div>
                            <div className='flex justify-between pb-2'>
                                <span style={{ color: colors.subTextColor }} className=' text-left'>Author</span><span className='text-right'>{model?.info?.author}</span>
                            </div>
                            <div className='flex justify-between pb-2'>
                                <span style={{ color: colors.subTextColor }} className=' text-left'>License</span><span className='text-right'>{model?.info?.license}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span style={{ color: colors.subTextColor }} className=' text-left'>Release</span><span className='text-right'>{model?.info?.releaseDate}</span>
                            </div>
                        </div>

                        <div className='rounded-xl w-full border-[1px] p-5 mb-5'>
                            <div style={{ fontWeight: 500 }} className='mb-3'>Model Properties</div>
                            {[
                                // { label: 'Category', value: model.info.release },
                                { label: 'Geological Age', value: model?.info?.geologicalAge },
                                { label: 'Clastic Sedimentology', value: model?.info?.clasticSedimentology?.join(', ') },
                                { label: 'Carbonate & Evaporite', value: model?.info?.carbonateAndEvaporiteSedimentology?.join(', ') },
                                { label: 'Metamorphic', value: model?.info?.metamorphic?.join(', ') },
                                { label: 'Extrusive Igneous', value: model?.info?.extrusiveIgneous?.join(', ') },
                                { label: 'Intrusive Igneous', value: model?.info?.intrusiveIgneous?.join(', ') },
                                { label: 'Structure', value: model?.info?.structure?.join(', ') },
                                { label: 'Fossils', value: model?.info?.fossils?.join(', ') },
                                { label: 'Quaternary Geomorphology', value: model?.info?.quaternaryGeomorphology?.join(', ') }
                            ].filter(({ value }) => value !== undefined && value !== null).map(({ label, value }) => (
                                <div className='flex justify-between pb-2' key={label}>
                                    <span style={{ color: colors.subTextColor }} className='text-left'>{label}</span>
                                    <span className='text-right'>{value}</span>
                                </div>
                            ))}
                        </div>

                        <div className=' rounded-xl w-full border-[1px] p-5 mb-5'>
                            <div style={{ fontWeight: 500 }} className='mb-3'>Model Info</div>
                            <div className='flex justify-between pb-2'>
                                <span style={{ color: colors.subTextColor }} className=' text-left'>Size</span><span className='text-right'>{model?.info?.size}</span>
                            </div>
                            <div className='flex justify-between pb-2'>
                                <span style={{ color: colors.subTextColor }} className=' text-left'>Smallest Visible Feature</span><span className='text-right'>{model?.info?.smallestVisibleFeature}</span>
                            </div>
                        </div>

                        <div className=' rounded-xl w-full border-[1px] p-5 mb-5'>
                            <div style={{ fontWeight: 500 }} className='mb-3'>Location</div>
                            <div className='flex justify-between pb-2'>
                                <span style={{ color: colors.subTextColor }} className=' text-left'>Latitude</span><span className='text-right'>{model?.coordinates?.latitude}</span>
                            </div>
                            <div className='flex justify-between pb-2'>
                                <span style={{ color: colors.subTextColor }} className=' text-left'>Longitude</span><span className='text-right'>{model?.coordinates?.longitude}</span>
                            </div>
                            <div className='justify-between pb-2 '>
                                <div style={{ color: colors.subTextColor }} className=' text-left'>Address</div><div>{model?.address}</div>
                            </div>
                        </div>

                        <div className=' rounded-xl w-full border-[1px] p-5 mb-5'>
                            <div style={{ fontWeight: 500 }} className='mb-3'>Citation</div>
                            <div className='flex justify-between pb-2'>
                                <span style={{ color: colors.subTextColor }} className='text-right'>{model?.citation}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
