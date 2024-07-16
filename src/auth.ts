import { redirect } from 'next/navigation';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth from 'next-auth';

import authConfig from './auth.config';
import { db } from './lib/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        return { ...token, id: user.id };
      }
      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
      };
    },
  },
});

export async function getLoggedInUser() {
  const session = await auth();
  if (!session?.user) {
    redirect('/api/login');
  }

  const { user } = session;

  return user;
}
