import React from "react";
import { useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { CiPhone, CiLocationOn } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import { TiSocialFacebook, TiSocialInstagram, TiSocialYoutube, TiSocialTwitter } from "react-icons/ti";
import TextField from "@mui/material/TextField";
import { IoIosSend } from "react-icons/io";
import { imgGlobal } from "../assets/images";

const Footer = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [sendMail, setSendMail] = useState(null);
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
                            <h2 className="text-wrap text-[1rem] lg:text-[1.4rem] w-[60px] font-medium">
                                REVES INDOCHINE
                            </h2>
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
                    <h2 className="text-[1rem] mb-[0.5rem] uppercase font-medium text-[#d38518]">
                        {t("navbar.vietnam_tour")}
                    </h2>
                    <div className="py-[0.5rem] text-[#e6ebeb]">{t("by_duration")}</div>
                    <div className="py-[0.5rem] text-[#e6ebeb]">{t("by_style")}</div>
                    <div className="py-[0.5rem] text-[#e6ebeb]">{t("navbar.combine_tour")}</div>
                </div>
                {/* END VietNamTour */}

                {/* Travel Information */}
                <div className="hidden lg:block">
                    <h2 className="text-[1rem] mb-[0.5rem] uppercase font-medium text-[#d38518]">
                        {t("navbar.travel_infor")}
                    </h2>
                    <div className="py-[0.5rem] text-[#e6ebeb]">{t("navbar.northen_vn")}</div>
                    <div className="py-[0.5rem] text-[#e6ebeb]">{t("navbar.central_vn")}</div>
                    <div className="py-[0.5rem] text-[#e6ebeb]">{t("navbar.south_vn")}</div>
                </div>
                {/* END Travel Information */}

                {/* About us */}
                <div className="hidden lg:block">
                    <h2 className="text-[1rem] mb-[0.5rem] uppercase font-medium cursor-pointer text-[#d38518] hover:text-[#7eb9f9]">
                        {t("about_us")}
                    </h2>
                </div>
                {/* END About us */}

                {/* Blog */}
                <div className="hidden lg:block">
                    <h2
                        className="text-[1rem] mb-[0.5rem] uppercase font-medium cursor-pointer text-[#d38518] hover:text-[#7eb9f9]"
                        onClick={() => navigate("/blog")}>
                        {t("blog")}
                    </h2>
                </div>
                {/* END Blog */}

                {/* Follow us */}
                <div>
                    <h2 className="text-[1rem] mb-[0.5rem] uppercase font-medium text-[#d38518]">{t("follow")}</h2>
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
                        <div className="p-[0.25rem] border-[1px] border- rounded-full cursor-pointer ml-[0.8rem]">
                            <TiSocialTwitter className="w-[1.25rem] h-[1.25rem]" />
                        </div>
                    </div>
                    <div className="mt-[1rem]">
                        <h2>{t("subcribe_ourletter")}</h2>
                        <div className="mt-[0.5rem] flex items-center h-[2rem]">
                            <input
                                type="text"
                                placeholder="Fill Email"
                                value={sendMail}
                                onChange={(e) => setSendMail(e.target.value)}
                                className="h-full py-[0.25rem] px-[0.5rem] border-[1px] border-[#d38518] rounded-[2px] w-[80%] focus:outline-none"
                            />
                            <div className="w-[20%] h-full bg-[#d38518] flex-box-center text-white">
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
                    <h2 className="text-center px-[1rem] border-r-[1px] border-white">Privacy Policy</h2>
                    <h2 className="text-center px-[1rem]">Term & Conditions</h2>
                </div>
            </div>
        </>
    );
};

export default Footer;
