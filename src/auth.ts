import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from './lib/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
