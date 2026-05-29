import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [lang, setLang] = useState("en");

    const login = (data) => setUser(data);
    const logout = () => setUser(null);

    const changeLang = (newLang) => {
        setLang(newLang);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
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
