'use client';

import { type FC, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { type z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormFieldUncontrolled,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ImageInput, type ImageInputRef } from '@/components/ui/image-input';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/toaster';
import { type UserProfileData, userProfileSchema } from '@/lib/validations/profile';

const schemaForForm = userProfileSchema.omit({ avatarUrl: true });
type FormValues = z.infer<typeof schemaForForm>;

interface EditProfileProps extends Omit<Partial<UserProfileData>, 'avatarUrl'> {
  onSubmit: (data: UserProfileData) => Promise<void>;
  onAvatarUploadUrlRequest: (name: string) => Promise<[string, string]>;
}
export const EditProfile: FC<EditProfileProps> = ({
  onSubmit,
  onAvatarUploadUrlRequest,
  ...props
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: props.username ? undefined : props,
  });
  const isLoading = form.formState.isSubmitting;
  const imageRef = useRef<ImageInputRef>(null);

  const onSubmitInternal: SubmitHandler<FormValues> = (data) => {
    toast.promise(
      async () => {
        let avatarUrl;
        const avatarFile = await imageRef.current?.getCroppedImage();
        if (avatarFile) {
          // Validate avatar file size
          if (avatarFile.size > 1024 * 1024) {
            form.setError('root.avatarFile', {
              type: 'maxFileSize',
              message: 'Avatar file size must be less than 1MB',
            });
            throw new Error('Avatar file size must be less than 1MB');
          }
          const [uploadEndpoint, url] = await onAvatarUploadUrlRequest(`${data.username}`);
          await fetch(uploadEndpoint, {
            method: 'PUT',
            body: avatarFile,
            headers: { 'Content-Type': avatarFile.type },
          });

          avatarUrl = url;
        }
        await onSubmit({ ...data, avatarUrl });
      },
      {
        loading: 'Updating your profile...',
        success: 'Your profile has been updated!',
        error: (error) =>
          error instanceof Error
            ? `Your profile update failed with the following error:\n${error.name}: ${error.message}`
            : 'Your profile update failed.',
      },
    );
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitInternal)} className="grid items-start gap-4">
        <FormFieldUncontrolled
          disabled={isLoading}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormDescription>Enter a unique display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormFieldUncontrolled
          disabled={isLoading}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input placeholder="Full name" {...field} />
              </FormControl>
              <FormDescription>Enter your full name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormFieldUncontrolled
          disabled={isLoading}
          name="avatarFile"
          render={() => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <ImageInput ref={imageRef} />
              </FormControl>
              <FormDescription>Choose an avatar image.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormFieldUncontrolled
          disabled={isLoading}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input placeholder="Website" {...field} />
              </FormControl>
              <FormDescription>Enter your website.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} size="lg">
          Save
        </Button>
      </form>
    </Form>
  );
};
