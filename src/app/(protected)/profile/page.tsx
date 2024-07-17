import { Suspense } from 'react';

import { ProfileCard } from '@/components/profile-card';

export default async function Profile() {
  return (
    <section className='space-y-10 h-full'>
      <h2 className='text-3xl md:text-4xl font-bold'>Profile</h2>
      <Suspense>
        <ProfileCard />
      </Suspense>
    </section>
  );
}
