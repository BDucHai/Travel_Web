import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://travel-be-ymcm.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        if (config.data instanceof FormData) {
            delete config.headers["Content-Type"];
        }

        return config;
    },
    (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    },
    (config) => {
        if (config.data instanceof FormData) {
            delete config.headers["Content-Type"];
        }

        return config;
    },
);

export default axiosClient;
