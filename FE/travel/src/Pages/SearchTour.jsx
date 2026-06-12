import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getTours } from "../api/Tour";
import { imgCardSample } from "../assets/images";
import { useTranslation } from "react-i18next";
import { IoGridOutline } from "react-icons/io5";
import useSWR from "swr";

const SearchTour = () => {
  const { query } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [filterSearch, setFilterSearch] = useState({ page: 1, limit: 4 });
  const [allTours, setAllTours] = useState([]);

  const { data, isLoading } = useSWR(
    ["/tours", filterSearch],
    ([_, params]) => getTours(params),
    { keepPreviousData: true }
  );


  const tourFake = [
    {
      id: 1,
      img: imgCardSample.cardSample,
      meta_title: "Essential VietNam",
      meta_description:
        "Discover the highlight Vietnam from Hanoi to HCM City with memorable experiences",
      duration_days: "10 Days / 9 Nights",
      slug: "Best Seller",
    },
    {
      id: 2,
      img: imgCardSample.cardSample,
      meta_title: "Essential VietNam",
      meta_description:
        "Discover the highlight Vietnam from Hanoi to HCM City with memorable experiences",
      duration_days: "10 Days / 9 Nights",
      slug: "Best Seller",
    },
    {
      id: 3,
      img: imgCardSample.cardSample,
      meta_title: "Essential VietNam",
      meta_description:
        "Discover the highlight Vietnam from Hanoi to HCM City with memorable experiences",
      duration_days: "10 Days / 9 Nights",
      slug: "Popular",
    },
    {
      id: 4,
      img: imgCardSample.cardSample,
      meta_title: "Essential VietNam",
      meta_description:
        "Discover the highlight Vietnam from Hanoi to HCM City with memorable experiences",
      duration_days: "10 Days / 9 Nights",
      slug: "Best Seller",
    },
  ];


  useEffect(() => {
    if (data) {
      setAllTours((prev) =>
        filterSearch?.page === 1 ? data : [...prev, ...data]
      );
    }
  }, [data, filterSearch?.page]);

  const tours = allTours.length ? allTours : tourFake;
  const [method, setMethod] = useState(false); // false = list, true = grid

  const handleLoadMore = () => {
    setFilterSearch((prev) => ({ ...prev, page: prev?.page + 1 }));
  };

  return (
    <div className="min-h-screen bg-[#fcf5ef] px-6 py-10">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          {t(`navbar.${query}`)}
        </h1>
      </motion.div>

      {/* TOOLBAR */}
      <div className="mx-auto px-[0.5rem] lg:px-[2rem] flex justify-end mb-4">
        <button
          onClick={() => setMethod((prev) => !prev)}
          className="p-2 rounded-lg hover:bg-black/5 transition cursor-pointer"
        >
          <IoGridOutline
            className={`w-7 h-7 transition ${
              method ? "text-[#e38c2b]" : "text-gray-600"
            }`}
          />
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
        `}
      >
        {isLoading && filterSearch.page === 1 ? (
          <div className="text-center text-gray-500 col-span-full">
            {t("loading")}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {tours.map((tour) => (
              <motion.div
                key={tour?.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.05 }}
                className="
                  bg-white rounded-2xl overflow-hidden shadow-md
                  hover:shadow-xl transition cursor-pointer group
                  flex flex-col lg:flex-row
                "
                onClick={() => navigate(`/tour/detail/${tour?.id}`)}
              >
                {/* IMAGE */}
                <div className="relative w-full lg:w-1/3 h-60 lg:h-auto">
                  <img
                    src={tour?.img}
                    alt={tour?.meta_title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-xs bg-black/60 text-white px-3 py-1 rounded-full">
                      {tour?.slug}
                    </span>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <h2 className="font-semibold text-[#ef8d21] text-[1.25rem] lg:text-[1.75rem] transition-all duration-300 group-hover:text-black">
                      {tour?.meta_title}
                    </h2>
                    <p className="text-gray-500 mt-2 line-clamp-3">
                      {tour?.meta_description}
                    </p>
                  </div>
                  <div className="flex items-center justify-start mt-4">
                    <span className="text-sm text-gray-600">
                      ⏱ {tour?.duration_days}
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
      <div className="flex justify-center mt-10">
        <button
          onClick={handleLoadMore}
          className="px-4 py-2 bg-[#e38c2b] text-white rounded-xl hover:bg-black transition"
        >
          {isLoading ? t("loading") : t("load_more")}
        </button>
      </div>
    </div>
  );
};

export default SearchTour;
