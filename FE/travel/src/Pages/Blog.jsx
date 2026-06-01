import React, { useEffect, useState } from "react";
import { CgMail } from "react-icons/cg";
import { FaWhatsapp } from "react-icons/fa";

const Blog = () => {
    const [openContactModal, openopenContactModal] = useState(false)
    return (
        <>
        <div>
            
        </div>

        {/* Floatting icon */}
        <div className="hidden lg:fixed bottom-4 right-4 flex flex-col gap-3 z-50">
            <div
            onClick={() => openContactModal(true)}
            className="bg-blue-600 text-white p-3 rounded-full shadow-lg cursor-pointer"
            >
                <CgMail />
            </div>

            <div className="bg-green-600 text-white p-3 rounded-full shadow-lg cursor-pointer">
                <FaWhatsapp />
            </div>
      </div>

      {/* Modal */}
      <ContactModal open={openContactModal} onClose={() => setOpenContactModal(false)} />
      </>
    )
};

export default Blog;
