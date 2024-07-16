import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';

import './globals.css';

const poppins = Poppins({
  weight: ['400', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Day Insight',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='no-scrollbar'>
      <body className={cn(poppins.className, 'antialiased')}>
        {children}
        <Toaster closeButton />
      </body>
    </html>
  );
}
