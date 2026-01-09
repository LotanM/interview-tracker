import { z } from 'zod';
import { InterviewStageType, InterviewStageLocation } from '@prisma/client';

export const createInterviewStageSchema = z.object({
  applicationId: z.uuid(),
  order: z.number().int().min(1),
  type: z.enum(InterviewStageType),
  location: z.enum(InterviewStageLocation).optional(),
  scheduledAt: z.coerce.date().optional(),
  interviewerName: z.string().optional(),
  preparationNotes: z.string().optional(),
  reflectionNotes: z.string().optional(),
  questionsAsked: z.string().optional(),
  whyItDidntGoWell: z.string().optional(),
  betterAnswerToday: z.string().optional(),
  outcome: z.string().optional(),
  isCompleted: z.boolean().optional(),
});

export const updateInterviewStageSchema = z.object({
  order: z.number().int().min(1).optional(),
  type: z.enum(InterviewStageType).optional(),
  location: z.enum(InterviewStageLocation).optional(),
  scheduledAt: z.coerce.date().nullable().optional(),
  interviewerName: z.string().nullable().optional(),
  preparationNotes: z.string().nullable().optional(),
  reflectionNotes: z.string().nullable().optional(),
  questionsAsked: z.string().nullable().optional(),
  whyItDidntGoWell: z.string().nullable().optional(),
  betterAnswerToday: z.string().nullable().optional(),
  outcome: z.string().nullable().optional(),
  isCompleted: z.boolean().optional(),
});
