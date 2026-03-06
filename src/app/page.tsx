'use client';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  Users,
  Trophy,
  Sparkles,
  ChevronRight,
  Clock,
  MapPin,
  BookOpen,
} from 'lucide-react';
import { stats, events, blogPosts, coreValues } from '@/lib/data';

/* ─── Animated counter ─── */
function Counter({ value, suffix, isYear }: { value: number; suffix: string; isYear?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (isYear) { setDisplay(value); return; }
    let start = 0;
    const duration = 1200;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value, isYear]);

  return <span ref={ref}>{display}{suffix}</span>;
}

/* ─── Section wrapper with animation ─── */
function Section({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─── Icon map ─── */
const valueIcons: Record<string, React.ReactNode> = {
  Completeness: <span className="text-2xl">✅</span>,
  Conciseness: <span className="text-2xl">📝</span>,
  Consideration: <span className="text-2xl">💜</span>,
  Correctness: <span className="text-2xl">🎯</span>,
  Courtesy: <span className="text-2xl">🤝</span>,
  Objectivity: <span className="text-2xl">⚖️</span>,
  Professionalism: <span className="text-2xl">🏆</span>,
};

export default function Home() {
  return (
    <>
      {/* ══════════ HERO ══════════ */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Gradient BG */}
        <div className="absolute inset-0" style={{ background: 'var(--hero-gradient)' }} />
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

        <div className="relative z-10 mx-auto max-w-5xl px-4 py-32 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className="mb-8"
          >
            <div className="mx-auto mb-6 h-28 w-28 overflow-hidden rounded-full border-4 border-white/30 shadow-2xl sm:h-36 sm:w-36">
              <img src="/images/lucsa-logo.png" alt="LUCSA Logo" className="h-full w-full object-cover" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
            className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Speak with
            <br />
            <span className="text-yellow-300 drop-shadow-lg">Conviction</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mx-auto mb-4 max-w-2xl text-lg text-white/80 sm:text-xl"
          >
            Laikipia University Communication Students&apos; Association
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mx-auto mb-10 max-w-xl text-sm text-white/60 sm:text-base"
          >
            Establishing deep-rooted journalistic skills and social links since 2023
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href="/auth/register"
              className="group flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#CA1F7B] shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
            >
              Join LUCSA
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/events"
              className="flex items-center gap-2 rounded-full border-2 border-white/40 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
            >
              <Calendar className="h-4 w-4" />
              Explore Events
            </Link>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
      </section>

      {/* ══════════ STATS ══════════ */}
      <Section className="relative -mt-16 z-20 mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-6 text-center shadow-lg"
            >
              <div className="text-3xl font-extrabold text-[var(--brand-primary)] sm:text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>
                <Counter value={s.value} suffix={s.suffix} isYear={s.isYear} />
              </div>
              <div className="mt-1 text-sm font-medium text-[var(--text-secondary)]">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ══════════ MISSION & VISION ══════════ */}
      <Section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-3 text-3xl font-bold text-[var(--text-primary)] sm:text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>
            Our Purpose
          </h2>
          <p className="mx-auto max-w-xl text-[var(--text-secondary)]">
            Empowering communication students to become the next generation of media professionals
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {[
            {
              title: 'Our Vision',
              icon: <Sparkles className="h-8 w-8" />,
              text: 'To establish deep-rooted journalistic skills and social links.',
              gradient: 'from-purple-500/10 to-blue-500/10',
            },
            {
              title: 'Our Mission',
              icon: <Users className="h-8 w-8" />,
              text: 'To develop journalistic skills and coexistence of societies through educational, innovation, scientific inventions and cultural development.',
              gradient: 'from-blue-500/10 to-purple-500/10',
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`glass rounded-3xl p-8 sm:p-10 bg-gradient-to-br ${item.gradient}`}
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]">
                {item.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
                {item.title}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ══════════ CORE VALUES ══════════ */}
      <Section className="bg-[var(--bg-secondary)] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-3 text-3xl font-bold text-[var(--text-primary)] sm:text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>
              Our Core Values
            </h2>
            <p className="mx-auto max-w-xl text-[var(--text-secondary)]">
              The 7 pillars that guide everything we do at LUCSA
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass rounded-2xl p-6 cursor-default"
              >
                <div className="mb-3">{valueIcons[v.title]}</div>
                <h4 className="mb-2 font-bold text-[var(--text-primary)]">{v.title}</h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════ UPCOMING EVENTS ══════════ */}
      <Section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="mb-3 text-3xl font-bold text-[var(--text-primary)] sm:text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>
              Upcoming Events
            </h2>
            <p className="text-[var(--text-secondary)]">Don&apos;t miss our latest workshops, competitions, and community activities</p>
          </div>
          <Link href="/events" className="hidden items-center gap-1 text-sm font-semibold text-[var(--brand-primary)] hover:gap-2 transition-all sm:flex">
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.slice(0, 3).map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(202,31,123,0.15)' }}
              className="group rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 transition-all duration-300"
            >
              <div className="mb-4 flex items-center gap-2">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${event.category === 'Workshop' ? 'bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]' :
                  event.category === 'Competition' ? 'bg-amber-500/10 text-amber-600' :
                    event.category === 'Networking' ? 'bg-blue-500/10 text-blue-600' :
                      'bg-green-500/10 text-green-600'
                  }`}>{event.category}</span>
                <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-600">{event.status}</span>
              </div>
              <h3 className="mb-2 text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors">
                {event.title}
              </h3>
              <p className="mb-4 text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2">{event.description}</p>
              <div className="flex flex-col gap-2 text-xs text-[var(--text-tertiary)]">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(event.date).toLocaleDateString('en-KE', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {event.time}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {event.venue}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link href="/events" className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-primary)]">
            View All Events <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* ══════════ LATEST BLOG ══════════ */}
      <Section className="bg-[var(--bg-secondary)] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="mb-3 text-3xl font-bold text-[var(--text-primary)] sm:text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>
                Latest from the Blog
              </h2>
              <p className="text-[var(--text-secondary)]">Stories, insights, and achievements from LUCSA members</p>
            </div>
            <Link href="/blog" className="hidden items-center gap-1 text-sm font-semibold text-[var(--brand-primary)] hover:gap-2 transition-all sm:flex">
              Read More <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(0, 3).map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    {/* Image placeholder */}
                    <div className="relative h-48 overflow-hidden" style={{ background: 'var(--card-gradient)' }}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-[var(--brand-primary)]/30" />
                      </div>
                      <div className="absolute top-3 left-3">
                        <span className="rounded-full bg-[var(--brand-primary)] px-3 py-1 text-xs font-semibold text-white">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="mb-2 text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="mb-4 text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)]">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-[var(--brand-primary)]/20 flex items-center justify-center text-[var(--brand-primary)] text-xs font-bold">
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
        </div>
      </Section>

      {/* ══════════ CTA ══════════ */}
      <Section className="py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="rounded-3xl p-12 sm:p-16" style={{ background: 'var(--hero-gradient)' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Trophy className="mx-auto mb-6 h-12 w-12 text-yellow-300" />
              <h2 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>
                Ready to Speak with Conviction?
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-white/80">
                Join 150+ communication students building the future of Kenyan media. Membership is only KES 100.
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/auth/register"
                  className="group flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#CA1F7B] shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  Register Now — KES 100
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/about"
                  className="text-sm font-semibold text-white/80 underline underline-offset-4 decoration-white/30 hover:decoration-white hover:text-white transition-all"
                >
                  Learn more about LUCSA
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>
    </>
  );
}
