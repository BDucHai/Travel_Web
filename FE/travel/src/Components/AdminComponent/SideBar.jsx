import React from "react";
import { Drawer, useMediaQuery } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import { useLocation, useNavigate } from "react-router-dom";

import { FaSquareWebAwesomeStroke } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { SiBlogger } from "react-icons/si";
import { LiaBlogSolid } from "react-icons/lia";
import { MdOutlineTour } from "react-icons/md";
import { BiSolidCommentEdit } from "react-icons/bi";
import { GiCampingTent } from "react-icons/gi";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { clearSession } from "../../utils/session";

const SideBar = ({ openSideBar, setOpenSideBar }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const isMobile = useMediaQuery("(max-width:900px)");

    const listMenu = [
        {
            id: 1,
            title: t("admin.view_page"),
            icon: <FaSquareWebAwesomeStroke />,
            direct: "/",
        },
        {
            id: 2,
            title: t("admin.list_blog"),
            icon: <SiBlogger />,
            direct: "/admin/blog",
        },
        {
            id: 3,
            title: t("admin.create_blog"),
            icon: <LiaBlogSolid />,
            direct: "/admin/create/blog",
        },
        {
            id: 4,
            title: t("admin.tour"),
            icon: <MdOutlineTour />,
            direct: "/admin/tour",
        },
        {
            id: 5,
            title: t("admin.create_tour"),
            icon: <GiCampingTent />,
            direct: "/admin/create/tour",
        },
        {
            id: 6,
            title: t("admin.manage_review"),
            icon: <BiSolidCommentEdit />,
            direct: "/admin/review",
        },
        {
            id: 7,
            title: t("admin.contact"),
            icon: <FaPhoneVolume />,
            direct: "/admin/contact",
        },
        {
            id: 8,
            title: t("admin.manageUser"),
            icon: <FaHouseChimneyUser />,
            direct: "/admin/manageUser",
        },
        {
            id: 9,
            title: t("admin.logout"),
            icon: <MdLogout />,
            direct: "/admin/login",
        },
    ];

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            open={openSideBar}
            sx={{
                width: openSideBar ? (isMobile ? "80%" : 280) : 90,

                flexShrink: 0,

                "& .MuiDrawer-paper": {
                    width: openSideBar ? (isMobile ? "80%" : 280) : 90,

                    transition: "all 0.3s ease",
                    background: "#111827",
                    color: "white",
                    borderRight: "1px solid #1f2937",
                    overflowX: "hidden",
                    boxSizing: "border-box",
                },
            }}>
            <div className="relative w-full h-full flex flex-col">
                {/* Logo */}
                <div
                    className={`
                        h-[5rem]
                        flex
                        items-center
                        border-b
                        border-[#1f2937]
                        transition-all
                        duration-300
                        ${openSideBar ? "justify-between px-6" : "justify-center"}
                    `}>
                    <AnimatePresence>
                        {openSideBar && (
                            <motion.h1
                                initial={{
                                    opacity: 0,
                                    x: -20,
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    x: -20,
                                }}
                                transition={{ duration: 0.2 }}
                                className="
                                    text-[1.3rem]
                                    font-semibold
                                    whitespace-nowrap
                                ">
                                {t("admin.menu")}
                            </motion.h1>
                        )}
                    </AnimatePresence>

                    {/* Toggle */}
                    <motion.div
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setOpenSideBar((prev) => !prev)}
                        className="
                            w-[2.5rem]
                            h-[2.5rem]
                            rounded-full
                            bg-[#1e293b]
                            border
                            border-[#334155]
                            flex
                            items-center
                            justify-center
                            cursor-pointer
                            shrink-0
                        ">
                        {openSideBar ? (
                            <MdKeyboardArrowLeft className="text-[1.3rem]" />
                        ) : (
                            <MdKeyboardArrowRight className="text-[1.3rem]" />
                        )}
                    </motion.div>
                </div>

                {/* Menu */}
                <div className="flex-1 flex flex-col gap-2 p-4">
                    {listMenu?.map((item) => {
                        const active = location.pathname === item.direct;
                        if(item?.id === 9){
                            return ( <motion.div
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.98 }}
                                key={item.id}
                                onClick={() => {
                                    clearSession();
                                    navigate(item.direct);
                                }}
                                className={`
                                    group
                                    flex
                                    items-center
                                    justify-start px-4
                                    gap-4
                                    py-4
                                    rounded-xl
                                    cursor-pointer
                                    transition-all
                                    duration-50
                                    ${active ? "bg-[#1e293b] border border-[#334155]" : "hover:bg-[#1f2937]"}
                                `}>
                                {/* Icon */}
                                <div
                                    className={`
                                        text-[1.2rem]
                                        shrink-0
                                        ${active ? "text-[#60a5fa]" : "text-white"}
                                    `}>
                                    {item?.icon}
                                </div>

                                {/* Text */}
                                <AnimatePresence>
                                    {openSideBar && (
                                        <motion.p
                                            initial={{
                                                opacity: 0,
                                                x: -10,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                x: 0,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                x: -10,
                                            }}
                                            className={`
                                                text-[0.95rem]
                                                font-medium
                                                whitespace-nowrap
                                                ${active ? "text-[#60a5fa]" : "text-white"}
                                            `}>
                                            {item?.title}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </motion.div>)
                        }
                        return (
                            <motion.div
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.98 }}
                                key={item?.id}
                                onClick={() => navigate(item.direct)}
                                className={`
                                    group
                                    flex
                                    items-center
                                    justify-start px-4
                                    gap-4
                                    py-4
                                    rounded-xl
                                    cursor-pointer
                                    transition-all
                                    duration-50
                                    ${active ? "bg-[#1e293b] border border-[#334155]" : "hover:bg-[#1f2937]"}
                                `}>
                                {/* Icon */}
                                <div
                                    className={`
                                        text-[1.2rem]
                                        shrink-0
                                        ${active ? "text-[#60a5fa]" : "text-white"}
                                    `}>
                                    {item?.icon}
                                </div>

                                {/* Text */}
                                <AnimatePresence>
                                    {openSideBar && (
                                        <motion.p
                                            initial={{
                                                opacity: 0,
                                                x: -10,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                x: 0,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                x: -10,
                                            }}
                                            className={`
                                                text-[0.95rem]
                                                font-medium
                                                whitespace-nowrap
                                                ${active ? "text-[#60a5fa]" : "text-white"}
                                            `}>
                                            {item?.title}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </Drawer>
    );
};

export default SideBar;
