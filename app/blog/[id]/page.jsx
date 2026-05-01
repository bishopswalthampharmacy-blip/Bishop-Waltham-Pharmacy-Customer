import blogData from "@/data/blogData"
import BlogContent from "@/components/blog/BlogContent"
import BlogHero from "@/components/blog/BlogHero"

export async function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
  ]
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const blog = blogData[id]

  if (!blog) {
    return {
      title: "Blog Post Not Found - Bishops Waltham Pharmacy",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: `${blog.title} - Bishops Waltham Pharmacy Blog`,
    description: blog.description,
    robots: "index, follow",
    openGraph: {
      title: `${blog.title} - Bishops Waltham Pharmacy Blog`,
      description: blog.description,
      type: "article",
      publishedTime: blog.publishedDate,
      modifiedTime: blog.updatedDate,
    },
  }
}

export default async function BlogPostPage({ params }) {
  const { id } = await params
  const blog = blogData[id]

  if (!blog) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <a href="/blog/" className="text-blue-600 hover:underline">
            ← Back to Blog
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <BlogHero blog={blog} />
      <BlogContent blog={blog} />
    </main>
  )
}
