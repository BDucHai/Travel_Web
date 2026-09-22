import axiosClient from "../axios";

export const globalSearch = async ({ keyword, lang, blogPage = 0, tourPage = 0, limit }) => {
    const response = await axiosClient.get("/blogs/globalSearch", {
        params: {
            keyword,
            lang,
            blogPage,
            tourPage,
            limit,
        },
    });

    return response.data;
};
