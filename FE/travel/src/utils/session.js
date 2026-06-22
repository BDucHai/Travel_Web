// utils/session.js

export const setSession = (user) => {
    const expiry = new Date().getTime() + 10 * 24 * 60 * 60 * 1000;
    const data = { user, expiry };
    localStorage.setItem("session", JSON.stringify(data));
};

export const getSession = () => {
    const session = localStorage.getItem("session");
    const accessToken = localStorage.getItem("accessToken");

    if (!session || !accessToken) {
        localStorage.removeItem("session");
        localStorage.removeItem("accessToken");
        return null;
    }

    try {
        const parsed = JSON.parse(session);

        if (new Date().getTime() > parsed.expiry) {
            localStorage.removeItem("session");
            localStorage.removeItem("accessToken");
            return null;
        }

        // hợp lệ thì trả user
        return parsed.user;
    } catch (error) {
        localStorage.removeItem("session");
        localStorage.removeItem("accessToken");
        return null;
    }
};

export const clearSession = () => {
    localStorage.removeItem("session");
    localStorage.removeItem("accessToken");
};
