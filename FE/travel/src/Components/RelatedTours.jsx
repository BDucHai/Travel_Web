import React from "react";
import { motion } from "framer-motion";
import TourCard from "./TourCard";

const RelatedTours = ({ tours }) => {
    return (
        <div className="mt-10">
            <motion.div className="flex gap-6 overflow-x-auto pb-4" whileTap={{ cursor: "grabbing" }}>
                {tours?.map((tour) => (
                    <motion.div
                        key={tour?.id}
                        className="min-w-[16rem] lg:min-w-[20rem] flex-shrink-0"
                        whileHover={{ scale: 1.05 }}>
                        <TourCard tour={tour} />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default RelatedTours;
