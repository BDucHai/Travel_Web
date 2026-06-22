import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getTours } from "../api/Tour";
import { useTranslation } from "react-i18next";
import { IoGridOutline } from "react-icons/io5";
import useSWR from "swr";
import { useAuth } from "../contexts/AuthContext";

const SearchTour = () => {
    const [searchParams] = useSearchParams();
    const { lang } = useAuth();
    const duration = searchParams.get("duration");
    const region = searchParams.get("region");
    const destinationSlug = searchParams.get("destinationSlug");
    const styleSlug = searchParams.get("styleSlug");
    const collectionSlug = searchParams.get("collectionSlug");

    const { t } = useTranslation();
    const navigate = useNavigate();

    const [filterSearch, setFilterSearch] = useState({
        duration: searchParams.get("duration"),
        region: searchParams.get("region"),
        destinationSlug: searchParams.get("destinationSlug"),
        styleSlug: searchParams.get("styleSlug"),
        collectionSlug: searchParams.get("collectionSlug"),
        page: 0,
        limit: 8,
        lang,
    });
    const [allTours, setAllTours] = useState([]);

    const { data, isLoading } = useSWR(["/tours", filterSearch], ([_, params]) => getTours(params), {
        keepPreviousData: true,
    });

    useEffect(() => {
        setFilterSearch({
            duration,
            region,
            destinationSlug,
            styleSlug,
            collectionSlug,
            page: 0,
            limit: 8,
            lang,
        });

        setAllTours([]);
    }, [duration, region, destinationSlug, styleSlug, collectionSlug, lang]);

    useEffect(() => {
        if (!data) return;

        setAllTours((prev) => (filterSearch.page === 1 ? data?.data : [...prev, ...data?.data]));
    }, [data, filterSearch?.page]);

    const [method, setMethod] = useState(true); // false = list, true = grid

    const handleLoadMore = () => {
        if (data?.last || isLoading) return;

        setFilterSearch((prev) => ({
            ...prev,
            page: prev.page + 1,
        }));
    };

    return (
        <div className="min-h-screen bg-[#fcf5ef] px-6 py-10">
            {/* HEADER */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">{data?.title}</h1>
            </motion.div>

            {/* TOOLBAR */}
            <div className="mx-auto px-[0.5rem] lg:px-[2rem] flex justify-end mb-4">
                <button
                    onClick={() => setMethod((prev) => !prev)}
                    className="p-2 rounded-lg hover:bg-black/5 transition cursor-pointer">
                    <IoGridOutline className={`w-7 h-7 transition ${method ? "text-[#e38c2b]" : "text-gray-600"}`} />
                </button>
            </div>

            {/* LIST */}
            <div
                className={`
          px-[0.5rem]
          lg:px-[2rem]
          mx-auto
          grid gap-6
          grid-cols-1
          ${method ? "lg:grid-cols-2" : "lg:grid-cols-1"}
        `}>
            {isLoading ? (
    <div className="text-center text-gray-500 col-span-full">
        {t("loading")}
    </div>
            ) : allTours?.length === 0 ? (
                <div className="text-center text-gray-500 col-span-full">
                    {t("no_value")}
                </div>
            ) : (
                <AnimatePresence mode="wait">
                    {allTours?.map((tour) => (
                        <motion.div
                            key={tour?.id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.05 }}
                            className="bg-white rounded-2xl overflow-hidden shadow-md
                                    hover:shadow-xl transition cursor-pointer group
                                    flex flex-col lg:flex-row"
                            onClick={() => navigate(`/tours/detail/${tour?.slug}`)}
                        >
                            {/* IMAGE */}
                            <div className="relative w-full lg:w-1/3 h-60 lg:h-auto">
                                <img
                                    src={tour?.featuredImageUrl}
                                    alt={tour?.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-3 left-3">
                                    {tour?.isFeatured && (
                                        <span className="text-xs bg-black/60 text-white px-3 py-1 rounded-full">
                                            {t("popular")}
                                        </span>
                                    )}
                                </div>
                            </div>

                {/* CONTENT */}
                <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                        <h2 className="font-semibold text-[#ef8d21] text-[1.25rem] lg:text-[1.75rem] transition-all duration-300 group-hover:text-black">
                            {tour?.title}
                        </h2>
                        <p className="text-gray-500 mt-2 line-clamp-3">
                            {tour?.shortDescription}
                        </p>
                    </div>
                    <div className="flex items-center justify-start mt-4">
                        <span className="text-sm text-gray-600">
                            ⏱ {tour?.durationDays + " " + t("days")}
                        </span>
                    </div>
                    <div className="flex items-center justify-end mt-1">
                        <button className="px-4 py-2 bg-[#e38c2b] text-white rounded-xl hover:bg-black transition transition-all duration-300 group-hover:bg-black cursor-pointer">
                            {t("detail")}
                        </button>
                    </div>
                </div>
            </motion.div>
        ))}
    </AnimatePresence>
)}

            </div>

            {/* LOAD MORE */}
            {!data?.last && (
                <div className="flex justify-center mt-10">
                    <button
                        onClick={handleLoadMore}
                        disabled={isLoading}
                        className="px-4 py-2 bg-[#e38c2b] text-white rounded-xl hover:bg-black transition cursor-pointer disabled:opacity-50">
                        {isLoading ? t("loading") : t("load_more")}
                    </button>
                </div>
            )}
        </div>
    );
};

export default SearchTour;
