'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ZoomIn, Filter, Grid3X3 } from 'lucide-react';
import { galleryImages } from '@/lib/data';

const categories = ['All', 'Event Coverage', 'Student Photography'];

// Generate placeholder colors for gallery cards
const placeholderGradients = [
    'from-purple-500/30 to-blue-500/30',
    'from-blue-500/30 to-cyan-500/30',
    'from-amber-500/30 to-orange-500/30',
    'from-green-500/30 to-teal-500/30',
    'from-pink-500/30 to-rose-500/30',
    'from-indigo-500/30 to-purple-500/30',
    'from-cyan-500/30 to-blue-500/30',
    'from-rose-500/30 to-pink-500/30',
];

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

    const filtered = activeCategory === 'All' ? galleryImages : galleryImages.filter((img) => img.category === activeCategory);

    return (
        <>
            <section className="relative pt-24 pb-16" style={{ background: 'var(--hero-gradient)' }}>
                <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center">
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="mb-6 flex justify-center">
                        <Camera className="h-16 w-16 text-white/80" />
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="mb-4 text-4xl font-extrabold text-white sm:text-5xl" style={{ fontFamily: 'var(--font-heading)' }}>
                        Gallery
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                        className="text-lg text-white/80">
                        Explore moments captured by LUCSA members — events, campus life, and creative work
                    </motion.p>
                </div>
            </section>

            {/* Filters */}
            <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
                <div className="flex items-center justify-between">
                    <div className="flex gap-2 overflow-x-auto pb-1">
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
                    <div className="text-sm text-[var(--text-tertiary)]">{filtered.length} items</div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
                <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
                    {filtered.map((img, i) => {
                        const height = [240, 300, 360, 280, 320][i % 5];
                        return (
                            <motion.div
                                key={img.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: (i % 6) * 0.08 }}
                                className="mb-4 break-inside-avoid"
                            >
                                <div
                                    onClick={() => setSelectedImage(img)}
                                    className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br ${placeholderGradients[i % placeholderGradients.length]} border border-[var(--border-color)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                                    style={{ height: `${height}px` }}
                                >
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Camera className="h-12 w-12 text-[var(--text-primary)] opacity-10" />
                                    </div>
                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <h3 className="text-sm font-bold text-white">{img.title}</h3>
                                            <p className="text-xs text-white/70">{img.artist}</p>
                                        </div>
                                        <div className="absolute top-3 right-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                                                <ZoomIn className="h-4 w-4 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative w-full max-w-3xl rounded-3xl bg-[var(--card-bg)] overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70">
                                <X className="h-5 w-5" />
                            </button>
                            {/* Image area */}
                            <div className={`aspect-video bg-gradient-to-br ${placeholderGradients[parseInt(selectedImage.id) % placeholderGradients.length]} flex items-center justify-center`}>
                                <Camera className="h-20 w-20 text-[var(--text-primary)] opacity-10" />
                            </div>
                            {/* Info */}
                            <div className="p-6">
                                <span className="mb-2 inline-block rounded-full bg-[var(--brand-primary)]/10 px-3 py-1 text-xs font-semibold text-[var(--brand-primary)]">
                                    {selectedImage.category}
                                </span>
                                <h2 className="mb-1 text-xl font-bold text-[var(--text-primary)]">{selectedImage.title}</h2>
                                <p className="mb-1 text-sm text-[var(--brand-primary)]">{selectedImage.artist}</p>
                                <p className="text-sm text-[var(--text-secondary)]">{selectedImage.description}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
