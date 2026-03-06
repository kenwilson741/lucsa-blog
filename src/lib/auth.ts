import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from '@/lib/db';
import { verifyPassword } from '@/lib/password';

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: { strategy: 'jwt' },
    pages: {
        signIn: '/auth/login',
    },
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                identifier: { label: 'Email or Phone', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const { identifier, password } = credentials as {
                    identifier: string;
                    password: string;
                };

                if (!identifier || !password) return null;

                // Try to find user by email or phone
                const user = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { email: identifier },
                            { phone: identifier },
                        ],
                    },
                });

                if (!user) return null;

                const isValid = await verifyPassword(password, user.password);
                if (!isValid) return null;

                return {
                    id: user.id,
                    name: user.fullName,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as { role?: string }).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                (session.user as { role?: string }).role = token.role as string;
            }
            return session;
        },
    },
});
