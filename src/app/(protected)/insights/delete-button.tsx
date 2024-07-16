'use client';

import { useTransition } from 'react';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { deleteInsight } from '@/lib/mutations/insights';
import { Button } from '@/components/ui/button';

export function DeleteButton({ insightId }: { insightId: string }) {
  const [isDeleting, startDeleting] = useTransition();

  const handleClick = () => {
    startDeleting(async () => {
      const { message, success } = await deleteInsight(insightId);
      if (!success) {
        toast.error(message);
      } else {
        toast.success(message);
      }
    });
  };

  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={handleClick}
      disabled={isDeleting}
    >
      <Trash2 />
    </Button>
  );
}
