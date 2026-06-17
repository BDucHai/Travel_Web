import React, { useState } from "react";
import Banner from "../Components/Banner";
import CardHome from "../Components/CardHome";
import { useTranslation } from "react-i18next";
import { imgReason, styleImg } from "../assets/images";
import { motion } from "framer-motion";
import CardStyleHome from "../Components/CardStyleHome";
import CommentCard from "../Components/CommentCard";
import { RiArrowLeftFill } from "react-icons/ri";
import { RiArrowRightFill } from "react-icons/ri";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { getTours } from "../api/Tour";
import { getReviews } from "../api/Review";
import { useAuth } from "../contexts/AuthContext";
import { Backdrop, CircularProgress } from "@mui/material";

const Home = () => {
    const { t } = useTranslation();
    const { lang } = useAuth();
    const [touchStart, setTouchStart] = useState(0);

    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(0);

    const { data: tours, isLoading: loadingTour } = useSWR(["/tours", { page: 0, limit: 4, lang: lang }], ([_, params]) => getTours(params));

    const styleTourShow = [
        {
            id: 1,
            style: "CULTURAL",
            image: styleImg.cultural,
            description: "Discover Vietnam's heritage, traditions and local life.",
            slug: "cultural-tours",
        },
        {
            id: 2,
            style: "FAMILY",
            image: styleImg.familyStyle,
            description: "Fun and comfortable trips for all generations.",
            slug: "family-holidays",
        },
        {
            id: 3,
            style: "NATURE",
            image: styleImg.natureStyle,
            description: "Explore mountains, waterfalls and natural wonders.",
            slug: "nature-adventure",
        },
        {
            id: 4,
            style: "HONEYMOON",
            image: styleImg.honeymoonStyle,
            description: "Romantic escapes designed for couples.",
            slug: "honeymoon-tours",
        },
        {
            id: 5,
            style: "FOOD",
            image: styleImg.foodStyle,
            description: "Taste authentic Vietnamese cuisine.",
            slug: "food-culinary-tours",
        },
        {
            id: 6,
            style: "LUXURY",
            image: styleImg.adventureStyle,
            description: "Exciting journeys and unforgettable experiences.",
            slug: "luxury-travel",
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
            img: imgReason.authentic,
            title: t("authentic_immersion"),
            description: t("authentic_immersion_desc"),
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
            img: imgReason.plant,
            title: t("responsible"),
            description: t("responsible_desc"),
        },
    ];

    const { data: commentData, isLoading: loadingComment } = useSWR(["/testimonials", { page: 0, limit: 9 }], ([url, params]) =>
        getReviews(url, params),
    );

    const isLargeScreen = useMediaQuery("(min-width:1024px)");

    const chunkSize = isLargeScreen ? 3 : 2;

    const slides = [];
    for (let i = 0; i < commentData?.length; i += chunkSize) {
        slides.push(commentData?.slice(i, i + chunkSize));
    }

    const totalSlides = Math.ceil(commentData?.length / chunkSize);

    return (
        <>
            <Banner />
            {/* TOp pick tour, style ,why reverse, clinet say 0.85 and 1.3 */}
            <div className="pb-[1rem] lg:pb-[2rem] text-[0.85rem] lg:text-[1rem] bg-[#f9f7f4]">
                <div className="text-center mb-[1rem] pb-[0.5rem] pt-[2.5rem] text-[1rem] lg:text-[1.5rem] text-[#000000c9] tracking-[1.5px] font-semibold font-inter uppercase">
                    {t("top_pick_tour")}

                    <hr className="mx-auto mt-[0.5rem] w-[4rem] border-2 text-[#efb771]" />
                </div>
                <motion.div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 px-[2rem] md:px-[5rem] lg:px-[8rem]"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.1 }}>
                    {tours?.data?.map((t) => (
                        <CardHome tour={t} />
                    ))}
                </motion.div>
                <div className="flex-box-center mt-[1.5rem]">
                    <div
                        className="px-[3rem] py-[0.5rem] border-[2px] border-[#d38518] text-[#d38518] font-semibold uppercase cursor-pointer hover:bg-[#c39562] hover:text-white"
                        onClick={() => navigate("/tour")}>
                        {t("view_all_tour")}
                    </div>
                </div>

                <hr className="mt-[1.5rem] text-[#bc8b3869]" />
                {/* Tour By Style */}
                <div className="text-center mt-[2rem] mb-[1rem] py-[0.5rem] text-[1rem] lg:text-[1.5rem] text-[#000000c9] tracking-[1.5px] font-semibold font-inter uppercase">
                    {t("tour_by_style")}

                    <hr className="mx-auto mt-[0.5rem] w-[4rem] border-2 text-[#efb771]" />
                </div>
                <motion.div
                    className="grid grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4 px-[2rem] md:px-[5rem] lg:px-[8rem]"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}>
                    {styleTourShow.map((t) => (
                        <CardStyleHome style={t} />
                    ))}
                </motion.div>
                <div className="flex-box-center mt-[1.5rem]">
                    <div
                        className="px-[3rem] py-[0.5rem] border-[2px] border-[#d38518] text-[#d38518] font-semibold uppercase cursor-pointer hover:bg-[#c39562] hover:text-white"
                        onClick={() => navigate("/styles")}>
                        {t("explore_style")}
                    </div>
                </div>
                {/* End toủ by style */}

                <hr className="mt-[1.5rem] text-[#bc8b3869]" />

                {/* REASON CHOOSE INDOCHINE */}
                <div className="text-center mt-[2rem] mb-[1rem] py-[0.5rem] text-[1rem] lg:text-[1.5rem] text-[#000000c9] tracking-[1.5px] font-semibold font-inter uppercase">
                    {t("reason_choose")}

                    <hr className="mx-auto mt-[0.5rem] w-[4rem] border-2 text-[#efb771]" />
                </div>
                <motion.div
                    className="grid grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 px-[2rem] md:px-[5rem] lg:px-[8rem]"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}>
                    {reason.map((t) => (
                        <div className="flex items-center justify-start flex-col">
                            <img src={t?.img} alt={t?.title} className="w-[60px] h-[60px]" />
                            <div className="text-wrap font-bold text-center mb-[0.5rem]">{t?.title}</div>
                            <div className="bg-text-sub-content text-center">{t?.description}</div>
                        </div>
                    ))}
                </motion.div>

                {/* End Reason chossse indochine */}
                <hr className="mt-[1.5rem] text-[#bc8b3869]" />

                {/* CLient say  */}
                <div className="text-center mt-[2rem] mb-[1rem] py-[0.5rem] text-[1rem] lg:text-[1.5rem] text-[#000000c9] tracking-[1.5px] font-semibold font-inter uppercase">
                    {t("reason_choose")}

                    <hr className="mx-auto mt-[0.5rem] w-[4rem] border-2 text-[#efb771]" />
                </div>
                <div
                    className="relative w-full overflow-hidden"
                    onTouchStart={(e) => {
                        setTouchStart(e.touches[0].clientX);
                    }}
                    onTouchEnd={(e) => {
                        const touchEnd = e.changedTouches[0].clientX;

                        const distance = touchStart - touchEnd;

                        if (distance > 50) {
                            setCurrentIndex((prev) => (prev === 2 ? 0 : prev + 1));
                        }

                        if (distance < -50) {
                            setCurrentIndex((prev) => (prev === 0 ? 2 : prev - 1));
                        }
                    }}>
                    <motion.div
                        className="flex"
                        animate={{
                            x: `-${currentIndex * 100}%`,
                        }}
                        transition={{ duration: 0.25, ease: "easeOut" }}>
                        {slides.map((group, index) => (
                            <div
                                key={index}
                                className="min-w-full grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 px-[2rem] md:px-[5rem] lg:px-[8rem]">
                                {group.map((comment, i) => (
                                    <CommentCard key={i} comment={comment} />
                                ))}
                            </div>
                        ))}
                    </motion.div>
                    <div
                        onClick={() => setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))}
                        className="absolute left-4 lg:left-14 top-1/2 -translate-y-1/2 bg-black/40 text-white px-4 py-2 rounded-full text-[0.75rem] lg:text-[1.5rem] cursor-pointer">
                        <RiArrowLeftFill />
                    </div>

                    <div
                        onClick={() => setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))}
                        className="absolute right-4 lg:right-14 top-1/2 -translate-y-1/2 bg-black/40 text-white px-4 py-2 rounded-full text-[0.75rem] lg:text-[1.5rem] cursor-pointer">
                        <RiArrowRightFill />
                    </div>
                </div>
                <div className="flex-box-center mt-[1.5rem]">
                    <div
                        className="px-[3rem] py-[0.5rem] border-[2px] border-[#d38518] text-[#d38518] font-semibold uppercase cursor-pointer hover:bg-[#c39562] hover:text-white"
                        onClick={() => navigate("/review")}>
                        {t("review_see_all")}
                    </div>
                </div>
                {/* End client say */}
                <Backdrop
                    open={loadingTour || loadingComment}
                    sx={{
                        color: "#fff",
                        zIndex: (theme) => theme.zIndex.drawer + 9999,
                        backgroundColor: "rgba(0,0,0,0.35)",
                    }}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        </>
    );
};

export default Home;
