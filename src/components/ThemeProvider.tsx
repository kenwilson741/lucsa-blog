'use client';
import { useEffect } from 'react';
import { useThemeStore } from '@/store/theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const setTheme = useThemeStore((s) => s.setTheme);

    useEffect(() => {
        const stored = localStorage.getItem('lucsa-theme') as 'light' | 'dark' | null;
        if (stored) {
            setTheme(stored);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        }
    }, [setTheme]);

    return <>{children}</>;
}
