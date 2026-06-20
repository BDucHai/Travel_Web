import axiosClient from "../axios";
import { toast } from "react-toastify";
import i18n from "../../i18n";

export const createReview = async (data) => {
    try {
        const res = await axiosClient.post("/testimonials", data);

        toast.success(i18n.t("notify.create_success"));
        return res?.data;
    } catch (error) {
        toast.error(i18n.t("notify.create_fail"));
    }
};


export const getReviews = async (url, params) => axiosClient.get(url, { params }).then((res) => res?.data);

export const deleteReview = async (id) => {
    try {
        await axiosClient.delete(`/testimonials/${id}`);
        toast.success(i18n.t("notify.delete_success"));
    } catch (error) {
        toast.error(i18n.t("notify.delete_fail"));
    }
};

export const getReviewById = async ({ id }) => {
    try {
        const res = await axiosClient.get(`/testimonials/${id}`);

        return res?.data;
    } catch (err) {
        toast.error(i18n.t("notify.fail"));
    }
};

export const updateReview = async ({ id, data }) => {
    try {
        const res = await axiosClient.post(`/testimonials/${id}`, data);

        toast.success(i18n.t("notify.update_success"));
        return res?.data;
    } catch (err) {
        toast.error(i18n.t("notify.update_fail"));
    }
};

export const updateStatusReviews = async (id) => {
    try {
        const res = await axiosClient.put(`/admin/testimonials/${id}/approve`);
        toast.success(i18n.t("notify.update_success"));
        return res?.data;
    } catch (err) {
        toast.error(i18n.t("notify.update_fail"));
    }
};
