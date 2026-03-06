'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Award, X, Star } from 'lucide-react';
import { leaders } from '@/lib/data';

export default function LeadershipPage() {
    const [selectedLeader, setSelectedLeader] = useState<typeof leaders[0] | null>(null);
    const patron = leaders.find((l) => l.isPatron);
    const executives = leaders.filter((l) => !l.isPatron);

    return (
        <>
            <section className="relative pt-24 pb-16" style={{ background: 'var(--hero-gradient)' }}>
                <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="mb-4 text-4xl font-extrabold text-white sm:text-5xl" style={{ fontFamily: 'var(--font-heading)' }}>
                        Our Leadership
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                        className="text-lg text-white/80">
                        Meet the Executive Committee driving LUCSA&apos;s vision forward (2025/2026)
                    </motion.p>
                </div>
            </section>

            {/* Patron */}
            {patron && (
                <section className="mx-auto max-w-3xl px-4 -mt-10 relative z-10 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass rounded-3xl p-8 text-center shadow-xl"
                    >
                        <div className="mb-4 flex justify-center">
                            <div className="h-28 w-28 rounded-full bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-accent)] p-1">
                                <div className="flex h-full w-full items-center justify-center rounded-full bg-[var(--card-bg)] text-3xl font-bold text-[var(--brand-primary)]">
                                    {patron.name[0]}{patron.name.split(' ').pop()?.[0]}
                                </div>
                            </div>
                        </div>
                        <div className="mb-2 flex items-center justify-center gap-2">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Patron</span>
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        </div>
                        <h2 className="mb-1 text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
                            {patron.name}
                        </h2>
                        <p className="mx-auto max-w-md text-sm text-[var(--text-secondary)] leading-relaxed">{patron.bio}</p>
                    </motion.div>
                </section>
            )}

            {/* Executive Committee */}
            <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="mb-3 text-3xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
                        Executive Committee
                    </h2>
                    <p className="text-[var(--text-secondary)]">Elected leaders serving the LUCSA community</p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {executives.map((leader, i) => (
                        <motion.div
                            key={leader.role}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.4 }}
                            whileHover={{
                                y: -4,
                                boxShadow: '0 10px 30px rgba(202,31,123,0.2)',
                                transition: { duration: 0.2 },
                            }}
                            onClick={() => setSelectedLeader(leader)}
                            className="group cursor-pointer rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 transition-all duration-300"
                        >
                            <div className="mb-4 flex items-start justify-between">
                                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[var(--brand-primary)]/20 to-[var(--brand-accent)]/20 flex items-center justify-center text-xl font-bold text-[var(--brand-primary)]">
                                    {leader.name[0]}{leader.name !== 'TBA' ? leader.name.split(' ').pop()?.[0] : ''}
                                </div>
                                <span className="rounded-full bg-[var(--brand-primary)]/10 px-3 py-1 text-xs font-semibold text-[var(--brand-primary)]">
                                    {leader.role}
                                </span>
                            </div>
                            <h3 className="mb-1 text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors">
                                {leader.name}
                            </h3>
                            <p className="mb-3 text-sm text-[var(--text-secondary)] line-clamp-2">{leader.bio}</p>
                            {leader.badges && leader.badges.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                    {leader.badges.map((badge) => (
                                        <span key={badge} className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-600">
                                            <Award className="h-3 w-3" />{badge}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedLeader && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                        onClick={() => setSelectedLeader(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-md rounded-3xl bg-[var(--card-bg)] p-8 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button onClick={() => setSelectedLeader(null)}
                                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full hover:bg-[var(--bg-tertiary)]">
                                <X className="h-5 w-5" />
                            </button>
                            <div className="mb-6 flex flex-col items-center text-center">
                                <div className="mb-4 h-24 w-24 rounded-full bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-accent)] p-1">
                                    <div className="flex h-full w-full items-center justify-center rounded-full bg-[var(--card-bg)] text-2xl font-bold text-[var(--brand-primary)]">
                                        {selectedLeader.name[0]}{selectedLeader.name !== 'TBA' ? selectedLeader.name.split(' ').pop()?.[0] : ''}
                                    </div>
                                </div>
                                <span className="mb-2 rounded-full bg-[var(--brand-primary)] px-4 py-1 text-xs font-bold text-white">
                                    {selectedLeader.role}
                                </span>
                                <h2 className="text-2xl font-bold text-[var(--text-primary)]">{selectedLeader.name}</h2>
                            </div>
                            <p className="mb-6 text-center text-[var(--text-secondary)] leading-relaxed">{selectedLeader.bio}</p>
                            {selectedLeader.badges && selectedLeader.badges.length > 0 && (
                                <div className="flex flex-wrap justify-center gap-2 mb-6">
                                    {selectedLeader.badges.map((badge) => (
                                        <span key={badge} className="flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600">
                                            <Award className="h-3.5 w-3.5" />{badge}
                                        </span>
                                    ))}
                                </div>
                            )}
                            <div className="flex justify-center gap-3">
                                <button className="flex items-center gap-1.5 rounded-full border border-[var(--border-color)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]">
                                    <Mail className="h-4 w-4" />Email
                                </button>
                                <button className="flex items-center gap-1.5 rounded-full border border-[var(--border-color)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]">
                                    <Phone className="h-4 w-4" />Call
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
