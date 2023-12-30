import { type FC } from 'react';
import Link from 'next/link';
import { ChevronLeftIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';

export const SimpleNavSection: FC = () => (
  <section className="w-full border-b border-sage9">
    <div className="container py-4">
      <Button variant="ghost" asChild>
        <Link href="/">
          <ChevronLeftIcon className="mr-2 h-4 w-4" />
          Home
        </Link>
      </Button>
    </div>
  </section>
);
