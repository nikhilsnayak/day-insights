import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className='grid min-h-dvh place-items-center'>
      <Button asChild>
        <Link href='/dashboard'>Dashboard</Link>
      </Button>
    </main>
  );
}
