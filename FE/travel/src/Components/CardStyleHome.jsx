import React from "react";
import { useNavigate } from "react-router-dom";

const CardStyleHome = ({ style }) => {
    const navigate = useNavigate();
    return (
        <div
            className="relative h-[180px] md:h-[250px] rounded-[2px] cursor-pointer"
            onClick={() => navigate(`/tours?styleSlug=${style?.slug}`)}>
            <img src={style?.image} className="w-full h-full object-cover rounded-[2px]" alt={style?.id} />
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-t from-[#3b383880] to-transparent hover:bg-[#0f171a73]"></div>
            <div className="absolute -translate-x-1/2 left-1/2 bottom-2 text-white font-medium text-[0.85rem] lg:text-[1.2rem]">
                {style?.style}
            </div>
        </div>
    );
};

export default CardStyleHome;
