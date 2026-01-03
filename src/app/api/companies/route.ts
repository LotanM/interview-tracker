import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  const companies = await prisma.company.findMany({
    where: userId ? { user: { id: userId } } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(companies);
};

export const POST = async (req: Request) => {
  const { name, website, userId } = await req.json();
  
  if (!name) {
    return NextResponse.json(
      { error: "Company name is required" },
      { status: 400 }
    );
  }

  if (!userId) {
    return NextResponse.json(
      { error: "User ID is required" },
      { status: 400 }
    );
  }

  const company = await prisma.company.create({
    data: { 
      name, 
      website, 
      user: { connect: { id: userId } }
    },
  });

  return NextResponse.json(company, { status: 201 });
};
