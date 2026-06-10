import Image from "next/image";

export default function BlogHero({ blog }) {
  const heroImage =
    blog?.images?.hero?.trim?.() ||
    blog?.image?.trim?.() ||
    null;

  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        {heroImage ? (
          <Image
            src={heroImage}
            alt={`Hero image for ${blog?.title || "Blog Post"}`}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300" />
        )}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        {blog?.category && (
          <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
            {blog.category}
          </span>
        )}

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          {blog?.title}
        </h1>

        {blog?.description && (
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            {blog.description}
          </p>
        )}
      </div>
    </section>
  );
}