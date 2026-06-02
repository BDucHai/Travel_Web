import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DOMPurify from "dompurify";

const BlogDetail = () => {
    const { id } = useParams();

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
            </div>
        </div>
    );
};

export default BlogDetail;
