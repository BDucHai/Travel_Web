import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ContactModal from "../Components/ContactModal";
import { getToursById } from "../api/Tour";
import useSWR from "swr";
import { useAuth } from "../contexts/AuthContext";
import { Backdrop, CircularProgress } from "@mui/material";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

const TourDetail = () => {
  const { id } = useParams();
  const { lang } = useAuth();
  const { t } = useTranslation();

  const { data: tourDetail, isLoading } = useSWR(
    id ? [`/tours/${id}`, { lang }] : null,
    ([url, params]) => getToursById(url, params)
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
            className="text-4xl md:text-6xl font-bold"
          >
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
            <p className="text-gray-600 leading-relaxed">{tourDetail?.overview}</p>
          </section>

          {/* EXCLUSION */}
          <section>
            <h2 className="text-2xl font-bold mb-4">{t("exclusion")}</h2>
            <p className="text-gray-600 leading-relaxed">{tourDetail?.exclusion}</p>
          </section>

          {/* INCLUSION */}
          <section>
            <h2 className="text-2xl font-bold mb-4">{t("inclusion")}</h2>
            <p className="text-gray-600 leading-relaxed">{tourDetail?.inclusion}</p>
          </section>

          {/* ITINERARY */}
          <section>
            <h2 className="text-2xl font-bold mb-6">{t("itinerary")}</h2>
            <div className="space-y-8">
              {tourDetail?.itineraryDays?.map((item, i) => (
                <motion.div key={i} className="flex flex-col md:flex-row gap-5 bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                    <img
                      src={item?.imageUrl}
                      alt={item?.title}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() =>
                        openLightbox(tourDetail?.itineraryDays?.map((d) => d.imageUrl), i)
                      }
                    />
                  </div>
                  <div className="flex-1 p-5">
                    <h3 className="font-semibold text-lg text-[#e38c2b]">
                      {t("day")} {item?.dayNumber} — {item?.title}
                    </h3>
                    {item?.description?.split("\n").map((para, idx, arr) => (
                      <p
                        key={idx}
                        className={`text-[#000] mt-2 ${idx === arr.length - 1 ? "italic text-gray-700" : ""}`}
                      >
                        {para}
                      </p>
                  ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* GALLERY */}
          <section>
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
            {tourDetail && (
                <ContactModal
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
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={slides}
          index={index}
          plugins={[Zoom]}
        />
      )}
    </div>
  );
};

export default TourDetail;
