import { useEffect, useState } from "react";
import { uploadImage } from "../../utils/uploadImage";
import BlogEditor from "../../Components/AdminComponent/BlogEditor";
import { useNavigate, useParams } from "react-router-dom";
import { createBlog, getBlogAdminById, updateBlog } from "../../api/Blog";
import useSWR from "swr";
import { useAuth } from "../../contexts/AuthContext";
import { Autocomplete, Backdrop, CircularProgress, TextField } from "@mui/material";
import { getToursAdmin } from "../../api/Tour";
import { useDebounce } from "use-debounce";
import { darkTextField } from "../../constant";

const CreateBlog = () => {
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    const { user } = useAuth();
    const navigate = useNavigate();

    const { data, isLoading } = useSWR(id ? ["/blogs/detail", { id: id }] : null, ([_, id]) => getBlogAdminById(id));

    const [blog, setBlog] = useState({
        titleEn: data?.titleEn || "",
        titleFr: data?.titleFr || "",

        heroImage: data?.heroImageUrl || null,

        contentEn: data?.contentEn || "",
        contentFr: data?.contentFr || "",

        excerptEn: data?.excerptEn || "",
        excerptFr: data?.excerptFr || "",

        tourRelated: data?.relatedTours || [],

        slugEn: data?.slugEn || "",
        slugFr: data?.slugFr || "",

        isFeature: false,
        viewCount: data?.view_count || 0,
    });

    const [tourSearch, setTourSearch] = useState("");
    const [debouncedSearch] = useDebounce(tourSearch, 400);

    const { data: tours } = useSWR(["/admin/tours", debouncedSearch], ([_, search]) =>
        getToursAdmin({
            page: 0,
            limit: 10,
            titleEn: search || "",
        }),
    );

    const handleHeroUpload = async (e) => {
        const file = e.target.files[0];
        setHeroLoading(true);

        const data = await uploadImage(file);
        console.log(data);
        setBlog((prev) => ({ ...prev, heroImage: data?.url }));
        setHeroLoading(false);
    };

    const [heroLoading, setHeroLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        if (id) {
            const res = await updateBlog({
                id,
                data: {
                    authorName: user?.username || "",
                    titleEn: blog?.titleEn || "",
                    titleFr: blog?.titleFr || "",

                    heroImageUrl: blog?.heroImage || null,

                    contentEn: blog?.contentEn || "",
                    contentFr: blog?.contentFr || "",

                    excerptEn: blog?.excerptEn || "",
                    excerptFr: blog?.excerptFr || "",

                    slugEn: blog?.slugEn || "",
                    slugFr: blog?.slugFr || "",

                    relatedToursIds: blog?.tourRelated?.map((i) => i?.id),

                    isFeature: blog?.isFeature,
                    viewCount: blog?.viewCount || 0,
                    status: "PUBLISHED",
                },
            });
            if (res?.status === 200) {
                navigate("/admin/blog");
            }
        } else {
            const res = await createBlog({
                authorName: user?.username || "",
                titleEn: blog?.titleEn || "",
                titleFr: blog?.titleFr || "",

                heroImageUrl: blog?.heroImage || null,

                contentEn: blog?.contentEn || "",
                contentFr: blog?.contentFr || "",

                excerptEn: blog?.excerptEn || "",
                excerptFr: blog?.excerptFr || "",

                relatedToursIds: blog?.tourRelated?.map((i) => i?.id),

                slugEn: blog?.slugEn || "",
                slugFr: blog?.slugFr || "",

                isFeature: blog?.isFeature,
                viewCount: blog?.viewCount || 0,
                status: "PUBLISHED",
            });
            if (res?.status === 200) {
                navigate("/admin/blog");
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        setBlog({
            titleEn: data?.titleEn || "",
            titleFr: data?.titleFr || "",

            heroImage: data?.heroImageUrl || null,

            contentEn: data?.contentEn || "",
            contentFr: data?.contentFr || "",

            excerptEn: data?.excerptEn || "",
            excerptFr: data?.excerptFr || "",

            tourRelated: data?.relatedTours || [],

            slugEn: data?.slugEn || "",
            slugFr: data?.slugFr || "",

            isFeature: false,
            viewCount: data?.view_count || 0,
        });
    }, [data]);

    return (
        <div className="w-full mx-auto py-10 px-5 bg-[#081416] text-white p-6">
            <h1 className="text-5xl font-bold mb-10">Create Blog</h1>

            {/* TITLE */}
            <div
                className="
                rounded-3xl
                border border-white/10
                bg-white/[0.03]
                backdrop-blur-sm
                p-8
                shadow-2xl
            ">
                <input
                    value={blog?.titleEn}
                    onChange={(e) => setBlog((prev) => ({ ...prev, titleEn: e?.target?.value }))}
                    placeholder="Blog title..."
                    className="
                    w-full
                    border
                    rounded-xl
                    p-3
                    text-[1rem]
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
                        rounded-xl
                    p-3
                    text-[1rem]
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
                        onClick={() =>
                            setBlog((prev) => ({
                                ...prev,
                                isFeature: !prev.isFeature,
                            }))
                        }
                        className={`
                        px-5
                        py-3
                        rounded-xl
                        border
                        font-semibold
                        text-[16px]
                        cursor-pointer
                        transition-all
                        duration-300
                        hover:scale-105
                        ${
                            blog?.isFeature
                                ? "bg-[#c39562] border-[#c39562] text-white shadow-lg"
                                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                        }
                    `}>
                        {blog?.isFeature ? "⭐ Featured" : "Feature Post"}
                    </button>

                    <input
                        type="number"
                        value={blog?.viewCount}
                        onChange={(e) => setBlog((prev) => ({ ...prev, viewCount: e?.target?.value }))}
                        placeholder="View count"
                        className="
                        w-[100px]
                        lg:w-[40%]
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

                {/* RelatedTour */}
                <Autocomplete
                    options={tours?.data || []}
                    value={blog?.tour}
                    onChange={(_, value) =>
                        setBlog((prev) => ({
                            ...prev,
                            tourRelated: value,
                        }))
                    }
                    sx={darkTextField}
                    onInputChange={(_, value) => setTourSearch(value)}
                    getOptionLabel={(option) => option?.titleEn || ""}
                    renderInput={(params) => <TextField {...params} label="Select Tour Realted" />}
                />

                {/* HERO IMAGE */}
                <div className="mt-3 mb-10">
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
                    content={blog?.contentEn}
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
            <Backdrop
                open={loading || isLoading}
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 9999,
                    backgroundColor: "rgba(0,0,0,0.35)",
                }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};

export default CreateBlog;
