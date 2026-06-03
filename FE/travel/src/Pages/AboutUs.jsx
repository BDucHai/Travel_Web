// PostCard.jsx
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
            img: imgReason.talk,
            title: t("aboutUs.personal"),
            description: t("aboutUs.personal_desc"),
        },
        {
            img: imgReason.mountain,
            title: t("aboutUs.meaningful"),
            description: t("aboutUs.meaningful_desc"),
        },
        {
            img: imgReason.plant,
            title: t("aboutUs.responsible"),
            description: t("aboutUs.responsible_desc"),
        },
    ];

    const reason = [
        {
            img: imgReason.tailor,
            title: t("tailor"),
            description: t("tailor_desc"),
        },
        {
            img: imgReason.expertise,
            title: t("local_expertise"),
            description: t("local_expertise_desc"),
        },
        {
            img: imgReason.diamond,
            title: t("quanlity_comfort"),
            description: t("quanlity_comfort_desc"),
        },
        {
            img: imgReason.handshake,
            title: t("trusted"),
            description: t("trusted_desc"),
        },
        {
            img: imgReason.holidayVillage,
            title: t("authentic_immersion"),
            description: t("authentic_immersion_desc"),
        },
        {
            img: imgReason.userConnect,
            title: t("aboutUs.network_oversea"),
            description: t("aboutUs.network_oversea_desc"),
        },

        {
            img: imgReason.plant,
            title: t("responsible"),
            description: t("responsible_desc"),
        },
    ];

    const member = [
        {
            id: 1,
            img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg",
            name: "Phuong Hoang",
            role: "Representative in Vietnam",
            description:
                "Been with the company since 2006, Mai set the example of pursuing a determined career path by getting hands on with various roles within the company including operations, customer services and management. Throughout the years, Mai has acquired extensive knowledge and experiences of tourism offerings and services in",
        },
        {
            id: 2,
            img: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg",
            name: "Mr Manh Hoa NGUYEN",
            role: "Founder",
        },
    ];

    return (
        <>
            <div className="relative w-full max-h-[450px] text-[1rem]">
                <img
                    src="https://static.vecteezy.com/system/resources/previews/008/741/315/non_2x/asian-backpack-couple-tourist-holding-city-map-crossing-the-road-travel-people-vacation-lifestyle-concept-free-photo.jpg"
                    alt="bannerBlog"
                    className="w-full max-h-[450px] object-cover"
                />
                <div className="absolute h-full w-[80%] lg:w-[50%] top-0 left-0 bg-gradient-to-r from-black/70 to-transparent z-10"></div>
                <div className="absolute left-5 left-[2.5rem] top-1/2 -translate-y-1/2 text-white w-[80%] lg:w-[30%] z-[30]">
                    <div className="py-[0.5rem] font-marcellus text-[1.5rem] lg:text-[2.5rem] text-wrap font-bold">
                        {t("aboutUs.craft")}
                    </div>
                    <div className="font_dancing lg:text-[1.25rem] text-wrap">{t("aboutUs.craft_desc")}</div>
                </div>
            </div>
            <div className="bg-[#fcf5ef] w-full px-[3rem] lg:px-[3rem] pb-[4rem]">
                {/* Our story */}
                <div className="pt-[3rem] mb-[1rem] py-[0.5rem] text-[1.25rem] lg:text-[2rem] text-[#06575fc9] tracking-[1.5px] font-semibold uppercase">
                    {t("aboutUs.our_story")}
                    <hr className="mt-[0.5rem] w-[4rem] border-2 text-[#efb771]" />
                </div>
                <div className="text-wrap whitespace-pre-wrap px-[0.5rem]">{t("aboutUs.content_ourStory")}</div>
                {/* Our philosofie */}
                <div className="mt-[2rem] mb-[1rem] py-[0.5rem] text-[1.25rem] lg:text-[2rem] text-[#06575fc9] tracking-[1.5px] font-semibold uppercase">
                    {t("aboutUs.our_philosophy")}
                    <hr className="mt-[0.5rem] w-[4rem] border-2 text-[#efb771]" />
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:px-[1.5rem] xl:px-[5rem]">
                    {ourPhilosophy?.map((t, index) => (
                        <div
                            className="flex items-center justify-start flex-col border-[1px] border-[#efb771] rounded-lg p-[1rem]"
                            key={index}>
                            <img src={t?.img} alt={t?.title} className="w-[60px] h-[60px]" />
                            <div className="text-wrap font-bold text-center mb-[0.5rem]">{t?.title}</div>
                            <div className="text-center">{t?.description}</div>
                        </div>
                    ))}
                </div>

                {/* Reason chosse Indochina */}
                <div className="text-center mt-[3.5rem] mb-[1rem] py-[0.5rem] text-[1.25rem] lg:text-[2rem] text-[#000] tracking-[1.5px] font-semibold font-inter uppercase">
                    {t("reason_choose")}

                    <hr className="mx-auto mt-[0.5rem] w-[4rem] border-2 text-[#efb771]" />
                </div>
                <div className="grid grid-cols-3 lg:grid-cols-7 gap-3 md:gap-4 lg:px-[1.5rem] xl:px-[3rem]">
                    {reason.map((t) => (
                        <div className="flex items-center justify-start flex-col">
                            <img src={t?.img} alt={t?.title} className="w-[60px] h-[60px]" />
                            <div className="text-wrap font-bold text-center mb-[1rem]">{t?.title}</div>
                            <div className="bg-text-sub-content text-center">{t?.description}</div>
                        </div>
                    ))}
                </div>

                {/* Meet team */}
                <div className="text-center mt-[3.5rem] mb-[1rem] py-[0.5rem] text-[1.25rem] lg:text-[2rem] text-[#000] tracking-[1.5px] font-semibold font-inter uppercase">
                    {t("aboutUs.meet_team")}

                    <hr className="mx-auto mt-[0.5rem] w-[4rem] border-2 text-[#efb771]" />
                </div>
                <div className="flex gap-[1.5rem] lg:gap-[4rem] lg:px-[1rem] xl:px-[2rem]">
                    {member.map((item) => (
                        <div key={item.id} className=" flex-1 flex flex-col lg:flex-row gap-[2rem] items-start">
                            {/* Image */}
                            <div className="w-[5rem] h-[5rem] shrink-0">
                                <img
                                    src={item?.img}
                                    alt={item?.name}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="text-[1.5rem] font-[500]">{item?.name}</div>

                                <div className="text-[#d48b32]">{item?.role}</div>

                                <div className="text-justify leading-[2rem]">{item?.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AboutUs;
