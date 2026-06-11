import axiosClient from "../axios";

export const getComment = async (url, params) => axiosClient.get(url, { params }).then((res) => res.data);