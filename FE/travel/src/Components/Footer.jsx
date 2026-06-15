import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { CiPhone, CiLocationOn } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import { TiSocialFacebook, TiSocialInstagram, TiSocialYoutube } from "react-icons/ti";
import { IoIosSend } from "react-icons/io";
import { imgGlobal } from "../assets/images";
import { FaWhatsapp } from "react-icons/fa";
import { createContacts } from "../api/Contact";

const Footer = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [sendMail, setSendMail] = useState("");

    const handleCreateRequest = async () => {
        const res = await createContacts({
            email: sendMail,
        });
        if (res?.status === 200) {
            setSendMail("");
        }
    };

    return (
        <>
            <div className="flex justify-between gap-3 py-[1.5rem] px-[1rem] lg:px-[3rem] bg-[#161515fa] text-white">
                {/* Logo part */}
                <div className="ml-[0.5rem] lg:ml-[3rem] max-w-[50%] lg:max-w-[20%]">
                    <div
                        className="flex-[1.3] lg:flex-[0.3] flex gap-2 items-center cursor-pointer"
                        onClick={() => navigate("/")}>
                        <img
                            src={imgGlobal.logo}
                            className="w-[2rem] h-[2rem] lg:w-[3.1rem] lg:h-[3.1rem] object-cover"
                            alt="logo"
                        />
                        <div>
                            <div className="text-wrap text-[1rem] lg:text-[1.4rem] w-[60px] font-medium">
                                REVES INDOCHINE
                            </div>
                            <div className="text-[0.4rem] lg:text-[0.6rem] mb-[0.1rem]"> DREAM OF INDOCHINE </div>
                        </div>
                    </div>

                    <div className="flex items-center mt-[1.2rem]">
                        <a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=hhp238@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 no-underline">
                            <CiMail className="text-[#d38518]" />
                            reves.indochine@gmail.com
                        </a>
                    </div>

                    <div className="flex mt-[0.85rem]">
                        <a href="tel:0968133933" className="flex items-center gap-2 no-underline">
                            <CiPhone className="text-[#d38518]" />
                            +84 968 133 933
                        </a>
                    </div>

                    <div className="flex items-center mt-[0.85rem]">
                        <div className="flex gap-2 no-underline text-wrap">
                            <CiLocationOn className="text-[#d38518]" />
                            01, Lane 167/45 - Rue Quang Tien, Tay Mo, Hanoi, Vietnam
                        </div>
                    </div>
                </div>

                {/* End logo part */}

                {/* VietNamTour */}
                <div className="hidden lg:block">
                    <div className="text-[1rem] mb-[0.5rem] uppercase font-medium text-[#d38518]">
                        {t("navbar.vietnam_tour")}
                    </div>
                    <div className="py-[0.5rem] text-[#e6ebeb] cursor-pointer" onClick={() => navigate(`/tours`)}>
                        {t("by_duration")}
                    </div>
                    <div className="py-[0.5rem] text-[#e6ebeb] cursor-pointer" onClick={() => navigate(`/tours`)}>
                        {t("by_style")}
                    </div>
                    <div className="py-[0.5rem] text-[#e6ebeb] cursor-pointer" onClick={() => navigate(`/tours`)}>
                        {t("navbar.combine_tour")}
                    </div>
                </div>
                {/* END VietNamTour */}

                {/* Travel Information */}
                <div className="hidden lg:block">
                    <div className="text-[1rem] mb-[0.5rem] uppercase font-medium text-[#d38518]">
                        {t("navbar.travel_infor")}
                    </div>
                    <div
                        className="py-[0.5rem] text-[#e6ebeb] cursor-pointer"
                        onClick={() => navigate(`/tours?region=NORTH`)}>
                        {t("navbar.northen_vn")}
                    </div>
                    <div
                        className="py-[0.5rem] text-[#e6ebeb] cursor-pointer"
                        onClick={() => navigate(`/tours?region=CENTRAL`)}>
                        {t("navbar.central_vn")}
                    </div>
                    <div
                        className="py-[0.5rem] text-[#e6ebeb] cursor-pointer"
                        onClick={() => navigate(`/tours?region=SOUTH`)}>
                        {t("navbar.south_vn")}
                    </div>
                </div>
                {/* END Travel Information */}

                {/* About us */}
                <div className="hidden lg:block">
                    <div
                        className="text-[1rem] mb-[0.5rem] uppercase font-medium cursor-pointer text-[#d38518] hover:text-[#fff]"
                        onClick={() => navigate("/about")}>
                        {t("about_us")}
                    </div>
                </div>
                {/* END About us */}

                {/* Blog */}
                <div className="hidden lg:block">
                    <div
                        className="text-[1rem] mb-[0.5rem] uppercase font-medium cursor-pointer text-[#d38518] hover:text-[#fff]"
                        onClick={() => navigate("/blog")}>
                        {t("blog")}
                    </div>
                </div>
                {/* END Blog */}

                {/* Follow us */}
                <div>
                    <div className="text-[1rem] mb-[0.5rem] uppercase font-medium text-[#d38518]">{t("follow")}</div>
                    <div className="flex items-center">
                        <div className="p-[0.25rem] border-[1px] border- rounded-full cursor-pointer">
                            <TiSocialFacebook className="w-[1.25rem] h-[1.25rem]" />
                        </div>
                        <div className="p-[0.25rem] border-[1px] border- rounded-full cursor-pointer ml-[0.8rem]">
                            <TiSocialInstagram className="w-[1.25rem] h-[1.25rem]" />
                        </div>
                        <div className="p-[0.25rem] border-[1px] border- rounded-full cursor-pointer ml-[0.8rem]">
                            <TiSocialYoutube className="w-[1.25rem] h-[1.25rem]" />
                        </div>
                        <div className="p-[0.25rem] border-[1px] rounded-full cursor-pointer ml-[0.8rem]">
                            <a
                                href="https://wa.me/84968133933"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center">
                                <FaWhatsapp className="w-[1.25rem] h-[1.25rem]" />
                            </a>
                        </div>
                    </div>
                    <div className="mt-[1rem]">
                        <div>{t("subcribe_ourletter")}</div>
                        <div className="mt-[0.5rem] flex items-center h-[2rem]">
                            <input
                                type="text"
                                placeholder="Fill Email"
                                value={sendMail}
                                onChange={(e) => setSendMail(e.target.value)}
                                className="h-full py-[0.25rem] px-[0.5rem] border-[1px] border-[#d38518] rounded-[2px] w-[80%] focus:outline-none"
                            />
                            <div
                                className="w-[20%] h-full bg-[#d38518] flex-box-center text-white"
                                onClick={() => handleCreateRequest()}>
                                <IoIosSend />
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Follow us */}
            </div>

            {/* After HR */}
            <div className="flex justify-between items-center border-t-[1px] bg-[#161515fa] text-white border-[#bc8b3869] px-[1rem] lg:px-[3rem] text-[0.6rem]">
                <div>@2026 Reves Indochine. All rights reserved</div>
                <div className="flex items-center">
                    <div className="text-center px-[1rem] border-r-[1px] border-white">Privacy Policy</div>
                    <div className="text-center px-[1rem]">Term & Conditions</div>
                </div>
            </div>
        </>
    );
};

export default Footer;
