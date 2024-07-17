import { redirect } from 'next/navigation';
import { getLoggedInUser } from '@/auth';

import { db } from '../db';

export async function getDashboard() {
  const { id: userId } = await getLoggedInUser();

  if (!userId) {
    redirect('/api/login');
  }

  return db.query.dashboards.findFirst({
    where: (dashboards, { eq }) => eq(dashboards.userId, userId),
  });
}
