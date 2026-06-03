import { useState } from "react";
import { uploadImage } from "../../utils/uploadImage";
import BlogEditor from "../../Components/AdminComponent/BlogEditor";

const CreateBlog = () => {
    const [title, setTitle] = useState("");
    const [heroImage, setHeroImage] = useState("");
    const [content, setContent] = useState("");

    const handleHeroUpload = async (e) => {
        const file = e.target.files[0];

        const url = await uploadImage(file);

        setHeroImage(url);
    };

    const handleSubmit = async () => {
        const payload = {
            title,
            hero_image_url: heroImage,
            content,
        };

        console.log(payload);

        // CALL API SAVE BLOG
    };

    return (
        <div className="max-w-[1200px] mx-auto py-10 px-5">
            <h1 className="text-5xl font-bold mb-10">Create Blog</h1>

            {/* TITLE */}
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Blog title..."
                className="
                    w-full
                    border
                    rounded-2xl
                    p-5
                    text-4xl
                    font-bold
                    mb-8
                    outline-none
                "
            />

            {/* HERO IMAGE */}
            <div className="mb-10">
                <div className="font-semibold mb-3">Hero Banner Image</div>

                <label
                    className="
                        w-full
                        h-[300px]
                        border-2
                        border-dashed
                        rounded-2xl
                        flex
                        items-center
                        justify-center
                        cursor-pointer
                        overflow-hidden
                    ">
                    {heroImage ? (
                        <img
                            src={heroImage}
                            alt=""
                            className="
                                w-full
                                h-full
                                object-cover
                            "
                        />
                    ) : (
                        <div className="text-gray-500">Upload hero image</div>
                    )}

                    <input type="file" hidden onChange={handleHeroUpload} />
                </label>
            </div>

            {/* CONTENT */}
            <BlogEditor setContent={setContent} />

            {/* SUBMIT */}
            <button
                onClick={handleSubmit}
                className="
                    mt-8
                    px-8 py-4
                    bg-[#c39562]
                    text-white
                    rounded-xl
                    hover:scale-105
                    transition
                ">
                Publish Blog
            </button>
        </div>
    );
};

export default CreateBlog;
