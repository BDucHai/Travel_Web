import axiosClient from "../axios";
import { toast } from "react-toastify";
import i18n from "../../i18n";

export const getQuestions = async (destId) => {
    const response = await axiosClient.get(`/questions/destination/${destId}`);
    return response?.data;
};

export const getQuestionsAdmin = async (url) => {
    const response = await axiosClient.get(url);
    return response?.data;
};

export const createQuestionReply = async ({ data, qid }) => {
    try {
        const res = await axiosClient.post(`/questions/${qid}/reply`, data);

        toast.success(i18n.t("notify.create_success"));
        return res?.data;
    } catch (error) {
        toast.error(i18n.t("notify.create_fail"));
    }
};

export const createQuestion = async ({ data, destId }) => {
    try {
        const res = await axiosClient.post(`/questions/destination/${destId}`, data);

        toast.success(i18n.t("notify.create_success"));
        return res?.data;
    } catch (error) {
        toast.error(i18n.t("notify.create_fail"));
    }
};

export const deleteQuestion = async (id) => {
    try {
        await axiosClient.delete(`/questions/${id}`);

        toast.success(i18n.t("notify.delete_success"));
    } catch (error) {
        toast.error(i18n.t("notify.delete_fail"));
    }
};

export const deleteReply = async (id) => {
    try {
        await axiosClient.delete(`/questions/reply/${id}`);

        toast.success(i18n.t("notify.delete_success"));
    } catch (error) {
        toast.error(i18n.t("notify.delete_fail"));
    }
};