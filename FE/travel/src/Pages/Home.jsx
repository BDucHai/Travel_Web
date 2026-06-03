import React, { useEffect, useState } from "react";
import Banner from "../Components/Banner";
import CardHome from "../Components/CardHome";
import { useTranslation } from "react-i18next";
import { imgCardSample, imgReason } from "../assets/images";
import { motion } from "framer-motion";
import CardStyleHome from "../Components/CardStyleHome";
import CommentCard from "../Components/CommentCard";
import { RiArrowLeftFill } from "react-icons/ri";
import { RiArrowRightFill } from "react-icons/ri";
import useMediaQuery from "@mui/material/useMediaQuery";

const Home = () => {
    const { t } = useTranslation();

    const [touchStart, setTouchStart] = useState(0);

    const [currentIndex, setCurrentIndex] = useState(0);

    const [tour, setTour] = useState([
        {
            id: 1,
            img: imgCardSample.cardSample,
            meta_title: "Essential VietNam",
            meta_description: "Discoer the hightlight vietnam from hanoi to HCM City with memorable expoeriences",
            duration_days: "10 Days / 9 Nights",
            slug: "Best Seller",
            published_at: "May 20, 2026",
        },
        {
            id: 2,
            img: imgCardSample.cardSample,
            meta_title: "Essential VietNam",
            meta_description: "Discoer the hightlight vietnam from hanoi to HCM City with memorable expoeriences",
            duration_days: "10 Days / 9 Nights",
            slug: "Best Seller",
            published_at: "May 20, 2026",
        },
        {
            id: 3,
            img: imgCardSample.cardSample,
            meta_title: "Essential VietNam",
            meta_description: "Discoer the hightlight vietnam from hanoi to HCM City with memorable expoeriences",
            duration_days: "10 Days / 9 Nights",
            slug: "Popular",
            published_at: "May 20, 2026",
        },
        {
            id: 4,
            img: imgCardSample.cardSample,
            meta_title: "Essential VietNam",
            meta_description: "Discoer the hightlight vietnam from hanoi to HCM City with memorable expoeriences",
            duration_days: "10 Days / 9 Nights",
            slug: "Best Seller",
            published_at: "May 20, 2026",
        },
    ]);

    const styleTourShow = [
        {
            id: 1,
            style: "CULTURAL",
            icon_url:
                "https://thumbs.dreamstime.com/z/travel-to-vietnam-set-traditional-vietnamese-cultural-symbols-landmarks-lifestyle-people-76776500.jpg",
        },
        {
            id: 2,
            style: "FAMILY",
            icon_url:
                "https://kenh14cdn.com/thumb_w/660/203336854389633024/2022/8/19/photo-4-16608980245191078217063.jpg",
        },
        {
            id: 3,
            style: "NATURE",
            icon_url: "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2020/03/thac-nuoc-cao-bang.jpg",
        },
        {
            id: 4,
            style: "HONEYMOON",
            icon_url: "https://riversidepalace.vn/multidata/0-du-lich-trang-mat.jpg",
        },
        {
            id: 5,
            style: "FOOD",
            icon_url: "https://images.vietnamtourism.gov.vn/vn//images/2024/thang_1/pho_bo.jpg",
        },
        {
            id: 6,
            style: "AND MORE",
            icon_url: "https://dulichtoday.vn/wp-content/uploads/2017/04/dao-Phu-Quoc.jpg",
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

    const commentTest = [
        {
            id: 1,
            content:
                "This place is truly a hidden gem for travelers. With its stunning natural scenery, peaceful atmosphere, and rich local culture, it offers an unforgettable experience. Whether you’re exploring the landscapes, enjoying the food, or simply relaxing, every moment here feels special. It’s the perfect destination for anyone looking to escape the busy city and reconnect with nature.",
            rating: 5,
            name: "Jessica M.",
            country: "Australia",
            date: "06/25/2026",
            img: "https://thf.bing.com/th/id/OIP.zwFcHylMP8dnd3O64uj8HQHaE7?cb=thfc1falcon&rs=1&pid=ImgDetMain&o=7&rm=3",
        },
        {
            id: 2,
            content:
                "A beautiful destination that leaves a lasting impression from the very first moment. Surrounded by breathtaking views and a calm, refreshing vibe, it’s an ideal place to unwind and explore. The friendly locals and unique cultural touch make the experience even more memorable. A perfect spot for a relaxing and inspiring getaway.",
            rating: 5,
            name: "Mark T.",
            country: "United Kingdom",
            date: "06/25/2026",
            img: "https://thf.bing.com/th/id/OIP.zwFcHylMP8dnd3O64uj8HQHaE7?cb=thfc1falcon&rs=1&pid=ImgDetMain&o=7&rm=3",
        },
        {
            id: 3,
            content:
                "This place is truly a hidden gem for travelers. With its stunning natural scenery, peaceful atmosphere, and rich local culture, it offers an unforgettable experience. Whether you’re exploring the landscapes, enjoying the food, or simply relaxing, every moment here feels special. It’s the perfect destination for anyone looking to escape the busy city and reconnect with nature.",
            rating: 5,
            name: "Sofia L.",
            country: "France",
            date: "06/25/2026",
            img: "https://thf.bing.com/th/id/OIP.zwFcHylMP8dnd3O64uj8HQHaE7?cb=thfc1falcon&rs=1&pid=ImgDetMain&o=7&rm=3",
        },
        {
            id: 7,
            content:
                "This place is truly a hidden gem for travelers. With its stunning natural scenery, peaceful atmosphere, and rich local culture, it offers an unforgettable experience. Whether you’re exploring the landscapes, enjoying the food, or simply relaxing, every moment here feels special. It’s the perfect destination for anyone looking to escape the busy city and reconnect with nature.",
            rating: 5,
            name: "Jessica M.",
            country: "Australia",
            date: "06/25/2026",
            img: "https://thf.bing.com/th/id/OIP.zwFcHylMP8dnd3O64uj8HQHaE7?cb=thfc1falcon&rs=1&pid=ImgDetMain&o=7&rm=3",
        },
        {
            id: 8,
            content:
                "A beautiful destination that leaves a lasting impression from the very first moment. Surrounded by breathtaking views and a calm, refreshing vibe, it’s an ideal place to unwind and explore. The friendly locals and unique cultural touch make the experience even more memorable. A perfect spot for a relaxing and inspiring getaway.",
            rating: 5,
            name: "Mark T.",
            country: "United Kingdom",
            date: "06/25/2026",
            img: "https://thf.bing.com/th/id/OIP.zwFcHylMP8dnd3O64uj8HQHaE7?cb=thfc1falcon&rs=1&pid=ImgDetMain&o=7&rm=3",
        },
        {
            id: 9,
            content:
                "This place is truly a hidden gem for travelers. With its stunning natural scenery, peaceful atmosphere, and rich local culture, it offers an unforgettable experience. Whether you’re exploring the landscapes, enjoying the food, or simply relaxing, every moment here feels special. It’s the perfect destination for anyone looking to escape the busy city and reconnect with nature.",
            rating: 5,
            name: "Sofia L.",
            country: "France",
            date: "06/25/2026",
            img: "https://thf.bing.com/th/id/OIP.zwFcHylMP8dnd3O64uj8HQHaE7?cb=thfc1falcon&rs=1&pid=ImgDetMain&o=7&rm=3",
        },
        {
            id: 4,
            content:
                "This place is truly a hidden gem for travelers. With its stunning natural scenery, peaceful atmosphere, and rich local culture, it offers an unforgettable experience. Whether you’re exploring the landscapes, enjoying the food, or simply relaxing, every moment here feels special. It’s the perfect destination for anyone looking to escape the busy city and reconnect with nature.",
            rating: 5,
            name: "Jessica M.",
            country: "Australia",
            date: "06/25/2026",
            img: "https://thf.bing.com/th/id/OIP.zwFcHylMP8dnd3O64uj8HQHaE7?cb=thfc1falcon&rs=1&pid=ImgDetMain&o=7&rm=3",
        },
        {
            id: 5,
            content:
                "A beautiful destination that leaves a lasting impression from the very first moment. Surrounded by breathtaking views and a calm, refreshing vibe, it’s an ideal place to unwind and explore. The friendly locals and unique cultural touch make the experience even more memorable. A perfect spot for a relaxing and inspiring getaway.",
            rating: 5,
            name: "Mark T.",
            country: "United Kingdom",
            date: "06/25/2026",
            img: "https://thf.bing.com/th/id/OIP.zwFcHylMP8dnd3O64uj8HQHaE7?cb=thfc1falcon&rs=1&pid=ImgDetMain&o=7&rm=3",
        },
        {
            id: 6,
            content:
                "This place is truly a hidden gem for travelers. With its stunning natural scenery, peaceful atmosphere, and rich local culture, it offers an unforgettable experience. Whether you’re exploring the landscapes, enjoying the food, or simply relaxing, every moment here feels special. It’s the perfect destination for anyone looking to escape the busy city and reconnect with nature.",
            rating: 5,
            name: "Sofia L.",
            country: "France",
            date: "06/25/2026",
            img: "https://thf.bing.com/th/id/OIP.zwFcHylMP8dnd3O64uj8HQHaE7?cb=thfc1falcon&rs=1&pid=ImgDetMain&o=7&rm=3",
        },
    ];

    const isLargeScreen = useMediaQuery("(min-width:1024px)");

    const chunkSize = isLargeScreen ? 3 : 2;

    const slides = [];
    for (let i = 0; i < commentTest.length; i += chunkSize) {
        slides.push(commentTest.slice(i, i + chunkSize));
    }

    const totalSlides = Math.ceil(commentTest.length / chunkSize);

    useEffect(() => {}, []);
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
                    {tour.map((t) => (
                        <CardHome tour={t} />
                    ))}
                </motion.div>
                <div className="flex-box-center mt-[1.5rem]">
                    <div className="px-[3rem] py-[0.5rem] border-[2px] border-[#d38518] text-[#d38518] font-semibold uppercase cursor-pointer hover:bg-[#c39562] hover:text-white">
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
                    <div className="px-[3rem] py-[0.5rem] border-[2px] border-[#d38518] text-[#d38518] font-semibold uppercase cursor-pointer hover:bg-[#c39562] hover:text-white">
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
                        <div className="flex-box-center flex-col">
                            <img src={t?.img} alt={t?.title} className="w-[60px] h-[60px]" />
                            <div className="text-wrap font-bold text-center mb-[0.5rem]">{t?.title}</div>
                            <div className="bg-text-sub-content text-center">{t?.description}</div>
                        </div>
                    ))}
                </motion.div>
                <div className="flex-box-center mt-[1.5rem]">
                    <div className="px-[3rem] py-[0.5rem] border-[2px] border-[#d38518] text-[#d38518] font-semibold uppercase cursor-pointer hover:bg-[#c39562] hover:text-white">
                        {t("explore_style")}
                    </div>
                </div>
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
                    <div className="px-[3rem] py-[0.5rem] border-[2px] border-[#d38518] text-[#d38518] font-semibold uppercase cursor-pointer hover:bg-[#c39562] hover:text-white">
                        {t("review_see_all")}
                    </div>
                </div>
                {/* End client say */}
            </div>

        </>
    );
};

export default Home;
