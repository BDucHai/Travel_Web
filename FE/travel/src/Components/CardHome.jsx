import React from "react";
import { useTranslation } from "react-i18next";
import { FaLongArrowAltRight } from "react-icons/fa";

const CardHome = ({ tour }) => {
    const { t } = useTranslation();
    return (
        <div className="relative flex flex-col w-full h-[22rem] lg:h-[28rem] border-[1px] border-[#3b97897d] rounded-[0.2rem] bg-white overflow-hidden">
            <div className="h-[45%] overflow-hidden">
                <img
                    src={tour?.img}
                    alt={tour?.id}
                    className="h-full w-full
                                    object-cover
                                    hover:scale-[110%]
                                    transition-all
                                    duration-500"
                />
            </div>
            <div className="absolute top-2 left-2 px-[0.5rem] py-[0.25rem] rounded-[0.2rem] bg-[#efb771cf] text-white font-semibold text-[0.7rem] uppercase">
                {tour?.slug}
            </div>
            <div className="flex-1 px-[0.5rem] lg:px-[0.8rem] py-[0.6rem] flex flex-col">
                <div className="text-[1rem] lg:text-[1.2rem]">{tour?.meta_title}</div>
                <div className="py-[0.1rem] lg:py-[0.5rem]">{tour?.duration_days}</div>
                <div className="bg-text-sub-content text-wrap text-ellipsis line-clamp-[4]">
                    {tour?.meta_description}
                </div>
                <div className="text-[0.85rem] text-wrap text-ellipsis line-clamp-[4]">{tour?.published_at}</div>
                <div className="flex items-center mt-auto uppercase text-[#d38518] font-bold cursor-pointer">
                    {t("viewTour")} <FaLongArrowAltRight className="ml-2" />
                </div>
            </div>
        </div>
    );
};

export default CardHome;
