import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createCompanySchema } from "@/lib/validation/company.schema";
import { errorResponse, zodErrorResponse } from "@/lib/validation/error-response";

export const GET = async (req: Request) => {
  const companies = await prisma.company.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(companies);
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { userId, ...companyData } = createCompanySchema.parse(body);

    const company = await prisma.company.create({
      data: {
        ...companyData,
        user: { connect: { id: userId } },
      },
    });


    return NextResponse.json(company, { status: 201 });
  } catch (err) {
    if (err instanceof Error && err.name === 'ZodError') {
      return zodErrorResponse(err as any);
    }

  return errorResponse(
    'INTERNAL_ERROR',
    'Failed to create company',
    500
  );
}
};