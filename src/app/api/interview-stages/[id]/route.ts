import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { updateInterviewStageSchema } from "@/lib/validation/interview-stage.schema";
import {
  errorResponse,
  zodErrorResponse,
} from "@/lib/validation/error-response";

type RouteParams = { params: Promise<{ id: string }> };

export const GET = async (req: Request, { params }: RouteParams) => {
  try {
    const { id } = await params;
    const interviewStage = await prisma.interviewStage.findUnique({
      where: { id },
    });

    if (!interviewStage) {
      return errorResponse("NOT_FOUND", "Interview stage not found", 404);
    }

    return NextResponse.json(interviewStage);
  } catch (err) {
    return errorResponse("NOT_FOUND", "Interview stage not found", 404);
  }
};

export const PATCH = async (req: Request, { params }: RouteParams) => {
  try {
    const { id } = await params;
    const body = await req.json();
    const data = updateInterviewStageSchema.parse(body);

    const updated = await prisma.interviewStage.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (err) {
    if ((err as any)?.name === "ZodError") return zodErrorResponse(err as any);
    return errorResponse("NOT_FOUND", "Interview stage not found", 404);
  }
};

export const DELETE = async (req: Request, { params }: RouteParams) => {
  try {
    const { id } = await params;
    await prisma.interviewStage.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch {
    return errorResponse("NOT_FOUND", "Interview stage not found", 404);
  }
};
