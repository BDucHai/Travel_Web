import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { imgBanner } from "../assets/images";

const Navbar = () => {
    const { t } = useTranslation();

    const [openDetail, setOpenDetail] = useState({
        open: false,
        pop: 0,
    });

    const itemData = [
        imgBanner.cungvulam,
        imgBanner.vietnamtour,
        imgBanner.vietnamtour1,
        imgBanner.vietnamtour5,
        imgBanner.vietnamtour2,
        imgBanner.vietnamtour3,
    ];

    return (
        <>
            <div className="absolute top-0 left-0 z-[800] pt-[0.5rem] px-[1rem] md:px-[2rem] w-full bg-linear-to-b from-[#2d3435f2] to-[#3c4d5629] text-white text-[1.3rem] font-roboto font-bold">
                {/* I18 language */}
                <div></div>
                {/* Nav */}
                <div className="flex justify-between items-center">
                    <div className="flex-[0.3]">
                        <img />
                        <div>
                            <h2 className="text-wrap text-[1.4rem] w-[60px] text-[#f0f6cc]">REVES INDOCHINE</h2>
                            <div className="text-[0.6rem]"> DREAM OF INDOCHINE </div>
                        </div>
                    </div>
                    <div className="flex-1 flex items-center">
                        <div
                            className="relative px-4 py-2 rounded cursor-pointer hover-nav-color uppercase"
                            onMouseEnter={() => setOpenDetail({ open: true, pop: 1 })}
                            onMouseLeave={() => setOpenDetail({ open: false, pop: 0 })}>
                            {t("navbar.vietnam_tour")}
                            <AnimatePresence>
                                {/* {openDetail?.open && openDetail?.pop === 1 && ( */}
                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute left-0 top-full mt-2 w-[80vw] lg:w-[60vw] bg-white text-black rounded shadow-lg shadow-[#5c626361]
                                    opacity-0
                                    transform transition-all text-[0.8rem] cursor-default normal-case">
                                    <div className="grid grid-cols-3 gap-x-[10px] gap-y-[6px] p-[0.8rem] bg-[#f8fcf3] overflow-clip">
                                        <div className="">
                                            <div className="w-[80%] px-[0.4rem] py-[0.8rem] transition hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                👉 {t("navbar.7days_vn_tour")}
                                            </div>
                                            <div className="w-[80%] px-[0.4rem] py-[0.8rem] transition hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                👉 {t("navbar.10days_vn_tour")}
                                            </div>
                                            <div className="w-[80%] px-[0.4rem] py-[0.8rem] transition hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                👉 {t("navbar.12days_vn_tour")}
                                            </div>
                                            <div className="w-[80%] px-[0.4rem] py-[0.8rem] transition hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                👉 {t("navbar.2w_vn_tour")}
                                            </div>
                                            <div className="w-[80%] px-[0.4rem] py-[0.8rem] transition hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                👉 {t("navbar.3w_vn_tour")}
                                            </div>
                                            <img
                                                srcSet={`${imgBanner.cungvulam}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                src={`${imgBanner.cungvulam}?w=164&h=164&fit=crop&auto=format`}
                                                style={{
                                                    marginTop: 10,
                                                    width: "80%",
                                                    height: 164,
                                                    objectFit: "cover",
                                                }}
                                                alt={imgBanner.cungvulam}
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className=""></div>
                                    </div>
                                </motion.div>
                                {/* )} */}
                            </AnimatePresence>
                        </div>

                        {/* TRAVEL INFORMATION */}
                        <div
                            className="relative px-4 py-2 rounded cursor-pointer hover-nav-color uppercase"
                            onMouseEnter={() => setOpenDetail({ open: true, pop: 1 })}
                            onMouseLeave={() => setOpenDetail({ open: false, pop: 0 })}>
                            {t("navbar.travel_infor")}
                            <AnimatePresence>
                                {openDetail?.open && openDetail?.pop === 2 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute left-0 top-full mt-2 w-[80vw] lg:w-[60vw] bg-white text-black rounded shadow-lg shadow-[#5c626361]
                                    opacity-0
                                    transform transition-all text-[0.8rem] cursor-default normal-case">
                                        <div className="grid grid-cols-3 p-[0.8rem] bg-[#f8fcf3] overflow-clip">
                                            <div className="flex-[0.5]">
                                                <div className="w-[90%] px-[0.4rem] py-[0.8rem] transition hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    👉 {t("navbar.7days_vn_tour")}
                                                </div>
                                                <div className="w-[90%] px-[0.4rem] py-[0.8rem] transition hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    👉 {t("navbar.10days_vn_tour")}
                                                </div>
                                                <div className="w-[90%] px-[0.4rem] py-[0.8rem] transition hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    👉 {t("navbar.12days_vn_tour")}
                                                </div>
                                                <div className="w-[90%] px-[0.4rem] py-[0.8rem] transition hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    👉 {t("navbar.2w_vn_tour")}
                                                </div>
                                                <div className="w-[90%] px-[0.4rem] py-[0.8rem] transition hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    👉 {t("navbar.3w_vn_tour")}
                                                </div>
                                            </div>
                                            <div className="flex-1 grid grid-cols-2">
                                                <ImageList sx={{ width: 500, height: 340 }} cols={3} rowHeight={164}>
                                                    {itemData.map((item) => (
                                                        <ImageListItem key={item}>
                                                            <img
                                                                srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                                src={`${item}?w=164&h=164&fit=crop&auto=format`}
                                                                style={{
                                                                    width: 164,
                                                                    height: 164,
                                                                    objectFit: "cover",
                                                                }}
                                                                alt={item}
                                                                loading="lazy"
                                                            />
                                                        </ImageListItem>
                                                    ))}
                                                </ImageList>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
