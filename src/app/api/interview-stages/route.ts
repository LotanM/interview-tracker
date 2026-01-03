import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { InterviewStageType, InterviewStageLocation } from '@prisma/client';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const {
      applicationId,
      type,
      order,
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

    if (!applicationId || typeof order !== 'number') {
      return NextResponse.json(
        { error: { code: 'INVALID_INPUT', message: 'applicationId and order are required' } },
        { status: 400 }
      );
    }

    if (!Object.values(InterviewStageType).includes(type)) {
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
        { error: { code: 'INVALID_LOCATION', message: 'Invalid location' } },
        { status: 400 }
      );
    }

    const app = await prisma.application.findUnique({
      where: { id: applicationId },
      select: { id: true },
    });

    if (!app) {
      return NextResponse.json(
        { error: { code: 'APPLICATION_NOT_FOUND', message: 'Application not found' } },
        { status: 404 }
      );
    }

    const stage = await prisma.interviewStage.create({
      data: {
        applicationId,
        type,
        order,
        location,
        scheduledAt,
        interviewerName,
        preparationNotes,
        reflectionNotes,
        questionsAsked,
        whyItDidntGoWell,
        betterAnswerToday,
        outcome,
        isCompleted: isCompleted ?? false,
      },
    });

    return NextResponse.json(stage, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to create stage' } },
      { status: 500 }
    );
  }
};
