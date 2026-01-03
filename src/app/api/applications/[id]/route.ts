import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApplicationStatus, ApplicationDesireLevel } from '@prisma/client';

type RouteParams = { params: { id: string } };

export const GET = async (req: Request, { params }: RouteParams) => {
  try {
    const { id } = params;

    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            website: true,
          },
        },
        stages: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!application) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Application not found' } },
        { status: 404 }
      );
    }

    return NextResponse.json(application);
  } catch {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch application' } },
      { status: 500 }
    );
  }
};



export const PATCH = async (req: Request, { params }: RouteParams) => {
  try {
    const { id } = params;
    const body = await req.json();

    const {
      role,
      status,
      pitch,
      desireLevel,
    } = body;

    // Validation (minimal)
    if (role !== undefined && (typeof role !== 'string' || !role.trim())) {
      return NextResponse.json(
        { error: { code: 'INVALID_ROLE', message: 'Invalid role' } },
        { status: 400 }
      );
    }

    if (
      status !== undefined &&
      !Object.values(ApplicationStatus).includes(status)
    ) {
      return NextResponse.json(
        { error: { code: 'INVALID_STATUS', message: 'Invalid status' } },
        { status: 400 }
      );
    }

    if (
      desireLevel !== undefined &&
      !Object.values(ApplicationDesireLevel).includes(desireLevel)
    ) {
      return NextResponse.json(
        { error: { code: 'INVALID_DESIRE_LEVEL', message: 'Invalid desire level' } },
        { status: 400 }
      );
    }

    const exists = await prisma.application.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!exists) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Application not found' } },
        { status: 404 }
      );
    }

    // Update (allowlist)
    const updated = await prisma.application.update({
      where: { id },
      data: {
        ...(role !== undefined && { role: role.trim() }),
        ...(status !== undefined && { status }),
        ...(pitch !== undefined && { pitch }),
        ...(desireLevel !== undefined && { desireLevel }),
      },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to update application' } },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: Request, { params }: RouteParams) => {
  try {
    const { id } = params;

    const exists = await prisma.application.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!exists) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Application not found' } },
        { status: 404 }
      );
    }

    await prisma.application.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to delete application' } },
      { status: 500 }
    );
  }
};