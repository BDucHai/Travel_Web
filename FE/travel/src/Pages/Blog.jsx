import React, { useEffect, useState } from "react";
import { CgMail } from "react-icons/cg";
import { FaWhatsapp } from "react-icons/fa";
import ContactModal from "../Components/ContactModal";
import { imgGlobal } from "../assets/images";
import { useTranslation } from "react-i18next";
import { CiCalendar } from "react-icons/ci";
import { FaEye } from "react-icons/fa";

const Blog = () => {
    const {t} = useTranslation();
    const [openContactModal, setOpenContactModal] = useState(false);

    const [top4MostRead, setTop4MostRead] = useState([
        {
            image: "https://thf.bing.com/th/id/OIP.luCvHavLy5_ZcsAcss9K4wHaFj?cb=thfc1falcon&rs=1&pid=ImgDetMain&o=7&rm=3",
            guide: "VIETNAM GUIDE",
            title: "10 Must-Visit Places in Vietnam for First Time Travelers",
            meta: "From the bustling streets of Hanoi to the serence landscapes of Ninh Binh, discover the best places to experience the true beauty of Vietnam",
            date: "05-15-2026",
            views: "12500"
        },
         {
            image: "https://cdn.pixabay.com/photo/2020/03/21/16/02/sunset-4954402_1280.jpg",
            guide: "CAMBODIA GUIDE",
            title: "Angkor Wat: The Complete Traveler's Guide",
            meta: "From the bustling streets of Hanoi to the serence landscapes of Ninh Binh, discover the best places to experience the true beauty of Vietnam",
            date: "05-20-2026",
            views: "14300"
        },
        {
            image: "https://cdn.pixabay.com/photo/2020/03/21/16/02/sunset-4954402_1280.jpg",
            guide: "CAMBODIA GUIDE",
            title: "Angkor Wat: The Complete Traveler's Guide",
            meta: "From the bustling streets of Hanoi to the serence landscapes of Ninh Binh, discover the best places to experience the true beauty of Vietnam",
            date: "05-20-2026",
            views: "7600"
        },
        {
            image: "https://cdn.pixabay.com/photo/2020/03/21/16/02/sunset-4954402_1280.jpg",
            guide: "VIETNAM CULTURE",
            title: "Vietnamese Culture: Custom & Traditions",
            meta: "From the bustling streets of Hanoi to the serence landscapes of Ninh Binh, discover the best places to experience the true beauty of Vietnam",
            date: "05-30-2026",
            views: "6200"
        }
    ])

    const [listBlog, setListBlog] = useState([]);
    return (
        <>
            <div>
                <div className="relative">
                    <img
                        src={imgGlobal.bannerBlog}
                        alt="bannerBlog"
                        className="min-h-[180px] max-h-[300px] w-full object-cover"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-[#577b7c7d] z-[2]"></div>
                  <div className="text-white width-[50%] md:width-[40%] lg:width-[30%] absolute z-[300] left-1/2 top-1/2 -translate-1/2 text-center">
                        <h2 className="font-semibold text-[#f5c289] text-[1rem] lg:text-[1.25rem] uppercase">{t("our_travel_blog")}</h2>
                        <h2 className="py-[0.5rem] font-marcellus text-[1.5rem] lg:text-[2.5rem] text-wrap font-bold">{t("inspiration_for")}</h2>
                        <h2 className="font_dancing text-[1rem] lg:text-[1.25rem] text-wrap">{t("stories")}</h2>
                  </div>
                </div>
                
                <div className="bg-[#fbf9f7] px-[1rem] lg:px-[3rem]">
                    {/* Most Read */}
                    <div className="py-[1rem]">
                            <div className="text-center mt-[2rem] mb-[1rem] py-[0.5rem] text-[1rem] lg:text-[1.5rem] text-[#000000c9] tracking-[1.5px] font-semibold font-inter uppercase">
                            {t("blogPage.most_read")}
                            <hr className="mx-auto mt-[0.5rem] w-[4rem] border-2 text-[#efb771]" />
                            </div>

                            {/* Content most read */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
                            {/* PC blog lon */}
                            <div className="hidden lg:flex lg:col-span-2 flex-col lg:flex-row border-1 border-[#ccc] lg:border-0 cursor-pointer" onClick={()=>{}}>
                                <img
                                src={top4MostRead?.[0]?.image}
                                alt={top4MostRead?.[0]?.title}
                                className="w-full lg:w-1/2 object-cover"
                                />
                                <div className="flex flex-col justify-between p-4 w-full lg:w-1/2">
                                <div>
                                    <p className="text-sm text-gray-500">{top4MostRead?.[0]?.guide}</p>
                                    <h2 className="text-xl font-bold">{top4MostRead?.[0]?.title}</h2>
                                    <p className="hidden lg:block text-[#363a37]">{top4MostRead?.[0]?.meta}</p>
                                </div>
                                <div className="flex items-center text-sm text-dark mt-4">
                                    <span className="flex items-center mr-[0.8rem]"> <CiCalendar className="mr-[0.2rem]"/> {top4MostRead?.[0]?.date}</span>
                                    <span className="flex items-center"> <FaEye className="mr-[0.2rem]"/> {top4MostRead?.[0]?.views} {t("view")}</span>
                                </div>
                                </div>
                            </div>

                            {/* PC layout cho 3 bài nhỏ */}
                            <div className="hidden lg:grid lg:grid-rows-3 gap-4 lg:col-span-1">
                                {top4MostRead.slice(1).map((post) => (
                                <div key={post?.id} className="flex flex-col lg:flex-row border-1 border-[#ccc] lg:border-0 cursor-pointer" onClick={()=>{}}>
                                    <img
                                    src={post?.image}
                                    alt={post?.title}
                                    className="w-full lg:w-1/3 object-cover"
                                    />
                                    <div className="flex flex-col justify-between p-2 w-full lg:w-2/3">
                                    <div>
                                        <p className="text-xs text-gray-500">{post?.guide}</p>
                                        <h3 className="text-lg font-semibold">{post?.title}</h3>
                                    </div>
                                    <div className="flex items-center text-xs text-dark mt-2">
                                        <span className="flex items-center mr-[0.8rem]"> <CiCalendar className="mr-[0.2rem]"/> {post?.date}</span>
                                        <span className="flex items-center"> <FaEye className="mr-[0.2rem]"/> {post?.views} {t("view")}</span>
                                    </div>
                                    </div>
                                </div>
                                ))}
                            </div>

                            {/* Mobile & md layout: tất cả 4 bài */}
                            {top4MostRead.map((post, idx) => (
                                <div
                                key={post?.id}
                                className="flex flex-col md:flex-row lg:hidden border-1 border-[#ccc] lg:border-0" onClick={()=>{}}
                                >
                                <img
                                    src={post?.image}
                                    alt={post?.title}
                                    className="w-full md:w-1/3 object-cover"
                                />
                                <div className="flex flex-col justify-between p-2 w-full md:w-2/3">
                                    <div>
                                    <p className="text-xs text-gray-500">{post?.guide}</p>
                                    <h3 className="text-lg font-semibold">{post?.title}</h3>
                                    </div>
                                    <div className="flex items-center text-xs text-dark mt-2">
                                    <span className="flex items-center mr-[0.8rem]"> <CiCalendar className="mr-[0.2rem]"/> {post?.date}</span>
                                    <span className="flex items-center"> <FaEye className="mr-[0.2rem]"/> {post?.views} {t("view")}</span>
                                    </div>
                                </div>
                                </div>
                            ))}
                            </div>
                    </div>
                    {/* End most read */}
                    <hr className="mt-[0.5rem] text-[#bc8b3869]" />
                    {/* Start Laster article  */}
                    <div classname="pt-[1rem] pb-[3rem]">
                         <div className="text-center mt-[2rem] mb-[1rem] py-[0.5rem] text-[1rem] lg:text-[1.5rem] text-[#000000c9] tracking-[1.5px] font-semibold font-inter uppercase">
                            {t("blogPage.most_read")}
                            <hr className="mx-auto mt-[0.5rem] w-[4rem] border-2 text-[#efb771]" />
                            </div>
                    </div>
                    <div>
                    </div>
                    <div className="flex-box-center mt-[1.5rem]">
                        <div className="px-[3rem] py-[0.5rem] border-[2px] border-[#d38518] text-[#d38518] font-semibold uppercase cursor-pointer hover:bg-[#c39562] hover:text-white">
                            {t("load_more")}
                        </div>
                    </div>
                    {/* End Laster article  */}
                </div>
            </div>

            {/* Floatting icon */}
            <div className="hidden lg:fixed bottom-4 right-4 flex flex-col gap-3 z-50">
                <div
                    onClick={() => openContactModal(true)}
                    className="bg-blue-600 text-white p-3 rounded-full shadow-lg cursor-pointer">
                    <CgMail />
                </div>

                <div className="bg-green-600 text-white p-3 rounded-full shadow-lg cursor-pointer">
                    <FaWhatsapp />
                </div>
            </div>

            {/* Modal */}
            <ContactModal open={openContactModal} onClose={() => setOpenContactModal(false)} />
        </>
    );
};

export default Blog;
