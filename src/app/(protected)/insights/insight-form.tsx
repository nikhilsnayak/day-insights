'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';

import { createInsight, updateInsight } from '@/lib/mutations/insights';
import {
  InsightFormDataSchema,
  type InsightFormData,
} from '@/lib/validators/insights';
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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CreateInsightFormProps {
  type: 'create';
  defaultValues?: Partial<InsightFormData>;
}

interface UpdateInsightFormProps {
  type: 'update';
  defaultValues?: Partial<InsightFormData>;
  insightId: string;
}

type InsightFormProps = CreateInsightFormProps | UpdateInsightFormProps;

export function InsightForm(props: InsightFormProps) {
  const { type, defaultValues } = props;
  const form = useForm<InsightFormData>({
    resolver: zodResolver(InsightFormDataSchema.omit({})),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'sources',
  });

  const [isSubmitting, startSubmitting] = useTransition();

  const router = useRouter();

  const onSubmit = (values: InsightFormData) => {
    startSubmitting(async () => {
      switch (type) {
        case 'create': {
          const { success, message } = await createInsight(values);
          if (!success) {
            toast.error(message);
          } else {
            toast.success(message);
            router.back();
          }
          return;
        }
        case 'update': {
          const { success, message } = await updateInsight(
            props.insightId,
            values
          );
          if (!success) {
            toast.error(message);
          } else {
            toast.success(message);
            router.back();
          }
          return;
        }
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='space-y-4 border-b pb-6'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='New Insight' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder='This the description of my insight'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This description will be used to fine-tune your insight
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {fields.length > 0 ? (
          <div className='space-y-4 border-b pb-6'>
            <h3>Sources: </h3>
            <ul className='space-y-3'>
              {fields.map((item, index) => (
                <li
                  key={item.id}
                  className='space-y-4 rounded-md border px-4 py-6'
                >
                  <FormField
                    control={form.control}
                    name={`sources.${index}.type`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select a source type' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='youtube'>Youtube</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <SourceValue index={index} />
                  {fields.length > 1 ? (
                    <Button
                      type='button'
                      variant='outline'
                      onClick={() => remove(index)}
                    >
                      Remove Source
                    </Button>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className='text-destructive'>
            {form.formState.errors?.sources?.root?.message}
          </p>
        )}
        <Button
          type='button'
          variant='secondary'
          className='w-full'
          onClick={() => append({ type: 'youtube', value: '' })}
        >
          Add Source
        </Button>
        <Button type='submit' className='w-full' disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}

function SourceValue({ index }: { index: number }) {
  const sourceType = useWatch({
    name: `sources.${index}.type`,
    exact: true,
  });

  switch (sourceType) {
    case 'youtube': {
      return (
        <FormField
          name={`sources.${index}.value`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value</FormLabel>
              <FormControl>
                <Input placeholder='Enter value' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }
    default:
      return null;
  }
}
