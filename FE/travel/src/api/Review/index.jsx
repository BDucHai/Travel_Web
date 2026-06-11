import axiosClient from "../axios";
import { toast } from "react-toastify";
import { mutate } from "swr";
import i18n from "../../i18n";

export const createReview = async (data) => {
    try {
        await axiosClient.post("/reviews", data);

        toast.success(i18n.t("notify.create_success"));
        // mutate("/reviews");
    } catch (error) {
        toast.error(i18n.t("notify.create_fail"));
    }
};

export const getReviews = async (url, params) => axiosClient.get(url, { params }).then((res) => res.data);

export const deleteReview = async (id) => {
    try {
        await axiosClient.delete(`/reviews/${id}`);
        toast.success(i18n.t("notify.delete_success"));

        mutate("/reviews");
    } catch (error) {
        toast.error(i18n.t("notify.delete_fail"));
    }
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
        mutate("/reviews");
        return res?.data;
    } catch (err) {
        toast.error(i18n.t("notify.update_fail"));
    }
};
 
export const updateStatusReviews = async (id, status) => {
    try {
        const res = await axiosClient.post(`/reviews/${id}`, { status });
        toast.success(i18n.t("notify.update_success"));
        return res?.data;
    } catch (err) {
        toast.error(i18n.t("notify.update_fail"));
    }
};