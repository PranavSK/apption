'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormFieldUncontrolled,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/toaster';
import { type AuthFormData, authFormSchema } from '@/lib/validations/auth';

interface UserAuthFormProps {
  onSubmit: (data: AuthFormData) => Promise<void>;
}
export const UserAuthForm: FC<UserAuthFormProps> = ({ onSubmit }) => {
  const form = useForm<AuthFormData>({
    resolver: zodResolver(authFormSchema),
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmitInternal: SubmitHandler<AuthFormData> = (data) => {
    toast.promise(onSubmit(data), {
      loading: 'Sending you a login link...',
      success: 'We sent you a login link. Be sure to check your spam too!',
      error: (error) =>
        error instanceof Error
          ? `Your sign in request failed with the following error:\n${error.name}: ${error.message}`
          : 'Your sign in request failed.',
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitInternal)}
        className="flex flex-col items-stretch gap-4"
      >
        <FormFieldUncontrolled
          disabled={isLoading}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} size="lg">
          Sign In with Email
        </Button>
      </form>
    </Form>
  );
};
