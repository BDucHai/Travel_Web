// PostCard.jsx
import React from "react";

const BlogSmallCard = (blog) => {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden border border-gray-200">
      <img
        src={blog?.image}
        alt={blog?.title}
        className="w-full h-[4rem] object-cover"
      />

      {/* Nội dung */}
      <div className="p-4 flex flex-col justify-between">
        {/* Guide */}
        <p className="text-xs text-gray-500 mb-1">{blog?.guide}</p>

       <p className="text-xs text-gray-500">{blog?.guide}</p>
        <h3 className="text-lg font-semibold">{blog?.title}</h3>
        </div>
        <div className="flex items-center text-xs text-dark mt-2">
            <span className="flex items-center mr-[0.8rem]"> <CiCalendar className="mr-[0.2rem]"/> {blog?.date}</span>
            <span className="flex items-center"> <FaEye className="mr-[0.2rem]"/> {blog?.views} {t("view")}</span>
        </div>
    </div>
  );
};

export default BlogSmallCard;
