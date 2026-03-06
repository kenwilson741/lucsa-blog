'use client';
import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Phone, Loader2 } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                identifier,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('Invalid email/phone or password');
            } else {
                router.push('/');
                router.refresh();
            }
        } catch {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center pt-20 pb-12 px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
                {/* Logo */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 h-16 w-16 overflow-hidden rounded-full border-2 border-[var(--brand-primary)]">
                        <img src="/images/lucsa-logo.png" alt="LUCSA" className="h-full w-full object-cover" />
                    </div>
                    <h1 className="text-2xl font-extrabold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
                        Welcome Back
                    </h1>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">Sign in to your LUCSA account</p>
                </div>

                <form onSubmit={handleLogin} className="rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 sm:p-8 shadow-lg">
                    {/* Login method toggle */}
                    <div className="mb-6 flex rounded-xl bg-[var(--bg-secondary)] p-1">
                        <button type="button" onClick={() => setLoginMethod('email')}
                            className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all ${loginMethod === 'email' ? 'bg-[var(--card-bg)] text-[var(--brand-primary)] shadow' : 'text-[var(--text-tertiary)]'
                                }`}>
                            <Mail className="h-4 w-4" /> Email
                        </button>
                        <button type="button" onClick={() => setLoginMethod('phone')}
                            className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all ${loginMethod === 'phone' ? 'bg-[var(--card-bg)] text-[var(--brand-primary)] shadow' : 'text-[var(--text-tertiary)]'
                                }`}>
                            <Phone className="h-4 w-4" /> Phone
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        {loginMethod === 'email' ? (
                            <div>
                                <label className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">Email Address</label>
                                <input type="email" placeholder="your.email@example.com"
                                    value={identifier} onChange={(e) => setIdentifier(e.target.value)}
                                    className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] transition-all outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20" />
                            </div>
                        ) : (
                            <div>
                                <label className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">Phone Number</label>
                                <div className="flex">
                                    <span className="flex items-center rounded-l-xl border border-r-0 border-[var(--border-color)] bg-[var(--bg-secondary)] px-3 text-sm text-[var(--text-tertiary)]">
                                        +254
                                    </span>
                                    <input type="tel" placeholder="7XX XXX XXX"
                                        value={identifier} onChange={(e) => setIdentifier(e.target.value)}
                                        className="w-full rounded-r-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] transition-all outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20" />
                                </div>
                            </div>
                        )}

                        <div>
                            <div className="mb-1 flex items-center justify-between">
                                <label className="text-sm font-medium text-[var(--text-secondary)]">Password</label>
                                <Link href="/auth/reset-password" className="text-xs text-[var(--brand-primary)] hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <input type={showPassword ? 'text' : 'password'} placeholder="Enter your password"
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 pr-10 text-sm text-[var(--text-primary)] transition-all outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20" />
                                <button onClick={() => setShowPassword(!showPassword)} type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]">
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" disabled={loading}
                            className="w-full rounded-xl py-3 text-sm font-bold text-white transition-all hover:shadow-lg hover:shadow-[var(--brand-primary)]/25 disabled:opacity-50 flex items-center justify-center gap-2"
                            style={{ background: 'var(--hero-gradient)' }}>
                            {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in...</> : 'Sign In'}
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
                    Not a member yet? <Link href="/auth/register" className="font-semibold text-[var(--brand-primary)] hover:underline">Register — KES 100</Link>
                </p>
            </motion.div>
        </div>
    );
}
