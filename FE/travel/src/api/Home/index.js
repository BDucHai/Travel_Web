import axiosClient from "../axios";
import { toast } from "react-toastify";
import i18n from "../../i18n";

export const getMegaMenu = async (params) => axiosClient.get("/layout/mega-menu", { params }).then((res) => res?.data);
