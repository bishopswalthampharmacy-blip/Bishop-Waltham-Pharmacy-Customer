import Link from "next/link"
import Image from "next/image"
import blogData from "@/data/blogData"

export const metadata = {
  title: "Blog - Bishops Waltham Pharmacy",
  description: "Read our latest blog posts on travel health, ear care, weight loss, vaccinations, and other pharmacy-related health topics.",
  robots: "index, follow",
}

export default function BlogPage() {
  const blogs = Object.values(blogData)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#034F96] to-[#0A6BC3] text-white py-16 md:py-20 lg:px-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Health & Wellness Blog</h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            Discover expert advice on travel health, vaccinations, ear care, weight management, and more from Bishops Waltham Pharmacy.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 lg:px-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogs.map((blog) => (
              <Link key={blog.id} href={`/blog/${blog.id}/`}>
                <div className="bg-[#F5F9FF] rounded-2xl p-4 shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col cursor-pointer group">
                  {/* Featured Image */}
                  <div className="relative h-48 w-full overflow-hidden rounded-lg mb-4 bg-gray-200">
                    <Image
                      src={blog.image}
                      alt={`Blog post: ${blog.title}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-grow">
                    {/* Category */}
                    <div className="mb-2">
                      <span className="inline-block bg-[#E8F4FF] text-[#034F96] text-xs font-semibold px-3 py-1 rounded-full">
                        {blog.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-bold text-[#034F96] mb-2 line-clamp-2 group-hover:text-[#023570] transition">
                      {blog.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm mb-3 flex-grow line-clamp-2">
                      {blog.excerpt}
                    </p>

                    {/* Read More Button */}
                    <div className="mt-auto pt-3 border-t border-blue-200">
                      <span className="text-[#034F96] font-semibold text-xs group-hover:text-[#023570] transition inline-flex items-center gap-1">
                        Read More →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#E8F4FF] py-16 lg:px-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#034F96] mb-4">Have Questions?</h2>
          <p className="text-gray-700 mb-8 text-lg">
            Our pharmacy team is here to help. Book a consultation or visit us in person for personalized healthcare advice.
          </p>
          <Link href="/booking/">
            <button className="bg-[#034F96] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#023570] transition shadow-md hover:shadow-lg">
              Book Appointment
            </button>
          </Link>
        </div>
      </section>
    </main>
  )
}
