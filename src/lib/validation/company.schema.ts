import { z } from 'zod';

export const createCompanySchema = z.object({
  userId: z.uuid('User ID must be a valid UUID'),
  name: z.string().min(1, 'Company name is required'),
  website: z.url('Website must be a valid URL').optional(),
});

export const updateCompanySchema = z.object({
  name: z.string().min(1).optional(),
  website: z.url().nullable().optional(),
});
