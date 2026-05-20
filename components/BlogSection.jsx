"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { fetchAllBlogs } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;

      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
      // Execute your utility function
      const data = await fetchAllBlogs();
      
      // API returns { responseStatus, blogs: [...] }
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

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-20">
      {/* Section Header */}
      <motion.h2
        className="text-3xl md:text-4xl font-medium text-center mt-5 mb-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <span className="text-[#5BB9EC]">Health & Wellness </span>
        <span className="text-[#034F96]">Blog</span>
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

      {/* Horizontally Scrollable Blog Cards */}
      {/* Blog Slider */}
      {!loading && !error && blogs.length > 0 && (
        <div className="relative">
          
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition"
          >
            <ChevronRight size={24} />
          </button>

          <motion.div
            ref={scrollRef}
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="overflow-x-hidden px-10 py-6 mx-2"
          >
            <div className="flex gap-4 py-2">
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog.id ?? index}
                  variants={cardVariants}
                  className="group bg-[#F5F9FF] rounded-2xl p-3 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 h-[380px] flex flex-col flex-shrink-0 w-72"
                >
                  {/* Image */}
                  {blog.image ? (
                    <Image
                      src={blog.image}
                      alt={`Blog post: ${blog.title}`}
                      width={500}
                      height={300}
                      className="w-full h-40 object-cover rounded-xl mb-2"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 rounded-xl mb-2 flex items-center justify-center text-gray-400 text-xs">
                      No image
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex flex-col flex-grow">
                    {/* Category */}
                    <p className="text-xs text-gray-500 mb-2 line-clamp-1">
                      {blog.category}
                    </p>

                    {/* Title */}
                    <h3 className="text-sm font-semibold text-[#034F96] mb-1 line-clamp-1 group-hover:text-[#023570] transition">
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-[13px] text-gray-600 mt-1 flex-1 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    {/* Read More Button */}
                    <div className="flex flex-col gap-2 mt-auto pt-1">
                      <Link
                        href={`/blog/${blog.id}/`}
                        className="bg-white text-black rounded-full px-3 py-2 flex items-center justify-center shadow hover:bg-gray-100 transition w-full cursor-pointer whitespace-nowrap text-xs font-semibold"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        )}

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="flex justify-center mt-10"
      >
        <Link href="/blog/">
          <button className="bg-[#034F96] text-white px-8 py-3 rounded-lg font-semibold text-sm hover:bg-[#023570] transition duration-300 shadow-md hover:shadow-lg cursor-pointer">
            View All Articles
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default BlogSection;
