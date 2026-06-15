import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { styleImg } from "../assets/images";

export default function StylesPage() {
    const navigate = useNavigate();

    const styles = [
        {
            id: 1,
            style: "CULTURAL",
            image: styleImg.cultural,
            description: "Discover Vietnam's heritage, traditions and local life.",
        },
        {
            id: 2,
            style: "FAMILY",
            image: styleImg.familyStyle,
            description: "Fun and comfortable trips for all generations.",
        },
        {
            id: 3,
            style: "NATURE",
            image: styleImg.natureStyle,
            description: "Explore mountains, waterfalls and natural wonders.",
        },
        {
            id: 4,
            style: "HONEYMOON",
            image: styleImg.honeymoonStyle,
            description: "Romantic escapes designed for couples.",
        },
        {
            id: 5,
            style: "FOOD",
            image: styleImg.foodStyle,
            description: "Taste authentic Vietnamese cuisine.",
        },
        {
            id: 6,
            style: "ADVENTURE",
            image: styleImg.adventureStyle,
            description: "Exciting journeys and unforgettable experiences.",
        },
    ];

    return (
        <div className="min-h-screen bg-[#fafafa]">
            {/* Hero */}
            <div
                className="relative h-[350px] bg-cover bg-center"
                style={{
                    backgroundImage: "url(https://images.unsplash.com/photo-1528127269322-539801943592)",
                }}>
                <div className="absolute inset-0 bg-black/45" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                    <h1 className="text-4xl lg:text-6xl font-bold uppercase tracking-[3px]">Travel Styles</h1>

                    <p className="mt-4 max-w-[700px] text-lg text-gray-200">
                        Find the perfect travel experience that matches your interests and travel personality.
                    </p>
                </div>
            </div>

            {/* Title */}
            <div className="py-14 text-center">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 uppercase">Explore By Style</h2>

                <div className="w-20 h-1 bg-[#c39562] mx-auto mt-4 rounded-full" />
            </div>

            {/* Grid */}
            <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16 pb-20">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {styles?.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.4,
                                delay: index * 0.05,
                            }}
                            viewport={{ once: true }}
                            onClick={() => navigate(`/tours?style=${item?.style}`)}
                            className="group cursor-pointer overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-2xl transition-all duration-500">
                            <div className="relative h-[280px] overflow-hidden">
                                <img
                                    src={item?.image}
                                    alt={item?.style}
                                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                <div className="absolute bottom-0 left-0 p-5 text-white">
                                    <h3 className="text-xl font-bold tracking-wide">{item?.style}</h3>

                                    <p className="mt-2 text-sm text-gray-200">{item?.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
