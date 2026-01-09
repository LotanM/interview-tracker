import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { updateApplicationSchema } from "@/lib/validation/application.schema";
import {
  errorResponse,
  zodErrorResponse,
} from "@/lib/validation/error-response";

type RouteParams = { params: Promise<{ id: string }> };

export const GET = async (req: Request, { params }: RouteParams) => {
  try {
    const { id } = await params;
    const application = await prisma.application.findUnique({ where: { id } });

    if (!application) {
      return errorResponse("NOT_FOUND", "Application not found", 404);
    }
    return NextResponse.json(application);
  } catch (error) {
    return errorResponse("NOT_FOUND", "Application not found", 404);
  }
};

export const PATCH = async (req: Request, { params }: RouteParams) => {
  try {
    const { id } = await params;
    const body = await req.json();
    const data = updateApplicationSchema.parse(body);

    const updated = await prisma.application.update({
      where: { id },
      data: {
        ...(data.role !== undefined && { role: data.role.trim() }),
        ...(data.status !== undefined && { status: data.status }),
        ...(data.sourceUrl !== undefined && { sourceUrl: data.sourceUrl }),
        ...(data.pitch !== undefined && { pitch: data.pitch }),
        ...(data.desireLevel !== undefined && {
          desireLevel: data.desireLevel,
        }),
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    if ((err as any)?.name === "ZodError") return zodErrorResponse(err as any);
    return errorResponse("NOT_FOUND", "Application not found", 404);
  }
};

export const DELETE = async (req: Request, { params }: RouteParams) => {
  try {
    const { id } = await params;
    await prisma.application.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return errorResponse("NOT_FOUND", "Application stage not found", 404);
  }
};
