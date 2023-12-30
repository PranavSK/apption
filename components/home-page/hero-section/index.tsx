import { type FC } from 'react';
import Link from 'next/link';

import { Title } from '@/components/shared/title';
import { Button } from '@/components/ui/button';

export const HeroSection: FC = () => {
  // TODO: Add a background image
  return (
    <section className="flex h-dvh max-h-[38rem] w-full grow flex-col justify-center lg:max-h-none">
      <div className="container">
        <Title
          subtitle="Free and Premium themes, UI Kit's, templates and landing pages built with Tailwind CSS, HTML & Next.js."
          caption="All-In-One Collaboration and Productivity Platform"
        >
          Apption; <br className="hidden md:block" />
          Create, Collaborate and Publish.
        </Title>
        <div className="mt-6 flex w-full lg:justify-center">
          <Button>
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
