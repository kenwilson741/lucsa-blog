import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'You must be logged in to RSVP' }, { status: 401 });
        }

        const { id: eventId } = await params;

        // Check event exists and has spots
        const event = await prisma.event.findUnique({ where: { id: eventId } });
        if (!event) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        // Check if already RSVP'd
        const existingRsvp = await prisma.eventRSVP.findUnique({
            where: { userId_eventId: { userId: session.user.id, eventId } },
        });

        if (existingRsvp) {
            // Un-RSVP
            await prisma.eventRSVP.delete({ where: { id: existingRsvp.id } });
            return NextResponse.json({ message: 'RSVP cancelled', rsvpd: false });
        }

        // Check available spots
        const rsvpCount = await prisma.eventRSVP.count({ where: { eventId } });
        if (rsvpCount >= event.spots) {
            return NextResponse.json({ error: 'No spots available' }, { status: 400 });
        }

        // Create RSVP
        await prisma.eventRSVP.create({
            data: { userId: session.user.id, eventId },
        });

        return NextResponse.json({ message: 'RSVP confirmed!', rsvpd: true }, { status: 201 });
    } catch (error) {
        console.error('RSVP error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
