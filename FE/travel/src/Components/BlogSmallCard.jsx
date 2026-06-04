// PostCard.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { CiCalendar } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const BlogSmallCard = ({ blog }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="bg-white shadow-md rounded-md overflow-hidden border border-gray-200 cursor-pointer hover:bg-[#55646821]"
            onClick={() => {
                navigate("/blog/detail");
            }}>
            <img src={blog?.image} alt={blog?.title} className="w-full h-[10rem] lg:h-[12rem] object-cover" />

            {/* Nội dung */}
            <div className="px-4 pt-4 pb-2 flex flex-col justify-between">
                {/* Guide */}
                <p className="text-xs text-[#f27000]">{blog?.guide}</p>
                <h3 className="text-lg font-semibold">{blog?.title}</h3>
            </div>
            <div className="flex items-center text-[0.7rem] text-dark mt-2 p-4">
                <span className="flex items-center mr-[0.8rem]">
                    <CiCalendar className="mr-[0.2rem]" /> {blog?.date}
                </span>
                <span className="flex items-center">
                    <FaEye className="mr-[0.2rem]" /> {blog?.views} {t("view")}
                </span>
            </div>
        </motion.div>
    );
};

export default BlogSmallCard;
