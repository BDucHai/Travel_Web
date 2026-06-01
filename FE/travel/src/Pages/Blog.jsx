import React, { useEffect, useState } from "react";
import { CgMail } from "react-icons/cg";
import { FaWhatsapp } from "react-icons/fa";
import ContactModal from "../Components/ContactModal";
import { imgGlobal } from "../assets/images";

const Blog = () => {
    const [openContactModal, setOpenContactModal] = useState(false);

    return (
        <>
            <div>
                <img
                    src={imgGlobal.bannerBlog}
                    alt="bannerBlog"
                    className="relative min-h-[200px] max-h-[3000px] lg:min-h-[300px] lg:max-h-[400px] w-full object-cover"
                />
                {/* Most Read */}
                <div className="bg-[#fbf9f7]"></div>
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
