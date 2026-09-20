import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getTours } from "../api/Tour";
import { useTranslation } from "react-i18next";
import { IoGridOutline } from "react-icons/io5";
import useSWR from "swr";
import { useAuth } from "../contexts/AuthContext";
import { getDestinationDetail } from "../api/Destinations";
import QuestionDestinationGuest from "../Components/QuestionDestinationGuest";
import DestinationContentViewer from "../Components/DestinationContentViewer";
import { Backdrop, CircularProgress } from "@mui/material";
import { featureTour } from "../constant";

const DestinationView = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { id: destinationSlug } = useParams();
    const { lang } = useAuth();

    const [filterSearch, setFilterSearch] = useState({
        destinationSlug,
        page: 0,
        limit: 6,
        lang,
    });
    const [allTours, setAllTours] = useState([]);

    const { data, isLoading } = useSWR(["/tours", filterSearch], ([_, params]) => getTours(params), {
        keepPreviousData: true,
    });

    const { data: detailDestination, isLoading: loadingDestination } = useSWR(
        destinationSlug ? [`/destinations/${destinationSlug}`, { lang }] : null,
        ([url, params]) => getDestinationDetail(url, params),
    );

    useEffect(() => {
        setFilterSearch({
            destinationSlug,
            page: 0,
            limit: 6,
            lang,
        });

        setAllTours([]);
    }, [destinationSlug, lang]);

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
        <div className="min-h-screen bg-[#fcf5ef] pb-10">
            {/* Hero img */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
                <img src={detailDestination?.heroImageUrl} alt="hero_url" className="w-full max-h-[400px]" />
            </motion.div>

            <div className="px-[0.5rem] md:px-[2.5rem]">
                {/* header and short desc */}
                <div className="mt-[1.25rem] text-[1rem] text-start px-[0.75rem] lg:px-[2rem]">
                    <div className="text-[1.5rem] md:text-[2rem] text-[#ef8d21] uppercase font-bold">
                        {detailDestination?.bestTimeToVisit}
                    </div>
                    <div className="">{detailDestination?.shortDescription}</div>
                </div>

                {/* Review Location*/}
                <div className=" mt-[0.5rem] mb-[1.25rem] text-[1rem] rounded-md px-[0.75rem] lg:px-[2rem]">
                    <DestinationContentViewer content={detailDestination?.content} />
                </div>

                {/* Question */}
                <div className="text-center mt-[2rem] pt-[0.5rem] text-[1rem] lg:text-[1.5rem] text-[#000000c9] tracking-[1.5px] font-semibold font-inter uppercase">
                    {t("question_comment")}
                </div>
                <hr className="mx-auto mt-[0.15rem] mb-[1rem] w-[4rem] border-2 text-[#efb771]" />
                <QuestionDestinationGuest destId={detailDestination?.id} />

                {/* LIST START */}
                <div className="text-center mt-[2rem] pt-[0.5rem] text-[1rem] lg:text-[1.5rem] text-[#000000c9] tracking-[1.5px] font-semibold font-inter uppercase">
                    {t("explore_our_tour")}
                </div>
                <hr className="mx-auto mt-[0.5rem] mb-[1rem] w-[4rem] border-2 text-[#efb771]" />
                {/* TOOLBAR LIST*/}
                <div className="mx-auto px-[0.5rem] lg:px-[2rem] hidden md:flex justify-end mb-4">
                    <button
                        onClick={() => setMethod((prev) => !prev)}
                        className="p-2 rounded-lg hover:bg-black/5 transition cursor-pointer">
                        <IoGridOutline
                            className={`w-7 h-7 transition ${method ? "text-[#e38c2b]" : "text-gray-600"}`}
                        />
                    </button>
                </div>
            </div>

            {/* LIST */}
            <div
                className={`px-[0.5rem] lg:px-[2rem] mx-auto grid gap-6 grid-cols-1 ${method ? "lg:grid-cols-2" : "lg:grid-cols-1"}`}>
                {isLoading ? (
                    <div className="text-center text-gray-500 col-span-full">{t("loading")}</div>
                ) : allTours?.length === 0 ? (
                    <div className="text-center text-gray-500 col-span-full">{t("no_value")}</div>
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
                                onClick={() => navigate(`/tours/detail/${tour?.slug}`)}>
                                {/* IMAGE */}
                                <div className="relative w-full lg:w-1/3 h-60 lg:h-auto">
                                    <img
                                        src={tour?.featuredImageUrl}
                                        alt={tour?.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-3 left-3">
                                        {tour?.isFeatured > 0 && (
                                            <span className="text-xs bg-black/60 text-white px-3 py-1 rounded-full">
                                                {t(
                                                    featureTour.find((item) => item.id === Number(tour.isFeatured))
                                                        ?.value,
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {/* CONTENT */}
                                <div className="flex-1 p-5 flex flex-col justify-between">
                                    <div>
                                        <h2 className="font-semibold text-[#ef8d21] text-[1rem] lg:text-[1.25rem] transition-all duration-300 group-hover:text-black">
                                            {tour?.title}
                                        </h2>
                                        <p className="text-gray-900 mt-2 line-clamp-3">{tour?.shortDescription}</p>
                                    </div>
                                    <div className="flex items-center justify-start mt-4">
                                        <span className="text-sm text-gray-900">
                                            ⏱ {tour?.groupSize + " " + t("days")}
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

            <Backdrop
                open={isLoading || loadingDestination}
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

export default DestinationView;
