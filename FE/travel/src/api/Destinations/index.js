import axiosClient from "../axios";
import { toast } from "react-toastify";
import i18n from "../../i18n";

export const getDestinations = async (params = {}) => {
    const response = await axiosClient.get("/destinations", {
        params,
    });
    return response?.data;
};

export const createDestinations = async (data) => {
    try {
        const res = await axiosClient.post("/destinations", data);

        toast.success(i18n.t("notify.create_success"));

        return res?.data;
    } catch (error) {
        toast.error(i18n.t("notify.create_fail"));
    }
};

export const getDestinationById = async (id) => {
    const response = await axiosClient.get(`/destinations/${id}`);

    return response.data;
};

export const updateDestination = async (id, data) => {
    try {
        const response = await axiosClient.post(`/destinations/${id}`, data);

        toast.success(i18n.t("notify.update_success"));

        return response?.data;
    } catch (err) {
        toast.error(i18n.t("notify.update_fail"));
    }
};

export const deleteDestination = async (id) => {
    try {
        const response = await axiosClient.delete(`/destinations/${id}`);

        toast.success(i18n.t("notify.delete_success"));
        return response?.data;
    } catch (error) {
        toast.error(i18n.t("notify.delete_fail"));
    }
};
