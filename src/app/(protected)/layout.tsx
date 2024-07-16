import { PropsWithChildren } from 'react';

export default function ProtectedLayout({ children }: PropsWithChildren) {
  return (
    <>
      <main className='min-h-dvh p-6'>{children}</main>
    </>
  );
}
