'use client';
import { type FC, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { EmojiPicker } from '@/components/ui/emoji-picker';
import {
  Form,
  FormControl,
  FormFieldUncontrolled,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  name: z.string().min(3, 'Workspace name must be at least 3 characters long'),
});
type FormValues = z.infer<typeof formSchema>;

interface CreateWorkspaceFormProps {
  onSubmit: (value: { name: string; icon: string }) => void;
}
export const CreateWorkspaceForm: FC<CreateWorkspaceFormProps> = ({ onSubmit }) => {
  const [icon, setIcon] = useState('💼');
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmitInternal: SubmitHandler<FormValues> = ({ name }) => onSubmit({ name, icon });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitInternal)} className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <EmojiPicker
            className="text-5xl"
            defaultValue="💼"
            disabled={isLoading}
            value={icon}
            onChange={setIcon}
          />
          <FormFieldUncontrolled
            disabled={isLoading}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Workspace name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isLoading} size="lg">
          Save
        </Button>
      </form>
    </Form>
  );
};
