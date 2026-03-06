'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Share2, ChevronRight, BookOpen } from 'lucide-react';
import { blogPosts } from '@/lib/data';

export default function BlogPostPage() {
    const params = useParams();
    const post = blogPosts.find((p) => p.slug === params.slug);
    const [readingProgress, setReadingProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            setReadingProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    if (!post) {
        return (
            <div className="flex min-h-screen items-center justify-center pt-20">
                <div className="text-center">
                    <h1 className="mb-4 text-3xl font-bold text-[var(--text-primary)]">Post Not Found</h1>
                    <Link href="/blog" className="text-[var(--brand-primary)] hover:underline">← Back to Blog</Link>
                </div>
            </div>
        );
    }

    const related = blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 2);

    return (
        <>
            {/* Reading progress */}
            <div className="reading-progress" style={{ width: `${readingProgress}%` }} />

            {/* Hero */}
            <section className="relative pt-24 pb-16" style={{ background: 'var(--hero-gradient)' }}>
                <div className="relative z-10 mx-auto max-w-4xl px-4 py-16 text-center">
                    <Link href="/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-white/70 hover:text-white">
                        <ArrowLeft className="h-4 w-4" /> Back to Blog
                    </Link>
                    <div className="mb-4 flex justify-center gap-2">
                        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">{post.category}</span>
                    </div>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="mb-4 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl" style={{ fontFamily: 'var(--font-heading)' }}>
                        {post.title}
                    </motion.h1>
                    <div className="flex items-center justify-center gap-4 text-sm text-white/70">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white">
                                {post.author[0]}
                            </div>
                            <div className="text-left">
                                <div className="font-medium text-white">{post.author}</div>
                                <div className="text-xs text-white/60">{post.authorRole}</div>
                            </div>
                        </div>
                        <span>·</span>
                        <div className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />
                            {new Date(post.date).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                        <span>·</span>
                        <div className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{post.readTime}</div>
                    </div>
                </div>
            </section>

            {/* Article content */}
            <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
                <div className="prose prose-lg max-w-none text-[var(--text-secondary)]" style={{ fontFamily: 'var(--font-body)', lineHeight: 1.8 }}>
                    <p className="text-lg leading-relaxed">{post.excerpt}</p>
                    <p className="leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <h2 className="mt-8 mb-4 text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
                        Key Highlights
                    </h2>
                    <p className="leading-relaxed">
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <blockquote className="my-6 border-l-4 border-[var(--brand-primary)] pl-6 italic text-[var(--text-secondary)]">
                        &ldquo;Speak with Conviction — this is more than a motto, it&apos;s a way of life for every LUCSA member.&rdquo;
                    </blockquote>
                    <p className="leading-relaxed">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                        totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                    </p>
                </div>

                {/* Share */}
                <div className="mt-12 flex items-center justify-between border-t border-b border-[var(--border-color)] py-6">
                    <span className="text-sm font-semibold text-[var(--text-primary)]">Share this article</span>
                    <div className="flex gap-3">
                        {['WhatsApp', 'Twitter', 'Facebook'].map((platform) => (
                            <button key={platform}
                                className="rounded-full border border-[var(--border-color)] px-4 py-2 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]">
                                {platform}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Author Card */}
                <div className="mt-12 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 flex flex-col sm:flex-row gap-4 items-start">
                    <div className="h-16 w-16 shrink-0 rounded-full bg-[var(--brand-primary)]/20 flex items-center justify-center text-xl font-bold text-[var(--brand-primary)]">
                        {post.author[0]}
                    </div>
                    <div>
                        <h3 className="font-bold text-[var(--text-primary)]">{post.author}</h3>
                        <p className="text-sm text-[var(--brand-primary)] mb-2">{post.authorRole}</p>
                        <p className="text-sm text-[var(--text-secondary)]">
                            A dedicated member of LUCSA committed to excellence in communication and journalism.
                        </p>
                    </div>
                </div>
            </article>

            {/* Related Posts */}
            {related.length > 0 && (
                <section className="bg-[var(--bg-secondary)] py-16">
                    <div className="mx-auto max-w-5xl px-4 sm:px-6">
                        <h2 className="mb-8 text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
                            Related Articles
                        </h2>
                        <div className="grid gap-6 sm:grid-cols-2">
                            {related.map((p) => (
                                <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                                    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-5 transition-all hover:shadow-lg hover:-translate-y-1">
                                        <span className="mb-2 inline-block rounded-full bg-[var(--brand-primary)]/10 px-3 py-1 text-xs font-semibold text-[var(--brand-primary)]">
                                            {p.category}
                                        </span>
                                        <h3 className="mb-2 font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-primary)]">{p.title}</h3>
                                        <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{p.excerpt}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
