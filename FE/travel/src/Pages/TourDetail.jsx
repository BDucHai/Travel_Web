import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ContactModal from "../Components/ContactModal";
import { getToursById } from "../api/Tour";
import useSWR from "swr";

const TourDetail = () => {
    const { id } = useParams();
    const { t } = useTranslation();

    const {data: tourDetail, mutate} = useSWR(id? ["tours", {id}]: null, ([_, params]) => getToursById(params));

    const tourFake = {
        title: "okla",
        slug: "VietnamTour",
        shortDescription: "abc",
        overview: "Mot con sadasdascasvtbvfdvs",
        duration_days: "10days 9 nights",
        priceFrom: "200USD",
        featuredImageUrl: "",
        isFeature: "",
        highlight: [
                                "Hanoi Old Quarter walking tour",
                                "Ha Long Bay overnight cruise",
                                "Hue Imperial City exploration",
                                "Hoi An lantern town experience",
                                "Cu Chi tunnels discovery",
                                "Mekong Delta boat trip",
                            ]
    };

        const tour = tourDetail?.data || tourFake;
    const [contactModal, setContactModal] = useState(false);

    return (
        <div className="min-h-screen bg-[#fcf5ef] text-gray-800">
            {/* HERO */}
            <div className="relative h-[70vh] w-full overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1528127269322-539801943592"
                    alt="tour"
                    className="w-full h-full object-cover scale-105"
                />

                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute bottom-10 left-10 text-white max-w-2xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold">
                        {tour?.title}
                    </motion.h1>

                    <p className="mt-3 text-lg text-white/80">{tour?.shortDescription}</p>
                </div>
            </div>

            {/* BODY */}
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* LEFT CONTENT */}
                <div className="lg:col-span-8 space-y-16">
                    {/* OVERVIEW */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">{t("overview")}</h2>
                        <p className="text-gray-600 leading-relaxed">{tour?.overview}</p>
                    </section>

                    {/* HIGHLIGHTS */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">{t("highlight")}</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {tour?.highlight?.map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.02 }}
                                    className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition">
                                    {item}
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* ITINERARY */}
                    {/* ITINERARY */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6">{t("itinerary")}</h2>

                        <div className="space-y-8">
                            {[
                                {
                                    day: "Day 1",
                                    title: "Arrival in Hanoi",
                                    desc: "Airport pickup, check-in hotel, free time in Old Quarter.",
                                    img: "https://images.unsplash.com/photo-1528127269322-539801943592",
                                },
                                {
                                    day: "Day 2",
                                    title: "Hanoi City Tour",
                                    desc: "Visit Temple of Literature, Ho Chi Minh Mausoleum, street food tour.",
                                    img: "https://images.unsplash.com/photo-1509030450996-9a8a7c9f4f2c",
                                },
                                {
                                    day: "Day 3",
                                    title: "Ha Long Bay Cruise",
                                    desc: "Overnight cruise through limestone karsts and emerald waters.",
                                    img: "https://images.unsplash.com/photo-1528127269322-539801943592",
                                },
                                {
                                    day: "Day 4",
                                    title: "Hoi An Ancient Town",
                                    desc: "Explore lantern streets, Japanese bridge and riverside cafés.",
                                    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
                                },
                            ]?.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="
                                             flex flex-col md:flex-row gap-5
                                             bg-white rounded-2xl shadow-sm
                                             overflow-hidden
                                             hover:shadow-md transition
                                        ">
                                    {/* IMAGE */}
                                    <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                                        <img
                                            src={item?.img}
                                            alt={item?.title}
                                            className="w-full h-full object-cover hover:scale-110 transition duration-500"
                                        />
                                    </div>

                                    {/* CONTENT */}
                                    <div className="flex-1 p-5 relative">
                                        {/* timeline dot */}
                                        <div className="absolute left-0 top-6 w-3 h-3 bg-[#e38c2b] rounded-full" />

                                        <div className="pl-4">
                                            <h3 className="font-semibold text-lg text-[#e38c2b]">
                                                {item?.day} — {item?.title}
                                            </h3>

                                            <p className="text-gray-600 mt-2 leading-relaxed">{item?.desc}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* GALLERY */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Gallery</h2>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <img
                                    key={i}
                                    alt={i}
                                    src={`https://source.unsplash.com/500x500/?vietnam,travel,${i}`}
                                    className="rounded-xl object-cover h-40 w-full hover:scale-105 transition"
                                />
                            ))}
                        </div>
                    </section>
                </div>

                {/* RIGHT SIDEBAR */}
                <div className="lg:col-span-4">
                    <div className="sticky top-10 bg-white rounded-2xl shadow-md p-6 space-y-6">
                        <div>
                            <p className="text-gray-500 text-sm">Duration</p>
                            <p className="font-semibold">10 Days / 9 Nights</p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm">Route</p>
                            <p className="font-semibold">Hanoi → Ha Long → Hue → Hoi An → HCM</p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm">Type</p>
                            <p className="font-semibold">Private / Group Tour</p>
                        </div>

                        <button
                            className="w-full py-3 bg-[#e38c2b] text-white rounded-xl hover:bg-black transition cursor-pointer"
                            onClick={() => setContactModal(true)}>
                            {t("contact_us")}
                        </button>
                    </div>
                </div>
            </div>
            <ContactModal t={t} open={contactModal} onClose={() => setContactModal(false)} content={tour?.title} />
        </div>
    );
};

export default TourDetail;
