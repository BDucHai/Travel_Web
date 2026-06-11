import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
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
