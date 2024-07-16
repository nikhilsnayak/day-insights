import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';

if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL not provided');
}

const queryClient = postgres(process.env.POSTGRES_URL);
export const db = drizzle(queryClient, { schema });
