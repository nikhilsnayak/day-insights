import { redirect } from 'next/navigation';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth from 'next-auth';

import authConfig from './auth.config';
import { db } from './lib/db';
import { dashboards } from './lib/db/schema';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: 'jwt' },
  events: {
    async signIn({ isNewUser, user }) {
      if (isNewUser && user.id) {
        await db.insert(dashboards).values({
          userId: user.id,
        });
      }
    },
  },
  ...authConfig,
});

export async function getLoggedInUser() {
  const session = await auth();
  if (!session?.user) {
    redirect('/api/login');
  }

  const { user } = session;

  return user;
}
