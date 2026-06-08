import axiosClient from "../axios";
import { toast } from "react-toastify";
import { mutate } from "swr";
import i18n from "../../i18n";

export const createBlog = async (data) => {
    try {
        await axiosClient.post("/blogs", data);

        toast.success(i18n.t("notify.create_success"));
        mutate("/blogs");
    } catch (error) {
        toast.error(i18n.t("notify.create_fail"));
    }
};

export const deleteBlog = async (id) => {
    try {
        // await axiosClient.delete(`/blogs/${id}`);

        toast.success(i18n.t("notify.delete_success"));

        mutate("/blogs");
    } catch (error) {
        toast.error(i18n.t("notify.delete_fail"));
    }
};

export const getBlog = async (params) => {
    const response = await axiosClient.get("/blogs", {
        params,
    });
    return response?.data;
};

export const getBlogById = async ({ id }) => {
    try {
        const res = await axiosClient.get(`/blog/${id}`);

        return res?.data;
    } catch (err) {
        toast.error(i18n.t("notify.fail"));
    }
};

export const updateBlog = async ({ id, data }) => {
    try {
        const res = await axiosClient.post(`/blog/${id}`, data);

        toast.success(i18n.t("notify.update_success"));

        return res?.data;
    } catch (err) {
        toast.error(i18n.t("notify.update_fail"));
    }
};
