import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import SideBar from "../Components/AdminComponent/SideBar";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";

export default function AdminLayout() {
    const { setUser } = useAuth();

    const sessionStr = localStorage.getItem("session");
    const tokenStr = localStorage.getItem("accessToken");

    const isMobile = useMediaQuery("(max-width:1000px)");
    const [openSideBar, setOpenSideBar] = useState(true);

    useEffect(() => {
        setOpenSideBar(!isMobile);
    }, [isMobile]);

    useEffect(() => {
        let valid = true;

        if (sessionStr) {
        try {
            const session = JSON.parse(sessionStr);
            if (Date.now() > session?.expireTime) {
            localStorage.removeItem("session");
            valid = false;
            } else {
            setUser(session);
            }
        } catch (e) {
            console.error("Invalid session data", e);
            valid = false;
        }
        } else {
        valid = false;
        }
        if (!valid) {
        setUser(null);
        }
    }, [setUser, sessionStr, tokenStr]);

    if (!sessionStr || !tokenStr) {
        return <Navigate to="/admin/login" replace />;
    }
    
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
