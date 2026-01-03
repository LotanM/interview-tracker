import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type RouteParams = { params: Promise<{ id: string }> };

export const GET = async (req: Request, { params }: RouteParams) => {
  const { id } = await params;
  const company = await prisma.company.findUnique({ where: { id } });
  
  if (!company) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(company);
}

export const PATCH = async (req: Request, { params }: RouteParams) => {
  const { id } = await params;
  const body = await req.json();
  
  const updated = await prisma.company.update({
    where: { id },
    data: body,
  });
  return NextResponse.json(updated);
}

export const DELETE = async (req: Request, { params }: RouteParams) => {
  const { id } = await params;
  await prisma.company.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}