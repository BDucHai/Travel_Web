import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { imgBanner } from "../assets/images";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const { lang, changeLang } = useAuth();
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
            <div className="absolute top-0 left-0 z-[800] pt-[0.5rem] px-[1rem] md:px-[2rem] w-full bg-linear-to-b from-[#2d3435f2] to-[#3c4d5629] text-white text[1rem] xl:text-[1.3rem] font-roboto font-bold">
                {/* I18 language */}
                <div className="flex items-center justify-end">
                    <div
                        className="
                                        flex items-center gap-1 p-1 rounded-full
                                        bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg
                                    ">
                        {/* EN */}
                        <button
                            onClick={() => {
                                i18n.changeLanguage("en");
                                changeLang("en");
                            }}
                            className={`
                                            relative font-semibold rounded-full transition-all duration-300

                                            /* 👉 MOBILE (default) */
                                            px-2 py-1 text-[10px]

                                            /* 👉 LG trở lên */
                                            lg:px-4 lg:py-1.5 lg:text-xs

                                            ${
                                                i18n.language === "en"
                                                    ? "bg-white text-black shadow-md scale-[1.03]"
                                                    : "text-white/80 hover:text-white hover:bg-white/10"
                                            }
                                        `}>
                            EN
                        </button>

                        {/* FR */}
                        <button
                            onClick={() => {
                                i18n.changeLanguage("fr");
                                changeLang("fr");
                            }}
                            className={`
                                                relative font-semibold rounded-full transition-all duration-300

                                                /* mobile */
                                                px-2 py-1 text-[10px]

                                                /* lg+ */
                                                lg:px-4 lg:py-1.5 lg:text-xs

                                                ${
                                                    i18n.language === "fr"
                                                        ? "bg-white text-black shadow-md scale-[1.03]"
                                                        : "text-white/80 hover:text-white hover:bg-white/10"
                                                }
                                            `}>
                            FR
                        </button>
                    </div>
                </div>
                {/* Nav */}
                <div className="hidden lg:flex justify-between items-center">
                    <div className="flex-[0.3] flex gap-2 items-center">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRrOxSg6_VdeBw0ejwGgGKbeQxaDsxKVaxuw&s"
                            className="w-[3.1rem] h-[3.1rem] object-cover"
                            alt="logo"
                        />
                        <div>
                            <h2 className="text-wrap text-[1.4rem] w-[60px] text-[#f0f6cc]">REVES INDOCHINE</h2>
                            <div className="text-[0.6rem]"> DREAM OF INDOCHINE </div>
                        </div>
                    </div>
                    <div className="relative flex-1 flex items-center">
                        <div
                            className="px-4 py-2 rounded cursor-pointer hover-nav-color uppercase"
                            onMouseEnter={() => setOpenDetail({ open: true, pop: 1 })}
                            onMouseLeave={() => setOpenDetail({ open: false, pop: 0 })}>
                            {t("navbar.vietnam_tour")}
                            <AnimatePresence>
                                {openDetail?.open && openDetail?.pop === 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute left-0 top-full mt-2 w-[80%] bg-white text-black rounded shadow-lg shadow-[#5c626361]
                                    opacity-0
                                    transform transition-all text-[0.8rem] cursor-default normal-case">
                                        <div className="grid grid-cols-3 gap-x-[10px] gap-y-[6px] p-[0.8rem] bg-[#f8fcf3] overflow-clip">
                                            <div className="">
                                                <div className="w-[90%] px-[0.4rem] py-[0.8rem] transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    {t("navbar.7days_vn_tour")}
                                                </div>
                                                <div className="w-[90%] px-[0.4rem] py-[0.8rem] transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    {t("navbar.10days_vn_tour")}
                                                </div>
                                                <div className="w-[90%] px-[0.4rem] py-[0.8rem] transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    {t("navbar.12days_vn_tour")}
                                                </div>
                                                <div className="w-[90%] px-[0.4rem] py-[0.8rem] transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    {t("navbar.2w_vn_tour")}
                                                </div>
                                                <div className="w-[90%] px-[0.4rem] py-[0.8rem] transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    {t("navbar.3w_vn_tour")}
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
                                            <div className="">
                                                <div className="w-[90%] px-[0.4rem] py-[0.8rem] flex items-center gap-2 text-[#ef8d21] text-[1rem] uppercase font-semibold rounded-[6px]">
                                                    {t("navbar.all_style_tour")}
                                                </div>
                                                <div className="w-[90%] px-[0.4rem] py-[0.8rem] flex items-center gap-2 transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    {t("navbar.cultural_tour")}
                                                </div>
                                                <div className="w-[90%] px-[0.4rem] py-[0.8rem] flex items-center gap-2 transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    {t("navbar.family_holiday")}
                                                </div>
                                                <div className="w-[90%] px-[0.4rem] py-[0.8rem] flex items-center gap-2 transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    {t("navbar.nature_adventure")}
                                                </div>
                                                <div className="w-[90%] px-[0.4rem] py-[0.8rem] flex items-center gap-2 transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    {t("navbar.honeymoon_tour")}
                                                </div>
                                                <div className="w-[90%] px-[0.4rem] py-[0.8rem] flex items-center gap-2 transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    {t("navbar.bike_tour")}
                                                </div>
                                                <div className="w-[90%] px-[0.4rem] py-[0.8rem] flex items-center gap-2 transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    {t("navbar.luxury_travel")}
                                                </div>
                                                <div className="w-[90%] px-[0.4rem] py-[0.8rem] flex items-center gap-2 transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    {t("navbar.off_beaten_track")}
                                                </div>
                                                <div className="w-[90%] px-[0.4rem] py-[0.8rem] flex items-center gap-2 transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    {t("navbar.food_culinary_tour")}
                                                </div>
                                                <div className="w-[90%] px-[0.4rem] py-[0.8rem] flex items-center gap-2 transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    {t("navbar.wellness_relaxation")}
                                                </div>
                                            </div>

                                            <div className="">
                                                <div className="w-[90%] px-[0.4rem] py-[0.8rem] flex items-center gap-2 text-[#ef8d21] text-[1rem] uppercase font-semibold rounded-[6px]">
                                                    {t("navbar.combine_tour")}
                                                </div>
                                                <div className="w-[90%] px-[0.4rem] py-[0.8rem] flex items-center gap-2 transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    Vietnam & Cambodia
                                                </div>
                                                <div className="w-[90%] px-[0.4rem] py-[0.8rem] flex items-center gap-2 transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    Vietnam & Laos
                                                </div>
                                                <div className="w-[90%] px-[0.4rem] py-[0.8rem] flex items-center gap-2 transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    Vietnam & Thailand
                                                </div>
                                                <div className="w-[90%] px-[0.4rem] py-[0.8rem] flex items-center gap-2 transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    Vietnam – Laos – Cambodia
                                                </div>
                                                <div className="w-[90%] px-[0.4rem] py-[0.8rem] flex items-center gap-2 transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    Indochina Discovery
                                                </div>
                                                <div className="w-[90%] px-[0.4rem] py-[0.8rem] flex items-center gap-2 transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    Southeast Asia Highlights
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* TRAVEL INFORMATION */}
                        <div
                            className="px-4 py-2 rounded cursor-pointer hover-nav-color uppercase"
                            onMouseEnter={() => setOpenDetail({ open: true, pop: 2 })}
                            onMouseLeave={() => setOpenDetail({ open: false, pop: 0 })}>
                            {t("navbar.travel_infor")}
                            <AnimatePresence>
                                {openDetail?.open && openDetail?.pop === 2 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute left-0 top-full mt-2 w-[80%] bg-white text-black rounded shadow-lg shadow-[#5c626361]
                                    opacity-0
                                    transform transition-all text-[0.8rem] cursor-default normal-case">
                                        <div className="grid grid-cols-3 p-[0.8rem] bg-[#f8fcf3] overflow-clip">
                                            <div className="">
                                                <div className="w-[90%] px-[0.4rem] py-[0.8rem] flex items-center gap-2 text-[#ef8d21] text-[1rem] uppercase font-semibold rounded-[6px]">
                                                    {t("navbar.northen_vn")}
                                                </div>
                                                <div className="w-[90%] px-[1rem] py-[0.8rem] transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    Hanoi
                                                </div>
                                                <div className="w-[90%] px-[1rem] py-[0.8rem] transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    Sapa
                                                </div>
                                                <div className="w-[90%] px-[1rem] py-[0.8rem] transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    Ninh Binh
                                                </div>
                                                <div className="w-[90%] px-[1rem] py-[0.8rem] transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    Mai Chau
                                                </div>
                                                <div className="w-[90%] px-[1rem] py-[0.8rem] transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    Ha Long Bay
                                                </div>
                                                <div className="w-[90%] px-[1rem] py-[0.8rem] transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    Mu Cang Chai
                                                </div>
                                                <div className="w-[90%] px-[1rem] py-[0.8rem] transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    Cao Bang
                                                </div>
                                                <div className="w-[90%] px-[1rem] py-[0.8rem] transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    Ha Giang
                                                </div>
                                                <div className="w-[90%] px-[1rem] py-[0.8rem] transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    Pu Luong
                                                </div>
                                                <div className="w-[90%] px-[1rem] py-[0.8rem] transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    Cat Ba
                                                </div>
                                            </div>

                                            <div className="">
                                                <div className="w-[90%] px-[0.4rem] py-[0.8rem] flex items-center gap-2 text-[#ef8d21] text-[1rem] uppercase font-semibold rounded-[6px]">
                                                    {t("navbar.central_vn")}
                                                </div>
                                                <img
                                                    srcSet={`${imgBanner.hue}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                    src={`${imgBanner.hue}?w=164&h=150&fit=crop&auto=format`}
                                                    className="hidden lg:block mt-[0.5rem] w-[80%] max-h-[120px] object-cover rounded-[0.3rem]"
                                                    alt={imgBanner.hue}
                                                    loading="lazy"
                                                />
                                                <div className="w-[90%] px-[1rem] py-[0.8rem] transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    Hue
                                                </div>
                                                <div className="w-[90%] px-[1rem] py-[0.8rem] transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    Da Nang
                                                </div>
                                                <div className="w-[90%] px-[1rem] py-[0.8rem] transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    Hoi An
                                                </div>
                                                <div className="w-[90%] px-[1rem] py-[0.8rem] transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    Phong Nha
                                                </div>
                                                <div className="w-[90%] px-[1rem] py-[0.8rem] transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    Quang Binh
                                                </div>
                                                <div className="w-[90%] px-[1rem] py-[0.8rem] transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    Nha Trang
                                                </div>
                                                <div className="w-[90%] px-[1rem] py-[0.8rem] transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    Da Lat
                                                </div>
                                            </div>

                                            <div className="">
                                                <div className="w-[90%] px-[0.4rem] py-[0.8rem] flex items-center gap-2 text-[#ef8d21] text-[1rem] uppercase font-semibold rounded-[6px]">
                                                    {t("navbar.south_vn")}
                                                </div>
                                                <div className="w-[90%] px-[1rem] py-[0.8rem] transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    Ho Chi Minh
                                                </div>
                                                <div className="w-[90%] px-[1rem] py-[0.8rem] transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    Can Tho
                                                </div>
                                                <div className="w-[90%] px-[1rem] py-[0.8rem] transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    Phu Quoc
                                                </div>
                                                <div className="w-[90%] px-[1rem] py-[0.8rem] transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer">
                                                    Ben Tre
                                                </div>
                                                <img
                                                    srcSet={`${imgBanner.hoian}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                    src={`${imgBanner.hoian}?w=164&h=150&fit=crop&auto=format`}
                                                    className="mt-[0.5rem] w-[80%] max-h-[150px] object-cover rounded-[0.3rem]"
                                                    alt={imgBanner.hoian}
                                                    loading="lazy"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* About US */}
                        <div className="px-4 py-2 rounded cursor-pointer hover-nav-color uppercase">
                            {t("about_us")}
                        </div>

                        {/* About US */}
                        <div className="px-4 py-2 rounded cursor-pointer hover-nav-color uppercase">{t("blog")}</div>

                        {/* Contact  */}
                        <div
                            className="ml-auto px-5 py-2 rounded-full cursor-pointer uppercase font-semibold
                                    bg-white text-[#ef8d21]
                                    border border-[#ef8d21]
                                    shadow-sm shadow-black/10
                                    tracking-widest
                                    transition-all duration-300
                                    hover:bg-[#ef8d21]
                                    hover:text-white
                                    hover:shadow-lg hover:shadow-[#ef8d2140]
                                    hover:scale-[1.03]">
                            {t("contact_us")}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
