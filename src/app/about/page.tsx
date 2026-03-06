'use client';
import { motion } from 'framer-motion';
import {
    Eye, Target, CheckCircle2, Download, Mail, MapPin, Phone,
    GraduationCap, BookOpen, Globe
} from 'lucide-react';
import { coreValues, programs, timelineEvents } from '@/lib/data';

const valueIcons: Record<string, React.ReactNode> = {
    Completeness: <CheckCircle2 className="h-6 w-6" />,
    Conciseness: <BookOpen className="h-6 w-6" />,
    Consideration: <Eye className="h-6 w-6" />,
    Correctness: <Target className="h-6 w-6" />,
    Courtesy: <Globe className="h-6 w-6" />,
    Objectivity: <Eye className="h-6 w-6" />,
    Professionalism: <GraduationCap className="h-6 w-6" />,
};

export default function AboutPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative flex items-center justify-center overflow-hidden pt-24 pb-16" style={{ background: 'var(--hero-gradient)' }}>
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(circle at 50% 50%, white 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }} />
                <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 text-4xl font-extrabold text-white sm:text-5xl"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        About LUCSA
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="mx-auto max-w-2xl text-lg text-white/80"
                    >
                        Laikipia University Communication Students&apos; Association — established in 2023 to unite and empower communication students across all programs.
                    </motion.p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="grid gap-8 md:grid-cols-2">
                    {[
                        { icon: <Eye className="h-8 w-8" />, title: 'Our Vision', text: 'To establish deep-rooted journalistic skills and social links.' },
                        { icon: <Target className="h-8 w-8" />, title: 'Our Mission', text: 'To develop journalistic skills and coexistence of societies through educational, innovation, scientific inventions and cultural development.' },
                    ].map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] p-8 sm:p-10"
                        >
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]">
                                {item.icon}
                            </div>
                            <h2 className="mb-3 text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
                                {item.title}
                            </h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed text-lg">{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Core Values */}
            <section className="bg-[var(--bg-secondary)] py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="mb-3 text-3xl font-bold text-[var(--text-primary)] sm:text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>
                            Our Core Values
                        </h2>
                        <p className="text-[var(--text-secondary)]">The 7 C&apos;s and principles that define LUCSA</p>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {coreValues.map((v, i) => (
                            <motion.div
                                key={v.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                whileHover={{ y: -4 }}
                                className="glass rounded-2xl p-6 text-center"
                            >
                                <div className="mb-3 flex justify-center text-[var(--brand-primary)]">
                                    {valueIcons[v.title]}
                                </div>
                                <h3 className="mb-2 font-bold text-[var(--text-primary)]">{v.title}</h3>
                                <p className="text-sm text-[var(--text-secondary)]">{v.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
                <div className="mb-12 text-center">
                    <h2 className="mb-3 text-3xl font-bold text-[var(--text-primary)] sm:text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>
                        Our Journey
                    </h2>
                    <p className="text-[var(--text-secondary)]">Key milestones in LUCSA&apos;s history</p>
                </div>
                <div className="relative">
                    {/* Line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[var(--brand-primary)]/20 sm:left-1/2 sm:-translate-x-0.5" />
                    <div className="space-y-8">
                        {timelineEvents.map((event, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className={`relative flex flex-col sm:flex-row ${i % 2 === 0 ? '' : 'sm:flex-row-reverse'}`}
                            >
                                {/* Dot */}
                                <div className="absolute left-6 top-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[var(--brand-primary)] bg-[var(--bg-primary)] sm:left-1/2" />
                                {/* Content */}
                                <div className={`ml-12 sm:ml-0 sm:w-1/2 ${i % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`}>
                                    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-5 transition-shadow hover:shadow-lg">
                                        <span className="mb-1 inline-block rounded-full bg-[var(--brand-primary)]/10 px-3 py-0.5 text-xs font-bold text-[var(--brand-primary)]">
                                            {event.year}
                                        </span>
                                        <h3 className="mb-1 font-bold text-[var(--text-primary)]">{event.title}</h3>
                                        <p className="text-sm text-[var(--text-secondary)]">{event.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Programs */}
            <section className="bg-[var(--bg-secondary)] py-20">
                <div className="mx-auto max-w-5xl px-4 sm:px-6">
                    <div className="mb-12 text-center">
                        <h2 className="mb-3 text-3xl font-bold text-[var(--text-primary)] sm:text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>
                            Programs We Serve
                        </h2>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                        {programs.map((p, i) => (
                            <motion.div
                                key={p}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-3 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-5"
                            >
                                <GraduationCap className="h-8 w-8 shrink-0 text-[var(--brand-primary)]" />
                                <span className="font-medium text-[var(--text-primary)]">{p}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Constitution & Contact */}
            <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
                <div className="grid gap-8 md:grid-cols-2">
                    {/* Constitution */}
                    <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] p-8">
                        <h3 className="mb-4 text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
                            LUCSA Constitution
                        </h3>
                        <p className="mb-6 text-sm text-[var(--text-secondary)] leading-relaxed">
                            Our constitution, adopted in 2023, outlines the governance structure, membership requirements, and objectives of LUCSA. It defines executive positions, electoral procedures, financial management, and member rights.
                        </p>
                        <button className="flex items-center gap-2 rounded-full bg-[var(--brand-primary)] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-[var(--brand-primary)]/25">
                            <Download className="h-4 w-4" />
                            Download Constitution (PDF)
                        </button>
                    </div>
                    {/* Contact */}
                    <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] p-8">
                        <h3 className="mb-4 text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
                            Contact Us
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                                <MapPin className="h-5 w-5 mt-0.5 shrink-0 text-[var(--brand-primary)]" />
                                <span>Laikipia University Main Campus,<br />P.O. Box 1100-20300, Nyahururu, Kenya</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                                <Mail className="h-5 w-5 shrink-0 text-[var(--brand-primary)]" />
                                <a href="mailto:lucsa@gmail.com" className="hover:text-[var(--brand-primary)]">lucsa@gmail.com</a>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                                <Phone className="h-5 w-5 shrink-0 text-[var(--brand-primary)]" />
                                <span>+254 XXX XXX XXX</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}
