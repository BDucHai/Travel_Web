import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { setSession } from "../../utils/session";

export default function Login() {

    const {user, setUser} = useAuth();
    const  handleLogin = () =>{
        const fakeUser = { email: "you@example.com", name: "John Doe" };
        setUser(fakeUser);
        setSession(fakeUser);
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Welcome Back
        </h2>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="••••••••"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-semibold shadow-lg transition"
            onClick={handleLogin}
          >
            Login
          </motion.button>
        </form>
        <p className="mt-6 text-center text-gray-400 text-sm">
          Don’t have an account?{" "}
          <a href="#" className="text-indigo-400 hover:underline">
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
}
