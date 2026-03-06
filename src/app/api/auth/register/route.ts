import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { hashPassword } from '@/lib/password';

const registerSchema = z.object({
    fullName: z.string().min(2, 'Full name is required'),
    email: z.string().email('Valid email is required'),
    phone: z.string().min(9, 'Valid phone number is required'),
    regNumber: z.string().min(3, 'Registration number is required'),
    program: z.string().min(1, 'Program is required'),
    yearOfStudy: z.coerce.number().int().min(1).max(4),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = registerSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const { fullName, email, phone, regNumber, program, yearOfStudy, password } = parsed.data;

        // Check for existing user
        const existing = await prisma.user.findFirst({
            where: { OR: [{ email }, { phone }, { regNumber }] },
        });

        if (existing) {
            const field = existing.email === email ? 'email' : existing.phone === phone ? 'phone' : 'registration number';
            return NextResponse.json(
                { error: `A user with this ${field} already exists` },
                { status: 409 }
            );
        }

        const hashedPassword = await hashPassword(password);

        const user = await prisma.user.create({
            data: {
                fullName,
                email,
                phone,
                regNumber,
                program,
                yearOfStudy,
                password: hashedPassword,
            },
            select: { id: true, fullName: true, email: true },
        });

        return NextResponse.json(
            { message: 'Registration successful', user },
            { status: 201 }
        );
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
