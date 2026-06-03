import React from "react";

const CardStyleHome = ({ style }) => {
    return (
        <div className="relative h-[200px] rounded-[2px] cursor-pointer">
            <img src={style?.icon_url} className="w-full h-full object-cover rounded-[2px]" alt={style?.id} />
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-t from-[#222222eb] to-transparent hover:bg-[#0f171a73]"></div>
            <div className="absolute -translate-x-1/2 left-1/2 bottom-2 text-white font-medium tracking-[1px]">
                {style?.style}
            </div>
        </div>
    );
};

export default CardStyleHome;
