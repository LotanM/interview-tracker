import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createApplicationSchema } from "@/lib/validation/application.schema";
import {
  errorResponse,
  zodErrorResponse,
} from "@/lib/validation/error-response";

export const GET = async () => {
  try {
    const applications = await prisma.application.findMany({
      orderBy: { createdAt: "desc" },
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
    const result = applications.map((app) => {
      const nextStageDate = app.stages.reduce<Date | null>((min, stage) => {
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
        nextStageDate,
      };
    });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      {
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to fetch applications",
        },
      },
      { status: 500 }
    );
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const data = createApplicationSchema.parse(body);

    const company = await prisma.company.findUnique({
      where: { id: data.companyId },
      select: { id: true },
    });
    if (!company) {
      return errorResponse("NOT_FOUND", "Company not found", 404);
    }

    const app = await prisma.application.create({
      data: {
        companyId: data.companyId,
        role: data.role.trim(),
        status: data.status,
        pitch: data.pitch,
        desireLevel: data.desireLevel,
      },
    });

    return NextResponse.json(app, { status: 201 });
  } catch (err) {
    if ((err as any)?.name === "ZodError") return zodErrorResponse(err as any);
    return errorResponse("INTERNAL_ERROR", "Failed to create application", 500);
  }
};
