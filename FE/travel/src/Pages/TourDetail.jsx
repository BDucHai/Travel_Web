import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getToursById } from "../api/Tour";
import useSWR from "swr";
import { useAuth } from "../contexts/AuthContext";
import { Backdrop, CircularProgress } from "@mui/material";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { highlightPlusBold } from "../constant/regexFunction";
import ContactModalFrm from "../Components/ContactModalFrm";

const TourDetail = () => {
    const { id } = useParams();
    const { lang } = useAuth();
    const { t } = useTranslation();

    const { data: tourDetail, isLoading } = useSWR(id ? [`/tours/${id}`, { lang }] : null, ([url, params]) =>
        getToursById(url, params),
    );

    const [contactModal, setContactModal] = useState(false);
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [slides, setSlides] = useState([]);

    const openLightbox = (imgs, idx) => {
        setSlides(imgs.map((src) => ({ src })));
        setIndex(idx);
        setOpen(true);
    };

    return (
        <div className="min-h-screen bg-[#fcf5ef] text-gray-800">
            {/* HERO */}
            <div className="relative h-[70vh] w-full overflow-hidden">
                <img
                    src={tourDetail?.featuredImageUrl}
                    alt={tourDetail?.slug}
                    className="w-full h-full object-cover scale-105 cursor-pointer"
                    onClick={() => openLightbox([tourDetail?.featuredImageUrl], 0)}
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-10 left-10 text-white max-w-2xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl md:text-4xl font-bold">
                        {tourDetail?.title}
                    </motion.h1>
                    <p className="mt-3 text-lg text-white/80">{tourDetail?.shortDescription}</p>
                </div>
            </div>

            {/* BODY */}
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-16">
                    {/* OVERVIEW */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">{t("overview")}</h2>
                        <p className="text-gray-900 leading-relaxed">{tourDetail?.overview}</p>
                    </section>

                    {/* Tour Hightlight */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">{t("tour_hightlight")}</h2>
                        {tourDetail?.inclusion?.split("\n").map((para, idx, arr) => (
                            <p
                                key={idx}
                                className={`text-[#000] mt-2`}
                                dangerouslySetInnerHTML={{ __html: "•    " + highlightPlusBold(para) }}
                            />
                        ))}
                    </section>

                    {/* EXCLUSION */}

                    <section className="relative overflow-hidden rounded-2xl border border-[#eadfd2]
    bg-[#fffdf9] p-5 md:p-7
    shadow-[0_8px_30px_rgba(55,40,20,0.06)]">

                        {/* Heading */}
                        <div className="mb-6">
                            <span className="text-xs font-semibold uppercase tracking-[0.22em]
            text-[#c47a32]">
                                {t("discover_your_jouney")}
                            </span>

                            <h2 className="mt-2 text-2xl md:text-3xl font-bold text-[#183b36]">
                                {t("brief_itinerary")}
                            </h2>

                            <div className="mt-3 h-1 w-16 rounded-full bg-[#e38c2b]" />
                        </div>

                        <div className="overflow-x-auto rounded-xl border border-[#eadfd2]">
                            <div className="min-w-[520px]">
                                {/* Table header */}
                                <div className="grid grid-cols-7 items-center
                bg-[#183b36] px-4 py-4 md:px-5">
                                    <div className="col-span-1 text-sm font-semibold
                    uppercase tracking-wide text-white">
                                        {t("days")}
                                    </div>

                                    <div className="col-span-4 text-sm font-semibold
                    uppercase tracking-wide text-white">
                                        {t("highlight")}
                                    </div>

                                    <div className="col-span-2 text-sm font-semibold
                    uppercase tracking-wide text-white">
                                        {t("overnight")}
                                    </div>
                                </div>

                                {/* Table rows */}
                                {tourDetail?.exclusion?.split(/\n+/)
                                    .filter((line) => line.trim())
                                    .map((line, lineIdx) => {
                                        const parts = line.split("+");

                                        return (
                                            <div
                                                key={lineIdx}
                                                className={`grid grid-cols-7 items-start
                                border-t border-[#eadfd2]
                                px-4 py-4 md:px-5
                                transition-colors duration-200
                                hover:bg-[#f8eee3]
                                ${lineIdx % 2 === 0
                                                        ? "bg-white"
                                                        : "bg-[#fcf7f1]"
                                                    }`}
                                            >
                                                {/* Day */}
                                                <div className="col-span-1 pr-2">
                                                    <span className="inline-flex min-w-9
                                    items-center justify-center
                                    rounded-lg bg-[#f7e5d0] px-2 py-2
                                    text-sm font-bold text-[#b76c23]">
                                                        {parts?.[0]?.trim()}
                                                    </span>
                                                </div>

                                                {/* Highlight */}
                                                <div className="col-span-4 pr-4
                                text-sm leading-6 text-[#37433f]">
                                                    {parts?.[1]?.trim()}
                                                </div>

                                                {/* Overnight */}
                                                <div className="col-span-2 flex items-start
                                gap-2 text-sm leading-6 text-[#183b36]">
                                                    <span className="mt-1 shrink-0 text-[#c47a32]">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="1.8"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <path d="M3 21V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v16" />
                                                            <path d="M3 11h18M9 21v-5h6v5" />
                                                            <path d="M7 7h.01M12 7h.01M17 7h.01" />
                                                        </svg>
                                                    </span>
                                                    <span>{parts?.[2]?.trim() || "—"}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </section>


                    {/* ITINERARY */}

                    <section className="py-6 md:py-16">
                        {/* Section heading */}
                        <div className="mb-10">
                            <div className="mt-3 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                                <h2 className="text-3xl md:text-4xl font-bold text-[#183b36]">
                                    {t("itinerary")}
                                </h2>
                            </div>

                            <div className="mt-5 h-1 w-20 rounded-full bg-[#e38c2b]" />
                        </div>

                        <div className="space-y-7">
                            {tourDetail?.itineraryDays?.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.1 }}
                                    transition={{
                                        duration: 0.25,
                                        delay: Math.min(i * 0.08, 0.24),
                                        ease: "easeOut",
                                    }}
                                    className="group relative overflow-hidden rounded-3xl
                    border border-[#eadfd2] bg-[#fffdf9]
                    shadow-[0_5px_25px_rgba(55,40,20,0.05)]
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:border-[#e7c49d]
                    hover:shadow-[0_18px_45px_rgba(55,40,20,0.12)]"
                                >
                                    <div className="flex flex-col md:flex-row">
                                        {/* Image */}
                                        <div className="relative md:w-[40%] shrink-0">
                                            <div className="relative h-64 md:h-full md:min-h-[300px] overflow-hidden">
                                                <img
                                                    src={item?.imageUrl}
                                                    alt={item?.title}
                                                    loading="lazy"
                                                    className="absolute inset-0 w-full h-full
                                    object-cover cursor-pointer
                                    transition-transform duration-700
                                    group-hover:scale-105"
                                                    onClick={() =>
                                                        openLightbox(
                                                            tourDetail?.itineraryDays?.map(
                                                                (d) => d.imageUrl
                                                            ),
                                                            i
                                                        )
                                                    }
                                                />

                                                {/* Image overlay */}
                                                <div className="absolute inset-0 pointer-events-none
                                bg-gradient-to-t from-black/50
                                via-transparent to-black/10" />

                                                {/* Day badge */}
                                                <div className="absolute top-5 left-5
                                rounded-xl border border-white/30
                                bg-white/90 px-4 py-2 backdrop-blur-md">
                                                    <span className="block text-[10px] font-bold
                                    uppercase tracking-[0.2em] text-[#9b6a38]">
                                                        {t("day")}
                                                    </span>
                                                    <span className="block text-3xl font-bold
                                    leading-none text-[#183b36]">
                                                        {String(item?.dayNumber ?? i + 1)
                                                            .padStart(2, "0")}
                                                    </span>
                                                </div>

                                                {/* Image title */}
                                                <div className="absolute bottom-5 left-5 right-5
                                pointer-events-none">
                                                    <h3 className="mt-1 text-xl md:text-2xl
                                    font-bold leading-snug text-white
                                    drop-shadow-md">
                                                        {item?.title}
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0 p-6 md:p-8 lg:p-10">
                                            <div className="flex items-center gap-3 mb-5">
                                                <span className="h-8 w-1 rounded-full
                                bg-[#e38c2b]" />
                                                <div>
                                                    <p className="text-xs font-semibold
                                    uppercase tracking-[0.18em]
                                    text-[#b7793b]">
                                                        {t("day")} {item?.dayNumber}
                                                    </p>
                                                    <h4 className="mt-1 text-xl md:text-2xl
                                    font-bold leading-snug text-[#183b36]">
                                                        {item?.title}
                                                    </h4>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                {item?.description?.split("\n").map(
                                                    (para, idx, arr) => (
                                                        <p
                                                            key={idx}
                                                            className={`text-[15px] leading-7
                                            text-[#000]
                                            ${idx === arr.length - 1
                                                                    ? "italic text-gray-800"
                                                                    : ""
                                                                }`}
                                                            dangerouslySetInnerHTML={{
                                                                __html: highlightPlusBold(para),
                                                            }}
                                                        />
                                                    )
                                                )}
                                            </div>

                                            <div className="mt-7 flex items-center gap-3">
                                                <span className="h-px flex-1 bg-[#eadfd2]" />
                                                <span className="text-xs font-medium
                                tracking-widest text-[#b7793b]">
                                                    {String(i + 1).padStart(2, "0")}
                                                    {" / "}
                                                    {String(
                                                        tourDetail?.itineraryDays?.length ?? 0
                                                    ).padStart(2, "0")}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>


                    {/* GALLERY */}
                    {/* <section>
            <h2 className="text-2xl font-bold mb-4">{t("gallery")}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {tourDetail?.imageUrls?.map((src, idx) => (
                <img
                  key={src}
                  src={src}
                  alt={src}
                  className="rounded-xl object-cover h-40 w-full cursor-pointer"
                  onClick={() => openLightbox(tourDetail?.imageUrls, idx)}
                />
              ))}
            </div>
          </section> */}
                </div>

                {/* RIGHT SIDEBAR */}
                <div className="lg:col-span-4">
                    <div className="sticky top-[10rem] bg-white rounded-2xl shadow-md p-6 space-y-6">
                        <div>
                            <p className="text-gray-500 text-sm">{t("durationDay")}</p>
                            <p className="font-semibold">{tourDetail?.groupSize + " " + t("days")}</p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm">{t("destination")}</p>
                            <p className="font-semibold">{tourDetail?.destinationNames?.join(", ")}</p>
                        </div>

                        {/* <div>
                            <p className="text-gray-500 text-sm">{t("groupSize")}</p>
                            <p className="font-semibold">{tourDetail?.groupSize}</p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm">{t("priceFrom")}</p>
                            <p className="font-semibold">{tourDetail?.priceFrom}$</p>
                        </div> */}

                        <button
                            className="w-full py-3 bg-[#e38c2b] text-white rounded-xl hover:bg-black transition cursor-pointer"
                            onClick={() => setContactModal(true)}>
                            {t("contact_us")}
                        </button>
                    </div>
                </div>
            </div>
            {tourDetail && (
                <ContactModalFrm
                    t={t}
                    open={contactModal}
                    onClose={() => setContactModal(false)}
                    content={`I am interested in tour ${tourDetail.title}`}
                />
            )}

            <Backdrop open={isLoading} sx={{ color: "#fff", zIndex: 9999, backgroundColor: "rgba(0,0,0,0.35)" }}>
                <CircularProgress color="inherit" />
            </Backdrop>

            {open && (
                <Lightbox open={open} close={() => setOpen(false)} slides={slides} index={index} plugins={[Zoom]} />
            )}
        </div>
    );
};

export default TourDetail;
