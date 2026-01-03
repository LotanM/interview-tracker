import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { InterviewStageType, InterviewStageLocation } from '@prisma/client';

type RouteParams = { params: { id: string } };

export const PATCH = async (req: Request, { params }: RouteParams) => {
  try {
    const { id } = params;
    const body = await req.json();

    const {
      order,
      type,
      location,
      scheduledAt,
      interviewerName,
      preparationNotes,
      reflectionNotes,
      questionsAsked,
      whyItDidntGoWell,
      betterAnswerToday,
      outcome,
      isCompleted,
    } = body;

    if (order !== undefined && typeof order !== 'number') {
      return NextResponse.json(
        { error: { code: 'INVALID_ORDER', message: 'order must be a number' } },
        { status: 400 }
      );
    }

    if (
      type !== undefined &&
      !Object.values(InterviewStageType).includes(type)
    ) {
      return NextResponse.json(
        { error: { code: 'INVALID_TYPE', message: 'Invalid stage type' } },
        { status: 400 }
      );
    }

    if (
      location !== undefined &&
      !Object.values(InterviewStageLocation).includes(location)
    ) {
      return NextResponse.json(
        { error: { code: 'INVALID_LOCATION', message: 'Invalid stage location' } },
        { status: 400 }
      );
    }

    const exists = await prisma.interviewStage.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!exists) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Interview stage not found' } },
        { status: 404 }
      );
    }

    const updated = await prisma.interviewStage.update({
      where: { id },
      data: {
        ...(order !== undefined && { order }),
        ...(type !== undefined && { type }),
        ...(location !== undefined && { location }),
        ...(scheduledAt !== undefined && { scheduledAt }),
        ...(interviewerName !== undefined && { interviewerName }),
        ...(preparationNotes !== undefined && { preparationNotes }),
        ...(reflectionNotes !== undefined && { reflectionNotes }),
        ...(questionsAsked !== undefined && { questionsAsked }),
        ...(whyItDidntGoWell !== undefined && { whyItDidntGoWell }),
        ...(betterAnswerToday !== undefined && { betterAnswerToday }),
        ...(outcome !== undefined && { outcome }),
        ...(isCompleted !== undefined && { isCompleted }),
      },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to update stage' } },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: Request, { params }: RouteParams) => {
    try {
      const { id } = params;
  
      const exists = await prisma.interviewStage.findUnique({
        where: { id },
        select: { id: true },
      });
  
      if (!exists) {
        return NextResponse.json(
          { error: { code: 'NOT_FOUND', message: 'Interview stage not found' } },
          { status: 404 }
        );
      }
  
      await prisma.interviewStage.delete({
        where: { id },
      });
  
      return new NextResponse(null, { status: 204 });
    } catch {
      return NextResponse.json(
        { error: { code: 'INTERNAL_ERROR', message: 'Failed to delete stage' } },
        { status: 500 }
      );
    }
  };
  