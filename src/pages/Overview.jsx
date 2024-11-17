import React, { useState, useEffect, useContext } from 'react';
import { GlobalStateContext } from '../../Context/GlobalStateContext';
import { colors } from '../styles/colors';
import { useNavigate } from 'react-router-dom';

const Overview = () => {
    const navigate = useNavigate();

    return (
        <div style={{ minHeight: `${window.innerHeight - 128}px`, overflow: 'hidden' }} className="bg-gray-100 flex flex-col items-center justify-center p-6 relative">
            {/* Heading */}
            <h1 className="text-3xl font-bold mb-4">Inspiration for Geoscience Researchers</h1>

            {/* Introduction Paragraph */}
            <p className="text-lg text-center max-w-4xl mb-6">
                Welcome to REEFS Lab – the ultimate hub for 3D geoscience models. At REEFS Lab, we are dedicated to empowering geoscience researchers, educators, and professionals by providing access to cutting-edge, high-quality virtual 3D models of geologically significant locations in India. Our platform is designed to inspire, connect, and enhance the geoscience community worldwide.
            </p>

            <p className="text-lg text-center max-w-4xl mb-6">
                Whether you're exploring complex geological formations, conducting detailed field research, or developing educational materials, REEFS Lab serves as a valuable resource for all your geoscience needs. We aim to foster collaboration and knowledge-sharing through our rich library of 3D models, contributed by users across the globe.
            </p>

            {/* Features Section */}
            <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold mb-4">The Ultimate Hub for 3D Geoscience Models</h2>
                <p className="text-lg max-w-3xl mx-auto mb-6">
                    REEFS Lab offers a unique collection of geospatial data, 3D geological models, and virtual terrain representations that help bring research to life. From tectonic plate boundaries to sedimentary basins, our platform hosts a wide variety of interactive 3D models covering geological features of India and beyond. Researchers, educators, and students can explore and analyze complex geological structures in ways that were once impossible with traditional methods.
                </p>
            </div>

            {/* List of Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-3">High-Quality 3D Models</h3>
                    <p className="text-base text-center">
                        Access detailed, accurate 3D geological models created using state-of-the-art technologies, such as LiDAR and photogrammetry.
                    </p>
                </div>
                <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-3">Collaborative Research</h3>
                    <p className="text-base text-center">
                        Our platform encourages contributions from geoscience professionals and enthusiasts worldwide. Share your own models and collaborate with a global community of researchers.
                    </p>
                </div>
                <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-3">Educational Resources</h3>
                    <p className="text-base text-center">
                        Whether you’re teaching or learning, REEFS Lab offers a rich set of 3D resources for educational purposes. Visualize geological phenomena in an interactive environment for deeper understanding.
                    </p>
                </div>
                <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-3">Geospatial Data</h3>
                    <p className="text-base text-center">
                        Leverage high-resolution geospatial datasets to supplement your fieldwork and research projects, enhancing your analyses and insights.
                    </p>
                </div>
            </div>

            {/* Call-to-Action Section */}
            <div className="text-center mt-8">
                <p className="text-lg mb-6">
                    Join us at REEFS Lab today and be part of the next generation of geoscientific research and education. Together, we can transform the way we understand the Earth’s history and its dynamic systems.
                </p>
                <div
                    onClick={() => navigate('/Models')}
                    className="box cursor-pointer px-4 flex items-center rounded-lg justify-center border-[1px]"
                    style={{
                        height: '38px',
                        width: '30%',
                        backgroundColor: colors.differentColor,
                        color: colors.mainBackgroundColor,
                        borderColor: colors.borderBoxColor,
                    }}
                >
                    Explore 3D Models
                </div>
            </div>
        </div>
    );
};

export default Overview;
