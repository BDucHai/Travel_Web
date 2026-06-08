import React from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

const TourDetail = () => {
    const { id } = useParams();
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
                        Vietnam Highlights Journey
                    </motion.h1>

                    <p className="mt-3 text-lg text-white/80">
                        A curated North to South experience through Vietnam’s culture, nature & heritage
                    </p>
                </div>
            </div>

            {/* BODY */}
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* LEFT CONTENT */}
                <div className="lg:col-span-8 space-y-16">
                    {/* OVERVIEW */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Overview</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Discover Vietnam from Hanoi to Ho Chi Minh City through an unforgettable journey combining
                            culture, nature, cuisine, and local life. This tour is designed for travelers who want to
                            experience the essence of Vietnam in a smooth and well-paced itinerary.
                        </p>
                    </section>

                    {/* HIGHLIGHTS */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Highlights</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                "Hanoi Old Quarter walking tour",
                                "Ha Long Bay overnight cruise",
                                "Hue Imperial City exploration",
                                "Hoi An lantern town experience",
                                "Cu Chi tunnels discovery",
                                "Mekong Delta boat trip",
                            ].map((item, i) => (
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
                    <section>
                        <h2 className="text-2xl font-bold mb-6">Itinerary</h2>

                        <div className="space-y-6 border-l border-gray-300 pl-6">
                            {[
                                {
                                    day: "Day 1",
                                    title: "Arrival in Hanoi",
                                    desc: "Airport pickup, check-in hotel, free time in Old Quarter.",
                                },
                                {
                                    day: "Day 2",
                                    title: "Hanoi City Tour",
                                    desc: "Visit Temple of Literature, Ho Chi Minh Mausoleum, street food tour.",
                                },
                                {
                                    day: "Day 3",
                                    title: "Ha Long Bay Cruise",
                                    desc: "Overnight cruise through limestone karsts and emerald waters.",
                                },
                                {
                                    day: "Day 4",
                                    title: "Hoi An Ancient Town",
                                    desc: "Explore lantern streets, Japanese bridge and riverside cafés.",
                                },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="relative">
                                    <div className="absolute -left-[30px] top-2 w-3 h-3 bg-[#e38c2b] rounded-full" />

                                    <h3 className="font-semibold text-lg text-[#e38c2b]">
                                        {item.day} — {item.title}
                                    </h3>

                                    <p className="text-gray-600 mt-1">{item.desc}</p>
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
                {/* <div className="lg:col-span-4">
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

                        <button className="w-full py-3 bg-[#e38c2b] text-white rounded-xl hover:bg-black transition">
                            Book Now
                        </button>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default TourDetail;
