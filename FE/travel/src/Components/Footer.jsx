import React from "react";
import { useNavigate } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { CiPhone, CiLocationOn } from "react-icons/ci";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <>
            <div className="flex justify-between gap-3 py-[1.5rem] px-[1rem] lg:px-[3rem]">
                {/* Logo part */}
                <div className="ml-[1rem] lg:ml-[3rem]">
                    <div
                        className="flex-1 lg:flex-[0.3] flex gap-2 items-center cursor-pointer"
                        onClick={() => navigate("/")}>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRrOxSg6_VdeBw0ejwGgGKbeQxaDsxKVaxuw&s"
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

                    <div className="flex items-center">
                        <a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=hhp238@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 no-underline">
                            <CiMail />
                            hhp238@gmail.com
                        </a>
                    </div>

                    <div className="flex items-center">
                        <a href="tel:0123456789" className="flex items-center gap-2 no-underline">
                            <CiPhone />
                            +84 123 456 789
                        </a>
                    </div>

                    <div className="flex items-center">
                        <div className="flex items-center gap-2 no-underline text-wrap">
                            <CiLocationOn />
                            123 Le Loi Street, District 1, Ho Chi Minh City, VietNam
                        </div>
                    </div>
                </div>

                {/* End logo part */}

                {/* VietNamTour */}
                <div className="hidden lg:block">
                    <h2 className="text-[1rem] mb-[0.5rem] uppercase font-medium">{t("navbar.vietnam_tour")}</h2>
                    <div className="py-[0.5rem] text-[#373434]">{t("by_duration")}</div>
                    <div className="py-[0.5rem] text-[#373434]">{t("by_style")}</div>
                    <div className="py-[0.5rem] text-[#373434]">{t("navbar.combine_tour")}</div>
                </div>
                {/* END VietNamTour */}

                {/* Travel Information */}
                <div className="hidden lg:block">
                    <h2 className="text-[1rem] mb-[0.5rem] uppercase font-medium">{t("navbar.travel_infor")}</h2>
                    <div className="py-[0.5rem] text-[#373434]">{t("navbar.northen_vn")}</div>
                    <div className="py-[0.5rem] text-[#373434]">{t("navbar.central_vn")}</div>
                    <div className="py-[0.5rem] text-[#373434]">{t("navbar.south_vn")}</div>
                </div>
                {/* END Travel Information */}

                {/* About us */}
                <div className="hidden lg:block">
                    <h2 className="text-[1rem] mb-[0.5rem] uppercase font-medium cursor-pointer hover:text-[#ef8d21]">
                        {t("about_us")}
                    </h2>
                </div>
                {/* END About us */}

                {/* Blog */}
                <div className="hidden lg:block">
                    <h2 className="text-[1rem] mb-[0.5rem] uppercase font-medium cursor-pointer hover:text-[#ef8d21]">
                        {t("blog")}
                    </h2>
                </div>
                {/* END Blog */}

                {/* Follow us */}
                <div></div>
                {/* End Follow us */}
            </div>

            {/* After HR */}
            <div className="border-t-[1px] border-[#bc8b3869] ml-[1rem] lg:ml-[3rem]"></div>
        </>
    );
};

export default Footer;
