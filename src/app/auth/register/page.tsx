'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, CheckCircle2, GraduationCap, Phone as PhoneIcon, Loader2 } from 'lucide-react';

const programs = [
    'Bachelor of Arts in Communication and Media',
    'English and Communication',
    'Kiswahili and Communication',
];

function PasswordStrength({ password }: { password: string }) {
    const checks = [
        password.length >= 8,
        /[A-Z]/.test(password),
        /[0-9]/.test(password),
        /[^A-Za-z0-9]/.test(password),
    ];
    const strength = checks.filter(Boolean).length;
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
    const labels = ['Weak', 'Fair', 'Good', 'Strong'];

    if (!password) return null;

    return (
        <div className="mt-2">
            <div className="flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                    <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i < strength ? colors[strength - 1] : 'bg-[var(--bg-tertiary)]'}`} />
                ))}
            </div>
            <p className={`mt-1 text-xs ${strength <= 1 ? 'text-red-500' : strength <= 2 ? 'text-yellow-600' : 'text-green-600'}`}>
                {labels[strength - 1] || 'Too weak'}
            </p>
        </div>
    );
}

export default function RegisterPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [form, setForm] = useState({
        fullName: '', email: '', phone: '', regNumber: '', program: '', yearOfStudy: '',
        password: '', confirmPassword: '', agreeTerms: false,
    });

    const updateForm = (key: string, value: string | boolean) => setForm((f) => ({ ...f, [key]: value }));

    const handleRegister = async () => {
        setError('');

        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (!form.agreeTerms) {
            setError('You must agree to the LUCSA Constitution');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: form.fullName,
                    email: form.email,
                    phone: form.phone,
                    regNumber: form.regNumber,
                    program: form.program,
                    yearOfStudy: form.yearOfStudy,
                    password: form.password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Registration failed');
                return;
            }

            setSuccess(true);
            setTimeout(() => router.push('/auth/login'), 2000);
        } catch {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex min-h-screen items-center justify-center pt-20 pb-12 px-4">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
                        <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                    <h2 className="mb-2 text-2xl font-bold text-[var(--text-primary)]">Registration Successful!</h2>
                    <p className="text-[var(--text-secondary)]">Redirecting to login...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center pt-20 pb-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                {/* Logo */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 h-16 w-16 overflow-hidden rounded-full border-2 border-[var(--brand-primary)]">
                        <img src="/images/lucsa-logo.png" alt="LUCSA" className="h-full w-full object-cover" />
                    </div>
                    <h1 className="text-2xl font-extrabold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
                        Join LUCSA
                    </h1>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                        Registration fee: <span className="font-semibold text-[var(--brand-primary)]">KES 100</span>
                    </p>
                </div>

                {/* Steps indicator */}
                <div className="mb-8 flex items-center justify-center gap-2">
                    {[1, 2].map((s) => (
                        <div key={s} className="flex items-center gap-2">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${step >= s ? 'bg-[var(--brand-primary)] text-white' : 'bg-[var(--bg-tertiary)] text-[var(--text-tertiary)]'
                                }`}>
                                {step > s ? <CheckCircle2 className="h-4 w-4" /> : s}
                            </div>
                            {s < 2 && <div className={`h-0.5 w-8 rounded-full transition-colors ${step > s ? 'bg-[var(--brand-primary)]' : 'bg-[var(--bg-tertiary)]'}`} />}
                        </div>
                    ))}
                </div>

                <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 sm:p-8 shadow-lg">
                    {error && (
                        <div className="mb-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {step === 1 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                            <h2 className="mb-4 text-lg font-bold text-[var(--text-primary)]">Personal Information</h2>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">Full Name *</label>
                                <input type="text" value={form.fullName} onChange={(e) => updateForm('fullName', e.target.value)}
                                    placeholder="e.g. Wilson Kenagwa"
                                    className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] transition-all outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20" />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">Email Address *</label>
                                <input type="email" value={form.email} onChange={(e) => updateForm('email', e.target.value)}
                                    placeholder="your.email@example.com"
                                    className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] transition-all outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20" />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">Phone Number *</label>
                                <div className="flex">
                                    <span className="flex items-center gap-1 rounded-l-xl border border-r-0 border-[var(--border-color)] bg-[var(--bg-secondary)] px-3 text-sm text-[var(--text-tertiary)]">
                                        <PhoneIcon className="h-3.5 w-3.5" /> +254
                                    </span>
                                    <input type="tel" value={form.phone} onChange={(e) => updateForm('phone', e.target.value)}
                                        placeholder="7XX XXX XXX"
                                        className="w-full rounded-r-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] transition-all outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20" />
                                </div>
                            </div>

                            <button onClick={() => setStep(2)}
                                className="w-full rounded-xl py-3 text-sm font-bold text-white transition-all hover:shadow-lg hover:shadow-[var(--brand-primary)]/25"
                                style={{ background: 'var(--hero-gradient)' }}>
                                Continue
                            </button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                            <h2 className="mb-4 text-lg font-bold text-[var(--text-primary)]">Academic Details & Password</h2>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">Registration Number *</label>
                                <input type="text" value={form.regNumber} onChange={(e) => updateForm('regNumber', e.target.value)}
                                    placeholder="e.g. LU/COM/001/23"
                                    className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] transition-all outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20" />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">Program *</label>
                                <select value={form.program} onChange={(e) => updateForm('program', e.target.value)}
                                    className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] transition-all outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20">
                                    <option value="">Select your program</option>
                                    {programs.map((p) => <option key={p} value={p}>{p}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">Year of Study *</label>
                                <select value={form.yearOfStudy} onChange={(e) => updateForm('yearOfStudy', e.target.value)}
                                    className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] transition-all outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20">
                                    <option value="">Select year</option>
                                    {[1, 2, 3, 4].map((y) => <option key={y} value={y}>Year {y}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">Password *</label>
                                <div className="relative">
                                    <input type={showPassword ? 'text' : 'password'} value={form.password}
                                        onChange={(e) => updateForm('password', e.target.value)}
                                        placeholder="Min. 8 characters"
                                        className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 pr-10 text-sm text-[var(--text-primary)] transition-all outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20" />
                                    <button onClick={() => setShowPassword(!showPassword)} type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]">
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                <PasswordStrength password={form.password} />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">Confirm Password *</label>
                                <input type="password" value={form.confirmPassword}
                                    onChange={(e) => updateForm('confirmPassword', e.target.value)}
                                    placeholder="Re-enter your password"
                                    className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] transition-all outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20" />
                            </div>

                            <label className="flex items-start gap-2">
                                <input type="checkbox" checked={form.agreeTerms}
                                    onChange={(e) => updateForm('agreeTerms', e.target.checked)}
                                    className="mt-1 h-4 w-4 rounded border-[var(--border-color)] text-[var(--brand-primary)]" />
                                <span className="text-xs text-[var(--text-secondary)]">
                                    I agree to the <Link href="#" className="text-[var(--brand-primary)] hover:underline">LUCSA Constitution</Link> and terms of membership.
                                </span>
                            </label>

                            <div className="flex gap-3">
                                <button onClick={() => setStep(1)}
                                    className="flex-1 rounded-xl border border-[var(--border-color)] py-3 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]">
                                    Back
                                </button>
                                <button onClick={handleRegister} disabled={loading}
                                    className="flex-1 rounded-xl py-3 text-sm font-bold text-white transition-all hover:shadow-lg hover:shadow-[var(--brand-primary)]/25 disabled:opacity-50 flex items-center justify-center gap-2"
                                    style={{ background: 'var(--hero-gradient)' }}>
                                    {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Registering...</> : 'Register'}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>

                <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
                    Already a member? <Link href="/auth/login" className="font-semibold text-[var(--brand-primary)] hover:underline">Login here</Link>
                </p>
            </motion.div>
        </div>
    );
}
