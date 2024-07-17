import { getInsightById } from '@/lib/queries/insights';

import { InsightForm } from '../../insight-form';

export default async function UpdateInsight({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const insight = await getInsightById(id);
  return (
    <section className='mx-auto max-w-screen-md space-y-8 rounded-md border p-4 shadow-sm hover:shadow-md md:p-8'>
      <h2 className='text-center text-xl font-bold tracking-tighter'>
        Update Insight
      </h2>
      <InsightForm defaultValues={insight} type='update' insightId={id} />
    </section>
  );
}
