import { redirect } from 'next/navigation';
import { getLoggedInUser } from '@/auth';

import { db } from '../db';

export async function getAllInsights() {
  const { id: userId } = await getLoggedInUser();

  if (!userId) {
    redirect('/api/login');
  }

  return db.query.insights.findMany({
    with: {
      sources: true,
    },
    where: (insights, { eq }) => eq(insights.userId, userId),
  });
}

export async function getInsightById(id: string) {
  const { id: userId } = await getLoggedInUser();

  if (!userId) {
    redirect('/api/login');
  }

  return db.query.insights.findFirst({
    with: {
      sources: true,
    },
    where: (insights, { eq, and }) =>
      and(eq(insights.userId, userId), eq(insights.id, id)),
  });
}
