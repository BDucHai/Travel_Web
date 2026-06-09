import axiosClient from "../axios";
import { toast } from "react-toastify";
import { mutate } from "swr";
import i18n from "../../i18n";

export const createContacts = async (data) => {
    try {
        await axiosClient.post("/contacts", data);

        toast.success(i18n.t("notify.create_success"));
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

export const getContacts = async (url, params) =>
  await axiosClient.get(url, { params }).then(res => res.data);


export const updateContacts = async ({ id, data }) => {
    try {
        await axiosClient.post(`/contacts/${id}`, data);

        toast.success(i18n.t("notify.update_success"));
    } catch (err) {
        toast.error(i18n.t("notify.update_fail"));
    }
};

export const updateStatusContact = async (id, status) => {
  try {
    const res = await axiosClient.post(`/contacts/${id}`, { status });
    toast.success(i18n.t("notify.update_success"));
    return res?.data;
  } catch (err) {
    toast.error(i18n.t("notify.update_fail"));
  }
};