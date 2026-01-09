import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { updateUserSchema } from "@/lib/validation/user.schema";
import {
  errorResponse,
  zodErrorResponse,
} from "@/lib/validation/error-response";

type RouteParams = { params: Promise<{ id: string }> };

export const GET = async (req: Request, { params }: RouteParams) => {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        companies: {
          select: {
            id: true,
            name: true,
            website: true,
          },
        },
      },
    });

    if (!user) {
      return errorResponse("NOT_FOUND", "User not found", 404);
    }

    return NextResponse.json(user);
  } catch {
    return errorResponse("INTERNAL_ERROR", "Failed to fetch user", 500);
  }
};

export const PATCH = async (req: Request, { params }: RouteParams) => {
  try {
    const { id } = await params;
    const body = await req.json();
    const data = updateUserSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return errorResponse("NOT_FOUND", "User not found", 404);
    }

    if (data.email && data.email !== existingUser.email) {
      const emailTaken = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (emailTaken) {
        return errorResponse("DUPLICATE_EMAIL", "Email already exists", 409);
      }
    }

    const updated = await prisma.user.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (err) {
    if (err instanceof Error && err.name === "ZodError") {
      return zodErrorResponse(err as any);
    }

    return errorResponse("INTERNAL_ERROR", "Failed to update user", 500);
  }
};

export const DELETE = async (req: Request, { params }: RouteParams) => {
  try {
    const { id } = await params;
    await prisma.user.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch {
    return errorResponse("NOT_FOUND", "User not found", 404);
  }
};
