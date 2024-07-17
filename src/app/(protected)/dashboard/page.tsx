import { cache, Suspense } from 'react';
import { getLoggedInUser } from '@/auth';
import { Cog, Lightbulb, Plus, UserPen } from 'lucide-react';

import { getDashboard } from '@/lib/queries/dashboard';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { InsightLink } from '@/components/insight-button';

const getDashboardDetails = cache(getDashboard);

export default async function Dashboard() {
  const { name } = await getLoggedInUser();
  return (
    <section className='space-y-10'>
      <div className='flex justify-between items-center'>
        <h1 className='font-bold tracking-tighter text-xl md:text-3xl'>
          Welcome, <span className='ml-2'>{name ?? 'User'}</span>
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={'ghost'} className='size-[35px] p-0'>
              <Cog className='size-full' />
            </Button>
          </DialogTrigger>
          <DialogContent className='w-4/5 mx-auto '>
            <DialogHeader>
              <DialogTitle>Configure Dashboard</DialogTitle>
            </DialogHeader>

            <DialogFooter></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Suspense fallback='loading..'>
        <Settings />
      </Suspense>
    </section>
  );
}

function ConfigureDashboardForm() {}

async function Settings() {
  const dashboard = await getDashboardDetails();

  if (!dashboard) return;

  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
      {dashboard.createInsight ? (
        <InsightLink href='/insights/create'>
          <Plus className='size-7 md:size-10' />
          <span className='text-lg md:text-xl text-center'>
            Create New Insight
          </span>
        </InsightLink>
      ) : null}
      {dashboard.viewInsights ? (
        <InsightLink href='/insights'>
          <Lightbulb className='size-7 md:size-10' />
          <span className='text-lg md:text-xl text-center'>
            View All Insights
          </span>
        </InsightLink>
      ) : null}

      {dashboard.viewProfile ? (
        <InsightLink href='/profile'>
          <UserPen className='size-7 md:size-10' />
          <span className='text-lg md:text-xl text-center'>Profile</span>
        </InsightLink>
      ) : null}

      {/* <InsightLink href='/2fa'>
  <ShieldCheck className=' size-7 md:size-10' />
  <span className='text-lg md:text-xl text-center'>
    Setup Two Factor Authentication
  </span>
</InsightLink> */}
    </div>
  );
}
