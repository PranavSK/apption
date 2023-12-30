'use client';

import { type FC, useState } from 'react';
import Link from 'next/link';

import { Logo } from '@/components/home-page/logo';
import { MenuButton } from '@/components/home-page/menu-button';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const NAV_ITEMS = [
  {
    label: 'Login',
    href: '/login',
  },
];

export const NavSection: FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <section className="w-full border-b border-sage9">
      <Collapsible
        open={isExpanded}
        onOpenChange={setIsExpanded}
        className="container flex flex-col py-4"
      >
        <div className="flex flex-row items-center justify-between">
          <Logo />
          <CollapsibleTrigger asChild>
            <MenuButton className="lg:hidden" />
          </CollapsibleTrigger>
          <nav className="hidden space-x-4 lg:block">
            {NAV_ITEMS.map(({ label, href }) => (
              <Button key={label} variant="ghost" asChild>
                <Link href={href}>{label}</Link>
              </Button>
            ))}
          </nav>
        </div>
        <CollapsibleContent
          asChild
          className='overflow-hidden data-[state="closed"]:animate-collapse-up data-[state="open"]:animate-collapse-down'
        >
          <nav className="flex grow flex-col items-end px-5 lg:hidden">
            {NAV_ITEMS.map(({ label, href }) => (
              <Button key={label} variant="ghost" asChild>
                <Link href={href}>{label}</Link>
              </Button>
            ))}
          </nav>
        </CollapsibleContent>
      </Collapsible>
    </section>
  );
};
