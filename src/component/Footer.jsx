import React from "react";
import { FaInstagram, FaDribbble, FaDiscord, FaLinkedin, FaFacebookF, FaYCombinator } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { colors } from "../styles/colors";
import { IoMail } from "react-icons/io5";

const Footer = () => {
    return (
        <footer className=" fixed bottom-0 w-full border-t border-gray-200 bg-white">
            <div className="container flex items-center p-5">

                <div className='text-[#11023b] font-bold pr-7' style={{ borderRightWidth: 1, borderColor: colors.borderMainColor }}>
                    <a href="#">REEFS Lab</a>
                </div>
                <div className=' px-7' style={{ color: colors.subTextColor, borderRightWidth: 1, borderColor: colors.borderMainColor }}>
                    <a href="#">3D Data Resources</a>
                </div>
                {/* Social Icons */}
                <div style={{ color: colors.iconColor }} className="px-7 flex space-x-4 justify-center items-center">
                    <a href="https://www.instagram.com/reefs_labiitgn/" className={`hover:text-[#363649]`}>
                        <FaInstagram size={22} />
                    </a>
                    <a href="mailto:reefslabiitgn@gmail.com" className={`hover:text-[#363649]`}>
                        <IoMail size={24} />
                    </a>
                    {/* <a href="#" className={`hover:text-[#363649]`}>
                        <FaYCombinator size={20} />
                    </a> */}
                    <a href="#" className={`hover:text-[#363649]`}>
                        <FaXTwitter size={20} />
                    </a>
                    {/* <a href="#" className={`hover:text-[#363649]`}>
                        <FaDiscord size={20} />
                    </a> */}
                    <a href="#" className={`hover:text-[#363649]`}>
                        <FaLinkedin size={20} />
                    </a>
                    <a href="https://www.facebook.com/people/REEFS-LAB/61550232074312/" className={`hover:text-[#363649]`}>
                        <FaFacebookF size={18} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
