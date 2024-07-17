import { cache, Suspense } from 'react';
import { getLoggedInUser } from '@/auth';
import { Cog, Lightbulb, Plus, ShieldCheck, UserPen } from 'lucide-react';

import { getDashboard } from '@/lib/queries/dashboard';
import { toTitleCase } from '@/lib/utils';
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

import { ConfigureDashboardForm } from './configure-dashboard-form';

const getDashboardDetails = cache(getDashboard);

export default async function Dashboard() {
  const { name } = await getLoggedInUser();
  return (
    <section className='space-y-10'>
      <div className='flex justify-between items-center border-b pb-2'>
        <h2 className='font-bold tracking-tighter text-xl md:text-3xl'>
          Welcome,{' '}
          <span className='ml-2  text-primary'>
            {name ? toTitleCase(name) : 'User'}
          </span>
        </h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='ghost' size='icon'>
              <Cog className='size-[1.2rem]' />
            </Button>
          </DialogTrigger>
          <DialogContent className='w-4/5 mx-auto '>
            <DialogHeader>
              <DialogTitle>Configure Dashboard</DialogTitle>
            </DialogHeader>
            <Suspense>
              <ConfigureDashboard />
            </Suspense>
          </DialogContent>
        </Dialog>
      </div>

      <Suspense fallback='loading..'>
        <Settings />
      </Suspense>
    </section>
  );
}

async function ConfigureDashboard() {
  const dashboard = await getDashboardDetails();

  return <ConfigureDashboardForm defaultValues={dashboard} />;
}

async function Settings() {
  const dashboard = await getDashboardDetails();

  if (!dashboard) return;

  return (
    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4'>
      {dashboard.createInsight ? (
        <InsightLink href='/insights/create'>
          <Plus className='size-7 md:size-10 shrink-0' />
          <span className='text-lg text-center'>Create New Insight</span>
        </InsightLink>
      ) : null}
      {dashboard.viewInsights ? (
        <InsightLink href='/insights'>
          <Lightbulb className='size-7 md:size-10 shrink-0' />
          <span className='text-lgtext-center'>View All Insights</span>
        </InsightLink>
      ) : null}

      {dashboard.viewProfile ? (
        <InsightLink href='/profile'>
          <UserPen className='min-size-7 md:size-10' />
          <span className='text-lg  text-center'>Profile</span>
        </InsightLink>
      ) : null}

      {/* <InsightLink href='/2fa'>
        <ShieldCheck className='size-7 md:size-10 shrink-0' />
        <span className='text-lg  text-center'>
          Setup Two Factor Authentication
        </span>
      </InsightLink> */}
    </div>
  );
}
