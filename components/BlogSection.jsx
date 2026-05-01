"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import blogData from "@/data/blogData";

const BlogSection = () => {
  const blogs = Object.values(blogData);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="bg-white py-12 px-4 sm:px-6 lg:px-20"
      ref={containerRef}
    >
      {/* Section Header */}
      <motion.h2
        className="text-3xl md:text-4xl font-medium text-center mt-5 mb-6"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: -30 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <span className="text-[#5BB9EC]">Health & Wellness </span>
        <span className="text-[#034F96]">Blog</span>
      </motion.h2>

      {/* Blog Cards Grid - Desktop */}
      <div className="hidden md:grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {blogs.map((blog) => (
          <motion.div
            key={blog.id}
            variants={cardVariants}
            className="group bg-[#F5F9FF] rounded-2xl p-3 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 h-[380px] flex flex-col"
          >
            {/* Image */}
            <Image
              src={blog.image}
              alt={`Blog post: ${blog.title}`}
              width={500}
              height={300}
              className="w-full h-40 object-cover rounded-xl mb-2"
            />

            {/* Content */}
            <div className="flex flex-col flex-grow">
              {/* Category Badge - styled as subheading */}
              <p className="text-xs text-gray-500 mb-2 line-clamp-1">
                {blog.category}
              </p>

              {/* Title */}
              <h3 className="text-sm font-semibold text-[#034F96] mb-1 line-clamp-1 group-hover:text-[#023570] transition">
                {blog.title}
              </h3>

              {/* Excerpt */}
              <p className="text-[13px] text-gray-600  mt-1 flex-1 line-clamp-3">
                {blog.excerpt}
              </p>

              {/* Read More Button - matching Prescriptions style */}
              <div className="flex items-center justify-start mt-auto gap-2">
                {/* <Link */}
                  {/* href={`/blog/${blog.id}/`}
                  className="bg-white text-black rounded-full px-2 py-1.5 flex items-center shadow hover:bg-gray-100 transition w-fit cursor-pointer whitespace-nowrap" */}
                {/* > */}
                  <span className="pl-1 pr-2 text-xs font-semibold">
                    Read More
                  </span>
                {/* </Link> */}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Blog Cards Horizontal Scroll - Mobile */}
      <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4">
        <div className="flex gap-4 w-max">
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              variants={cardVariants}
              className="group bg-[#F5F9FF] rounded-2xl p-3 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 h-[380px] flex flex-col flex-shrink-0 w-72"
            >
              {/* Image */}
              <Image
                src={blog.image}
                alt={`Blog post: ${blog.title}`}
                width={500}
                height={300}
                className="w-full h-40 object-cover rounded-xl mb-2"
              />

              {/* Content */}
              <div className="flex flex-col flex-grow">
                {/* Category Badge - styled as subheading */}
                <p className="text-xs text-gray-500 mb-2 line-clamp-1">
                  {blog.category}
                </p>

                {/* Title */}
                <h3 className="text-sm font-semibold text-[#034F96] mb-1 line-clamp-1 group-hover:text-[#023570] transition">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-[13px] text-gray-600  mt-1 flex-1 line-clamp-3">
                  {blog.excerpt}
                </p>

                {/* Read More Button - matching Prescriptions style */}
                <div className="flex items-center justify-start mt-auto gap-2">
                  <Link
                    href={`/blog/${blog.id}/`}
                    className="bg-white text-black rounded-full px-2 py-1.5 flex items-center shadow hover:bg-gray-100 transition w-fit cursor-pointer whitespace-nowrap"
                  >
                    <span className="pl-1 pr-2 text-xs font-semibold">
                      Read More
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="flex justify-center mt-10"
      >
        {/* <Link href="/blog/"> */}
          <button className="bg-[#034F96] text-white px-8 py-3 rounded-lg font-semibold text-sm hover:bg-[#023570] transition duration-300 shadow-md hover:shadow-lg cursor-pointer">
            View All Articles
          </button>
        {/* </Link> */}
      </motion.div>
    </motion.div>
  );
};

export default BlogSection;
