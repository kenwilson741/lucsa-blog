'use client';
import { useThemeStore } from '@/store/theme';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export function ThemeToggle() {
    const { theme, toggleTheme } = useThemeStore();

    return (
        <button
            onClick={toggleTheme}
            className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[var(--bg-tertiary)]"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 180 : 0, scale: 1 }}
                transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
            >
                {theme === 'light' ? (
                    <Sun className="h-5 w-5 text-[var(--brand-primary)]" />
                ) : (
                    <Moon className="h-5 w-5 text-[var(--brand-primary)]" />
                )}
            </motion.div>
        </button>
    );
}
