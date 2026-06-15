import axiosClient from "../axios";

export const getTourCollections = async (params = {}) => {
    const response = await axiosClient.get("/tour-collections", {
        params,
    });
    return response?.data;
};
