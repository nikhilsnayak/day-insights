'use client';

import { useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { updateDashboard } from '@/lib/mutations/dashboard';
import {
  ConfigureDashboardFormData,
  ConfigureDashboardFormDataSchema,
} from '@/lib/validators/dashboard';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';

interface ConfigureDashboardFormProps {
  defaultValues?: Partial<ConfigureDashboardFormData>;
}

export function ConfigureDashboardForm(props: ConfigureDashboardFormProps) {
  const { defaultValues } = props;
  const form = useForm<ConfigureDashboardFormData>({
    resolver: zodResolver(ConfigureDashboardFormDataSchema),
    defaultValues,
  });

  const [isSubmitting, startSubmitting] = useTransition();

  const onSubmit = (values: ConfigureDashboardFormData) => {
    startSubmitting(async () => {
      const { success, message } = await updateDashboard(values);
      if (!success) {
        toast.error(message);
      } else {
        console.log(message);

        toast.success(message);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='space-y-4 border-b pb-6'>
          <FormField
            control={form.control}
            name='createInsight'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center justify-between gap-2 rounded-lg border p-4'>
                <div className='space-y-0.5'>
                  <FormLabel className='text-base'>Create Insight</FormLabel>
                  <FormDescription>
                    Enable this option to allow creating new insights within the
                    dashboard.
                  </FormDescription>
                  <FormMessage />
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='viewInsights'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4 gap-2'>
                <div className='space-y-0.5'>
                  <FormLabel className='text-base'>View Insights</FormLabel>
                  <FormDescription>
                    Toggle this option to view insights available in the
                    dashboard.
                  </FormDescription>
                  <FormMessage />
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='viewProfile'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4 gap-2'>
                <div className='space-y-0.5'>
                  <FormLabel className='text-base'>View Profile</FormLabel>
                  <FormDescription>
                    Enable this option to view user profile within the
                    dashboard.
                  </FormDescription>
                  <FormMessage />
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button type='submit' className='w-full' disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
