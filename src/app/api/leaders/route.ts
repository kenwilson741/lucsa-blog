import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const leaders = await prisma.leader.findMany({
            orderBy: { sortOrder: 'asc' },
        });

        // Parse badges JSON string to array
        const parsed = leaders.map((l: { badges: string;[key: string]: unknown }) => ({
            ...l,
            badges: JSON.parse(l.badges) as string[],
        }));

        return NextResponse.json(parsed);
    } catch (error) {
        console.error('Leaders fetch error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
