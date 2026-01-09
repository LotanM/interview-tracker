import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { updateCompanySchema } from "@/lib/validation/company.schema";
import {
  errorResponse,
  zodErrorResponse,
} from "@/lib/validation/error-response";

type RouteParams = { params: Promise<{ id: string }> };

export const GET = async (req: Request, { params }: RouteParams) => {
  try {
    const { id } = await params;
    const company = await prisma.company.findUnique({
      where: { id },
    });
    
    if (!company) {
      return errorResponse("NOT_FOUND", "Company not found", 404);
    }
    return NextResponse.json(company);
  } catch {
    return errorResponse("NOT_FOUND", "Company not found", 404);
  }
};

export const PATCH = async (req: Request, { params }: RouteParams) => {
  try {
    const { id } = await params;
    const data = updateCompanySchema.parse(await req.json());
    const updated = await prisma.company.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (err) {
    if (err instanceof Error && err.name === "ZodError") {
      return zodErrorResponse(err as any);
    }

    return errorResponse("NOT_FOUND", "Company not found", 404);
  }
};

export const DELETE = async (_req: Request, { params }: RouteParams) => {
  try {
    const { id } = await params;
    await prisma.company.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch {
    return errorResponse("NOT_FOUND", "Company not found", 404);
  }
};
