import Link from 'next/link';
import { SiYoutube } from '@icons-pack/react-simple-icons';

import { getAllInsights } from '@/lib/queries/insights';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { DeleteButton } from './delete-button';

export default async function InsightsPage() {
  const insights = await getAllInsights();

  return (
    <section className='space-y-8'>
      <h1 className='text-3xl md:text-4xl font-bold'>My Insights</h1>
      {!insights || insights.length === 0 ? (
        <p>No insights</p>
      ) : (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {insights.map((insight) => (
            <Card
              key={insight.id}
              className='flex flex-col justify-between hover:shadow-lg transition-all'
            >
              <CardHeader>
                <CardTitle>{insight.name}</CardTitle>
                <CardDescription>{insight.description}</CardDescription>
              </CardHeader>
              <CardContent className='space-y-3'>
                <h4 className='text-lg font-semibold'>Sources:</h4>
                <ul className='space-y-2'>
                  {insight.sources.map((source) => {
                    return (
                      <li key={source.id}>
                        <Button
                          asChild
                          variant='link'
                          className='text-sm flex gap-2 w-fit p-0'
                        >
                          <a
                            href={`https://youtube.com/${source.value}`}
                            target='_blank'
                          >
                            <SiYoutube className='text-red-600' />
                            {source.value}
                          </a>
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
              <CardFooter className='space-x-4'>
                <Button asChild variant='secondary'>
                  <Link href={`/insights/update/${insight.id}`}>Update</Link>
                </Button>
                <DeleteButton insightId={insight.id} />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
