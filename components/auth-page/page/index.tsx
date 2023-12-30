import { type ComponentPropsWithoutRef, type FC } from 'react';

import { SimpleNavSection } from '@/components/auth-page/simple-nav-section';
import { UserAuthForm } from '@/components/auth-page/user-auth-form';
import { UserOAuthButtons } from '@/components/auth-page/user-oauth-buttons';
import { Title } from '@/components/shared/title';

interface AuthPageProps {
  loginWithEmail: ComponentPropsWithoutRef<typeof UserAuthForm>['onSubmit'];
  loginWithGithub: ComponentPropsWithoutRef<typeof UserOAuthButtons>['onGitHubClick'];
}
export const AuthPage: FC<AuthPageProps> = ({ loginWithEmail, loginWithGithub }) => {
  return (
    <main className="flex min-h-screen flex-col">
      <SimpleNavSection />
      <section className="flex grow flex-col justify-center">
        <div className="container flex max-w-lg flex-col gap-3 py-8 lg:py-24">
          <Title subtitle="Enter your email to login" caption="Login to your account">
            Welcome back
          </Title>
          <UserAuthForm onSubmit={loginWithEmail} />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-sage9" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-teal1 px-2 text-sage11 dark:bg-dark-teal1 dark:text-dark-sage11">
                Or continue with
              </span>
            </div>
          </div>
          <UserOAuthButtons onGitHubClick={loginWithGithub} />
        </div>
      </section>
    </main>
  );
};
