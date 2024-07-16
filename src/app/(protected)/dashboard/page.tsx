import { getLoggedInUser } from '@/auth';
import { Lightbulb, Plus, UserPen } from 'lucide-react';

import { InsightLink } from '@/components/insight-button';

export default async function Dashboard() {
  const user = await getLoggedInUser();
  return (
    <section className='space-y-10'>
      <h1 className='font-bold tracking-tighter text-xl md:text-3xl'>
        Welcome, <span className='ml-2'>{user.name}</span>
      </h1>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
        <InsightLink href='/insights/create'>
          <Plus className='size-7 md:size-10' />
          <span className='text-lg md:text-xl text-center'>
            Create New Insight
          </span>
        </InsightLink>
        <InsightLink href='/insights'>
          <Lightbulb className='size-7 md:size-10' />
          <span className='text-lg md:text-xl text-center'>
            View All Insights
          </span>
        </InsightLink>
        <InsightLink href='/profile'>
          <UserPen className='size-7 md:size-10' />
          <span className='text-lg md:text-xl text-center'>Profile</span>
        </InsightLink>
        {/* <InsightLink href='/2fa'>
          <ShieldCheck className=' size-7 md:size-10' />
          <span className='text-lg md:text-xl text-center'>
            Setup Two Factor Authentication
          </span>
        </InsightLink> */}
      </div>
    </section>
  );
}
