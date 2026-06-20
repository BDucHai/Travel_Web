import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { setSession } from "../../utils/session";
import { LoginUser } from "../../api/User";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
    const { setUser } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        const expireTime = Date.now() + 3600000;
    e.preventDefault();
    setLoading(true);

    try {
        const res = await LoginUser({
        username,
        password,
        });

        setUser({
            username: res?.username,
            fullName: res?.fullName,
            roles: res?.roles,
            expireTime,
        });
        setSession({ username: res?.username,
            fullName: res?.fullName,
            roles: res?.roles});
        localStorage.setItem("accessToken", res?.accessToken);

        navigate("/admin/blog");
    } catch (err) {
        toast.error(
        err?.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại!"
        );
    } finally {
        setLoading(false);
    }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-md bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-white mb-6">Welcome Back</h2>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">User</label>

                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                            placeholder=""
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                            placeholder="••••••••"
                        />
                    </div>

                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-semibold shadow-lg transition disabled:opacity-50">
                        {loading ? "Logging in..." : "Login"}
                    </motion.button>
                </form>

                {/* <p className="mt-6 text-center text-gray-400 text-sm">
                    Don’t have an account?{" "}
                    <a href="#" className="text-indigo-400 hover:underline">
                        Sign up
                    </a>
                </p> */}
            </motion.div>
        </div>
    );
}
