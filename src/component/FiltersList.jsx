import React, { useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown, IoMdRemove, IoMdAdd } from 'react-icons/io';
import { colors } from '../styles/colors';

const FiltersList = ({ title, platforms, platformstype, toggleFilter, selectedFilters }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [showAll, setShowAll] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const toggleDropdown = () => {
        setIsOpen(prevState => !prevState);
    };

    const calculateVisibleCount = () => {
        const totalCount = platforms.length;
        return showAll ? totalCount : Math.ceil(totalCount * 0.21) || 1;
    };

    //   const visiblePlatforms = platforms.slice(0, calculateVisibleCount());
    const visiblePlatforms = platforms
    .filter(platform => !selectedFilters.some(filter => filter.value === platform.name))
    .slice(0, calculateVisibleCount());

    return (
        <div className='py-4 border-b-2 border-dotted'>
            <div className='flex justify-between items-center cursor-pointer' onClick={toggleDropdown}>
                <span>{title}</span>
                {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            {isOpen && (
                <>
                    <div className='pt-3 flex flex-wrap gap-2'>
                        {visiblePlatforms.map((platform, index) => (
                            <div
                                key={index}
                                style={{
                                    borderColor: colors.borderBoxColor,
                                    backgroundColor: hoveredIndex === index ? colors.borderBoxColor : 'transparent',
                                    // opacity: hoveredIndexx === index ? 0.8 : 1,
                                    transition: 'background-color 0.4s ease, opacity 0.4s ease',
                                }}
                                className=" border-[1px] px-3 py-1 rounded-lg flex items-center cursor-pointer"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={() => toggleFilter({ type: platformstype, value: platform.name })}
                            >
                                {platform.name}
                            </div>
                        ))}
                    </div>
                    <div
                        style={{ color: colors.subTextColor }}
                        className='pt-3 flex items-center gap-1 cursor-pointer'
                        onClick={() => setShowAll(prev => !prev)}
                    >
                        {showAll ? <IoMdRemove /> : <IoMdAdd />}
                        {showAll ? 'Show less' : 'Show more'}
                    </div>
                </>
            )}
        </div>
    );
};

export default FiltersList;
