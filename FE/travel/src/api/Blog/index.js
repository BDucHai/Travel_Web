import axiosClient from "../axios";
import { toast } from "react-toastify";
import i18n from "../../i18n";

export const createBlog = async (data) => {
    try {
        const res = await axiosClient.post("/admin/blogs", data);

        toast.success(i18n.t("notify.create_success"));
        return res?.data;
    } catch (error) {
        toast.error(i18n.t("notify.create_fail"));
    }
};

export const deleteBlog = async (id) => {
    try {
        await axiosClient.delete(`/admin/blogs/${id}`);

        toast.success(i18n.t("notify.delete_success"));
    } catch (error) {
        toast.error(i18n.t("notify.delete_fail"));
    }
};

export const getBlog = async (params) => axiosClient.get("/blogs", { params }).then((res) => res?.data);

export const getMostReadBlog = async (params) =>
    axiosClient.get("/blogs/most-read", { params }).then((res) => res?.data);

export const getBlogById = async ({ slug, lang }) => {
    try {
        const res = await axiosClient.get(`/blogs/${slug}`, {
            params: { lang },
        });

        return res?.data;
    } catch (err) {
        toast.error(i18n.t("notify.fail"));
    }
};

export const getBlogAdmin = async (params) => axiosClient.get("/admin/blogs", { params }).then((res) => res?.data);

export const getBlogAdminById = async ({ id }) => {
    try {
        const res = await axiosClient.get(`/admin/blogs/${id}`);

        return res?.data;
    } catch (err) {
        toast.error(i18n.t("notify.fail"));
    }
};

export const updateBlog = async ({ id, data }) => {
    try {
        const res = await axiosClient.put(`/admin/blogs/${id}`, data);

        toast.success(i18n.t("notify.update_success"));

        return res?.data;
    } catch (err) {
        toast.error(i18n.t("notify.update_fail"));
    }
};
