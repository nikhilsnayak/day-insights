import { ComponentProps } from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import { Button, ButtonProps } from './ui/button';

export interface InsightLinkProps extends Omit<ButtonProps, 'asChild'> {
  href: ComponentProps<typeof Link>['href'];
}

export function InsightLink({
  href,
  className,
  children,
  ...rest
}: InsightLinkProps) {
  return (
    <Button
      asChild
      className={cn(
        'flex h-[200px] 2xl:h-[250px] flex-col gap-3 py-10 whitespace-normal',
        className
      )}
      {...rest}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
