import { z } from 'zod';

export const ConfigureDashboardFormDataSchema = z.object({
  createInsight: z.boolean({
    message: 'Required',
  }),
  viewInsights: z.boolean({
    message: 'Required',
  }),
  viewProfile: z.boolean({
    message: 'Required',
  }),
});

export type ConfigureDashboardFormData = z.infer<
  typeof ConfigureDashboardFormDataSchema
>;
