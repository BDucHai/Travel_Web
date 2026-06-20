import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { LuTableOfContents } from "react-icons/lu";
import { IoCaretDownOutline } from "react-icons/io5";
import { imgBanner, imgGlobal, imgLang } from "../assets/images";
import ContactModal from "./ContactModal";
import useSWR from "swr";
import { getMegaMenu } from "../api/Home";
import { durationsDays } from "../constant";

const Navbar = ({ home }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { changeLang, lang } = useAuth();
    const [openDetail, setOpenDetail] = useState({
        open: false,
        pop: 0,
    });

    const [openContactModal, setOpenContactModal] = useState(false);

    const [openNavMobile, setOpenNavMobile] = useState(false);
    const [navChild, setNavChild] = useState([]);

    const [navChildVNTour, setNavChildVNTour] = useState([]);
    const [navChildTravelInfor, setNavChildTravelInfor] = useState([]);

    const { data: megaMenu } = useSWR([`/layout/mega-menu`, { lang: lang }], ([_, params]) => getMegaMenu(params));
    return (
        <>
            <div
                className={`${home ? "absolute bg-linear-to-b from-[#2d3435f2] to-[#3c4d5678] text-white" : "sticky top-0 bg-[#fff] text-[#000]"} top-0 left-0 z-[800] py-[0.5rem] md:px-[2rem] w-full text[1rem] ${lang === "en" ? "xl:text-[1.3rem]" : "text-[1rem]"}  font-roboto font-bold`}>
                {/* I18 language */}
                <div className="hidden lg:flex items-center justify-end">
                    <div
                        className={`flex items-center gap-1 p-1 rounded-full ${home ? "bg-white/10" : "bg-[#000]"}  backdrop-blur-xl border border-white/20 shadow-lg`}>
                        {/* EN */}
                        <button
                            onClick={() => {
                                i18n.changeLanguage("en");
                                changeLang("en");
                            }}
                            className={`relative font-semibold rounded-full transition-all duration-300 px-1 py-1 text-[10px] lg:px-3 lg:py-1.5 lg:text-xs
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
                                                px-1 py-1 text-[10px]
                                                lg:px-3 lg:py-1.5 lg:text-xs
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
                <div className="flex justify-between items-center px-[1rem] md:px-0">
                    <div
                        className="flex-1 lg:flex-[0.3] flex gap-2 items-center cursor-pointer"
                        onClick={() => navigate("/")}>
                        <img
                            src={imgGlobal.logo}
                            className="w-[2rem] h-[2rem] lg:w-[3.1rem] lg:h-[3.1rem] object-cover"
                            alt="logo"
                        />
                        <div>
                            <div
                                className={`text-wrap text-[1rem] lg:text-[1.4rem] w-[60px] ${home ? "text-[#f0f6cc]" : "text-dark"}`}>
                                REVES INDOCHINE
                            </div>
                            <div
                                className={`text-[0.4rem] lg:text-[0.6rem] mb-[0.1rem] ${home ? "" : "text-[#000000a8]"}`}>
                                DREAM OF INDOCHINE
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:flex relative flex-1 items-center">
                        <div
                            className={`px-4 py-2 rounded cursor-pointer ${home ? "hover-nav-color" : "text-dark hover:text-[#ef8d21]"} uppercase`}
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
                                    transform transition-all text-[0.85rem] cursor-default normal-case">
                                        <div className="grid grid-cols-3 gap-x-[10px] gap-y-[6px] p-[0.8rem] bg-[#f8fcf3] overflow-clip">
                                            <div className="">
                                                {durationsDays?.map((dura) => (
                                                    <div
                                                        className="w-[90%] px-[0.4rem] py-[0.8rem] transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer"
                                                        onClick={() => navigate(`/tours?duration=${durationsDays?.value}`)}>
                                                        {t(dura?.title)}
                                                    </div>
                                                ))}

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
                                                <div
                                                    className="w-[90%] px-[0.4rem] py-[0.8rem] flex items-center gap-2 text-[#ef8d21] text-[1rem] uppercase font-semibold rounded-[6px] cursor-pointer"
                                                    onClick={() =>
                                                        navigate(`/tour/search?style=all&title=navbar.all_style_tour`)
                                                    }>
                                                    {t("navbar.all_style_tour")}
                                                </div>
                                                {megaMenu?.vietnamTour?.styles?.map((style) => (
                                                    <div
                                                        className="w-[90%] px-[0.4rem] py-[0.8rem] flex items-center gap-2 transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer"
                                                        onClick={() => navigate(style?.url)}>
                                                        {style?.label}
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="">
                                                <div
                                                    className="w-[90%] px-[0.4rem] py-[0.8rem] flex items-center gap-2 text-[#ef8d21] text-[1rem] uppercase font-semibold rounded-[6px] cursor-pointer"
                                                    // onClick={() =>
                                                    //     navigate(
                                                    //         `/tour/search?combineTour=all&title=navbar.combine_tour`,
                                                    //     )
                                                    // }
                                                >
                                                    {t("navbar.combine_tour")}
                                                </div>
                                                {megaMenu?.vietnamTour?.combined?.map((cb) => (
                                                    <div
                                                        className="w-[90%] px-[0.4rem] py-[0.8rem] flex items-center gap-2 transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer"
                                                        onClick={() => navigate(cb?.url)}>
                                                        {cb?.label}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* TRAVEL INFORMATION */}
                        <div
                            className={`px-4 py-2 rounded cursor-pointer ${home ? "hover-nav-color" : "text-dark hover:text-[#ef8d21]"} uppercase`}
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
                                    transform transition-all text-[0.85rem] cursor-default normal-case">
                                        <div className="grid grid-cols-3 p-[0.8rem] bg-[#f8fcf3] overflow-clip">
                                            <div className="">
                                                <div
                                                    className="w-[90%] px-[0.4rem] py-[0.8rem] flex items-center gap-2 text-[#ef8d21] text-[1rem] uppercase font-semibold rounded-[6px] cursor-pointer"
                                                    // onClick={() => navigate(`/tours?region=NORTH`)}
                                                >
                                                    {t("navbar.northen_vn")}
                                                </div>
                                                {megaMenu?.travelInformation?.north?.map((no) => (
                                                    <div
                                                        className="w-[90%] px-[1rem] py-[0.8rem] transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer"
                                                        onClick={() => navigate(`/tours?destinationSlug=${no?.slug}`)}>
                                                        {no?.label}
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="">
                                                <div
                                                    className="w-[90%] px-[0.4rem] py-[0.8rem] flex items-center gap-2 text-[#ef8d21] text-[1rem] uppercase font-semibold rounded-[6px] cursor-pointer"
                                                    // onClick={() => navigate(`/tours?region=CENTRAL`)}
                                                >
                                                    {t("navbar.central_vn")}
                                                </div>
                                                <img
                                                    srcSet={`${imgBanner.hue}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                    src={`${imgBanner.hue}?w=164&h=150&fit=crop&auto=format`}
                                                    className="hidden lg:block mt-[0.5rem] w-[80%] max-h-[120px] object-cover rounded-[0.3rem]"
                                                    alt={imgBanner.hue}
                                                    loading="lazy"
                                                />
                                                {megaMenu?.travelInformation?.central?.map((cen) => (
                                                    <div
                                                        className="w-[90%] px-[1rem] py-[0.8rem] transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer"
                                                        onClick={() => navigate(`/tours?destinationSlug=${cen?.slug}`)}>
                                                        {cen?.label}
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="">
                                                <div
                                                    className="w-[90%] px-[0.4rem] py-[0.8rem] flex items-center gap-2 text-[#ef8d21] text-[1rem] uppercase font-semibold rounded-[6px] cursor-pointer"
                                                    // onClick={() => navigate(`/tours/region=SOUTH`)}
                                                >
                                                    {t("navbar.south_vn")}
                                                </div>
                                                {megaMenu?.travelInformation?.south?.map((s) => (
                                                    <div
                                                        className="w-[90%] px-[1rem] py-[0.8rem] transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer"
                                                        onClick={() => navigate(`/tours?destinationSlug=${s?.slug}`)}>
                                                        {s?.label}
                                                    </div>
                                                ))}
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
                        <div
                            className={`px-4 py-2 rounded cursor-pointer ${home ? "hover-nav-color" : "text-dark hover:text-[#ef8d21]"} uppercase`}
                            onClick={() => navigate("/about")}>
                            {t("about_us")}
                        </div>

                        {/* About US */}
                        <div
                            className={`px-4 py-2 rounded cursor-pointer ${home ? "hover-nav-color" : "text-dark hover:text-[#ef8d21]"} uppercase`}
                            onClick={() => navigate("/blog")}>
                            {t("blog")}
                        </div>

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
                                    hover:scale-[1.03]"
                            onClick={() => setOpenContactModal(true)}>
                            {t("contact_us")}
                        </div>
                    </div>

                    {/* Mobile */}
                    <div className="flex-1 flex justify-end items-center lg:hidden">
                        <div
                            className="px-[1rem] py-[0.5rem] text-[1.5rem]"
                            onClick={() => {
                                setOpenNavMobile(!openNavMobile);
                                setNavChild([]);
                            }}>
                            <LuTableOfContents />
                        </div>
                    </div>
                </div>
                {/* Nav Show Mobile */}
                <AnimatePresence mode="wait">
                    {openNavMobile && (
                        <motion.div
                            className="flex flex-col lg:hidden w-full bg-[#333333] text-[0.85rem] max-h-[80vh]"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}>
                            <div className="pt-[1rem] overflow-scroll">
                                {/* VIETNAM TOUR MOBILE */}
                                <div
                                    className={`flex items-center px-[1rem] py-[0.75rem] uppercase gap-1 text-[1rem] ${navChild.includes(1) ? "bg-[#fff] text-[#ef8d21]" : "bg-transparent text-[#fff]"}`}
                                    onClick={() => {
                                        setNavChild((prev) =>
                                            prev.includes(1) ? prev.filter((item) => item !== 1) : [...prev, 1],
                                        );
                                    }}>
                                    {t("navbar.vietnam_tour")}
                                    <motion.div
                                        animate={{ rotate: navChild.includes(1) ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}>
                                        <IoCaretDownOutline />
                                    </motion.div>
                                </div>
                                {navChild.includes(1) && (
                                    <div className="transition-all duration-300 text-[0.85rem]">
                                        <div
                                            className={`flex items-center px-[1.75rem] py-[0.5rem] gap-1 ${navChildVNTour.includes(1) ? "bg-[#fff] text-[#ef8d21]" : "bg-transparent text-[#fff]"}`}
                                            onClick={() =>
                                                setNavChildVNTour((prev) =>
                                                    prev.includes(1) ? prev.filter((item) => item !== 1) : [...prev, 1],
                                                )
                                            }>
                                            {t("navbar.duration")}
                                            <div>
                                                <IoCaretDownOutline />
                                            </div>
                                        </div>

                                        {/* Child Duration  */}
                                        {navChildVNTour.includes(1) &&
                                              durationsDays?.map((dura) => (
                                                    <div
                                                        className="w-[90%] px-[0.4rem] py-[0.8rem] transition hover:text-[#ef8d21] hover:scale-105 hover:bg-[#d1edf0] rounded-[6px] cursor-pointer"
                                                        onClick={() => navigate(`/tours?duration=${durationsDays?.value}`)}>
                                                        {t(dura?.title)}
                                                    </div>
                                                
                                            ))}

                                        <div
                                            className={`flex items-center px-[1.75rem] py-[0.5rem] gap-1 ${navChildVNTour.includes(2) ? "bg-[#fff] text-[#ef8d21]" : "bg-transparent text-[#fff]"}`}
                                            onClick={() =>
                                                setNavChildVNTour((prev) =>
                                                    prev.includes(2) ? prev.filter((item) => item !== 2) : [...prev, 2],
                                                )
                                            }>
                                            {t("navbar.all_style_tour")}
                                            <div>
                                                <IoCaretDownOutline />
                                            </div>
                                        </div>
                                        {navChildVNTour.includes(2) &&
                                            megaMenu?.vietnamTour?.styles?.map((style) => (
                                                <div
                                                    className={`flex items-center px-[4rem] py-[0.5rem] gap-1`}
                                                    onClick={() => navigate(style?.url)}>
                                                    {style?.label}
                                                </div>
                                            ))}
                                        <div
                                            className={`flex items-center px-[1.75rem] py-[0.5rem] gap-1 ${navChildVNTour.includes(3) ? "bg-[#fff] text-[#ef8d21]" : "bg-transparent text-[#fff]"}`}
                                            onClick={() =>
                                                setNavChildVNTour((prev) =>
                                                    prev.includes(3) ? prev.filter((item) => item !== 3) : [...prev, 3],
                                                )
                                            }>
                                            {t("navbar.combine_tour")}
                                            <div>
                                                <IoCaretDownOutline />
                                            </div>
                                        </div>
                                        {navChildVNTour.includes(3) &&
                                            megaMenu?.vietnamTour?.combined?.map((cb) => (
                                                <div
                                                    className={`flex items-center px-[4rem] py-[0.5rem] gap-1`}
                                                    onClick={() => navigate(cb?.url)}>
                                                    {cb?.label}
                                                </div>
                                            ))}
                                    </div>
                                )}
                                {/* TRAVEL INFOR MOBILE */}
                                <div
                                    className={`flex items-center px-[1rem] py-[0.75rem] uppercase gap-1 text-[1rem] ${navChild.includes(2) ? "bg-[#fff] text-[#ef8d21]" : "bg-transparent text-[#fff]"}`}
                                    onClick={() => {
                                        setNavChild((prev) =>
                                            prev.includes(2) ? prev.filter((item) => item !== 2) : [...prev, 2],
                                        );
                                    }}>
                                    {t("navbar.travel_infor")}
                                    <motion.div
                                        animate={{ rotate: navChild.includes(2) ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}>
                                        <IoCaretDownOutline />
                                    </motion.div>
                                </div>

                                {navChild.includes(2) && (
                                    <div className="transition-all duration-300 text-[0.85rem]">
                                        <div
                                            className={`flex items-center px-[1.75rem] py-[0.5rem] gap-1 ${navChildTravelInfor.includes(1) ? "bg-[#fff] text-[#ef8d21]" : "bg-transparent text-[#fff]"}`}
                                            onClick={() =>
                                                setNavChildTravelInfor((prev) =>
                                                    prev.includes(1) ? prev.filter((item) => item !== 1) : [...prev, 1],
                                                )
                                            }>
                                            {t("navbar.northen_vn")}
                                            <div>
                                                <IoCaretDownOutline />
                                            </div>
                                        </div>
                                        {navChildTravelInfor.includes(1) &&
                                            megaMenu?.travelInformation?.north?.map((no) => (
                                                <div
                                                    className={`flex items-center px-[4rem] py-[0.5rem] gap-1`}
                                                    onClick={() => navigate(`/tours?destinationSlug=${no?.slug}`)}>
                                                    {no?.label}
                                                </div>
                                            ))}

                                        {/* Central Mobile */}
                                        <div
                                            className={`flex items-center px-[1.75rem] py-[0.5rem] gap-1 ${navChildTravelInfor.includes(2) ? "bg-[#fff] text-[#ef8d21]" : "bg-transparent text-[#fff]"}`}
                                            onClick={() =>
                                                setNavChildTravelInfor((prev) =>
                                                    prev.includes(2) ? prev.filter((item) => item !== 2) : [...prev, 2],
                                                )
                                            }>
                                            {t("navbar.central_vn")}
                                            <div>
                                                <IoCaretDownOutline />
                                            </div>
                                        </div>
                                        {navChildTravelInfor.includes(2) &&
                                            megaMenu?.travelInformation?.central?.map((cen) => (
                                                <div
                                                    className={`flex items-center px-[4rem] py-[0.5rem] gap-1`}
                                                    onClick={() => navigate(`/tours?destinationSlug=${cen?.slug}`)}>
                                                    {cen?.label}
                                                </div>
                                            ))}
                                        <div
                                            className={`flex items-center px-[1.75rem] py-[0.5rem] gap-1 ${navChildTravelInfor.includes(3) ? "bg-[#fff] text-[#ef8d21]" : "bg-transparent text-[#fff]"}`}
                                            onClick={() =>
                                                setNavChildTravelInfor((prev) =>
                                                    prev.includes(3) ? prev.filter((item) => item !== 3) : [...prev, 3],
                                                )
                                            }>
                                            {t("navbar.south_vn")}
                                            <div>
                                                <IoCaretDownOutline />
                                            </div>
                                        </div>
                                        {navChildTravelInfor.includes(3) &&
                                            megaMenu?.travelInformation?.south?.map((sou) => (
                                                <div
                                                    className={`flex items-center px-[4rem] py-[0.5rem] gap-1`}
                                                    onClick={() => navigate(`/tours?destinationSlug=${sou?.slug}`)}>
                                                    {sou?.label}
                                                </div>
                                            ))}
                                    </div>
                                )}

                                <div className={`flex items-center px-[1rem] py-[0.75rem] uppercase gap-1 text-[1rem]`}>
                                    {t("about_us")}
                                </div>

                                <div className={`flex items-center px-[1rem] py-[0.75rem] uppercase gap-1 text-[1rem]`}>
                                    {t("blog")}
                                </div>
                            </div>
                            <div className="mt-auto pb-[0.2rem]">
                                <div
                                    className={`flex justify-center items-center border-t-[1px] px-[1rem] py-[0.75rem] bg-[#289193] uppercase gap-1 text-[1rem]`}>
                                    {t("contact_us")}
                                </div>
                                <div
                                    className={`flex justify-center items-center border-y-[1px] px-[1rem] py-[0.75rem] uppercase gap-1 text-[1rem]`}>
                                    <div>
                                        <img src={imgLang.eng} alt="engLang" className="w-[2rem]" />
                                    </div>
                                    <div className="ml-[3rem]">
                                        <img src={imgLang.france} alt="frLang" className="w-[2rem]" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Modal */}
                <ContactModal t={t} open={openContactModal} onClose={() => setOpenContactModal(false)} />
            </div>
        </>
    );
};

export default Navbar;
