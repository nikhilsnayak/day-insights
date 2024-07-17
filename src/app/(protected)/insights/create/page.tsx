import { InsightForm } from '../insight-form';

export default function NewInsight() {
  return (
    <section className='mx-auto max-w-screen-md space-y-8 rounded-md border p-4 shadow-sm hover:shadow-md md:p-8'>
      <div className='space-y-2'>
        <h2 className='text-center text-xl font-bold tracking-tighter'>
          Create Insight
        </h2>
        <p className='text-center text-muted-foreground'>
          Select your sources and get a personalized insight
        </p>
      </div>
      <InsightForm
        defaultValues={{
          name: '',
          description: '',
          sources: [{ type: 'youtube', value: '' }],
        }}
        type='create'
      />
    </section>
  );
}
