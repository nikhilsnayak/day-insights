import { z } from 'zod';

const SourceFormDataSchema = z.object({
  type: z.enum(['youtube']),
  value: z.string().min(1, {
    message: 'Required',
  }),
});

export const InsightFormDataSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  sources: z.array(SourceFormDataSchema).min(1, {
    message: 'Minimum one source is required',
  }),
});

export type InsightFormData = z.infer<typeof InsightFormDataSchema>;
