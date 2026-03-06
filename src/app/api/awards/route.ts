import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');

        const where: Record<string, unknown> = {};
        if (category && category !== 'All') {
            where.category = category;
        }

        const awards = await prisma.award.findMany({ where });

        return NextResponse.json(awards);
    } catch (error) {
        console.error('Awards fetch error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
