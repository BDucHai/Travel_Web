// PostCard.jsx
import ListItem from "@mui/material/ListItem";
import React from "react";
import { useTranslation } from "react-i18next";
import { imgReason } from "../assets/images";

const AboutUs = () => {
    const { t } = useTranslation();

    const ourPhilosophy = [
        {
                    img: imgReason.holidayVillage,
                    title: t("aboutUs.authentic"),
                    description: t("aboutUs.authentic_desc"),
                },
                {
                    img: imgReason.expertise,
                    title: t("aboutUs.personal"),
                    description: t("aboutUs.personal_desc"),
                },
                {
                    img: imgReason.authentic,
                    title: t("aboutUs.meaningful"),
                    description: t("aboutUs.meaningful_desc"),
                },
                {
                    img: imgReason.diamond,
                    title: t("aboutUs.responsible"),
                    description: t("aboutUs.responsible_desc"),
                },
    ]
    return (
        <>
           <div className="relative w-full max-h-[450px] text-[1rem]">
                <img src="https://static.vecteezy.com/system/resources/previews/008/741/315/non_2x/asian-backpack-couple-tourist-holding-city-map-crossing-the-road-travel-people-vacation-lifestyle-concept-free-photo.jpg" alt="bannerBlog" className="w-full max-h-[450px] object-cover" />  
                <div className="absolute h-full w-[80%] lg:w-[30%] top-0 left-0 bg-gradient-to-r from-black/70 to-transparent z-10"></div>
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white w-[80%] lg:w-[30%] z-[30]">
                    <div className="py-[0.5rem] font-marcellus text-[1.5rem] lg:text-[2.5rem] text-wrap font-bold">{t("aboutUs.craft")}</div>
                    <div className="font_dancing lg:text-[1.25rem] text-wrap">{t("aboutUs.craft_desc")}</div>
                </div>
           </div>
            <div className="bg-[#fcf5ef] w-full px-[1rem] lg:px-[3rem] pb-[4rem]">
                  <div className="mt-[2rem] mb-[1rem] py-[0.5rem] lg:text-[1.5rem] text-[#000000c9] tracking-[1.5px] font-semibold uppercase">
                            {t("aboutUs.our_story")}
                            <hr className="mt-[0.5rem] w-[4rem] border-2 text-[#efb771]" />
                    </div>
                    <div className="text-wrap">{t("aboutUs.content_ourStory")}</div>

                    {/* Our philosofie */}
                    <div className="mt-[2rem] mb-[1rem] py-[0.5rem] lg:text-[1.5rem] text-[#000000c9] tracking-[1.5px] font-semibold uppercase">
                            {t("aboutUs.our_philosophy")}
                            <hr className="mt-[0.5rem] w-[4rem] border-2 text-[#efb771]" />
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 px-[2rem] md:px-[5rem] lg:px-[8rem]">
                        {ourPhilosophy?.map((t, index) =>(
                            <div className="flex-box-center flex-col border-[1px] border-[#efb771] rounded-lg p-[1rem]" key={index}>
                            <img src={t?.img} alt={t?.title} className="w-[60px] h-[60px]" />
                            <div className="text-wrap font-bold text-center mb-[0.5rem]">{t?.title}</div>
                            <div className="text-center">{t?.description}</div>
                        </div>
                        ))}
                    </div>
            </div>
        </>
    );
};

export default AboutUs;
