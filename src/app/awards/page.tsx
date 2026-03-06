'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Star, Calendar, Building } from 'lucide-react';
import { awards } from '@/lib/data';

const categories = ['All', 'Writing Excellence', 'Leadership Recognition', 'Community Service', 'Innovation & Creativity'];

const categoryColors: Record<string, string> = {
    'Writing Excellence': 'bg-amber-500/10 text-amber-600',
    'Leadership Recognition': 'bg-purple-500/10 text-purple-600',
    'Community Service': 'bg-green-500/10 text-green-600',
    'Innovation & Creativity': 'bg-blue-500/10 text-blue-600',
};

export default function AwardsPage() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filtered = activeCategory === 'All' ? awards : awards.filter((a) => a.category === activeCategory);

    return (
        <>
            <section className="relative pt-24 pb-16" style={{ background: 'var(--hero-gradient)' }}>
                <div className="absolute inset-0 overflow-hidden">
                    {/* Confetti-like floating elements */}
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="absolute animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${3 + Math.random() * 2}s`,
                            }}>
                            <Star className="h-4 w-4 text-yellow-300/20" />
                        </div>
                    ))}
                </div>
                <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center">
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                        className="mb-6 flex justify-center">
                        <Trophy className="h-16 w-16 text-yellow-300" />
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="mb-4 text-4xl font-extrabold text-white sm:text-5xl" style={{ fontFamily: 'var(--font-heading)' }}>
                        Awards & Recognition
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                        className="text-lg text-white/80">
                        Celebrating excellence and achievement in communication and journalism
                    </motion.p>
                </div>
            </section>

            {/* Stats */}
            <section className="mx-auto max-w-4xl px-4 -mt-10 relative z-10 sm:px-6">
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { label: 'Total Awards', value: awards.length, icon: Trophy },
                        { label: 'Recipients', value: new Set(awards.map(a => a.recipient)).size, icon: Award },
                        { label: 'Latest', value: '2026', icon: Calendar },
                    ].map((stat, i) => (
                        <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass rounded-2xl p-5 text-center shadow-lg">
                            <stat.icon className="mx-auto mb-2 h-6 w-6 text-[var(--brand-primary)]" />
                            <div className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</div>
                            <div className="text-xs text-[var(--text-secondary)]">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Filters */}
            <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
                <div className="flex gap-2 overflow-x-auto pb-1 justify-center">
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
            </section>

            {/* Awards Grid */}
            <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((award, i) => (
                        <motion.div
                            key={`${award.title}-${award.recipient}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.03, boxShadow: '0 10px 30px rgba(202,31,123,0.2)' }}
                            className="group rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 transition-all duration-300"
                        >
                            {/* Trophy icon */}
                            <div className="mb-4 flex justify-center">
                                <motion.div
                                    whileHover={{ rotate: 15 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10"
                                >
                                    <Trophy className="h-8 w-8 text-amber-500" />
                                </motion.div>
                            </div>
                            {/* Info */}
                            <div className="text-center">
                                <span className={`mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${categoryColors[award.category] || ''}`}>
                                    {award.category}
                                </span>
                                <h3 className="mb-1 text-lg font-bold text-[var(--text-primary)]">{award.title}</h3>
                                <p className="mb-2 text-base font-semibold text-[var(--brand-primary)]">{award.recipient}</p>
                                <p className="mb-3 text-sm text-[var(--text-secondary)] leading-relaxed">{award.description}</p>
                                <div className="flex items-center justify-center gap-4 text-xs text-[var(--text-tertiary)]">
                                    <div className="flex items-center gap-1">
                                        <Building className="h-3 w-3" />{award.organization}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />{award.date}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </>
    );
}
