"use client"

import Image from "next/image"
import Link from "next/link"

export default function BlogHero({ blog }) {
  return (
    <section className="relative bg-gradient-to-r from-[#034F96] to-[#0A6BC3] text-white py-12 md:py-20 lg:px-20 px-4 sm:px-6">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={blog.images?.hero || blog.image}
          alt={`Hero image for ${blog.title}`}
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#034F96] to-[#0A6BC3]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-blue-100 text-sm">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <span>/</span>
          <Link href="/blog/" className="hover:text-white transition">Blog</Link>
          <span>/</span>
          <span className="text-white truncate">{blog.title}</span>
        </div>

        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-block bg-white/20 backdrop-blur-sm text-blue-100 text-xs font-semibold px-4 py-1 rounded-full border border-white/30">
            {blog.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          {blog.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap gap-4 text-blue-100 text-sm">
          <span>By {blog.author}</span>
          {blog.publishedDate && (
            <>
              <span>•</span>
              <span>{new Date(blog.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </>
          )}
          {blog.updatedDate && blog.updatedDate !== blog.publishedDate && (
            <>
              <span>•</span>
              <span>Updated: {new Date(blog.updatedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
