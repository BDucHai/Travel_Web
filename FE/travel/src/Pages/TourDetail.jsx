import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ContactModal from "../Components/ContactModal";
import { getToursById } from "../api/Tour";
import useSWR from "swr";
import { useAuth } from "../contexts/AuthContext";
import { Backdrop, CircularProgress } from "@mui/material";

const TourDetail = () => {
    const { id } = useParams();
    const { lang } = useAuth();
    const { t } = useTranslation();

    const { data: tourDetail, isLoading } = useSWR(id ? [`/tours/${id}`, { lang }] : null, ([url, params]) =>
        getToursById(url, params),
    );

    const [contactModal, setContactModal] = useState(false);

    return (
        <div className="min-h-screen bg-[#fcf5ef] text-gray-800">
            {/* HERO */}
            <div className="relative h-[70vh] w-full overflow-hidden">
                <img
                    src={tourDetail?.featuredImageUrl}
                    alt={tourDetail?.slug}
                    className="w-full h-full object-cover scale-105"
                />

                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute bottom-10 left-10 text-white max-w-2xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold">
                        {tourDetail?.title}
                    </motion.h1>

                    <p className="mt-3 text-lg text-white/80">{tourDetail?.shortDescription}</p>
                </div>
            </div>

            {/* BODY */}
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* LEFT CONTENT */}
                <div className="lg:col-span-8 space-y-16">
                    {/* OVERVIEW */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">{t("overview")}</h2>
                        <p className="text-gray-600 leading-relaxed">{tourDetail?.overview}</p>
                    </section>

                    {/* exclusion */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">{t("exclusion")}</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <p className="text-gray-600 leading-relaxed">{tourDetail?.exclusion}</p>
                        </div>
                    </section>

                    {/* inclusion */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">{t("inclusion")}</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <p className="text-gray-600 leading-relaxed">{tourDetail?.inclusion}</p>
                        </div>
                    </section>

                    {/* ITINERARY */}
                    {/* ITINERARY */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6">{t("itinerary")}</h2>

                        <div className="space-y-8">
                            {tourDetail?.itineraryDays?.map((item, i) => (
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
                                            src={item?.imageUrl}
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
                                                {item?.dayNumber} — {item?.title}
                                            </h3>

                                            <p className="text-gray-600 mt-2 leading-relaxed">{item?.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* GALLERY */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">{t("gallery")}</h2>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {tourDetail?.imageUrls?.map((i) => (
                                <img
                                    key={i}
                                    alt={i}
                                    src={i}
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
                            <p className="text-gray-500 text-sm">{t("durationDay")}</p>
                            <p className="font-semibold">{tourDetail?.durationDays + " " + t("days")}</p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm">{t("destination")}</p>
                            <p className="font-semibold">{tourDetail?.destinationNames?.join(" + ")}</p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm">{t("groupSize")}</p>
                            <p className="font-semibold">{tourDetail?.groupSize}</p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm">{t("priceFrom")}</p>
                            <p className="font-semibold">{tourDetail?.priceFrom}$</p>
                        </div>

                        <button
                            className="w-full py-3 bg-[#e38c2b] text-white rounded-xl hover:bg-black transition cursor-pointer"
                            onClick={() => setContactModal(true)}>
                            {t("contact_us")}
                        </button>
                    </div>
                </div>
            </div>
            <ContactModal
                t={t}
                open={contactModal}
                onClose={() => setContactModal(false)}
                content={tourDetail?.title}
            />
            <Backdrop
                open={isLoading}
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 9999,
                    backgroundColor: "rgba(0,0,0,0.35)",
                }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};

export default TourDetail;
