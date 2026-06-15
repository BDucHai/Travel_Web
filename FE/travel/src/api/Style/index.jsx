import axiosClient from "../axios";

export const getStyles = async (params = {}) => {
    const { data } = await axiosClient.get("/tour-styles", { params });

    return data;
};
