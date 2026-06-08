import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import DOMPurify from "dompurify";
import CardHome from "../Components/CardHome";
import { imgCardSample } from "../assets/images";
import { useTranslation } from "react-i18next";
import ContactModal from "../Components/ContactModal";
import { CgMail } from "react-icons/cg";

const BlogDetail = () => {
    const { id } = useParams();
    const { t } = useTranslation();

    const [openContactModal, setOpenContactModal] = useState(false);

    const [blog, setBlog] = useState({
        title: "10 Days In Vietnam",
        hero_image_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",

        created_at: "02-06-2026",

        view_count: 12000,

        content: `
            <h1>Vietnam Adventure</h1>

            <p>
                Vietnam is one of the most beautiful countries in Asia.
            </p>

            <img src="https://images.unsplash.com/photo-1528127269322-539801943592" />

            <h2>Ha Long Bay</h2>

            <p>
                The landscape is breathtaking and unforgettable.
            </p>
        `,
    });

    const tour = [
        {
            id: 1,
            img: imgCardSample.cardSample,
            meta_title: "Essential VietNam",
            meta_description: "Discoer the hightlight vietnam from hanoi to HCM City with memorable expoeriences",
            duration_days: "10 Days / 9 Nights",
            slug: "Best Seller",
            published_at: "May 20, 2026",
        },
        {
            id: 2,
            img: imgCardSample.cardSample,
            meta_title: "Essential VietNam",
            meta_description: "Discoer the hightlight vietnam from hanoi to HCM City with memorable expoeriences",
            duration_days: "10 Days / 9 Nights",
            slug: "Best Seller",
            published_at: "May 20, 2026",
        },
        {
            id: 3,
            img: imgCardSample.cardSample,
            meta_title: "Essential VietNam",
            meta_description: "Discoer the hightlight vietnam from hanoi to HCM City with memorable expoeriences",
            duration_days: "10 Days / 9 Nights",
            slug: "Popular",
            published_at: "May 20, 2026",
        },
    ];

    const [request, setRequest] = useState({
        name: "",
        email: "",
        phone: "",
        question: "",
    });

    const handleChangeValueRequest = (e) => {
        setRequest({ ...request, [e?.target?.name]: e?.target?.value });
    };

    useEffect(() => {
        // FETCH BLOG API
        // count+1
    }, [id]);

    return (
        <div className="bg-white">
            {/* HERO */}
            <div className="relative h-[650px] overflow-hidden">
                <img
                    src={blog?.hero_image_url}
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
                    <div className="uppercase tracking-[5px] mb-5">Travel Tips</div>

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
                        <div>{blog?.created_at}</div>

                        <div>{blog?.view_count} views</div>
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
                <div
                    className="
                prose
                prose-lg
                max-w-none
                prose-img:rounded-2xl
                prose-img:w-full
                prose-img:shadow-xl
                prose-img:my-10
                prose-h1:text-5xl
                prose-h1:font-bold
                prose-h2:text-4xl
                prose-p:leading-9
                prose-p:text-gray-700
            "
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(blog?.content),
                    }}
                />

                {/* CONTACT FORM */}
                <div className="border-t border-gray-200 mt-20 pt-16">
                    <h2 className="text-3xl font-serif mb-2">Need help planning your trip?</h2>

                    <p className="text-gray-500 mb-8">
                        Our travel specialists are here to help you build your perfect Indochina journey.
                    </p>

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
                    <h2 className="text-2xl font-serif mb-8">RELATED TOURS</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tour.map((item) => (
                            <CardHome tour={item} />
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
                    ">
                            {t("view_all_tour")}
                        </button>
                    </div>
                </div>

                {/* YOU MAY ALSO LIKE */}
                <div className="border-t border-gray-200 mt-20 pt-16">
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
                            ">
                            {t("read_more")}
                        </button>
                    </div>
                </div>
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
            <ContactModal t={t} open={openContactModal} onClose={() => setOpenContactModal(false)} />
        </div>
    );
};

export default BlogDetail;
