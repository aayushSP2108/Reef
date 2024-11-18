import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, useMap } from 'react-leaflet';
import { FaTree } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import 'leaflet-gesture-handling'; 
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'; // Import full-screen CSS
import 'leaflet-fullscreen'; // Import the full-screen control plugin
import L from 'leaflet';
import CostomMarker2 from '../assets/CostomMarker2.png';

const { BaseLayer } = LayersControl;

export default function MapComponent({ filteredModels }) {
    const [models, setModels] = useState([]);
    const navigate = useNavigate();
    const mapRef = useRef();  // To reference the map instance

    const customIcon = new L.Icon({
        iconUrl: CostomMarker2,
        iconSize: [62, 52], // Set the size of the marker (optional)
        iconAnchor: [16, 32], // Anchor the icon (optional)
        popupAnchor: [0, -32], // Position of popup (optional)
      });

    useEffect(() => {
        setModels(Array.isArray(filteredModels) ? filteredModels : []);
    }, [filteredModels]);

    const handleDetailsClick = (index) => {
        navigate(`/Models/${index}`); // Navigate using the index
    };

    // Component to reset the map view (Home Button)
    const ResetViewControl = () => {
        const map = useMap();
        const handleHomeClick = () => {
            map.setView([20, 78], 5);  // Reset the view to the original position and zoom level
        };

        return (
            <div
            className=' hover:bg-[#F4F4F4] bg-[#FFFFFF] cursor-pointer rounded-sm p-[7px]'
                style={{
                    position: 'absolute',
                    top: 130,
                    left: 11,
                    zIndex: 1000,
                }}
                onClick={handleHomeClick}
            >
                <img src="https://cdn-icons-png.flaticon.com/512/25/25694.png" alt="Home" width={18} />
            </div>
        );
    };

    return (
        <MapContainer 
            ref={mapRef}
            center={[20, 78]} 
            zoom={5} 
            style={{ height: '100vh', width: '100%' }} 
            scrollWheelZoom={false} 
            gestureHandling="auto"
            fullscreenControl={true} // Enable full-screen control
        >
            {/* Reset view button (Home button) */}
            <ResetViewControl />

            <LayersControl position="topright">
                <BaseLayer name="OpenStreetMap">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                </BaseLayer>
                <BaseLayer name="OpenStreetMap.HOT">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.fr/copyright">OpenStreetMap</a> contributors'
                    />
                </BaseLayer>
                <BaseLayer checked name="OpenTopoMap"> {/* Set this layer as checked */}
                    <TileLayer
                        url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://opentopomap.org/copyright">OpenTopoMap</a> contributors'
                    />
                </BaseLayer>
            </LayersControl>

            {models.map((model) => (
                <Marker key={model.index} icon={customIcon} position={[model.coordinates.latitude, model.coordinates.longitude]}>
                    <Popup>
                        <div>
                            <FaTree style={{ marginRight: '5px', color: 'green' }} />
                            <strong>{model.title}</strong><br />
                            {model.description}<br />
                            <button 
                                onClick={() => handleDetailsClick(model.index)} 
                                style={{ cursor: 'pointer', border: 'none', background: 'transparent', color: 'blue', textDecoration: 'underline' }}
                            >
                                View Details
                            </button>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
