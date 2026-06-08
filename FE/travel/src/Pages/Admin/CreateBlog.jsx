import { useEffect, useState } from "react";
import { uploadImage } from "../../utils/uploadImage";
import BlogEditor from "../../Components/AdminComponent/BlogEditor";
import { useParams } from "react-router-dom";
import { getBlogById } from "../../api/Blog";

const CreateBlog = () => {
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [titleFr, setTitleFr] = useState("");
    const [heroImage, setHeroImage] = useState("");
    const [content, setContent] = useState("");
    const [contentFr, setContentFr] = useState("");
    const [metaTitle, setMetaTitle] = useState("");
    const [metaDescription, setMetaDescription] = useState("");

    const [metaTitleFr, setMetaTitleFr] = useState("");
    const [metaDescriptionFr, setMetaDescriptionFr] = useState("");
    const [heroLoading, setHeroLoading] = useState(false);

    const handleHeroUpload = async (e) => {
        const file = e.target.files[0];
        setHeroLoading(true);

        const data = await uploadImage(file);

        setHeroImage(data?.url);
        setHeroLoading(false);
    };

    const handleSubmit = async () => {
        const payload = {
            title,
            hero_image_url: heroImage,
            content,
        };

        console.log(payload);

        // CALL API SAVE BLOG

        setTitle("");
        setTitleFr("");
        setHeroImage("");
        setContent("");
        setContentFr("");
        setMetaTitle("");
        setMetaDescription("");
        setMetaTitleFr("");
        setMetaDescriptionFr("");
    };

    const handleGetBlog = async (id) => {
        const res = await getBlogById(id);
        setTitle(res?.title);
        setTitleFr(res?.titleFr);
        setHeroImage(res?.heroImage);
        setContent(res?.content);
        setContentFr(res?.contentFr);
        setMetaTitle(res?.metaTitle);
        setMetaDescription(res?.metaDescription);
        setMetaTitleFr(res?.metaTitleFr);
        setMetaDescriptionFr(res?.metaDescriptionFr);
    };

    useEffect(() => {
        if (id) {
            handleGetBlog(id);
        }
    }, [id]);

    return (
        <div className="w-full mx-auto py-10 px-5 bg-[radial-gradient(circle,_#0e3637_0%,_#0d0d11ab_70%)] text-white">
            <h1 className="text-5xl font-bold mb-10">Create Blog</h1>

            {/* TITLE */}
            <input
                value={title}
                onChange={(e) => setTitle(e.target?.value)}
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

            <input
                value={titleFr}
                onChange={(e) => setTitleFr(e.target?.value)}
                placeholder="Blog title... (FR)"
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

            {/* META TITLE EN */}
            <input
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Meta title (EN)..."
                className="w-full border rounded-2xl p-4 text-[1.25rem] font-semibold mb-5 outline-none"
            />

            <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Meta description (EN)..."
                className="w-full border rounded-2xl p-4 h-28 text-[1rem] mb-8 outline-none"
            />

            <input
                value={metaTitleFr}
                onChange={(e) => setMetaTitleFr(e.target.value)}
                placeholder="Meta titre (FR)..."
                className="w-full border rounded-2xl p-4 text-[1.25rem] font-semibold mb-5 outline-none"
            />

            <textarea
                value={metaDescriptionFr}
                onChange={(e) => setMetaDescriptionFr(e.target.value)}
                placeholder="Meta description (FR)..."
                className="w-full border rounded-2xl p-4 h-28 text-[1rem] mb-8 outline-none"
            />

            {/* HERO IMAGE */}
            <div className="mb-10">
                <div className="font-semibold mb-3">Hero Banner Image</div>

                <label
                    className="
                        w-auto
                        min-h-[200px]
                        h-auto
                        border-2
                        border-dashed
                        rounded-2xl
                        flex
                        items-center
                        justify-center
                        cursor-pointer
                        overflow-hidden
                    ">
                    {heroLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10">
                            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}
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
            <BlogEditor content={content} setContent={setContent} />

            <div className="mt-[3rem] mb-[0.5rem] text-[2.5rem] font-bold">France Content</div>
            <BlogEditor content={contentFr} setContent={setContentFr} />

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
