import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import CostomMarker2 from '../assets/CostomMarker2.png';
import { statesOptions, geologicalAgesOptions, ClasticSedimentologyOptions, CarbonateAndEvaporiteSedimentologyOptions, MetamorphicOptions, ExtrusiveIgneousOptions, IntrusiveIgneousOptions, StructureOptions, FossilsOptions, QuaternaryGeomorphologyOptions } from '../data/options';

export default function FormGeoreference({
  toast,
  setSelectedTopic,
  loading,
  handleSubmit,
  handleChange,
  formData,
  colors,
  setFormData,
}) {
  const customIcon = new L.Icon({
    iconUrl: CostomMarker2,
    iconSize: [62, 52], // Set the size of the marker (optional)
    // iconAnchor: [16, 32], // Anchor the icon (optional)
    // popupAnchor: [0, -32], // Position of popup (optional)
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const validate = () => {
    const newErrors = {};

    if (!formData.longitude) newErrors.longitude = 'Longitude is required';
    if (!formData.latitude) newErrors.latitude = 'Latitude is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.address) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(e); // Call the passed handleChange to update formData
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined, // Remove error for the specific field being edited
      }));
    }
  };

  const [position, setPosition] = useState([
    formData.latitude || 51.505,
    formData.longitude || -0.09,
  ]); // Default to a location
  const [loadingAddress, setLoadingAddress] = useState(false);

  // Update position when formData latitude or longitude changes
  useEffect(() => {
    if (formData.latitude && formData.longitude) {
      setPosition([parseFloat(formData.latitude), parseFloat(formData.longitude)]);
    }
  }, [formData.latitude, formData.longitude]);

  // Function to fetch address from current latitude and longitude using fetch
  const getAddressFromCoordinates = async () => {
    const { latitude, longitude } = formData;

    if (!latitude || !longitude) {
      toast.error('Please provide valid coordinates.');
      return;
    }

    setLoadingAddress(true); // Set loading state

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch address');
      }

      const data = await response.json();
      if (data && data.display_name) {
        // Update formData with the address
        setFormData({ ...formData, address: data.display_name });
      } else {
        toast.error('Address not found.');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      toast.error('Error fetching address.');
    } finally {
      setLoadingAddress(false); // Reset loading state
    }
  };

  const handleGenrate = () => {
    const siteTitle = formData.title || 'No title provided';
    const siteContributor =
      formData.contributors.length > 0
        ? formData.contributors.join(', ')
        : 'No contributors';
    handleChange({
      target: {
        name: 'address',
        value: ``,
      },
    });

    // Fetch address using current coordinates
    getAddressFromCoordinates();
  };

  const handleClear = () => {
    handleChange({
      target: {
        name: 'address',
        value: '',
      },
    });
  };

  // const handleNext = () => {
  //   const allFieldsFilled = formData.longitude && formData.latitude && formData.address;
  //   if (allFieldsFilled) {
  //     setSelectedTopic('Publishing Sharing');
  //   } else {
  //     toast.error('Please fill in all required fields');
  //   }
  // };
  const handleNext = () => {
    setIsSubmitting(true);
    if (validate()) {
      setSelectedTopic('Publishing Sharing');
    } else {
      toast.error('Please fill in all required fields');
    }
    setIsSubmitting(false);
  };

  // Handle map click events to set latitude and longitude in formData
  const LocationClick = () => {
    const map = useMap();
    // console.log(map);  // Check if map is initialized
    
    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      // console.log(lat, lng);  // Log lat/lng values to debug
      
      if (!isNaN(lat) && !isNaN(lng)) {
        setPosition([lat, lng]);
        setFormData({ ...formData, latitude: lat, longitude: lng });
        map.flyTo([lat, lng], 13, { animate: true, duration: 1.5 });
      } else {
        console.error('Invalid lat/lng:', lat, lng);
      }
    });
  
    return null;
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit} className="gap-6 p-5">
        <img className='h-1' src={CostomMarker2} alt="My Image" />

        <div className="flex gap-9 pb-4">
          <div className="w-1/2 flex flex-col h-full">
            <div className="flex-1">
              <label
                htmlFor="latitude"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Latitude
              </label>
              <input
                type="numeric"
                id="latitude"
                name="latitude"
                placeholder="Enter latitude coordinates"
                value={formData.latitude}
                onChange={handleChange}
                required
                className={`w-full p-3 border rounded-md focus:outline-none focus:shadow-md ${errors.latitude ? 'border-red-500' : ''}`}
              />
              {errors.latitude && <span className="text-red-500 text-sm">{errors.latitude}</span>}
            </div>
            <div className="flex-1 pt-3">
              <label
                htmlFor="longitude"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Longitude
              </label>
              <input
                type="text"
                id="longitude"
                name="longitude"
                placeholder="Enter longitude coordinates"
                value={formData.longitude}
                onChange={handleChange}
                required
                className={`w-full p-3 border rounded-md focus:outline-none focus:shadow-md ${errors.longitude ? 'border-red-500' : ''}`}
                />
                {errors.latitude && <span className="text-red-500 text-sm">{errors.longitude}</span>}
            </div>
            <div className="flex-1 py-3 flex flex-col">
              <div className="flex justify-between">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleGenrate}
                    className="text-blue-600"
                    disabled={loadingAddress}
                  >
                    {loadingAddress ? 'Generating...' : 'Generate'}
                  </button>
                  <button
                    type="button"
                    onClick={handleClear}
                    className="text-red-600"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <textarea
                id="address"
                name="address"
                placeholder="Input a detailed address of your model"
                value={formData.address}
                onChange={handleChange}
                required
                style={{ minHeight: '100px', flexGrow: 1 }}
                className={`w-full p-3 border rounded-md focus:outline-none focus:shadow-md resize-none ${errors.address ? 'border-red-500' : ''}`}
                />
                {errors.latitude && <span className="text-red-500 text-sm">{errors.address}</span>}
            </div>

            <div className="flex-1 ">
              <label htmlFor="state" className="block text-sm font-medium mb-1">State</label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
                className={`w-full p-3 border rounded-md focus:outline-none focus:shadow-md ${errors.state ? 'border-red-500' : ''}`}
              >
                <option value="" disabled style={{}}>Please specify the state in India from which the model is sourced.</option>
                {statesOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
                {errors.state && <span className="text-red-500 text-sm">{errors.state}</span>}
            </div>
          </div>

          <div className="w-1/2 flex flex-col">
            <label
              htmlFor="longitude"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Map
            </label>
            <div className="w-full h-full bg-blue-500">
              {/* Leaflet Map */}
              <MapContainer
                center={position}
                zoom={13}
                style={{ width: '100%', height: '100%' }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={position} icon={customIcon}>
                  <Popup>
                    Selected location: {position[0]}, {position[1]}
                  </Popup>
                </Marker>
                <LocationClick />
              </MapContainer>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className="flex justify-end">
          <div
            onClick={handleNext}
            className="box cursor-pointer px-4 flex items-center rounded-lg justify-center border-[1px]"
            style={{
              height: '38px',
              width: '30%',
              backgroundColor: colors.differentColor,
              color: colors.mainBackgroundColor,
              borderColor: colors.borderBoxColor,
            }}
          >
            Next
          </div>
        </div>
      </form>
    </div>
  );
}
