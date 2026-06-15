import React from "react";
import { useTranslation } from "react-i18next";
import { FaClock, FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TourCard = ({ tour }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <div
            className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer"
            onClick={() => navigate(`/tours/detail/${tour?.slug}`)}>
            {/* Image */}
            <div className="relative overflow-hidden">
                <img
                    src={tour?.featuredImageUrl}
                    alt={tour?.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Duration */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-sm font-medium">
                    <FaClock size={14} />
                    {tour?.durationDays + " " + t("days")}
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 min-h-[56px]">{tour?.title}</h3>

                <div className="flex items-center justify-between mt-5">
                    <div>
                        {/* <p className="text-xs uppercase tracking-wide text-gray-400">From</p> */}
                        <p className="text-2xl font-bold text-[#c39562]">${tour?.priceFrom}</p>
                    </div>

                    <button className="w-11 h-11 rounded-full bg-[#c39562] text-white flex items-center justify-center group-hover:translate-x-1 transition">
                        <FaLongArrowAltRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TourCard;
