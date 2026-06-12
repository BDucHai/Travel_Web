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


    const { data: tourDetail } = useSWR(
        id ? ["/tours", id] : null,
        ([_, id]) => getToursById(id)
    );

    const tourFake = [
  {
    code: "VN001",
    duration_days: "7 Days / 6 Nights",
    price_from: 499,
    title_en: "Discover Hanoi & Halong Bay",
    title_fr: "Découvrir Hanoi et la baie d'Halong",
    slug_en: "Best Seller",
    slug_fr: "Meilleure Vente",
    short_description_en: "A week-long journey through Hanoi and Halong Bay.",
    short_description_fr: "Un voyage d'une semaine à travers Hanoi et la baie d'Halong.",
    overview_en: "Explore the vibrant capital of Vietnam and cruise the stunning Halong Bay.",
    overview_fr: "Explorez la capitale vibrante du Vietnam et faites une croisière dans la magnifique baie d'Halong.",
    itinerary_en: "Day 1: Arrival in Hanoi ... Day 7: Departure",
    itinerary_fr: "Jour 1: Arrivée à Hanoi ... Jour 7: Départ",
    inclusion_en: "Hotel, breakfast, guided tours, cruise tickets.",
    inclusion_fr: "Hôtel, petit-déjeuner, visites guidées, billets de croisière.",
    exclusion_en: "Flights, personal expenses, travel insurance.",
    exclusion_fr: "Vols, dépenses personnelles, assurance voyage.",
    is_featured: true,
    is_active: true,
    featuredImage: "https://picsum.photos/seed/hanoi/600/400",
    galleryImages: [
      "https://picsum.photos/seed/halong1/600/400",
      "https://picsum.photos/seed/halong2/600/400",
    ],
    styles: [{ id: 1, name: "Adventure" }, { id: 2, name: "Culture" }],
    collections: [{ id: 1, name: "Vietnam Highlights" }],
  },
  {
    code: "VN002",
    duration_days: "10 Days / 9 Nights",
    price_from: 899,
    title_en: "Essential Vietnam from North to South",
    title_fr: "Vietnam essentiel du nord au sud",
    slug_en: "Popular",
    slug_fr: "Populaire",
    short_description_en: "Travel from Hanoi to Ho Chi Minh City with memorable experiences.",
    short_description_fr: "Voyagez de Hanoi à Ho Chi Minh Ville avec des expériences mémorables.",
    overview_en: "Visit Hanoi, Hue, Hoi An, and Ho Chi Minh City.",
    overview_fr: "Visitez Hanoi, Hue, Hoi An et Ho Chi Minh Ville.",
    itinerary_en: "Day 1: Hanoi ... Day 10: Ho Chi Minh City departure",
    itinerary_fr: "Jour 1: Hanoi ... Jour 10: Départ de Ho Chi Minh Ville",
    inclusion_en: "Hotels, domestic flights, guided tours.",
    inclusion_fr: "Hôtels, vols domestiques, visites guidées.",
    exclusion_en: "International flights, visa fees.",
    exclusion_fr: "Vols internationaux, frais de visa.",
    is_featured: false,
    is_active: true,
    featuredImage: "https://picsum.photos/seed/vietnam/600/400",
    galleryImages: [
      "https://picsum.photos/seed/hue/600/400",
      "https://picsum.photos/seed/hoian/600/400",
    ],
    styles: [{ id: 3, name: "Family" }],
    collections: [{ id: 2, name: "Classic Tours" }],
  },
];

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
