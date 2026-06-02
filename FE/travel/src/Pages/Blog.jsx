import React, { useEffect, useState } from "react";
import { CgMail } from "react-icons/cg";
import { FaWhatsapp } from "react-icons/fa";
import ContactModal from "../Components/ContactModal";
import { imgGlobal } from "../assets/images";
import { useTranslation } from "react-i18next";

const Blog = () => {
    const {t} = useTranslation();
    const [openContactModal, setOpenContactModal] = useState(false);

    return (
        <>
            <div>
                <div className="relative">
                    <img
                        src={imgGlobal.bannerBlog}
                        alt="bannerBlog"
                        className="min-h-[180px] max-h-[300px] w-full object-cover"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-[#577b7c7d] z-[2]"></div>
                  <div className="text-white width-[50%] md:width-[40%] lg:width-[30%] absolute z-[300] left-5 top-1/2 -translate-y-1/2 lg:left-1/2 lg:top-1/2 lg:-translate-1/2 text-center">
                        <h2 className="font-semibold text-[#f5c289] text-[1rem] lg:text-[1.25rem] uppercase">{t("our_travel_blog")}</h2>
                        <h2 className="py-[0.5rem] font-marcellus text-[1.5rem] lg:text-[2.5rem] text-wrap font-bold">{t("inspiration_for")}</h2>
                        <h2 className="font_dancing text-[1rem] lg:text-[1.25rem] text-wrap">{t("stories")}</h2>
                  </div>
                </div>
                
                <div className="bg-[#fbf9f7] px-[1rem] lg:px-[3rem]">
                    {/* Most Read */}
                    <div>
                    </div>
                    {/* End most read */}
                </div>
            </div>

            {/* Floatting icon */}
            <div className="hidden lg:fixed bottom-4 right-4 flex flex-col gap-3 z-50">
                <div
                    onClick={() => openContactModal(true)}
                    className="bg-blue-600 text-white p-3 rounded-full shadow-lg cursor-pointer">
                    <CgMail />
                </div>

                <div className="bg-green-600 text-white p-3 rounded-full shadow-lg cursor-pointer">
                    <FaWhatsapp />
                </div>
            </div>

            {/* Modal */}
            <ContactModal open={openContactModal} onClose={() => setOpenContactModal(false)} />
        </>
    );
};

export default Blog;
