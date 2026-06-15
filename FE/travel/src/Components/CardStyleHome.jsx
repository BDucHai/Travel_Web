import React from "react";
import { useNavigate } from "react-router-dom";

const CardStyleHome = ({ style }) => {
    const navigate = useNavigate();
    return (
        <div
            className="relative h-[200px] rounded-[2px] cursor-pointer"
            onClick={() => navigate(`/tours?styleSlug=${style?.slug}`)}>
            <img src={style?.image} className="w-full h-full object-cover rounded-[2px]" alt={style?.id} />
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-t from-[#222222eb] to-transparent hover:bg-[#0f171a73]"></div>
            <div className="absolute -translate-x-1/2 left-1/2 bottom-2 text-white font-medium tracking-[1px]">
                {style?.style}
            </div>
        </div>
    );
};

export default CardStyleHome;
