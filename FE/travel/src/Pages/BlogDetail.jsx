import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import ContactModal from "../Components/ContactModal";
import { CgMail } from "react-icons/cg";
import { useAuth } from "../contexts/AuthContext";
import useSWR from "swr";
import { getBlogById } from "../api/Blog";
import RelatedTours from "../Components/RelatedTours";
import BlogContentViewer from "../Components/BlogContentViewer";

const BlogDetail = () => {
    const { slug } = useParams();
    const { t } = useTranslation();
    const { lang } = useAuth();
    const [openContactModal, setOpenContactModal] = useState(false);

    const navigate = useNavigate();

    const { data: blog } = useSWR(slug ? ["/blogs/detail", { slug, lang }] : null, ([_, params]) =>
        getBlogById(params),
    );

    const [request, setRequest] = useState({
        name: "",
        email: "",
        phone: "",
        question: "",
    });

    const handleChangeValueRequest = (e) => {
        setRequest({ ...request, [e?.target?.name]: e?.target?.value });
    };

    return (
        <div className="bg-white">
            {/* HERO */}
            <div className="relative h-[650px] overflow-hidden">
                <img
                    src={blog?.heroImageUrl}
                    alt=""
                    className="
                        w-full
                        h-full
                        object-cover
                    "
                />

                <div className="absolute inset-0 bg-black/40" />

                <div
                    className="
                        absolute
                        bottom-[5rem]
                        left-[10%]
                        text-white
                        max-w-[800px]
                    ">
                    {/* <div className="uppercase tracking-[5px] mb-5">Travel Tips</div> */}

                    <h1
                        className="
                            text-5xl
                            lg:text-7xl
                            font-bold
                            leading-tight
                        ">
                        {blog?.title}
                    </h1>

                    <div className="flex gap-5 mt-6 text-white/80">
                        <div> {new Date(blog?.publishedAt).toLocaleDateString("vi-VN")}</div>

                        <div>{blog?.viewCount} views</div>
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div
                className="
            max-w-[1000px]
            mx-auto
            px-5
            lg:px-0
            py-20
        ">
                <BlogContentViewer content={blog?.content} />

                {/* CONTACT FORM */}
                <div className="border-t border-gray-200 mt-20 pt-16">
                    <h2 className="text-3xl font-serif mb-2">{t("need_help_plan")}</h2>

                    <p className="text-gray-500 mb-8">{t("travel_help")}</p>

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder={t("your_name")}
                            className="
                                border
                                border-gray-300
                                px-4
                                py-3
                                outline-none
                                focus:border-[#b8860b]
                            "
                            name="name"
                            value={request?.name}
                            onChange={handleChangeValueRequest}
                        />

                        <input
                            type="email"
                            placeholder={t("your_email")}
                            className="
                                border
                                border-gray-300
                                px-4
                                py-3
                                outline-none
                                focus:border-[#b8860b]
                            "
                            name="email"
                            value={request?.email}
                            onChange={handleChangeValueRequest}
                        />

                        <input
                            type="text"
                            placeholder={t("what_app")}
                            className="
                                border
                                border-gray-300
                                px-4
                                py-3
                                outline-none
                                focus:border-[#b8860b]
                            "
                            name="phone"
                            value={request?.phone}
                            onChange={handleChangeValueRequest}
                        />

                        <textarea
                            rows={4}
                            placeholder={t("your_question")}
                            className="
                                border
                                border-gray-300
                                px-4
                                py-3
                                outline-none
                                resize-none
                                focus:border-[#b8860b]
                            "
                            name="question"
                            value={request?.question}
                            onChange={handleChangeValueRequest}
                        />

                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="
                                    bg-[#b8860b]
                                    text-white
                                    px-8
                                    py-3
                                    text-sm
                                    tracking-wider
                                    hover:bg-[#9c7209]
                                    transition-all
                                    cursor-pointer
                                ">
                                {t("send_inquiry")}
                            </button>
                        </div>
                    </form>
                </div>

                {/* RELATED TOURS */}
                <div className="border-t border-gray-200 mt-20 pt-16">
                    <h2 className="text-2xl font-serif mb-8">{t("related_tour")}</h2>

                    <RelatedTours tours={blog?.relatedTours} />

                    <div className="flex justify-center mt-10">
                        <button
                            className="
                        border
                        border-[#b8860b]
                        text-[#b8860b]
                        px-8
                        py-3
                        text-sm
                        hover:bg-[#b8860b]
                        hover:text-white
                        transition-all
                        cursor-pointer
                    "
                            onClick={() => navigate("/tours")}>
                            {t("view_all_tour")}
                        </button>
                    </div>
                </div>

                {/* YOU MAY ALSO LIKE */}
                {/* <div className="border-t border-gray-200 mt-20 pt-16">
                    <h2 className="text-2xl font-serif mb-8">YOU MAY ALSO LIKE</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="
                                        border
                                        border-gray-200
                                        overflow-hidden
                                        bg-white
                                        cursor-pointer
                                    ">
                                <div className="h-[240px] overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"
                                        alt=""
                                        className="
                                    w-full
                                    h-full
                                    object-cover
                                    hover:scale-110
                                    transition-all
                                    duration-500
                                "
                                    />
                                </div>

                                <div className="p-5">
                                    <h3 className="text-xl font-medium leading-8 mb-3">
                                        Best Time to Visit Vietnam: A Month-by-Month Guide
                                    </h3>

                                    <div className="text-sm text-gray-500">May 10, 2024 • 6 min read</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-10">
                        <button
                            className="
                                border
                                border-[#b8860b]
                                text-[#b8860b]
                                px-8
                                py-3
                                text-sm
                                hover:bg-[#b8860b]
                                hover:text-white
                                transition-all
                                cursor-pointer
                            "
                            onClick={() => navigate("/tours")}>
                            {t("read_more")}
                        </button>
                    </div>
                </div> */}
            </div>
            {/* Floatting icon */}
            <div className="hidden lg:block fixed bottom-4 right-4 flex flex-col gap-3 z-50">
                <div
                    onClick={() => setOpenContactModal(true)}
                    className="bg-blue-600 text-white p-3 rounded-full shadow-lg cursor-pointer transition-all duration-300 ease-out mb-[1rem]
                            hover:scale-[120%]  hover:shadow-2xl active:scale-95">
                    <CgMail />
                </div>

                <div
                    className="bg-green-600 text-white p-3 rounded-full shadow-lg cursor-pointer transition-all duration-300 ease-out
                        hover:scale-[120%] hover:shadow-2xl active:scale-95">
                    <a href="https://wa.me/84968133933" target="_blank" rel="noopener noreferrer">
                        <FaWhatsapp />
                    </a>
                </div>
            </div>

            {/* Modal */}
            {blog &&  <ContactModal
                t={t}
                open={openContactModal}
                content={`I am interested in blog ${blog?.title} `}
                onClose={() => setOpenContactModal(false)}
            />}  
        </div>
    );
};

export default BlogDetail;
