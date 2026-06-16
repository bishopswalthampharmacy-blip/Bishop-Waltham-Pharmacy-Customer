"use client";

import Link from "next/link";
import Image from "next/image";
import { fetchAllBlogs } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
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
    load();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#037F91] to-[#025F6E] text-white py-16 md:py-20 lg:px-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Health & Wellness Blog
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            Discover expert advice on travel health, vaccinations, ear care,
            weight management, and more from Bishops Waltham Pharmacy.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 lg:px-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {loading && (
            <div className="flex justify-center items-center min-h-[420px]">
              <div className="w-8 h-8 border-4 border-[#5BB9EC] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {error && (
            <div className="text-center py-20 text-red-500 text-sm">
              Failed to load blogs: {error}
            </div>
          )}

          {!loading && !error && blogs.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No blogs found. Check back soon!</p>
            </div>
          )}

          {!loading && !error && blogs.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {blogs.map((blog) => (
                <Link key={blog.id} href={`/blog/post/?id=${blog.id}`}>
                  <div className="bg-[#F5F9FF] rounded-2xl p-4 shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col cursor-pointer group">
                    {/* Featured Image */}
                    <div className="relative h-48 w-full overflow-hidden rounded-lg mb-4 bg-gray-200">
                      {blog.image ? (
                        <Image
                          src={blog.image}
                          alt={`Blog post: ${blog.title}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          No Image Available
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-grow">
                      <div className="mb-2">
                        <span className="inline-block bg-[#E8F4FF] text-[#037F91] text-xs font-semibold px-3 py-1 rounded-full">
                          {blog.category}
                        </span>
                      </div>
                      <h2 className="text-lg font-bold text-[#037F91] mb-2 line-clamp-2 group-hover:text-[#025F6E] transition">
                        {blog.title}
                      </h2>
                      <p className="text-gray-600 text-sm mb-3 flex-grow line-clamp-2">
                        {blog.excerpt}
                      </p>
                      <div className="mt-auto pt-3 border-t border-blue-200">
                        <span className="text-[#037F91] font-semibold text-xs group-hover:text-[#025F6E] transition inline-flex items-center gap-1">
                          Read More →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#E8F4FF] py-16 lg:px-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#037F91] mb-4">
            Have Questions?
          </h2>
          <p className="text-gray-700 mb-8 text-lg">
            Our pharmacy team is here to help. Book a consultation or visit us
            in person for personalized healthcare advice.
          </p>
          <Link href="/booking/">
            <button className="bg-[#037F91] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#025F6E] transition shadow-md hover:shadow-lg">
              Book Appointment
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}