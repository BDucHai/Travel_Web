import { toast } from "react-toastify";
import i18n from "../../i18n";
import axiosClient from "../axios";

export const getBanners = async () =>
  axiosClient.get("/admin/banners").then((res) => res?.data);

export const createBanner = async (data) => {
  try {
    const res = await axiosClient.post("/admin/banners", data);
    toast.success(i18n.t("notify.create_success"));
    return res?.data;
  } catch (error) {
    toast.error(i18n.t("notify.create_fail"));
  }
};

export const deleteBanner = async (id) => {
  try {
    await axiosClient.delete(`/admin/banners/${id}`);
    toast.success(i18n.t("notify.delete_success"));
  } catch (error) {
    toast.error(i18n.t("notify.delete_fail"));
  }
};
