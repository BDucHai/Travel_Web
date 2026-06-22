// PostCard.jsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { imgReason } from "../assets/images";
import ContactModal from "../Components/ContactModal";

import Avatar from "@mui/material/Avatar";
import useSWR from "swr";
import { getActiveUser } from "../api/User";
import { Tooltip } from "@mui/material";

const AboutUs = () => {
    const { t } = useTranslation();

    const [openContactModal, setOpenContactModal] = useState(false);

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

    const { data: member } = useSWR("/auth/active-customers", getActiveUser);

    const representativeFrance = [
        {
            img: imgReason.chat,
            title: t("aboutUs.local_support"),
            description: t("aboutUs.local_support_desc"),
        },
        {
            img: imgReason.date,
            title: t("aboutUs.personal_assistance"),
            description: t("aboutUs.personal_assistance_desc"),
        },
        {
            img: imgReason.handshake,
            title: t("aboutUs.peace"),
            description: t("aboutUs.peace_desc"),
        },
        {
            img: imgReason.headphone,
            title: t("aboutUs.avaiable"),
            description: t("aboutUs.avaiable_desc"),
        },

        {
            img: imgReason.people,
            title: t("aboutUs.trusted"),
            description: t("aboutUs.trusted_desc"),
        },
        {
            img: imgReason.security,
            title: t("aboutUs.satisfaction"),
            description: t("aboutUs.satisfaction_desc"),
        },
    ];
    return (
        <>
            <div className="relative w-full max-h-[450px] text-[1rem]">
                <img
                    src="https://static.vecteezy.com/system/resources/previews/008/741/315/non_2x/asian-backpack-couple-tourist-holding-city-map-crossing-the-road-travel-people-vacation-lifestyle-concept-free-photo.jpg"
                    alt="bannerBlog"
                    className="w-full min-h-[100px] lg:min-h-[300px] max-h-[200px] lg:max-h-[400px] object-cover"
                />
                <div className="absolute h-full w-[100%] lg:w-[50%] top-0 left-0 bg-gradient-to-r from-black/70 to-transparent z-10"></div>
                <div className="absolute left-5 left-[2.5rem] top-1/2 -translate-y-1/2 text-white w-[80%] lg:w-[30%] z-[30]">
                    <div className="py-[0.5rem] font-marcellus text-[1.5rem] lg:text-[2.5rem] text-wrap font-bold">
                        {t("aboutUs.craft")}
                    </div>
                    <div className="font-dancing lg:text-[1.25rem] text-wrap">{t("aboutUs.craft_desc")}</div>
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
                            className="flex items-center justify-start flex-col border-[1px] border-[#8d8f87] bg-[#fff] rounded-lg p-[1rem]"
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
                        <div className="flex items-center justify-start flex-col border-[1px] border-[#8d8f87] rounded-sm bg-[#fff] py-[1rem] px-[0.5rem]">
                            <img src={t?.img} alt={t?.title} className="w-[60px] h-[60px]" />
                            <div className="text-wrap font-bold text-center mb-[1rem]">{t?.title}</div>
                            <div className="bg-text-sub-content text-center">{t?.description}</div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-start border-1 border-[#8d8f87] p-[0.2rem] mt-[1rem] rounded-[2px]">
                    <div className="hidden lg:block w-[40%]">
                        <img
                            src="https://media.istockphoto.com/id/484682530/photo/eiffel-tower.jpg?s=612x612&w=0&k=20&c=p1wanuEM4WUZzomo6R9S2OwOktShdga-YNpnnl4ao7I="
                            alt="france"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="lg:px-[1.5rem] xl:px-[3rem] py-[0.25rem]">
                        <div className="text-[1.5rem] text-[#0e6387] font-semibold mb-[1rem] font-inter">
                            {t("aboutUs.representative_france")}
                        </div>
                        <div className="flex-1 grid grid-cols-3 gap-6">
                            {representativeFrance.map((t) => (
                                <div className="flex justify-start items-start">
                                    <img src={t?.img} alt={t?.title} className="w-[60px] h-[60px]" />
                                    <div>
                                        <div className="text-wrap font-bold text-center mb-[0.25rem]">{t?.title}</div>
                                        <div className="text-wrap bg-text-sub-content text-center">
                                            {t?.description}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="lg:px-[1.5rem] xl:px-[3rem] mt-[1.5rem] text-center">
                    <div className="font-bold">{t("aboutUs.with_us")}</div>
                    <div className="text-[1.5rem] text-[#db7e0b] font-dancing">{t("aboutUs.let_create")}</div>
                </div>

                {/* Meet team */}
                <div className="text-center mt-[3.5rem] mb-[1rem] py-[0.5rem] text-[1.25rem] lg:text-[2rem] text-[#000] tracking-[1.5px] font-semibold font-inter uppercase">
                    {t("aboutUs.meet_team")}

                    <hr className="mx-auto mt-[0.5rem] w-[4rem] border-2 text-[#efb771]" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-[1.5rem] lg:gap-[4rem] lg:px-[1rem] xl:px-[2rem]">
                    {member?.map((item) => (
                        <div key={item?.id} className=" flex-1 flex flex-col lg:flex-row gap-[2rem] items-start overflow-clip">
                            {/* Image */}
                            {item?.avatarUrl ?  <div className="w-[5rem] h-[5rem] shrink-0">
                                <img
                                    src={item?.avatarUrl}
                                    alt={item?.fullName}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div> : <div className="w-full h-full rounded-full object-cover"><Avatar>{item?.fullName?.charAt(0)}</Avatar></div>}
                           
                            <div className="flex flex-col gap-2">
                                <div className="text-[1rem] font-[500]">{item?.fullName}</div>

                                {/* <div className="text-[#d48b32]">{item?.roles?.join(",")}</div> */}

                                <Tooltip title={item?.email}><div className="text-justify leading-[2rem]">{item?.email}</div></Tooltip>
                                <Tooltip title={item?.phone}><div className="text-justify leading-[2rem]">{item?.phone}</div></Tooltip>
                            </div>
                        </div>
                    ))}
                </div>

                <hr className="mt-[2rem] text-[#bc8b3869]" />

                {/* Last CTA */}
                <div className="bg-[#f5f5f5] p-6 text-center">
                    {/* Tiêu đề */}
                    <h2 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-6 font-inter">
                        {t("aboutUs.ready")}
                    </h2>

                    {/* Nút CTA */}
                    <button
                        className="bg-[#12acb3] hover:bg-[#e98f21] hover:scale-[105%] transition-all duration-150 text-white font-semibold py-3 px-8 rounded-md shadow-md transition duration-300 cursor-pointer"
                        onClick={() => setOpenContactModal(true)}>
                        {t("aboutUs.plan_my_trip")}
                    </button>
                </div>
            </div>

            {/* Modal */}
            <ContactModal t={t} open={openContactModal} onClose={() => setOpenContactModal(false)} />
        </>
    );
};

export default AboutUs;
