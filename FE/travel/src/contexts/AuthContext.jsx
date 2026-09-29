import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [lang, setLang] = useState("fr");
    const [notiContact, setNotiContact] = useState(false);
    const [notiComment, setNotiComment] = useState(false);

    const login = (data) => setUser(data);
    const logout = () => setUser(null);

    const changeLang = (newLang) => {
        setLang(newLang || "fr");
    };

    useEffect(() => {
        const sessionStr = localStorage.getItem("session");

        if (!sessionStr) {
            setUser(null);
            return;
        }

        try {
            const session = JSON.parse(sessionStr);

            if (Date.now() >= session.expiry) {
                localStorage.removeItem("session");
                localStorage.removeItem("accessToken");
                setUser(null);
                return;
            }

            setUser({
                username: session.user?.username,
                fullName: session.user?.fullName,
                roles: session.user?.roles || [],
            });
        } catch (error) {
            console.error("Invalid session data", error);

            localStorage.removeItem("session");
            localStorage.removeItem("accessToken");
            setUser(null);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                lang,
                login,
                logout,
                changeLang,
                notiComment,
                setNotiComment,
                notiContact,
                setNotiContact,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
