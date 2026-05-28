import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

export default function MainLayout() {
    return (
        <div className="relative min-h-[100vh]">
            <Navbar />

            <main>
                <Outlet />
            </main>
        </div>
    );
}
