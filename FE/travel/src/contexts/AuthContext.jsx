import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [lang, setLang] = useState("en");

    const login = (data) => setUser(data);
    const logout = () => setUser(null);

    const changeLang = (newLang) => {
        setLang(newLang);
    };

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("session"));
        if (data && new Date().getTime() < data.expiry) {
            setUser(data.user);
        } else {
            localStorage.removeItem("session");
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
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
