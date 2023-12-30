import { type FC } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { type UserProfileData } from '@/lib/validations/profile';

interface DisplayProfileProps extends UserProfileData {}
export const DisplayProfile: FC<DisplayProfileProps> = ({
  username,
  fullName,
  avatarUrl,
  website,
}) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <Image
        src={
          avatarUrl ||
          `https://ui-avatars.com/api/?background=12A594&color=ECEEED&name=${fullName ?? username}`
        }
        width={256}
        height={256}
        alt={`Avatar for ${username}`}
        className="h-32 w-32 rounded-md"
      />
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-sm font-semibold tracking-widest text-sage11 dark:text-dark-sage11">
          {username}
        </h2>
        <h1 className="text-3xl font-bold tracking-tighter">{fullName}</h1>
        <Button variant="link" asChild>
          <a href={website} className="text-xl">
            {website}
          </a>
        </Button>
      </div>
    </div>
  );
};
