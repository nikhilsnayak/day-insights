'use server';

import { revalidatePath } from 'next/cache';
import { getLoggedInUser } from '@/auth';
import { eq } from 'drizzle-orm';

import { db } from '../db';
import { dashboards } from '../db/schema';
import { getDashboard } from '../queries/dashboard';
import { ConfigureDashboardFormDataSchema } from '../validators/dashboard';

export async function updateDashboard(input: unknown) {
  const { id: userId } = await getLoggedInUser();

  if (!userId) {
    return { success: false, message: 'Unauthorized' };
  }

  const result = ConfigureDashboardFormDataSchema.safeParse(input);

  if (!result.success) {
    return { success: false, message: 'Validation failed' };
  }

  const { data } = result;

  try {
    const existingDashboard = await getDashboard();

    if (!existingDashboard) {
      return { success: false, message: "Dashboard doesn't exist" };
    }

    await db
      .update(dashboards)
      .set(data)
      .where(eq(dashboards.id, existingDashboard.id));
  } catch (error) {
    console.error({ error });
    return { success: false, message: 'Server Error' };
  }

  revalidatePath('/dashboard');

  return { success: true, message: 'Successfully Updated Dashboard' };
}
