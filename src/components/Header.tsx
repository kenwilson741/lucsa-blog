'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, UserCircle, LogOut } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { navLinks } from '@/lib/data';

export function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();
    const { data: session } = useSession();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'glass shadow-lg'
                : 'bg-transparent'
                }`}
        >
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-[var(--brand-primary)] transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(202,31,123,0.4)]">
                        <img src="/images/lucsa-logo.png" alt="LUCSA Logo" className="h-full w-full object-cover" />
                    </div>
                    <div className="hidden sm:block">
                        <span className="text-lg font-bold font-[var(--font-heading)] tracking-tight text-[var(--text-primary)]">
                            LUCSA
                        </span>
                        <span className="block text-[10px] font-medium text-[var(--text-tertiary)] leading-tight">
                            Speak with Conviction
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden items-center gap-1 lg:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${pathname === link.href
                                ? 'text-[var(--brand-primary)]'
                                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
                                }`}
                        >
                            {link.label}
                            {pathname === link.href && (
                                <motion.div
                                    layoutId="nav-indicator"
                                    className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[var(--brand-primary)]"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Right actions */}
                <div className="flex items-center gap-2">
                    <ThemeToggle />

                    {session?.user ? (
                        <>
                            <div className="hidden sm:flex items-center gap-2 rounded-full border border-[var(--border-color)] px-4 py-2">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--brand-primary)] text-xs font-bold text-white">
                                    {session.user.name?.[0]?.toUpperCase() || 'U'}
                                </div>
                                <span className="text-sm font-medium text-[var(--text-primary)] max-w-24 truncate">
                                    {session.user.name?.split(' ')[0]}
                                </span>
                            </div>
                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="hidden sm:flex items-center gap-1 rounded-full border border-[var(--border-color)] px-3 py-2 text-sm text-[var(--text-secondary)] transition-all hover:border-red-400 hover:text-red-500"
                            >
                                <LogOut className="h-4 w-4" />
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/auth/login"
                                className="hidden items-center gap-2 rounded-full border border-[var(--border-color)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition-all duration-200 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] sm:flex"
                            >
                                <UserCircle className="h-4 w-4" />
                                Login
                            </Link>
                            <Link
                                href="/auth/register"
                                className="hidden rounded-full px-4 py-2 text-sm font-semibold text-white transition-all duration-200 sm:block"
                                style={{ background: 'var(--hero-gradient)' }}
                            >
                                Join LUCSA
                            </Link>
                        </>
                    )}

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg lg:hidden hover:bg-[var(--bg-tertiary)]"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                        className="glass overflow-hidden border-t border-[var(--border-color)] lg:hidden"
                    >
                        <div className="flex flex-col gap-1 p-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${pathname === link.href
                                        ? 'bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]'
                                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <hr className="my-2 border-[var(--border-color)]" />

                            {session?.user ? (
                                <>
                                    <div className="flex items-center gap-3 px-4 py-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand-primary)] text-sm font-bold text-white">
                                            {session.user.name?.[0]?.toUpperCase() || 'U'}
                                        </div>
                                        <span className="text-sm font-medium text-[var(--text-primary)]">{session.user.name}</span>
                                    </div>
                                    <button
                                        onClick={() => signOut({ callbackUrl: '/' })}
                                        className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-500/10"
                                    >
                                        <LogOut className="h-4 w-4" /> Sign Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/auth/login"
                                        className="rounded-lg px-4 py-3 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/auth/register"
                                        className="rounded-lg px-4 py-3 text-center text-sm font-semibold text-white"
                                        style={{ background: 'var(--hero-gradient)' }}
                                    >
                                        Join LUCSA
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
