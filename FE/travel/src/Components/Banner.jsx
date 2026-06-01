import React, { useEffect, useRef, useState } from "react";
import { imgBanner } from "../assets/images";
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowLeftFill, RiArrowRightFill } from "react-icons/ri";

const Banner = () => {
    const [listBanner, setListBanner] = useState([
        imgBanner.sampleBanner2,
        imgBanner.sampleBanner,
        imgBanner.sampleBanner1,
    ]);

    const [touchStart, setTouchStart] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loaded, setLoaded] = useState(Array(listBanner.length).fill(false));

    const intervalRef = useRef(null);

    const startSlider = () => {
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev === listBanner.length - 1 ? 0 : prev + 1));
        }, 300000);
    };

    const resetSlider = () => {
        clearInterval(intervalRef.current);
        startSlider();
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === listBanner.length - 1 ? 0 : prev + 1));
        resetSlider();
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? listBanner.length - 1 : prev - 1));
        resetSlider();
    };

    useEffect(() => {
        startSlider();
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <div
            className="relative w-full overflow-hidden"
            onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
            onTouchEnd={(e) => {
                const touchEnd = e.changedTouches[0].clientX;
                const distance = touchStart - touchEnd;
                if (distance > 50) handleNext();
                if (distance < -50) handlePrev();
            }}>
            <AnimatePresence>
                <motion.div className="flex" animate={{ x: `-${currentIndex * 100}%` }} transition={{ duration: 0.35 }}>
                    {listBanner.map((img, index) => (
                        <div
                            key={index}
                            className="w-full min-w-full shrink-0 min-h-[300px] md:min-h-[400px] max-h-[400px] md:max-h-[500px] lg:max-h-[600px] relative bg-gray-200">
                            <motion.img
                                src={img}
                                alt="banner"
                                className="w-full h-full object-cover contrast-105"
                                loading="lazy"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: loaded[index] ? 1 : 0 }}
                                transition={{ duration: 0.5 }}
                                onLoad={() =>
                                    setLoaded((prev) => {
                                        const newState = [...prev];
                                        newState[index] = true;
                                        return newState;
                                    })
                                }
                            />
                        </div>
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* Prev */}
            <div
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white px-4 py-2 rounded-full text-[0.75rem] lg:text-[1.5rem] cursor-pointer">
                <RiArrowLeftFill />
            </div>

            {/* Next */}
            <div
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white px-4 py-2 rounded-full text-[0.75rem] lg:text-[1.5rem] cursor-pointer">
                <RiArrowRightFill />
            </div>
        </div>
    );
};

export default Banner;
