import axiosClient from "../axios";


export const getMegaMenu = async (params) => axiosClient.get("/layout/mega-menu", { params }).then((res) => res?.data);
