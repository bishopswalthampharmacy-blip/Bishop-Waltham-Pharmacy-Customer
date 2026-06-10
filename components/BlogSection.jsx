"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { fetchAllBlogs } from "@/lib/utils";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await fetchAllBlogs();
        const blogList = data?.blogs ?? (Array.isArray(data) ? data : []);
        setBlogs(blogList.filter((blog) => blog.isProd === true));
      } catch (err) {
        setError(err.message || "Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-20">
      {/* Section Header */}
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl text-center mt-5 mb-5"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <span className="text-[#5BB9EC]">Health & Wellness </span>
        <span className="text-[#004488]">Blog</span>
      </motion.h2>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center min-h-[420px]">
          <div className="w-8 h-8 border-4 border-[#5BB9EC] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-10 text-red-500 text-sm">
          Failed to load blogs: {error}
        </div>
      )}

      {/* Desktop: grid (≤4 blogs) or horizontal scroll (>4 blogs) */}
      {!loading && !error && blogs.length > 0 && (
        <>
          {/* Desktop */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className={
              blogs.length > 4
                ? "hidden md:flex gap-4 overflow-x-auto overflow-y-hidden pb-4 custom-scrollbar"
                : "hidden md:grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            }
          >
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.id ?? index}
                variants={cardVariants}
                className={`group bg-[#F5F9FF] rounded-2xl p-2.5 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 flex flex-col ${
                  blogs.length > 4 ? "flex-shrink-0 w-72" : ""
                }`}
              >
                {blog.image ? (
                  <Image
                    src={blog.image}
                    alt={`Blog post: ${blog.title}`}
                    width={500}
                    height={300}
                    className="w-full h-36 object-cover rounded-lg mb-1.5"
                  />
                ) : (
                  <div className="w-full h-36 bg-gray-200 rounded-lg mb-1.5 flex items-center justify-center text-gray-400 text-xs">
                    No image
                  </div>
                )}

                <p className="text-xs text-gray-500 mb-1 line-clamp-1">
                  {blog.category}
                </p>

                <h3
                  className="text-xs font-semibold text-[#034F96] mb-0.5 line-clamp-2"
                  title={blog.title}
                >
                  {blog.title}
                </h3>

                <p
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 5,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                  className="text-[12px] text-gray-600 mb-1 mt-1 text-justify"
                >
                  {blog.excerpt}
                </p>

                <div className="pt-1">
                  <Link
                    href={`/blog/${blog.id}/`}
                    className="bg-white text-black rounded-full px-1.5 py-1 flex items-center justify-center shadow hover:bg-gray-100 transition w-full cursor-pointer whitespace-nowrap text-[11px] font-semibold"
                  >
                    Read More
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile: hidden scrollbar + peek affordance */}
          <div
            className="md:hidden -mx-4 px-4"
            style={{ overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style>{`.blog-mobile-scroll::-webkit-scrollbar { display: none; }`}</style>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="blog-mobile-scroll flex gap-4 pb-2"
              style={{ width: "max-content" }}
            >
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog.id ?? index}
                  variants={cardVariants}
                  className="group bg-[#F5F9FF] rounded-2xl p-2.5 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 flex flex-col flex-shrink-0 w-[72vw]"
                >
                  {blog.image ? (
                    <Image
                      src={blog.image}
                      alt={`Blog post: ${blog.title}`}
                      width={500}
                      height={300}
                      className="w-full h-36 object-cover rounded-lg mb-1.5"
                    />
                  ) : (
                    <div className="w-full h-36 bg-gray-200 rounded-lg mb-1.5 flex items-center justify-center text-gray-400 text-xs">
                      No image
                    </div>
                  )}

                  <p className="text-xs text-gray-500 mb-1 line-clamp-1">
                    {blog.category}
                  </p>

                  <h3
                    className="text-xs font-semibold text-[#034F96] mb-0.5 line-clamp-2"
                    title={blog.title}
                  >
                    {blog.title}
                  </h3>

                  <p
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 5,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                    className="text-[12px] text-gray-600 mb-1 mt-1 text-justify"
                  >
                    {blog.excerpt}
                  </p>

                  <div className="pt-1">
                    <Link
                      href={`/blog/${blog.id}/`}
                      className="bg-white text-black rounded-full px-1.5 py-1 flex items-center justify-center shadow hover:bg-gray-100 transition w-full cursor-pointer whitespace-nowrap text-[11px] font-semibold"
                    >
                      Read More
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dot indicators for mobile */}
          <div className="md:hidden flex justify-center gap-1.5 mt-3">
            {blogs.map((_, i) => (
              <span
                key={i}
                className={`block rounded-full transition-all ${
                  i === 0 ? "w-4 h-1.5 bg-[#034F96]" : "w-1.5 h-1.5 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* View All Button — centered, auto width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-6 flex justify-center"
      >
        <Link
          href="/blog/"
          className="bg-[#034F96] text-white rounded-full px-8 py-3 inline-flex items-center justify-center shadow-lg hover:bg-[#023d75] transition cursor-pointer text-sm font-semibold"
        >
          View All Articles
        </Link>
      </motion.div>
    </div>
  );
};

export default BlogSection;