import React from "react";
import { motion } from "framer-motion";
import BlogSmallCard from "./BlogSmallCard";

const RelatedBlogs = ({ blogs }) => {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Related Blogs</h2>

      <motion.div
        className="flex gap-6 overflow-x-auto pb-4"
        whileTap={{ cursor: "grabbing" }}
      >
        {blogs?.map((blog) => (
          <motion.div
            key={blog?.id}
            className="min-w-[14rem] lg:min-w-[18rem] flex-shrink-0"
            whileHover={{ scale: 1.05 }}
          >
            <BlogSmallCard blog={blog} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default RelatedBlogs;
