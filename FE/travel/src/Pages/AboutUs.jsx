// PostCard.jsx
import React from "react";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
    const { t } = useTranslation();
    return (
        <>
           <div className="relative w-full max-h-[450px]">
                <img src="https://static.vecteezy.com/system/resources/previews/008/741/315/non_2x/asian-backpack-couple-tourist-holding-city-map-crossing-the-road-travel-people-vacation-lifestyle-concept-free-photo.jpg" alt="bannerBlog" className="w-full max-h-[450px] object-cover" />  
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white">
                </div>
           </div>
            <div className="bg-[#fcf5ef] w-full">

            </div>
        </>
    );
};

export default AboutUs;
