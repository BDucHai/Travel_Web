import axiosClient from "../axios";

export const getTourCollections = async (params = {}) => {
    const response = await axiosClient.get("/tourCollections", {
        params,
    });
    return response?.data;
};
