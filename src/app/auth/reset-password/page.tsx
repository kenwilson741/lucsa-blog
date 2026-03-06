'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Phone } from 'lucide-react';

export default function ResetPasswordPage() {
    const [step, setStep] = useState<'request' | 'otp' | 'newpass'>('request');
    const [method, setMethod] = useState<'email' | 'phone'>('email');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        // Auto-focus next
        if (value && index < 5) {
            const next = document.getElementById(`otp-${index + 1}`);
            next?.focus();
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center pt-20 pb-12 px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 h-16 w-16 overflow-hidden rounded-full border-2 border-[var(--brand-primary)]">
                        <img src="/images/lucsa-logo.png" alt="LUCSA" className="h-full w-full object-cover" />
                    </div>
                    <h1 className="text-2xl font-extrabold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
                        {step === 'request' ? 'Reset Password' : step === 'otp' ? 'Verify OTP' : 'New Password'}
                    </h1>
                </div>

                <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 sm:p-8 shadow-lg">
                    {step === 'request' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                            <p className="text-sm text-[var(--text-secondary)]">Enter your registered email or phone to receive a verification code.</p>
                            <div className="flex rounded-xl bg-[var(--bg-secondary)] p-1 mb-4">
                                <button onClick={() => setMethod('email')}
                                    className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all ${method === 'email' ? 'bg-[var(--card-bg)] text-[var(--brand-primary)] shadow' : 'text-[var(--text-tertiary)]'
                                        }`}>
                                    <Mail className="h-4 w-4" /> Email
                                </button>
                                <button onClick={() => setMethod('phone')}
                                    className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all ${method === 'phone' ? 'bg-[var(--card-bg)] text-[var(--brand-primary)] shadow' : 'text-[var(--text-tertiary)]'
                                        }`}>
                                    <Phone className="h-4 w-4" /> Phone
                                </button>
                            </div>
                            <input type={method === 'email' ? 'email' : 'tel'}
                                placeholder={method === 'email' ? 'your.email@example.com' : '+254 7XX XXX XXX'}
                                className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20" />
                            <button onClick={() => setStep('otp')}
                                className="w-full rounded-xl py-3 text-sm font-bold text-white"
                                style={{ background: 'var(--hero-gradient)' }}>
                                Send Verification Code
                            </button>
                        </motion.div>
                    )}

                    {step === 'otp' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-center">
                            <p className="text-sm text-[var(--text-secondary)]">Enter the 6-digit code sent to your {method}.</p>
                            <div className="flex justify-center gap-2">
                                {otp.map((digit, i) => (
                                    <input key={i} id={`otp-${i}`} type="text" inputMode="numeric" maxLength={1}
                                        value={digit} onChange={(e) => handleOtpChange(i, e.target.value)}
                                        className="h-12 w-12 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-center text-lg font-bold text-[var(--text-primary)] outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20" />
                                ))}
                            </div>
                            <p className="text-xs text-[var(--text-tertiary)]">Code expires in 5 minutes</p>
                            <button onClick={() => setStep('newpass')}
                                className="w-full rounded-xl py-3 text-sm font-bold text-white"
                                style={{ background: 'var(--hero-gradient)' }}>
                                Verify Code
                            </button>
                            <button className="text-sm text-[var(--brand-primary)] hover:underline">Resend code</button>
                        </motion.div>
                    )}

                    {step === 'newpass' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">New Password</label>
                                <input type="password" placeholder="Min. 8 characters"
                                    className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20" />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">Confirm New Password</label>
                                <input type="password" placeholder="Re-enter new password"
                                    className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20" />
                            </div>
                            <button className="w-full rounded-xl py-3 text-sm font-bold text-white"
                                style={{ background: 'var(--hero-gradient)' }}>
                                Reset Password
                            </button>
                        </motion.div>
                    )}
                </div>

                <p className="mt-6 text-center">
                    <Link href="/auth/login" className="inline-flex items-center gap-1 text-sm text-[var(--brand-primary)] hover:underline">
                        <ArrowLeft className="h-4 w-4" /> Back to Login
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
