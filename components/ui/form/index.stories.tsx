import { type FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { type Meta, type StoryObj } from '@storybook/react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormFieldControlled,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/toaster';

interface FormStoryArgs {}

const formSchema = z.object({
  username: z.string().min(2).max(50),
});
type FormValues = z.infer<typeof formSchema>;

export default {
  component: Form,
  render: function RenderStory() {
    // Define your form.
    const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: '',
      },
    });

    // Define a submit handler.
    const onSubmit: SubmitHandler<FormValues> = (values) => {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      toast(`Hello ${values.username}!`);
    };

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormFieldControlled
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Type here..." {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    );
  },
} satisfies Meta<FC<FormStoryArgs>>;
export const Default: StoryObj<FC<FormStoryArgs>> = {};
