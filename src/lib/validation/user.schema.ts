import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.email('Email must be a valid email address'),
});

export const updateUserSchema = z.object({
  email: z.email('Email must be a valid email address').optional(),
});

