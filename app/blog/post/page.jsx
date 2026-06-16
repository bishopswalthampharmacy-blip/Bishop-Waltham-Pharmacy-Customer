"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import BlogHero from "@/components/blog/BlogHero";
import BlogContent from "@/components/blog/BlogContent";
import { fetchAllBlogs } from "@/lib/utils";
import Link from "next/link";

// Main component that uses useSearchParams
function BlogPostContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        const loadBlog = async () => {
            try {
                if (!id) {
                    setError(true);
                    setLoading(false);
                    return;
                }

                const { blogs } = await fetchAllBlogs();
                const foundBlog = blogs.find((b) => b.id === id);

                if (foundBlog) {
                    setBlog(foundBlog);
                    // Set document title manually (generateMetadata doesn't work with query params)
                    document.title = `${foundBlog.title} - Bishops Waltham Pharmacy Blog`;
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error("Error loading blog:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        loadBlog();
    }, [id]);

    // Loading state
    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-[#5BB9EC] border-t-transparent rounded-full animate-spin" />
            </main>
        );
    }

    // Not found state
    if (error || !blog) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Post Not Found</h1>
                    <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
                    <Link href="/blog/" className="text-blue-600 hover:underline">
                        ← Back to Blog
                    </Link>
                </div>
            </main>
        );
    }

    // Success state
    return (
        <main className="min-h-screen bg-white">
            <BlogHero blog={blog} />
            <BlogContent blog={blog} />
        </main>
    );
}

// Suspense wrapper required for static export (since useSearchParams is involved)
export default function BlogPostPage() {
    return (
        <Suspense
            fallback={
                <main className="min-h-screen flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-[#5BB9EC] border-t-transparent rounded-full animate-spin" />
                </main>
            }
        >
            <BlogPostContent />
        </Suspense>
    );
}