import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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

  const handleNext = () => {
    const allFieldsFilled = formData.longitude && formData.latitude && formData.address;
    if (allFieldsFilled) {
      setSelectedTopic('Publishing Sharing');
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  // Handle map click events to set latitude and longitude in formData
  const LocationClick = () => {
    const map = useMap();
    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      setFormData({ ...formData, latitude: lat, longitude: lng });
    });
    return null;
  };

  // Ensure that the map view moves when position changes
  const MoveMapView = () => {
    const map = useMap();
    useEffect(() => {
      if (position) {
        map.flyTo(position, 13, { animate: true, duration: 1.5 }); // Smoothly move to new position
      }
    }, [position, map]);

    return null;
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="gap-6 p-5">
        {/* <div className="flex items-center justify-between mb-4 gap-10">
          <div className="flex-1">
            <label
              htmlFor="latitude"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Latitude
            </label>
            <input
              type="text"
              id="latitude"
              name="latitude"
              placeholder="Enter latitude coordinates"
              value={formData.latitude}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:shadow-md"
            />
          </div>
          <div className="flex-1">
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
              className="w-full p-3 border rounded-md focus:outline-none focus:shadow-md"
            />
          </div>
        </div> */}

        <div className="flex gap-9 h-80">
          <div className="w-1/2 flex flex-col h-full">
            <div className="flex-1">
              <label
                htmlFor="latitude"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Latitude
              </label>
              <input
                type="text"
                id="latitude"
                name="latitude"
                placeholder="Enter latitude coordinates"
                value={formData.latitude}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-md focus:outline-none focus:shadow-md"
              />
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
                className="w-full p-3 border rounded-md focus:outline-none focus:shadow-md"
              />
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
                className="w-full p-3 border rounded-md focus:outline-none focus:shadow-md resize-none"
                style={{ minHeight: '100px', flexGrow: 1 }}
              />
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
                <Marker position={position}>
                  <Popup>
                    Selected location: {position[0]}, {position[1]}
                  </Popup>
                </Marker>
                <LocationClick />
                <MoveMapView />
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
