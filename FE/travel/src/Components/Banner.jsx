import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { RiArrowLeftFill, RiArrowRightFill } from "react-icons/ri";

const Banner = ({ banners = [] }) => {
    const [touchStart, setTouchStart] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    const intervalRef = useRef(null);

    const handleNext = () => {
        if (!banners.length) return;

        setCurrentIndex((prev) =>
            prev >= banners.length - 1 ? 0 : prev + 1
        );
    };

    const handlePrev = () => {
        if (!banners.length) return;

        setCurrentIndex((prev) =>
            prev <= 0 ? banners.length - 1 : prev - 1
        );
    };

    // Tự động chạy mỗi 10 giây
    useEffect(() => {
        if (banners.length <= 1) return;

        intervalRef.current = setInterval(() => {
            setCurrentIndex((prev) =>
                prev >= banners.length - 1 ? 0 : prev + 1
            );
        }, 10000);

        return () => clearInterval(intervalRef.current);
    }, [banners.length]);

    // Reset thời gian khi người dùng bấm nút
    const resetSlider = () => {
        clearInterval(intervalRef.current);

        if (banners.length <= 1) return;

        intervalRef.current = setInterval(() => {
            setCurrentIndex((prev) =>
                prev >= banners.length - 1 ? 0 : prev + 1
            );
        }, 10000);
    };

    const handleNextClick = () => {
        handleNext();
        resetSlider();
    };

    const handlePrevClick = () => {
        handlePrev();
        resetSlider();
    };

    // Xử lý vuốt trên điện thoại
    const handleTouchEnd = (e) => {
        const touchEnd = e.changedTouches[0].clientX;
        const distance = touchStart - touchEnd;

        if (distance > 50) handleNextClick();
        else if (distance < -50) handlePrevClick();
    };

    // Đảm bảo index hợp lệ khi dữ liệu banner thay đổi
    useEffect(() => {
        setCurrentIndex((prev) =>
            banners.length === 0
                ? 0
                : Math.min(prev, banners.length - 1)
        );
    }, [banners.length]);

    if (!banners.length) return null;

    return (
        <div
            className="relative w-full overflow-hidden"
            onTouchStart={(e) =>
                setTouchStart(e.touches[0].clientX)
            }
            onTouchEnd={handleTouchEnd}
        >
            <motion.div
                className="flex w-full"
                animate={{
                    x: `-${(currentIndex * 100)}%`,
                }}
                transition={{
                    duration: 0.35,
                    ease: "easeInOut",
                }}
            >
                {banners.map((img, index) => (
                    <div
                        key={img?.id ?? index}
                        className="relative w-full min-w-full shrink-0 min-h-[300px] md:min-h-[400px] max-h-[400px] md:max-h-[500px] lg:max-h-[600px] bg-gray-200"
                    >
                        <motion.img
                            src={img?.imageUrl}
                            alt="banner"
                            className="block w-full h-full object-cover contrast-105"
                            loading={index === 0 ? "eager" : "lazy"}
                            initial={{ scale: 1 }}
                            animate={
                                index === currentIndex
                                    ? { scale: [1, 1.06, 1] }
                                    : { scale: 1 }
                            }
                            transition={
                                index === currentIndex
                                    ? {
                                          duration: 12,
                                          ease: "easeInOut",
                                      }
                                    : { duration: 0 }
                            }
                        />
                    </div>
                ))}
            </motion.div>

            {banners.length > 1 && (
                <>
                    <button
                        type="button"
                        onClick={handlePrevClick}
                        aria-label="Previous banner"
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white px-4 py-2 rounded-full text-[0.75rem] lg:text-[1.5rem] cursor-pointer z-10"
                    >
                        <RiArrowLeftFill />
                    </button>

                    <button
                        type="button"
                        onClick={handleNextClick}
                        aria-label="Next banner"
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white px-4 py-2 rounded-full text-[0.75rem] lg:text-[1.5rem] cursor-pointer z-10"
                    >
                        <RiArrowRightFill />
                    </button>
                </>
            )}
        </div>
    );
};

export default Banner;