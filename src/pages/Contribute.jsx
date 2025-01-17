import React, { useContext, useEffect, useState } from 'react';
import { colors } from '../styles/colors'; // Make sure colors are properly defined
import { useNavigate } from 'react-router-dom'; // Importing navigate for routing
import { API_BASE_URL, ADDMODEL_ENDPOINT, MODELDATA_ENDPOINT } from '../../Constants/Constants';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { GlobalStateContext } from '../../Context/GlobalStateContext';
import Form from '../component/Form';
import YourModels from '../component/YourModels';

export default function Contribute() {
    const { userData, isLogin } = useContext(GlobalStateContext);

    const [formData, setFormData] = useState({
        longitude: '',
        // latitude: '',
        contactid: '',
        contactinfo: '',
        // index used automatically
        // image
        title: '',
        // year,
        address: '',
        description: '',
        largeDescription: '',
        state: '',
        releaseDate: '',
        GeologicalAgesOptions: '',
        ClasticSedimentologyOptions: [],
        CarbonateAndEvaporiteSedimentologyOptions: [],
        MetamorphicOptions: [],
        ExtrusiveIgneousOptions: [],
        IntrusiveIgneousOptions: [],
        StructureOptions: [],
        FossilsOptions: [],
        QuaternaryGeomorphologyOptions: [],
        modelLink: '',
        author: '',
        license: '',
        tags: [],
        size: '',
        smallestVisibleFeature: '',
        contributors: [],
        citation: '',
        visibility: '',
    });

    const [selectedTopic, setSelectedTopic] = useState('Contribute');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Handle input changes for standard fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle changes for contributors
    const handleContributorChange = (e, index) => {
        const newContributors = [...formData.contributors];
        newContributors[index] = e.target.value;
        setFormData({ ...formData, contributors: newContributors });
    };

    // Add new contributor field
    const handleAddContributor = () => {
        setFormData((prevData) => ({
            ...prevData,
            contributors: [...prevData.contributors, ''],
        }));
    };

    // Remove a contributor field
    const handleRemoveContributor = (index) => {
        const newContributors = formData.contributors.filter((_, i) => i !== index);
        setFormData({ ...formData, contributors: newContributors });
    };

    function findMissingFields(data) {
        const missingFields = [];

        // Check if required fields are missing
        if (!data.title) missingFields.push('Title');
        if (!data.description) missingFields.push('Introduction');
        if (!data.largeDescription) missingFields.push('Large Description');
        if (!data.info || !data.info.size) missingFields.push('Model Size');
        if (!data.info || !data.info.smallestVisibleFeature) missingFields.push('Model Smallest Visible Feature');
        if(!formData.contributors.length) missingFields.push('Contributor');
        if (!data.coordinates || !data.coordinates.longitude) missingFields.push('Longitude');
        if (!data.coordinates || !data.coordinates.latitude) missingFields.push('Latitude');
        if (!data.address) missingFields.push('Address');
        if (!data.info || !data.info.state) missingFields.push('State');
        
        return missingFields;
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        setFormData(prevData => ({
            ...prevData,
            contactinfo: userData.contactinfo,
            contactid: userData._id
        }));

        console.log('conti', formData)
       
        // Perform validation here
        const missing = findMissingFields(formData);
        console.log("Missing fields:");

        if (missing && missing.length > 0) {
          toast.error(`Please add ${missing.map((field, index) => {
            const fieldName = field.split('.').pop();

            return index === missing.length - 1
              ? `and ${field}`
              : fieldName;
          }).join(', ')}`);
          setLoading(false);
          return;
        }

        fetch(`${API_BASE_URL}:${MODELDATA_ENDPOINT}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === "ok") {
                    toast.success("Contribution Submitted Successfully!");
                    setFormData({
                        longitude: '',
                        contactid: '',
                        contactinfo: '',
                        // index used automatically
                        // image
                        title: '',
                        // year,
                        address: '',
                        description: '',
                        largeDescription: '',
                        state: '',
                        releaseDate: '',
                        GeologicalAgesOptions: '',
                        ClasticSedimentologyOptions: [],
                        CarbonateAndEvaporiteSedimentologyOptions: [],
                        MetamorphicOptions: [],
                        ExtrusiveIgneousOptions: [],
                        IntrusiveIgneousOptions: [],
                        StructureOptions: [],
                        FossilsOptions: [],
                        QuaternaryGeomorphologyOptions: [],
                        modelLink: '',
                        author: '',
                        license: '',
                        tags: [],
                        size: '',
                        smallestVisibleFeature: '',
                        contributors: [],
                        citation: '',
                        visibility: '',
                    })
                } else {
                    toast.error(data.message || "Failed to submit the form.");
                }
            })
            .catch(error => {
                toast.error("An error occurred. Please try again.");
                console.log("Error:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        if (userData) {
            setFormData(prevData => ({
                ...prevData,
                contactinfo: userData.contactinfo,
                contactid: userData._id,
            }));
        }
    }, [userData]);

    if (!userData || !isLogin) {
        return (
            <div style={{ minHeight: `${window.innerHeight - 128}px`, overflow: 'hidden' }} className="bg-gray-100 flex flex-col items-center justify-center p-6 relative">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Please log in to upload your model and its details.
                </h1>

                <div
                    onClick={() => navigate('/Login')}
                    className="box cursor-pointer px-6 py-2 flex items-center rounded-lg justify-center border border-gray-300"
                    style={{
                        backgroundColor: colors.differentColor,
                        color: colors.mainBackgroundColor,
                        borderColor: colors.borderBoxColor,
                        width: '30%',
                        height: '40px',
                    }}
                >
                    Go to Login
                </div>
            </div>
        );
    }


    return (
        <div className="h-full">
            <div className="flex w-full min-h-[83vh]">
                <div
                    style={{ borderRightWidth: 1, borderColor: colors.borderMainColor }}
                    className="hidden md:block sm:w-[24vw] lg:w-[20vw] px-4 pb-10"
                >
                    <div
                        className=" gap-4 border-b-[1px] py-4 "
                        style={{
                            position: 'sticky', top: '70px', zIndex: 998, backgroundColor: colors.mainBackgroundColor,
                        }}
                    >
                        {['Contribute', 'Your Models', 'Edit Models'].map((topic) => (
                            <div
                                key={topic}
                                className={`py-3 px-3 rounded-xl cursor-pointer`}
                                style={{
                                    backgroundColor: selectedTopic === topic && colors.differentBackgroundColor,
                                    // borderWidth: selectedTopic === topic && 1,
                                }}
                                onClick={() => setSelectedTopic(topic)}
                            >
                                {topic}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex-1 h-full">

                    {selectedTopic === 'Contribute' && (
                        <Form
                            toast={toast}
                            loading={loading}
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            handleContributorChange={handleContributorChange}
                            handleAddContributor={handleAddContributor}
                            handleRemoveContributor={handleRemoveContributor}
                            formData={formData}
                            colors={colors}
                            setFormData={setFormData}
                        />
                    )}

                    {selectedTopic === 'Your Models' && (
                        <YourModels />
                    )}

                </div>
            </div>

            {/* Toast container */}
            <ToastContainer
                position="top-left"
                autoClose={3000}
                // hideProgressBar={true} // Hide the progress bar for simplicity
                draggable
                pauseOnHover />
        </div>
    );
}