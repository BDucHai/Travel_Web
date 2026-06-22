import axiosClient from "../axios";
import { toast } from "react-toastify";
import i18n from "../../i18n";

export const createTours = async (data) => {
    try {
        const res = await axiosClient.post("/admin/tours/with-images?lang=en", data);

        toast.success(i18n.t("notify.create_success"));

        return res?.data;
    } catch (error) {
        toast.error(i18n.t("notify.create_fail"));
    }
};

export const deleteTours = async (id) => {
    try {
        await axiosClient.delete(`/admin/tours/${id}`);

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
        const res = await axiosClient.get(url, {
            params,
        });

        return res?.data;
    } catch (err) {
        toast.error(i18n.t("notify.fail"));
    }
};

export const updateTours = async ({ id, data }) => {
    try {
        const res = await axiosClient.put(`/admin/tours/update/with-images/${id}`, data);

        toast.success(i18n.t("notify.update_success"));

        return res?.data;
    } catch (err) {
        toast.error(i18n.t("notify.update_fail"));
    }
};

export const getToursAdmin = async (params) => {
    const response = await axiosClient.get("/admin/tours", {
        params,
    });
    return response?.data;
};

export const getToursAdminById = async (id) => {
    const response = await axiosClient.get(`/admin/tours/${id}`);
    return response?.data;
};

export const updateStatusTour = async ({ id, status }) => {
    try {
        await axiosClient.patch(`/admin/tours/${id}/status`, { status });
        toast.success(i18n.t("notify.update_success"));
    } catch (err) {
        toast.error(i18n.t("notify.update_fail"));
    }
};
