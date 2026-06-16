"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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
      setBlogs(blogList);
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

  // Shared card content (matches the /blog page card design)
  const BlogCard = ({ blog }) => (
    <div className="bg-[#F5F9FF] rounded-2xl p-4 shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col cursor-pointer group">
      {/* Featured Image */}
      <div className="relative h-48 w-full overflow-hidden rounded-lg mb-4 bg-gray-200">
        {blog.image ? (
          <Image
            src={blog.image}
            alt={`Blog post: ${blog.title}`}
            fill
            sizes="(max-width: 768px) 80vw, (max-width: 1024px) 45vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
            No Image Available
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        {/* Category */}
        <div className="mb-2">
          <span className="inline-block bg-[#E8F4FF] text-[#037F91] text-xs font-semibold px-3 py-1 rounded-full">
            {blog.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-[#037F91] mb-2 line-clamp-2 group-hover:text-[#025F6E] transition">
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm mb-3 flex-grow line-clamp-2">
          {blog.excerpt}
        </p>

        {/* Read More */}
        <div className="mt-auto pt-3 border-t border-blue-200">
          <span className="text-[#037F91] font-semibold text-xs group-hover:text-[#025F6E] transition inline-flex items-center gap-1">
            Read More →
          </span>
        </div>
      </div>
    </div>
  );

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
              >
                <Link
                  href={`/blog/post/?id=${blog.id}`}
                  className={
                    blogs.length > 4
                      ? "block flex-shrink-0 w-80 h-full"
                      : "block h-full"
                  }
                >
                  <BlogCard blog={blog} />
                </Link>
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
                  className="group bg-[#F5F9FF] rounded-2xl p-2.5 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 flex flex-col flex-shrink-0 w-72"
                >
                  <Link href={`/blog/post/?id=${blog.id}`} className="block h-full">
                    <BlogCard blog={blog} />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dot indicators for mobile */}
          <div className="md:hidden flex justify-center gap-1.5 mt-3">
            {blogs.map((_, i) => (
              <span
                key={i}
                className={`block rounded-full transition-all ${i === 0 ? "w-4 h-1.5 bg-[#034F96]" : "w-1.5 h-1.5 bg-gray-300"
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