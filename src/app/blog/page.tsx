'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, BookOpen, Clock, ChevronRight } from 'lucide-react';
import { blogPosts } from '@/lib/data';

const categories = ['All', 'News & Announcements', 'Student Spotlights', 'Tutorials & Tips', 'Event Coverage', 'Opinion Pieces'];

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filtered = blogPosts.filter((p) => {
        const matchCat = activeCategory === 'All' || p.category === activeCategory;
        const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCat && matchSearch;
    });

    const featured = blogPosts.filter((p) => p.featured);

    return (
        <>
            <section className="relative pt-24 pb-16" style={{ background: 'var(--hero-gradient)' }}>
                <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="mb-4 text-4xl font-extrabold text-white sm:text-5xl" style={{ fontFamily: 'var(--font-heading)' }}>
                        LUCSA Blog
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                        className="text-lg text-white/80">
                        Stories, insights, and achievements from our community
                    </motion.p>
                </div>
            </section>

            {/* Featured */}
            {featured.length > 0 && (
                <section className="mx-auto max-w-7xl px-4 -mt-10 relative z-10 sm:px-6 lg:px-8">
                    <div className="grid gap-6 md:grid-cols-2">
                        {featured.map((post) => (
                            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                                <div className="overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
                                    <div className="relative h-52" style={{ background: 'var(--card-gradient)' }}>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <BookOpen className="h-16 w-16 text-[var(--brand-primary)] opacity-20" />
                                        </div>
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <span className="rounded-full bg-[var(--brand-primary)] px-3 py-1 text-xs font-bold text-white">Featured</span>
                                            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[var(--text-primary)]">{post.category}</span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h2 className="mb-2 text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="mb-4 text-sm text-[var(--text-secondary)] line-clamp-2">{post.excerpt}</p>
                                        <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)]">
                                            <div className="flex items-center gap-2">
                                                <div className="h-6 w-6 rounded-full bg-[var(--brand-primary)]/20 flex items-center justify-center text-xs font-bold text-[var(--brand-primary)]">
                                                    {post.author[0]}
                                                </div>
                                                <span>{post.author}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />{post.readTime}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Filters */}
            <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                        {categories.map((cat) => (
                            <button key={cat} onClick={() => setActiveCategory(cat)}
                                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${activeCategory === cat
                                        ? 'bg-[var(--brand-primary)] text-white'
                                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
                                    }`}>
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-tertiary)]" />
                        <input type="text" placeholder="Search articles..." value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] py-2 pl-10 pr-4 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20 sm:w-64" />
                    </div>
                </div>
            </section>

            {/* Grid */}
            <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((post, i) => (
                        <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                            <Link href={`/blog/${post.slug}`} className="group block">
                                <div className="overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                    <div className="relative h-44" style={{ background: 'var(--card-gradient)' }}>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <BookOpen className="h-10 w-10 text-[var(--brand-primary)] opacity-20" />
                                        </div>
                                        <div className="absolute top-3 left-3">
                                            <span className="rounded-full bg-[var(--brand-primary)] px-3 py-1 text-xs font-semibold text-white">{post.category}</span>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="mb-2 font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="mb-4 text-sm text-[var(--text-secondary)] line-clamp-2">{post.excerpt}</p>
                                        <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)]">
                                            <div className="flex items-center gap-2">
                                                <div className="h-5 w-5 rounded-full bg-[var(--brand-primary)]/20 flex items-center justify-center text-[10px] font-bold text-[var(--brand-primary)]">
                                                    {post.author[0]}
                                                </div>
                                                <span>{post.author}</span>
                                            </div>
                                            <span>{post.readTime}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>
        </>
    );
}
