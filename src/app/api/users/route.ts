import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createUserSchema } from "@/lib/validation/user.schema";
import { errorResponse, zodErrorResponse } from "@/lib/validation/error-response";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const users = await prisma.user.findMany({
      where: email ? { email } : undefined,
      orderBy: { createdAt: 'desc' },
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

    return NextResponse.json(users);
  } catch {
    return errorResponse(
      'INTERNAL_ERROR',
      'Failed to fetch users',
      500
    );
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const userData = createUserSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      return errorResponse(
        'DUPLICATE_EMAIL',
        'User already exists',
        409
      );
    }

    const user = await prisma.user.create({
      data: userData,
    });

    return NextResponse.json(user, { status: 201 });
  } catch (err) {
    if (err instanceof Error && err.name === 'ZodError') {
      return zodErrorResponse(err as any);
    }

    return errorResponse(
      'INTERNAL_ERROR',
      'Failed to create user',
      500
    );
  }
};

