import axiosClient from "../axios";

export const getStyles = async (params = {}) => {
    const { data } = await axiosClient.get("/styles", { params });

    return data;
};
