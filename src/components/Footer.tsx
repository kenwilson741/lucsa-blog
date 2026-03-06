import Link from 'next/link';
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin, ExternalLink } from 'lucide-react';
import { navLinks } from '@/lib/data';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)]">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-[var(--brand-primary)]">
                                <img src="/images/lucsa-logo.png" alt="LUCSA Logo" className="h-full w-full object-cover" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-[var(--text-primary)]">LUCSA</h3>
                                <p className="text-xs text-[var(--text-tertiary)]">Speak with Conviction</p>
                            </div>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                            Laikipia University Communication Students&apos; Association — establishing deep-rooted journalistic skills and social links.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { icon: Facebook, href: '#', label: 'Facebook' },
                                { icon: Twitter, href: '#', label: 'Twitter' },
                                { icon: Instagram, href: '#', label: 'Instagram' },
                                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                            ].map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--text-tertiary)] transition-all duration-300 hover:border-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white hover:rotate-[360deg]"
                                >
                                    <social.icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">Quick Links</h4>
                        <ul className="space-y-3">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-primary)]"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">Resources</h4>
                        <ul className="space-y-3">
                            {[
                                { label: 'LUCSA Constitution', href: '#' },
                                { label: 'Member Registration', href: '/auth/register' },
                                { label: 'Event Calendar', href: '/events' },
                                { label: 'Student Blog', href: '/blog' },
                                { label: 'Photo Gallery', href: '/gallery' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="flex items-center gap-1 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-primary)]"
                                    >
                                        {link.label}
                                        {link.href === '#' && <ExternalLink className="h-3 w-3" />}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-[var(--brand-primary)]" />
                                <span>Laikipia University Main Campus,<br />P.O. Box 1100-20300, Nyahururu, Kenya</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                                <Mail className="h-4 w-4 shrink-0 text-[var(--brand-primary)]" />
                                <a href="mailto:lucsa@gmail.com" className="hover:text-[var(--brand-primary)]">lucsa@gmail.com</a>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                                <Phone className="h-4 w-4 shrink-0 text-[var(--brand-primary)]" />
                                <span>+254 XXX XXX XXX</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--border-color)] pt-8 sm:flex-row">
                    <p className="text-xs text-[var(--text-tertiary)]">
                        &copy; {currentYear} LUCSA — Laikipia University Communication Students&apos; Association. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-xs text-[var(--text-tertiary)] hover:text-[var(--brand-primary)]">Privacy Policy</a>
                        <a href="#" className="text-xs text-[var(--text-tertiary)] hover:text-[var(--brand-primary)]">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
