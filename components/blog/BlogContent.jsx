"use client"

import Image from "next/image"
import Link from "next/link"

export default function BlogContent({ blog }) {
    const content = blog.content

    return (
        <article className="bg-white">
            {/* Introduction */}
            {content.introduction && (
                <section className="mb-12 max-w-7xl mx-auto lg:px-20 px-4 sm:px-6 pt-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#034F96] mb-4">{content.introduction.title}</h2>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">{content.introduction.text}</p>
                </section>
            )}

            {/* Main Content Sections - Simple & Consistent */}
            {content.sections && content.sections.map((section, index) => (
                <section key={index} className="my-12 max-w-7xl mx-auto lg:px-20 px-4 sm:px-6">
                    {section.title && (
                        <h2 className="text-2xl md:text-3xl font-bold text-[#034F96] mb-4">{section.title}</h2>
                    )}

                    {/* Text Content */}
                    {section.text && (
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">{section.text}</p>
                    )}

                    {/* Single Image */}
                    {section.image && (
                        <div className="relative h-80 md:h-96 w-full rounded-lg overflow-hidden shadow-lg mb-6">
                            <Image
                                src={section.image}
                                alt={section.imageAlt || section.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}

                    {/* Additional Description after image */}
                    {section.description && (
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">{section.description}</p>
                    )}

                    {/* Quote if available */}
                    {section.quote && (
                        <blockquote className="border-l-4 border-[#034F96] pl-4 italic text-gray-700 bg-[#F5F9FF] p-6 rounded-r my-6">
                            "{section.quote}"
                        </blockquote>
                    )}
                </section>
            ))}

            {/* CTA Section */}
            {blog.cta && (
                <section className="my-16 max-w-7xl mx-auto lg:px-20 px-4 sm:px-6 bg-gradient-to-r from-[#034F96] to-[#0A6BC3] text-white rounded-lg p-8 md:p-12 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{blog.cta.title}</h2>
                    <p className="text-base md:text-lg text-blue-100 mb-6">{blog.cta.text}</p>
                    <Link href={blog.cta.buttonLink}>
                        <button className="bg-white text-[#034F96] font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition shadow-md hover:shadow-lg">
                            {blog.cta.buttonText}
                        </button>
                    </Link>
                </section>
            )}

            {/* Back to Blog Link */}
            <div className="mt-12 pt-8 border-t border-gray-200 max-w-7xl mx-auto lg:px-20 px-4 sm:px-6 pb-12">
                <Link href="/blog/" className="text-[#034F96] hover:text-[#023570] font-semibold flex items-center gap-2 transition">
                    ← Back to Blog
                </Link>
            </div>
        </article>
    )
}
