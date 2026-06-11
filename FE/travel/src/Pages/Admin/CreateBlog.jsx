import { useEffect, useState } from "react";
import { uploadImage } from "../../utils/uploadImage";
import BlogEditor from "../../Components/AdminComponent/BlogEditor";
import { useNavigate, useParams } from "react-router-dom";
import { createBlog, getBlogById, updateBlog } from "../../api/Blog";
import useSWR from "swr";

const CreateBlog = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const { data } = useSWR(id ? ["/blogs/detail", { id }] : null, ([_, id]) => getBlogById(id));

    const [blog, setBlog] = useState({
        titleEn: data?.title_en || "",
        titleFr: data?.title_fr || "",

        heroImage: data?.hero_image_url || null,

        contentEn: data?.content_en || "",
        contentFr: data?.content_fr || "",

        excerptEn: data?.excerpt_en || "",
        excerptFr: data?.excerpt_fr || "",

        slugEn: data?.slug_en || "",
        slugFr: data?.slug_en || "",

        isFeature: false,
        viewCount: data?.view_count || 0,
    });

    const handleHeroUpload = async (e) => {
        const file = e.target.files[0];
        setHeroLoading(true);

        const data = await uploadImage(file);

        setBlog((prev) => ({ ...prev, heroImage: data?.url }));
        setHeroLoading(false);
    };

    const [heroLoading, setHeroLoading] = useState(false);

    const handleSubmit = async () => {
        if (id) {
            const res = await updateBlog({
                id,
                data: {
                    titleEn: blog?.title_en || "",
                    titleFr: blog?.title_fr || "",

                    heroImage: blog?.hero_image_url || null,

                    contentEn: blog?.content_en || "",
                    contentFr: blog?.content_fr || "",

                    excerptEn: blog?.excerpt_en || "",
                    excerptFr: blog?.excerpt_fr || "",

                    slugEn: blog?.slug_en || "",
                    slugFr: blog?.slug_en || "",

                    isFeature: false,
                    viewCount: blog?.view_count || 0,
                },
            });
            if (res?.status === 200) {
                navigate("/admin/blog");
            }
        } else {
            const res = await createBlog(blog);
            if (res?.status === 200) {
                navigate("/admin/blog");
            }
        }
    };

    return (
        <div className="w-full mx-auto py-10 px-5 bg-[radial-gradient(circle,_#0e3637_0%,_#0d0d11ab_70%)] text-white">
            <h1 className="text-5xl font-bold mb-10">Create Blog</h1>

            {/* TITLE */}
            <input
                value={blog?.titleEn}
                onChange={(e) => setBlog((prev) => ({ ...prev, titleEn: e?.target?.value }))}
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
                value={blog?.titleFr}
                onChange={(e) => setBlog((prev) => ({ ...prev, titleFr: e?.target?.value }))}
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

            {/* SLUG */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <input
                    value={blog?.slugEn}
                    onChange={(e) => setBlog((prev) => ({ ...prev, slugEn: e?.target?.value }))}
                    placeholder="slug-en"
                    className="
                        w-full
                        border
                        rounded-xl
                        p-3
                        text-[16px]
                        outline-none
                    "
                />

                <input
                    value={blog?.slugFr}
                    onChange={(e) => setBlog((prev) => ({ ...prev, slugFr: e?.target?.value }))}
                    placeholder="slug-fr"
                    className="
                        w-full
                        border
                        rounded-xl
                        p-3
                        text-[16px]
                        outline-none
                    "
                />
            </div>

            {/* FEATURE + VIEW COUNT */}
            <div className="flex items-center gap-5 mb-8">
                <button
                    type="button"
                    onChange={(e) => setBlog((prev) => ({ ...prev, isFeature: !blog?.isFeature }))}
                    className={`
                        px-5
                        py-3
                        rounded-xl
                        border
                        transition
                        text-[16px]
                        font-semibold
                        ${blog?.isFeature ? "bg-[#c39562] border-[#c39562]" : "bg-transparent border-white"}
                    `}>
                    {blog?.isFeature ? "Featured" : "Not Feature"}
                </button>

                <input
                    type="number"
                    value={blog?.viewCount}
                    onChange={(e) => setBlog((prev) => ({ ...prev, viewCount: e?.target?.value }))}
                    placeholder="View count"
                    className="
                        w-[180px]
                        border
                        rounded-xl
                        p-3
                        text-[16px]
                        outline-none
                    "
                />
            </div>

            {/* EXCERPT EN */}
            <input
                value={blog?.excerptEn}
                onChange={(e) => setBlog((prev) => ({ ...prev, excerptEn: e?.target?.value }))}
                placeholder="Excerpt (EN)..."
                className="w-full border rounded-2xl p-4 text-[1.25rem] font-semibold mb-5 outline-none"
            />

            <textarea
                value={blog?.excerptFr}
                onChange={(e) => setBlog((prev) => ({ ...prev, excerptFr: e?.target?.value }))}
                placeholder="Excerpt (FR)..."
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

                    {blog?.heroImage ? (
                        <img
                            src={blog?.heroImage}
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
            <BlogEditor
                content={blog?.content}
                setContent={(html) =>
                    setBlog((prev) => ({
                        ...prev,
                        contentEn: html,
                    }))
                }
            />

            <div className="mt-[3rem] mb-[0.5rem] text-[2.5rem] font-bold">France Content</div>

            <BlogEditor
                content={blog?.contentFr}
                setContent={(html) =>
                    setBlog((prev) => ({
                        ...prev,
                        contentFr: html,
                    }))
                }
            />

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
