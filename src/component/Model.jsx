import React from 'react';
import { FaRegEye, FaRegHeart } from 'react-icons/fa';
import { colors } from '../styles/colors';
import { HiArrowUp } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const Model = ({ model, gridMode }) => {
    const navigate = useNavigate();

    const navigateToViewPort = () => {
        navigate('/ViewPort');
    };

    const handleDetailsClick = (model) => {
        navigate(`/Models/${model.index}`, { state: { model } }); // Pass model data via state
    }; 
    
    return (
        <>
            <style>{`
            .imagehovergridMode::after {
            pointer-events: none;
                content: '';
                position: absolute;
                top: 100%; /* Start from below the box */
                left: 0;
                right: 0;
                height: 100%; /* Full height */
                background: linear-gradient(to top, white, transparent);
                transition: top 0.3s ease; /* Transition for smooth effect */
                z-index: 1; /* Ensure it appears above the image */
            }

            .hoverer:hover .imagehovergridMode::after {
                top: 0; /* Move the gradient into view on hover */
            }

            .imagehover::after {
            pointer-events: none;
                content: '';
                position: absolute;
                top: 100%; /* Start from below the box */
                left: 0;
                right: 0;
                height: 60%; /* Full height */
                background: linear-gradient(to top, white, transparent);
                transition: top 0.3s ease; /* Transition for smooth effect */
                z-index: 1; /* Ensure it appears above the image */
            }

            .hoverer:hover .imagehover::after {
                top: 60%; /* Move the gradient into view on hover */
            }

            .button-container {
                position: absolute;
                bottom: -50px; /* Start off-screen */
                transition: bottom 0.3s ease; /* Smooth transition */
                width: 100%;
                display: flex;
                justify-content: center;
                gap: 0.5rem; /* Adjust gap between buttons */
            }

            .hoverer:hover .button-container {
                bottom: 12px; /* Slide into view on hover */
            }

            .curcular-button-container {
                transition: opacity 0.3s ease; /* Smooth transition for the circular button */
                opacity: 0; /* Start fully transparent */
            }

            .hoverer:hover .curcular-button-container {
                opacity: 1; /* Fade in on hover */
            }
        `}</style>
            <div className=" hoverer rounded-lg transition-shadow duration-300 cursor-pointer">
                <div className={`box ${gridMode == 'Multi Grid' ? 'imagehovergridMode' : 'imagehover'} relative overflow-hidden ${gridMode == 'Multi Grid' ? 'h-[249px]' : 'h-[80vh]'} hover:shadow-lg w-full rounded-lg mb-2`}>
                    <img
                        onClick={() => handleDetailsClick(model)}
                        style={{ backgroundColor: '#F6F6F6' }}
                        className=" h-full w-full object-cover z-0"
                        src={model.image}
                        alt={model.name}
                    />
                    <div onClick={() => handleDetailsClick(model)} className='curcular-button-container z-10 box absolute top-3 right-3 h-8 w-8 flex items-center justify-center border-[1px] rounded-full' style={{ borderColor: colors.borderBoxColor, backgroundColor: colors.mainBackgroundColor }}>
                        <HiArrowUp style={{ transform: 'rotate(45deg)' }} />
                    </div>
                    <div className=" z-10 button-container">
                        <div onClick={navigateToViewPort} className='box h-8 w-12 flex items-center rounded-lg justify-center border-[1px]' style={{ borderColor: colors.borderBoxColor, backgroundColor: colors.mainBackgroundColor }}>
                            <FaRegEye />
                        </div>
                        <div className='box h-8 w-12 flex items-center rounded-lg justify-center border-[1px]' style={{ borderColor: colors.borderBoxColor, backgroundColor: colors.mainBackgroundColor }}>
                            <FaRegHeart />
                        </div>
                    </div>
                </div>

                <h2
                    style={{
                        color: colors.mainTextColor,
                        fontWeight: 500,
                        fontSize: 16,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {model.title}
                </h2>
                <h3 style={{ color: colors.subTextColor }}>Added on {model.info.release}</h3>
            </div>
        </>
    );
};

export default Model;
