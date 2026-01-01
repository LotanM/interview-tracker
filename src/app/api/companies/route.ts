export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();
  const { name, website } = body;

  if (!name) {
    return NextResponse.json(
      { error: 'Company name is required' },
      { status: 400 }
    );
  }

  const company = await prisma.company.create({
    data: {
      name,
      website,
    },
  });

  return NextResponse.json(company, { status: 201 });
}
