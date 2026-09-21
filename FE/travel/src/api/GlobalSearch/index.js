import axiosClient from "../axios";


export const globalSearch = async ({ keyword, lang, limit = true }) => {
    const response = await axiosClient.get("/blogs/globalSearch", {
        params: {
            keyword,
            lang,
            limit,
        },
    });

    return response.data;
};
