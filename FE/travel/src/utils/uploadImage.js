import axios from "axios";

export const uploadImage = async (file) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "YOUR_UPLOAD_PRESET");

    const res = await axios.post("https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload/blog", formData);

    return {
        url: res.data.secure_url,
        public_id: res.data.public_id,
    };
};
