import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import SideBar from "../Components/AdminComponent/SideBar";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";

export default function AdminLayout() {
    const { user } = useAuth();

    const isMobile = useMediaQuery("(max-width:1000px)");

    const [openSideBar, setOpenSideBar] = useState(true);

    useEffect(() => {
        setOpenSideBar(!isMobile);
    }, [isMobile]);

    // if (!user) {
    //     return <Navigate to="/admin/login" replace />;
    // }

    return (
        <div className="min-h-screen bg-[#0f172a]">
            <SideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />

            <main
                className={`transition-all duration-300 ${openSideBar ? "md:ml-[280px]  ml-[90px]" : "md:ml-[90px] ml-[90px]"}`}>
                <Outlet />
            </main>
        </div>
    );
}
