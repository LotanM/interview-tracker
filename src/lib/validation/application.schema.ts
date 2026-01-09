import { z } from "zod";
import { ApplicationStatus } from "@prisma/client";
import { createInterviewStageSchema } from "./interview-stage.schema";

export const createApplicationSchema = z.object({
  companyId: z.uuid(),
  role: z.string().min(1),
  status: z.enum(ApplicationStatus).optional(),
  sourceUrl: z.string().nullable().optional(),
  pitch: z.string().nullable().optional(),
  desireLevel: z.number().int().min(0).max(5),
});

export const updateApplicationSchema = z.object({
  role: z.string().min(1).optional(),
  status: z.enum(ApplicationStatus).optional(),
  sourceUrl: z.string().nullable().optional(),
  pitch: z.string().nullable().optional(),
  desireLevel: z.number().int().min(0).max(5),
  stages: z.array(createInterviewStageSchema),
});
