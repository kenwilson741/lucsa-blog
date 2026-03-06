'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Search, Filter, Users, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { events } from '@/lib/data';

const categories = ['All', 'Workshop', 'Competition', 'Networking', 'Community Service'];

const categoryColors: Record<string, string> = {
    Workshop: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    Competition: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    Networking: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    'Community Service': 'bg-green-500/10 text-green-600 dark:text-green-400',
};

export default function EventsPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);

    const filtered = events.filter((e) => {
        const matchCat = activeCategory === 'All' || e.category === activeCategory;
        const matchSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            e.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCat && matchSearch;
    });

    return (
        <>
            {/* Hero */}
            <section className="relative pt-24 pb-16" style={{ background: 'var(--hero-gradient)' }}>
                <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="mb-4 text-4xl font-extrabold text-white sm:text-5xl" style={{ fontFamily: 'var(--font-heading)' }}>
                        Events & Activities
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                        className="text-lg text-white/80">
                        Workshops, competitions, community service, and networking opportunities
                    </motion.p>
                </div>
            </section>

            {/* Filters */}
            <section className="sticky top-16 z-30 border-b border-[var(--border-color)] bg-[var(--bg-primary)]">
                <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${activeCategory === cat
                                        ? 'bg-[var(--brand-primary)] text-white shadow-md'
                                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-tertiary)]" />
                            <input
                                type="text"
                                placeholder="Search events..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] py-2 pl-10 pr-4 text-sm text-[var(--text-primary)] outline-none transition-all focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20 sm:w-64"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Events Grid */}
            <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {filtered.length === 0 ? (
                    <div className="py-20 text-center">
                        <Filter className="mx-auto mb-4 h-12 w-12 text-[var(--text-tertiary)]" />
                        <p className="text-lg font-medium text-[var(--text-secondary)]">No events match your filters</p>
                        <button onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                            className="mt-4 text-sm text-[var(--brand-primary)] hover:underline">
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((event, i) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08, duration: 0.4 }}
                                whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(202,31,123,0.15)' }}
                                onClick={() => setSelectedEvent(event)}
                                className="group cursor-pointer rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 transition-all duration-300"
                            >
                                <div className="mb-4 flex items-center gap-2">
                                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${categoryColors[event.category] || ''}`}>
                                        {event.category}
                                    </span>
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
                                        <Clock className="h-3.5 w-3.5" />{event.time}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="h-3.5 w-3.5" />{event.venue}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Users className="h-3.5 w-3.5" />{event.spots} spots available
                                    </div>
                                </div>
                                <button className="mt-4 w-full rounded-full bg-[var(--brand-primary)] py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-[var(--brand-primary)]/25">
                                    RSVP Now
                                </button>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>

            {/* Event Detail Modal */}
            <AnimatePresence>
                {selectedEvent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                        onClick={() => setSelectedEvent(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-full max-w-lg rounded-3xl bg-[var(--card-bg)] p-8 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button onClick={() => setSelectedEvent(null)}
                                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full hover:bg-[var(--bg-tertiary)]">
                                <X className="h-5 w-5" />
                            </button>
                            <span className={`mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold ${categoryColors[selectedEvent.category] || ''}`}>
                                {selectedEvent.category}
                            </span>
                            <h2 className="mb-3 text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
                                {selectedEvent.title}
                            </h2>
                            <p className="mb-6 text-[var(--text-secondary)] leading-relaxed">{selectedEvent.description}</p>
                            <div className="mb-6 space-y-3 text-sm text-[var(--text-secondary)]">
                                <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-[var(--brand-primary)]" />
                                    {new Date(selectedEvent.date).toLocaleDateString('en-KE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                </div>
                                <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-[var(--brand-primary)]" />{selectedEvent.time}</div>
                                <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[var(--brand-primary)]" />{selectedEvent.venue}</div>
                                <div className="flex items-center gap-2"><Users className="h-4 w-4 text-[var(--brand-primary)]" />{selectedEvent.spots} spots available</div>
                            </div>
                            <button className="w-full rounded-full bg-[var(--brand-primary)] py-3 text-sm font-bold text-white transition-all hover:shadow-lg hover:shadow-[var(--brand-primary)]/25">
                                RSVP for this Event
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
