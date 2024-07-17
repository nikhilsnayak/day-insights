import { PropsWithChildren } from 'react';

import { ModeToggle } from '@/components/theme-toggle';

export default function ProtectedLayout({ children }: PropsWithChildren) {
  return (
    <div className='flex flex-col min-h-dvh'>
      <header className='sticky top-0 z-50 w-full border-b shadow-md backdrop-blur py-4 px-8 flex justify-between items-center'>
        <h1 className='text-xl font-bold'>Day Insights</h1>
        <ModeToggle />
      </header>
      <main className=' flex-grow p-8'>{children}</main>
    </div>
  );
}
