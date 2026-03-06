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

        const images = await prisma.galleryImage.findMany({ where });

        return NextResponse.json(images);
    } catch (error) {
        console.error('Gallery fetch error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
