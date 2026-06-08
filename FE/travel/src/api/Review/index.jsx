import axiosClient from "../axios";
import { toast } from "react-toastify";
import { mutate } from "swr";
import i18n from "../../i18n";

export const createReview = async (data) => {
    try {
        await axiosClient.post("/reviews", data);

        toast.success(i18n.t("notify.create_success"));
        mutate("/reviews");
    } catch (error) {
        toast.error(i18n.t("notify.create_fail"));
    }
};

export const deleteReview = async (id) => {
    try {
        await axiosClient.delete(`/reviews/${id}`);
        toast.success(i18n.t("notify.delete_success"));

        mutate("/reviews");
    } catch (error) {
        toast.error(i18n.t("notify.delete_fail"));
    }
};

export const getReviews = async (params) => {
    const response = await axiosClient.get("/reviews", {
        params,
    });
    return response?.data;
};

export const getReviewById = async ({ id }) => {
    try {
        const res = await axiosClient.get(`/reviews/${id}`);

        return res?.data;
    } catch (err) {
        toast.error(i18n.t("notify.fail"));
    }
};

export const updateReview = async ({ id, data }) => {
    try {
        const res = await axiosClient.post(`/reviews/${id}`, data);

        toast.success(i18n.t("notify.update_success"));

        return res?.data;
    } catch (err) {
        toast.error(i18n.t("notify.update_fail"));
    }
};
