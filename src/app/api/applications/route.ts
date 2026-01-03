import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApplicationStatus, ApplicationDesireLevel } from '@prisma/client';


export const GET = async () => {
    try {
      const applications = await prisma.application.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          company: {
            select: {
              id: true,
              name: true,
              website: true,
            },
          },
          stages: {
            select: {
              scheduledAt: true,
            },
          },
        },
      });
  
      const now = new Date();
      const result = applications.map(app => {
        const nextStageDate = app.stages
          .reduce<Date | null>((min, stage) => {
            const scheduledAt = stage.scheduledAt;
            if (!scheduledAt || scheduledAt <= now) return min;
            return !min || scheduledAt < min ? scheduledAt : min;
          }, null);
  
        return {
          id: app.id,
          role: app.role,
          status: app.status,
          desireLevel: app.desireLevel,
          createdAt: app.createdAt,
          company: app.company,
          stagesCount: app.stages.length,
          nextStageDate
        };
      });
  
      return NextResponse.json(result);
    } catch {
      return NextResponse.json(
        { error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch applications' } },
        { status: 500 }
      );
    }
  };
  

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    
    const {
      companyId,
      role,
      status,
      pitch,
      desireLevel,
    } = body;

    if (!companyId || !role || typeof role !== 'string' || !role.trim()) {
      return NextResponse.json(
        { error: { code: 'INVALID_INPUT', message: 'companyId and role are required' } },
        { status: 400 }
      );
    }

    if (
      status &&
      !Object.values(ApplicationStatus).includes(status)
    ) {
      return NextResponse.json(
        { error: { code: 'INVALID_STATUS', message: 'Invalid application status' } },
        { status: 400 }
      );
    }

    if (
      desireLevel &&
      !Object.values(ApplicationDesireLevel).includes(desireLevel)
    ) {
      return NextResponse.json(
        { error: { code: 'INVALID_DESIRE_LEVEL', message: 'Invalid desire level' } },
        { status: 400 }
      );
    }

    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      return NextResponse.json(
        { error: { code: 'COMPANY_NOT_FOUND', message: 'Company not found' } },
        { status: 404 }
      );
    }

    const application = await prisma.application.create({
      data: {
        companyId,
        role: role.trim(),
        status: status ?? ApplicationStatus.DRAFT,
        pitch,
        desireLevel,
      },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' } },
      { status: 500 }
    );
  }
};



