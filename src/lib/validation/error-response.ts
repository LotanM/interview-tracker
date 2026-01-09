import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const errorResponse = (
  code: string,
  message: string,
  status = 400,
  details?: unknown
) => NextResponse.json({ error: { code, message, details } }, { status });

export const zodErrorResponse = (err: ZodError) =>
  errorResponse("INVALID_INPUT", "Invalid request payload", 400, err.flatten());
