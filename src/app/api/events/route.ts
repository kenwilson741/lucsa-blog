import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');
        const search = searchParams.get('search');

        const where: Record<string, unknown> = {};
        if (category && category !== 'All') {
            where.category = category;
        }
        if (search) {
            where.OR = [
                { title: { contains: search } },
                { description: { contains: search } },
            ];
        }

        const events = await prisma.event.findMany({
            where,
            orderBy: { date: 'asc' },
        });

        return NextResponse.json(events);
    } catch (error) {
        console.error('Events fetch error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
