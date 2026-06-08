import axiosClient from "../axios";
import { toast } from "react-toastify";
import { mutate } from "swr";
import i18n from "../../i18n";

export const createContacts = async (data) => {
    try {
        await axiosClient.post("/contacts", data);

        toast.success(i18n.t("notify.create_success"));
        mutate("/contacts");
    } catch (error) {
        toast.error(i18n.t("notify.create_fail"));
    }
};

export const deleteContacts = async (id) => {
    try {
        // await axiosClient.delete(`/contacts/${id}`);

        toast.success(i18n.t("notify.delete_success"));

        mutate("/contacts");
    } catch (error) {
        toast.error(i18n.t("notify.delete_fail"));
    }
};

export const getContacts = async (params) => {
    const response = await axiosClient.get("/contacts", {
        params,
    });
    return response?.data;
};


export const updateContacts = async ({ id, data }) => {
    try {
        const res = await axiosClient.post(`/contacts/${id}`, data);

        toast.success(i18n.t("notify.update_success"));

        return res?.data;
    } catch (err) {
        toast.error(i18n.t("notify.update_fail"));
    }
};
