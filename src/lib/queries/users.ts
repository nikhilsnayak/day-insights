import { redirect } from 'next/navigation';
import { getLoggedInUser } from '@/auth';

import { db } from '../db';

export async function getUserInfo() {
  const { id: userId } = await getLoggedInUser();
  if (!userId) {
    redirect('/api/login');
  }

  return db.query.users.findFirst({
    with: {
      accounts: {
        columns: {
          provider: true,
          providerAccountId: true,
        },
      },
    },
    where: (users, { eq }) => eq(users.id, userId),
  });
}
