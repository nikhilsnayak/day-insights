'use server';

import { revalidatePath } from 'next/cache';
import { getLoggedInUser } from '@/auth';
import { eq, sql } from 'drizzle-orm';

import { deepEqual } from '@/lib/utils';

import { db } from '../db';
import { insights, sources } from '../db/schema';
import { getInsightById } from '../queries/insights';
import { InsightFormDataSchema } from '../validators/insights';

export async function createInsight(input: unknown) {
  const { id: userId } = await getLoggedInUser();

  if (!userId) {
    return { success: false, message: 'Unauthorized' };
  }

  const result = InsightFormDataSchema.safeParse(input);

  if (!result.success) {
    return { success: false, message: 'Validation failed' };
  }

  const {
    data: { description, name, sources: sourcesData },
  } = result;

  try {
    const newInsight = await db
      .insert(insights)
      .values({
        name,
        description,
        userId,
      })
      .returning()
      .then((r) => r[0]);

    await db
      .insert(sources)
      .values(sourcesData.map((s) => ({ ...s, insightId: newInsight.id })));
  } catch (error) {
    console.error({ error });
    return { success: false, message: 'Server Error' };
  }

  revalidatePath('/insights');

  return { success: true, message: 'Successfully Created Insight' };
}

export async function updateInsight(insightId: string, input: unknown) {
  const { id: userId } = await getLoggedInUser();

  if (!userId) {
    return { success: false, message: 'Unauthorized' };
  }

  const result = InsightFormDataSchema.safeParse(input);

  if (!result.success) {
    return { success: false, message: 'Validation failed' };
  }

  const {
    data: { description, name, sources: sourcesData },
  } = result;

  try {
    const existingInsight = await getInsightById(insightId);

    if (!existingInsight) {
      return { success: false, message: "Insight doesn't exist" };
    }

    if (
      name !== existingInsight.name ||
      description !== existingInsight.description
    ) {
      await db
        .update(insights)
        .set({
          description,
          name,
        })
        .where(eq(insights.id, insightId));
    }

    if (!deepEqual(existingInsight.sources, sourcesData)) {
      await db
        .delete(sources)
        .where(
          sql`${sources.id} in ${existingInsight.sources.map((s) => s.id)}`
        );

      await db
        .insert(sources)
        .values(
          sourcesData.map((s) => ({ ...s, insightId: existingInsight.id }))
        );
    }
  } catch (error) {
    console.error({ error });
    return { success: false, message: 'Server Error' };
  }

  revalidatePath('/insights');

  return { success: true, message: 'Successfully Updated Insight' };
}

export async function deleteInsight(insightId: string) {
  const { id: userId } = await getLoggedInUser();

  if (!userId) {
    return { success: false, message: 'Unauthorized' };
  }

  try {
    const existingInsight = await getInsightById(insightId);

    if (!existingInsight) {
      return { success: false, message: "Insight doesn't exist" };
    }

    await db.delete(insights).where(eq(insights.id, insightId));
  } catch (error) {
    console.error({ error });
    return { success: false, message: 'Server Error' };
  }

  revalidatePath('/insights');

  return { success: true, message: 'Successfully Deleted Insight' };
}
