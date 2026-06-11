import axiosClient from "../axios";
import { toast } from "react-toastify";
import i18n from "../../i18n";

export const LoginUser = async({email, password}) =>{
    const response = await axiosClient.post("/login", {email, password});
    return response?.data;
}

export const getUserByEmail = async (email) => {
    const response = await axiosClient.get("/users", {
        email,
    });
    return response?.data;
};

export const getUserById = async ({id}) => {
    const response = await axiosClient.get(`/users/${id}`);
    return response?.data;
};


export const createUser = async (data) =>{
    try{
        const response = await axiosClient.post("/users/create", data);
        toast.success(i18n.t("notify.create_success"));
        return response?.data;
    } catch (error) {
        toast.error(i18n.t("notify.delete_fail"));
        return null;
    }
}

export const getUsers = async (params) => {
    const response = await axiosClient.get("/users", {
        params,
    });
    return response?.data;
};


export const deleteUser = async(id) =>{
      try {
        await axiosClient.delete(`/users/${id}`);
        toast.success(i18n.t("notify.delete_success"));
    } catch (error) {
        toast.error(i18n.t("notify.delete_fail"));
    }
}

export const lockUnlockUser = async ({id, status}) =>{
     try{
        await axiosClient.post(`/user/status/${id}`, {id, status});
        toast.success(i18n.t("notify.update_success"));
    } catch (err) {
        toast.error(i18n.t("notify.update_fail"));
    }
} 

export const updateUser = async (data) =>{
     try {
        await axiosClient.post("/users/update", data);

        toast.success(i18n.t("notify.create_success"));
    } catch (error) {
        toast.error(i18n.t("notify.create_fail"));
    }
}

export const userChangeAvatar = async (data) =>{
     try {
        await axiosClient.post("/users/update/avatars", data);

        toast.success(i18n.t("notify.create_success"));
    } catch (error) {
        toast.error(i18n.t("notify.create_fail"));
    }
}