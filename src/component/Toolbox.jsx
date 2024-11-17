import React, { useState } from 'react';
import { BsFillGrid1X2Fill } from 'react-icons/bs';
import { PiColumnsFill, PiMathOperationsFill } from 'react-icons/pi';
import { RxComponent1 } from 'react-icons/rx';
import { ImPen } from 'react-icons/im';
import { IoIosArrowDown } from 'react-icons/io';
import { IoFilter, IoGrid } from 'react-icons/io5';
import { LiaLongArrowAltLeftSolid } from 'react-icons/lia';
import { colors } from '../styles/colors';
import { RiLayoutGridFill } from 'react-icons/ri';
import { FaList, FaListAlt } from 'react-icons/fa';
import { HiViewBoards } from 'react-icons/hi';

export default function Toolbox({ setShowFilter, showFilter, gridMode, setGridMode}) {
    const [selectedBox, setSelectedBox] = useState('Multi Grid');

    const handleBoxClick = (boxName) => {
        setSelectedBox(boxName);
        setGridMode(boxName);
    };

    const toggleFilter = () => {
        setShowFilter((prev) => !prev);
    };

    return (
        <div style={{ zIndex: 9998, backgroundColor: colors.mainBackgroundColor }}>
            <div className='flex items-center' style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.borderMainColor }}>
                {showFilter ? (
                    <div className='px-4 py-4 hidden md:flex sm:w-[24vw] lg:w-[20vw] items-center justify-between' style={{ borderRightWidth: 1, borderColor: colors.borderMainColor }}>
                        <div className='flex gap-3 items-center'>
                            <IoFilter color={colors.iconColor} size={25} />
                            Filters
                        </div>
                        <div onClick={toggleFilter} className='flex cursor-pointer'>
                            <LiaLongArrowAltLeftSolid color={colors.iconColor} size={25} />
                        </div>
                    </div>
                ) : (


                    // </div>
                    <div className=' px-3 pr-5' style={{ borderRightWidth: 1, borderColor: colors.borderMainColor }}>
                        <div
                            onClick={toggleFilter}
                            className=' justify-center border-[1px] rounded-lg px-3 gap-2 flex items-center cursor-pointer'
                            style={{
                                height: '32px',
                                borderColor: colors.borderBoxColor,
                                backgroundColor: 'white',
                                color: 'black',
                            }}
                        >
                            <IoFilter color={colors.iconColor} size={21} />
                            Filters
                        </div>
                    </div>
                )}

                <div className='p-3 flex-1 h-full flex justify-between items-center'>
                    <div className={`pl-2 flex items-center justify-center gap-2`}>
                        {['Multi Grid', 'Solo Grid', 'Directory'].map((name, index) => { //'Elements', 'Illustrations'
                            const isSelected = selectedBox === name;
                            const iconColor = isSelected ? 'white' : colors.iconColor;

                            const icons = [
                                <IoGrid color={iconColor} size={20} />,
                                <HiViewBoards style={{ transform: 'rotate(90deg)' }} color={iconColor} size={22} />,
                                <FaList color={iconColor} size={18} />,
                                // <ImPen color={iconColor} size={18} />,
                            ];

                            return (
                                <div
                                    key={name}
                                    onClick={() => handleBoxClick(name)}
                                    style={{
                                        height: '32px',
                                        borderColor: isSelected ? colors.differentColorBorder : colors.borderBoxColor,
                                        backgroundColor: isSelected ? colors.differentColor : 'white',
                                        color: isSelected ? 'white' : 'black',
                                    }}
                                    className={`border-[1px] rounded-lg px-3 gap-2 flex items-center cursor-pointer`}
                                    
                                >
                                    {icons[index]}
                                    {name}
                                </div>
                            );
                        })}
                    </div>

                    <div className='gap-2 pr-3 flex'>
                        <span style={{ color: colors.subTextColor }}>Sort by:</span>
                        <div className='gap-2 flex items-center'>
                            Popular
                            <IoIosArrowDown color={colors.iconColor} size={14} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
