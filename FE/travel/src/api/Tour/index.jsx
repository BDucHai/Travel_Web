import axiosClient from "../axios";
import { toast } from "react-toastify";
import i18n from "../../i18n";

export const createTours = async (data) => {
    try {
        const res = await axiosClient.post("/tours", data);

        toast.success(i18n.t("notify.create_success"));

        return res?.data;
    } catch (error) {
        toast.error(i18n.t("notify.create_fail"));

        throw error;
    }
};

export const deleteTours = async (id) => {
    try {
        await axiosClient.delete(`/tours/${id}`);

        toast.success(i18n.t("notify.delete_success"));
    } catch (error) {
        toast.error(i18n.t("notify.delete_fail"));
    }
};

export const getTours = async (params) => {
    const response = await axiosClient.get("/tours", {
        params,
    });
    return response?.data;
};

export const getToursById = async (url, params) => {
    try {
        const res = await axiosClient.get(url, params);

        return res?.data;
    } catch (err) {
        toast.error(i18n.t("notify.fail"));
    }
};

export const updateTours = async ({ id, data }) => {
    try {
        const res = await axiosClient.post(`/tours/${id}`, data);

        toast.success(i18n.t("notify.update_success"));

        return res?.data;
    } catch (err) {
        toast.error(i18n.t("notify.update_fail"));
    }
};

export const updateStatusTour = async ({ id, status }) => {
    try {
        await axiosClient.post(`/tours/status/${id}`, { id, status });
        toast.success(i18n.t("notify.update_success"));
    } catch (err) {
        toast.error(i18n.t("notify.update_fail"));
    }
};
