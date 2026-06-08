import axios from "axios";

export const uploadImage = async (file) => {
    const formData = new FormData();

    formData.append("file", file);

    formData.append("upload_preset", "blog_upload");

    const res = await axios.post("https://api.cloudinary.com/v1_1/dtpgcvc0q/image/upload", formData);

    return { id: res?.data?.id, url: res?.data?.secure_url };
};
