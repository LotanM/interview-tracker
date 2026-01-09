import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createInterviewStageSchema } from "@/lib/validation/interview-stage.schema";
import {
  errorResponse,
  zodErrorResponse,
} from "@/lib/validation/error-response";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const data = createInterviewStageSchema.parse(body);

    const app = await prisma.application.findUnique({
      where: { id: data.applicationId },
      select: { id: true },
    });

    if (!app) {
      return errorResponse("NOT_FOUND", "Application not found", 404);
    }

    const stage = await prisma.interviewStage.create({
      data: {
        applicationId: data.applicationId,
        order: data.order,
        type: data.type,
        location: data.location,
        scheduledAt: data.scheduledAt,
        interviewerName: data.interviewerName,
        preparationNotes: data.preparationNotes,
        reflectionNotes: data.reflectionNotes,
        questionsAsked: data.questionsAsked,
        whyItDidntGoWell: data.whyItDidntGoWell,
        betterAnswerToday: data.betterAnswerToday,
        outcome: data.outcome,
        isCompleted: data.isCompleted ?? false,
      },
    });
    return NextResponse.json(stage, { status: 201 });
  } catch (err) {
    if ((err as any)?.name === "ZodError") return zodErrorResponse(err as any);
    return errorResponse("INTERNAL_ERROR", "Failed to create stage", 500);
  }
};
