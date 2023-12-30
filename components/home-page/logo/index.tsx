import { type FC } from 'react';
import Link from 'next/link';
import { GearIcon } from '@radix-ui/react-icons';

export const Logo: FC = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-sm font-light tracking-tighter focus:outline-none"
    >
      <GearIcon className="h-12 w-12" />
      <span className="text-base">Apption</span>
    </Link>
  );
};
